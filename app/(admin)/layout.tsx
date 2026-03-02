"use client"; // Kita pakai client dulu sementara untuk nyimpen state isDarkMode

import { useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Sementara kita hardcode state dark mode di sini sebelum pakai next-themes
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div
      className={`flex min-h-screen transition-colors ${isDarkMode ? "bg-zinc-950" : "bg-zinc-50"}`}
    >
      {/* Sidebar - Di kiri */}
      <Sidebar isDarkMode={isDarkMode} />

      {/* Main Content - Di kanan, dikasih margin left (ml-64) supaya gak ketutupan sidebar */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Header - Di atas */}
        <Header
          isDarkMode={isDarkMode}
          onThemeToggle={() => setIsDarkMode(!isDarkMode)}
        />

        {/* Konten Halaman (Dashboard, Posts, dll) akan dirender di dalam sini */}
        <div className="flex-1">{children}</div>
      </main>
    </div>
  );
}
