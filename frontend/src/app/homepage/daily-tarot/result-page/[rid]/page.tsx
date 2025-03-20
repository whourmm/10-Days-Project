"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import test_card from "@public/images/tarot/ace-of-cups.png";

export default function page({ params }: { params: { rid: string } }) {
  const [opacity, setOpacity] = useState(0);
  const [translateY, setTranslateY] = useState("100px"); // Start below viewport

  useEffect(() => {
    // Fade in animation when component mounts
    const fadeIn = setTimeout(() => {
      setOpacity(1);
    }, 100);

    return () => clearTimeout(fadeIn);
  }, []);

  useEffect(() => {
    // Fade in and slide up animation when component mounts
    const animateCard = setTimeout(() => {
      setOpacity(1);
      setTranslateY("0px"); // Move to final position
    }, 100);

    return () => clearTimeout(animateCard);
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center "
      style={{
        transition: "opacity 1.5s ease-in-out",
        opacity: opacity,
      }}
    >
      <div className="max-w-md w-full rounded-lg overflow-hidden">
        {/* Card Image */}
        {/* Card Image */}
        <div className="relative w-full overflow-visible">
          <div className="h-[50vh]">
            <Image
              src={test_card}
              alt=""
              className="w-full object-cover "
              style={{
                objectPosition: "top",
              }}
            />
          </div>
        </div>
        <div
          className="relative bg-white text-black rounded-t-[5vh]"
          style={{
            transition: "transform 1.5s ease-in-out",
            opacity: opacity,
            transform: `translateY(${translateY})`,
          }}
        >
          {/* Improved blur effect */}

          {/* Card Title */}
          <div className=" text-center  border-yellow-500 py-2 relative z-10">
            <h1 className="text-2xl font-serif mt-8 border-b-2 mx-10">The Tower</h1>
          </div>

          {/* Card Meaning */}
          <div className="p-4 text-black ">
            <p className="mb-4  text-sm text-center">
              แผนงานที่วางแผนไว้ล้มเหลวหรือล้มเหลวไปแล้ว ว่า
              ได้เตือนให้แก้ไขสิ่งที่ผิดพลาดก่อนที่จะเกิดเหตุการณ์ที่รุ่ นจะถึงนี้
              เมื่อสำเร็จไปได้ในหน้าที่นับเป็นโชคดีอย่างยิ่ง
              บ้านอาจถูกเสียเสียหายหรือถูกโจมตีได้ในเวลานี้
              ไม่ควรละเลยเหตุการณ์ที่อาจเกิดขึ้นเพราะคุณถูกเตือนที่จะเสี่ย งจะยิ่งทำให้แย่ลง
              ทำตามขั้นตอนที่ถูกให้เสนอไว้ก่อ นอย่าให้ไก่หนีหลุดจากเล้าไป
            </p>
          </div>

          {/* Bottom Navigation */}
          <div className="w-full flex justify-center items-center ">
            <button
              // onClick={onHistoryClick}
              className="flex items-center px-4 py-2 text-black hover:text-yellow-400 transition-colors border-[1px] border-black rounded-xl "
            >
              <span className="text-sm">Go To History Page</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
