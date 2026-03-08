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

  const navItems = [
    { href: "/dashboard", label: "Home", icon: LayoutDashboard }, // Label dipendekkan untuk mobile
    { href: "/posts", label: "Posts", icon: FileText },
    { href: "/editor", label: "Write", icon: PenTool },
    { href: "/settings", label: "Settings", icon: Settings },
  ] as const;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    toast.loading("Logging out...", { id: "logout-toast" });
    await signOutAction();
    toast.success("Berhasil keluar!", { id: "logout-toast" });
    router.push("/login");
  };

  return (
    <>
      {/* --- 1. DESKTOP SIDEBAR (Tampil hanya di md: ke atas) --- */}
      <aside
        className={`hidden md:flex w-64 h-screen flex-col fixed left-0 top-0 transition-colors border-r z-50 ${
          isDarkMode
            ? "bg-zinc-950 border-zinc-800"
            : "bg-white border-zinc-200"
        }`}
      >
        {/* Logo */}
        <div
          className={`p-6 border-b transition-colors ${isDarkMode ? "border-zinc-800" : "border-zinc-200"}`}
        >
          <h1
            className={`text-2xl font-bold tracking-tight ${isDarkMode ? "text-white" : "text-zinc-900"}`}
          >
            Console
          </h1>
        </div>

        {/* Navigation Desktop */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                  isActive
                    ? isDarkMode
                      ? "bg-zinc-800 text-white"
                      : "bg-zinc-900 text-white"
                    : isDarkMode
                      ? "text-zinc-400 hover:bg-zinc-800/50"
                      : "text-zinc-600 hover:bg-zinc-100"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Profile & Logout Desktop */}
        <div
          className={`p-4 border-t ${isDarkMode ? "border-zinc-800" : "border-zinc-200"} space-y-3`}
        >
          <Link
            href="/settings"
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${isDarkMode ? "hover:bg-zinc-800/50" : "hover:bg-zinc-100"}`}
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
              {userProfile?.avatar ? (
                <Image
                  src={userProfile.avatar}
                  alt="Profile"
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-blue-500" />
              )}
            </div>
            <div className="min-w-0">
              <p
                className={`text-sm font-medium truncate ${isDarkMode ? "text-white" : "text-zinc-900"}`}
              >
                {userProfile?.name || "Admin"}
              </p>
              <p
                className={`text-xs truncate ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}
              >
                {userProfile?.email}
              </p>
            </div>
          </Link>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center gap-3 px-4 py-2 text-red-500 text-sm hover:opacity-80"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* --- 2. MOBILE BOTTOM BAR (Tampil hanya di bawah md) --- */}
      <nav
        className={`md:hidden fixed bottom-0 left-0 right-0 h-16 border-t z-50 flex items-center justify-around px-2 transition-colors ${
          isDarkMode
            ? "bg-zinc-950 border-zinc-800"
            : "bg-white border-zinc-200"
        }`}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-all ${
                isActive
                  ? isDarkMode
                    ? "text-white"
                    : "text-zinc-900"
                  : isDarkMode
                    ? "text-zinc-500"
                    : "text-zinc-400"
              }`}
            >
              <Icon size={20} className={isActive ? "scale-110" : ""} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
