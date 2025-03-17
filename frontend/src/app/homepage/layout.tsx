import GlobalNavBar from "@/components/global_nav_bar";

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
      <body className={`bg-main-background`}>{children}</body>
    </html>
  );
}
