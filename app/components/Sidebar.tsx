"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  FourPointStarIcon,
  DribbbleIcon,
  XTwitterIcon,
  LinkedInIcon,
} from "./Icons";

interface Testimonial {
  id: number;
  text: string;
  name: string;
  role: string;
  initials: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    text: "Femi is a product designer who takes ownership beyond just the screens. From understanding user needs to thinking through product flows and collaborating with developers, he brings a level of commitment and attention to detail that makes a real difference to the team.",
    name: "Abraham Iyiola",
    role: "CEO Careerbuddy",
    initials: "AI",
  },
  {
    id: 2,
    text: "I recommend Femi to any early-stage startup or fast-growing company looking to build and scale great digital products. He understands the importance of moving quickly without compromising the quality of the user experience. His ability to adapt, take initiative, and deliver under pressure is impressive.",
    name: "Tomiwa Olajide",
    role: "Founder MissionSync",
    initials: "TO",
  },
  {
    id: 3,
    text: "Working with Femi means having someone who is thoughtful, collaborative, and genuinely invested in the success of the product. He communicates his ideas clearly, takes feedback constructively, and works well across different teams to bring ideas to life.",
    name: "Emmanuel Adebayo",
    role: "Collaborator",
    initials: "EA",
  },
  {
    id: 4,
    text: "I would confidently recommend Femi to any organisation looking for a dependable and forward-thinking product designer. He brings creativity, speed, ownership, and a strong sense of responsibility to his work. I believe he would make a meaningful contribution to any product team.",
    name: "Uncle Mo",
    role: "Design lead ExcelMind",
    initials: "UM",
  },
  {
    id: 5,
    text: "Designs that are both beautiful and dev-ready? that’s rare. Femi consistently delivered specs and components that made implementation smooth. He also made time to sync with engineering when needed. A true team player",
    name: "David Timothy",
    role: "Software Developer Zedcrest",
    initials: "DT",
  },
];

const DURATION_MS = 6500; // 6.5 seconds per testimonial

export function Sidebar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const goToNext = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
      setIsFading(false);
    }, 180);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <aside className="w-full md:w-76.5 md:min-w-76.5 md:max-w-76.5 shrink-0 bg-sidebar border-t md:border-t-0 md:border-r border-[#F0F0F0] flex flex-col justify-end px-6 py-6 md:py-8 md:h-screen md:overflow-y-auto z-20 order-2 md:order-1 pb-32 md:pb-8">
      <div className="flex flex-col justify-between">
        {/* Top Space & Decorative Design System Icon Grid */}
        <div className="pt-2 sm:pt-6 md:pt-10 mb-6 select-none pointer-events-none hidden md:block">
          <div className="w-60">
            <Image
              src="/images/svgs.png"
              alt="Design system icons"
              width={318}
              height={270}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>

        {/* Testimonials Section */}
        <div
          className="mt-2 md:mt-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[20px] text-black tracking-tight font-instrument-serif">
              Testimonials
            </h3>
            <span className="text-[11px] text-neutral-400 font-sans tracking-wide select-none">
              {currentIndex + 1} / {TESTIMONIALS.length}
            </span>
          </div>

          {/* Testimonial Card with Dashed Border */}
          <div
            onClick={goToNext}
            title="Click to next testimonial"
            className="rounded-xl border border-dashed border-neutral-300/80 bg-white/70 p-4 shadow-2xs text-left backdrop-blur-xs min-h-[200px] flex flex-col justify-between cursor-pointer hover:border-neutral-400/90 transition-colors select-none group"
          >
            <div
              className={`flex-1 flex flex-col justify-between transition-all duration-200 ease-out ${isFading ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"
                }`}
            >
              <p className="text-[13px] leading-relaxed text-black font-normal font-rounded">
                {current.text}
              </p>

              <div className="mt-4 pt-1 flex items-center gap-2.5">
                <div className="size-7 rounded-full bg-neutral-900 text-white text-[11px] font-semibold flex items-center justify-center font-sf-pro-display tracking-tight shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  {current.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-[12px] font-semibold text-black leading-tight font-sf-pro-display">
                    {current.name}
                  </p>
                  <p className="text-[12px] text-[#08080899] leading-tight truncate font-sf-pro-display">
                    {current.role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Animated Progress Bar: Fills smoothly, then triggers switch when it reaches the end */}
          <div
            onClick={goToNext}
            title="Click to advance"
            className="w-full h-0.5 bg-neutral-200 rounded-full overflow-hidden mt-4 mb-4 cursor-pointer relative"
          >
            <div
              key={currentIndex}
              onAnimationEnd={goToNext}
              className="h-full bg-neutral-900 rounded-full"
              style={{
                animationName: "testimonial-progress",
                animationDuration: `${DURATION_MS}ms`,
                animationTimingFunction: "linear",
                animationFillMode: "forwards",
                animationPlayState: isPaused ? "paused" : "running",
              }}
            />
          </div>

          {/* Social Links Row */}
          <div className="flex items-center gap-2 mt-5">
            <a
              href="https://read.cv"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="CV profile"
              className="w-8 h-8 flex items-center justify-center text-neutral-800 hover:text-black transition-colors cursor-pointer"
            >
              <FourPointStarIcon className="size-5" />
            </a>
            <a
              href="https://dribbble.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dribbble profile"
              className="w-8 h-8 flex items-center justify-center text-neutral-800 hover:text-black transition-colors cursor-pointer"
            >
              <DribbbleIcon className="size-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter) profile"
              className="w-8 h-8 flex items-center justify-center text-neutral-800 hover:text-black transition-colors cursor-pointer"
            >
              <XTwitterIcon className="size-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="w-8 h-8 flex items-center justify-center text-neutral-800 hover:text-black transition-colors cursor-pointer"
            >
              <LinkedInIcon className="size-5" />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
