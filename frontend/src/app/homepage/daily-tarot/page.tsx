"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Use the correct import for App Router
import Image from "next/image";

export default function Page() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const router = useRouter();
  const rid = 1;

  // Function to handle card animation and navigation
  const handleCardClick = () => {
    if (!isSpinning && !isFading) {
      setIsSpinning(true);

      // After the rotation animation ends, start the fade to black
      setTimeout(() => {
        setIsSpinning(false);
        setIsFading(true);

        // After fade completes completely (full opacity), navigate to result page
        setTimeout(() => {
          if (router) {
            router.push(`/homepage/daily-tarot/result-page/${rid}`);
          }
        }, 1000); // 1 second - exactly matches the transition duration
      }, 2000); // 2 seconds for spin animation
    }
  };

  return (
    <>
      {/* Overlay that fades in to black */}
      <div
        className={`fixed inset-0 bg-black z-50 transition-opacity duration-1000 ${
          isFading ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

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
            disabled={isSpinning || isFading}
            className={`bg-jet drop-shadow-sm px-5 py-3 rounded-xl font-athiti text-xl text-center ${
              isSpinning || isFading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSpinning ? "Spinning..." : isFading ? "Revealing..." : "Reveal Your Card"}
          </button>
        </div>
      </div>
    </>
  );
}
