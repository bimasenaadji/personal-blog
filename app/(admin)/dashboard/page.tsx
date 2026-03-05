import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/db/client";
import DashboardView from "@/app/components/admin/DashboardView";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
    redirect("/login");
  }

  const userPosts = await prisma.post.findMany({
    where: {
      author: {
        email: user.email,
      },
    },
    select: {
      id: true,
      title: true,
      isPublished: true, // <-- GANTI 'status' jadi 'isPublished'
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // 2. Olah data untuk statistik (Sesuaikan dengan Boolean)
  const stats = {
    total: userPosts.length,
    published: userPosts.filter((p) => p.isPublished === true).length,
    drafts: userPosts.filter((p) => p.isPublished === false).length,
  };

  // 3. Mapping data untuk DashboardView (Kita "bungkus" Boolean jadi String "Published"/"Draft")
  const recentPosts = userPosts.slice(0, 5).map((post) => ({
    id: post.id,
    title: post.title,
    status: post.isPublished ? "Published" : "Draft", // Kita konversi di sini bos!
    date: new Date(post.createdAt).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  }));

  return (
    <div className="h-full px-6 py-8 lg:px-12">
      <DashboardView
        isDarkMode={false} // Nanti sesuaikan dengan state dark mode globalmu
        stats={stats}
        recentPosts={recentPosts}
      />
    </div>
  );
}
