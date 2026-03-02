import DashboardView from "@/app/components/admin/DashboardView";
import { PostService } from "@/services/post.service";

export default async function DashboardPage() {
  const stats = await PostService.getDashboardStats();
  const recentPosts = await PostService.getRecentPosts();

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <DashboardView
        isDarkMode={false}
        stats={stats}
        recentPosts={recentPosts}
      />
    </div>
  );
}
