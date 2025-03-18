"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import logo from "@public/images/Logo.svg";
import EyeIcon from "@public/images/Eye.svg";
import EyeOffIcon from "@public/images/EyeOffIcon.svg";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passOpen, setPassOpen] = useState(false);

  const onSubmit = async () => {
    // if (name && password) {
    //   const result = await signIn("credentials", {
    //     name: name,
    //     password: password,
    //     redirect: true,
    //     callbackUrl: "/",
    //   });
    // }
    router.push("/homepage/daily-tarot");
  };

  return (
    <div className="  bg-black bg-opacity-[50%] min-h-screen flex flex-col justify-center">
      <main className="mx-5 max-w-md px-4 py-8 sm:px-6 md:px-8">
        <div className="w-full flex items-center justify-center ">
          <Image
            src={logo}
            alt="Logo"
            className="saturate-500 w-40 sm:w-56 md:w-64 mt-[-5vh] "
            priority
          />
        </div>
        <div className="text-2xl sm:text-3xl text-left font-bold mb-5 text-custom-white">Login</div>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-custom-white mb-2 text-sm" htmlFor="name">
            Username
          </label>
          <input
            type="text"
            required
            id="name"
            name="name"
            placeholder="Enter your name"
            value={name}
            className="bg-white border-[2px] rounded-full w-full px-4 py-2 sm:py-3 text-gray-700 text-sm sm:text-md"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-custom-white mb-2 text-sm" htmlFor="password">
            Password
          </label>
          <div className="relative w-full">
            <input
              type={passOpen ? "text" : "password"}
              required
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              className="bg-white border-[2px] rounded-full w-full px-4 py-2 sm:py-3 text-gray-700 text-sm sm:text-md pr-12"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setPassOpen(!passOpen)}
            >
              {passOpen ? (
                <Image src={EyeOffIcon} alt="Hide password" width={20} height={20} />
              ) : (
                <Image src={EyeIcon} alt="Show password" width={20} height={20} />
              )}
            </div>
          </div>
        </div>

        {/* Register Button */}
        <div className="mt-10">
          <button
            className="bg-custom-white px-6 py-2 sm:py-3 text-black font-medium rounded-full w-full transition-colors hover:bg-gray-200"
            onClick={onSubmit}
          >
            Login
          </button>
        </div>

        {/* Already have an account */}
        <div className="text-start text-custom-white mt-10 text-sm sm:text-base">
          New Here?
          <Link href="/register">
            <span className="ml-1 cursor-pointer underline">Register</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
