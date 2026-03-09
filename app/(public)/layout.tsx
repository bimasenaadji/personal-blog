import Navbar from "../components/public/Navbar";
import { Footer } from "../components/public/Footer";
import { getSearchPosts } from "@/services/post.service";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchPosts = await getSearchPosts();
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navbar nempel di atas terus */}
      <Navbar searchPosts={searchPosts} />

      {/* Konten utama yang bakal ganti-ganti (Hero, List Blog, dll) */}
      <main className="flex-grow">{children}</main>

      {/* Footer selalu ada di bawah */}
      <Footer />
    </div>
  );
}
