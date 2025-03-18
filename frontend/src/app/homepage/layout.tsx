import GlobalNavBar from "@/components/global_nav_bar";
import { Athiti } from "@next/font/google";

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
      <div className="z-50 w-full fixed bottom-0">
        <GlobalNavBar />
      </div>
      <body className={`bg-main-background ${athiti.className}`}>{children}</body>
    </html>
  );
}
