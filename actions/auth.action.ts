"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/db/client";
import { revalidatePath } from "next/cache";

// 1. Fungsi untuk Register
export async function signUpAction(
  fullName: string,
  email: string,
  password: string,
) {
  try {
    const supabase = await createClient();

    // A. Daftarkan email dan password ke brankas Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return { success: false, message: authError.message };
    }

    // B. Kalau sukses di Supabase, simpan profilnya ke tabel User di Prisma
    // Kita cek dulu biar nggak ada data ganda
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          email: email,
          name: fullName,
        },
      });
    }

    return { success: true, message: "Registrasi berhasil!" };
  } catch (error) {
    return { success: false, message: "Terjadi kesalahan pada server." };
  }
}

// 2. Fungsi untuk Login
export async function signInAction(email: string, password: string) {
  try {
    const supabase = await createClient();

    // Coba cocokkan email dan password di Supabase
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, message: "Email atau password salah!" };
    }

    revalidatePath("/dashboard");
    return { success: true, message: "Login berhasil!" };
  } catch (error) {
    return { success: false, message: "Terjadi kesalahan pada server." };
  }
}

// 3. Fungsi untuk Logout
export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/");
}

// 4. Fungsi untuk Update Profile (Nama & Bio)
export async function updateProfileAction(name: string, bio: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !user.email) {
      return { success: false, message: "Tidak ada akses." };
    }

    // Update data di database Prisma
    await prisma.user.update({
      where: { email: user.email },
      data: {
        name: name,
        bio: bio,
      },
    });

    // Refresh cache supaya nama di Sidebar dan Settings langsung berubah
    revalidatePath("/settings");
    revalidatePath("/dashboard", "layout");

    return { success: true, message: "Profil berhasil diperbarui!" };
  } catch (error) {
    return { success: false, message: "Gagal memperbarui profil." };
  }
}

// 5. Fungsi untuk Update Password
export async function updatePasswordAction(newPassword: string) {
  try {
    const supabase = await createClient();

    // Supabase punya fungsi bawaan khusus untuk ganti password user yang sedang login
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, message: "Password berhasil diperbarui!" };
  } catch (error) {
    return { success: false, message: "Gagal memperbarui password." };
  }
}

// 6. Fungsi untuk Update Avatar URL
export async function updateAvatarAction(avatarUrl: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !user.email)
      return { success: false, message: "Tidak ada akses." };

    await prisma.user.update({
      where: { email: user.email },
      data: { avatar: avatarUrl },
    });

    revalidatePath("/settings");
    revalidatePath("/dashboard", "layout"); // Refresh sidebar juga

    return { success: true, message: "Avatar berhasil diperbarui!" };
  } catch (error) {
    return { success: false, message: "Gagal memperbarui avatar." };
  }
}
