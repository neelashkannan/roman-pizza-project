"use client";

import React from "react";
import { cn } from "@/lib/utils";

const steps = [
  { time: "0h", title: "Mixing", desc: "Heritage flour, water, salt, natural yeast" },
  { time: "24h", title: "First Rise", desc: "Slow fermentation begins" },
  { time: "48h", title: "Folding", desc: "Gentle stretching for structure" },
  { time: "72h", title: "Ready", desc: "Perfect dough, full flavor" },
];

export function FermentationTimeline() {
  return (
    <section className="section bg-neutral-50">
      <div className="container-wide">
        <div className="text-center mb-16">
          <p className="text-overline text-primary mb-4">The Process</p>
          <h2 className="text-headline font-serif">72 Hours of Patience</h2>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-neutral-200 -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={step.time} className="relative text-center">
                {/* Dot */}
                <div className={cn(
                  "w-12 h-12 mx-auto mb-6 rounded-full flex items-center justify-center",
                  "border-2 border-primary bg-white relative z-10"
                )}>
                  <span className="text-sm font-medium text-primary">{step.time}</span>
                </div>
                
                <h3 className="text-title mb-2">{step.title}</h3>
                <p className="text-caption">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
