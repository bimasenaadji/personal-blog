import CreateNewView from "@/app/components/admin/CreateNewView";
import { PostService } from "@/services/post.service";

// 👇 TAMBAHKAN BARIS INI BIAR HALAMAN INI SELALU REAL-TIME 👇
export const dynamic = "force-dynamic";

export default async function CreatePostPage() {
  // Ambil data kategori dari database
  const categories = await PostService.getUniqueCategories();

  return (
    <div className="h-full">
      <CreateNewView isDarkMode={false} existingCategories={categories} />
    </div>
  );
}
