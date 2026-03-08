import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/db/client";
import AdminLayoutClient from "./AdminLayoutClient"; // Copy paste kode AdminLayout lo ke file ini
import { signOutAction } from "@/actions/auth.action";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Tarik data User di sini (Cuma bisa di Server)
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let userProfile = null;
  if (user?.email) {
    userProfile = await prisma.user.findUnique({
      where: { email: user.email },
      select: { name: true, avatar: true, email: true },
    });
  }

  // 2. Langsung lempar ke Client Layout
  return (
    <AdminLayoutClient userProfile={userProfile} handleLogout={signOutAction}>
      {children}
    </AdminLayoutClient>
  );
}
