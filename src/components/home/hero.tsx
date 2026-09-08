"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Flame, Clock, Star, Utensils, Sparkles } from "lucide-react";

const heroDishes = [
  {
    id: "chicken",
    name: "Garnished Whole Roasted Chicken",
    description: "Golden-roasted whole chicken infused with aromatic herbs, served on a bed of fresh greens and vibrant peppers.",
    image: "/images/home/chicken.png",
    spiceLevel: "Mild",
    prepTime: "30 mins",
  },
  {
    id: "drumsticks",
    name: "Spiced Drumstick Medley",
    description: "Crispy, glazed drumsticks tossed in signature Pan-African chili glazes and served with house dips.",
    image: "/images/home/drumsticks.png",
    spiceLevel: "Hot",
    prepTime: "20 mins",
  },
  {
    id: "grilledchicken",
    name: "Flamed Grilled Chicken Feast",
    description: "Charbroiled chicken cutlets marinated in West African suya spice and garnished with fresh onions and herbs.",
    image: "/images/home/grilledchicken.png",
    spiceLevel: "Hot",
    prepTime: "22 mins",
  },
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Interactive 3D Mouse Parallax & Holographic Angle Shift
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 120 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);

  // Subtle holographic sheen direction tracking
  const holoAngleTop = useSpring(useTransform(mouseX, [-0.5, 0.5], [120, 150]), springConfig);
  const holoAngleBottom = useSpring(useTransform(mouseY, [-0.5, 0.5], [300, 330]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xVal = (e.clientX - rect.left) / rect.width - 0.5;
    const yVal = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xVal);
    mouseY.set(yVal);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Auto-rotation loop
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroDishes.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const activeItem = heroDishes[currentIndex];

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full px-4 sm:px-6 lg:px-8 pt-4 -pb-1  overflow-hidden select-none"
    >
      {/* -------------------------------------------------------------------------- */}
      {/* DIAGONAL SUBTLE HOLOGRAPHIC GLASS LENSES (CONTAINED & NON-BLEEDING)        */}
      {/* -------------------------------------------------------------------------- */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Top-Left Diagonal Holographic Lens */}
        <motion.div 
          style={{
            background: useTransform(
              holoAngleTop,
              // Top-Left Lens Gradient
(angle) => `linear-gradient(${angle}deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 60%, rgba(255,255,255,0.01) 100%)`
            )
          }}
          className="absolute -top-24 -left-24 h-[420px] w-[420px] sm:h-[560px] sm:w-[560px] rounded-full border border-white/60 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.02)] [transform:rotate(-12deg)]"
        >
          {/* Subtle Prismatic Inset Edge Ring */}
          <div className="absolute inset-2 rounded-full border border-white/30 opacity-40" />
        </motion.div>
        
        {/* Bottom-Right Diagonal Holographic Lens */}
        <motion.div 
          style={{
            background: useTransform(
              holoAngleBottom,
             (angle) => `linear-gradient(${angle}deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.18) 100%)`
            )
          }}
          className="absolute -bottom-24 -right-24 h-[460px] w-[460px] sm:h-[620px] sm:w-[620px] rounded-full border border-white/60 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.02)] [transform:rotate(12deg)]"
        >
          {/* Subtle Prismatic Inset Edge Ring */}
          <div className="absolute inset-2 rounded-full border border-white/30 opacity-40" />
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Main Hero Layout Grid */}
        <div className="grid grid-cols-1 min-[950px]:grid-cols-12 gap-8 min-[950px]:gap-12 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="min-[950px]:col-span-6 space-y-6 sm:space-y-8">
            
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 rounded-full bg-cherry/10 px-4 py-1.5 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-cherry animate-pulse" />
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-cherry">
                VORA / SIGNATURE COLLECTION
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl min-[950px]:text-6xl font-normal leading-[1.08] text-onyx tracking-tight">
              Elevated Pan-African Cuisine.
            </h1>

            {/* Dynamic Dish Name & Description Sync */}
            <div className="min-h-[105px] space-y-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-1.5"
                >
                  <h2 className="font-display text-2xl sm:text-3xl font-medium text-cherry">
                    {activeItem.name}
                  </h2>
                  <p className="font-sans text-sm sm:text-base text-slate leading-relaxed max-w-xl">
                    {activeItem.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/menu"
                className="group inline-flex items-center gap-2.5 rounded-full bg-onyx px-8 py-4 font-sans text-xs font-bold uppercase tracking-widest text-cream shadow-2xl transition-all duration-300 hover:bg-cherry active:scale-95"
              >
                <span>Explore Full Menu</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/reservation"
                className="inline-flex items-center gap-2.5 rounded-full bg-cream/80 border border-onyx/5 px-8 py-4 font-sans text-xs font-bold uppercase tracking-widest text-onyx transition-all duration-300 hover:text-cherry active:scale-95 shadow-sm"
              >
                <span>Book a Table</span>
              </Link>
            </div>

            {/* Rating Stars & Proof */}
            <div className="pt-4 flex items-center gap-3">
              <div className="flex items-center gap-1 text-cherry">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-cherry" />
                ))}
              </div>
              <p className="font-sans text-xs sm:text-sm text-slate font-semibold">
                Over 1,000+ Reservations Curated
              </p>
            </div>

          </div>

          {/* Right Column: Interactive 3D Stage */}
          <div className="min-[950px]:col-span-6 relative flex items-center justify-center min-h-[480px] sm:min-h-[580px] min-[950px]:min-h-[660px]">
            
            {/* Parallax Motion Stage */}
            <motion.div
              style={{ rotateX, rotateY }}
              className="relative flex items-center justify-center w-full h-full [transform-style:preserve-3d]"
            >
              {/* Soft Ambient Glow */}
              <div className="absolute h-96 w-96 sm:h-[480px] sm:w-[480px] rounded-full bg-cherry/10 blur-3xl pointer-events-none z-0" />

              {/* Floating Stage Badges */}
              <div className="absolute top-2 left-6 z-20 flex items-center gap-2 rounded-full bg-cream/90 backdrop-blur-md px-4 py-2 border border-onyx/10 shadow-sm pointer-events-none [transform:translateZ(30px)]">
                <Utensils className="h-3.5 w-3.5 text-cherry" />
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-onyx">
                  Artisanal Plating
                </span>
              </div>

              <div className="absolute bottom-4 right-6 z-20 flex items-center gap-2 rounded-full bg-cream/90 backdrop-blur-md px-4 py-2 border border-onyx/10 shadow-sm pointer-events-none [transform:translateZ(30px)]">
                <Sparkles className="h-3.5 w-3.5 text-gold" />
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-onyx">
                  Fresh Ingredients
                </span>
              </div>

              {/* Food Image Asset */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    filter: "blur(8px)",
                    rotate: -4,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    rotate: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    filter: "blur(8px)",
                    rotate: 4,
                  }}
                  transition={{
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative z-10 h-[440px] w-[440px] sm:h-[540px] sm:w-[540px] min-[950px]:h-[620px] min-[950px]:w-[620px] drop-shadow-[0_30px_25px_rgba(0,0,0,0.25)] [transform:translateZ(50px)]"
                >
                  <Image
                    src={activeItem.image}
                    alt={activeItem.name}
                    fill
                    priority
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Floating Spice Badge */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`spice-${activeItem.id}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                  className="absolute top-16 right-4 sm:right-8 z-20 flex items-center gap-1.5 rounded-full bg-cream/90 backdrop-blur-md px-3.5 py-1.5 shadow-md border border-onyx/10 pointer-events-none [transform:translateZ(45px)]"
                >
                  <Flame className="h-3.5 w-3.5 text-cherry" />
                  <span className="font-sans text-xs font-bold text-onyx">
                    {activeItem.spiceLevel}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Floating Prep Time Badge */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`time-${activeItem.id}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                  className="absolute bottom-12 left-4 sm:left-8 z-20 flex items-center gap-1.5 rounded-full bg-cream/90 backdrop-blur-md px-3.5 py-1.5 shadow-md border border-onyx/10 pointer-events-none [transform:translateZ(45px)]"
                >
                  <Clock className="h-3.5 w-3.5 text-cherry" />
                  <span className="font-sans text-xs font-bold text-onyx">
                    {activeItem.prepTime}
                  </span>
                </motion.div>
              </AnimatePresence>

            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}