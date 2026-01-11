import { FermentationTimeline } from "@/components/roman/FermentationTimeline";
import { GlassmorphismNav } from "@/components/roman";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

/**
 * Story Page - The 72-Hour Fermentation Journey
 * 
 * A scrollytelling experience that reveals the transformation
 * of dough over time using GSAP ScrollTrigger animations.
 */

export const metadata: Metadata = {
  title: "Our Story | Roman Pizza Project",
  description:
    "Discover the 72-hour fermentation journey behind our authentic Roman pizza. Ancient grains, cold maturation, and the perfect crunch.",
};

export default function StoryPage() {
  return (
    <>
      <GlassmorphismNav />

      <main className="min-h-screen bg-[var(--background)]">
        {/* Hero Section */}
        <section
          className={cn(
            "relative min-h-[60vh] flex items-center justify-center",
            "overflow-hidden"
          )}
        >
          {/* Content */}
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-48 pb-24">
            <p
              className={cn(
                "font-mono text-xs tracking-[0.6em] uppercase",
                "text-[var(--roman-gold)] mb-8"
              )}
            >
              The Blueprint
            </p>

            <h1
              className={cn(
                "font-display text-5xl md:text-8xl italic",
                "text-[var(--foreground)] mb-8",
                "leading-tight"
              )}
            >
              Patience is the
              <br />
              <span className="text-[var(--roman-red)]">Master Architect</span>
            </h1>

            <p
              className={cn(
                "font-sans text-xl italic",
                "text-[var(--foreground)]/40",
                "max-w-2xl mx-auto leading-relaxed"
              )}
            >
              Seventy-two hours. A calculated wait where heritage grains 
              surrender to time, resulting in a structural masterpiece of light 
              and crunch.
            </p>
          </div>
        </section>

        {/* Fermentation Timeline */}
        <FermentationTimeline />

        {/* Philosophy Section */}
        <section className="py-48 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-24">
              {/* Roman Tradition */}
              <div className="glass-panel p-12">
                <h3
                  className={cn(
                    "font-display text-3xl italic",
                    "text-[var(--foreground)] mb-8"
                  )}
                >
                  Roman Authority
                </h3>
                <p
                  className={cn(
                    "font-sans text-base leading-relaxed italic",
                    "text-[var(--foreground)]/50 mb-6"
                  )}
                >
                  Pizza al taglio—pizza by the cut—is a Roman institution 
                  defined by geometry and geometry. Baked in rectangular trays 
                  (teglie) and hand-cut with artisanal precision.
                </p>
                <p
                  className={cn(
                    "font-sans text-base leading-relaxed italic",
                    "text-[var(--foreground)]/50"
                  )}
                >
                  Our technique honors the original &ldquo;teglia&rdquo; method, utilizing 
                  80% hydration heritage grains to ensure every slice is 
                  monumental in texture but light as air.
                </p>
              </div>

              {/* The Project Aspect */}
              <div className="flex flex-col justify-center">
                <h3 className="font-mono text-xs uppercase tracking-[0.4em] text-[var(--roman-red)] mb-8">
                  The Engineering
                </h3>
                <div className="space-y-12">
                   <div>
                      <span className="font-display text-6xl italic text-[var(--foreground)] block mb-2">LXXX%</span>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--foreground)]/20">Hydration Ratio</span>
                   </div>
                   <div>
                      <span className="font-display text-6xl italic text-[var(--foreground)] block mb-2">LXXIIh</span>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--foreground)]/20">Maturity Window</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[var(--roman-tan)]/10 py-24 px-6 bg-[var(--background)] relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
            <div>
              <p className="font-display text-2xl italic text-[var(--foreground)] mb-2">
                Roman Pizza Project
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--foreground)]/30">
                © MMXXVI Roman Pizza Project • Edinburgh
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
