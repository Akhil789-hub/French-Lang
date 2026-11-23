"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  Sparkles,
  LayoutDashboard,
  BookmarkCheck,
  Menu,
  X,
  Target,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Logo } from "@/components/brand/Logo";
import { getCandidateProfile, CandidateProfile } from "@/lib/personalization";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profile, setProfile] = useState<CandidateProfile | null>(null);

  useEffect(() => {
    const p = getCandidateProfile();
    setProfile(p);
  }, [pathname]);

  const navLinks = [
    { href: "/dashboard", label: "Tableau de Bord", icon: LayoutDashboard },
    { href: "/dashboard/listening", label: "Compréhension Orale", icon: Headphones },
    { href: "/dashboard/reading", label: "Compréhension Écrite", icon: BookOpen },
    { href: "/dashboard/writing", label: "Expression Écrite", icon: PenTool },
    { href: "/dashboard/speaking", label: "Expression Orale", icon: Mic },
    { href: "/dashboard/unique-listening", label: "Questions Uniques", icon: Sparkles },
    { href: "/dashboard/mistakes", label: "Mon Carnet", icon: BookmarkCheck },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-[#080E1A]/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LF Academy Logo */}
          <Logo href="/" size="md" />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive =
                pathname === link.href ||
                (link.href !== "/dashboard" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-900"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/60"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Action: Candidate Target Pill & CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {profile?.targetNclc && (
              <Link
                href="/dashboard"
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900"
              >
                <Target className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Objectif NCLC {profile.targetNclc} (+50 CRS)</span>
              </Link>
            )}

            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-600/20 transition-all active:scale-95"
            >
              Espace Candidat
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#080E1A] px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              pathname === link.href ||
              (link.href !== "/dashboard" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                  isActive
                    ? "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
