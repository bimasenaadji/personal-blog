"use server";

import { PostService } from "@/services/post.service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { prisma } from "@/db/client";
import { createClient } from "@/lib/supabase/server";

export async function deletePostAction(id: string) {
  try {
    await PostService.deletePost(id);

    // Keajaiban Next.js: Perintahkan Next.js untuk me-refresh data di halaman '/posts'
    // secara otomatis tanpa harus me-reload browser secara penuh!
    revalidatePath("/posts");

    return { success: true };
  } catch (error) {
    console.error("Gagal menghapus post:", error);
    return { success: false, error: "Gagal menghapus post" };
  }
}

// Sekarang kita menerima tipe data FormData bawaan HTML
export async function createPostAction(formData: FormData) {
  try {
    // 1. Ambil Session User yang sedang login
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !user.email) {
      return { success: false, error: "Kamu harus login dulu bos!" };
    }

    // Ambil ID asli dari Prisma (karena table Post butuh authorId)
    const author = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!author) return { success: false, error: "User tidak ditemukan." };

    // 2. Ekstrak data teks
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const slug =
      (formData.get("slug") as string) ||
      title.toLowerCase().replace(/[\s\W-]+/g, "-");
    const categoryName = formData.get("category") as string;
    const isPublished = formData.get("status") === "Published";

    // 3. Ekstrak & Upload File Gambar
    const file = formData.get("coverImage") as File | null;
    let coverImageUrl = null;

    if (file && file.size > 0) {
      const fileExt = file.name.split(".").pop();
      const fileName = `blog-images/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      // SAMAKAN NAMA BUCKET: 'avatars'
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file);

      if (uploadError)
        throw new Error("Gagal upload gambar: " + uploadError.message);

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(fileName);
      coverImageUrl = publicUrl;
    }

    // 4. Simpan ke Database via Service
    // PASTIKAN PostService.createPost sudah menerima authorId
    await PostService.createPost({
      title,
      slug,
      content,
      categoryName,
      isPublished,
      coverImage: coverImageUrl,
      authorId: author.id, // KIRIM ID PENULIS ASLI
    });
  } catch (error: any) {
    console.error("Gagal membuat post:", error);
    return {
      success: false,
      error: error.message || "Gagal menyimpan tulisan.",
    };
  }

  // Bersihkan cache agar Dashboard & All Posts langsung update
  revalidatePath("/posts");
  revalidatePath("/dashboard");
  // redirect("/posts"); // Redirect ke halaman list post setelah berhasil membuat
}

// Pastikan parameter keduanya tipe datanya adalah FormData
export async function updatePostAction(id: string, formData: FormData) {
  try {
    // 1. Ekstrak data teks pakai .get()
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const slug =
      (formData.get("slug") as string) ||
      title.toLowerCase().replace(/[\s\W-]+/g, "-");
    const categoryName = formData.get("category") as string;
    const isPublished = formData.get("status") === "Published";

    // 2. Ekstrak File Gambar & URL gambar lama (kalau user nggak ganti gambar)
    const file = formData.get("coverImage") as File | null;
    let coverImageUrl = formData.get("existingImageUrl") as string | null;

    // 3. PROSES UPLOAD KE CLOUD (HANYA JALAN JIKA USER GANTI GAMBAR BARU)
    if (file && file.size > 0) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(fileName, buffer, {
          contentType: file.type,
        });

      if (uploadError) {
        console.error("Supabase Upload Error:", uploadError.message);
        throw new Error(`Gagal upload: ${uploadError.message}`);
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("blog-images").getPublicUrl(fileName);

      coverImageUrl = publicUrl; // Timpa URL lama dengan URL gambar yang baru diupload
    }

    // 4. Update ke Database via Service
    await PostService.updatePost(id, {
      title,
      slug,
      content,
      categoryName,
      isPublished,
      coverImage: coverImageUrl,
    });
  } catch (error) {
    console.error("Gagal update post:", error);
    return { success: false, error: "Gagal mengupdate tulisan." };
  }

  // 5. Bersihkan Cache dan Redirect
  revalidatePath("/posts");
  revalidatePath("/editor");
  // redirect("/posts");
}
