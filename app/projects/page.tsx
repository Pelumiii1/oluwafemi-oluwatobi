/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sidebar } from "../components/Sidebar";

interface ProjectItem {
  id: number;
  title: string;
  year: string;
  category: string[];
  image: string;
  description: string;
  liveUrl: string | null;
  hasDownloads?: boolean;
  caseStudyUrl: string | null;
}

const ALL_PROJECTS: ProjectItem[] = [
  {
    id: 1,
    title: "LifeVault",
    year: "2026",
    category: ["Web Applications"],
    image: "/images/project/lifevault.png",
    description:
      "Designed LifeVault: a secure digital legacy platform that makes it effortless to organize life's most important assets. From financial and business records to digital documents and family legacies, everything finally has a trusted place.",
    liveUrl: null,
    caseStudyUrl: null,
  },

  {
    id: 4,
    title: "ExcelMind",
    year: "2026",
    category: ["Mobile Applications"],
    image: "/images/project/excelMind.png",
    description:
      "Designed Excelmind: a school management platform that makes running a school feel effortless. Schools can simplify admissions, automate student records, keep parents engaged, and manage everything from one dashboard, giving administrators more time to focus on teaching and growth.",
    liveUrl: "https://excelmind.org",
    hasDownloads: true,
    caseStudyUrl: null,
  },

  {
    id: 7,
    title: "MotoBites",
    year: "2025",
    category: ["Mobile Applications"],
    image: "/images/project/motobites.png",
    description:
      "Designed MotoBites' v1.0: a fast, affordable food delivery platform that makes getting your favorite meals feel effortless. Users can discover what they love, order in a few taps, and have hot, fresh meals delivered in minutes.",

    liveUrl: "https://motobites.app",
    hasDownloads: true,
    caseStudyUrl: null,
  },

  {
    id: 2,
    title: "SwapXNext",
    year: "2025",
    category: ["Mobile Applications", "Websites"],
    image: "/images/project/swapxnext.png",
    description:
      "Designed SwapXnext: a simple crypto-to-naira platform that makes selling Bitcoin feel effortless. Users could swap BTC and receive Naira directly into their bank accounts, without the complexity of traditional crypto exchanges.",

    liveUrl: "https://swapxnext.com",
    caseStudyUrl: "/projects/swapxnext",
  },
  {
    id: 5,
    title: "Squeakee",
    year: "2025",
    category: ["Mobile Applications"],
    image: "/images/project/squeakee.png",
    description:
      "Designed Squeakee: a seamless cleaning service platform that makes booking a cleaner as easy as ordering a ride. Users select the spaces they need cleaned, provide the details, pay online, and have professional cleaners show up at their home, office, or wherever they need them.",
    caseStudyUrl: null,
    liveUrl: null,
  },

  {
    id: 8,
    title: "Metal",
    year: "2025",
    category: ["Mobile Applications"],
    image: "/images/project/metal.png",
    description:
      "Designed Metal: a modern fintech platform that brings everyday money management into one seamless experience. Users can track spending, manage multi-currency accounts, invest in diversified assets, and execute global transfers in seconds.",
    caseStudyUrl: null,
    liveUrl: "https://metalfintech.com",
  },
  {
    id: 3,
    title: "MissionSync",
    year: "2026",
    category: ["Web Applications"],
    image: "/images/project/missionsync.png",
    description:
      "Designed MissionSync's v2.5: an organizational alignment platform that turns leadership decisions into coordinated action. Teams get the right decisions, context, and next steps exactly when they need them, closing the gap between strategy and execution.",
    liveUrl: null,
    caseStudyUrl: null,
  },
  {
    id: 6,
    title: "Gated",
    year: "2025",
    category: ["Mobile Applications"],
    image: "/images/project/gated.png",
    description:
      "Designed Gated: an estate pass app designed to simplify visitor management for residential communities. It lets visitors book gate passes before they arrive. Security teams can verify and approve access in advance, making entry faster, safer, and completely hassle-free.",
    liveUrl: "https://gatedpass.io",
    caseStudyUrl: null,
  },
  {
    id: 9,
    title: "MotoBills",
    year: "2025",
    category: ["Mobile Applications"],
    image: "/images/project/motobills.png",
    description:
      "Designed MotoBills v1.0: an all-in-one payments platform that makes everyday bills and bookings feel effortless. Users can pay utility bills, buy affordable airtime and data, and discover great deals on flights and hotels, all from one simple place.",
    liveUrl: "https://motobills.com",
    hasDownloads: true,
    caseStudyUrl: null,
  },
  {
    id: 11,
    title: "Naptones",
    year: "2025",
    category: ["Mobile Applications"],
    image: "/images/project/naptones.png",
    description:
      "Designed Naptones: a calming sound therapy app that turns everyday noise into a personalized escape. Users can explore immersive soundscapes, mix different audio elements, and create custom sound themes tailored to help them relax, focus, or unwind.",
    caseStudyUrl: null,
    liveUrl: null,
    hasDownloads: true,
  },
  {
    id: 10,
    title: "Awake Sounds",
    year: "2025",
    category: ["Mobile Applications"],
    image: "/images/projects/project-10.png",
    description:
      "Designed Awake: a mindful sleep and ambient soundscapes companion app crafted to help modern professionals unwind, improve deep sleep cycles, and establish restorative morning routines.",
    caseStudyUrl: null,
    liveUrl: "https://awakesounds.app",
  },
  {
    id: 12,
    title: "Career Buddy",
    year: "2024",
    category: ["Web Applications"],
    image: "/images/project/careerBuddy.png",
    description:
      "Designed CareerBuddy’s v3: a talent platform that helps global companies discover and connect with Africa’s top professionals. Beyond listing jobs, the experience brings Africa’s talent story to life, making it easier for companies to find exceptional people ready to thrive on the global stage.",
    liveUrl: null,
    caseStudyUrl: null,
  },
  {
    id: 13,
    title: "Whisperly",
    year: "2024",
    category: ["Mobile Applications"],
    image: "/images/project/whisperly.png",
    description:
      "Designed Whisperly: a privacy-first recovery app that makes deleted messages and media easier to retrieve. By monitoring notifications and securely storing content locally, users can recover texts, photos, videos, and audio without the frustration of losing them for good.",
    liveUrl: null,
    caseStudyUrl: null,
  },
];

