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
  return (
    <div className={`${athiti.className} bg-white `}>
      {/* Content container */}
      <div className="relative p-2 bg-white ">{children}</div>

      {/* Navigation bar fixed at bottom */}
      <div className="bottom-0 z-50 fixed w-full sm:hidden right-0">
        <GlobalNavBar />
      </div>
    </div>
  );
}
