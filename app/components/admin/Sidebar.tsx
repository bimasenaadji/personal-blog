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
  userProfile: {
    name: string | null;
    avatar: string | null;
    email: string;
  } | null;
}

export default function Sidebar({ userProfile }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navItems = [
    { href: "/dashboard", label: "Home", icon: LayoutDashboard },
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
      {/* --- 1. DESKTOP SIDEBAR --- */}
      <aside
        className="hidden md:flex w-64 h-screen flex-col fixed left-0 top-0 transition-colors border-r z-50 
                   bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
      >
        {/* Logo */}
        <div className="p-6 border-b transition-colors border-zinc-200 dark:border-zinc-800">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
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
                    ? "bg-zinc-900 dark:bg-zinc-800 text-white font-medium"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Profile & Logout Desktop */}
        <div className="p-4 border-t transition-colors border-zinc-200 dark:border-zinc-800 space-y-3">
          <Link
            href="/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-800">
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
              <p className="text-sm font-medium truncate text-zinc-900 dark:text-white">
                {userProfile?.name || "Admin"}
              </p>
              <p className="text-xs truncate text-zinc-600 dark:text-zinc-400">
                {userProfile?.email}
              </p>
            </div>
          </Link>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center gap-3 px-4 py-2 text-red-600 dark:text-red-400 text-sm hover:opacity-80 disabled:opacity-50"
          >
            <LogOut size={18} />
            <span>{isLoggingOut ? "Exiting..." : "Logout"}</span>
          </button>
        </div>
      </aside>

      {/* --- 2. MOBILE BOTTOM BAR --- */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 h-16 border-t z-50 flex items-center justify-around px-2 transition-colors 
                   bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
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
                  ? "text-zinc-900 dark:text-white"
                  : "text-zinc-400 dark:text-zinc-500"
              }`}
            >
              <Icon size={20} className={isActive ? "scale-110" : ""} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
        {/* Profile Avatar Mobile */}
      </nav>
    </>
  );
}
