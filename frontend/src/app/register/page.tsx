"use client";

import register from "@/libs/register";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import logo from "@public/images/Logo.svg";
import EyeIcon from "@public/images/Eye.svg";
import EyeOffIcon from "@public/images/EyeOffIcon.svg";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passOpen, setPassOpen] = useState(false);
  const [passConOpen, setPassConOpen] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [confirmTouched, setConfirmTouched] = useState(false);

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return false;
    } else {
      setPasswordsMatch(true);
      return true;
    }
  };

  const handleConfirmBlur = () => {
    setConfirmTouched(true);
    validatePasswords();
  };

  const onSubmit = () => {
    if (name && email && password && confirmPassword) {
      if (!validatePasswords()) {
        alert("Passwords do not match!");
        return;
      }

      // const postRegister = async () => {
      //   await register(name, email, password);
      // };
      // postRegister();
      alert("Successfully registered!");
      // router.push("/api/auth/signin");
      router.push("/auth/signIn");
    } else {
      alert("Please fill in all fields!");
    }
  };

  return (
    <div className="bg-black bg-opacity-[50%] min-h-screen flex flex-col justify-center">
      <main className="mx-5 max-w-md px-4 py-5 sm:px-6 md:px-8">
        <div className="w-full flex items-center justify-center mb-5 ">
          <Image
            src={logo}
            alt="Logo"
            className="saturate-500 w-[17vh] sm:w-56 md:w-64  "
            priority
          />
        </div>
        <div className="text-2xl sm:text-3xl text-left font-bold mb-3 text-custom-white">
          Create account
        </div>

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

        {/* Email */}
        <div className="mb-4">
          <label className="block text-custom-white mb-2 text-sm" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            required
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            className="bg-white border-[2px] rounded-full w-full px-4 py-2 sm:py-3 text-gray-700 text-sm sm:text-md"
            onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => {
                setPassword(e.target.value);
                if (confirmTouched) validatePasswords();
              }}
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

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block text-custom-white mb-2 text-sm" htmlFor="confirm-password">
            Confirm Password
          </label>
          <div className="relative w-full">
            <input
              type={passConOpen ? "text" : "password"}
              required
              id="confirm-password"
              name="confirm-password"
              placeholder="Confirm your password"
              value={confirmPassword}
              className={`bg-white border-[2px] rounded-full w-full px-4 py-2 sm:py-3 text-gray-700 text-sm sm:text-md pr-12 ${
                !passwordsMatch && confirmTouched ? "border-red-500" : ""
              }`}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (confirmTouched) validatePasswords();
              }}
              onBlur={handleConfirmBlur}
            />
            <div
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setPassConOpen(!passConOpen)}
            >
              {passConOpen ? (
                <Image src={EyeOffIcon} alt="Hide password" width={20} height={20} />
              ) : (
                <Image src={EyeIcon} alt="Show password" width={20} height={20} />
              )}
            </div>
          </div>
          {!passwordsMatch && confirmTouched && (
            <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
          )}
        </div>

        {/* Register Button */}
        <div className="mt-6">
          <button
            className={`bg-custom-white px-6 py-2 sm:py-3 text-black font-medium rounded-full w-full transition-colors ${
              !passwordsMatch && confirmTouched
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-200"
            }`}
            onClick={onSubmit}
            disabled={!passwordsMatch && confirmTouched}
          >
            Register
          </button>
        </div>

        {/* Already have an account */}
        <div className="text-start text-custom-white mt-5 text-sm sm:text-base">
          Already Register?
          <Link href="/auth/signIn">
            <span className="ml-1 cursor-pointer underline">Login here</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
