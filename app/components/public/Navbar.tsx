"use client";

import Link from "next/link";
import { Search } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand Logo */}
          <Link
            href="/"
            className="font-bold text-lg tracking-tight text-black hover:opacity-75 transition-opacity"
          >
            CODE/HEAL
          </Link>

          {/* Center/Right: Navigation Links */}
          <div className="flex items-center gap-8">
            <div className="hidden sm:flex gap-6">
              <Link
                href="/"
                className="text-sm text-black hover:opacity-60 transition-opacity"
              >
                Home
              </Link>
              <Link
                href="/blog"
                className="text-sm text-black hover:opacity-60 transition-opacity"
              >
                Blog
              </Link>
              <Link
                href="/#about"
                className="text-sm text-black hover:opacity-60 transition-opacity"
              >
                About
              </Link>
              <Link
                href="/#contact"
                className="text-sm text-black hover:opacity-60 transition-opacity"
              >
                Contact
              </Link>
            </div>

            {/* Far Right: Search Icon */}
            <button className="p-2 hover:bg-black/5 rounded transition-colors">
              <Search size={18} className="text-black" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
