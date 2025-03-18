"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "@public/images/Logo.svg";

export default function Home() {
  const router = useRouter();
  const onSubmit = () => {
    router.push("/register");
  };
  return (
    <div className=" h-[100vh] flex flex-row">
      <div className="my-10 mx-5 flex items-start gap-5  flex-col w-full justify-around">
        <div className="">
          <Image
            src={logo}
            alt="Logo"
            className="saturate-500 w-[17vh] sm:w-56 md:w-64  "
            priority
          />
          <section className="text-white font-semibold text-header drop-shadow-md leading-extra-tight">
            Welcome to BeeLuck
          </section>
        </div>
        <div className="mt-6 w-full">
          <button
            className={`bg-custom-white text-md px-6 py-2 sm:py-3 text-black font-semibold rounded-full w-full transition-colors`}
            onClick={onSubmit}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
