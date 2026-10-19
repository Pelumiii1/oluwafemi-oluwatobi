import React from "react";
import Image from "next/image";
import { ChatBubbleIcon } from "./Icons";

interface NavbarProps {
  onBookCall: () => void;
  onAboutMe: () => void;
}

export function Navbar({ onBookCall, onAboutMe }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#F0F0F0]">
      <div className="w-full px-6 sm:px-10 lg:px-14 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Header Greeting & Subtitle */}
        <div className="flex-1">
          <div className="flex items-center gap-1.5 text-[14px] sm:text-[15px] font-semibold text-neutral-900">
            <span>Hey,</span>
            <span className="inline-flex items-center justify-center w-4.5 h-4.5 rounded-sm overflow-hidden bg-neutral-200 border border-neutral-300/70 shadow-2xs">
              <Image
                src="/images/femi.png"
                alt="Femi avatar"
                width={18}
                height={18}
                className="w-full h-full object-cover"
              />
            </span>
            <span>Femi’s here!</span>
          </div>
          <p className="text-[11.5px] sm:text-[12px] text-neutral-500 mt-0.5 leading-snug">
            A{" "}
            <strong className="font-semibold text-neutral-900">
              Product Designer
            </strong>
            , focused on building scalable, structured, and easy-to-use
            products.
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto">
          <button
            onClick={onBookCall}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-neutral-200/90 bg-white hover:bg-neutral-50 active:scale-[0.98] transition-all text-[11.5px] sm:text-[12px] font-medium text-neutral-800 shadow-2xs cursor-pointer"
          >
            <span>Book 15 Minutes call</span>
            <ChatBubbleIcon className="w-3.5 h-3.5 text-neutral-600" />
          </button>
          <button
            onClick={onAboutMe}
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg bg-black hover:bg-neutral-800 active:scale-[0.98] transition-all text-[11.5px] sm:text-[12px] font-medium text-white shadow-2xs cursor-pointer"
          >
            About Me
          </button>
        </div>
      </div>
    </header>
  );
}
