"use client";

import { Mail, Github, Linkedin, Send, MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <section className="bg-white dark:bg-zinc-950 min-h-screen px-8 py-24 md:py-32 transition-colors duration-300">
      <div className="mx-auto max-w-3xl">
        {/* =========================================
            HEADER (The Vibe)
            ========================================= */}
        <div className="mb-16 md:mb-24">
          <h1 className="text-5xl md:text-5xl font-bold mb-6 text-zinc-900 dark:text-zinc-100 tracking-tighter transition-colors duration-300">
            Mari Berbincang.
          </h1>
          <p className="text-xl font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed transition-colors duration-300">
            Pintu selalu terbuka. Entah itu untuk tawaran kolaborasi, proyek
            skala global, diskusi seputar ekosistem Next.js, atau sekadar
            berbagi teori konspirasi Thunderbolts.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-12 md:gap-8">
          {/* =========================================
              KIRI: DIRECT LINKS (Jalur Cepat)
              ========================================= */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-sm font-bold tracking-widest uppercase text-zinc-900 dark:text-zinc-100 mb-6 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> Temukan Saya
            </h2>

            {/* Email Card */}
            <a
              href="mailto:bimasenaadjis@gmail.com"
              className="group flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 group-hover:scale-110 transition-transform">
                <Mail className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  Email
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Balas dalam 1-2 hari
                </p>
              </div>
            </a>

            {/* GitHub Card */}
            <a
              href="https://github.com/bimasenaadji"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 group-hover:scale-110 transition-transform">
                <Github className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  GitHub
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Lihat eksperimen kode saya
                </p>
              </div>
            </a>

            {/* LinkedIn Card */}
            <a
              href="https://www.linkedin.com/in/bimasenaadji/"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 group-hover:scale-110 transition-transform">
                <Linkedin className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  LinkedIn
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Koneksi profesional
                </p>
              </div>
            </a>
          </div>

          {/* =========================================
              KANAN: THE FORM (Tinggal dipasang backend nanti)
              ========================================= */}
          <div className="md:col-span-3">
            <form className="space-y-6 bg-zinc-50 dark:bg-zinc-900/30 p-6 md:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 transition-colors">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-bold text-zinc-700 dark:text-zinc-300"
                  >
                    Nama
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-bold text-zinc-700 dark:text-zinc-300"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="intent"
                  className="text-sm font-bold text-zinc-700 dark:text-zinc-300"
                >
                  Apa yang ingin didiskusikan?
                </label>
                <select
                  id="intent"
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all appearance-none cursor-pointer"
                >
                  <option>Tawaran Kolaborasi / Pekerjaan</option>
                  <option>Diskusi Teknis (Next.js, Python, dll)</option>
                  <option>Ngobrol Santai / Networking</option>
                  <option>Lainnya</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-bold text-zinc-700 dark:text-zinc-300"
                >
                  Pesan
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all resize-none"
                  placeholder="Ceritakan detailnya di sini..."
                ></textarea>
              </div>

              <button
                type="button" // Nanti diganti type="submit" kalau udah dicolok backend
                className="w-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
              >
                Kirim Pesan <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
