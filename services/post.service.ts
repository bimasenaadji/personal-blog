import { prisma } from "@/db/client";

export const PostService = {
  // Fungsi 1: Ambil statistik angka
  getDashboardStats: async () => {
    const total = await prisma.post.count();
    const published = await prisma.post.count({ where: { isPublished: true } });
    const drafts = await prisma.post.count({ where: { isPublished: false } });

    return { total, published, drafts };
  },

  // Fungsi 2: Ambil dan format 5 post terakhir
  getRecentPosts: async (limit = 5) => {
    const rawPosts = await prisma.post.findMany({
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    return rawPosts.map((post) => ({
      id: post.id,
      title: post.title,
      status: post.isPublished ? "Published" : "Draft",
      // Format tanggalnya langsung diselesaikan di service
      date: post.createdAt.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    }));
  },
};
