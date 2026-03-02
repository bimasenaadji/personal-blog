import AllPostsView from "@/app/components/admin/AllPostView";
import { PostService } from "@/services/post.service";

export default async function PostsPage() {
  // 1. Ambil data asli dari database!
  const allPosts = await PostService.getAllPosts();

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* 2. Lempar datanya ke UI */}
      <AllPostsView isDarkMode={false} initialPosts={allPosts} />
    </div>
  );
}
