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
  Type,
  Settings as SettingsIcon,
  Loader2,
} from "lucide-react";
import { createPostAction, updatePostAction } from "@/actions/post.action";
import Link from "next/link";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface CreateNewViewProps {
  existingCategories: string[];
  initialData?: any;
}

export default function CreateNewView({
  existingCategories,
  initialData,
}: CreateNewViewProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [coverImage, setCoverImage] = useState<string | null>(
    initialData?.coverImage || null,
  );
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);

  const [activeTab, setActiveTab] = useState<"write" | "settings">("write");
  const [showCategories, setShowCategories] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [loadingType, setLoadingType] = useState<"Draft" | "Published" | null>(
    null,
  );
  const router = useRouter();

  useEffect(() => {
    if (title && !initialData) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[\s\W-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setSlug(generatedSlug);
    }
  }, [title, initialData]);

  const editor = useEditor({
    extensions: [StarterKit],
    content: initialData?.content || "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => setContent(editor.getHTML()),
    editorProps: {
      attributes: {
        // KUNCI: Gunakan prose-invert di dark mode agar teks otomatis putih
        class: `prose prose-sm sm:prose-base lg:prose-lg focus:outline-none max-w-none min-h-[500px] dark:prose-invert`,
      },
    },
  });

  const handleSubmit = (clickedStatus: "Draft" | "Published") => {
    if (!title) return toast.error("Judul wajib diisi!");
    if (!content || content === "<p></p>") return toast.error("Konten kosong!");
    if (!category) return toast.error("Pilih kategori!");

    // --- MULAI SIHIR UX ---
    setLoadingType(clickedStatus); // Set siapa yang lagi kerja
    const toastId = toast.loading("Processing...");

    startTransition(async () => {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("slug", slug);
      formData.append("category", category);
      formData.append("status", clickedStatus);

      if (fileToUpload) formData.append("coverImage", fileToUpload);
      else if (initialData?.coverImage)
        formData.append("existingImageUrl", initialData.coverImage);

      const response = initialData?.id
        ? await updatePostAction(initialData.id, formData)
        : await createPostAction(formData);

      if (response?.error)
        toast.error(response.error, { id: toastId }); // Ganti loading jadi error
      else
        toast.success(
          initialData?.id ? "Berhasil diupdate!" : "Post berhasil dibuat!",
          { id: toastId },
        );
      setTimeout(() => {
        router.push("/posts");
      }, 500);
      setLoadingType(null);
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileToUpload(file);
      setCoverImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="relative lg:static flex flex-col h-full transition-colors bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white">
      {/* HEADER */}
      <header className="sticky top-0 z-40 px-4 py-4 flex items-center justify-between border-b backdrop-blur-md transition-colors border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80">
        <div className="flex items-center gap-3">
          <Link
            href="/posts"
            className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <ChevronLeft size={20} />
          </Link>
          <div className="flex flex-col">
            <h2 className="text-sm font-bold leading-none">Editor</h2>
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">
              {initialData ? "Editing" : "New Post"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSubmit("Draft")}
            disabled={isPending}
            className="px-4 py-2 text-xs font-bold rounded-full bg-zinc-200 dark:bg-zinc-800 hover:opacity-80 transition-opacity uppercase tracking-wider text-zinc-900 dark:text-zinc-100"
          >
            {isPending && loadingType === "Draft" ? "Saving..." : "Save Draft"}
          </button>
          <button
            onClick={() => handleSubmit("Published")}
            disabled={isPending}
            className="px-5 py-2 text-xs font-bold rounded-full bg-zinc-900 dark:bg-zinc-200 text-white dark:text-black hover:opacity-80 transition-opacity uppercase tracking-wider"
          >
            {isPending && loadingType === "Published"
              ? "Publishing..."
              : "Publish"}
          </button>
        </div>
      </header>

      {/* MOBILE TAB SWITCHER */}
      <div className="lg:hidden flex border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 sticky top-[65px] z-30">
        <button
          onClick={() => setActiveTab("write")}
          className={`flex-1 py-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest border-b-2 transition-all ${activeTab === "write" ? "border-zinc-900 dark:border-white text-zinc-900 dark:text-white" : "border-transparent text-zinc-500"}`}
        >
          <Type size={16} /> Write
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`flex-1 py-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest border-b-2 transition-all ${activeTab === "settings" ? "border-zinc-900 dark:border-white text-zinc-900 dark:text-white" : "border-transparent text-zinc-500"}`}
        >
          <SettingsIcon size={16} /> Settings
        </button>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-visible">
        {/* EDITOR AREA */}
        <div
          className={`flex-1 ${activeTab === "write" ? "block" : "hidden lg:block"}`}
        >
          <div className="max-w-4xl mx-auto py-8 lg:py-12 px-6 lg:px-10">
            <textarea
              placeholder="Post Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-4xl lg:text-4xl font-black bg-transparent border-none outline-none mb-10 placeholder-zinc-200 dark:placeholder-zinc-900 resize-none h-auto text-zinc-900 dark:text-white"
              rows={1}
            />

            {/* FLOATING TOOLBAR */}
            <div className="sticky top-[75px] lg:top-[85px] z-20 py-3 px-4 mb-8 rounded-2xl border shadow-sm flex gap-2 items-center overflow-x-auto no-scrollbar bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <button
                onClick={() => editor?.chain().focus().toggleBold().run()}
                className={`p-2 rounded-xl transition-colors ${editor?.isActive("bold") ? "bg-zinc-200 dark:bg-zinc-800 text-emerald-500" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}
              >
                <Bold size={18} />
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                className={`p-2 rounded-xl transition-colors ${editor?.isActive("italic") ? "bg-zinc-200 dark:bg-zinc-800 text-emerald-500" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}
              >
                <Italic size={18} />
              </button>
              <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800 mx-1" />
              <button
                onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
                className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl text-zinc-600 dark:text-zinc-400"
              >
                <Code size={18} />
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl text-zinc-600 dark:text-zinc-400"
              >
                <Quote size={18} />
              </button>
            </div>

            <div className="min-h-[600px]">
              <EditorContent editor={editor} />
            </div>
          </div>
        </div>

        {/* SETTINGS SIDEBAR */}
        <aside
          className={`w-full lg:w-[350px] lg:sticky lg:top-[80px] lg:h-[calc(100vh-80px)] p-6 lg:p-10 space-y-10 border-l border-zinc-200 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/50 ${activeTab === "settings" ? "block" : "hidden lg:block"}`}
        >
          <section>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-6">
              Cover Image
            </h3>
            {coverImage ? (
              <div className="relative rounded-3xl overflow-hidden aspect-video border border-zinc-200 dark:border-zinc-800 shadow-xl group">
                <img
                  src={coverImage}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  alt="Cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => {
                      setCoverImage(null);
                      setFileToUpload(null);
                    }}
                    className="p-3 bg-white text-red-600 rounded-full shadow-2xl hover:scale-110 transition-transform"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center aspect-video border-2 border-dashed rounded-3xl cursor-pointer hover:bg-white dark:hover:bg-zinc-900 border-zinc-300 dark:border-zinc-800 transition-all group">
                <ImageIcon
                  size={32}
                  className="text-zinc-300 group-hover:text-zinc-500 transition-colors mb-2"
                />
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  Add Cover
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </section>

          <section className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-6">
              Metadata
            </h3>
            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold mb-2 block">Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  onFocus={() => setShowCategories(true)}
                  onBlur={() => setTimeout(() => setShowCategories(false), 200)}
                  className="w-full p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm text-zinc-900 dark:text-white"
                  placeholder="Search or Create..."
                />
                {showCategories && existingCategories.length > 0 && (
                  <div className="mt-2 border rounded-2xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-2xl">
                    {existingCategories.map((cat, i) => (
                      <div
                        key={i}
                        onClick={() => setCategory(cat)}
                        className="p-4 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer border-b last:border-0 border-zinc-100 dark:border-zinc-800"
                      >
                        {cat}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label className="text-xs font-bold mb-2 block text-zinc-900 dark:text-zinc-200">
                  Slug URL
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 outline-none text-xs text-zinc-500"
                />
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
