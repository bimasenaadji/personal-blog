import BlogListClient from "@/app/components/blog/BlogListClient";
import { getCategories, getPublishedPosts } from "@/services/post.service";

export default async function BlogPage() {
  // Panggil data dari layer Service (Super Clean!)
  const categories = await getCategories();
  const posts = await getPublishedPosts();

  return (
    <section className="bg-white dark:bg-zinc-950 min-h-screen px-8 transition-colors duration-300">
      <div className="mx-auto max-w-7xl">
        {/* BLOG HERO SECTION */}
        <div className="py-20 md:py-24 max-w-3xl">
          <h1 className="text-5xl md:text-5xl font-bold mb-6 text-zinc-900 dark:text-zinc-100 tracking-tighter transition-colors duration-300">
            Ruang Baca.
          </h1>
          <p className="text-xl md:text-xl font-normal text-zinc-500 dark:text-zinc-400 transition-colors duration-300">
            Kumpulan tulisan, catatan teknis, dan curhatan acak. Tempat saya
            menaruh apa yang ada di kepala agar tidak penuh.
          </p>
        </div>

        {/* Lempar data yang sudah matang ke Client Component */}
        <BlogListClient posts={posts} categories={categories} />
      </div>
    </section>
  );
}
