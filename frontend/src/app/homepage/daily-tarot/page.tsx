"use client";

import { useState } from "react";
import { useRouter } from "next/compat/router";
import Image from "next/image";

export default function Page() {
  const [isSpinning, setIsSpinning] = useState(false);
  const router = useRouter();

  // Function to handle card animation and navigation
  const handleCardClick = () => {
    if (!isSpinning) {
      setIsSpinning(true);

      // After the rotation animation ends (2 seconds for 3 full rotations), navigate to the result page
      setTimeout(() => {
        if (router) {
          router.push('/daily-tarot');
        }
      }, 2000); // Match this to animation duration
    }
  };

  return (
    <div className="flex justify-center items-center w-full text-white text-5xl">
      <div className="flex flex-col items-center gap-5 mt-20 w-full">
        {/* Card wrapper with 3D perspective */}
        <div className="w-fit perspective-1000">
          {/* Image for the Tarot Card */}
          <div
            className={`relative transition-transform duration-2000 ${
              isSpinning ? "animate-spin-y-3" : ""
            }`}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <Image
              src="/images/Back_Tarot.png"
              priority
              alt="back tarot"
              width={350}
              height={600}
            />
          </div>
        </div>
        
        {/* Button to trigger card rotation */}
        <button
          onClick={handleCardClick}
          type="submit"
          disabled={isSpinning}
          className={`bg-jet drop-shadow-sm px-5 py-3 rounded-xl font-athiti text-xl text-center ${
            isSpinning ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSpinning ? "Spinning..." : "Reveal Your Card"}
        </button>
      </div>
    </div>
  );
}