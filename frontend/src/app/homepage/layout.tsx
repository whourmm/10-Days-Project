import GlobalNavBar from "@/components/navbar/global_nav_bar";
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
    <html lang="th">
      <div className="bottom-0 z-50 fixed w-full">
        <GlobalNavBar />
      </div>
      <body className={`bg-main-background ${athiti.className}`}>{children}</body>
    </html>
  );
}
