"use client";

import React from "react";
import Link from "next/link";

interface LogoProps {
  variant?: "full" | "icon";
  size?: "sm" | "md" | "lg";
  className?: string;
  href?: string;
}

export function Logo({
  variant = "full",
  size = "md",
  className = "",
  href = "/",
}: LogoProps) {
  const iconDimensions = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-11 h-11",
  }[size];

  const textSize = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-2xl",
  }[size];

  const subSize = {
    sm: "text-[9px]",
    md: "text-[10px]",
    lg: "text-xs",
  }[size];

  const content = (
    <div className={`flex items-center gap-2.5 group select-none ${className}`}>
      {/* Monogram Crest with Canadian Maple Silhouette */}
      <div
        className={`relative ${iconDimensions} rounded-xl bg-gradient-to-br from-blue-700 via-blue-900 to-zinc-950 p-[1.5px] shadow-sm shadow-blue-900/30 transition-transform duration-200 group-hover:scale-105`}
      >
        <div className="w-full h-full rounded-[10px] bg-zinc-950 flex items-center justify-center relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-red-500/20" />

          {/* SVG Monogram: LF with Maple Leaf Crest */}
          <svg
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 relative z-10"
          >
            {/* Academic L */}
            <path
              d="M10 9V26H21"
              stroke="#60A5FA"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Academic F */}
            <path
              d="M17 12H27M17 19H24"
              stroke="#F8FAFC"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Canadian Maple Leaf Accent Dot */}
            <path
              d="M26 18.5C26 18.5 27 16 29 16C29 17.5 28 19 28 19C28.5 19.5 30 19.5 30.5 20.5C29.5 21 28 20.5 27.5 21C27.5 21.5 28 23 27 23.5C26.5 22.5 26.5 21 26 20.5L25 22.5L24.5 20L23.5 21C23.5 19.5 25 19 26 18.5Z"
              fill="#E11D48"
            />
          </svg>
        </div>
      </div>

      {/* Brand Typography */}
      {variant === "full" && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-serif font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 ${textSize}`}
            >
              LF <span className="text-blue-600 dark:text-blue-400 font-sans font-bold">Academy</span>
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/60">
              CA
            </span>
          </div>
          <span
            className={`font-mono text-zinc-500 dark:text-zinc-400 tracking-wider uppercase font-semibold ${subSize}`}
          >
            Learn French · TCF & TEF
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
