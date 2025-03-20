import type { Metadata } from "next";
import { Athiti, Fredericka_the_Great } from "next/font/google";
import GlobalNavbarDesktop from "@/components/navbar/global_nav_bar_desktop";
import { getServerSession } from "next-auth/next";
// import { authOptions } from "./api/auth/[...nextauth]/route";

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
      <body className={`${athiti.className}  bg-white`}>
        <div className="w-full">{children}</div>
      </body>
      {/* </NextAuthProvider> */}
    </html>
  );
}
