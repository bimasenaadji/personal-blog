"use client";

import { Sun, Moon, Settings as SettingsIcon, LogOut } from "lucide-react";

interface HeaderProps {
  onThemeToggle?: () => void;
  isDarkMode: boolean;
  handleLogout: () => void;
}

export default function Header({
  onThemeToggle,
  isDarkMode,
  handleLogout,
}: HeaderProps) {
  return (
    <header
      className={`border-b sticky top-0 z-40 transition-colors ${
        isDarkMode
          ? "border-zinc-800 bg-zinc-950/80 backdrop-blur-md"
          : "border-zinc-200 bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        <div className="flex items-center gap-3">
          <h2
            className={`text-base md:text-lg font-semibold transition-colors ${
              isDarkMode ? "text-white" : "text-zinc-900"
            }`}
          >
            Blog CMS
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={onThemeToggle}
            className={`p-2 rounded-lg border transition-colors ${
              isDarkMode
                ? "border-zinc-700 hover:bg-zinc-800 text-zinc-300"
                : "border-zinc-200 hover:bg-zinc-100 text-zinc-900"
            }`}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          {/* TOMBOL LOGOUT MOBILE DI SINI */}
          <button
            onClick={handleLogout} // Kirim fungsi logout ke Header lewat props
            className="p-2 rounded-lg md:hidden bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
