"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Tipe data yang disesuaikan dengan kembalian Prisma
interface PostData {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  coverImage: string | null;
}

interface BlogListClientProps {
  posts: PostData[];
  categories: string[];
}

const POSTS_PER_PAGE = 6;

export default function BlogListClient({
  posts,
  categories,
}: BlogListClientProps) {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter artikel
  const filteredPosts =
    activeCategory === "Semua"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  return (
    <div className="mx-auto max-w-7xl">
      {/* TABS KATEGORI */}
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

      {/* BLOG POSTS GRID */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 pb-16">
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => (
            <article
              key={post.slug}
              className="group cursor-pointer flex flex-col gap-4"
            >
              <Link href={`/blog/${post.slug}`} className="block h-full">
                <div className="aspect-[4/3] w-full rounded-2xl bg-zinc-100 dark:bg-zinc-900 overflow-hidden border border-zinc-200 dark:border-zinc-800 transition-colors duration-300 relative">
                  {/* LOGIKA GAMBAR: Pakai coverImage asli kalau ada, kalau null pakai gradient placeholder */}
                  {post.coverImage ? (
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900 group-hover:scale-105 transition-transform duration-500" />
                  )}
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

      {/* PAGINATION CONTROLS */}
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
  );
}
