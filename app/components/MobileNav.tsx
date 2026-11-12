"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileNav() {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isProjects = pathname?.startsWith("/projects");
  const isAbout = pathname?.startsWith("/about");

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 md:hidden bg-[#F7F7F7] rounded-[100px] p-1.5 flex items-center gap-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-[#EBEBEB] backdrop-blur-sm select-none"
    >
      {/* 1. Home Tab */}
      <Link
        href="/"
        aria-label="Home"
        className={`size-11 sm:size-12 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
          isHome
            ? "bg-black text-white shadow-xs"
            : "bg-white text-[#919191] hover:text-black shadow-2xs"
        }`}
      >
        {isHome ? (
          <svg
            width="18"
            height="17"
            viewBox="0 0 16 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-colors"
          >
            <path
              d="M13.5375 3.61331L9.2175 0.590805C8.04 -0.234195 6.2325 -0.189195 5.1 0.688305L1.3425 3.62081C0.5925 4.20581 0 5.40581 0 6.35081V11.5258C0 13.4383 1.5525 14.9983 3.465 14.9983H11.55C13.4625 14.9983 15.015 13.4458 15.015 11.5333V6.44831C15.015 5.43581 14.3625 4.19081 13.5375 3.61331ZM8.07 11.9983C8.07 12.3058 7.815 12.5608 7.5075 12.5608C7.2 12.5608 6.945 12.3058 6.945 11.9983V9.74831C6.945 9.44081 7.2 9.18581 7.5075 9.18581C7.815 9.18581 8.07 9.44081 8.07 9.74831V11.9983Z"
              fill="currentColor"
            />
          </svg>
        ) : (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-colors"
          >
            <path
              d="M9.02 2.84L3.63 7.04C2.73 7.74 2 9.23 2 10.36V17.77C2 20.09 3.89 21.99 6.21 21.99H17.79C20.11 21.99 22 20.09 22 17.78V10.5C22 9.29 21.19 7.74 20.2 7.05L14.02 2.72C12.62 1.74 10.37 1.79 9.02 2.84Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 17.99V14.99"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </Link>

      {/* 2. Category / Projects Tab */}
      <Link
        href="/projects"
        aria-label="Projects"
        className={`size-11 sm:size-12 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
          isProjects
            ? "bg-black text-white shadow-xs"
            : "bg-white text-[#919191] hover:text-black shadow-2xs"
        }`}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-colors"
        >
          <rect
            x="0.5"
            y="0.5"
            width="6.38"
            height="6.38"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <rect
            x="0.5"
            y="9.12"
            width="6.38"
            height="6.38"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <rect
            x="9.12"
            y="0.5"
            width="6.38"
            height="6.38"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <rect
            x="9.12"
            y="9.12"
            width="6.38"
            height="6.38"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      </Link>

      {/* 3. Mail / Contact Tab */}
      <a
        href="mailto:oluwatobiomosewa@gmail.com"
        aria-label="Send email to oluwatobiomosewa@gmail.com"
        className="size-11 sm:size-12 rounded-full flex items-center justify-center transition-all duration-200 bg-white text-[#919191] hover:text-black shadow-2xs cursor-pointer"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-colors"
        >
          <path
            d="M11.3333 13.6666H4.66659C2.66659 13.6666 1.33325 12.6666 1.33325 10.3333V5.66665C1.33325 3.33331 2.66659 2.33331 4.66659 2.33331H11.3333C13.3333 2.33331 14.6666 3.33331 14.6666 5.66665V10.3333C14.6666 12.6666 13.3333 13.6666 11.3333 13.6666Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.3334 6L9.24674 7.66667C8.56008 8.21333 7.43341 8.21333 6.74674 7.66667L4.66675 6"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>

      {/* 4. Profile / About Tab */}
      <Link
        href="/about"
        aria-label="About"
        className={`size-11 sm:size-12 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
          isAbout
            ? "bg-black text-white shadow-xs"
            : "bg-white text-[#919191] hover:text-black shadow-2xs"
        }`}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-colors"
        >
          <path
            d="M11.3332 4.66665C11.3332 6.5076 9.84079 7.99998 7.99984 7.99998C6.15889 7.99998 4.6665 6.5076 4.6665 4.66665C4.6665 2.8257 6.15889 1.33331 7.99984 1.33331C9.84079 1.33331 11.3332 2.8257 11.3332 4.66665Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.7268 14.6667C13.7268 12.0867 11.1601 10 8.0001 10C4.8401 10 2.27344 12.0867 2.27344 14.6667"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </nav>
  );
}

