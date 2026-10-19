import React from "react";
import Image from "next/image";
import {
  FourPointStarIcon,
  DribbbleIcon,
  XTwitterIcon,
  LinkedInIcon,
} from "./Icons";

export function Sidebar() {
  return (
    <aside className="w-full md:w-76.5 md:min-w-76.5 md:max-w-76.5 shrink-0 bg-sidebar border-b md:border-b-0 md:border-r border-[#F0F0F0] flex flex-col justify-end px-6 py-6 md:py-8 md:h-screen md:overflow-y-auto z-20s">
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
        <div className="mt-2 md:mt-4">
          <h3 className="font-serif text-[20px] text-neutral-900 tracking-tight mb-3">
            Testimonials
          </h3>

          {/* Testimonial Card with Dashed Border */}
          <div className="rounded-xl border border-dashed border-neutral-300/80 bg-white/70 p-4 shadow-2xs text-left backdrop-blur-xs">
            <p className="text-[13px] leading-relaxed text-neutral-700 font-normal">
              I recommend Femi for his significant impact as a product designer
              for any early stage startup or fast paced compnay....
            </p>

            <div className="mt-4 pt-1 flex items-center gap-2.5">
              <div className="shrink-0">
                <Image
                  src="/images/testimonial-avatar.png"
                  alt="Arora Akshay"
                  width={34}
                  height={24}
                  className="object-contain"
                />
              </div>
              <div className="min-w-0">
                <p className="text-[12px] font-semibold text-neutral-900 leading-tight">
                  Arora Akshay
                </p>
                <p className="text-[12px] text-[#08080899] leading-tight truncate">
                  Founder at Euphoria
                </p>
              </div>
            </div>
          </div>

          {/* Dark Divider Bar */}
          <div className="w-full max-w-52.5 h-0.5 bg-neutral-900 rounded-full mt-4 mb-4" />

          {/* Social Links Row */}
          <div className="flex items-center gap-2">
            <a
              href="https://read.cv"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="CV profile"
              className="w-8 h-8 flex items-center justify-center text-neutral-800 shadow-2xs transition cursor-pointer"
            >
              <FourPointStarIcon className="size-5" />
            </a>
            <a
              href="https://dribbble.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dribbble profile"
              className="w-8 h-8 flex items-center justify-center text-neutral-800 shadow-2xs transition cursor-pointer"
            >
              <DribbbleIcon className="size-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter) profile"
              className="w-8 h-8 flex items-center justify-center text-neutral-800 shadow-2xs transition cursor-pointer"
            >
              <XTwitterIcon className="size-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="w-8 h-8 flex items-center justify-center text-neutral-800 shadow-2xs transition cursor-pointer"
            >
              <LinkedInIcon className="size-5" />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
