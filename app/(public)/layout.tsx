import Navbar from "../components/public/Navbar";
import { Footer } from "../components/public/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navbar nempel di atas terus */}
      <Navbar />

      {/* Konten utama yang bakal ganti-ganti (Hero, List Blog, dll) */}
      <main className="flex-grow">{children}</main>

      {/* Footer selalu ada di bawah */}
      <Footer />
    </div>
  );
}
