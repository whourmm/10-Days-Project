"use client";

import GlobalNavBar from "@/components/navbar/global_nav_bar";
import GlobalNavbarDesktop from "@/components/navbar/global_nav_bar_desktop";
import { usePathname } from "next/navigation";
import { Athiti } from "next/font/google";

const athiti = Athiti({
  subsets: ["thai", "latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideNavbarPaths = ["/homepage/community/create", "/homepage/daily-tarot", "/auth/register"];

  const showNavbar = !hideNavbarPaths.some((path) => pathname.startsWith(path));
  return (
    <html lang="th">
      <body className={`${athiti.className} relative min-h-screen`}>
        {/* Base background layer */}
        <div className="bg-cover sm:bg-auto bg-main-background bg-center opacity-50 -z-20 fixed inset-0"></div>

        {/* Secondary lighter overlay layer */}
        <div className="fixed inset-0 cosmic-latte opacity-30 -z-10"></div>

        {/* Content container */}
        <div className="relative z-0 p-5">{children}</div>

        {/* Navigation bar fixed at bottom */}
        <div className="bottom-0 z-50 fixed w-full sm:hidden">{showNavbar && <GlobalNavBar />}</div>
        <div className="bottom-0 z-50 fixed w-full hidden sm:block \">
          <GlobalNavbarDesktop />
        </div>
      </body>
    </html>
  );
}
