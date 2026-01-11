"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  GlassmorphismNav,
  HeroSection,
  PizzaCard,
  PizzaCardProps,
  FermentationTimeline,
} from "@/components/roman";

// =============================================================================
// DATA
// =============================================================================

const menuPizzas: (PizzaCardProps & { slug: string; baseType: "red" | "white" })[] = [
  {
    slug: "fontana-di-trevi",
    name: "Fontana di Trevi",
    description: "San Marzano DOP tomatoes, fior di latte mozzarella, fresh basil, extra virgin olive oil.",
    price: 4.50,
    isVegetarian: true,
    isAvailable: true,
    baseType: "red",
  },
  {
    slug: "colosseo",
    name: "Colosseo",
    description: "Spicy Italian salami, San Marzano tomatoes, fior di latte, Calabrian chili oil.",
    price: 5.50,
    isSpicy: true,
    isAvailable: true,
    baseType: "red",
  },
  {
    slug: "piazza-navona",
    name: "Piazza Navona",
    description: "Nduja calabrese, burrata di Puglia, wild honey, fresh oregano.",
    price: 6.50,
    isSpicy: true,
    isNew: true,
    isAvailable: true,
    baseType: "red",
  },
  {
    slug: "pantheon",
    name: "Pantheon",
    description: "24-month prosciutto di Parma, rocket, shaved Parmigiano Reggiano, aged balsamic.",
    price: 6.00,
    isAvailable: true,
    baseType: "red",
  },
  {
    slug: "villa-borghese",
    name: "Villa Borghese",
    description: "Thinly sliced potatoes, fresh rosemary, roasted garlic, Maldon sea salt.",
    price: 4.00,
    isVegetarian: true,
    isVegan: true,
    isAvailable: true,
    baseType: "white",
  },
  {
    slug: "quattro-formaggi",
    name: "Quattro Formaggi",
    description: "Gorgonzola DOP, taleggio, fontina, Parmigiano Reggiano 24 months.",
    price: 5.50,
    isVegetarian: true,
    isAvailable: true,
    baseType: "white",
  },
];

const menuSides = [
  { name: "Supplì al Telefono", desc: "Roman fried rice balls, tomato ragù, mozzarella.", price: 3.50 },
  { name: "Olive Ascolane", desc: "Stuffed Ascoli olives, breaded and fried.", price: 4.00 },
  { name: "Focaccia Bianca", desc: "Sea salt, rosemary, extra virgin olive oil.", price: 2.50 },
];

const menuDrinks = [
  { name: "Peroni Nastro Azzurro", desc: "Classic Italian lager.", price: 4.50 },
  { name: "Montepulciano d'Abruzzo", desc: "Medium-bodied red, cherry and spice.", price: 6.00 },
  { name: "San Pellegrino", desc: "Sparkling water or Limonata.", price: 2.50 },
];

const businessInfo = {
  name: "Roman Pizza Project",
  address: {
    street: "10 West Maitland Street",
    city: "Edinburgh",
    postcode: "EH12 5DS",
    area: "West End",
  },
  phone: "0131 229 3687",
  email: "hello@romanpizzaproject.com",
  established: 2019,
};

const openingHours = [
  { day: "Monday", hours: "11:00 – 22:00", isOpen: true },
  { day: "Tuesday", hours: "11:00 – 22:00", isOpen: true },
  { day: "Wednesday", hours: "11:00 – 22:00", isOpen: true },
  { day: "Thursday", hours: "11:00 – 22:00", isOpen: true },
  { day: "Friday", hours: "11:00 – 22:00", isOpen: true },
  { day: "Saturday", hours: "17:00 – 22:00", isOpen: true },
  { day: "Sunday", hours: "Closed", isOpen: false },
];

// =============================================================================
// COMPONENT
// =============================================================================

type FilterType = "vegetarian" | "spicy" | "white";

