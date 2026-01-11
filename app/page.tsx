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

const menuPizzas: (PizzaCardProps & { slug: string; baseType: "red" | "white"; isPopular?: boolean })[] = [
  // Popular Pizzas
  { slug: "margherita", name: "Margherita", description: "Tomato sauce & mozzarella.", price: 10.50, isVegetarian: true, isAvailable: true, baseType: "red", isPopular: true },
  { slug: "veggie-supreme", name: "Veggie Supreme", description: "Tomato base, peppers, mushrooms, onions & sweetcorn.", price: 10.95, isVegetarian: true, isAvailable: true, baseType: "red", isPopular: true },
  { slug: "quattro-formaggi", name: "Quattro Formaggi", description: "Tomato base, mozzarella, parmesan, gorgonzola & goat's cheese.", price: 12.95, isVegetarian: true, isAvailable: true, baseType: "red", isPopular: true },
  { slug: "pepperoni", name: "Pepperoni", description: "Tomato base, mozzarella & Italian pepperoni.", price: 11.50, isAvailable: true, baseType: "red", isPopular: true },
  { slug: "hot-spicy", name: "Hot & Spicy", description: "Tomato base, mozzarella, pepperoni, jalapeños & chilli flakes.", price: 11.95, isSpicy: true, isAvailable: true, baseType: "red", isPopular: true },
  { slug: "chicken", name: "Chicken", description: "Tomato base, mozzarella, chicken, red onions & peppers.", price: 11.95, isAvailable: true, baseType: "red", isPopular: true },
  { slug: "meat-feast", name: "Meat Feast", description: "Tomato base, mozzarella, pepperoni, salami, Italian sausages & smoked ham.", price: 13.95, isAvailable: true, baseType: "red", isPopular: true },
  { slug: "bbq-chicken-sausage", name: "BBQ Chicken & Sausage", description: "BBQ base, mozzarella cheese, Italian sausage, chicken breasts, red onion.", price: 12.95, isAvailable: true, baseType: "red", isPopular: true },
  // Other Pizzas
  { slug: "gorgonzola-onions", name: "Gorgonzola & Onions", description: "Tomato base, gorgonzola blue cheese, red onions & mozzarella.", price: 12.95, isVegetarian: true, isAvailable: true, baseType: "red" },
  { slug: "spicy-veg", name: "Spicy Veg", description: "Tomato base, double mozzarella, onions, green chillies, peppers, jalapeños, chilli flakes.", price: 11.50, isVegetarian: true, isSpicy: true, isAvailable: true, baseType: "red" },
  { slug: "bianca", name: "Bianca", description: "No tomato base, mozzarella, artichoke and mushrooms.", price: 11.50, isVegetarian: true, isAvailable: true, baseType: "white" },
  { slug: "capricciosa", name: "Capricciosa", description: "Tomato base, cooked ham, mushrooms & EVOO.", price: 11.95, isAvailable: true, baseType: "red" },
  { slug: "prosciutto-rocket", name: "Prosciutto Rocket Salad", description: "Tomato base, mozzarella, Italian ham, sun-dried tomatoes, rocket, parmesan & EVOO.", price: 11.50, isAvailable: true, baseType: "red" },
  { slug: "salami-picante", name: "Salami Picante", description: "Tomato sauce, mozzarella cheese, jalapeños, black pepper, Italian salami.", price: 11.50, isSpicy: true, isAvailable: true, baseType: "red" },
  { slug: "ham", name: "Ham", description: "Tomato sauce, mozzarella cheese, cooked ham.", price: 10.50, isAvailable: true, baseType: "red" },
  { slug: "al-tonno", name: "Al Tonno", description: "Tomato base, mozzarella, tuna, onions and black olives.", price: 12.50, isAvailable: true, baseType: "red" },
  { slug: "anchovies", name: "Anchovies", description: "Tomato sauce, mozzarella cheese, anchovies, black olives, red onions.", price: 12.50, isAvailable: true, baseType: "red" },
  { slug: "spicy-chicken-tikka", name: "Spicy Chicken Tikka", description: "Tomato sauce, mozzarella, chicken tikka, onions, mixed peppers, jalapeños and chilli flakes.", price: 13.95, isSpicy: true, isAvailable: true, baseType: "red" },
  { slug: "ham-pineapple", name: "Ham & Pineapple", description: "Tomato base, mozzarella, cooked ham, pineapple.", price: 12.95, isAvailable: true, baseType: "red" },
];

const menuSides = [
  { name: "Fries", desc: "Classic crispy fries.", price: 3.49 },
  { name: "Spicy Loaded Fries", desc: "Fries with spicy toppings.", price: 4.49 },
  { name: "Garlic & Cheese Dough-Balls", desc: "Fresh baked dough balls with garlic butter and cheese.", price: 5.95 },
  { name: "Pepperoni Dough-Balls", desc: "Garlic butter, pepperoni, mozzarella cheese.", price: 6.95 },
  { name: "Garlic Bread with Cheese 10\"", desc: "Classic garlic bread topped with melted cheese.", price: 7.95 },
  { name: "Chicken Strippers with BBQ Dip (6)", desc: "Crispy chicken strips with BBQ sauce.", price: 6.50 },
  { name: "Crunchy Hot & Spicy Chicken Strips (6)", desc: "Chicken breast fillets in a crunchy hot and spicy coating with BBQ dip.", price: 6.95 },
  { name: "Box Green Olives", desc: "Marinated green olives.", price: 4.95 },
  { name: "Mozzarella Sticks", desc: "Crispy fried mozzarella sticks.", price: 5.49 },
];

