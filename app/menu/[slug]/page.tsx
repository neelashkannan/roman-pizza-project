import { notFound } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { GlassmorphismNav } from "@/components/roman";
import { ArrowLeft, Flame, Leaf, Wine } from "lucide-react";
import type { Metadata } from "next";

/**
 * Pizza Detail Page - Dynamic Route
 * 
 * Individual pizza showcase with hero image, macro detail,
 * premium description, price, and drink pairing suggestions.
 */

// Sample pizza data - will be replaced with Sanity CMS
const pizzaData: Record<
  string,
  {
    name: string;
    description: string;
    longDescription: string;
    price: number;
    hydrationLevel: number;
    fermentationTime: number;
    isVegetarian?: boolean;
    isVegan?: boolean;
    isSpicy?: boolean;
    pairing?: string;
  }
> = {
  margherita: {
    name: "Margherita",
    description: "San Marzano tomatoes, fior di latte, fresh basil, Sicilian olive oil.",
    longDescription:
      "The timeless classic that needs no introduction. Our Margherita showcases the purity of our 72-hour fermented dough, topped with crushed San Marzano tomatoes from the volcanic slopes of Mount Vesuvius, creamy fior di latte from Campania, fresh basil leaves, and a drizzle of cold-pressed Sicilian olive oil. Simple. Perfect.",
    price: 4.50,
    hydrationLevel: 80,
    fermentationTime: 72,
    isVegetarian: true,
    pairing: "Peroni Nastro Azzurro or a crisp Vermentino",
  },
  "nduja-burrata": {
    name: "Nduja e Burrata",
    description: "Spicy Calabrian nduja, creamy burrata, honey drizzle, fresh oregano.",
    longDescription:
      "Where heat meets luxury. This bold creation features authentic nduja from Spilinga in Calabria—a spicy, spreadable salami that melts into rivers of flavor when it hits our hot oven. Crowned with a whole burrata that spills its creamy heart across the slice, finished with a whisper of local honey and fresh oregano. The interplay of spicy, creamy, and sweet is nothing short of transcendent.",
    price: 6.50,
    hydrationLevel: 80,
    fermentationTime: 72,
    isSpicy: true,
    pairing: "A robust Primitivo or cold Moretti La Rossa",
  },
  "patate-rosmarino": {
    name: "Patate e Rosmarino",
    description: "Thinly sliced potatoes, rosemary, garlic, sea salt, extra virgin olive oil.",
    longDescription:
      "Carb on carb? Absolutely. This Roman classic proves that sometimes the simplest combinations are the most satisfying. Paper-thin slices of potato are layered across our cloud-like dough, studded with fragrant rosemary, whispers of garlic, Maldon sea salt, and generous extra virgin olive oil. The potatoes crisp at the edges while remaining tender beneath. Pure comfort.",
    price: 4.00,
    hydrationLevel: 82,
    fermentationTime: 72,
    isVegetarian: true,
    isVegan: true,
    pairing: "A light Soave or Ichnusa Lager",
  },
  carciofi: {
    name: "Carciofi",
    description: "Roman artichokes, pecorino, mint, lemon zest, aged balsamic.",
    longDescription:
      "A tribute to Rome's beloved carciofi alla romana. We source the finest artichoke hearts, char them lightly to develop smoky depth, and pair them with shaved pecorino Romano, fresh mint leaves, bright lemon zest, and droplets of aged balsamic that have concentrated into syrupy intensity over 12 years. Each bite is a Roman afternoon.",
    price: 5.50,
    hydrationLevel: 80,
    fermentationTime: 72,
    isVegetarian: true,
    pairing: "Frascati Superiore or a dry Prosecco",
  },
  porchetta: {
    name: "Porchetta",
    description: "Slow-roasted pork belly, fennel pollen, crackling, wild rocket.",
    longDescription:
      "The countryside comes to the city. Our porchetta is slow-roasted for 8 hours until the meat is impossibly tender and the skin has transformed into shards of pure crackling. Sliced thin and draped across our pizza, finished with precious fennel pollen that carries the essence of a Tuscan meadow, and peppery wild rocket for brightness. This is Sunday lunch on a slice.",
    price: 6.00,
    hydrationLevel: 80,
    fermentationTime: 72,
    pairing: "Chianti Classico or Menabrea Ambrata",
  },
  "quattro-formaggi": {
    name: "Quattro Formaggi",
    description: "Gorgonzola, taleggio, fontina, parmigiano reggiano, black pepper.",
    longDescription:
      "A cheese lover's meditation. Four carefully selected Italian cheeses come together in molten harmony: pungent Gorgonzola Dolce, rich and earthy Taleggio, Alpine Fontina with its subtle nuttiness, and 24-month aged Parmigiano Reggiano for its crystalline intensity. A generous crack of black pepper adds just enough edge. Decadent doesn't begin to describe it.",
    price: 5.50,
    hydrationLevel: 78,
    fermentationTime: 72,
    isVegetarian: true,
    pairing: "Amarone della Valpolicella or a port-style dessert wine",
  },
  diavola: {
    name: "Diavola",
    description: "Spicy salami, San Marzano tomatoes, fior di latte, chili oil, fresh oregano.",
    longDescription:
      "Named for the devil himself, this pizza brings the heat. Our custom-cured spicy salami develops its characteristic curl in the oven, pooling with delicious rendered fat. Laid over a base of San Marzano tomatoes and creamy fior di latte, finished with our house-made calabrian chili oil and fragrant oregano. Not for the faint of heart—exactly as intended.",
    price: 5.50,
    hydrationLevel: 80,
    fermentationTime: 72,
    isSpicy: true,
    pairing: "Montepulciano d'Abruzzo or a cold Peroni",
  },
  "funghi-porcini": {
    name: "Funghi Porcini",
    description: "Wild porcini mushrooms, truffle oil, thyme, parmigiano, garlic confit.",
    longDescription:
      "Forest elegance on a plate. We source wild porcini during the autumn season and preserve their earthy intensity for year-round enjoyment. Sautéed with sweet garlic confit and fresh thyme, scattered across our white base, and finished with genuine truffle oil (not the synthetic impostor) and snowdrifts of aged parmigiano. This is the pizza equivalent of a walk through ancient woodlands.",
    price: 6.50,
    hydrationLevel: 80,
    fermentationTime: 72,
    isVegetarian: true,
    pairing: "Barolo or a earthy Pinot Noir",
  },
  "prosciutto-rucola": {
    name: "Prosciutto e Rucola",
    description: "24-month aged prosciutto di Parma, wild rocket, shaved parmigiano, aged balsamic.",
    longDescription:
      "Elegance in its purest form. We start with our classic tomato base, add fior di latte, and bake until bubbly. The magic happens after: tissue-thin slices of 24-month aged prosciutto di Parma are draped over the hot pizza, their fat beginning to glisten. Topped with peppery wild rocket, shaved parmigiano, and a drizzle of 18-year aged balsamic from Modena. The prosciutto should never see the inside of an oven—that's our rule.",
    price: 6.00,
    hydrationLevel: 80,
    fermentationTime: 72,
    pairing: "Lambrusco di Sorbara or Franciacorta Brut",
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pizza = pizzaData[slug];

  if (!pizza) {
    return {
      title: "Pizza Not Found | Roman Pizza Project",
    };
  }

  return {
    title: `${pizza.name} | Roman Pizza Project`,
    description: pizza.description,
  };
}

export async function generateStaticParams() {
  return Object.keys(pizzaData).map((slug) => ({
    slug,
  }));
}

export default async function PizzaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const pizza = pizzaData[slug];

  if (!pizza) {
    notFound();
  }

  return (
    <>
      <GlassmorphismNav />

      <main className="min-h-screen bg-[var(--background)] pt-32 pb-16">
        {/* Back Link */}
        <div className="px-6 mb-12">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/menu"
              className={cn(
                "inline-flex items-center gap-2 group",
                "font-mono text-xs uppercase tracking-[0.2em]",
                "text-[var(--foreground)]/60 hover:text-[var(--retro-gold)] transition-colors"
              )}
            >
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
              Back to Menu
            </Link>
          </div>
        </div>

        {/* Pizza Detail */}
        <article className="px-6">
          <div className="max-w-4xl mx-auto">
            {/* Hero Image Placeholder */}
            <div
              className={cn(
                "aspect-[16/9] mb-16",
                "bg-[var(--foreground)]/5 border-2 border-[var(--foreground)]/10",
                "flex items-center justify-center p-12"
              )}
            >
              <div className="text-center group">
                <div className="w-24 h-24 border border-[var(--foreground)]/20 mx-auto flex items-center justify-center mb-6">
                  <Flame className="w-8 h-8 text-[var(--foreground)]/20" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-[var(--foreground)]/30">
                  Visual Impression: {pizza.name}
                </span>
              </div>
            </div>

            {/* Header */}
            <header className="mb-16">
              {/* Badges */}
              <div className="flex flex-wrap gap-4 mb-8">
                {pizza.isVegan && (
                  <span
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 border border-[var(--retro-green)]",
                      "text-[var(--retro-green)]",
                      "font-mono text-[10px] uppercase tracking-widest"
                    )}
                  >
                    <Leaf className="w-3 h-3" />
                    Vegan
                  </span>
                )}
                {pizza.isVegetarian && !pizza.isVegan && (
                  <span
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 border border-[var(--retro-green)]",
                      "text-[var(--retro-green)]",
                      "font-mono text-[10px] uppercase tracking-widest"
                    )}
                  >
                    <Leaf className="w-3 h-3" />
                    Vegetarian
                  </span>
                )}
                {pizza.isSpicy && (
                  <span
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 border border-[var(--retro-red)]",
                      "text-[var(--retro-red)]",
                      "font-mono text-[10px] uppercase tracking-widest"
                    )}
                  >
                    <Flame className="w-3 h-3" />
                    Spicy
                  </span>
                )}
              </div>

              {/* Name */}
              <h1
                className={cn(
                  "font-display text-5xl md:text-8xl italic",
                  "text-[var(--foreground)] mb-6"
                )}
              >
                {pizza.name}
              </h1>

              {/* Short Description */}
              <p
                className={cn(
                  "font-sans text-xl md:text-2xl leading-relaxed",
                  "text-[var(--foreground)]/60"
                )}
              >
                {pizza.description}
              </p>
            </header>

            {/* Price & Stats */}
            <div
              className={cn(
                "grid grid-cols-3 gap-0 mb-16",
                "bg-[var(--foreground)]/5",
                "border-2 border-[var(--foreground)]/20"
              )}
            >
              <div className="text-center p-8 border-r border-[var(--foreground)]/20">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--foreground)]/40 mb-3">
                  Per Slice
                </p>
                <p className="font-mono text-4xl font-bold text-[var(--retro-gold)]">
                  £{pizza.price.toFixed(2)}
                </p>
              </div>
              <div className="text-center p-8 border-r border-[var(--foreground)]/20">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--foreground)]/40 mb-3">
                  Hydration
                </p>
                <p className="font-mono text-4xl text-[var(--foreground)]">
                  {pizza.hydrationLevel}%
                </p>
              </div>
              <div className="text-center p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--foreground)]/40 mb-3">
                  Fermentation
                </p>
                <p className="font-mono text-4xl text-[var(--foreground)]">
                  {pizza.fermentationTime}h
                </p>
              </div>
            </div>

            {/* Long Description */}
            <div className="mb-24">
              <h2
                className={cn(
                  "font-display text-2xl italic",
                  "text-[var(--foreground)] mb-6"
                )}
              >
                The Story
              </h2>
              <div className="relative">
                <div className="absolute -left-8 top-0 bottom-0 w-1 bg-[var(--retro-red)]/20" />
                <p
                  className={cn(
                    "font-sans text-xl leading-relaxed italic",
                    "text-[var(--foreground)]/80"
                  )}
                >
                  &ldquo;{pizza.longDescription}&rdquo;
                </p>
              </div>
            </div>

            {/* Pairing Suggestion */}
            {pizza.pairing && (
              <div
                className={cn(
                  "p-8",
                  "bg-[var(--foreground)]/5",
                  "border-2 border-[var(--foreground)]/20 shadow-[8px_8px_0px_rgba(0,0,0,0.2)]"
                )}
              >
                <div className="flex items-start gap-8">
                  <div
                    className={cn(
                      "flex-shrink-0 w-16 h-16",
                      "bg-[var(--retro-gold)]/10 border border-[var(--retro-gold)]/30",
                      "flex items-center justify-center p-3"
                    )}
                  >
                    <Wine className="w-full h-full text-[var(--retro-gold)]" />
                  </div>
                  <div>
                    <h3
                      className={cn(
                        "font-display text-2xl italic",
                        "text-[var(--foreground)] mb-3"
                      )}
                    >
                      Perfect Pairing
                    </h3>
                    <p
                      className={cn(
                        "font-sans text-lg italic",
                        "text-[var(--foreground)]/60"
                      )}
                    >
                      {pizza.pairing}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Order CTA */}
            <div className="mt-24 text-center">
              <Link
                href="/menu"
                className={cn(
                  "inline-flex items-center gap-4",
                  "font-display text-xl italic",
                  "bg-[var(--foreground)] text-[var(--background)]",
                  "hover:bg-[var(--retro-red)] hover:text-white transition-all duration-300",
                  "px-12 py-6 border-2 border-[var(--foreground)]",
                  "shadow-[6px_6px_0px_var(--retro-green)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                )}
              >
                Order This Slice
              </Link>
            </div>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--foreground)]/10 py-20 px-6 bg-[var(--background)]">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <h2 className="font-display text-2xl italic mb-8">Roman Pizza Project</h2>
          <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-[var(--foreground)]/20">
            © 2024 Roman Pizza Project • Est. Edinburgh
          </p>
        </div>
      </footer>
    </>
  );
}
