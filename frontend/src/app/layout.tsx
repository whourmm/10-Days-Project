import type { Metadata } from "next";
import { Athiti } from "@next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth/next";
// import { authOptions } from "./api/auth/[...nextauth]/route";
import NextAuthProvider from "./providers/NextAuthProvider";

const athiti = Athiti({
  subsets: ["thai", "latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
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
      <body className={` bg-main-background ${athiti.className}`}>{children}</body>
      {/* </NextAuthProvider> */}
    </html>
  );
}
