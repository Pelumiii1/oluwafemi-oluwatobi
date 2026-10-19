"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FourPointStarIcon,
  DribbbleIcon,
  XTwitterIcon,
  LinkedInIcon,
} from "../components/Icons";

interface SliderImage {
  src: string;
  alt: string;
}

const ABOUT_IMAGES: SliderImage[] = [
  {
    src: "/images/about-me/A159F183-3655-4ABE-A0F8-EA43D7067C87_3.png",
    alt: "Femi seated at dinner table",
  },
  {
    src: "/images/about-me/959603C5-8220-405A-89EF-9F762F215B3B.png",
    alt: "Workspace setup with dual displays and design software",
  },
  {
    src: "/images/about-me/3FAFDCEF-090B-439F-8EAA-E38CD88EBF17.png",
    alt: "Watching football match on ambient display",
  },
  {
    src: "/images/about-me/IMG_2437.png",
    alt: "Femi smiling with glasses",
  },
  {
    src: "/images/about-me/AD1530B5-7418-4C78-AECD-8419986675C8.png",
    alt: "Gaming session in progress",
  },
  {
    src: "/images/about-me/IMG_1031.png",
    alt: "Casual photo moment",
  },
  {
    src: "/images/about-me/IMG_1671.png",
    alt: "Outdoor lifestyle photo",
  },
  {
    src: "/images/about-me/IMG_1684.png",
    alt: "Creative snapshot",
  },
  {
    src: "/images/about-me/IMG_2127.png",
    alt: "Running and fitness session",
  },
  {
    src: "/images/about-me/IMG_2444.png",
    alt: "Portrait snapshot",
  },
  {
    src: "/images/about-me/IMG_2456_2.png",
    alt: "Casual portrait",
  },
  {
    src: "/images/about-me/9FFCF29A-5132-419C-9876-A462CB276060.png",
    alt: "Design work and aesthetic moments",
  },
  {
    src: "/images/about-me/D1CD3C94-F950-4721-8718-EAC8186930F5.png",
    alt: "Aesthetic lifestyle moment",
  },
];

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
}

const PAST_EXPERIENCES: ExperienceItem[] = [
  {
    role: "[design]",
    company: "You decide",
    period: "Future",
  },
  {
    role: "Product Designer",
    company: "ExcelMind",
    period: "2025 - 2026",
  },
  {
    role: "Product Designer",
    company: "MissionSync",
    period: "2025 - 2026",
  },
  {
    role: "UI/UX Designer",
    company: "Teckaholic",
    period: "2024 – 2025",
  },
  {
    role: "Product Designer",
    company: "Fortheye Solutions",
    period: "2024",
  },
  {
    role: "UI/UX Designer",
    company: "MotoBills/MotoBites",
    period: "2023 – 2024",
  },
];

