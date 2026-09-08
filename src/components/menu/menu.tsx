"use client";

import { Suspense, useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flame,
  Minus,
  Plus,
  ShoppingBag,
  Users,
  Utensils,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { menuItems, type MenuItem } from "@/data/menu";
import { CategorySelector } from "./categoryselector";
import { DishCard } from "./dishcard";
import { useCart } from "../cart/cartcontext";

function formatPrice(price: number) {
  return `\u20a6${price.toLocaleString("en-NG")}`;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const listContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const listItem = {
  hidden: { opacity: 0, y: 4 },
  visible: { opacity: 1, y: 0 },
};

function SpiceLevel({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Spice level ${level} of 3`}>
      {[1, 2, 3].map((n) => (
        <Flame
          key={n}
          className={cn(
            "h-3.5 w-3.5 transition-colors",
            n <= level ? "fill-cherry text-cherry" : "text-onyx/15"
          )}
        />
      ))}
    </div>
  );
}

export function Menu() {
  const { addItem, setIsDrawerOpen } = useCart();
  const searchParams = useSearchParams();
  const searchDishParam = searchParams.get("search");

  const [category, setCategory] = useState("All");
  const [index, setIndex] = useState(0);
  const [showCategories, setShowCategories] = useState(false);
  const [desktopCategoriesOpen, setDesktopCategoriesOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [marqueePaused, setMarqueePaused] = useState(false);

  // Sync search URL query param to select & display the target dish and scroll smoothly to view
  useEffect(() => {
    if (searchDishParam) {
      const matchedDish = menuItems.find(
        (dish) => dish.name.toLowerCase() === searchDishParam.toLowerCase()
      );

      if (matchedDish) {
        requestAnimationFrame(() => {
          setCategory("All");
          const dishIndex = menuItems.findIndex((d) => d.id === matchedDish.id);
          if (dishIndex !== -1) {
            setIndex(dishIndex);
            
            // Smoothly scroll down to active menu stage
            const menuStageElement = document.getElementById("menu-hero-stage");
            if (menuStageElement) {
              menuStageElement.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }
        });
      }
    }
  }, [searchDishParam]);

  const filtered = useMemo(
    () =>
      category === "All"
        ? menuItems
        : menuItems.filter((d) => d.category === category),
    [category]
  );

  const active = filtered[index];
  const nextDish =
    filtered.length > 1 ? filtered[(index + 1) % filtered.length] : undefined;
  const peekDish =
    filtered.length > 2 ? filtered[(index + 2) % filtered.length] : nextDish;

  const [prevActiveId, setPrevActiveId] = useState<number | undefined>(
    active?.id
  );
  if (active && active.id !== prevActiveId) {
    setPrevActiveId(active.id);
    if (quantity !== 1) setQuantity(1);
  }

  function handleCategoryChange(newCategory: string) {
    setCategory(newCategory);
    setIndex(0);
    setShowCategories(false);
    setDesktopCategoriesOpen(false);
  }

  function goTo(next: number) {
    if (filtered.length === 0) return;
    setIndex(((next % filtered.length) + filtered.length) % filtered.length);
  }

  function handleAdd(dish: MenuItem) {
    addItem(dish, quantity);
    setIsDrawerOpen(true);
    setQuantity(1);
  }

  function handleHeroDragEnd(_: unknown, info: PanInfo) {
    const threshold = 60;
    if (info.offset.x < -threshold) goTo(index + 1);
    else if (info.offset.x > threshold) goTo(index - 1);
  }

  if (!active) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-slate">
        No dishes in this category yet.
      </div>
    );
  }

  const marqueeDuration = Math.max(18, filtered.length * 3);

  return (
    <div className="mx-auto w-full max-w-7xl overflow-x-hidden px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <style>{`
        @keyframes vora-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      {/* Header */}
      <Reveal className="text-center min-[800px]:text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cherry">
          The living menu · A study in flavor
        </p>
        <h1 className="mt-2 font-display text-4xl leading-none tracking-tight text-onyx sm:text-6xl min-[800px]:text-7xl xl:text-8xl">
          Explore The Flavors
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-slate sm:text-base min-[800px]:mx-0">
          Move through a constellation of dishes. Let instinct decide the first bite.
        </p>
      </Reveal>

      {/* 800px+ Layout Grid */}
      <div id="menu-hero-stage" className="mt-8 flex flex-col items-center gap-8 sm:mt-10 min-[800px]:mt-12 min-[800px]:grid min-[800px]:grid-cols-12 min-[800px]:items-center min-[800px]:gap-6 xl:gap-10">
        
        {/* Left Column: Blob Shape Active Hero Card */}
        <Reveal
          delay={0.1}
          className="flex w-full shrink-0 flex-col items-center gap-3 sm:max-w-[300px] min-[800px]:col-span-4 min-[800px]:max-w-none min-[800px]:items-start"
        >
          <DishCard
            dish={active}
            shape="blob"
            draggable
            priority
            onDragEnd={handleHeroDragEnd}
            onDoubleClick={() => goTo(index + 1)}
            className="aspect-square w-full shadow-lg min-[800px]:w-full"
          />
          <p className="w-full text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-slate/70 min-[800px]:text-left">
            SAVOR · TASTE · EXPLORE
          </p>
        </Reveal>

        {/* Middle Column: Details & Attributes */}
        <div className="min-w-0 w-full flex-1 text-center min-[800px]:col-span-4 min-[800px]:text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Category Dropdown & Spice Rating Line */}
              <div className="relative flex flex-wrap items-center justify-center gap-x-3 gap-y-2 min-[800px]:justify-start">
                <button
                  onClick={() => setShowCategories((v) => !v)}
                  className="flex items-center gap-1.5 rounded-full text-cherry transition-colors hover:text-cherry/80"
                >
                  <Utensils className="h-3 w-3" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
                    {active.category}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      showCategories && "rotate-180"
                    )}
                  />
                </button>
                <SpiceLevel level={active.spiceLevel} />

                {/* Mobile/Small Category Selector Modal */}
                <AnimatePresence>
                  {showCategories && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowCategories(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 8 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="fixed left-1/2 top-1/2 z-50 w-[min(90vw,18rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-onyx/10 bg-cream/95 p-4 shadow-2xl backdrop-blur-xl"
                      >
                        <CategorySelector
                          active={category}
                          onChange={handleCategoryChange}
                        />
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Dish Title */}
              <h2
                className="mt-3 line-clamp-2 font-display text-3xl leading-tight text-onyx sm:text-4xl min-[800px]:text-5xl"
                title={active.name}
              >
                {active.name}
              </h2>

              {/* Description */}
              <p className="mx-auto mt-3 max-w-xs text-sm text-slate sm:text-base min-[800px]:mx-0">
                {active.description}
              </p>

              {/* Servings & Prep Time Badges */}
              <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate min-[800px]:justify-start">
                <span className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" /> {active.servings}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> {active.prepTime}
                </span>
              </div>

              {/* Ingredients List */}
              <motion.p
                variants={listContainer}
                initial="hidden"
                animate="visible"
                className="mx-auto mt-2 hidden max-w-md text-xs text-slate/80 sm:block min-[800px]:mx-0"
              >
                {active.ingredients.map((ing, i) => (
                  <motion.span key={ing} variants={listItem}>
                    {ing}
                    {i < active.ingredients.length - 1 && (
                      <span className="mx-1.5 text-onyx/20">·</span>
                    )}
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Price, Quantity Control & Add To Cart */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 min-[800px]:justify-start">
            <span className="font-display text-xl font-bold text-onyx sm:text-2xl">
              {formatPrice(active.price)}
            </span>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2 rounded-full border border-onyx/15 px-1 py-1">
              <motion.button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                whileTap={{ scale: 0.9 }}
                className="flex h-7 w-7 items-center justify-center rounded-full text-onyx transition-colors hover:bg-onyx/5"
                aria-label="Decrease quantity"
              >
                <Minus className="h-3.5 w-3.5" />
              </motion.button>
              <span className="w-4 text-center text-sm font-medium tabular-nums text-onyx">
                {quantity}
              </span>
              <motion.button
                onClick={() => setQuantity((q) => q + 1)}
                whileTap={{ scale: 0.9 }}
                className="flex h-7 w-7 items-center justify-center rounded-full text-onyx transition-colors hover:bg-onyx/5"
                aria-label="Increase quantity"
              >
                <Plus className="h-3.5 w-3.5" />
              </motion.button>
            </div>

            {/* Add to Cart Button */}
            <motion.button
              onClick={() => handleAdd(active)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 rounded-md bg-cherry px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-cream shadow-sm transition-colors hover:bg-cherry/90"
            >
              <ShoppingBag className="h-4 w-4" /> ADD TO CART
            </motion.button>
          </div>
        </div>

        {/* Right Column: Previews & Circle Trigger */}
        <div className="relative hidden shrink-0 flex-col items-end min-[800px]:col-span-4 min-[800px]:flex">
          <div className="flex flex-col items-center gap-4">
            {/* Main Arch Preview */}
            {nextDish && (
              <button
                onClick={() => goTo(index + 1)}
                className="group relative"
                aria-label={`Preview ${nextDish.name}`}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={nextDish.id}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <DishCard
                      dish={nextDish}
                      shape="arch"
                      className="h-56 w-52 shadow-md transition-transform group-hover:scale-105 xl:h-64 xl:w-60"
                    />
                  </motion.div>
                </AnimatePresence>
              </button>
            )}

            {/* Overlapping Secondary Arch & Round Category Trigger */}
            <div className="flex items-end gap-3 -mt-10">
              {peekDish && (
                <button
                  onClick={() => goTo(index + 2)}
                  className="group relative z-10"
                >
                  <DishCard
                    dish={peekDish}
                    shape="arch"
                    className="h-36 w-32 shadow-md transition-transform group-hover:scale-105 xl:h-44 xl:w-36"
                  />
                </button>
              )}

              {/* Circle Category Trigger */}
              <div className="relative z-10">
                <motion.button
                  onClick={() => setDesktopCategoriesOpen((v) => !v)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-28 w-28 flex-col items-center justify-center rounded-full border border-cherry/60 bg-cream text-center text-cherry shadow-sm xl:h-32 xl:w-32"
                >
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em]">
                    {active.category}
                  </span>
                  <span className="mt-1 text-[8px] font-bold uppercase tracking-[0.15em] text-cherry/80">
                    Explore<br />categories
                  </span>
                </motion.button>

                {/* Floating Category Modal */}
                <AnimatePresence>
                  {desktopCategoriesOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setDesktopCategoriesOpen(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 8 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="fixed left-1/2 top-1/2 z-50 w-64 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-onyx/10 bg-cream/95 p-4 shadow-2xl backdrop-blur-xl"
                      >
                        <CategorySelector
                          active={category}
                          onChange={handleCategoryChange}
                        />
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Marquee Navigation for screens below 800px */}
      <div className="mt-10 lg:mt-14 min-[800px]:hidden">
        <div className="hidden sm:block">
          <div
            className="overflow-hidden"
            onMouseEnter={() => setMarqueePaused(true)}
            onMouseLeave={() => setMarqueePaused(false)}
          >
            <div
              className="flex w-max gap-4"
              style={{
                animationName: "vora-marquee",
                animationDuration: `${marqueeDuration}s`,
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationPlayState: marqueePaused ? "paused" : "running",
              }}
            >
              {[...filtered, ...filtered].map((dish, i) => {
                const isActive = dish.id === active.id;
                return (
                  <button
                    key={`${dish.id}-${i}`}
                    onClick={() => goTo(filtered.findIndex((d) => d.id === dish.id))}
                    className="shrink-0"
                  >
                    <DishCard
                      dish={dish}
                      shape="circle"
                      className={cn(
                        "h-16 w-16 transition-opacity sm:h-20 sm:w-20",
                        isActive ? "opacity-100 ring-2 ring-cherry ring-offset-2 ring-offset-cream" : "opacity-60"
                      )}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 sm:hidden">
          <motion.button
            onClick={() => goTo(index - 1)}
            whileTap={{ scale: 0.92 }}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-onyx/15 text-onyx"
            aria-label="Previous dish"
          >
            <ChevronLeft className="h-4 w-4" />
          </motion.button>
          <span className="text-xs uppercase tracking-widest text-slate">
            Double-tap photo for next
          </span>
          <motion.button
            onClick={() => goTo(index + 1)}
            whileTap={{ scale: 0.92 }}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-onyx/15 text-onyx"
            aria-label="Next dish"
          >
            <ChevronRight className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

