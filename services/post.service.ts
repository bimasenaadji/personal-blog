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

  // Fungsi BARU: Ambil semua posts untuk halaman tabel
  getAllPosts: async () => {
    const rawPosts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        category: true, // Bawa data dari tabel kategori sekalian!
      },
    });

    return rawPosts.map((post) => ({
      id: post.id,
      title: post.title,
      status: (post.isPublished ? "Published" : "Draft") as
        | "Published"
        | "Draft",
      category: post.category?.name || "Uncategorized",
      date: post.createdAt.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      // Kita set 0 dulu karena belum bikin kolom views di database
      views: 0,
    }));
  },

  // Fungsi BARU: Ambil 1 post spesifik berdasarkan ID untuk di-edit
  getPostById: async (id: string) => {
    return await prisma.post.findUnique({
      where: { id: id },
    });
  },

  // Fungsi BARU: Hapus 1 post berdasarkan ID
  deletePost: async (id: string) => {
    return await prisma.post.delete({
      where: { id },
    });
  },
};
