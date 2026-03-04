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

  // Fungsi BARU: Create Post dengan "Sihir" Relasi
  createPost: async (data: {
    title: string;
    slug: string;
    content: string;
    categoryName: string;
    isPublished: boolean;
    coverImage: string | null;
  }) => {
    // 1. SIHIR USER: Cari user pertama. Kalau kosong, bikin user dummy otomatis.
    let user = await prisma.user.findFirst();
    if (!user) {
      user = await prisma.user.create({
        data: {
          name: "Bima Sena",
          username: "bimasena",
          password: "hashed_password",
        },
      });
    }

    // 2. Insert ke tabel Post
    return await prisma.post.create({
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        isPublished: data.isPublished,
        coverImage: data.coverImage,
        // Hubungkan dengan User ID
        author: { connect: { id: user.id } },
        // SIHIR KATEGORI: Cari kategori. Kalau gak ada, buatin otomatis!
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

  // 2. Update post yang sudah ada
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
