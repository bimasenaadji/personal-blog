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
    <div
      className={`flex min-h-screen transition-colors ${isDarkMode ? "bg-zinc-950" : "bg-zinc-50"}`}
    >
      {/* 3. Kirim profil ke Sidebar */}
      <Sidebar isDarkMode={isDarkMode} userProfile={userProfile} />

      <main className="flex-1 min-w-0 overflow-hidden md:ml-64 flex flex-col min-h-screen pb-14 md:pb-0">
        <Header
          isDarkMode={isDarkMode}
          onThemeToggle={() => setIsDarkMode(!isDarkMode)}
        />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}
