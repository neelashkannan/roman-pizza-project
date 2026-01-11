"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface PizzaCardProps {
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  imageAlt?: string;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isSpicy?: boolean;
  isNew?: boolean;
  isAvailable?: boolean;
  className?: string;
}

export function PizzaCard({
  name,
  description,
  price,
  isVegetarian = false,
  isVegan = false,
  isSpicy = false,
  isNew = false,
  isAvailable = true,
  className,
}: PizzaCardProps) {
  return (
    <article className={cn("card group", !isAvailable && "opacity-50", className)}>
      {/* Image Area */}
      <div className="aspect-[4/3] bg-neutral-100 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl group-hover:scale-110 transition-transform duration-500">🍕</span>
        </div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {isNew && <span className="badge badge-green">New</span>}
          {isSpicy && <span className="badge badge-red">Spicy</span>}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-title">{name}</h3>
          <span className="text-lg font-medium text-primary">£{price.toFixed(2)}</span>
        </div>
        
        <p className="text-caption leading-relaxed">{description}</p>
        
        {/* Tags */}
        <div className="flex gap-2 pt-2">
          {isVegan && <span className="badge badge-green">Vegan</span>}
          {isVegetarian && !isVegan && <span className="badge badge-green">Vegetarian</span>}
        </div>
      </div>
    </article>
  );
}
