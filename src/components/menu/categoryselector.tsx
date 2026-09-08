"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const categories = [
  "All",
  "Rice",
  "Soups & Swallows",
  "Grills & Specials",
  "Snacks & Sides",
  "African Specials",
  "Drinks",
];

interface CategorySelectorProps {
  active: string;
  onChange: (category: string) => void;
}

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.02 },
  },
};

const item = {
  hidden: { opacity: 0, y: 6, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export function CategorySelector({ active, onChange }: CategorySelectorProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex flex-wrap justify-center gap-2"
    >
      {categories.map((cat) => {
        const isActive = active === cat;
        return (
          <motion.button
            key={cat}
            variants={item}
            onClick={() => onChange(cat)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              !isActive && "border border-onyx/15"
            )}
          >
            {isActive && (
              <motion.span
                layoutId="category-pill"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
                className="absolute inset-0 rounded-full bg-onyx"
              />
            )}
            <span
              className={cn(
                "relative z-10 whitespace-nowrap",
                isActive ? "text-cream" : "text-onyx hover:text-cherry"
              )}
            >
              {cat}
            </span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}