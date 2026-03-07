import { prisma } from "@/db/client";

// Tambahkan interface ini di paling atas file atau di dalam objek PostService
interface CreatePostInput {
  title: string;
  slug: string;
  content: string;
  categoryName: string;
  isPublished: boolean;
  coverImage: string | null;
  authorId: string;
}

export const PostService = {
  // Fungsi 1: Ambil statistik angka
  getDashboardStats: async (userId: string) => {
    const total = await prisma.post.count({ where: { authorId: userId } });
    const published = await prisma.post.count({
      where: { isPublished: true, authorId: userId },
    });
    const drafts = await prisma.post.count({
      where: { isPublished: false, authorId: userId },
    });

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

  // Fungsi 3: Ambil semua post milik user tertentu (untuk halaman /posts)
  // Tambahkan parameter userId di sini
  getAllPosts: async (userId: string) => {
    const rawPosts = await prisma.post.findMany({
      where: {
        authorId: userId, // <-- FILTER HANYA MILIK USER INI
      },
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
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

  // Fungsi Create Post yang sudah diperbaiki
  createPost: async (data: CreatePostInput) => {
    // Kita hapus "Sihir User" dummy yang lama, karena kita sudah punya authorId asli

    return await prisma.post.create({
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        isPublished: data.isPublished,
        coverImage: data.coverImage,
        // Hubungkan langsung dengan User ID yang dikirim dari Action
        author: {
          connect: { id: data.authorId },
        },
        // Sihir Kategori tetap dipertahankan
        category: {
          connectOrCreate: {
            where: {
              slug: data.categoryName.toLowerCase().replace(/\s+/g, "-"),
            },
            create: {
              name: data.categoryName,
              slug: data.categoryName.toLowerCase().replace(/\s+/g, "-"),
            },
          },
        },
      },
    });
  },

  // Fungsi BARU: Ambil daftar nama kategori unik
  getUniqueCategories: async () => {
    const categories = await prisma.category.findMany({
      select: { name: true },
      orderBy: { name: "asc" },
    });
    return categories.map((c) => c.name);
  },

  // 1. Ambil 1 data post (lengkap dengan nama kategorinya)
  getPostByIdandIncludeCategory: async (id: string) => {
    const post = await prisma.post.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!post) return null;

    return {
      id: post.id,
      title: post.title,
      slug: post.slug,
      content: post.content,
      coverImage: post.coverImage,
      status: post.isPublished ? "Published" : "Draft",
      category: post.category?.name || "",
    };
  },

  // Perbaiki juga fungsi updatePost supaya aman
  updatePost: async (id: string, data: any) => {
    return await prisma.post.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        isPublished: data.isPublished,
        coverImage: data.coverImage,
        category: {
          connectOrCreate: {
            where: {
              slug: data.categoryName.toLowerCase().replace(/[\s\W-]+/g, "-"),
            },
            create: {
              name: data.categoryName,
              slug: data.categoryName.toLowerCase().replace(/[\s\W-]+/g, "-"),
            },
          },
        },
      },
    });
  },
};
