// FILE: app/(admin)/AdminLayoutClient.tsx
"use client";

import { useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";

export default function AdminLayoutClient({
  children,
  userProfile,
}: {
  children: React.ReactNode;
  userProfile: any;
}) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    // KUNCI: Tambahkan class "dark" di sini jika isDarkMode true
    <div className={`${isDarkMode ? "dark" : ""} min-h-screen`}>
      <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors">
        <Sidebar userProfile={userProfile} />{" "}
        {/* Gak perlu kirim isDarkMode lagi */}
        <main className="flex-1 md:ml-64 flex flex-col min-w-0 overflow-hidden">
          <Header
            onThemeToggle={() => setIsDarkMode(!isDarkMode)}
            isDarkMode={isDarkMode}
          />
          <div className="flex-1 p-4 md:p-8">
            {children} {/* Dashboard sekarang ada di dalam lingkungan "dark" */}
          </div>
        </main>
      </div>
    </div>
  );
}
