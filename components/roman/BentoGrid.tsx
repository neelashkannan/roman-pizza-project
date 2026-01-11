"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

interface BentoCellProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: 1 | 2;
  rowSpan?: 1 | 2;
  variant?: "default" | "hero" | "action" | "live" | "context";
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200", className)}>
      {children}
    </div>
  );
}

export function BentoCell({ children, className, colSpan = 1, rowSpan = 1, variant = "default" }: BentoCellProps) {
  const variants = {
    default: "bg-white",
    hero: "bg-neutral-50",
    action: "bg-primary text-white",
    live: "bg-foreground text-white",
    context: "bg-neutral-100",
  };

  return (
    <div
      className={cn(
        variants[variant],
        "p-8",
        colSpan === 2 && "md:col-span-2",
        rowSpan === 2 && "md:row-span-2",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn("text-title mb-2", className)}>{children}</h3>;
}

export function BentoDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-caption", className)}>{children}</p>;
}
