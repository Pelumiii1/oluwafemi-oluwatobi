"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface PageLoaderProps {
  onComplete?: () => void;
}

export function PageLoader({ onComplete }: PageLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [foldProgress, setFoldProgress] = useState<number | null>(null);
  const [isDone, setIsDone] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const foldStartRef = useRef<number | null>(null);

  // Phase 1: Writing and Progress Counter (0% to 100%)
  useEffect(() => {
    const totalDuration = 2200;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const t = Math.min(1, elapsed / totalDuration);

      // Ease out cubic for natural loading progression
      const easeProgress = 1 - Math.pow(1 - t, 3);
      const currentPct = Math.min(100, Math.floor(easeProgress * 100));
      setProgress(currentPct);

      if (t < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Hold briefly at 100% for aesthetic satisfaction, then start the corner fold
        setTimeout(() => {
          setFoldProgress(0);
        }, 220);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Phase 2: Diagonal Page Fold from bottom-right corner to top-left corner
  useEffect(() => {
    if (foldProgress === null) return;

    // Total fold animation duration ~1100ms
    const foldDuration = 1100;
    let animationFrameId: number;

    const animateFold = (timestamp: number) => {
      if (!foldStartRef.current) foldStartRef.current = timestamp;
      const elapsed = timestamp - foldStartRef.current;
      const t = Math.min(1, elapsed / foldDuration);

      // Smooth cubic-bezier(0.4, 0, 0.2, 1) approximation
      const ease =
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      setFoldProgress(ease);

      if (t < 1) {
        animationFrameId = requestAnimationFrame(animateFold);
      } else {
        onComplete?.();
        // Unmount loader completely after fold clears
        setTimeout(() => {
          setIsDone(true);
        }, 80);
      }
    };

    animationFrameId = requestAnimationFrame(animateFold);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [foldProgress, onComplete]);

  if (isDone) return null;

  // Name writing progress: begins at 10% progress and finishes at 92% progress
  const writeProgress = Math.min(
    100,
    Math.max(0, Math.round(((progress - 10) / 82) * 100))
  );

  // Compute the diagonal fold geometry:
  // D ranges from 0 to 2 as fold travels from (100%, 100%) to (0%, 0%)
  const isFolding = foldProgress !== null;
  const D = isFolding ? foldProgress * 2.05 : 0;

  // Calculate polygon clip-path for the remaining front page
  let frontPageClip = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
  let flapClip: string | null = null;
  let flapOpacity = 1;
  let creaseLine = { x1: 100, y1: 100, x2: 100, y2: 100, angle: 135 };

  if (isFolding && D > 0) {
    if (D <= 1) {
      const rx = 100;
      const ry = (1 - D) * 100;
      const bx = (1 - D) * 100;
      const by = 100;
      const tipX = (1 - D) * 100;
      const tipY = (1 - D) * 100;

      // Remaining front page (clipped from bottom-right)
      frontPageClip = `polygon(0% 0%, 100% 0%, ${rx}% ${ry}%, ${bx}% ${by}%, 0% 100%)`;

      // Folded flap (curling up & left from bottom-right)
      flapClip = `polygon(${rx}% ${ry}%, ${bx}% ${by}%, ${tipX}% ${tipY}%)`;
      creaseLine = { x1: rx, y1: ry, x2: bx, y2: by, angle: 135 };
    } else {
      const d2 = D - 1;
      const tx = (1 - d2) * 100;
      const ty = 0;
      const lx = 0;
      const ly = (1 - d2) * 100;
      const offX = -20;
      const offY = -20;

      // Remaining front page (shrinking into top-left corner)
      frontPageClip = `polygon(0% 0%, ${tx}% ${ty}%, ${lx}% ${ly}%)`;

      // Folded flap sweeping past top-left corner
      flapClip = `polygon(${tx}% ${ty}%, ${lx}% ${ly}%, ${offX}% ${offY}%)`;
      creaseLine = { x1: tx, y1: ty, x2: lx, y2: ly, angle: 135 };

      // Fade out flap gracefully as it clears the screen
      flapOpacity = Math.max(0, 1 - (D - 1.4) / 0.65);
    }
  }

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden ${isFolding ? "pointer-events-none" : "pointer-events-auto"
        }`}
      aria-hidden={isFolding}
    >
      {/* FRONT PAGE SHEET: Displays avatar, signature, counter, and watermark */}
      <div
        className="relative w-full h-full bg-white flex flex-col items-center justify-center select-none"
        style={{
          clipPath: frontPageClip,
          WebkitClipPath: frontPageClip,
          transition: "none",
        }}
      >
        {/* Subtle repeating watermark pattern of design system icons */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: "url(/images/svgs.png)",
            backgroundRepeat: "repeat",
            backgroundSize: "320px auto",
          }}
        />

        {/* Center Content: Avatar + Signature */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 -translate-y-2">
          {/* Avatar Container with gentle scale-in */}
          <div
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-[18px] overflow-hidden bg-neutral-100 border border-neutral-200/90 shadow-2xs mb-3.5 transition-all duration-700 ease-out"
            style={{
              opacity: Math.min(1, progress / 15),
              transform: `scale(${0.9 + Math.min(1, progress / 15) * 0.1})`,
            }}
          >
            <Image
              src="/images/femi.png"
              alt="Oluwatobi Oluwafemi"
              width={64}
              height={64}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          {/* Signature with Writing Effect */}
          <div className="relative inline-block mt-2 min-h-[44px] flex items-center justify-center">
            <div
              className="relative overflow-hidden flex items-center justify-center px-2 py-1"
              style={{
                clipPath: `inset(0 ${Math.max(0, 100 - writeProgress)}% 0 0)`,
                transition: "clip-path 50ms linear",
              }}
            >
              <span className="font-signature text-[30px] sm:text-[36px] text-[#111827] whitespace-nowrap tracking-normal leading-none select-none">
                Oluwatobi Oluwafemi
              </span>
            </div>

            {/* Active Pen Nib / Ink Point trailing the writing edge */}
            {/* {writeProgress > 0 && writeProgress < 100 && (
              <div
                className="absolute top-1/2 pointer-events-none"
                style={{
                  left: `${writeProgress}%`,
                  transform: `translate(-50%, calc(-50% + ${
                    Math.sin(writeProgress * 0.45) * 5
                  }px))`,
                  transition: "left 50ms linear, transform 50ms linear",
                }}
              >
                <div className="relative">
                  <span className="block size-1.5 rounded-full bg-neutral-900 shadow-[0_0_6px_rgba(0,0,0,0.5)]" />
                  <span className="absolute -inset-1 rounded-full bg-neutral-900/20 animate-ping" />
                </div>
              </div>
            )} */}
          </div>
        </div>

        {/* Counter at the bottom */}
        <div className="absolute bottom-10 sm:bottom-12 left-1/2 -translate-x-1/2 text-center select-none z-10">
          <span className="text-[13px] sm:text-[14px] font-medium text-neutral-900 font-sans tracking-tight">
            {progress}%
          </span>
        </div>
      </div>

      {/* FOLDED FLAP (The paper underside curling back from bottom-right towards top-left) */}
      {isFolding && flapClip && flapOpacity > 0 && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            clipPath: flapClip,
            WebkitClipPath: flapClip,
            opacity: flapOpacity,
            // Realistic tactile underside paper texture & shadow
            background:
              "linear-gradient(135deg, #f7f7f8 0%, #ebebef 40%, #d8d8de 85%, #b5b5be 100%)",
            filter: "drop-shadow(-15px -15px 28px rgba(0, 0, 0, 0.28))",
          }}
        >
          {/* Subtle paper grain & sheen highlight on the fold */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 60%, rgba(0,0,0,0.15) 100%)",
            }}
          />
        </div>
      )}

      {/* CREASE SHADOW OVERLAY: Adds 3D cylinder depth along the fold line */}
      {isFolding && D > 0.02 && D < 1.95 && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ opacity: flapOpacity }}
        >
          <line
            x1={`${creaseLine.x1}%`}
            y1={`${creaseLine.y1}%`}
            x2={`${creaseLine.x2}%`}
            y2={`${creaseLine.y2}%`}
            stroke="rgba(0, 0, 0, 0.18)"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="blur(1px)"
          />
          <line
            x1={`${creaseLine.x1}%`}
            y1={`${creaseLine.y1}%`}
            x2={`${creaseLine.x2}%`}
            y2={`${creaseLine.y2}%`}
            stroke="rgba(255, 255, 255, 0.55)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )}
    </div>
  );
}
