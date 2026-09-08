"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Minus, Plus, Trash2, ArrowRight, RotateCcw } from "lucide-react";
import { useCart, CartItem } from "./cartcontext";
import { DishCard } from "../menu/dishcard";
import { AnimatedPrice } from "./animatedprice";

interface DeletedNotification {
  item: CartItem;
  index: number;
}

export function Cart() {
  const { items, updateQuantity, removeItem, restoreItem, subtotal, totalQuantity, isHydrated } = useCart();
  const [deletedToast, setDeletedToast] = useState<DeletedNotification | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleRemove = (id: number) => {
    const removed = removeItem(id);
    if (removed) {
      setDeletedToast(removed);
      setTimeout(() => {
        setDeletedToast((current) => (current?.item.dish.id === id ? null : current));
      }, 5000);
    }
  };

  const handleUndo = () => {
    if (deletedToast) {
      restoreItem(deletedToast.item, deletedToast.index);
      setDeletedToast(null);
    }
  };

  if (!isHydrated) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate">Loading your table...</p>
      </div>
    );
  }

  if (items.length === 0) {
  return (
    <div className="relative mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center overflow-hidden">
      {/* Soft Ambient Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cherry/10 blur-[120px]" />

      {/* Luxury Animated Organic Sculpture Placeholder */}
      <motion.div
        animate={shouldReduceMotion ? {} : { scale: [1, 1.05, 1], rotate: [0, 3, -3, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="relative mb-8 flex h-40 w-40 items-center justify-center rounded-[40%_60%_70%_30%/50%_60%_30%_50%] border border-onyx/15 bg-gradient-to-br from-cream/90 via-cherry/10 to-cream/40 p-1 backdrop-blur-md shadow-xl"
      >
        <div className="flex h-full w-full items-center justify-center rounded-[40%_60%_70%_30%/50%_60%_30%_50%] border border-onyx/5 bg-cream/80">
          <span className="font-display text-3xl font-light tracking-[0.2em] text-cherry/60 select-none">
            VORA
          </span>
        </div>
      </motion.div>

      {/* Typography Hierarchy */}
      <div className="max-w-md space-y-3">
        <span className="inline-block font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-cherry">
          TABLE RESERVATION
        </span>
        <h1 className="font-display text-3xl font-normal tracking-tight text-onyx sm:text-5xl">
          Your Table is Empty
        </h1>
        <p className="font-sans text-sm font-normal leading-relaxed text-slate/90 sm:text-base">
          No culinary selections made yet. Explore our contemporary Nigerian offerings and curate your dining experience.
        </p>
      </div>

      {/* CTA Button */}
      <Link
        href="/menu"
        className="group mt-10 inline-flex items-center gap-3 rounded-full bg-cherry px-8 py-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-cream shadow-lg shadow-cherry/20 transition-all duration-300 hover:bg-onyx hover:shadow-onyx/20 active:scale-95"
      >
        Explore Menu
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      {/* Header */}
      <div className="mb-8 border-b border-onyx/10 pb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cherry">
          Order Review
        </p>
        <h1 className="mt-1 font-display text-4xl uppercase leading-none tracking-tight text-onyx sm:text-5xl">
          Your Table
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-10 min-[950px]:grid-cols-12 xl:gap-14">
        {/* Left Column: Items List */}
        <div className="min-[950px]:col-span-7 xl:col-span-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="flex flex-col gap-6"
          >
            <AnimatePresence mode="popLayout">
              {items.map(({ dish, quantity }) => (
                <motion.div
                  key={dish.id}
                  layout
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  exit={{ opacity: 0, x: -50, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex flex-col gap-4 border-b border-onyx/10 pb-6 sm:flex-row sm:items-center sm:justify-between"
                >
                  {/* Dish Info with Blob Image */}
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 shrink-0 sm:h-24 sm:w-24">
                      <DishCard dish={dish} shape="blob" className="h-full w-full shadow-sm" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-onyx sm:text-xl">
                        {dish.name}
                      </h3>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate">
                        {dish.category}
                      </p>
                    </div>
                  </div>

                  {/* Controls & Line Total */}
                  <div className="flex items-center justify-between gap-2 sm:gap-6 sm:justify-end">
                    {/* Circular Quantity Stepper */}
                    <div className="flex items-center gap-2 rounded-full border border-onyx/15 px-2 py-1 shrink-0 sm:gap-3">
                      <motion.button
                        onClick={() => updateQuantity(dish.id, -1)}
                        whileTap={{ scale: 0.85 }}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-onyx transition-colors hover:bg-onyx/10"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </motion.button>
                      
                      <div className="w-5 text-center font-display text-sm font-bold tabular-nums text-onyx">
                        <AnimatePresence mode="popLayout" initial={false}>
                          <motion.span
                            key={quantity}
                            initial={{ y: 8, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -8, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="block"
                          >
                            {quantity}
                          </motion.span>
                        </AnimatePresence>
                      </div>

                      <motion.button
                        onClick={() => updateQuantity(dish.id, 1)}
                        whileTap={{ scale: 0.85 }}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-onyx transition-colors hover:bg-onyx/10"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </motion.button>
                    </div>

                    {/* Animated Line Total */}
                    <AnimatedPrice
                      value={dish.price * quantity}
                      className="min-w-[4.5rem] text-right font-display text-base font-bold text-onyx sm:min-w-[5rem] sm:text-lg"
                    />

                    {/* Delete Button */}
                    <motion.button
                      onClick={() => handleRemove(dish.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="shrink-0 text-slate transition-colors hover:text-cherry p-1"
                      aria-label={`Remove ${dish.name}`}
                    >
                      <Trash2 className="h-5 w-5" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Right Column: Order Summary Panel */}
        <div className="min-[950px]:col-span-5 xl:col-span-4">
          <div className="sticky top-24 rounded-2xl border border-onyx/10 bg-cream/50 p-6 shadow-sm backdrop-blur-sm sm:p-8">
            <h2 className="border-b border-onyx/10 pb-3 font-display text-xl font-bold uppercase text-onyx">
              Order Summary
            </h2>

            <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-slate">
              {totalQuantity} {totalQuantity === 1 ? "Item" : "Items"}
            </p>

            <div className="my-6 space-y-4 border-y border-onyx/10 py-4">
              <div className="flex justify-between text-sm font-medium text-slate">
                <span>Subtotal</span>
                <AnimatedPrice value={subtotal} className="font-bold text-onyx" />
              </div>
            </div>

            <div className="flex items-baseline justify-between text-lg font-bold text-onyx">
              <span>TOTAL</span>
              <AnimatedPrice value={subtotal} className="font-display text-2xl text-cherry" />
            </div>

            <Link
              href="/checkout"
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-cherry py-4 text-xs font-bold uppercase tracking-widest text-cream shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Checkout <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/menu"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-onyx/15 py-3 text-xs font-bold uppercase tracking-widest text-onyx hover:bg-onyx/5 transition-colors"
            >
              Back to Menu
            </Link>
          </div>
        </div>
      </div>

      {/* Undo Toast Notification */}
      <AnimatePresence>
        {deletedToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-6 z-50 flex items-center gap-4 rounded-xl border border-onyx/15 bg-onyx px-5 py-3.5 text-cream shadow-2xl"
          >
            <span className="text-sm font-medium">
              Removed {deletedToast.item.dish.name}
            </span>
            <button
              onClick={handleUndo}
              className="flex items-center gap-1.5 rounded-lg bg-cherry/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cherry hover:bg-cherry/30"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Undo
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}