const FILTER_OPTIONS = [
  "All",
  "Mobile Applications",
  "Web Applications",
  "Websites",
] as const;

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] =
    useState<(typeof FILTER_OPTIONS)[number]>("All");
  const [showBanner, setShowBanner] = useState(true);

  const filteredProjects =
    activeFilter === "All"
      ? ALL_PROJECTS
      : ALL_PROJECTS.filter((p) => p.category.includes(activeFilter));

  return (
    <div className="h-screen w-full bg-white text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white flex flex-col md:flex-row overflow-hidden">
      {/* Left Sidebar: Fixed Width of 306px */}
      <Sidebar />

      {/* Right Content Area: Independently scrollable */}
      <div className="flex-1 min-w-0 h-full overflow-y-auto flex flex-col justify-between">
        <main className="w-full px-6 sm:px-10 lg:px-14 py-8 sm:py-10">
          {/* Back Navigation Link */}
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

          {/* Large Editorial Headline */}
          <div className="mt-8 sm:mt-10">
            <h1 className="font-serif text-[28px] sm:text-[36px] lg:text-[40px] font-normal text-black leading-[1.2] tracking-tight">
              Every product starts as an idea, but not every idea becomes a
              product.
              <br className="hidden sm:inline" />{" "}
              <span>Through research, testing &amp; iteration,</span>{" "}
              <span className="inline-block px-4 py-1 rounded-full bg-[#EAEAEA] text-neutral-900 font-serif text-[22px] sm:text-[30px] lg:text-[34px] align-middle mt-2 sm:mt-0 font-normal">
                I help that idea find its form
              </span>
            </h1>
          </div>

          {/* Filter Tabs */}
          <div className="mt-8 flex items-center">
            <div className="p-1 rounded-xl bg-[#F5F5F5] inline-flex items-center gap-1 flex-wrap">
              {FILTER_OPTIONS.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-3.5 py-1.5 rounded-lg text-[13px] font-medium transition cursor-pointer ${
                      isActive
                        ? "bg-white text-neutral-900 shadow-2xs font-semibold"
                        : "text-neutral-500 hover:text-neutral-900"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Announcement Banner */}
          {showBanner && (
            <div className="mt-6 p-4 rounded-xl bg-[#FFF8EE] border-l-[3.5px] border-amber-500 flex items-start justify-between gap-4">
              <div>
                <p className="text-[13px] font-semibold text-neutral-900 leading-snug">
                  Portfolio &apos;26 is in progress, ~60% landed.
                </p>
                <p className="text-[12px] text-neutral-500 mt-1 leading-snug">
                  Case studies, writings, amd details are actively rolling in.
                  Thanks for coming early
                </p>
              </div>
              <button
                onClick={() => setShowBanner(false)}
                className="text-neutral-400 hover:text-neutral-700 transition cursor-pointer text-[18px] leading-none p-1 shrink-0"
                aria-label="Dismiss banner"
              >
                ×
              </button>
            </div>
          )}

          {/* Dynamic Masonry Projects Grid based on image size */}
          <div className="mt-9 columns-1 md:columns-2 lg:columns-3 gap-6 sm:gap-7">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="break-inside-avoid inline-block w-full mb-8 sm:mb-10 group cursor-pointer"
              >
                {/* Project Image Container: Dynamic height based on intrinsic image dimensions */}
                <div className="relative w-full rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/70 shadow-2xs">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto block object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none" />
                </div>

                {/* Title & Year Row */}
                <div className="flex items-baseline justify-between mt-3.5">
                  <h3 className="text-[15px] sm:text-[16px] font-bold text-neutral-900 group-hover:text-black">
                    {project.title}
                  </h3>
                  <span className="text-[12px] sm:text-[13px] text-neutral-400 font-normal">
                    {project.year}
                  </span>
                </div>

                {/* Description */}
                <p className="text-[11.5px] sm:text-[12px] text-neutral-500 leading-[1.6] mt-1.5 mb-2.5">
                  {project.description}
                </p>

                {/* Action Links Row */}
                <div
                  className="flex items-center flex-wrap gap-y-1.5 text-[11.5px] sm:text-[12px] text-neutral-600 mt-auto pt-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <>
                    {!project.caseStudyUrl ? (
                      <div className="inline-flex items-center gap-1.5 text-neutral-400 select-none">
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="text-neutral-400 shrink-0"
                        >
                          <path d="M19 10h-1V7A6 6 0 0 0 6 7v3H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2zM8 7a4 4 0 0 1 8 0v3H8V7zm11 13H5v-8h14v8z" />
                        </svg>
                        <span>Read Case Study</span>
                      </div>
                    ) : (
                      <Link
                        href={project.caseStudyUrl}
                        className="inline-flex items-center gap-1 text-neutral-700 hover:text-black font-medium transition cursor-pointer"
                      >
                        <span>Read Case Study</span>
                        <span className="text-[13px]">→</span>
                      </Link>
                    )}
                  </>

                  {/* Live Site Link */}
                  {project.liveUrl && (
                    <>
                      <span className="text-neutral-300 mx-2 select-none">
                        |
                      </span>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-neutral-700 hover:text-black font-medium transition cursor-pointer"
                      >
                        <span>View Live Site</span>
                        <span className="text-[12px]">↗</span>
                      </a>
                    </>
                  )}

                  {/* Downloads Section (Apple & Play Store) */}
                  {project.hasDownloads && (
                    <>
                      <span className="text-neutral-300 mx-2 select-none">
                        |
                      </span>
                      <div className="inline-flex items-center gap-1 text-neutral-700 font-medium">
                        <span>Download</span>
                        {/* Apple Icon */}
                        <svg
                          viewBox="0 0 24 24"
                          className="w-3.5 h-3.5 fill-current ml-0.5"
                        >
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.89c.64-.78 1.08-1.86.96-2.89-.93.04-2.05.62-2.71 1.4-.58.67-1.09 1.76-.95 2.8 1.04.08 2.06-.53 2.7-1.31z" />
                        </svg>
                        <span className="text-neutral-300 mx-0.5 select-none">
                          |
                        </span>
                        {/* Play Store Triangle Icon */}
                        <svg
                          viewBox="0 0 24 24"
                          className="w-3 h-3 fill-current"
                        >
                          <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14.5 8.5c.67.4.67 1.37 0 1.77L4.6 21.3c-.66.5-1.6.03-1.6-.8z" />
                        </svg>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
