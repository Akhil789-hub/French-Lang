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
  Clock,
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
    { href: "/dashboard", label: "Dashboard", fullLabel: "Tableau de Bord", icon: LayoutDashboard },
    { href: "/dashboard/listening", label: "Écoute", fullLabel: "Compréhension Orale (40 tests)", icon: Headphones },
    { href: "/dashboard/reading", label: "Lecture", fullLabel: "Compréhension Écrite (40 tests)", icon: BookOpen },
    { href: "/dashboard/writing", label: "Écriture", fullLabel: "Expression Écrite (113 sujets)", icon: PenTool },
    { href: "/dashboard/speaking", label: "Oral", fullLabel: "Expression Orale (Situations T2 & T3)", icon: Mic },
    { href: "/dashboard/guidelines", label: "Guide TCF", fullLabel: "Règles & Format Officiel (2h47)", icon: Clock },
    { href: "/dashboard/unique-listening", label: "Banque A1-C2", fullLabel: "Questions Dédupliquées", icon: Sparkles },
    { href: "/dashboard/mistakes", label: "Carnet", fullLabel: "Mon Carnet d'Erreurs", icon: BookmarkCheck },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/95 dark:bg-[#080E1A]/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* LF Academy Logo */}
          <div className="shrink-0">
            <Logo href="/" size="md" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-1.5 shrink min-w-0">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive =
                pathname === link.href ||
                (link.href !== "/dashboard" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900 shadow-sm"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/60"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="whitespace-nowrap">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Action: Candidate Target Pill & CTA */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {profile?.targetNclc && (
              <Link
                href="/dashboard"
                className="hidden 2xl:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900 whitespace-nowrap"
              >
                <Target className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>Objectif NCLC {profile.targetNclc} (+50 CRS)</span>
              </Link>
            )}

            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-600/20 transition-all active:scale-95 whitespace-nowrap"
            >
              Espace Candidat
            </Link>

            {/* Mobile menu toggle */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-[#080E1A]/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-1.5 animate-in slide-in-from-top-2 duration-200 shadow-xl">
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
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                  isActive
                    ? "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900"
                    : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>{link.fullLabel}</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 font-normal">
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
