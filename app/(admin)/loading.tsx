import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-[80vh] w-full flex flex-col items-center justify-center gap-4 text-zinc-500">
      <Loader2
        size={40}
        className="animate-spin text-zinc-900 dark:text-white"
      />
      <p className="text-sm font-bold animate-pulse tracking-widest uppercase">
        Memuat Halaman...
      </p>
    </div>
  );
}
