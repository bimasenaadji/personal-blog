"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  PenTool,
  Settings,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { signOutAction } from "@/actions/auth.action";
import Image from "next/image";

interface SidebarProps {
  isDarkMode: boolean;
  userProfile: {
    name: string | null;
    avatar: string | null;
    email: string;
  } | null;
}
export default function Sidebar({ isDarkMode, userProfile }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const displayName = userProfile?.name || "Admin User";
  const avatarUrl = userProfile?.avatar;

  // Kita ubah id jadi href (URL tujuan)
  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/posts", label: "All Posts", icon: FileText },
    { href: "/editor", label: "Create New", icon: PenTool },
    { href: "/settings", label: "Settings", icon: Settings },
  ] as const;

  // Fungsi sakti untuk Logout
  const handleLogout = async () => {
    setIsLoggingOut(true);
    toast.loading("Logging out...", { id: "logout-toast" });

    await signOutAction(); // Panggil server action yang hapus sesi Supabase

    toast.success("Berhasil keluar!", { id: "logout-toast" });
    router.push("/login"); // Tendang balik ke halaman login
  };

  return (
    <aside
      className={`w-64 h-screen flex flex-col fixed left-0 top-0 transition-colors border-r ${
        isDarkMode ? "bg-zinc-950 border-zinc-800" : "bg-white border-zinc-200"
      }`}
    >
      {/* Logo */}
      <div
        className={`p-6 border-b transition-colors ${isDarkMode ? "border-zinc-800" : "border-zinc-200"}`}
      >
        <h1
          className={`text-2xl font-bold tracking-tight transition-colors ${
            isDarkMode ? "text-white" : "text-zinc-900"
          }`}
        >
          Console
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          // Cek apakah URL sekarang sama dengan tujuan menu
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                isActive
                  ? isDarkMode
                    ? "bg-zinc-800 text-white font-medium"
                    : "bg-zinc-900 text-white font-medium"
                  : item.href === "/editor"
                    ? isDarkMode
                      ? "border border-zinc-700 text-zinc-300 hover:bg-zinc-800/50 font-medium"
                      : "border border-zinc-900 text-zinc-900 hover:bg-zinc-50 font-medium"
                    : isDarkMode
                      ? "text-zinc-400 hover:bg-zinc-800/50 transition-all"
                      : "text-zinc-600 hover:bg-zinc-100 transition-all"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile & Logout */}
      <div
        className={`p-4 border-t transition-colors ${isDarkMode ? "border-zinc-800" : "border-zinc-200"} space-y-3`}
      >
        <Link
          href="/settings"
          className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all cursor-pointer ${
            isDarkMode ? "hover:bg-zinc-800/50" : "hover:bg-zinc-100"
          }`}
        >
          {/* 1. CEK BAGIAN INI: Logika Tampilan Avatar */}
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-zinc-200 shrink-0 bg-zinc-200">
            {userProfile?.avatar ? (
              <Image
                src={userProfile.avatar}
                alt="Profile"
                fill
                className="object-cover"
                unoptimized // Biar Next.js nggak rewel optimasi lagi
              />
            ) : (
              // Kalau avatar di DB null, tampilkan gradient ini
              <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-blue-500" />
            )}
          </div>

          <div className="min-w-0">
            <p
              className={`text-sm font-medium truncate transition-colors ${isDarkMode ? "text-white" : "text-zinc-900"}`}
            >
              {userProfile?.name || "Admin"}
            </p>
            <p
              className={`text-xs truncate transition-colors ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}
            >
              {userProfile?.email}
            </p>
          </div>
        </Link>
        {/* Tombol Logout yang sudah hidup! */}
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-2xl transition-all text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
            isDarkMode
              ? "text-red-400 hover:bg-red-500/10"
              : "text-red-600 hover:bg-red-50"
          }`}
        >
          <LogOut size={18} />
          <span>{isLoggingOut ? "Sedang keluar..." : "Logout"}</span>
        </button>
      </div>
    </aside>
  );
}
