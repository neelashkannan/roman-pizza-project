"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  return (
    <section className={cn("relative min-h-screen flex items-center", className)}>
      {/* Flag Bar Top */}
      <div className="absolute top-0 left-0 right-0 flag-bar">
        <span /><span /><span />
      </div>

      <div className="container-wide w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-32 pb-20">
          {/* Left: Content */}
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-overline text-primary">Edinburgh • Est. 2019</p>
            </div>
            
            <h1 className="text-display font-serif">
              Roman<br />
              <span className="italic">Pizza</span>
            </h1>
            
            <p className="text-body text-neutral-600 max-w-md">
              Authentic pizza al taglio, hand-cut to order. 72-hour fermented dough 
              crafted with heritage grains and genuine Roman tradition.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="#menu" className="btn-primary">View Menu</Link>
              <Link href="#locations" className="btn-outline">Find Us</Link>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative aspect-[4/5] lg:aspect-square">
            <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 mx-auto border border-neutral-200 rounded-full flex items-center justify-center">
                  <span className="text-4xl">🍕</span>
                </div>
                <p className="text-overline text-neutral-400">Al Taglio</p>
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-primary/20" />
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/5" />
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 border-t border-neutral-200 pt-8">
          {[
            { value: "72", unit: "Hours", label: "Fermentation" },
            { value: "80", unit: "%", label: "Hydration" },
            { value: "5.0", unit: "★", label: "Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center py-6">
              <p className="text-headline font-serif">
                {stat.value}<span className="text-primary text-lg ml-1">{stat.unit}</span>
              </p>
              <p className="text-caption mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
