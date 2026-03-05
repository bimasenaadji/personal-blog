"use client";

import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  isDarkMode: boolean;
}

export default function AuthLayout({ children, isDarkMode }: AuthLayoutProps) {
  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-colors ${
        isDarkMode ? "bg-background" : "bg-white"
      }`}
    >
      <div className="w-full max-w-md">
        {/* Card */}
        <div
          className={`w-full max-w-95 ${isDarkMode ? "bg-card" : "bg-white"} border transition-colors ${
            isDarkMode ? "border-border" : "border-zinc-200"
          } rounded-2xl p-6 space-y-8`}
        >
          {/* Logo (Sama persis untuk Login & Register) */}
          <div className="text-center">
            <div
              className={`inline-flex items-center justify-center w-12 h-12 rounded-lg transition-colors ${
                isDarkMode
                  ? "bg-zinc-800" // Abu-abu gelap untuk dark mode
                  : "bg-zinc-100" // Abu-abu sangat terang untuk light mode
              } mb-4`}
            >
              <span
                className={`text-xl font-bold p-6 ${isDarkMode ? "text-accent" : "text-zinc-600"}`}
              >
                &gt;
              </span>
            </div>
            <p
              className={`text-sm font-semibold tracking-wider transition-colors mt-2 ${
                isDarkMode ? "text-accent" : "text-zinc-600"
              }`}
            >
              CONSOLE
            </p>
          </div>

          {/* Isi Form (Login/Register) akan dirender di sini */}
          {children}
        </div>
      </div>
    </div>
  );
}
