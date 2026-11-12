"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { PageLoader, hasLoaderPlayed } from "./components/PageLoader";
import { Sidebar } from "./components/Sidebar";
import { MobileNav } from "./components/MobileNav";

interface Project {
  id: number;
  title: string;
  category?: string;
  image: string;
  description?: string;
  client?: string;
  tags?: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Meeting Sync",
    image: "/images/design-exploration/meeting-sync.jpg",
  },
  {
    id: 2,
    title: "Priorities",
    image: "/images/design-exploration/priorities.jpg",
  },
  {
    id: 3,
    title: "Measures",
    image: "/images/design-exploration/measures.jpg",
  },
  {
    id: 4,
    title: "Market Sales",
    image: "/images/design-exploration/market-sales.jpg",
  },
  {
    id: 5,
    title: "Home Swap",
    image: "/images/design-exploration/home-sw.png",
  },
  {
    id: 6,
    title: "Sque",
    image: "/images/design-exploration/home-sque.png",
  },
  {
    id: 7,
    title: "Mobile Swapnext",
    image: "/images/design-exploration/home-mobile-swapnext.png",
  },
  {
    id: 8,
    title: "Gap Analysis",
    image: "/images/design-exploration/gap-analysis.jpg",
  },
  {
    id: 9,
    title: "Feature Creep",
    image: "/images/design-exploration/feature.jpg",
  },
  {
    id: 10,
    title: "Enter Amount",
    image: "/images/design-exploration/enter-amount.png",
  },
  {
    id: 11,
    title: "Delivery Progress",
    image: "/images/design-exploration/delivery-progress.jpg",
  },
  {
    id: 12,
    title: "Choose US",
    image: "/images/design-exploration/choose-us.png",
  },
  {
    id: 14,
    title: "Calendar",
    image: "/images/design-exploration/calendar-grid-view.png",
  },
  {
    id: 15,
    title: "Assistant",
    image: "/images/design-exploration/assistant.jpg",
  },
  {
    id: 16,
    title: "Add Roles",
    image: "/images/design-exploration/add-role.jpg",
  },
  {
    id: 17,
    title: "Add Missions",
    image: "/images/design-exploration/add-mission.jpg",
  },
  {
    id: 18,
    title: "Add Card",
    image: "/images/design-exploration/add-card.png",
  },
  {
    id: 19,
    title: "Notifications",
    image: "/images/design-exploration/notifications.jpg",
  },
  {
    id: 20,
    title: "New Pass",
    image: "/images/design-exploration/new-pass.jpg",
  },
  {
    id: 21,
    title: "Give Recognition",
    image: "/images/design-exploration/give-recognition.jpg",
  },
  {
    id: 22,
    title: "Details",
    image: "/images/design-exploration/details.jpg",
  },
  {
    id: 23,
    title: "Recognition Update",
    image: "/images/design-exploration/regonition-update.jpg",
  },
  {
    id: 24,
    title: "Home",
    image: "/images/design-exploration/home.jpg",
  },
  {
    id: 25,
    title: "Update Profile",
    image: "/images/design-exploration/update.jpg",
  },
  {
    id: 26,
    title: "Timetable",
    image: "/images/design-exploration/timetable-excel.jpg",
  },
  {
    id: 27,
    title: "Swap coin",
    image: "/images/design-exploration/swap-coin.jpg",
  },
  {
    id: 28,
    title: "Onboarding",
    image: "/images/design-exploration/steps-swapnext.jpg",
  },
  {
    id: 29,
    title: "Review",
    image: "/images/design-exploration/review.jpg",
  },
  {
    id: 30,
    title: "Assets",
    image: "/images/design-exploration/assets.jpg",
  },
  {
    id: 31,
    title: "Pricing",
    image: "/images/design-exploration/pricing.jpg",
  },
];