export default function Home() {
  const [activeFilters, setActiveFilters] = useState<FilterType[]>([]);

  const toggleFilter = (filter: FilterType) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const isMatch = (pizza: (typeof menuPizzas)[0]) => {
    if (activeFilters.length === 0) return true;
    return activeFilters.every((filter) => {
      switch (filter) {
        case "vegetarian": return pizza.isVegetarian || pizza.isVegan;
        case "spicy": return pizza.isSpicy;
        case "white": return pizza.baseType === "white";
        default: return true;
      }
    });
  };

  return (
    <div className="bg-background min-h-screen">
      <GlassmorphismNav />

      <main>
        {/* Hero */}
        <section id="hero">
          <HeroSection />
        </section>

        {/* Story */}
        <section id="story">
          <FermentationTimeline />
        </section>

        {/* Menu */}
        <section id="menu" className="section bg-white">
          <div className="container-wide">
            {/* Header */}
            <div className="text-center mb-16">
              <p className="text-overline text-primary mb-4">Our Selection</p>
              <h2 className="text-headline font-serif">The Menu</h2>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              {[
                { id: "vegetarian", label: "Vegetarian" },
                { id: "spicy", label: "Spicy" },
                { id: "white", label: "White Base" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => toggleFilter(filter.id as FilterType)}
                  className={cn(
                    "px-5 py-2.5 text-xs font-medium tracking-wide uppercase transition-all",
                    activeFilters.includes(filter.id as FilterType)
                      ? "bg-primary text-white"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  )}
                >
                  {filter.label}
                </button>
              ))}
              {activeFilters.length > 0 && (
                <button
                  onClick={() => setActiveFilters([])}
                  className="px-5 py-2.5 text-xs font-medium text-neutral-400 hover:text-foreground transition-colors"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Pizza Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
              {menuPizzas.map((pizza) => (
                <div
                  key={pizza.slug}
                  className={cn(
                    "transition-all duration-500",
                    !isMatch(pizza) && "opacity-20 scale-95"
                  )}
                >
                  <PizzaCard {...pizza} />
                </div>
              ))}
            </div>

            {/* Sides & Drinks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl mx-auto">
              {/* Sides */}
              <div>
                <h3 className="text-title mb-8 pb-4 border-b border-neutral-200">Sides</h3>
                <div className="space-y-6">
                  {menuSides.map((item) => (
                    <div key={item.name} className="flex justify-between gap-4">
                      <div>
                        <h4 className="font-medium mb-1">{item.name}</h4>
                        <p className="text-caption">{item.desc}</p>
                      </div>
                      <span className="text-primary font-medium whitespace-nowrap">£{item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Drinks */}
              <div>
                <h3 className="text-title mb-8 pb-4 border-b border-neutral-200">Drinks</h3>
                <div className="space-y-6">
                  {menuDrinks.map((item) => (
                    <div key={item.name} className="flex justify-between gap-4">
                      <div>
                        <h4 className="font-medium mb-1">{item.name}</h4>
                        <p className="text-caption">{item.desc}</p>
                      </div>
                      <span className="text-primary font-medium whitespace-nowrap">£{item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Locations */}
        <section id="locations" className="section bg-neutral-50">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Left: Info */}
              <div className="space-y-12">
                <div>
                  <p className="text-overline text-primary mb-4">Visit Us</p>
                  <h2 className="text-headline font-serif mb-6">{businessInfo.address.area}</h2>
                  <address className="text-body text-neutral-600 not-italic space-y-1">
                    <p>{businessInfo.address.street}</p>
                    <p>{businessInfo.address.city}, {businessInfo.address.postcode}</p>
                  </address>
                </div>

                <div>
                  <h3 className="text-overline mb-6">Contact</h3>
                  <div className="space-y-3">
                    <a href={`tel:${businessInfo.phone}`} className="block text-body hover:text-primary transition-colors">
                      {businessInfo.phone}
                    </a>
                    <a href={`mailto:${businessInfo.email}`} className="block text-body hover:text-primary transition-colors">
                      {businessInfo.email}
                    </a>
                  </div>
                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(businessInfo.address.street + ', ' + businessInfo.address.city)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex"
                >
                  Get Directions
                </a>
              </div>

              {/* Right: Hours */}
              <div className="bg-white p-10 lg:p-12">
                <h3 className="text-overline mb-8">Opening Hours</h3>
                <div className="space-y-4">
                  {openingHours.map((item) => (
                    <div key={item.day} className="flex justify-between py-3 border-b border-neutral-100 last:border-0">
                      <span className={cn("font-medium", !item.isOpen && "text-neutral-400")}>{item.day}</span>
                      <span className={cn(item.isOpen ? "text-neutral-600" : "text-accent")}>{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 bg-foreground text-white">
          <div className="container-wide">
            {/* Flag Bar */}
            <div className="flag-bar mb-12">
              <span /><span /><span />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Brand */}
              <div>
                <h4 className="text-lg font-medium mb-4">{businessInfo.name}</h4>
                <p className="text-sm text-neutral-400">
                  Authentic Roman pizza al taglio.<br />
                  Est. {businessInfo.established}
                </p>
              </div>

              {/* Links */}
              <div>
                <h4 className="text-overline text-neutral-400 mb-4">Navigate</h4>
                <nav className="space-y-2">
                  <Link href="#menu" className="block text-sm text-neutral-300 hover:text-white transition-colors">Menu</Link>
                  <Link href="#story" className="block text-sm text-neutral-300 hover:text-white transition-colors">Our Story</Link>
                  <Link href="#locations" className="block text-sm text-neutral-300 hover:text-white transition-colors">Visit</Link>
                </nav>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-overline text-neutral-400 mb-4">Contact</h4>
                <div className="space-y-2 text-sm text-neutral-300">
                  <p>{businessInfo.address.street}</p>
                  <p>{businessInfo.address.city} {businessInfo.address.postcode}</p>
                  <a href={`tel:${businessInfo.phone}`} className="block hover:text-white transition-colors mt-4">{businessInfo.phone}</a>
                </div>
              </div>
            </div>

            {/* Bottom */}
            <div className="mt-16 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-neutral-500">© {new Date().getFullYear()} {businessInfo.name}. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="https://instagram.com/romanpizzaproject" target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-500 hover:text-white transition-colors">Instagram</a>
                <a href="https://facebook.com/romanpizzaproject" target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-500 hover:text-white transition-colors">Facebook</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
