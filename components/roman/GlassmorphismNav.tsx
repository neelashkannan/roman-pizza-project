"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#menu", label: "Menu" },
  { href: "#story", label: "Story" },
  { href: "#locations", label: "Visit" },
];

export function GlassmorphismNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled ? "bg-white/95 backdrop-blur-sm border-b border-neutral-200" : "bg-transparent"
        )}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary flex items-center justify-center">
                <span className="text-white text-sm font-semibold">R</span>
              </div>
              <span className="text-sm font-medium tracking-wide uppercase">Roman Pizza</span>
            </Link>

            <ul className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="nav-link">{link.label}</Link>
                </li>
              ))}
            </ul>

            <div className="hidden md:flex items-center gap-6">
              <a href="tel:01312293687" className="text-xs font-medium text-neutral-500 hover:text-foreground transition-colors">
                0131 229 3687
              </a>
              <Link href="#locations" className="btn-primary text-xs py-3 px-6">Find Us</Link>
            </div>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            >
              <span className={cn("w-5 h-px bg-foreground transition-all", isMobileOpen && "rotate-45 translate-y-2")} />
              <span className={cn("w-5 h-px bg-foreground transition-all", isMobileOpen && "opacity-0")} />
              <span className={cn("w-5 h-px bg-foreground transition-all", isMobileOpen && "-rotate-45 -translate-y-2")} />
            </button>
          </div>
        </div>
      </nav>

      <div className={cn(
        "fixed inset-0 z-40 bg-white transition-all duration-500 md:hidden",
        isMobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
      )}>
        <div className="pt-24 px-8">
          <nav className="space-y-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsMobileOpen(false)} className="block py-4 border-b border-neutral-100">
                <span className="text-2xl font-serif">{link.label}</span>
              </Link>
            ))}
          </nav>
          <div className="mt-12 space-y-4">
            <p className="text-caption">Contact</p>
            <a href="tel:01312293687" className="block text-xl font-light">0131 229 3687</a>
            <p className="text-sm text-neutral-400">10 West Maitland Street, Edinburgh EH12 5DS</p>
          </div>
        </div>
      </div>
    </>
  );
}
