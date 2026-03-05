import AllPostsView from "@/app/components/admin/AllPostView";
import { PostService } from "@/services/post.service";
import { createClient } from "@/lib/supabase/server"; // Import satpam Supabase
import { prisma } from "@/db/client"; // Import prisma buat nyari ID
import { redirect } from "next/navigation";

export default async function PostsPage() {
  // 1. Cek siapa yang lagi login lewat Supabase
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Kalau nggak ada user, tendang ke login
  if (!user || !user.email) {
    redirect("/login");
  }

  // 2. Cari ID asli user di Database Prisma berdasarkan email login
  const dbUser = await prisma.user.findUnique({
    where: { email: user.email },
    select: { id: true },
  });

  if (!dbUser) {
    redirect("/login");
  }

  // 3. Tarik data postingan: HANYA yang dibuat oleh user ini
  // (Pastikan kamu sudah update fungsi getAllPosts di service untuk nerima userId)
  const allPosts = await PostService.getAllPosts(dbUser.id);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* 4. Lempar datanya ke UI yang sudah kamu buat */}
      <AllPostsView isDarkMode={false} initialPosts={allPosts} />
    </div>
  );
}
