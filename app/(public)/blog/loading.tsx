import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 bg-white dark:bg-zinc-950 transition-colors duration-300">
      {/* Ikon Spinner yang muter-muter */}
      <Loader2 className="w-10 h-10 text-zinc-900 dark:text-zinc-100 animate-spin" />

      {/* Teks dengan efek kedap-kedip pelan (pulse) */}
      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 animate-pulse tracking-widest uppercase">
        Menyiapkan Ruang Baca...
      </p>
    </div>
  );
}
