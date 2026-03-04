"use client";

import { useState, useTransition, useEffect } from "react";
import {
  Bold,
  Italic,
  Code,
  Quote,
  X,
  ChevronLeft,
  Image as ImageIcon,
} from "lucide-react";
import { createPostAction, updatePostAction } from "@/actions/post.action"; // IMPORT ACTION UPDATE
import Link from "next/link";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import toast from "react-hot-toast";

interface CreateNewViewProps {
  isDarkMode: boolean;
  existingCategories: string[];
  initialData?: any; // BISA MENERIMA DATA LAMA
}

export default function CreateNewView({
  isDarkMode,
  existingCategories,
  initialData,
}: CreateNewViewProps) {
  // Masukkan data lama sebagai nilai awal (kalau ada)
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [coverImage, setCoverImage] = useState<string | null>(
    initialData?.coverImage || null,
  );
  // Tambahkan state ini untuk menampung file mentah
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [status, setStatus] = useState<"Draft" | "Published">(
    initialData?.status || "Draft",
  );

  const [showCategories, setShowCategories] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Otomatis update slug cuma kalau ini postingan baru (initialData kosong)
  useEffect(() => {
    if (title && !initialData) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[\s\W-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setSlug(generatedSlug);
    }
  }, [title, initialData]);

  // Setup Tiptap (Kasih initial content)
  const editor = useEditor({
    extensions: [StarterKit],
    content: initialData?.content || "", // MUNCULKAN KONTEN LAMA
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: `prose prose-sm sm:prose-base lg:prose-lg focus:outline-none max-w-none min-h-[400px] ${isDarkMode ? "prose-invert" : ""}`,
      },
    },
  });

  // LOGIC SUBMIT (Deteksi: Ini Create atau Update?)
  const handleSubmit = (clickedStatus: "Draft" | "Published") => {
    if (!title) return toast.error("Judul wajib diisi ya!");
    if (!content || content === "<p></p>")
      return toast.error("Konten nggak boleh kosong!");
    if (!category) return toast.error("Pilih atau ketik kategori dulu!");

    startTransition(async () => {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("slug", slug);
      formData.append("category", category);
      formData.append("status", clickedStatus);

      if (fileToUpload) {
        formData.append("coverImage", fileToUpload);
      } else if (initialData?.coverImage && coverImage !== null) {
        formData.append("existingImageUrl", initialData.coverImage);
      }

      // 1. Eksekusi action TANPA try-catch, simpan hasil return-nya
      const response = initialData?.id
        ? await updatePostAction(initialData.id, formData) // Pastikan updatePostAction nanti diaktifkan
        : await createPostAction(formData);

      // 2. Cek apakah ada error dari return Server Action
      if (response?.error) {
        toast.error(response.error);
      } else {
        // Kalau nggak ada error, berarti sukses dan redirect() Next.js akan berjalan otomatis
        toast.success(
          initialData?.id ? "Berhasil diupdate!" : "Berhasil disimpan!",
        );
      }
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileToUpload(file); // Simpan file fisiknya untuk dikirim ke server

      // Buat URL sementara HANYA untuk preview di layar (bukan untuk disimpan)
      const previewUrl = URL.createObjectURL(file);
      setCoverImage(previewUrl);
    }
  };

  return (
    <div
      className={`min-h-full flex flex-col transition-colors ${isDarkMode ? "bg-zinc-950" : "bg-zinc-50"}`}
    >
      {/* HEADER */}
      <header
        className={`sticky top-0 z-40 px-6 py-4 flex items-center justify-between border-b transition-colors ${
          isDarkMode
            ? "bg-zinc-950/80 border-zinc-800"
            : "bg-white/80 border-zinc-200"
        } backdrop-blur-md`}
      >
        <div className="flex items-center gap-4">
          <Link
            href="/posts"
            className={`p-2 rounded-lg transition-colors ${isDarkMode ? "hover:bg-zinc-800 text-zinc-400" : "hover:bg-zinc-100 text-zinc-600"}`}
          >
            <ChevronLeft size={20} />
          </Link>
          <span
            className={`text-sm font-medium ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}
          >
            {initialData
              ? "Mengedit Postingan"
              : title
                ? "Menulis postingan baru..."
                : "Draft Kosong"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleSubmit("Draft")}
            disabled={isPending}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isDarkMode
                ? "bg-zinc-800 text-white hover:bg-zinc-700"
                : "bg-zinc-200 text-zinc-900 hover:bg-zinc-300"
            } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isPending ? "Menyimpan..." : "Simpan Draft"}
          </button>
          <button
            onClick={() => handleSubmit("Published")}
            disabled={isPending}
            className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors ${
              isDarkMode
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-zinc-900 hover:bg-zinc-800"
            } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isPending
              ? "Memproses..."
              : initialData?.status === "Published"
                ? "Update Post"
                : "Publish Sekarang"}
          </button>
        </div>
      </header>

      {/* LAYOUT UTAMA */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full">
        <div className="flex-1 px-6 py-10 lg:px-12 lg:border-r border-zinc-200 dark:border-zinc-800">
          <div className="max-w-3xl mx-auto space-y-8">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Judul Postingan..."
              className={`w-full text-4xl md:text-5xl font-bold bg-transparent border-none focus:outline-none placeholder-zinc-300 dark:placeholder-zinc-700 transition-colors ${
                isDarkMode ? "text-white" : "text-zinc-900"
              }`}
            />

            {editor && (
              <div
                className={`flex items-center gap-1.5 p-1.5 border rounded-xl w-max transition-colors shadow-sm ${
                  isDarkMode
                    ? "border-zinc-800 bg-zinc-900/50"
                    : "border-zinc-200 bg-white"
                }`}
              >
                <button
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={`p-2 rounded-lg transition-all duration-200 ${editor.isActive("bold") ? (isDarkMode ? "bg-zinc-700 text-white" : "bg-zinc-200 text-zinc-900 shadow-inner") : isDarkMode ? "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300" : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700"}`}
                >
                  <Bold size={18} />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={`p-2 rounded-lg transition-all duration-200 ${editor.isActive("italic") ? (isDarkMode ? "bg-zinc-700 text-white" : "bg-zinc-200 text-zinc-900 shadow-inner") : isDarkMode ? "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300" : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700"}`}
                >
                  <Italic size={18} />
                </button>
                <div
                  className={`w-px h-6 mx-1 ${isDarkMode ? "bg-zinc-800" : "bg-zinc-200"}`}
                ></div>
                <button
                  onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                  className={`p-2 rounded-lg transition-all duration-200 ${editor.isActive("codeBlock") ? (isDarkMode ? "bg-zinc-700 text-white" : "bg-zinc-200 text-zinc-900 shadow-inner") : isDarkMode ? "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300" : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700"}`}
                >
                  <Code size={18} />
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().toggleBlockquote().run()
                  }
                  className={`p-2 rounded-lg transition-all duration-200 ${editor.isActive("blockquote") ? (isDarkMode ? "bg-zinc-700 text-white" : "bg-zinc-200 text-zinc-900 shadow-inner") : isDarkMode ? "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300" : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700"}`}
                >
                  <Quote size={18} />
                </button>
              </div>
            )}

            <div
              className="min-h-[500px] cursor-text text-zinc-800 dark:text-zinc-200"
              onClick={() => editor?.commands.focus()}
            >
              <EditorContent editor={editor} />
            </div>
          </div>
        </div>

        <aside className="w-full lg:w-80 p-6 lg:p-8 space-y-8 bg-zinc-50 dark:bg-zinc-950">
          <div>
            <label
              className={`block text-xs font-semibold uppercase tracking-wider mb-3 ${isDarkMode ? "text-zinc-500" : "text-zinc-500"}`}
            >
              Cover Image
            </label>
            {coverImage ? (
              <div className="relative group rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
                <img
                  src={coverImage}
                  alt="Cover"
                  className="w-full h-40 object-cover"
                />
                <button
                  onClick={() => setCoverImage(null)}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-sm"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <label
                className={`flex flex-col items-center justify-center gap-2 h-40 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${isDarkMode ? "border-zinc-800 hover:border-zinc-600 bg-zinc-900" : "border-zinc-300 hover:border-zinc-400 bg-white"}`}
              >
                <ImageIcon size={24} className="text-zinc-400" />
                <span className="text-sm text-zinc-500 font-medium">
                  Upload Image
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <div className="relative">
            <label
              className={`block text-xs font-semibold uppercase tracking-wider mb-3 ${isDarkMode ? "text-zinc-500" : "text-zinc-500"}`}
            >
              Kategori
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              onFocus={() => setShowCategories(true)}
              onBlur={() => setTimeout(() => setShowCategories(false), 200)}
              placeholder="Pilih atau ketik baru..."
              className={`w-full px-4 py-2.5 rounded-lg text-sm border focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-colors ${isDarkMode ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-zinc-300 text-zinc-900"}`}
            />
            {showCategories && existingCategories.length > 0 && (
              <div
                className={`absolute z-10 w-full mt-2 rounded-lg border shadow-xl max-h-48 overflow-y-auto transition-colors ${isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200"}`}
              >
                {existingCategories
                  .filter((cat) =>
                    cat.toLowerCase().includes(category.toLowerCase()),
                  )
                  .map((cat, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setCategory(cat);
                        setShowCategories(false);
                      }}
                      className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${isDarkMode ? "hover:bg-zinc-800 text-zinc-300" : "hover:bg-zinc-50 text-zinc-700"}`}
                    >
                      {cat}
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div>
            <label
              className={`block text-xs font-semibold uppercase tracking-wider mb-3 ${isDarkMode ? "text-zinc-500" : "text-zinc-500"}`}
            >
              URL Slug
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className={`w-full px-4 py-2.5 rounded-lg text-sm border focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-colors ${isDarkMode ? "bg-zinc-900 border-zinc-800 text-zinc-400" : "bg-white border-zinc-300 text-zinc-500"}`}
            />
            <p className="mt-2 text-xs text-zinc-500">
              Otomatis dibuat dari judul, tapi bisa diedit manual.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
