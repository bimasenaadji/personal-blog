"use client";

import Link from "next/link";
import { Search, Sun, Moon, Menu, X, FileText } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

export interface SearchPost {
  title: string;
  slug: string;
  category: string;
}

export default function Navbar({
  searchPosts = [],
}: {
  searchPosts?: SearchPost[];
}) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // State UI
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Cegah error hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Tutup menu & reset search kalau pindah halaman
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setSearchQuery("");
  }, [pathname]);

  // Kunci scroll body kalau modal terbuka
  useEffect(() => {
    if (isMobileMenuOpen || isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen, isSearchOpen]);

  // Logika Shortcut Keyboard (Ctrl+K / Cmd+K / ESC)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Auto-focus input saat search dibuka
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Filter artikel dari database berdasarkan ketikan user
  const searchResults = searchPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* KIRI: Logo & Mobile Toggle */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="sm:hidden p-2 -ml-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <Link
                href="/"
                className="font-bold text-lg tracking-tight text-zinc-900 dark:text-zinc-100 hover:opacity-75 transition-opacity"
              >
                CODE/HEAL
              </Link>
            </div>

            {/* TENGAH: Menu Desktop */}
            <div className="hidden sm:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "text-zinc-900 dark:text-zinc-100"
                      : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* KANAN: Search & Theme Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 rounded-lg transition-colors flex items-center gap-2"
                aria-label="Search"
              >
                <Search size={18} />
                <span className="hidden lg:flex text-[10px] font-medium border border-zinc-200 dark:border-zinc-700 px-1.5 py-0.5 rounded text-zinc-400">
                  ⌘K
                </span>
              </button>

              <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800 mx-1 hidden sm:block"></div>

              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 rounded-lg transition-colors flex items-center justify-center w-9 h-9"
              >
                {mounted ? (
                  <>
                    <Sun size={18} className="hidden dark:block" />
                    <Moon size={18} className="block dark:hidden" />
                  </>
                ) : (
                  <div className="w-[18px] h-[18px]"></div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE DROPDOWN MENU */}
        <div
          className={`sm:hidden absolute top-16 left-0 w-full bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 -translate-y-4 invisible"
          }`}
        >
          <div className="px-4 pt-4 pb-6 space-y-4 shadow-xl">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                  pathname === link.href
                    ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* COMMAND PALETTE MODAL */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-32 px-4">
          <div
            className="fixed inset-0 bg-zinc-900/40 dark:bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsSearchOpen(false)}
          />

          <div className="relative w-full max-w-xl bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Input Search */}
            <div className="flex items-center px-4 py-4 border-b border-zinc-200 dark:border-zinc-800">
              <Search className="w-5 h-5 text-zinc-400 dark:text-zinc-500 mr-3" />
              <input
                ref={inputRef}
                type="text"
                className="flex-1 bg-transparent border-none outline-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 text-lg"
                placeholder="Cari artikel, topik, atau kata kunci..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-[10px] font-medium border border-zinc-200 dark:border-zinc-700 px-1.5 py-0.5 rounded text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                ESC
              </button>
            </div>

            {/* Hasil Pencarian */}
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {searchQuery.length === 0 ? (
                <div className="p-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
                  Mulai ketikkan sesuatu untuk mencari di Taman Digital ini.
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-1">
                  <p className="px-3 py-2 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                    Artikel Ditemukan
                  </p>
                  {searchResults.map((post) => (
                    <button
                      key={post.slug}
                      onClick={() => {
                        router.push(`/blog/${post.slug}`);
                        setIsSearchOpen(false);
                      }}
                      className="w-full text-left flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors group"
                    >
                      <div className="p-2 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 group-hover:border-zinc-300 dark:group-hover:border-zinc-600 transition-colors">
                        <FileText className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-0.5 line-clamp-1">
                          {post.title}
                        </h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-500 font-medium uppercase tracking-wider">
                          {post.category}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
                  Waduh, artikel tentang "
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">
                    {searchQuery}
                  </span>
                  " belum ada nih.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
