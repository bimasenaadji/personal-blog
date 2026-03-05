"use client";

import { useState, useRef } from "react";
import toast from "react-hot-toast";
import {
  updateProfileAction,
  updatePasswordAction,
  updateAvatarAction,
} from "@/actions/auth.action";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";

interface SettingsViewProps {
  isDarkMode: boolean;
  userProfile: {
    name: string | null;
    email: string;
    bio: string | null;
    avatar: string | null;
  };
}

export default function SettingsView({
  isDarkMode,
  userProfile,
}: SettingsViewProps) {
  const [fullName, setFullName] = useState(userProfile.name || "");
  const [email] = useState(userProfile.email || ""); // Hapus setEmail karena email akan kita kunci
  const [bio, setBio] = useState(userProfile.bio || "");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State untuk efek loading tombol
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // State khusus Avatar
  const [avatarUrl, setAvatarUrl] = useState(userProfile.avatar || "");
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // FUNGSI 3: Handle Upload Avatar
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validasi ukuran (maksimal 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran foto maksimal 5MB!");
      return;
    }

    setIsUploadingAvatar(true);
    toast.loading("Mengunggah foto...", { id: "avatar" });

    try {
      // 1. Buat nama file unik
      const fileExt = file.name.split(".").pop();
      const fileName = `avatar-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`; // Kamu bisa sesuaikan foldernya

      // 2. Upload ke bucket Supabase (Sesuaikan 'images' dengan nama bucket-mu)
      const { error: uploadError } = await supabase.storage
        .from("avatars") // GANTI 'images' kalau nama bucket-mu beda
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 3. Dapatkan URL publik dari foto yang baru diupload
      const {
        data: { publicUrl },
      } = supabase.storage
        .from("avatars") // Sama, sesuaikan nama bucket
        .getPublicUrl(filePath);

      // 4. Simpan URL tersebut ke database Prisma
      const result = await updateAvatarAction(publicUrl);

      if (result.success) {
        setAvatarUrl(publicUrl); // Update tampilan foto di layar
        toast.success(result.message, { id: "avatar" });
      } else {
        toast.error(result.message, { id: "avatar" });
      }
    } catch (error) {
      toast.error("Gagal mengunggah foto.", { id: "avatar" });
    } finally {
      setIsUploadingAvatar(false);
      // Reset input file biar bisa pilih foto yang sama lagi kalau error
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // FUNGSI 1: Simpan Profil
  const handleSaveProfile = async () => {
    setIsSavingProfile(true);
    toast.loading("Menyimpan profil...", { id: "profile" });

    const result = await updateProfileAction(fullName, bio);

    if (result.success) {
      toast.success(result.message, { id: "profile" });
    } else {
      toast.error(result.message, { id: "profile" });
    }
    setIsSavingProfile(false);
  };

  // FUNGSI 2: Update Password
  const handleUpdatePassword = async () => {
    if (password !== confirmPassword) {
      toast.error("Password tidak cocok!");
      return;
    }
    if (password.length < 6) {
      toast.error("Password minimal 6 karakter!");
      return;
    }

    setIsUpdatingPassword(true);
    toast.loading("Memperbarui password...", { id: "password" });

    const result = await updatePasswordAction(password);

    if (result.success) {
      toast.success(result.message, { id: "password" });
      // Kosongkan kolom password setelah berhasil
      setPassword("");
      setConfirmPassword("");
    } else {
      toast.error(result.message, { id: "password" });
    }
    setIsUpdatingPassword(false);
  };

  return (
    <div className="max-w-4xl space-y-8 pb-12">
      <div>
        <h1
          className={`text-3xl font-bold transition-colors ${isDarkMode ? "text-foreground" : "text-zinc-900"}`}
        >
          Settings
        </h1>
        <p
          className={`mt-2 transition-colors ${isDarkMode ? "text-muted-foreground" : "text-zinc-600"}`}
        >
          Manage your account and preferences
        </p>
      </div>

      {/* Profile Section */}
      <div
        className={`rounded-2xl p-8 border transition-colors ${isDarkMode ? "bg-card border-border" : "bg-white border-zinc-200 shadow-sm"}`}
      >
        <h2
          className={`text-xl font-semibold mb-6 transition-colors ${isDarkMode ? "text-foreground" : "text-zinc-900"}`}
        >
          Profile Information
        </h2>

        <div className="space-y-8">
          {/* Avatar */}
          {/* Avatar */}
          <div className="flex items-end gap-4 mb-2">
            {/* Tampilan Foto atau Placeholder */}
            <div className="relative w-16 h-16 rounded-full overflow-hidden border border-zinc-200 bg-zinc-100 shrink-0">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt="Avatar"
                  fill // Ini butuh parent yang punya 'relative' dan ukuran (w-16 h-16)
                  sizes="64px"
                  className="object-cover"
                  unoptimized
                  // Debugging: Muncul di console browser kalau berhasil
                  onLoadingComplete={() =>
                    console.log("Gambar Settings Muncul!")
                  }
                />
              ) : (
                /* Pastikan pakai h-full w-full di sini supaya gradient-nya gak gepeng */
                <div className="h-full w-full bg-linear-to-br from-emerald-400 to-blue-500" />
              )}
            </div>

            {/* Input File Tersembunyi */}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleAvatarUpload}
            />

            {/* Tombol Pemantik */}
            <button
              type="button" // Biasakan kasih type button biar gak trigger submit form
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploadingAvatar}
              className={`px-4 py-2 rounded-lg border font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                isDarkMode
                  ? "border-border text-foreground hover:bg-muted"
                  : "border-zinc-300 text-zinc-900 hover:bg-zinc-100"
              }`}
            >
              {isUploadingAvatar ? "Uploading..." : "Change Avatar"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 transition-colors ${isDarkMode ? "text-foreground" : "text-zinc-900"}`}
              >
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors ${isDarkMode ? "bg-input border-border text-foreground focus:ring-accent/50" : "bg-white border-zinc-300 text-zinc-900 focus:ring-emerald-500/50"}`}
              />
            </div>

            {/* Email (KITA KUNCI / READ-ONLY) */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 transition-colors ${isDarkMode ? "text-foreground" : "text-zinc-900"}`}
              >
                Email{" "}
                <span className="text-xs text-zinc-500 font-normal">
                  (Cannot be changed)
                </span>
              </label>
              <input
                type="email"
                value={email}
                disabled
                className={`w-full px-4 py-3 rounded-lg border transition-colors opacity-70 cursor-not-allowed ${isDarkMode ? "bg-zinc-900 border-border text-zinc-400" : "bg-zinc-100 border-zinc-300 text-zinc-500"}`}
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 transition-colors ${isDarkMode ? "text-foreground" : "text-zinc-900"}`}
            >
              Bio
            </label>
            <textarea
              placeholder="Tell us about yourself..."
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors ${isDarkMode ? "bg-input border-border text-foreground placeholder-muted-foreground focus:ring-accent/50" : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-500 focus:ring-emerald-500/50"}`}
            />
          </div>

          {/* Save Button Profile */}
          <div className="pt-2">
            <button
              onClick={handleSaveProfile}
              disabled={isSavingProfile || !fullName}
              className={`px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${isDarkMode ? "bg-white text-zinc-900 hover:bg-zinc-200" : "bg-zinc-900 text-white hover:bg-zinc-800"}`}
            >
              {isSavingProfile ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div
        className={`rounded-2xl p-8 border transition-colors ${isDarkMode ? "bg-card border-border" : "bg-white border-zinc-200 shadow-sm"}`}
      >
        <h2
          className={`text-xl font-semibold mb-6 transition-colors ${isDarkMode ? "text-foreground" : "text-zinc-900"}`}
        >
          Security
        </h2>

        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Password */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 transition-colors ${isDarkMode ? "text-foreground" : "text-zinc-900"}`}
              >
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter new password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors ${isDarkMode ? "bg-input border-border text-foreground placeholder-muted-foreground focus:ring-accent/50" : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-500 focus:ring-emerald-500/50"}`}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 transition-colors ${isDarkMode ? "text-foreground" : "text-zinc-900"}`}
              >
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm new password..."
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors ${isDarkMode ? "bg-input border-border text-foreground placeholder-muted-foreground focus:ring-accent/50" : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-500 focus:ring-emerald-500/50"}`}
              />
            </div>
          </div>

          {/* Update Button Password */}
          <div className="pt-2">
            <button
              onClick={handleUpdatePassword}
              disabled={isUpdatingPassword || !password || !confirmPassword}
              className={`px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${isDarkMode ? "bg-white text-zinc-900 hover:bg-zinc-200" : "bg-zinc-900 text-white hover:bg-zinc-800"}`}
            >
              {isUpdatingPassword ? "Updating..." : "Update Password"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
