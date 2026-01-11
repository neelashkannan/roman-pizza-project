import { cn } from "@/lib/utils";
import { GlassmorphismNav } from "@/components/roman";
import { MapPin, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

/**
 * Locations Page - Find Us
 * 
 * Map integration, opening hours, and contact details.
 * Uses monospace font for data-display aesthetic.
 */

export const metadata: Metadata = {
  title: "Find Us | Roman Pizza Project",
  description:
    "Visit Roman Pizza Project in Edinburgh. View our location, opening hours, and contact details. Authentic Roman pizza al taglio.",
};

const openingHours = [
  { day: "Monday", hours: "11:00 - 22:00" },
  { day: "Tuesday", hours: "11:00 - 22:00" },
  { day: "Wednesday", hours: "11:00 - 22:00" },
  { day: "Thursday", hours: "11:00 - 22:00" },
  { day: "Friday", hours: "11:00 - 23:00" },
  { day: "Saturday", hours: "10:00 - 23:00" },
  { day: "Sunday", hours: "10:00 - 22:00" },
];

export default function LocationsPage() {
  // Get current day to highlight
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <>
      <GlassmorphismNav />

      <main className="min-h-screen bg-[var(--background)] pt-32 pb-16">
        {/* Header */}
        <div className="text-center px-6 mb-24">
          <p
            className={cn(
              "font-mono text-xs tracking-[0.6em] uppercase",
              "text-[var(--roman-gold)] mb-8"
            )}
          >
            Tactile Presence
          </p>
          <h1
            className={cn(
              "font-display text-5xl md:text-8xl italic",
              "text-[var(--foreground)] mb-8"
            )}
          >
             Stations
          </h1>
          <p
            className={cn(
              "font-sans text-xl italic max-w-2xl mx-auto",
              "text-[var(--foreground)]/40"
            )}
          >
            Edinburgh Central. The nexus of Roman tradition and Scottish heritage. 
            Fresh trays pulled from the oven daily.
          </p>
        </div>

        {/* Content Bento Grid */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:min-h-[800px]">
          {/* Map Section - The Matrix */}
          <div className="md:col-span-2 md:row-span-2 glass-panel border-[var(--roman-tan)]/10 relative overflow-hidden flex flex-col min-h-[400px]">
            <div className="absolute inset-0 bg-[var(--foreground)]/[0.02] mix-blend-overlay pointer-events-none" />
            <div className="flex-grow flex items-center justify-center p-12">
               <div className="text-center">
                  <MapPin className="w-16 h-16 text-[var(--roman-red)] mx-auto mb-8 opacity-50" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--foreground)]/20 mb-8">
                    Coordinates: 55.9533° N, 3.1883° W
                  </p>
                  <a
                  href="https://maps.google.com/?q=123+Rose+Street+Edinburgh+EH2+3DT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "px-10 py-4 bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 text-[var(--foreground)] font-display italic text-sm",
                    "hover:bg-[var(--roman-red)] hover:border-[var(--roman-red)] hover:text-white transition-all duration-500",
                    "inline-flex items-center gap-4"
                  )}
                >
                  Initiate Navigation
                  <ExternalLink className="w-4 h-4" />
                </a>
               </div>
            </div>
          </div>

          {/* Address - The Anchor */}
          <div className="md:col-span-2 glass-panel border-[var(--roman-tan)]/10 p-12 flex flex-col justify-end">
             <h2 className="font-display text-3xl italic text-[var(--foreground)] mb-6">Edinburgh One</h2>
             <address className="font-sans text-xl italic text-[var(--foreground)]/40 not-italic leading-relaxed">
               123 Rose Street<br />
               Edinburgh, EH2 3DT<br />
               Scotland, UK
             </address>
          </div>

          {/* Hours - The Timeline */}
          <div className="md:col-span-1 glass-panel border-[var(--roman-tan)]/10 p-8">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--roman-red)] mb-8">
              Operating Hours
            </h3>
            <div className="space-y-4">
              {openingHours.map((item) => (
                <div key={item.day} className="flex justify-between items-baseline border-b border-[var(--foreground)]/5 pb-2">
                  <span className={cn(
                    "font-display text-sm italic",
                    item.day === today ? "text-[var(--roman-red)]" : "text-[var(--foreground)]/40"
                  )}>
                    {item.day}
                  </span>
                  <span className="font-mono text-[10px] text-[var(--foreground)]/20">
                    {item.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact - The Signal */}
          <div className="md:col-span-1 glass-panel border-[var(--roman-tan)]/10 p-8 flex flex-col justify-between">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--roman-red)] mb-8">
              Digital Signal
            </h3>
            <div className="space-y-6">
              <a href="tel:+441315550000" className="group block">
                <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--foreground)]/20 mb-1">Voice</p>
                <p className="font-display text-lg italic text-[var(--foreground)] group-hover:text-[var(--roman-red)] transition-colors">+44 131 555 0000</p>
              </a>
              <a href="mailto:hello@romanpizzaproject.com" className="group block">
                <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--foreground)]/20 mb-1">Email</p>
                <p className="font-display text-lg italic text-[var(--foreground)] group-hover:text-[var(--roman-red)] transition-colors">hello@rpp.com</p>
              </a>
            </div>
          </div>
        </div>

        {/* Transit Mode Section */}
        <section className="px-6 mt-32 max-w-7xl mx-auto">
           <h2 className="font-mono text-[10px] uppercase tracking-[0.6em] text-[var(--foreground)]/10 mb-12 text-center">
             Transit Calibration
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { title: "By Tram", desc: "Princes Street stop, 2 min walk" },
                { title: "By Bus", desc: "Routes 10, 11, 16, 24, 34" },
                { title: "By Car", desc: "Castle Terrace car park nearby" }
              ].map((item) => (
                <div key={item.title} className="text-center group">
                   <p className="font-display text-xl italic text-[var(--foreground)]/40 group-hover:text-[var(--foreground)] transition-colors mb-4">
                     {item.title}
                   </p>
                   <p className="font-sans text-sm italic text-[var(--foreground)]/20">
                     {item.desc}
                   </p>
                </div>
              ))}
           </div>
        </section>

        {/* Footer Link */}
        <div className="text-center px-6 mt-32">
           <p className="font-mono text-[10px] uppercase tracking-[0.6em] text-[var(--foreground)]/10 mb-8">
             Private Trays Available for Booking
           </p>
           <div className="h-[1px] w-12 bg-[var(--foreground)]/10 mx-auto" />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-24 px-6 bg-[var(--background)] border-t border-[var(--roman-tan)]/10 relative z-10">
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
    </>
  );
}
