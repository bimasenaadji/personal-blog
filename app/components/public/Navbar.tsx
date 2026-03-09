"use client";

import Link from "next/link";
import { Search, Sun, Moon, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Mencegah error hydration dengan menunggu komponen di-mount di client
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* KIRI: Brand Logo & Tombol Mobile */}
          <div className="flex items-center gap-4">
            {/* Tombol Hamburger buat Mobile (Nanti kita kasih fungsi buka menu) */}
            <button className="sm:hidden p-2 -ml-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
              <Menu size={20} />
            </button>
            <Link
              href="/"
              className="font-bold text-lg tracking-tight text-zinc-900 dark:text-zinc-100 hover:opacity-75 transition-opacity"
            >
              CODE/HEAL
            </Link>
          </div>

          {/* TENGAH: Navigation Links (Disembunyikan di layar HP) */}
          <div className="hidden sm:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* KANAN: Aksi (Search & Theme Toggle) */}
          <div className="flex items-center gap-2">
            {/* Tombol Search (Persiapan fitur pencarian nanti) */}
            <button
              className="p-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 rounded-lg transition-colors flex items-center gap-2"
              aria-label="Search"
            >
              <Search size={18} />
              {/* Tooltip Shortcut kecil (Mati di HP, nyala di PC) */}
              <span className="hidden lg:flex text-[10px] font-medium border border-zinc-200 dark:border-zinc-700 px-1.5 py-0.5 rounded text-zinc-400">
                ⌘K
              </span>
            </button>

            {/* Garis Pemisah Estetik */}
            <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800 mx-1 hidden sm:block"></div>

            {/* TOMBOL TOGGLE THEME */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 rounded-lg transition-colors flex items-center justify-center w-9 h-9"
              aria-label="Toggle Dark Mode"
            >
              {mounted ? (
                <>
                  {/* Ikon Matahari muncul saat mode gelap */}
                  <Sun size={18} className="hidden dark:block" />
                  {/* Ikon Bulan muncul saat mode terang */}
                  <Moon size={18} className="block dark:hidden" />
                </>
              ) : (
                // Placeholder kosong sebesar ikon biar tombol gak lompat pas baru di-load
                <div className="w-[18px] h-[18px]"></div>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
