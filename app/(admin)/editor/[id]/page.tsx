import CreateNewView from "@/app/components/admin/CreateNewView";
import { PostService } from "@/services/post.service";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. Ambil ID dari URL
  const postId = (await params).id;

  // 2. Tarik data lama dari database & daftar kategori
  const postData = await PostService.getPostByIdandIncludeCategory(postId);
  const categories = await PostService.getUniqueCategories();

  // 3. Kalau ID-nya ngawur, tendang balik ke halaman posts
  if (!postData) {
    redirect("/posts");
  }

  return (
    <div className="h-full">
      {/* 4. Daur ulang komponen CreateNewView, tapi kasih initialData! */}
      <CreateNewView
        isDarkMode={false}
        existingCategories={categories}
        initialData={postData}
      />
    </div>
  );
}
