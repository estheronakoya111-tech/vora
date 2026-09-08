"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { useCart } from "./cartcontext";
import { AnimatedPrice } from "./animatedprice";

export function FloatingCart() {
  const { totalQuantity, subtotal, isHydrated } = useCart();
  const pathname = usePathname();

  // Hide completely if on /cart or /checkout routes
  const isHiddenRoute = pathname === "/cart" || pathname === "/checkout";

  if (!isHydrated || totalQuantity === 0 || isHiddenRoute) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
        className="fixed bottom-16 right-4 z-40 sm:bottom-28 sm:right-8"
      >
        <Link
          href="/cart"
          className="flex items-center gap-2 sm:gap-3.5 rounded-full border border-onyx/20 bg-cream/95 px-3.5 py-2 sm:px-5 sm:py-3 text-onyx shadow-xl backdrop-blur-md transition-all hover:scale-105 active:scale-95"
          aria-label="View your cart"
        >
          {/* Shopping Cart Icon with Badge */}
          <div className="relative flex items-center justify-center">
            <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-onyx" />
            <motion.span
              key={totalQuantity}
              initial={{ scale: 0.3, y: -5 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
              className="absolute -right-2 -top-2 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-cherry text-[10px] sm:text-xs font-black text-cream shadow-md"
            >
              {totalQuantity}
            </motion.span>
          </div>

          {/* Subtotal & Label */}
          <div className="flex items-center gap-1 text-xs sm:text-sm font-bold tracking-wide">
            <span className="text-slate hidden xs:inline">Cart ·</span>
            <AnimatedPrice value={subtotal} className="font-display text-xs sm:text-base text-onyx" />
          </div>

          {/* Action Circle */}
          <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-cherry text-cream shadow-sm">
            <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </div>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}