const menuDips = [
  { name: "Garlic Mayonnaise", desc: "Creamy garlic mayo dip.", price: 0.89 },
  { name: "BBQ Dip", desc: "Classic BBQ sauce.", price: 0.89 },
];

const menuDrinks = [
  { name: "Coca-Cola 0.33l", desc: "Classic Coca-Cola.", price: 1.99 },
  { name: "Diet Coca-Cola 0.33l", desc: "Sugar-free Coca-Cola.", price: 1.99 },
  { name: "Coca-Cola Zero 0.33l", desc: "Zero sugar, zero calories.", price: 1.99 },
  { name: "Fanta Orange 0.33l", desc: "Refreshing orange soda.", price: 1.99 },
  { name: "Irn Bru 0.33l", desc: "Scotland's other national drink.", price: 1.99 },
  { name: "Dr. Pepper 0.33l", desc: "23 flavours in one.", price: 1.99 },
  { name: "Bottle of Water 0.5l", desc: "Still mineral water.", price: 1.99 },
  { name: "San Pellegrino", desc: "Italian sparkling water.", price: 2.20 },
  { name: "Ginger Beer", desc: "Spicy ginger refreshment.", price: 2.20 },
];

const menuWine = [
  { name: "White Wine", desc: "House white wine.", price: 23.80 },
  { name: "Red Wine", desc: "House red wine.", price: 23.80 },
];

const menuBeers = [
  { name: "Torr Lager (Pint)", desc: "Alc. 4% vol.", price: 5.49 },
  { name: "Scurry Island IPA (Pint)", desc: "Alc. 4% vol.", price: 5.49 },
  { name: "Juicy Belter IPA (Can)", desc: "Alc. 4.5% vol.", price: 4.80 },
  { name: "Weekend Hooker Lager (Can)", desc: "Alc. 5% vol.", price: 4.49 },
  { name: "M'ango Unchained IPA (Can)", desc: "Alc. 5% vol.", price: 4.80 },
  { name: "Bubba Brew Blueberry Sour (Can)", desc: "Alc. 6% vol.", price: 5.90 },
  { name: "Trawlerman Pale Ale (Can)", desc: "Alc. 4.5% vol.", price: 4.60 },
  { name: "Ultra Black Stout (Can)", desc: "Alc. 4.4% vol.", price: 4.49 },
  { name: "Mango Lassi Beer (Can)", desc: "Alc. 4.5% vol.", price: 5.20 },
  { name: "Scurry Island (Can)", desc: "Alc. 4% vol.", price: 4.45 },
  { name: "Torr Lager (Can)", desc: "Alc. 4% vol.", price: 4.20 },
  { name: "Divernaut (Can)", desc: "Alcohol Free - 0.5% vol.", price: 3.20 },
];

const menuCombos = [
  { name: "Combo Deal for 1", desc: "Choose any pizza, any sides and any drink.", price: 17.99 },
  { name: "Deluxe Combo Deal for 1", desc: "Choose any pizza, any sides, any drink and any dessert.", price: 19.99 },
  { name: "Combo Deal for 2", desc: "Choose any pizza, any sides and any drink.", price: 34.00 },
  { name: "Deluxe Combo Deal for 2", desc: "Choose any pizza, any sides, any drink and any dessert.", price: 38.99 },
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

            {/* Pizza Menu */}
            <div className="max-w-4xl mx-auto mb-16">
              <h3 className="text-title mb-8 pb-4 border-b border-neutral-200">12" Pizzas</h3>
              <div className="space-y-6">
                {menuPizzas.map((pizza) => (
                  <div
                    key={pizza.slug}
                    className={cn(
                      "flex justify-between gap-4 transition-all duration-300",
                      !isMatch(pizza) && "opacity-20"
                    )}
                  >
                    <div>
                      <h4 className="font-medium mb-1 flex items-center gap-2">
                        {pizza.name}
                        {pizza.isPopular && <span className="text-[10px] font-bold uppercase tracking-wider bg-accent text-white px-2 py-0.5">Popular</span>}
                        {pizza.isVegetarian && <span className="text-[10px] font-bold uppercase tracking-wider text-primary">V</span>}
                        {pizza.isSpicy && <span className="text-[10px] font-bold uppercase tracking-wider text-accent">🌶</span>}
                      </h4>
                      <p className="text-caption">{pizza.description}</p>
                    </div>
                    <span className="text-primary font-medium whitespace-nowrap">£{pizza.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Combo Deals */}
            <div className="max-w-4xl mx-auto mb-16">
              <h3 className="text-title mb-8 pb-4 border-b border-neutral-200">Combo Deals</h3>
              <div className="space-y-6">
                {menuCombos.map((item) => (
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

            {/* Sides & Dips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl mx-auto mb-16">
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

              {/* Dips */}
              <div>
                <h3 className="text-title mb-8 pb-4 border-b border-neutral-200">Dips</h3>
                <div className="space-y-6">
                  {menuDips.map((item) => (
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

            {/* Drinks & Beers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl mx-auto mb-16">
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

              {/* Beers */}
              <div>
                <h3 className="text-title mb-8 pb-4 border-b border-neutral-200">Beers</h3>
                <div className="space-y-6">
                  {menuBeers.map((item) => (
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

            {/* Wine */}
            <div className="max-w-4xl mx-auto">
              <h3 className="text-title mb-8 pb-4 border-b border-neutral-200">Wine</h3>
              <div className="space-y-6">
                {menuWine.map((item) => (
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
