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
    sm: "w-8 h-8",
    md: "w-9 h-9",
    lg: "w-11 h-11",
  }[size];

  const titleSize = {
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
    <div className={`flex items-center gap-2.5 group select-none shrink-0 ${className}`}>
      {/* Monogram Crest with Canadian Maple Silhouette */}
      <div
        className={`relative ${iconDimensions} shrink-0 rounded-xl bg-gradient-to-br from-blue-600 via-blue-800 to-zinc-950 p-[1.5px] shadow-sm shadow-blue-900/30 transition-transform duration-200 group-hover:scale-105`}
      >
        <div className="w-full h-full rounded-[10px] bg-[#080E1A] flex items-center justify-center relative overflow-hidden">
          {/* Subtle gradient light */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-transparent to-rose-500/20" />

          {/* SVG Monogram: LF with Maple Leaf Crest */}
          <svg
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 relative z-10"
          >
            {/* L */}
            <path
              d="M10 10V26H20"
              stroke="#60A5FA"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* F */}
            <path
              d="M17 13H27M17 19H24"
              stroke="#F8FAFC"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Maple Leaf Accent */}
            <circle cx="27" cy="19" r="2" fill="#E11D48" />
          </svg>
        </div>
      </div>

      {/* Brand Typography */}
      {variant === "full" && (
        <div className="flex flex-col justify-center leading-none whitespace-nowrap py-0.5">
          <div className="flex items-center gap-1.5 pb-0.5">
            <span
              className={`font-serif font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 ${titleSize} leading-none`}
            >
              LF <span className="text-blue-600 dark:text-blue-400 font-sans font-bold">Academy</span>
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900/60 leading-none">
              CA
            </span>
          </div>
          <span
            className={`font-mono text-zinc-500 dark:text-zinc-400 tracking-wider uppercase font-semibold ${subSize} leading-none`}
          >
            Learn French · TCF & TEF
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="shrink-0 flex items-center">
        {content}
      </Link>
    );
  }

  return content;
}
