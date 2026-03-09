import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { getPostBySlug } from "@/services/post.service"; // Import service-nya

// PENTING: Karena ini app router versi terbaru, params diakses secara asynchronous (await params)
export default async function BlogDetail({
  params,
}: {
  params: { slug: string };
}) {
  // Tunggu params resolve dulu (Aturan baru Next.js)
  const resolvedParams = await params;

  // Tarik data asli dari database via Service
  const post = await getPostBySlug(resolvedParams.slug);

  // Kalau artikel dengan slug tersebut tidak ada di database -> Munculkan halaman 404
  if (!post) {
    notFound();
  }

  return (
    <article className="bg-white dark:bg-zinc-950 min-h-screen px-8 py-24 transition-colors duration-300">
      <div className="mx-auto max-w-2xl">
        {/* Navigasi Kembali */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 mb-12 transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Jejak Tulisan
        </Link>

        {/* Gambar Cover Artikel (Opsional, muncul kalau post.coverImage ada) */}
        {post.coverImage && (
          <div className="w-full aspect-video rounded-3xl overflow-hidden mb-12 border border-zinc-200 dark:border-zinc-800">
            <img
              src={post.coverImage}
              alt={`Cover dari ${post.title}`}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Header Artikel */}
        <header className="mb-12 border-b border-zinc-200 dark:border-zinc-800 pb-10">
          <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400 font-medium mb-6">
            <span className="uppercase tracking-widest text-zinc-900 dark:text-zinc-300 font-bold">
              {post.category}
            </span>
            <span>•</span>
            <time>{post.date}</time>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {post.readTime}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-zinc-100 leading-tight tracking-tight mb-8 transition-colors duration-300">
            {post.title}
          </h1>

          {/* Profil Penulis Singkat */}
          <div className="flex items-center gap-4 mt-8">
            <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-lg overflow-hidden border border-zinc-300 dark:border-zinc-700">
              {/* Nanti kalau kamu punya avatar di schema User, taruh <img src={user.avatar}> di sini */}
              ☕
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                {post.authorName}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Penulis & Pengamat
              </p>
            </div>
          </div>
        </header>

        {/* Konten Artikel */}
        <div className="prose prose-zinc dark:prose-invert max-w-none text-lg leading-loose text-zinc-700 dark:text-zinc-300 transition-colors duration-300">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>
    </article>
  );
}
