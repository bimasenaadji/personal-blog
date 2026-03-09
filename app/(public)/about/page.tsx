// IMPORT Image dari next/image untuk optimasi gambar otomatis
import Image from "next/image";
import {
  BookOpen,
  Briefcase,
  Code2,
  Coffee,
  Heart,
  MapPin,
  Sparkles,
} from "lucide-react";

export default function AboutPage() {
  return (
    <section className="bg-white dark:bg-zinc-950 min-h-screen px-8 py-24 md:py-32 transition-colors duration-300">
      <div className="mx-auto max-w-3xl">
        {/* =========================================
            HEADER: JUDUL & LOKASI
            ========================================= */}
        <div className="mb-12 md:mb-16">
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-zinc-900 dark:text-zinc-100 tracking-tighter transition-colors duration-300">
            Di Balik Layar.
          </h1>
          <p className="text-xl font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed transition-colors duration-300 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-zinc-400" /> Surabaya, Indonesia
          </p>
        </div>

        {/* =========================================
            CINEMATIC BANNER FOTO (Penambahan Baru)
            ========================================= */}
        <div className="mb-16 md:mb-20">
          <div className="aspect-[16/9] md:aspect-[21/9] w-full rounded-3xl bg-zinc-100 dark:bg-zinc-900 overflow-hidden border border-zinc-200 dark:border-zinc-800 transition-colors duration-300 relative group shadow-inner">
            {/* TODO: JIKA SUDAH ADA FOTO, HAPUS DIV PLACEHOLDER DI BAWAH & NYALAKAN KODE <Image> INI */}
            {/* Pastikan foto ditaruh di folder /public/images/bima-banner.jpg */}
            {/* <Image 
              src="/images/bima-banner.jpg" 
              alt="Bima Sena Adji - Banner Profile" 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" 
              priority
            /> 
            */}

            {/* DIV PLACEHOLDER (Sementara) */}
            <div className="w-full h-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800/50 flex items-center justify-center">
              <div className="text-center space-y-2">
                <span className="text-zinc-400 dark:text-zinc-600 font-mono text-sm tracking-widest uppercase">
                  [ Banner Foto Lebar Bima ]
                </span>
                <p className="text-xs text-zinc-500 dark:text-zinc-700">
                  Rekomendasi ukuran: 21:9 (Sangat Lebar)
                </p>
              </div>
            </div>

            {/* Overlay Gradient Halus agar terlihat mahal */}
            <div className="absolute inset-0 bg-black/5 dark:bg-black/10" />
          </div>
        </div>

        {/* =========================================
            KONTEN ARTIKEL (PROSE) - (Sisanya Tetap Bagus)
            ========================================= */}
        <div className="space-y-16 text-lg text-zinc-700 dark:text-zinc-300 leading-loose transition-colors duration-300">
          {/* Bab 1: Intro */}
          <div className="space-y-6">
            <p>
              Halo, saya{" "}
              <strong className="text-zinc-900 dark:text-zinc-100 font-bold">
                Bima Sena Adji
              </strong>
              . Saat ini saya adalah mahasiswa Informatika semester 7 di UPN
              Veteran Jatim. Sebagian besar waktu saya habiskan di depan
              layar—baik untuk menyelesaikan <i>bug</i> di kode, maupun sekadar
              membaca dokumentasi teknologi terbaru.
            </p>
            <p>
              Perjalanan saya di dunia perangkat lunak bukan sekadar tuntutan
              akademis. Saya sangat menikmati proses menerjemahkan logika dan
              masalah rumit menjadi antarmuka yang bisa berinteraksi dengan
              manusia. Saat ini, saya juga menyalurkan <i>passion</i> tersebut
              dengan bekerja <i>part-time</i> di Kuy Studio.
            </p>
          </div>

          {/* Bab 2: Yang Sedang Dikerjakan */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-4">
              <Briefcase className="w-6 h-6 text-zinc-400" /> Apa yang Sedang
              Saya Kerjakan?
            </h2>
            <p>
              Fokus utama saya saat ini terbagi menjadi beberapa hal. Di ranah
              akademis, saya sedang membangun sebuah{" "}
              <i>Learning Management System</i> (LMS) dengan arsitektur{" "}
              <strong>Modular Monolith</strong> menggunakan ekosistem Next.js.
              Ini adalah proyek ambisius untuk tugas akhir saya, yang sempat
              mengalami sedikit "plot twist" saat presentasi proposal, namun
              menjadi pelajaran berharga untuk memperkuat fondasi sistemnya.
            </p>
            <p>
              Selain rutinitas <i>coding</i> dan bekerja, saya juga
              mendedikasikan waktu untuk meningkatkan kemampuan Bahasa Inggris
              demi karir yang lebih luas, serta belajar merapikan manajemen
              finansial menggunakan ClickUp dan catatan pribadi.
            </p>
          </div>

          {/* Bab 3: Kehidupan di Luar Kode */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-4">
              <Coffee className="w-6 h-6 text-zinc-400" /> Di Luar Layar Monitor
            </h2>
            <p>
              Saya percaya bahwa <i>developer</i> yang baik juga butuh kehidupan
              di luar *syntax*. Saat sedang tidak memikirkan React atau melatih
              model di Google Colab menggunakan Python, Anda mungkin akan
              menemukan saya sedang asyik menyusun teori konspirasi tentang
              Marvel Cinematic Universe (saya punya opini yang cukup keras
              tentang nasib para karakter di <i>Thunderbolts</i>).
            </p>
            <p className="flex items-center gap-2 italic text-zinc-600 dark:text-zinc-400">
              <Heart className="w-5 h-5 text-red-500" />
              <span>
                Pada akhirnya, semua kerja keras ini memiliki satu tujuan
                sederhana: membangun masa depan yang lebih baik untuk keluarga
                dan Amanda.
              </span>
            </p>
          </div>

          {/* Bab 4: Tech Stack & Minat */}
          <div className="space-y-6 pt-8 pb-16">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-3 mb-6">
              <Code2 className="w-6 h-6 text-zinc-400" /> Gudang Senjata
            </h2>

            {/* Grid Tech Stack */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Next.js & React",
                "TypeScript / JavaScript",
                "Tailwind CSS",
                "Prisma & MongoDB",
                "Python & Data Science",
                "UI/UX Design",
              ].map((tech) => (
                <div
                  key={tech}
                  className="flex items-center gap-2 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 font-medium text-sm text-zinc-700 dark:text-zinc-300 transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-zinc-400" />
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
