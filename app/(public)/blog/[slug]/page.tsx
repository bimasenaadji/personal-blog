import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

// Simulasi pengambilan data berdasarkan ID
// Nanti ini diganti pakai Prisma: await prisma.post.findUnique(...)
const getMockPost = (id: string) => {
  return {
    title: "Bangkit dari Revisi dan Plot Twist Akademis",
    date: "Maret 8, 2026",
    category: "Ruang Tumbuh",
    readTime: "4 min read",
    content: `
      Kadang rencana tidak berjalan mulus, tapi di situlah mental kita diuji. Hari ini, ruangan presentasi itu terasa lebih dingin dari biasanya. Ada beberapa catatan tebal yang harus diperbaiki, dan ekspektasi yang tampaknya harus ditata ulang.
      
      Gagal atau diminta merevisi di tahap proposal (sempro) bukanlah akhir dari dunia, meskipun rasanya cukup memukul ego. Sebagai mahasiswa Informatika yang terbiasa men-debug kode sampai tengah malam, saya sadar bahwa skripsi ini ibarat sebuah sistem yang sedang mengalami 'runtime error'. 
      
      Yang perlu dilakukan bukanlah menutup aplikasinya, melainkan mencari tahu di baris mana logikanya meleset. Saya harus menata ulang jadwal, membagi fokus antara pekerjaan part-time di studio dan target kelulusan ini.
      
      Tulisan ini adalah pengingat untuk diri sendiri di masa depan: Bahwa proses mendewasa itu tidak selamanya berjalan lurus. Terkadang kita harus memutar, memperbaiki fondasi, sebelum akhirnya benar-benar siap membangun sesuatu yang besar.
    `,
  };
};

export default function BlogDetail({ params }: { params: { slug: string } }) {
  const post = getMockPost(params.slug);

  return (
    <article className="bg-white dark:bg-zinc-950 min-h-screen px-8 py-24 transition-colors duration-300">
      {/* Lebar artikel dibatasi max-w-2xl atau 3xl agar mata pembaca tidak lelah */}
      <div className="mx-auto max-w-2xl">
        {/* Navigasi Kembali */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 mb-12 transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Jejak Tulisan
        </Link>

        {/* Header Artikel */}
        <header className="mb-12 border-b border-zinc-200 dark:border-zinc-800 pb-10">
          <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400 font-medium mb-6">
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
            <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-lg">
              ☕
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Bima Sena Adji
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Penulis & Pengamat
              </p>
            </div>
          </div>
        </header>

        {/* Konten Artikel */}
        {/* Nanti kalau pakai Markdown/Rich Text, kita pakai plugin Tailwind Typography (prose) */}
        <div className="prose prose-zinc dark:prose-invert max-w-none text-lg leading-loose text-zinc-700 dark:text-zinc-300 transition-colors duration-300">
          {/* Untuk sementara kita render manual pakai split paragraph karena datanya mock */}
          {post.content.split("\n\n").map((paragraph, index) => (
            <p key={index} className="mb-6">
              {paragraph.trim()}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