export default function Home() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [currentTime, setCurrentTime] = useState("9:45PM");
  const [isRevealed, setIsRevealed] = useState(() => hasLoaderPlayed());

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "Africa/Lagos",
      };
      try {
        const timeStr = new Intl.DateTimeFormat("en-US", options).format(now);
        setCurrentTime(timeStr.replace(/\s+/g, ""));
      } catch {
        setCurrentTime("9:45PM");
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    navigator.clipboard.writeText("oluwatobiomosewa@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <>
      <PageLoader onComplete={() => setIsRevealed(true)} />
      <div
        className={`min-h-screen md:h-screen w-full bg-white text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white flex flex-col md:flex-row overflow-x-hidden md:overflow-hidden transition-transform duration-700 ease-out ${
          isRevealed ? "scale-100" : "scale-[0.99]"
        }`}
      >
        {/* Left Sidebar: Fixed Width of 306px and fixed on screen */}
        <Sidebar />

        {/* Right Content Area: Independently scrollable on desktop, main flow on mobile */}
        <div className="flex-1 min-w-0 md:h-full md:overflow-y-auto flex flex-col justify-between order-1 md:order-2">
          {/* Top Header */}
          <Navbar />

          {/* Main Section Content */}
          <main className="flex-1 w-full px-6 sm:px-10 lg:px-14 py-7 sm:py-9">
            {/* Top Status Bar: Availability & Time */}
            <div className="flex items-center justify-between pb-3.5">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1BA25C] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1BA25C]" />
                </span>
                <span className="text-[16px] font-medium text-[#1BA25C] tracking-wide font-rounded">
                  Available for work
                </span>
              </div>
              <div className="text-[14px] font-normal text-[#5C5C5C] tracking-wide font-rounded">
                {currentTime}
              </div>
            </div>

            {/* Profile Intro */}
            <div className="mt-2.5 flex items-center gap-3">
              <div className="size-13 rounded-xl overflow-hidden bg-neutral-100 shrink-0 border-[2.2px] border-neutral-200 shadow-2xs">
                <Image
                  src="/images/femi.png"
                  alt="Oluwatobi Oluwafemi"
                  width={42}
                  height={42}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div>
                <h1 className="text-[14px] font-medium text-[#222222] leading-snug">
                  Oluwatobi Oluwafemi
                </h1>
                <a
                  href="mailto:oluwatobiomosewa@gmail.com"
                  className="text-[12px] text-[#5C5C5C] hover:text-neutral-700 transition block leading-snug"
                >
                  oluwatobiomosewa@gmail.com
                </a>
              </div>
            </div>

            {/* Headline */}
            <h2 className="text-[22px] sm:text-[26px] md:text-[20px] font-normal text-black tracking-tight mt-5 mb-3.5 leading-snug font-rounded">
              From idea to shipped, without the mess.
            </h2>

            {/* Bio Paragraphs */}
            <div className="space-y-3 text-[12px] sm:text-[14px] text-black font-light font-rounded">
              <p>
                I’m Oluwafemi, a
                {"  "} <strong className="font-semibold text-neutral-900">
                  Product Designer
                </strong>{" "}
                who combines research, systems thinking, and AI-powered workflows
                to design intelligent digital products that feel effortless to
                use. I partner with founders and cross-functional teams to turn
                complex ideas into intuitive experiences, rapidly prototype
                solutions, and ship products that create real value for users.
              </p>
              <p>
                My work spans AI products, SaaS, fintech, wellness, and
                e-commerce, where I focus on designing human-centered experiences
                that make AI useful, trustworthy, and scalable. Whether it’s
                crafting AI interactions, building design systems, or accelerating
                product development with AI and code, my goal is always the same:
                create products that solve meaningful problems and drive lasting
                impact.
              </p>
            </div>

            {/* Action Links */}
            <div className="flex items-center gap-5 sm:gap-6 mt-4 mb-9">
              <a
                href="mailto:oluwatobiomosewa@gmail.com"
                className="inline-flex items-center gap-1.5 text-[12px] sm:text-[13px] font-normal text-neutral-900 hover:text-neutral-600 transition group cursor-pointer"
              >
                <Image
                  src={"/images/mail.png"}
                  width={18}
                  height={18}
                  alt="Mail"
                />
                <span className="border-b border-dotted border-neutral-700/80 pb-0.5 md:border-b-0 md:pb-0">
                  Get in Touch
                </span>
              </a>
              <button className="inline-flex items-center gap-1.5 text-[12px] sm:text-[13px] font-normal text-neutral-900 hover:text-neutral-600 transition group cursor-pointer">
                <Image
                  src={"/images/resume.png"}
                  width={18}
                  height={18}
                  alt="Resume"
                />
                <span className="border-b border-dotted border-neutral-700/80 pb-0.5 md:border-b-0 md:pb-0">
                  My Resume
                </span>
              </button>

              {/* Book a Call - Only for Mobile */}
              <a
                href="mailto:oluwatobiomosewa@gmail.com?subject=Book%20a%20Call"
                className="inline-flex md:hidden items-center gap-1.5 text-[12px] sm:text-[13px] font-normal text-neutral-900 hover:text-neutral-600 transition group cursor-pointer"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-[18px] h-[18px] shrink-0 text-neutral-900"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                <span className="border-b border-dotted border-neutral-700/80 pb-0.5">
                  Book a Call
                </span>
              </a>
            </div>

            {/* Design Explorations Section */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[18px] font-semibold text-black font-ui-display">
                  Design Explorations
                </h3>
                <Link href={'/projects'} className="text-[12px] text-[#5C5C5C] hover:text-neutral-900 border-b border-dotted underline-offset-4 transition cursor-pointer">
                  View all Projects
                </Link>
              </div>

              {/* 5-Column Project Grid filling remaining page width */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-3.5">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="group relative aspect-square rounded-xl overflow-hidden border border-neutral-200/70 bg-[#F9FAFB]  transition-all duration-200 flex items-center justify-center p-0.5"
                  >
                    <div className="relative w-full h-full rounded-[10px] overflow-hidden bg-white">
                      <Image
                        src={proj.image}
                        alt={proj.title || ""}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        className="object-cover"
                      />
                    </div>

                    {/* Hover Overlay */}
                    {/* <div className="absolute inset-0 bg-neutral-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 pointer-events-none">
                    <span className="text-[10px] font-medium text-white bg-black/80 backdrop-blur-xs px-2 py-0.5 rounded-md truncate max-w-full">
                      {proj.id}
                    </span>
                  </div> */}
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/projects"
              className="flex space-x-2 rounded-md justify-between items-center border px-4 py-2 border-[#F7F7F7] bg-[#FCFCFC] w-fit mt-5 cursor-pointer font-medium hover:bg-neutral-100 transition-colors font-rounded text-[14px] rounded-[6px]"
            >
              <Image
                src="/images/personal-folder.png"
                alt=""
                width={40}
                height={40}
                className="size-5"
              />
              <p>View all Projects</p>
              <Image
                src="/images/arrow-top-right.png"
                alt="arrow"
                width={40}
                height={40}
                className="size-5"
              />
            </Link>
          </main>
        </div>
      </div>
      {/* Mobile Fixed Floating Navigation Dock */}
      <MobileNav />
    </>
  );
}