export default function AboutPage() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Mouse drag-to-scroll state
  const isMouseDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  // Check scroll position to update navigation indicators
  const updateScrollState = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  }, []);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  // Scroll controls for slider
  const handleScroll = (direction: "left" | "right") => {
    const el = sliderRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Drag-to-scroll handlers
  const onMouseDown = (e: React.MouseEvent) => {
    const el = sliderRef.current;
    if (!el) return;
    isMouseDownRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDownRef.current) return;
    const el = sliderRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.4;
    if (Math.abs(walk) > 5) {
      hasDraggedRef.current = true;
    }
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const onMouseUpOrLeave = () => {
    isMouseDownRef.current = false;
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev !== null
            ? prev > 0
              ? prev - 1
              : ABOUT_IMAGES.length - 1
            : null,
        );
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev !== null
            ? prev < ABOUT_IMAGES.length - 1
              ? prev + 1
              : 0
            : null,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  // Copy email handler
  const handleCopyEmail = () => {
    navigator.clipboard.writeText("oluwatobiomosewa@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  // Scroll to top handler
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen w-full bg-white text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white flex flex-col justify-between">
      {/* Upper Page Section */}
      <div className="w-full">
        {/* Top Header & Back Button Container */}
        <div className="w-full max-w-350 mx-auto px-6 sm:px-12 lg:px-20 pt-10 sm:pt-14 pb-8 sm:pb-12">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[14px] text-neutral-800 hover:text-neutral-500 transition-colors group cursor-pointer"
          >
            <div className="w-4 h-4 relative shrink-0 group-hover:-translate-x-0.5 transition-transform">
              <Image
                src="/images/back.png"
                alt="Back"
                width={16}
                height={16}
                className="w-full h-full object-contain"
              />
            </div>
            <span>Back</span>
          </Link>

          {/* Profile Header */}
          <div className="mt-8 flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-[14px] overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200/60 shadow-2xs">
              <Image
                src="/images/femi.png"
                alt="Oluwatobi Oluwafemi"
                width={48}
                height={48}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div>
              <h1 className="text-[14px] font-semibold text-neutral-900 leading-tight">
                Oluwatobi Oluwafemi
              </h1>
              <p className="text-[12px] text-neutral-500 mt-0.5 font-normal">
                oluwatobiomosewa@gmail.com
              </p>
            </div>
          </div>

          {/* Main Story Paragraphs */}
          <div className="mt-9 sm:mt-11 max-w-[900px] space-y-4">
            <p className="text-[16px] sm:text-[18px] text-neutral-900 font-normal leading-[1.5] tracking-[-0.01em]">
              A Product Designer with 4+ years of experience across product,
              web, and brand design. I enjoy turning complicated ideas into
              simple experiences, obsessing over the little details, and
              occasionally overthinking a 4px spacing decision.
            </p>
            <p className="text-[16px] sm:text-[18px] text-neutral-900 font-normal leading-[1.5] tracking-[-0.01em]">
              Outside design, you’ll probably find me playing Fortnite, at the
              gym, on a long drive, running a 5K, watching anime, or laughing
              way louder than necessary.
            </p>
            <p className="text-[16px] sm:text-[18px] text-neutral-900 font-normal leading-[1.5] tracking-[-0.01em]">
              My design philosophy is simple: clarity and intention. Make it
              easy to understand, make it worth remembering, and move quickly
              enough to keep up with the idea.
            </p>
          </div>

          {/* Subtext */}
          <p className="text-[13px] text-neutral-500 mt-7 sm:mt-8 font-normal">
            Currently: Designing products, building things, and looking for
            interesting problems to solve.
          </p>
        </div>

        {/* Horizontal Image Slider Section */}
        <div className="relative w-full mt-2 sm:mt-4 pb-10 sm:pb-14 group/slider">
          {/* Navigation Controls (Floating Buttons) */}
          {canScrollLeft && (
            <button
              onClick={() => handleScroll("left")}
              aria-label="Previous images"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md border border-neutral-200/80 flex items-center justify-center text-neutral-800 hover:bg-white hover:scale-105 active:scale-95 transition cursor-pointer"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={() => handleScroll("right")}
              aria-label="Next images"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md border border-neutral-200/80 flex items-center justify-center text-neutral-800 hover:bg-white hover:scale-105 active:scale-95 transition cursor-pointer"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          )}

          {/* Slider Scroll Track */}
          <div
            ref={sliderRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUpOrLeave}
            onMouseLeave={onMouseUpOrLeave}
            className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto select-none cursor-grab active:cursor-grabbing px-6 sm:px-12 lg:px-20 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none]"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {ABOUT_IMAGES.map((img, index) => (
              <div
                key={img.src}
                onClick={() => {
                  if (!hasDraggedRef.current) {
                    setLightboxIndex(index);
                  }
                }}
                className="relative shrink-0 w-[175px] sm:w-[210px] md:w-[240px] lg:w-[270px] aspect-[9/15] overflow-hidden bg-neutral-100 group/img rounded-xs cursor-pointer"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 175px, (max-width: 1024px) 240px, 270px"
                  className="object-cover transition-transform duration-500 ease-out group-hover/img:scale-[1.03]"
                  draggable={false}
                  priority={index < 5}
                />
                <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        {/* Continuation Section Below The Images */}
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20 pt-6 sm:pt-10 pb-16 sm:pb-20">
          {/* Origin Story Paragraphs */}
          <div className="max-w-[850px] space-y-3.5 text-[15px] sm:text-[16px] text-neutral-700 font-normal leading-[1.6]">
            <p>I didn&apos;t exactly plan on becoming a designer.</p>
            <p>
              I discovered design in 2021. What started as something to keep me
              occupied quickly turned into freelance work, then paid work, then
              a career I couldn&apos;t imagine walking away from.
            </p>
            <p>
              Somewhere along the way, I realised I wasn&apos;t just designing
              screens anymore.
            </p>
            <p>
              I was learning how businesses work, how people make decisions, how
              technology shapes behaviour, and how a few pixels in the right
              place can completely change an experience.
            </p>
            <p>Four years later, I&apos;m still curious about the same thing</p>
          </div>

          {/* Skills Section */}
          <div className="mt-14 sm:mt-18">
            <h2 className="text-[17px] sm:text-[19px] font-bold text-neutral-900 tracking-tight mb-4">
              Skills
            </h2>
            <div className="flex flex-wrap items-center text-[14px] sm:text-[15px] text-neutral-800">
              <span>Design Strategy</span>
              <span className="mx-3.5 text-neutral-300 select-none">|</span>
              <span>UX Research</span>
              <span className="mx-3.5 text-neutral-300 select-none">|</span>
              <span>UI/UX Design</span>
              <span className="mx-3.5 text-neutral-300 select-none">|</span>
              <span>Prototyping</span>
              <span className="mx-3.5 text-neutral-300 select-none">|</span>
              <span>Interaction Design</span>
            </div>
          </div>

          {/* My Tools Section */}
          <div className="mt-14 sm:mt-18">
            <h2 className="text-[17px] sm:text-[19px] font-bold text-neutral-900 tracking-tight mb-5">
              My Tools
            </h2>
            <div className="flex items-center gap-3">
              {/* Tool 1: Figma */}
              <div
                title="Figma"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1E1E1E] flex items-center justify-center shadow-2xs hover:scale-105 transition-transform cursor-pointer"
              >
                <Image
                  src="/images/my-tools/figma.png"
                  alt="Figma"
                  width={40}
                  height={40}
                />
              </div>

              {/* Tool 2: Miro */}
              <div
                title="Miro"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FFD02F] flex items-center justify-center shadow-2xs hover:scale-105 transition-transform cursor-pointer"
              >
                <Image
                  src="/images/my-tools/miro.png"
                  alt="Miro"
                  width={40}
                  height={40}
                />
              </div>

              {/* Tool 3: GitHub */}
              <div
                title="GitHub"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#181717] flex items-center justify-center shadow-2xs hover:scale-105 transition-transform cursor-pointer"
              >
                <Image
                  src="/images/my-tools/github.png"
                  alt="GitHub"
                  width={40}
                  height={40}
                />
              </div>

              {/* Tool 4: Claude / Anthropic */}
              <div
                title="Claude"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#D97757] flex items-center justify-center shadow-2xs hover:scale-105 transition-transform cursor-pointer"
              >
                <Image
                  src="/images/my-tools/claude.png"
                  alt="Claude"
                  width={40}
                  height={40}
                />
              </div>

              {/* Tool 5: ChatGPT */}
              <div
                title="ChatGPT"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#202123] flex items-center justify-center shadow-2xs hover:scale-105 transition-transform cursor-pointer"
              >
                <Image
                  src="/images/my-tools/chatgpt.png"
                  alt="ChatGPT"
                  width={40}
                  height={40}
                />
              </div>

              {/* Tool 6: Spline */}
              <div
                title="Ellipse"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1A1A1A] flex items-center justify-center shadow-2xs hover:scale-105 transition-transform cursor-pointer"
              >
                <Image
                  src="/images/my-tools/ellipse.png"
                  alt="Ellipse"
                  width={40}
                  height={40}
                />
              </div>

              <div
                title="Jira"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1E1E1E] flex items-center justify-center shadow-2xs hover:scale-105 transition-transform cursor-pointer"
              >
                <Image
                  src="/images/my-tools/jira.png"
                  alt="Jira"
                  width={40}
                  height={40}
                />
              </div>
            </div>
          </div>

          {/* Past Experiences Section */}
          <div className="mt-14 sm:mt-18 max-w-[850px]">
            <h2 className="text-[17px] sm:text-[19px] font-bold text-neutral-900 tracking-tight mb-6">
              Past Experiences
            </h2>
            <div className="space-y-4">
              {PAST_EXPERIENCES.map((exp, index) => (
                <div
                  key={index}
                  className="flex items-baseline justify-between gap-3 text-[14px] sm:text-[15px]"
                >
                  <div className="flex items-baseline gap-2.5 min-w-0 shrink-0">
                    <span className="font-semibold text-neutral-900">
                      {exp.role}
                    </span>
                    <span className="text-[12.5px] sm:text-[13px] text-neutral-400 font-normal">
                      {exp.company}
                    </span>
                  </div>
                  <div className="flex-1 border-b border-dotted border-neutral-300/80 mx-2 self-center translate-y-0.5" />
                  <span className="text-[12.5px] sm:text-[13px] text-neutral-600 font-normal shrink-0">
                    {exp.period}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Find me on Row */}
          <div className="mt-14 sm:mt-18 flex items-center gap-3.5 text-[12.5px] text-neutral-500">
            <span>Find me on</span>
            <div className="flex items-center gap-3">
              <a
                href="https://read.cv"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ReadCV profile"
                className="text-neutral-800 hover:text-black transition cursor-pointer"
              >
                <FourPointStarIcon className="w-4 h-4" />
              </a>
              <a
                href="https://dribbble.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Dribbble profile"
                className="text-neutral-800 hover:text-black transition cursor-pointer"
              >
                <DribbbleIcon className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X Twitter profile"
                className="text-neutral-800 hover:text-black transition cursor-pointer"
              >
                <XTwitterIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="text-neutral-800 hover:text-black transition cursor-pointer"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <section className="w-full bg-[#F8F8F8] border-t border-neutral-100">
        <div className="w-full max-w-350 mx-auto px-6 sm:px-12 lg:px-20 py-16 sm:py-20">
          {/* Available Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF7EE] text-[#299B75] border border-[#299B754D] text-[15px] font-medium tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[#299B75]" />
            <span>Available</span>
          </div>

          {/* Heading */}
          <h2 className="mt-5 text-[26px] sm:text-[32px] md:text-[40px] font-normal text-black tracking-tight leading-[1.2] max-w-2xl">
            Always searching for new problems,
            <br />
            fun teams and great ideas.
          </h2>

          {/* Subtitle */}
          <p className="mt-3 text-[13px] sm:text-[17px] text-[#00000080] font-normal">
            If this sounds like you, reach out🙂
          </p>

          {/* Email & Copy Button Row */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-6 pt-2">
            <a
              href="mailto:oluwatobiomosewa@gmail.com"
              className="inline-flex items-center gap-3.5 group cursor-pointer"
            >
              {/* Solid Outbox Tray Icon */}
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center shrink-0 text-neutral-900 group-hover:scale-105 transition-transform">
                <Image
                  src="/images/direct-send.png"
                  alt="Outbox Tray"
                  width={44}
                  height={44}
                />
              </div>

              {/* Email Address */}
              <span className="text-[20px] sm:text-[28px] md:text-[34px] font-bold text-neutral-900 tracking-tight group-hover:text-neutral-700 transition-colors break-all">
                oluwatobiomosewa@gmail.com
              </span>
            </a>

            {/* Copy Button */}
            <button
              onClick={handleCopyEmail}
              aria-label="Copy email address"
              className={`inline-flex items-center gap-2 px-4 py-1 rounded-[40px] border-2 border-black bg-white text-black text-[24px] font-medium hover:bg-neutral-50 active:scale-95 transition-all shadow-2xs cursor-pointer shrink-0 ${copiedEmail ? "border-emerald-600" : "border-black"}`}
            >
              {copiedEmail ? (
                <>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-emerald-600"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Image
                    src="/images/copy.png"
                    alt="Copy"
                    width={14}
                    height={14}
                    className="size-7 object-contain"
                  />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Bottom Footer Section */}
      <footer className="w-full bg-white border-t border-neutral-100">
        <div className="w-full max-w-350 mx-auto px-6 sm:px-12 lg:px-20 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-neutral-400">
          {/* Left copyright */}
          <p className="order-2 sm:order-1 text-center sm:text-left">
            © oluwafemi, {new Date().getFullYear()}.
          </p>

          {/* Center Back to Top button */}
          <button
            onClick={handleScrollToTop}
            className="order-1 sm:order-2 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F3F4F6] hover:bg-neutral-200 active:scale-95 text-neutral-700 font-medium transition cursor-pointer text-[12px]"
          >
            <span className="text-[13px]">↑</span>
            <span>Back to Top</span>
          </button>

          {/* Right signature */}
          <p className="order-3 text-center sm:text-right">
            All rights reserved, all wrongs denied.
          </p>
        </div>
      </footer>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            aria-label="Close modal"
            className="absolute top-5 right-5 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Left Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) =>
                prev !== null
                  ? prev > 0
                    ? prev - 1
                    : ABOUT_IMAGES.length - 1
                  : null,
              );
            }}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition cursor-pointer"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) =>
                prev !== null
                  ? prev < ABOUT_IMAGES.length - 1
                    ? prev + 1
                    : 0
                  : null,
              );
            }}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition cursor-pointer"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          {/* Image Container */}
          <div
            className="relative max-w-4xl max-h-[85vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-auto h-auto max-w-full max-h-[85vh] aspect-9/15 overflow-hidden rounded-xl shadow-2xl">
              <Image
                src={ABOUT_IMAGES[lightboxIndex].src}
                alt={ABOUT_IMAGES[lightboxIndex].alt}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/70 text-[12px] font-mono tracking-wider">
            {lightboxIndex + 1} / {ABOUT_IMAGES.length}
          </div>
        </div>
      )}
    </div>
  );
}
