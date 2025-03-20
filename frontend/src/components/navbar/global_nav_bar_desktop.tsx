"use client";

import { UserCircle2 } from "lucide-react";
import { MenuItems } from "./menu";
import Link from "next/link";
import Image from "next/image";

export default function GlobalNavbarDesktop() {
  const hasUser = false;

  return (
    <nav className="top-0 z-50 fixed bg-black/80 shadow-sm backdrop-filter backdrop-blur-md w-full">
      <div className="hidden lg:flex justify-between items-center mx-auto px-6 py-4 text-athiti">
        {/* Logo */}
        <Link href="#" className="font-fredericka-the-great font-bold text-custom-white text-2xl">
          Bee Luck
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-16">
          {
            MenuItems.map((item, index) => {
              return (
                <Link key={index} href={item.path} className="group relative flex justify-center items-center gap-2 font-semibold text-custom-white text-lg transition-colors duration-300">
                  <div className="flex items-center justify-center w-full gap-2 py-1">
                    <Image src={item.icon} alt={item.name} width={24} height={24} className="aspect-square" />
                    {item.name}
                  </div>
                  <span className="bottom-0 left-0  absolute bg-yellow w-0 group-hover:w-full h-0.5 transition-all duration-300 ease-in-out"></span>
                </Link>
              )
            })
          }
          {
            hasUser ?
              <Link href="/sign-out" className="group relative flex justify-center items-center gap-2 font-semibold text-custom-white text-lg transition-colors duration-300">
                <div className="flex items-center justify-center w-full gap-2 py-1">
                  <UserCircle2 size={24} />
                  Sign Out
                </div>
                <span className="bottom-0 left-0  absolute bg-yellow w-0 group-hover:w-full h-0.5 transition-all duration-300 ease-in-out"></span>
              </Link>
              :
              <Link href="/register" className="group relative flex justify-center items-center gap-2 font-semibold text-custom-white text-lg transition-colors duration-300">
                <div className="flex items-center justify-center w-full gap-2 py-1">
                  <UserCircle2 size={24} />
                  Sign In
                </div>
                <span className="bottom-0 left-0  absolute bg-yellow w-0 group-hover:w-full h-0.5 transition-all duration-300 ease-in-out"></span>
              </Link>
          }
        </div>
      </div>
    </nav>
  );
}