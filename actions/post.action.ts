"use server";

import { PostService } from "@/services/post.service";
import { revalidatePath } from "next/cache";

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
