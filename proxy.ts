import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  // Kita buat response bawaan
  let supabaseResponse = NextResponse.next({
    request,
  });

  // Bikin client Supabase khusus untuk middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Cek apakah user sedang login saat ini
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // ATURAN 1: Kalau BUKAN user (belum login) dan mencoba akses rute Admin
  const isAdminRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/posts") ||
    pathname.startsWith("/editor") ||
    pathname.startsWith("/settings");

  if (!user && isAdminRoute) {
    // Lempar paksa ke halaman login
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // ATURAN 2: Kalau SUDAH login tapi malah buka halaman /login atau /register
  const isAuthRoute = pathname === "/login" || pathname === "/register";

  if (user && isAuthRoute) {
    // Arahkan masuk ke dashboard
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // Biarkan lewat kalau aman
  return supabaseResponse;
}

// Beritahu Next.js file mana saja yang perlu dicek satpam ini
export const config = {
  matcher: [
    /*
     * Match semua request path KECUALI untuk:
     * - _next/static (file statis)
     * - _next/image (optimasi gambar)
     * - favicon.ico (icon browser)
     * - API routes
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
