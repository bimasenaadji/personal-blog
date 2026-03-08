import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/db/client";
import Sidebar from "./Sidebar"; // Ini sidebar Client Component kamu

export default async function SidebarWrapper({
  isDarkMode,
}: {
  isDarkMode: boolean;
}) {
  // 1. Tarik data user
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

  // 2. Oper ke Sidebar (yang Client Component)
  return <Sidebar userProfile={userProfile} />;
}
