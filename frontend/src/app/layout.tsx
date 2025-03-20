import type { Metadata } from "next";
import { Athiti, Fredericka_the_Great } from "next/font/google";
import GlobalNavbarDesktop from "@/components/navbar/global_nav_bar_desktop";
import "./globals.css";
import { getServerSession } from "next-auth/next";
// import { authOptions } from "./api/auth/[...nextauth]/route";
import NextAuthProvider from "./providers/NextAuthProvider";

const athiti = Athiti({
  subsets: ["thai", "latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

const frederickaTheGreat = Fredericka_the_Great({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "BeeLuck",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const nextAuthSession = await getServerSession(authOptions);
  return (
    <html lang="th">
      {/* <NextAuthProvider session={nextAuthSession}> */}
      <body className={` bg-main-background`}>
        <div className="flex-1 mx-auto w-full">
          <GlobalNavbarDesktop />
          <div className="px-5 mx-auto flex-1 w-full">
            {children}
          </div>
        </div>
      </body>
      {/* </NextAuthProvider> */}
    </html>
  );
}
