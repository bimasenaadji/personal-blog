/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bwuvwlnsbsnapmiaxkpw.supabase.co", // Domain Supabase milikmu
        port: "",
        pathname: "/storage/v1/object/public/**", // Izinkan semua folder di public bucket
      },
    ],
  },
};

export default nextConfig;
