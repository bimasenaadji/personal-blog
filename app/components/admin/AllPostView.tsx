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

// 1. Tambahkan props initialPosts
interface AllPostsViewProps {
  isDarkMode: boolean;
  initialPosts: Post[];
}

const ITEMS_PER_PAGE = 5;

// 2. Terima initialPosts dari Page
export default function AllPostsView({
  isDarkMode,
  initialPosts,
}: AllPostsViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Published" | "Draft"
  >("All");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);

  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    // Kasih pop-up konfirmasi standar bawaan browser
    if (
      window.confirm("Yakin nih mau menghapus artikel ini secara permanen?")
    ) {
      startTransition(async () => {
        await deletePostAction(id);
      });
    }
  };

  // 3. Ganti ALL_POSTS menjadi initialPosts
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

  // 4. Ganti ALL_POSTS menjadi initialPosts
  const categories = ["All", ...new Set(initialPosts.map((p) => p.category))];

  const handlePreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="space-y-8">
      {/* Header Halaman */}
      <div>
        <h1
          className={`text-3xl font-bold transition-colors ${isDarkMode ? "text-foreground" : "text-zinc-900"}`}
        >
          All Posts
        </h1>
        <p
          className={`text-muted-foreground mt-2 transition-colors ${isDarkMode ? "text-muted-foreground" : "text-zinc-600"}`}
        >
          Manage all your blog posts
        </p>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative w-full lg:max-w-xs">
          <Search
            className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isDarkMode ? "text-muted-foreground" : "text-zinc-500"}`}
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
            className={`w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
              isDarkMode
                ? "bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:ring-zinc-700"
                : "bg-white border border-zinc-200 text-zinc-900 placeholder-zinc-500 focus:ring-emerald-500/50"
            }`}
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
            className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all cursor-pointer ${
              isDarkMode
                ? "bg-zinc-900 border border-zinc-800 text-white focus:ring-zinc-700"
                : "bg-white border border-zinc-200 text-zinc-900 focus:ring-emerald-500/50"
            }`}
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
            className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all cursor-pointer ${
              isDarkMode
                ? "bg-zinc-900 border border-zinc-800 text-white focus:ring-zinc-700"
                : "bg-white border border-zinc-200 text-zinc-900 focus:ring-emerald-500/50"
            }`}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div
        className={`rounded-2xl overflow-hidden border transition-colors ${isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200"}`}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-200">
            <thead>
              <tr
                className={`border-b transition-colors ${isDarkMode ? "border-zinc-800 bg-zinc-900/50" : "border-zinc-200 bg-zinc-50"}`}
              >
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
            <tbody>
              {paginatedPosts.map((post) => (
                <tr
                  key={post.id}
                  className={`border-b transition-colors ${isDarkMode ? "border-zinc-800/50 hover:bg-zinc-800/30" : "border-zinc-100 hover:bg-zinc-50"}`}
                >
                  <td
                    className={`px-6 py-4 text-sm font-medium transition-colors ${isDarkMode ? "text-zinc-200" : "text-zinc-900"}`}
                  >
                    {post.title}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        post.status === "Published"
                          ? isDarkMode
                            ? "bg-emerald-500/20 text-emerald-300"
                            : "bg-emerald-100 text-emerald-700"
                          : isDarkMode
                            ? "bg-zinc-800 text-zinc-400"
                            : "bg-zinc-200 text-zinc-700"
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td
                    className={`px-6 py-4 text-sm transition-colors ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}
                  >
                    {post.category}
                  </td>
                  <td
                    className={`px-6 py-4 text-sm transition-colors ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}
                  >
                    {post.date}
                  </td>
                  <td
                    className={`px-6 py-4 text-sm transition-colors ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}
                  >
                    {post.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        className={`p-2 rounded-lg transition-colors ${isDarkMode ? "hover:bg-zinc-800 text-zinc-400 hover:text-white" : "hover:bg-zinc-200 text-zinc-600 hover:text-zinc-900"}`}
                      >
                        {/* Tombol Edit (Ubah jadi Link) */}
                        <Link
                          href={`/editor/${post.id}`}
                          className={`inline-block p-2 rounded-lg transition-colors ${
                            isDarkMode
                              ? "hover:bg-zinc-800 text-zinc-400 hover:text-white"
                              : "hover:bg-zinc-200 text-zinc-600 hover:text-zinc-900"
                          }`}
                        >
                          <Edit2 size={16} />
                        </Link>
                      </button>
                      {/* Tombol Delete */}
                      <button
                        onClick={() => handleDelete(post.id)}
                        disabled={isPending}
                        className={`p-2 rounded-lg transition-colors ${
                          isDarkMode
                            ? "hover:bg-red-500/10 text-zinc-400 hover:text-red-400"
                            : "hover:bg-red-100 text-zinc-600 hover:text-red-600"
                        } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
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
        <div
          className={`px-6 py-4 border-t flex items-center justify-between transition-colors ${isDarkMode ? "border-zinc-800" : "border-zinc-200"}`}
        >
          <p
            className={`text-sm transition-colors ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}
          >
            Showing {paginatedPosts.length > 0 ? startIdx + 1 : 0}–
            {Math.min(startIdx + ITEMS_PER_PAGE, filteredPosts.length)} of{" "}
            {filteredPosts.length} posts
          </p>
          <div className="flex gap-2">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                isDarkMode
                  ? "border border-zinc-800 text-zinc-300 hover:bg-zinc-800"
                  : "border border-zinc-200 text-zinc-900 hover:bg-zinc-100"
              }`}
            >
              <ChevronLeft size={16} /> Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                isDarkMode
                  ? "border border-zinc-800 text-zinc-300 hover:bg-zinc-800"
                  : "border border-zinc-200 text-zinc-900 hover:bg-zinc-100"
              }`}
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
