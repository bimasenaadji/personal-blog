"use client";

import { useState } from "react";
import { Mail, Lock, Chrome, User } from "lucide-react";
import Link from "next/link";
import AuthLayout from "../components/auth/AuthLayout";

import { useRouter } from "next/navigation";
import { signUpAction } from "@/actions/auth.action";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Panggil fungsi Server Action yang kita buat tadi
    const result = await signUpAction(fullName, email, password);

    setIsLoading(false);

    if (result.success) {
      toast.success(result.message); // Notifikasi sukses
      router.push("/dashboard"); // Lempar ke dashboard
    } else {
      toast.error(result.message); // Notifikasi error kalau email udah terdaftar
    }
  };
  return (
    <AuthLayout isDarkMode={isDarkMode}>
      {/* Title Berbeda */}
      <div className="text-center space-y-2">
        <h1
          className={`text-2xl font-bold transition-colors ${
            isDarkMode ? "text-foreground" : "text-zinc-900"
          }`}
        >
          Create Account
        </h1>
        <p
          className={`text-sm transition-colors ${
            isDarkMode ? "text-muted-foreground" : "text-zinc-600"
          }`}
        >
          Sign up to get admin access
        </p>
      </div>

      {/* Google Sign Up */}
      {/* <button
        onClick={handleGoogleSignUp}
        disabled={isLoading}
        className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed ${
          isDarkMode
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "bg-zinc-900 text-white hover:bg-zinc-800"
        }`}
      >
        <Chrome size={18} />
        Sign up with Google
      </button>

      <div className="flex items-center gap-3">
        <div
          className={`flex-1 h-px transition-colors ${isDarkMode ? "bg-border" : "bg-zinc-200"}`}
        />
        <span
          className={`text-xs font-medium transition-colors ${
            isDarkMode ? "text-muted-foreground" : "text-zinc-500"
          }`}
        >
          OR
        </span>
        <div
          className={`flex-1 h-px transition-colors ${isDarkMode ? "bg-border" : "bg-zinc-200"}`}
        />
      </div> */}

      <form onSubmit={handleEmailSignUp} className="space-y-8">
        {/* Input Email & Password Sama Persis dengan Login */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className={`text-sm font-medium transition-colors ${isDarkMode ? "text-foreground" : "text-zinc-900"}`}
          >
            Email Address
          </label>
          <div className="relative">
            <Mail
              className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isDarkMode ? "text-muted-foreground" : "text-zinc-500"}`}
              size={18}
            />
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-lg transition-all focus:outline-none focus:ring-2 ${isDarkMode ? "bg-input border border-border text-foreground placeholder-muted-foreground focus:ring-accent/50" : "bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-500 focus:ring-zinc-500/50"}`}
              required
            />
          </div>
        </div>
        {/* Input Full Name */}
        <div className="space-y-2">
          <label
            htmlFor="fullName"
            className={`text-sm font-medium transition-colors ${isDarkMode ? "text-foreground" : "text-zinc-900"}`}
          >
            Full Name
          </label>
          <div className="relative">
            <User
              className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isDarkMode ? "text-muted-foreground" : "text-zinc-500"}`}
              size={18}
            />
            <input
              id="fullName"
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-lg transition-all focus:outline-none focus:ring-2 ${isDarkMode ? "bg-input border border-border text-foreground placeholder-muted-foreground focus:ring-accent/50" : "bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-500 focus:ring-zinc-500/50"}`}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="password"
            className={`text-sm font-medium transition-colors ${isDarkMode ? "text-foreground" : "text-zinc-900"}`}
          >
            Password
          </label>
          <div className="relative">
            <Lock
              className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isDarkMode ? "text-muted-foreground" : "text-zinc-500"}`}
              size={18}
            />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full pl-10 pr-12 py-3 rounded-lg transition-all focus:outline-none focus:ring-2 ${isDarkMode ? "bg-input border border-border text-foreground placeholder-muted-foreground focus:ring-accent/50" : "bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-500 focus:ring-zinc-500/50"}`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute right-2 top-1/2 -translate-y-1/2 text-sm font-medium transition-colors ${isDarkMode ? "text-muted-foreground hover:text-foreground" : "text-zinc-500 hover:text-zinc-700"}`}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading || !email || !password}
          className={`w-full px-4 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            isDarkMode
              ? "bg-white text-zinc-900 hover:bg-zinc-200"
              : "bg-zinc-900 text-white hover:bg-zinc-800"
          }`}
        >
          {isLoading ? "Creating..." : "Sign Up"}
        </button>
      </form>

      {/* Footer Navigasi */}
      <p
        className={`text-center text-xs transition-colors ${
          isDarkMode ? "text-muted-foreground" : "text-zinc-600"
        }`}
      >
        Already have an account?{" "}
        <Link
          href="/login"
          className={`${isDarkMode ? "text-accent hover:underline" : "text-zinc-600 hover:underline"} font-semibold`}
        >
          Sign In
        </Link>
      </p>
    </AuthLayout>
  );
}
