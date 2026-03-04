"use server";

import { PostService } from "@/services/post.service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

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
    // 1. Ekstrak data teks biasa
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const slug =
      (formData.get("slug") as string) ||
      title.toLowerCase().replace(/[\s\W-]+/g, "-");
    const categoryName = formData.get("category") as string;
    const isPublished = formData.get("status") === "Published";

    // 2. Ekstrak File Gambar
    const file = formData.get("coverImage") as File | null;
    let coverImageUrl = null; // Nilai default kalau user gak upload gambar

    // 3. PROSES UPLOAD KE CLOUD STORAGE
    if (file && file.size > 0) {
      // Bikin nama file unik (biar gak bentrok kalau ada gambar namanya sama)
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      // Upload fisik file-nya ke bucket 'blog-images'
      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(fileName, file);

      if (uploadError) throw new Error("Gagal upload gambar ke storage.");

      // Ambil Link (URL) publiknya
      const {
        data: { publicUrl },
      } = supabase.storage.from("blog-images").getPublicUrl(fileName);

      // Simpan URL-nya ke variabel kita
      coverImageUrl = publicUrl;
    }

    // 4. Simpan URL ke Database (Tabel Post)
    await PostService.createPost({
      title,
      slug,
      content,
      categoryName,
      isPublished,
      coverImage: coverImageUrl, // YAY! Sekarang yang masuk DB murni cuma URL (teks pendek)
    });
  } catch (error) {
    console.error("Gagal membuat post:", error);
    return { success: false, error: "Gagal menyimpan tulisan." };
  }

  revalidatePath("/posts");
  revalidatePath("/editor");
  redirect("/posts");
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
  redirect("/posts");
}
