"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import card from "@public/images/navbar/tarot.svg";
import card_click from "@public/images/navbar/tarot_click.svg";
import flower from "@public/images/navbar/flower.svg";
import flower_click from "@public/images/navbar/flower_click.svg";
import bee from "@public/images/navbar/bee.svg";
import bee_click from "@public/images/navbar/bee_click.svg";
import { useRouter } from "next/navigation";

// Define types for the icon and position data
interface Icon {
  src: string;
  src_click: string;
  alt: string;
  path: string;
}

interface Position {
  left: number;
  top: number;
}

export default function GlobalNavbar() {
  const router = useRouter();
  const [activeIcon, setActiveIcon] = useState<number>(0); // Active icon index
  const [showClickedIcon, setShowClickedIcon] = useState<boolean>(true); // Control visibility of clicked icon
  const navRef = useRef<HTMLDivElement | null>(null); // Ref for the navigation container
  const indicatorRef = useRef<HTMLDivElement | null>(null); // Ref for the indicator
  const [positions, setPositions] = useState<Position[]>([]); // Positions of the icons
  const [initialRender, setInitialRender] = useState<boolean>(true); // Track if it is the initial render

  // Example icons - replace with your actual icons
  const icons: Icon[] = [
    { src: card, src_click: card_click, alt: "Cards", path: "daily-tarot" },
    { src: flower, src_click: flower_click, alt: "flower", path: "community" },
    { src: bee, src_click: bee_click, alt: "bee", path: "history" },
  ];

  // Calculate positions on initial render
  useEffect(() => {
    if (navRef.current) {
      calculatePositions();
      setInitialRender(false);
    }
  }, []);

  // Update indicator position when active icon changes
  useEffect(() => {
    if (!initialRender && indicatorRef.current && positions.length > 0) {
      // First hide the clicked icon
      setShowClickedIcon(false);

      // After the slider animation completes, show the clicked icon
      const sliderAnimationDuration = 400; // 0.4s in milliseconds
      const timer = setTimeout(() => {
        setShowClickedIcon(true);
      }, sliderAnimationDuration);

      // Update the slider position
      const indicator = indicatorRef.current;
      const position = positions[activeIcon];

      if (position) {
        indicator.style.transform = `translate(${position.left}px, ${position.top}px)`;
      }

      return () => clearTimeout(timer);
    }
  }, [activeIcon, positions, initialRender]);

  // Calculate positions whenever window resizes
  useEffect(() => {
    const handleResize = () => {
      // Use timeout to debounce resize events
      setTimeout(() => {
        calculatePositions();
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    // Also recalculate on orientation change for mobile devices
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  // Calculate positions of all icons
  const calculatePositions = () => {
    if (navRef.current) {
      const navElement = navRef.current;
      const iconElements = navElement.querySelectorAll(".nav-icon");
      const newPositions: Position[] = [];

      iconElements.forEach((icon) => {
        const rect = icon.getBoundingClientRect();
        const navRect = navElement.getBoundingClientRect();

        newPositions.push({
          left: rect.left - navRect.left + rect.width / 2,
          top: rect.top - navRect.top + rect.height / 2,
        });
      });

      setPositions(newPositions);
    }
  };

  return (
    <div className="relative bg-[#2E2E2E] p-4" ref={navRef}>
      {/* Active indicator */}
      <div
        ref={indicatorRef}
        className="absolute w-[11vh] h-[15vh] z-0 transform-gpu"
        style={{
          transform: positions[activeIcon]
            ? `translate(${positions[activeIcon].left}px, ${positions[activeIcon].top}px)`
            : "none",
          transition: initialRender ? "none" : "transform 0.3s cubic-bezier(0.34, 1, 0, 1)",
          opacity: positions.length > 0 ? 1 : 0,
          backgroundImage: "url('/images/navbar/circle_bee.svg')",
          backgroundSize: "contain", // Use contain to ensure the entire image is visible
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          marginLeft: "-7.5vh", // Half of width
          marginTop: "-14.5vh", // Adjusted to position the circle properly
        }}
      />

      {/* Navigation icons */}
      <div className="items-center flex justify-around z-0">
        {icons.map((icon, index) => (
          <button
            key={index}
            className="nav-icon relative w-12 h-10 rounded-full flex items-center justify-center z-0 relative"
            onClick={() => {
              setActiveIcon(index);
              router.push(`${icon.path}`);
            }}
          >
            {index !== activeIcon && (
              <Image
                src={icon.src}
                alt={icon.alt}
                width={60}
                height={60}
                className="w-10 h-10 md:w-12 md:h-12"
              />
            )}

            {index === activeIcon && showClickedIcon && (
              <div
                className="absolute z-20"
                style={{
                  animation: "fadeIn 0.2s ease-out",
                  position: "absolute",
                  // The key change: position relative to the background circle
                  top: "-11.5vh", // Match the indicator's marginTop
                  left: "0",
                  width: "11vh", // Match indicator width
                  height: "15vh", // Match indicator height
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  transform: "translateX(-5.5vh)", // Center horizontally (match marginLeft)
                }}
              >
                <Image
                  src={icon.src_click}
                  alt={icon.alt}
                  width={50}
                  height={50}
                  className="z-10"
                  style={{
                    position: "absolute",
                    top: "50%", // Center in the circle
                    left: "33%", // Center in the circle
                    transform: "translate(20%, 0%)", // The -62% vertically centers the icon in the visual center of the background
                  }}
                />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Add CSS animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @media (max-width: 640px) {
          .nav-icon {
            width: 40px;
            height: 36px;
          }
        }
      `}</style>
    </div>
  );
}
