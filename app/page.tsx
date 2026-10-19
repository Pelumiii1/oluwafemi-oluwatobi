"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChatBubbleIcon,
  MailIcon,
  DocumentIcon,
  CloseIcon,
} from "./components/Icons";
import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar";

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  client?: string;
  tags?: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Modular Schedule & Calendar Workspace",
    category: "SaaS Dashboard",
    image: "/images/projects/project-1.png",
    description:
      "A cross-team calendar and meeting coordination system with live conflict detection, room resource booking, and custom tag categorization.",
    client: "Productivity Suite",
    tags: ["SaaS", "Design System", "Web App"],
  },
  {
    id: 2,
    title: "Approval Workflow & Pipeline Portal",
    category: "Enterprise SaaS",
    image: "/images/projects/project-2.png",
    description:
      "A comprehensive review and document governance interface engineered for compliance verification and multi-department team handoffs.",
    client: "Internal Ops",
    tags: ["Enterprise", "Workflow", "Data Table"],
  },
  {
    id: 3,
    title: "Community & Impact Intelligence Hub",
    category: "Analytics Platform",
    image: "/images/projects/project-3.png",
    description:
      "Telemetry dashboard tracking live environmental impact, community growth engagement, and KPI progress tracking with data visualization.",
    client: "Impact Tech",
    tags: ["Analytics", "Data Viz", "Dashboard"],
  },
  {
    id: 4,
    title: "Crypto Asset & Real-Time Market App",
    category: "Mobile Fintech",
    image: "/images/projects/project-4.png",
    description:
      "iOS digital asset manager featuring real-time price tick feeds, 24-hour gain/loss charts, and biometric wallet security.",
    client: "Web3 Finance",
    tags: ["iOS", "Fintech", "Mobile App"],
  },
  {
    id: 5,
    title: "Multi-Currency Wallet & Settlement Rail",
    category: "Mobile Fintech",
    image: "/images/projects/project-5.png",
    description:
      "Consumer wallet experience with instant Naira settlements, virtual cards, utility bill payments, and smart savings vaults.",
    client: "Euphoria Pay",
    tags: ["Mobile", "Banking", "Fintech"],
  },
  {
    id: 6,
    title: "User Onboarding & Checkout Receipt Architecture",
    category: "Mobile Experience",
    image: "/images/projects/project-6.png",
    description:
      "Friction-free identity verification flow alongside an itemized checkout confirmation and transparent fee breakdown.",
    client: "Commerce Core",
    tags: ["UX Flow", "E-Commerce", "Mobile"],
  },
  {
    id: 7,
    title: "Instant Crypto-to-Naira Liquidation App",
    category: "Fintech Platform",
    image: "/images/projects/project-7.png",
    description:
      "Mobile exchange allowing users to liquidate cryptocurrency directly to local bank accounts within seconds with zero hidden slippage.",
    client: "SwapDirect",
    tags: ["Fintech", "Mobile", "Crypto Ramp"],
  },
  {
    id: 8,
    title: "Merchant Operations & Settlement Ledger",
    category: "Admin Portal",
    image: "/images/projects/project-8.png",
    description:
      "High-density transactional audit system for tracking customer disputes, payout schedules, and merchant fee reconciliations.",
    client: "Fintech Ops",
    tags: ["Admin Table", "SaaS", "Financial UI"],
  },
  {
    id: 9,
    title: "Creative Agency & Strategic Design Showcase",
    category: "Brand & Web",
    image: "/images/projects/project-9.png",
    description:
      "Where strategy meets pixel-perfect execution: an editorial agency web experience highlighting high-tier brand identities and systems.",
    client: "Design Studio",
    tags: ["Branding", "Web Design", "Typography"],
  },
  {
    id: 10,
    title: "Instant Remittance & Tactile Keypad Flow",
    category: "Mobile Banking",
    image: "/images/projects/project-10.png",
    description:
      "Custom haptic keypad transfer screen tailored for high-speed cross-border payments with one-tap confirmation.",
    client: "RemitEase",
    tags: ["Mobile UI", "Payment", "Micro-interactions"],
  },
];

export default function Home() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [currentTime, setCurrentTime] = useState("9:45PM");

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
    <div className="h-screen w-full bg-white text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white flex flex-col md:flex-row overflow-hidden">
      {/* Left Sidebar: Fixed Width of 306px and fixed on screen */}
      <Sidebar />

      {/* Right Content Area: Independently scrollable, takes remaining width */}
      <div className="flex-1 min-w-0 h-full overflow-y-auto flex flex-col justify-between">
        {/* Top Header */}
        <Navbar />

        {/* Main Section Content */}
        <main className="flex-1 w-full px-6 sm:px-10 lg:px-14 py-7 sm:py-9">
          {/* Top Status Bar: Availability & Time */}
          <div className="flex items-center justify-between pb-3.5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11.5px] font-medium text-emerald-600 tracking-wide">
                Available for work
              </span>
            </div>
            <div className="text-[11px] font-medium text-neutral-400 tracking-wide font-mono">
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
          <h2 className="text-[22px] sm:text-[26px] md:text-[20px] font-normal text-neutral-900 tracking-tight mt-5 mb-3.5 leading-snug">
            From idea to shipped, without the mess.
          </h2>

          {/* Bio Paragraphs */}
          <div className="space-y-3.5 text-[12px] sm:text-[13px] text-neutral-500 leading-relaxed max-w-4xl">
            <p>
              I’m Oluwafemi, a{" "}
              <strong className="font-semibold text-neutral-900">
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
          <div className="flex items-center gap-6 mt-4 mb-9">
            <a
              href="mailto:oluwatobiomosewa@gmail.com"
              className="inline-flex items-center gap-1.5 text-[12px] sm:text-[13px] font-semibold text-neutral-900 hover:text-neutral-600 transition group cursor-pointer"
            >
              <Image
                src={"/images/mail.png"}
                width={18}
                height={18}
                alt="My Resume"
              />
              <span>Get in Touch</span>
            </a>
            <button className="inline-flex items-center gap-1.5 text-[12px] sm:text-[13px] font-semibold text-neutral-900 hover:text-neutral-600 transition group cursor-pointer">
              <Image
                src={"/images/resume.png"}
                width={18}
                height={18}
                alt="My Resume"
              />
              <span>My Resume</span>
            </button>
          </div>

          {/* Design Explorations Section */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[18px] font-semibold text-neutral-900">
                Design Explorations
              </h3>
              <button className="text-[12px] text-[#5C5C5C] hover:text-neutral-900 border-b border-dotted underline-offset-4 transition cursor-pointer">
                View all Projects
              </button>
            </div>

            {/* 5-Column Project Grid filling remaining page width */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-3.5">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="group relative aspect-square rounded-xl overflow-hidden border border-neutral-200/70 bg-[#F9FAFB] hover:border-neutral-400 hover:shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center p-0.5"
                >
                  <div className="relative w-full h-full rounded-[10px] overflow-hidden bg-white">
                    <Image
                      src={proj.image}
                      alt={proj.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    />
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-neutral-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 pointer-events-none">
                    <span className="text-[10px] font-medium text-white bg-black/80 backdrop-blur-xs px-2 py-0.5 rounded-md truncate max-w-full">
                      {proj.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/projects"
            className="flex space-x-2 rounded-md justify-between items-center border px-4 py-2 border-[#F7F7F7] bg-sidebar w-fit mt-5 cursor-pointer font-medium hover:bg-neutral-100 transition-colors"
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
  );
}
