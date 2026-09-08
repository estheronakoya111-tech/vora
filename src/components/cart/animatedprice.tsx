"use client";

import { motion, AnimatePresence } from "framer-motion";

function formatPrice(price: number) {
  return `\u20a6${price.toLocaleString("en-NG")}`;
}

export function AnimatedPrice({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const formatted = formatPrice(value);

  return (
    <div className={`relative inline-flex overflow-hidden ${className || ""}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="inline-block whitespace-nowrap"
        >
          {formatted}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}