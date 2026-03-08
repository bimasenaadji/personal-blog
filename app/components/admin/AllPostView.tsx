"use client";

import { useState, useTransition } from "react";
import { Edit2, Trash2, Search, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { deletePostAction } from "@/actions/post.action";

interface Post {
  id: string;
  title: string;
  status: "Published" | "Draft";
  category: string;
  date: string;
  views: number;
}

interface AllPostsViewProps {
  initialPosts: Post[];
}

const ITEMS_PER_PAGE = 5;

export default function AllPostsView({ initialPosts }: AllPostsViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Published" | "Draft"
  >("All");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    if (
      window.confirm("Yakin nih mau menghapus artikel ini secara permanen?")
    ) {
      startTransition(async () => {
        await deletePostAction(id);
      });
    }
  };

  const filteredPosts = initialPosts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || post.status === statusFilter;
    const matchesCategory =
      categoryFilter === "All" || post.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(
    startIdx,
    startIdx + ITEMS_PER_PAGE,
  );

  const categories = ["All", ...new Set(initialPosts.map((p) => p.category))];

  const handlePreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="space-y-8">
      {/* Header Halaman */}
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white transition-colors">
          All Posts
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400 transition-colors">
          Manage all your blog posts
        </p>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative w-full lg:max-w-xs">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all 
                     bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 
                     text-zinc-900 dark:text-white placeholder-zinc-500 focus:ring-emerald-500/50"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex gap-3">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as "All" | "Published" | "Draft");
              setCurrentPage(1);
            }}
            className="px-4 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all cursor-pointer 
                     bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 
                     text-zinc-900 dark:text-white focus:ring-emerald-500/50"
          >
            <option value="All">All Status</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all cursor-pointer 
                     bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 
                     text-zinc-900 dark:text-white focus:ring-emerald-500/50"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="rounded-2xl border bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 transition-colors overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Views
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {paginatedPosts.map((post) => (
                <tr
                  key={post.id}
                  className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-zinc-900 dark:text-zinc-200">
                    {post.title}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        post.status === "Published"
                          ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                          : "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400"
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">
                    {post.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">
                    {post.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">
                    {post.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/editor/${post.id}`}
                        className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors"
                      >
                        <Edit2 size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        disabled={isPending}
                        className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-red-100 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 transition-colors disabled:opacity-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginatedPosts.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-sm text-zinc-500"
                  >
                    Tidak ada post yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between transition-colors">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Showing {paginatedPosts.length > 0 ? startIdx + 1 : 0}–
            {Math.min(startIdx + ITEMS_PER_PAGE, filteredPosts.length)} of{" "}
            {filteredPosts.length} posts
          </p>
          <div className="flex justify-center gap-2">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all border
                       border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-300
                       hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50"
            >
              <ChevronLeft size={16} /> Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all border
                       border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-300
                       hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
