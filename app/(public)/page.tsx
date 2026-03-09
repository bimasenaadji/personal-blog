import { ArrowRight, Code2, Sprout, Popcorn } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="bg-white">
      {/* SECTION 1: HERO */}
      <section className="border-b border-zinc-200 px-8 py-20 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 md:grid-cols-2 md:gap-24 items-center">
            {/* Left: Placeholder Avatar (Nanti ganti foto) */}
            <div className="flex justify-center ">
              <div className="relative w-48 h-48 md:w-64 md:h-64 group">
                <div className="w-full h-full bg-zinc-100 rounded-3xl flex items-center justify-center border border-zinc-200 transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-xl overflow-hidden">
                  {/* TODO: Nanti ganti dengan <Image src="/fotomu.jpg" fill className="object-cover" /> */}
                  <div className="text-zinc-400 font-medium text-sm tracking-widest uppercase">
                    [ Foto Bima ]
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Bio */}
            <div className="space-y-8">
              <div className="space-y-4">
                {/* Hapus font-serif, ganti font-black biar tegas ala modern web */}
                <h1 className="text-5xl md:text-7xl font-bold leading-tight text-zinc-900 tracking-tighter">
                  Bima Sena Adji.
                </h1>
                <p className="text-xl font-medium text-zinc-500 leading-relaxed max-w-md">
                  Mahasiswa Informatika, pengetik kode, dan pengamat kehidupan.
                </p>
              </div>

              <p className="text-base text-zinc-600 leading-relaxed max-w-2xl">
                Selamat datang di taman digital saya. Ini bukan resume kaku,
                melainkan ruang tempat saya menjernihkan pikiran. Di sini kamu
                akan menemukan catatan tentang eksperimen teknologi, hingga
                hal-hal acak yang saya pelajari hari ini.
              </p>

              <div className="flex flex-wrap gap-6 pt-4">
                {/* Link disesuaikan dengan permintaanmu */}
                <a
                  href="#jejak-tulisan"
                  className="inline-flex items-center gap-2 text-zinc-900 font-bold border-b-2 border-zinc-900 pb-1 hover:text-zinc-500 hover:border-zinc-500 transition-colors"
                >
                  Jelajahi Catatan <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-zinc-500 font-bold border-b-2 border-transparent pb-1 hover:text-zinc-900 hover:border-zinc-900 transition-colors"
                >
                  Sapa Saya <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE 'NOW' PAGE */}
      <section className="px-8 py-16 bg-zinc-50 border-b border-zinc-100">
        <div className="mx-auto max-w-3xl">
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-zinc-200">
            <h2 className="text-xs font-bold tracking-widest uppercase text-zinc-400 mb-6">
              📌 Fokus Bulan Ini (Maret 2026)
            </h2>
            <p className="text-zinc-700 leading-relaxed text-lg">
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

      {/* SECTION 3 & 4 digabung warnanya biar nyambung (Terang) */}
      <section className="bg-white">
        {/* Ruang Pikiran */}
        <div className="px-8 py-24 mx-auto max-w-7xl border-b border-zinc-100">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight mb-4">
              Ruang Pikiran
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-8 rounded-3xl bg-zinc-50 hover:bg-zinc-100 transition-colors group cursor-pointer border border-zinc-200/60">
              <Code2 className="w-8 h-8 text-zinc-900 mb-6 opacity-70 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-xl font-bold text-zinc-900 mb-3">
                Catatan Teknis
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Eksplorasi Next.js, eksperimen Python, dan error yang bikin
                pusing seharian.
              </p>
            </div>
            {/* ... (Sisa kotak Ruang Pikiran sama, pastikan bg-zinc-50) ... */}
            <div className="p-8 rounded-3xl bg-zinc-50 hover:bg-zinc-100 transition-colors group cursor-pointer border border-zinc-200/60">
              <Sprout className="w-8 h-8 text-zinc-900 mb-6 opacity-70 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-xl font-bold text-zinc-900 mb-3">
                Ruang Tumbuh
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Manajemen waktu, cash flow, dan membahagiakan orang-orang
                tersayang.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-zinc-50 hover:bg-zinc-100 transition-colors group cursor-pointer border border-zinc-200/60">
              <Popcorn className="w-8 h-8 text-zinc-900 mb-6 opacity-70 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-xl font-bold text-zinc-900 mb-3">
                Pop-Culture
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Pelepas penat. Ulasan film, MCU, dan hiburan menemani akhir
                pekan.
              </p>
            </div>
          </div>
        </div>

        {/* Jejak Tulisan - SEKARANG WARNA TERANG */}
        <div className="px-8 py-24 mx-auto max-w-7xl" id="jejak-tulisan">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight mb-2">
                Jejak Tulisan
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden md:flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              Lihat semua <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Card Artikel - Disesuaikan untuk Light Mode */}
            <article className="group cursor-pointer flex flex-col gap-4">
              <div className="aspect-[4/3] w-full rounded-2xl bg-zinc-100 overflow-hidden border border-zinc-200">
                <div className="w-full h-full bg-gradient-to-br from-zinc-200 to-zinc-300 group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs text-zinc-500 font-medium">
                  <time>Maret 8, 2026</time>
                  <span>•</span>
                  <span className="uppercase tracking-wider">Ruang Tumbuh</span>
                </div>
                <h3 className="text-xl font-bold leading-tight group-hover:text-zinc-600 transition-colors text-zinc-900">
                  Bangkit dari Revisi dan Plot Twist Akademis
                </h3>
              </div>
            </article>

            {/* Tambahkan card 2 dan 3 dengan format yang sama... */}
            <article className="group cursor-pointer flex flex-col gap-4">
              <div className="aspect-[4/3] w-full rounded-2xl bg-zinc-100 overflow-hidden border border-zinc-200">
                <div className="w-full h-full bg-gradient-to-br from-zinc-200 to-zinc-300 group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs text-zinc-500 font-medium">
                  <time>Februari 28, 2026</time>
                  <span>•</span>
                  <span className="uppercase tracking-wider">
                    Catatan Teknis
                  </span>
                </div>
                <h3 className="text-xl font-bold leading-tight group-hover:text-zinc-600 transition-colors text-zinc-900">
                  Kenapa Saya Memilih Modular Monolith di Next.js
                </h3>
              </div>
            </article>

            <article className="group cursor-pointer flex flex-col gap-4">
              <div className="aspect-[4/3] w-full rounded-2xl bg-zinc-100 overflow-hidden border border-zinc-200">
                <div className="w-full h-full bg-gradient-to-br from-zinc-200 to-zinc-300 group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs text-zinc-500 font-medium">
                  <time>Februari 15, 2026</time>
                  <span>•</span>
                  <span className="uppercase tracking-wider">Pop-Culture</span>
                </div>
                <h3 className="text-xl font-bold leading-tight group-hover:text-zinc-600 transition-colors text-zinc-900">
                  Prediksi Gila: Siapa Saja yang Bertahan di Thunderbolts?
                </h3>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
