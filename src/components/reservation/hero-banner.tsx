"use client";

import { useRef, MouseEvent } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Crown } from "lucide-react";

export function HeroBanner() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax Mouse Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  function handleMouseMove(e: MouseEvent) {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ clipPath: "inset(10% 10% 10% 10% round 2rem)", scale: 1.08 }}
      animate={{ clipPath: "inset(0% 0% 0% 0% round 2rem)", scale: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative mb-12 h-[340px] w-full overflow-hidden rounded-3xl border border-onyx/10 shadow-lg sm:h-[420px]"
    >
      <motion.div
        style={{ x: springX, y: springY }}
        className="relative h-[115%] w-[115%] -left-[7.5%] -top-[7.5%]"
      >
        <Image
          src="/images/interior.jpg"
          alt="VORA Restaurant Interior"
          fill
          priority
          className="object-cover brightness-[0.65]"
        />
      </motion.div>

      {/* Hero Overlay Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-cream">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-cherry"
        >
          <Crown className="h-3.5 w-3.5" /> Table Reservation
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-3 font-display text-4xl uppercase tracking-tight sm:text-6xl lg:text-7xl"
        >
          A Table at Vora
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.5 }}
          className="mt-3 max-w-md text-xs font-medium tracking-wide text-cream/80 sm:text-sm"
        >
          Immerse yourself in our architectural dining space. Reserve your experience below.
        </motion.p>
      </div>
    </motion.div>
  );
}