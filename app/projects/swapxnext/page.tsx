"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface SectionItem {
  id: string;
  label: string;
}

const SECTIONS: SectionItem[] = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "The Problem" },
  { id: "solution", label: "Design Solution" },
  { id: "convert", label: "Convert Assets" },
  { id: "other-screens", label: "Other Screens" },
  { id: "what-i-learnt", label: "What I Learnt" },
];

export default function SwapXNextCaseStudy() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeSection, setActiveSection] = useState("overview");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Scroll listener for progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      setScrollPercent(Math.min(100, Math.max(0, progress)));

      // Determine active section
      for (const sec of [...SECTIONS].reverse()) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 240) {
            setActiveSection(sec.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("oluwatobiomosewa@gmail.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white font-sans relative">
      {/* Right Floating Scroll Progress Indicator */}
      <aside
        aria-label="Page scroll progress"
        className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-1.5 z-40 select-none"
      >
        <span className="text-[12px] font-medium text-neutral-600 mb-1 tracking-tight">
          {scrollPercent}%
        </span>
        <div className="flex flex-col items-center gap-1.5">
          {SECTIONS.map((sec, idx) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                title={sec.label}
                aria-label={`Jump to ${sec.label}`}
                className="group relative flex items-center justify-center p-0.5 cursor-pointer"
              >
                <span
                  className={`block w-4 h-[1.5px] rounded-full transition-all duration-200 ${isActive
                      ? "bg-neutral-900 w-5"
                      : "bg-neutral-300 group-hover:bg-neutral-500"
                    }`}
                />
                {/* Tooltip on hover */}
                <span className="absolute right-6 px-2 py-0.5 rounded bg-neutral-900 text-white text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-sm">
                  {sec.label}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Fixed Back Button with Figma Glass Effect */}
      <div className="fixed top-5 sm:top-6 left-6 sm:left-12 lg:left-20 z-40">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-[14px] text-neutral-800 hover:text-black transition-all font-medium group cursor-pointer py-1.5 px-3 rounded-full border border-neutral-200/50 shadow-2xs hover:border-neutral-300"
          style={{
            backgroundColor: "rgba(237, 237, 235, 0.04)",
            backdropFilter: "blur(19.9px)",
            WebkitBackdropFilter: "blur(19.9px)",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:-translate-x-1 transition-transform"
          >
            <polyline points="9 14 4 9 9 4" />
            <path d="M20 20v-7a4 4 0 0 0-4-4H4" />
          </svg>
          <span>Back</span>
        </Link>
      </div>

      {/* Main Content Container */}
      <main className="w-full mx-auto px-6 sm:px-12 lg:px-20 pt-20 sm:pt-24 pb-24">

        {/* Project Header Title & Metadata */}
        <div className="pb-10 sm:pb-12">
          <h1 className="text-[38px] sm:text-[48px] md:text-[56px] font-bold text-neutral-950 tracking-tight leading-tight">
            SwapXNext
          </h1>

          {/* Metadata Badges */}
          <div className="mt-4 flex flex-wrap items-center gap-6 text-[13.5px] sm:text-[14.5px] text-neutral-600 font-medium">
            {/* Category / Platform Tag */}
            <div className="inline-flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-neutral-500"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              <span>Mobile Application | Website | Admin Dashboard</span>
            </div>

            {/* Year Tag */}
            <div className="inline-flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-neutral-500"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>2026</span>
            </div>
          </div>
        </div>

        {/* Top Dashed Divider */}
        <div className="border-t border-dashed border-neutral-300 w-full" />

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: OVERVIEW */}
        {/* ------------------------------------------------------------------ */}
        <section
          id="overview"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 py-12 sm:py-16 scroll-mt-10"
        >
          {/* Left Column Label */}
          <div className="lg:col-span-3">
            <span className="text-[14.5px] font-medium text-neutral-500 select-none">
              Overview
            </span>
          </div>

          {/* Right Column Content */}
          <div className="lg:col-span-9">
            <h2 className="text-[22px] sm:text-[26px] md:text-[29px] font-bold text-neutral-950 tracking-tight leading-snug">
              Making Crypto-to-Naira Conversion Feel Effortless
            </h2>

            <p className="mt-4 text-[15px] sm:text-[16px] text-neutral-600 leading-relaxed font-normal">
              SwapXnext is a simple crypto-to-Naira platform designed to make
              selling Bitcoin feel straightforward. Instead of navigating the
              complexity of traditional crypto exchanges, users can convert their
              BTC, receive Naira directly into their bank account, and keep track
              of their transactions from one simple experience. The goal was
              simple: take the complexity out of converting crypto and make the
              process feel as familiar as sending money through a banking app.
            </p>

            {/* Overview Hero Mockup Banner */}
            <div
              onClick={() => setLightboxImage("/images/project/swapxnext.png")}
              className="mt-8 sm:mt-10 w-full rounded-2xl sm:rounded-3xl bg-[#B8B8B8] overflow-hidden flex items-center justify-center p-4 sm:p-8 cursor-zoom-in transition-all duration-300 hover:shadow-xl group"
            >
              <div className="relative w-full max-w-[620px] aspect-[4/3] flex items-center justify-center">
                <Image
                  src="/images/project/swapxnext.png"
                  alt="SwapXNext app held in hand preview"
                  fill
                  priority
                  className="object-contain group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Dashed Divider */}
        <div className="border-t border-dashed border-neutral-300 w-full" />

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 2: THE PROBLEM */}
        {/* ------------------------------------------------------------------ */}
        <section
          id="problem"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 py-12 sm:py-16 scroll-mt-10"
        >
          {/* Left Column Label */}
          <div className="lg:col-span-3">
            <span className="text-[14.5px] font-medium text-neutral-500 select-none">
              The Problem
            </span>
          </div>

          {/* Right Column Content */}
          <div className="lg:col-span-9">
            <h2 className="text-[22px] sm:text-[26px] md:text-[29px] font-bold text-neutral-950 tracking-tight leading-snug">
              Selling Crypto Was More Complicated Than It Needed to Be
            </h2>

            <p className="mt-4 text-[15px] sm:text-[16px] text-neutral-600 leading-relaxed font-normal">
              For many users, converting cryptocurrency into Naira can involve
              multiple steps, unfamiliar terminology, complicated exchange
              interfaces, and uncertainty around rates and transaction status.
              Users shouldn’t need to understand how an exchange works just to sell
              their Bitcoin. The challenge was to create an experience where users
              could quickly understand what their crypto is worth, how much Naira
              they’ll receive, where the money is going, and whether the
              transaction was successful.
            </p>
          </div>
        </section>

        {/* Dashed Divider */}
        <div className="border-t border-dashed border-neutral-300 w-full" />

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: DESIGN SOLUTION */}
        {/* ------------------------------------------------------------------ */}
        <section
          id="solution"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 py-12 sm:py-16 scroll-mt-10"
        >
          {/* Left Column Label */}
          <div className="lg:col-span-3">
            <span className="text-[14.5px] font-medium text-neutral-500 select-none">
              Design Solution
            </span>
          </div>

          {/* Right Column Content */}
          <div className="lg:col-span-9">
            <h2 className="text-[22px] sm:text-[26px] md:text-[29px] font-bold text-neutral-950 tracking-tight leading-snug">
              Designing a Simpler Way to Convert Crypto
            </h2>

            <p className="mt-4 text-[15px] sm:text-[16px] text-neutral-600 leading-relaxed font-normal">
              We designed SwapXnext around one core action: convert crypto and
              receive Naira. The experience removes unnecessary complexity and
              puts the most important information upfront, the asset being
              converted, the current rate, the amount the user will receive, and
              their destination bank account. Rather than making users navigate
              through a traditional trading interface, the conversion flow guides
              them through a clear sequence from selecting an asset to receiving
              their Naira. The result is a crypto experience that feels familiar,
              transparent, and easy to navigate, even for users who aren’t
              experienced crypto traders.
            </p>

            {/* Design Solution 3-Phones Mockup Container */}
            <div
              onClick={() =>
                setLightboxImage("/images/case-study/swapxnext/design-solution.png")
              }
              className="mt-8 sm:mt-10 w-full rounded-2xl sm:rounded-3xl bg-[#F0F0F2] border border-neutral-200/70 overflow-hidden p-6 sm:p-10 flex items-center justify-center cursor-zoom-in transition-all duration-300 hover:shadow-xl group"
            >
              <div className="relative w-full max-w-[760px] aspect-[16/7] flex items-center justify-center">
                <Image
                  src="/images/case-study/swapxnext/design-solution.png"
                  alt="SwapXNext Design Solution: Splash Screen, Home Screen, Markets Screen"
                  fill
                  className="object-contain group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Dashed Divider */}
        <div className="border-t border-dashed border-neutral-300 w-full" />

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: CONVERT ASSETS */}
        {/* ------------------------------------------------------------------ */}
        <section
          id="convert"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 py-12 sm:py-16 scroll-mt-10"
        >
          {/* Left Column Label */}
          <div className="lg:col-span-3">
            <span className="text-[14.5px] font-medium text-neutral-500 select-none">
              Convert Assets
            </span>
          </div>

          {/* Right Column Content */}
          <div className="lg:col-span-9">
            <h2 className="text-[22px] sm:text-[26px] md:text-[29px] font-bold text-neutral-950 tracking-tight leading-snug">
              Turning Bitcoin Into Naira in Just a Few Steps
            </h2>

            <div className="mt-4 space-y-3.5 text-[15px] sm:text-[16px] text-neutral-600 leading-relaxed font-normal">
              <p>The conversion experience is at the heart of SwapXnext.</p>
              <p>
                Users can select the crypto asset they want to sell, enter the
                amount, and immediately see the corresponding Naira value based on
                the current rate. Before confirming, the experience clearly
                presents the transaction details so users know exactly what
                they’re about to receive.
              </p>
              <p>
                We focused on reducing uncertainty around one of the most
                important questions when selling crypto:
              </p>
              <p className="font-semibold text-neutral-900 italic text-[16.5px] sm:text-[17.5px] pl-3 border-l-2 border-neutral-800">
                &ldquo;How much will I actually get?&rdquo;
              </p>
              <p>
                Clear amounts, rates, validation states, and confirmation screens
                help users feel confident before completing the transaction.
              </p>
            </div>

            {/* Convert Assets 3-Phones Mockup Container */}
            <div
              onClick={() =>
                setLightboxImage("/images/case-study/swapxnext/convert-assets.png")
              }
              className="mt-8 sm:mt-10 w-full rounded-2xl sm:rounded-3xl bg-[#F0F0F2] border border-neutral-200/70 overflow-hidden p-6 sm:p-10 flex items-center justify-center cursor-zoom-in transition-all duration-300 hover:shadow-xl group"
            >
              <div className="relative w-full max-w-[760px] aspect-[16/9] flex items-center justify-center">
                <Image
                  src="/images/case-study/swapxnext/convert-assets.png"
                  alt="Convert Assets flow: Supported Assets, Select BTC Network, Confirm Payout Account"
                  fill
                  className="object-contain group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Dashed Divider */}
        <div className="border-t border-dashed border-neutral-300 w-full" />

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 5: OTHER SCREENS */}
        {/* ------------------------------------------------------------------ */}
        <section
          id="other-screens"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 py-12 sm:py-16 scroll-mt-10"
        >
          {/* Left Column Label */}
          <div className="lg:col-span-3">
            <span className="text-[14.5px] font-medium text-neutral-500 select-none">
              Other Screens
            </span>
          </div>

          {/* Right Column Content */}
          <div className="lg:col-span-9">
            <h2 className="text-[22px] sm:text-[26px] md:text-[29px] font-bold text-neutral-950 tracking-tight leading-snug">
              Designing the Details That Complete the Experience
            </h2>

            {/* Subsections List */}
            <div className="mt-8 space-y-7 text-[15px] sm:text-[16px] text-neutral-600 leading-relaxed font-normal">
              <div>
                <h3 className="font-semibold text-neutral-900 text-[16.5px] sm:text-[17.5px] mb-1.5">
                  Notifications
                </h3>
                <p>
                  Notifications keep users informed about important account
                  activity, transaction updates, rate movements, and other
                  relevant events. Rather than overwhelming users with alerts, the
                  experience prioritizes information that can help them make
                  decisions or take action.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-neutral-900 text-[16.5px] sm:text-[17.5px] mb-1.5">
                  Profile &amp; Tiers
                </h3>
                <p>
                  The profile and settings area gives users control over their
                  account information, security preferences, notifications, and
                  other personal settings. The screens were structured to make
                  account management straightforward without taking attention
                  away from the core product.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-neutral-900 text-[16.5px] sm:text-[17.5px] mb-1.5">
                  Security &amp; Verification States
                </h3>
                <p>
                  We also designed supporting states for authentication, KYC,
                  verification, errors, pending transactions, and successful
                  actions. These moments may only appear for a few seconds, but
                  they play an important role in making financial interactions feel
                  safe and predictable.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-neutral-900 text-[16.5px] sm:text-[17.5px] mb-1.5">
                  Empty, Loading &amp; Error States
                </h3>
                <p>
                  Every major flow was designed beyond the ideal scenario. Empty
                  states help users understand what to do when they have no
                  transaction history or haven’t added an asset yet. Loading states
                  provide feedback while information is being processed, while
                  error states explain what went wrong and what the user can do
                  next. Together, these supporting screens helped create a more
                  complete experience, one that doesn’t just work when everything
                  goes perfectly, but guides users through the moments in
                  between.
                </p>
              </div>
            </div>

            {/* Other Screens Mockup Container */}
            <div
              onClick={() =>
                setLightboxImage("/images/case-study/swapxnext/other-screens.png")
              }
              className="mt-8 sm:mt-10 w-full rounded-2xl sm:rounded-3xl bg-[#F0F0F2] border border-neutral-200/70 overflow-hidden p-6 sm:p-10 flex items-center justify-center cursor-zoom-in transition-all duration-300 hover:shadow-xl group"
            >
              <div className="relative w-full max-w-[760px] aspect-[16/6] flex items-center justify-center">
                <Image
                  src="/images/case-study/swapxnext/other-screens.png"
                  alt="Other supporting screens: Notification, KYC Verification, Tier Limits"
                  fill
                  className="object-contain group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>

            {/* Closing Note */}
            <p className="mt-8 text-[15px] sm:text-[16px] text-neutral-600 leading-relaxed font-normal">
              Stay informed. Follow relevant assets and receive relevant rate
              notifications. The product makes crypto more approachable by
              focusing on the user’s actual goal rather than exposing them to
              unnecessary complexity.
            </p>
          </div>
        </section>

        {/* Dashed Divider */}
        <div className="border-t border-dashed border-neutral-300 w-full" />

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 6: WHAT I LEARNT */}
        {/* ------------------------------------------------------------------ */}
        <section
          id="what-i-learnt"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 py-12 sm:py-16 scroll-mt-10"
        >
          {/* Left Column Label */}
          <div className="lg:col-span-3">
            <span className="text-[14.5px] font-medium text-neutral-500 select-none">
              What I Learnt
            </span>
          </div>

          {/* Right Column Content */}
          <div className="lg:col-span-9">
            <h2 className="text-[22px] sm:text-[26px] md:text-[29px] font-bold text-neutral-950 tracking-tight leading-snug">
              Simplicity Is a Feature in Financial Products
            </h2>

            <div className="mt-4 space-y-4 text-[15px] sm:text-[16px] text-neutral-600 leading-relaxed font-normal">
              <p>
                Working on SwapXnext reinforced an important lesson: financial
                products don’t become easier because you show users more
                information. They become easier when you show them the right
                information at the right time.
              </p>
              <p>
                Crypto already comes with unfamiliar concepts, fluctuating values,
                and a natural layer of uncertainty. As a designer, my job was not
                to hide that complexity, but to translate it into an experience
                users could understand and trust.
              </p>
              <p>Every screen had to answer a simple question:</p>
              <p className="font-semibold text-neutral-900 italic text-[16.5px] sm:text-[17.5px] pl-3 border-l-2 border-neutral-800">
                &ldquo;What does the user need to know or do next?&rdquo;
              </p>
              <p>
                That mindset helped shape a product that feels less like a crypto
                exchange and more like a straightforward financial utility.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* ------------------------------------------------------------------ */}
      {/* BOTTOM CTA SECTION */}
      {/* ------------------------------------------------------------------ */}
      <section className="w-full bg-[#F8F8F8] border-t border-neutral-100">
        <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-20 py-16 sm:py-20">
          {/* Available Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF7EE] text-[#299B75] border border-[#299B754D] text-[14px] font-medium tracking-wide">
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
          <p className="mt-3 text-[14px] sm:text-[16.5px] text-[#00000080] font-normal">
            If this sounds like you, reach out🙂
          </p>

          {/* Email & Copy Button Row */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-6 pt-2">
            <a
              href="mailto:oluwatobiomosewa@gmail.com"
              className="inline-flex items-center gap-3.5 group cursor-pointer"
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center shrink-0 text-neutral-900 group-hover:scale-105 transition-transform">
                <Image
                  src="/images/direct-send.png"
                  alt="Outbox Tray"
                  width={44}
                  height={44}
                />
              </div>

              <span className="text-[20px] sm:text-[28px] md:text-[34px] font-bold text-neutral-900 tracking-tight group-hover:text-neutral-700 transition-colors break-all">
                oluwatobiomosewa@gmail.com
              </span>
            </a>

            {/* Copy Button */}
            <button
              onClick={handleCopyEmail}
              aria-label="Copy email address"
              className={`inline-flex items-center gap-2 px-4 py-1 rounded-[40px] border-2 bg-white text-black text-[20px] sm:text-[24px] font-medium hover:bg-neutral-50 active:scale-95 transition-all shadow-2xs cursor-pointer shrink-0 ${copiedEmail ? "border-emerald-600 text-emerald-700" : "border-black"
                }`}
            >
              {copiedEmail ? (
                <>
                  <svg
                    width="16"
                    height="16"
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
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Image
                    src="/images/copy.png"
                    alt="Copy"
                    width={16}
                    height={16}
                    className="size-6 object-contain"
                  />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FOOTER */}
      {/* ------------------------------------------------------------------ */}
      <footer className="w-full bg-white border-t border-neutral-100">
        <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-20 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-neutral-400">
          <p className="order-2 sm:order-1 text-center sm:text-left">
            © oluwafemi, 2026.
          </p>

          <button
            onClick={handleScrollToTop}
            className="order-1 sm:order-2 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F3F4F6] hover:bg-neutral-200 active:scale-95 text-neutral-700 font-medium transition cursor-pointer text-[12px]"
          >
            <span className="text-[13px]">↑</span>
            <span>Back to Top</span>
          </button>

          <p className="order-3 text-center sm:text-right">
            All rights reserved, all wrongs denied.
          </p>
        </div>
      </footer>

      {/* ------------------------------------------------------------------ */}
      {/* LIGHTBOX MODAL */}
      {/* ------------------------------------------------------------------ */}
      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200"
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxImage(null)}
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

          {/* Modal Image */}
          <div
            className="relative max-w-5xl max-h-[88vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={lightboxImage}
                alt="Case study mockup enlarged"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
