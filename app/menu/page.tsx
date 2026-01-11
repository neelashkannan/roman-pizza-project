"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { GlassmorphismNav, PizzaCard, PizzaCardProps } from "@/components/roman";
import { Flame, Leaf, X } from "lucide-react";

/**
 * Menu Page - Al Taglio Visualizer
 * 
 * Displays the full pizza menu with elegant toggle filters.
 * Non-matching items dim to 20% opacity for a refined filtering experience.
 */

// Sample pizza data - will be replaced with Sanity CMS
const menuPizzas: (PizzaCardProps & { slug: string; baseType: "red" | "white" })[] = [
  {
    slug: "margherita",
    name: "Margherita",
    description: "San Marzano tomatoes, fior di latte, fresh basil, Sicilian olive oil. The timeless classic.",
    price: 4.50,
    isVegetarian: true,
    isAvailable: true,
    baseType: "red",
  },
  {
    slug: "patate-rosmarino",
    name: "Patate e Rosmarino",
    description: "Thinly sliced potatoes, rosemary, garlic, sea salt, extra virgin olive oil. Pure comfort.",
    price: 4.00,
    isVegetarian: true,
    isVegan: true,
    isAvailable: true,
    baseType: "white",
  },
  {
    slug: "nduja-burrata",
    name: "Nduja e Burrata",
    description: "Spicy Calabrian nduja, creamy burrata, honey drizzle, fresh oregano. Heat meets luxury.",
    price: 6.50,
    isSpicy: true,
    isNew: true,
    isAvailable: true,
    baseType: "red",
  },
  {
    slug: "carciofi",
    name: "Carciofi",
    description: "Roman artichokes, pecorino, mint, lemon zest, aged balsamic. A Roman delicacy.",
    price: 5.50,
    isVegetarian: true,
    isAvailable: true,
    baseType: "white",
  },
  {
    slug: "porchetta",
    name: "Porchetta",
    description: "Slow-roasted pork belly, fennel pollen, crackling, wild rocket. Countryside meets city.",
    price: 6.00,
    isAvailable: true,
    baseType: "white",
  },
  {
    slug: "quattro-formaggi",
    name: "Quattro Formaggi",
    description: "Gorgonzola, taleggio, fontina, parmigiano reggiano, black pepper. A cheese lover's dream.",
    price: 5.50,
    isVegetarian: true,
    isAvailable: true,
    baseType: "white",
  },
  {
    slug: "diavola",
    name: "Diavola",
    description: "Spicy salami, San Marzano tomatoes, fior di latte, chili oil, fresh oregano. Fiery and bold.",
    price: 5.50,
    isSpicy: true,
    isAvailable: true,
    baseType: "red",
  },
  {
    slug: "funghi-porcini",
    name: "Funghi Porcini",
    description: "Wild porcini mushrooms, truffle oil, thyme, parmigiano, garlic confit. Forest elegance.",
    price: 6.50,
    isVegetarian: true,
    isNew: true,
    isAvailable: true,
    baseType: "white",
  },
  {
    slug: "prosciutto-rucola",
    name: "Prosciutto e Rucola",
    description: "24-month aged prosciutto di Parma, wild rocket, shaved parmigiano, aged balsamic.",
    price: 6.00,
    isAvailable: true,
    baseType: "red",
  },
];

type FilterType = "vegetarian" | "spicy" | "white";

export default function MenuPage() {
  const [activeFilters, setActiveFilters] = useState<FilterType[]>([]);

  const toggleFilter = (filter: FilterType) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const clearFilters = () => setActiveFilters([]);

  const isMatch = (pizza: (typeof menuPizzas)[0]) => {
    if (activeFilters.length === 0) return true;

    return activeFilters.every((filter) => {
      switch (filter) {
        case "vegetarian":
          return pizza.isVegetarian || pizza.isVegan;
        case "spicy":
          return pizza.isSpicy;
        case "white":
          return pizza.baseType === "white";
        default:
          return true;
      }
    });
  };

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
            The Visualizer
          </p>
          <h1
            className={cn(
              "font-display text-5xl md:text-8xl italic",
              "text-[var(--foreground)] mb-8"
            )}
          >
            Menu Al Taglio
          </h1>
          <p
            className={cn(
              "font-sans text-xl italic max-w-2xl mx-auto",
              "text-[var(--foreground)]/40"
            )}
          >
            Selected heritage grains. LXXII hour fermentation. 
            Hand-cut rectangular slices from our signature trays.
          </p>
        </div>

        {/* Dietary Filters - Premium Toggles */}
        <div className="max-w-4xl mx-auto px-6 mb-20">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--foreground)]/20 mr-4">
              Filter By
            </span>
            {[
              { id: "vegetarian", label: "Vegetarian", icon: <Leaf className="w-3.5 h-3.5" /> },
              { id: "spicy", label: "Spicy", icon: <Flame className="w-3.5 h-3.5" /> },
              { id: "white", label: "White Base", icon: null },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => toggleFilter(filter.id as FilterType)}
                className={cn(
                  "flex items-center gap-3 px-8 py-3 rounded-full transition-all duration-500",
                  "font-display text-sm italic",
                  activeFilters.includes(filter.id as FilterType)
                    ? "bg-[var(--roman-red)] text-white shadow-[0_0_25px_rgba(204,0,0,0.3)]"
                    : "glass-panel text-[var(--foreground)]/40 border-[var(--roman-tan)]/10 hover:border-[var(--roman-tan)]/30"
                )}
              >
                {filter.icon}
                {filter.label}
              </button>
            ))}

            {activeFilters.length > 0 && (
              <button
                onClick={clearFilters}
                className="font-mono text-[10px] uppercase tracking-widest text-[var(--roman-red)] hover:text-[var(--roman-dark)] transition-colors flex items-center gap-2"
              >
                <X className="w-3 h-3" />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Menu Grid - The Tray Visualization */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {menuPizzas.map((pizza) => (
              <div 
                key={pizza.slug}
                className={cn(
                  "transition-all duration-700",
                  !isMatch(pizza) ? "opacity-20 scale-95 blur-[2px]" : "opacity-100 scale-100"
                )}
              >
                <Link href={`/menu/${pizza.slug}`} className="block">
                  <PizzaCard
                    {...pizza}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center px-6 mt-32 max-w-2xl mx-auto">
          <div className="h-[1px] w-24 bg-white/10 mx-auto mb-10" />
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/20">
            All pizzas contain sourdough heritage grains.<br />
            Hand-cut rectangular portions sold by weight.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--roman-tan)]/10 py-24 px-6 bg-[var(--background)] relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div>
            <p className="font-display text-2xl italic text-[var(--foreground)] mb-2">
              Roman Pizza Project
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--foreground)]/30">
              A Blueprint for Digital High-Gastronomy
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="font-mono text-[8px] uppercase tracking-[0.8em] text-[var(--foreground)]/10">
              © MMXXVI Roman Pizza Project • Edinburgh
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
