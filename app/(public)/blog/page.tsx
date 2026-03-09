"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

// Data sementara diperbanyak biar pagination-nya kelihatan bekerja (Total 8 Artikel)
const blogPosts: BlogPost[] = [
  {
    slug: "bangkit-revisi-sempro",
    title: "Bangkit dari Revisi dan Plot Twist Akademis",
    excerpt:
      "Kadang rencana tidak berjalan mulus, tapi di situlah mental kita diuji.",
    date: "Maret 8, 2026",
    category: "Ruang Tumbuh",
  },
  {
    slug: "arsitektur-modular-monolith",
    title: "Kenapa Saya Memilih Modular Monolith di Next.js",
    excerpt:
      "Mencari keseimbangan antara struktur kode yang rapi tanpa perlu pusing.",
    date: "Februari 28, 2026",
    category: "Catatan Teknis",
  },
  {
    slug: "teori-mcu-thunderbolts",
    title: "Prediksi Gila: Siapa Saja yang Bertahan di Thunderbolts?",
    excerpt: "Menyusun kepingan petunjuk dari fase MCU sebelumnya.",
    date: "Februari 15, 2026",
    category: "Pop-Culture",
  },
  {
    slug: "manajemen-waktu-part-time",
    title: "Seni Membagi Waktu: Kuliah, Part-Time, dan Kewarasan",
    excerpt:
      "Sedikit refleksi tentang bagaimana saya mencoba menyeimbangkan tanggung jawab.",
    date: "Januari 20, 2026",
    category: "Ruang Tumbuh",
  },
  {
    slug: "belajar-typescript-dasar",
    title: "TypeScript: Menyelamatkan Saya dari Error Konyol",
    excerpt:
      "Dari yang awalnya benci karena ribet, sekarang malah nggak bisa hidup tanpa TypeScript.",
    date: "Januari 15, 2026",
    category: "Catatan Teknis",
  },
  {
    slug: "review-film-dune-2",
    title: "Dune Part 2: Mahakarya Visual Dekade Ini",
    excerpt:
      "Ulasan tanpa spoiler tentang kenapa film ini wajib ditonton di bioskop IMAX.",
    date: "Januari 5, 2026",
    category: "Pop-Culture",
  },
  {
    slug: "setup-meja-kerja-2026",
    title: "Evolusi Setup Meja Kerja Produktif 2026",
    excerpt:
      "Membahas barang-barang esensial yang menemani saya ngoding berjam-jam.",
    date: "Desember 28, 2025",
    category: "Catatan Teknis",
  },
  {
    slug: "resolusi-tahun-baru-realistis",
    title: "Membuat Target Tahunan yang Tidak Berujung Wacana",
    excerpt:
      "Kenapa resolusi tahun baru sering gagal dan bagaimana sistem atomik mengubahnya.",
    date: "Desember 20, 2025",
    category: "Ruang Tumbuh",
  },
];

const categories = ["Semua", "Catatan Teknis", "Ruang Tumbuh", "Pop-Culture"];
const POSTS_PER_PAGE = 6; // Kita batasi 1 halaman cuma muncul 6 artikel

export default function BlogList() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);

  // 1. Filter artikel berdasarkan kategori
  const filteredPosts =
    activeCategory === "Semua"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  // 2. Logika Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  // Potong array sesuai halaman yang aktif
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Fungsi saat kategori diubah (Reset halaman ke 1)
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1); // Wajib reset ke halaman 1 kalau ganti kategori!
  };

  return (
    <section className="bg-white dark:bg-zinc-950 min-h-screen px-8 transition-colors duration-300">
      <div className="mx-auto max-w-7xl">
        {/* =========================================
            BLOG HERO SECTION (Ruang Tamu)
            ========================================= */}
        <div className="py-20 md:py-24 max-w-3xl">
          <h1 className="text-5xl md:text-5xl font-bold mb-6 text-zinc-900 dark:text-zinc-100 tracking-tighter transition-colors duration-300">
            Ruang Baca.
          </h1>
          <p className="text-xl md:text-xl font-normal text-zinc-500 dark:text-zinc-400 transition-colors duration-300">
            Kumpulan tulisan, catatan teknis, dan curhatan acak. Tempat saya
            menaruh apa yang ada di kepala agar tidak penuh.
          </p>
        </div>

        {/* =========================================
            TABS KATEGORI
            ========================================= */}
        <div className="mb-10 md:mb-16">
          <div className="flex overflow-x-auto no-scrollbar gap-8 border-b border-zinc-200 dark:border-zinc-800 pb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`text-sm font-semibold tracking-wide transition-colors whitespace-nowrap pb-2 relative ${
                  activeCategory === cat
                    ? "text-zinc-900 dark:text-zinc-100"
                    : "text-zinc-500 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-zinc-900 dark:bg-zinc-100 rounded-t-full"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* =========================================
            BLOG POSTS GRID (Menampilkan currentPosts, bukan filteredPosts)
            ========================================= */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 pb-16">
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => (
              <article
                key={post.slug}
                className="group cursor-pointer flex flex-col gap-4"
              >
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  <div className="aspect-[4/3] w-full rounded-2xl bg-zinc-100 dark:bg-zinc-900 overflow-hidden border border-zinc-200 dark:border-zinc-800 transition-colors duration-300 relative">
                    <div className="w-full h-full bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900 group-hover:scale-105 transition-transform duration-500" />
                  </div>

                  <div className="space-y-2 mt-5">
                    <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 font-medium transition-colors duration-300">
                      <time>{post.date}</time>
                      <span>•</span>
                      <span className="uppercase tracking-wider font-bold text-zinc-700 dark:text-zinc-300">
                        {post.category}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold leading-tight text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 transition-colors duration-300">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </article>
            ))
          ) : (
            <div className="col-span-full py-24 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl">
              <p className="text-zinc-500 dark:text-zinc-400 font-medium text-lg">
                Belum ada coretan di kategori ini.
              </p>
            </div>
          )}
        </div>

        {/* =========================================
            PAGINATION CONTROLS
            ========================================= */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 pb-32">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              aria-label="Halaman Sebelumnya"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Halaman{" "}
              <span className="text-zinc-900 dark:text-zinc-100 font-bold">
                {currentPage}
              </span>{" "}
              dari {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              aria-label="Halaman Selanjutnya"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
