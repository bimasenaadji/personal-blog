import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/db/client";
import { redirect } from "next/navigation";
import SettingsView from "@/app/components/admin/SettingsView";

export const dynamic = "force-dynamic"; // Biar datanya nanti selalu fresh

export default async function SettingsPage() {
  // 1. Cek KTP digital via Supabase
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Kalau aneh-aneh belum login, tendang (Meski sudah ada Middleware, ini pengamanan ganda)
  if (!user || !user.email) {
    redirect("/login");
  }

  // 2. Tarik data profil lengkap dari Prisma berdasarkan email Supabase
  const userProfile = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
    select: {
      name: true,
      email: true,
      bio: true,
      avatar: true,
    },
  });

  // Kalau datanya aneh/kosong di Prisma, lewati saja
  if (!userProfile) {
    redirect("/login");
  }

  // 3. Oper datanya ke Client Component

  return (
    <div className="h-full px-6 py-8 lg:px-12">
      <SettingsView userProfile={userProfile} />
    </div>
  );
}
