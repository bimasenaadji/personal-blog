import { getRecentPosts } from "@/services/post.service";
import { ArrowRight, Code2, Sprout, Popcorn } from "lucide-react";
import Link from "next/link";

export default async function LandingPage() {
  // Panggil service untuk menarik 3 artikel terbaru
  const recentPosts = await getRecentPosts(3);
  return (
    // Tambahkan dark:bg-zinc-950 sebagai fondasi gelap
    <div className="bg-white dark:bg-zinc-950 transition-colors duration-300">
      {/* SECTION 1: HERO */}
      <section className="border-b border-zinc-200 dark:border-zinc-800 px-8 py-20 md:py-32 transition-colors duration-300">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 md:grid-cols-2 md:gap-24 items-center">
            {/* Left: Placeholder Avatar */}
            <div className="flex justify-center ">
              <div className="relative w-48 h-48 md:w-64 md:h-64 group">
                {/* Background placeholder disesuaikan untuk dark mode */}
                <div className="w-full h-full bg-zinc-100 dark:bg-zinc-900 rounded-3xl flex items-center justify-center border border-zinc-200 dark:border-zinc-800 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl dark:group-hover:shadow-zinc-900/50 overflow-hidden">
                  <div className="text-zinc-400 dark:text-zinc-600 font-medium text-sm tracking-widest uppercase">
                    [ Foto Bima ]
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Bio */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold leading-tight text-zinc-900 dark:text-zinc-100 tracking-tighter transition-colors duration-300">
                  Bima Sena Adji.
                </h1>
                <p className="text-xl font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-md transition-colors duration-300">
                  Mahasiswa Informatika, pengetik kode, dan pengamat kehidupan.
                </p>
              </div>

              <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl transition-colors duration-300">
                Selamat datang di taman digital saya. Ini bukan resume kaku,
                melainkan ruang tempat saya menjernihkan pikiran. Di sini kamu
                akan menemukan catatan tentang eksperimen teknologi, hingga
                hal-hal acak yang saya pelajari hari ini.
              </p>

              <div className="flex flex-wrap gap-6 pt-4">
                {/* Link Primary: Diubah warnanya agar menyesuaikan dark/light */}
                <a
                  href="#jejak-tulisan"
                  className="inline-flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold border-b-2 border-zinc-900 dark:border-zinc-100 pb-1 hover:text-zinc-500 hover:border-zinc-500 dark:hover:text-zinc-400 dark:hover:border-zinc-400 transition-colors"
                >
                  Jelajahi Catatan <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-zinc-500 dark:text-zinc-400 font-bold border-b-2 border-transparent pb-1 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-900 dark:hover:border-zinc-100 transition-colors"
                >
                  Sapa Saya <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE 'NOW' PAGE */}
      <section className="px-8 py-16 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-800 transition-colors duration-300">
        <div className="mx-auto max-w-3xl">
          <div className="bg-white dark:bg-zinc-900 p-8 md:p-10 rounded-3xl shadow-sm dark:shadow-none border border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
            <h2 className="text-xs font-bold tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-6 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 dark:bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 dark:bg-green-400"></span>
              </span>
              📌 Fokus Bulan Ini (Maret 2026)
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-lg transition-colors duration-300">
              Baru saja melewati sedikit <i>plot twist</i> di presentasi
              proposal tugas akhir, tapi proses harus tetap berjalan. Saat ini
              sedang menata ulang strategi belajar, membagi waktu dengan kerja{" "}
              <i>part-time</i> di studio, dan memperbaiki literasi finansial. Di
              sela-sela rutinitas, saya sedang intens belajar bahasa Inggris dan
              menyusun teori konspirasi soal karakter di MCU.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 & 4 */}
      <section className="bg-white dark:bg-zinc-950 transition-colors duration-300">
        {/* Ruang Pikiran */}
        <div className="px-8 py-24 mx-auto max-w-7xl border-b border-zinc-100 dark:border-zinc-800 transition-colors duration-300">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight mb-4 transition-colors duration-300">
              Ruang Pikiran
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors group cursor-pointer border border-zinc-200/60 dark:border-zinc-800">
              <Code2 className="w-8 h-8 text-zinc-900 dark:text-zinc-100 mb-6 opacity-70 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 transition-colors duration-300">
                Catatan Teknis
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed transition-colors duration-300">
                Eksplorasi Next.js, eksperimen Python, dan error yang bikin
                pusing seharian.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors group cursor-pointer border border-zinc-200/60 dark:border-zinc-800">
              <Sprout className="w-8 h-8 text-zinc-900 dark:text-zinc-100 mb-6 opacity-70 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 transition-colors duration-300">
                Ruang Tumbuh
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed transition-colors duration-300">
                Manajemen waktu, cash flow, dan membahagiakan orang-orang
                tersayang.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors group cursor-pointer border border-zinc-200/60 dark:border-zinc-800">
              <Popcorn className="w-8 h-8 text-zinc-900 dark:text-zinc-100 mb-6 opacity-70 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 transition-colors duration-300">
                Pop-Culture
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed transition-colors duration-300">
                Pelepas penat. Ulasan film, MCU, dan hiburan menemani akhir
                pekan.
              </p>
            </div>
          </div>
        </div>

        {/* Jejak Tulisan (Tarik dari Prisma!) */}
        <div className="px-8 py-24 mx-auto max-w-7xl" id="jejak-tulisan">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight mb-2 transition-colors duration-300">
                Jejak Tulisan
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden md:flex items-center gap-2 text-sm font-semibold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              Lihat semua <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {recentPosts.length > 0 ? (
              recentPosts.map((post) => (
                <article
                  key={post.slug}
                  className="group cursor-pointer flex flex-col gap-4"
                >
                  <Link href={`/blog/${post.slug}`} className="block h-full">
                    {/* Kotak Gambar */}
                    <div className="aspect-[4/3] w-full rounded-2xl bg-zinc-100 dark:bg-zinc-900 overflow-hidden border border-zinc-200 dark:border-zinc-800 transition-colors duration-300 relative">
                      {post.coverImage ? (
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900 group-hover:scale-105 transition-transform duration-500" />
                      )}
                    </div>

                    {/* Teks Artikel */}
                    <div className="space-y-2 mt-5">
                      <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 font-medium transition-colors duration-300">
                        <time>{post.date}</time>
                        <span>•</span>
                        <span className="uppercase tracking-wider font-bold text-zinc-700 dark:text-zinc-300">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold leading-tight text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                </article>
              ))
            ) : (
              // Empty State kalau database masih kosong
              <div className="col-span-full py-12 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
                <p className="text-zinc-500 dark:text-zinc-400 font-medium">
                  Belum ada jejak tulisan yang ditinggalkan.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
