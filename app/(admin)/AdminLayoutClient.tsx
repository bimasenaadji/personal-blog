"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";

export default function AdminLayoutClient({
  children,
  userProfile,
  handleLogout,
}: {
  children: React.ReactNode;
  userProfile: any;
  handleLogout: () => void;
}) {
  // 1. Panggil bos besarnya: next-themes
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 2. Jurus anti-hydration error (sama kayak di Navbar publik)
  useEffect(() => {
    setMounted(true);
  }, []);

  // 3. Tentukan apakah SEKARANG lagi dark mode atau light mode
  // Pakai resolvedTheme biar ngedetect settingan OS (system) juga
  const isDark = mounted && (theme === "dark" || resolvedTheme === "dark");

  // 4. Fungsi untuk nge-toggle tema, yang nanti dilempar ke Header
  const handleThemeToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    // KUNCI: Buang div wrapper dengan class "dark" manual yang tadi!
    // Kita langsung pakai struktur layout utamanya. Tailwind akan otomatis baca class "dark" dari tag <html>.
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <Sidebar userProfile={userProfile} />

      <main className="flex-1 md:ml-64 flex flex-col min-w-0 overflow-hidden">
        <Header
          onThemeToggle={handleThemeToggle} // Lempar fungsinya
          isDarkMode={isDark} // Lempar statusnya biar icon di Header bisa berubah
          handleLogout={handleLogout}
        />

        {/* Dashboard Content */}
        <div className="flex-1 p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
