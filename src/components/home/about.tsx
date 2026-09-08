"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import { Flame, Compass, Sparkles, Award, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Pillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: typeof Flame;
  image: string;
}

const pillars: Pillar[] = [
  {
    id: "roots",
    number: "01",
    title: "Indigenous Provenance",
    subtitle: "Ancestral Grains & Micro-Farms",
    description:
      "We source wild indigenous botanicals, fermented locust beans, and rare heirloom grains directly from smallholder farms across West and Central Africa.",
    icon: Compass,
    image: "/images/home/pepper.png",
  },
  {
    id: "craft",
    number: "02",
    title: "Woodfire Gastronomy",
    subtitle: "Smoke, Ember & Charcoal",
    description:
      "Our open-hearth kitchen harnesses ancestral woodfire techniques—using seasoned mahogany and fruitwood embers to imbue deep, multi-layered aromas.",
    icon: Flame,
    image: "/images/home/locust.png",
  },
  {
    id: "sanctuary",
    number: "03",
    title: "Sensory Sanctuary",
    subtitle: "Architectural Warmth",
    description:
      "Designed as an ode to pan-African craftsmanship, our dining room pairs textured earth tones and acoustic warmth with bespoke ceramic tableware.",
    icon: Sparkles,
    image: "/images/interior.jpg",
  },
];

const stats = [
  { numericValue: 14, suffix: "+", label: "Wild African Spices" },
  { numericValue: 100, suffix: "%", label: "Woodfire Prepared" },
  { numericValue: 3, suffix: "", label: "Curated Dining Spheres" },
  { numericValue: 4.9, suffix: "", label: "Guest Satisfaction", isDecimal: true },
];

// Animated Number Counter Component
function AnimatedCounter({
  target,
  suffix = "",
  isDecimal = false,
}: {
  target: number;
  suffix?: string;
  isDecimal?: boolean;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepTime = duration / steps;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-display text-3xl sm:text-4xl min-[950px]:text-5xl font-normal text-onyx tracking-tight">
      {isDecimal ? count.toFixed(1) : Math.floor(count)}
      {suffix}
    </span>
  );
}

export function About() {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentPillar = pillars[activeIndex];

  // Auto-cycle through images softly every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % pillars.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="about" className="relative z-20 w-full bg-cream py-6 sm:py-12 overflow-hidden select-none">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 left-0 -translate-x-1/2 h-96 w-96 rounded-full bg-cherry/5 blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-10 right-0 translate-x-1/3 h-96 w-96 rounded-full bg-gold/10 blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Category Eyebrow */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="h-px w-8 bg-cherry" />
          <span className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-cherry">
            OUR PHILOSOPHY & HERITAGE
          </span>
        </motion.div>

        {/* Editorial Split Hero Narrative */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid grid-cols-1 min-[950px]:grid-cols-12 gap-8 min-[950px]:gap-14 items-start mb-10 sm:mb-16"
        >
          
          {/* Main Display Headline (Left 7 Cols on Desktop >= 950px) */}
          <div className="min-[950px]:col-span-7 space-y-4">
            <h2 className="font-display text-3xl sm:text-5xl min-[950px]:text-6xl font-normal text-onyx leading-[1.12] tracking-tight">
              Where ancestral pan-African traditions meet <br className="hidden sm:inline" />
              <span className="italic font-light text-cherry">contemporary culinary art.</span>
            </h2>

            <div className="flex items-center gap-4 pt-1">
              <div className="h-10 w-10 rounded-full border border-onyx/15 bg-cream flex items-center justify-center shrink-0 shadow-sm">
                <Award className="h-5 w-5 text-cherry" />
              </div>
              <p className="font-sans text-xs sm:text-sm text-slate font-medium max-w-sm">
                Recognized for pioneering woodfire pan-African gastronomy and sustainable indigenous sourcing.
              </p>
            </div>
          </div>

          {/* Detailed Narrative Story (Right 5 Cols on Desktop >= 950px) */}
          <div className="min-[950px]:col-span-5 space-y-4 min-[950px]:pt-1">
            <p className="font-sans text-sm sm:text-base text-onyx leading-relaxed font-normal">
              VORA was born from a desire to redefine contemporary dining through the lens of West African provenance. Every menu is a living narrative—balancing intense woodfire smoke, wild botanicals, and indigenous fermentation.
            </p>

            <p className="font-sans text-sm text-slate leading-relaxed">
              We collaborate directly with artisan cultivators across the continent to preserve rare heirloom crops, bringing forgotten flavor profiles to the modern plate with architectural elegance.
            </p>

            {/* Signature Block */}
            <div className="p-4 rounded-2xl border border-onyx/10 bg-cream/80 backdrop-blur-md space-y-1.5">
              <p className="font-sans text-xs italic text-onyx leading-relaxed">
                &ldquo;We don’t modernize our heritage to alter it; we elevate it so the world can savor its true depth.&rdquo;
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="font-display text-xs font-bold text-onyx">Chef Adebayo Sanni</span>
                <span className="font-sans text-[10px] text-cherry font-semibold uppercase tracking-wider">Executive Chef</span>
              </div>
            </div>
          </div>

        </motion.div>

        {/* -------------------------------------------------------------------------- */}
        {/* INTERACTIVE PILLARS SHOWCASE WITH SOFT CROSSFADE IMAGES                     */}
        {/* -------------------------------------------------------------------------- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-1 min-[950px]:grid-cols-12 gap-6 min-[950px]:gap-10 items-stretch mb-12 sm:mb-16"
        >
          
          {/* Pillar Selector Buttons (Left 5 Cols on Desktop >= 950px) */}
          <div className="min-[950px]:col-span-5 flex flex-col justify-center space-y-3">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isActive = activeIndex === idx;

              return (
                <button
                  key={pillar.id}
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    "w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-500 outline-none group relative overflow-hidden",
                    isActive
                      ? "bg-cream border-cherry/40 shadow-md scale-[1.01]"
                      : "bg-cream/50 border-onyx/10 hover:border-onyx/20 hover:bg-cream/80"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className={cn("font-sans text-xs font-bold transition-colors", isActive ? "text-cherry" : "text-slate/60")}>
                        {pillar.number}
                      </span>
                      <Icon className={cn("h-4 w-4 transition-colors", isActive ? "text-cherry" : "text-slate")} />
                      <h3 className="font-display text-base sm:text-lg font-semibold text-onyx">
                        {pillar.title}
                      </h3>
                    </div>

                    <ArrowUpRight
                      className={cn(
                        "h-4 w-4 transition-transform duration-300",
                        isActive ? "text-cherry rotate-45" : "text-slate/40 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      )}
                    />
                  </div>

                  <p className="font-sans text-xs text-slate mt-2 pl-8 line-clamp-2 leading-relaxed">
                    {pillar.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Clean Image Showcase Container (Right 7 Cols on Desktop >= 950px) */}
          <div className="min-[950px]:col-span-7 relative min-h-[360px] sm:min-h-[440px] rounded-3xl overflow-hidden border border-onyx/10 shadow-xl bg-onyx/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPillar.id}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={currentPillar.image}
                  alt={currentPillar.title}
                  fill
                  priority
                  className="object-cover"
                />
                
                {/* Subtle vignette along bottom border only */}
                <div className="absolute inset-0 bg-gradient-to-t from-onyx/40 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            </AnimatePresence>

            {/* Top Right Clean Floating Badge */}
            <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-cream/80 backdrop-blur-md border border-onyx/10 shadow-sm">
              <span className="font-sans text-[11px] font-bold uppercase tracking-widest text-cherry">
                {currentPillar.number} / 03
              </span>
            </div>
          </div>

        </motion.div>

        {/* -------------------------------------------------------------------------- */}
        {/* REAL COUNTING ANIMATED STATS BANNER                                        */}
        {/* -------------------------------------------------------------------------- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="rounded-3xl border border-onyx/10 bg-cream/80 p-5 sm:p-8 backdrop-blur-md shadow-sm"
        >
          <div className="grid grid-cols-2 min-[950px]:grid-cols-4 gap-4 sm:gap-6 divide-y min-[950px]:divide-y-0 min-[950px]:divide-x divide-onyx/10">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={cn(
                  "text-center space-y-1",
                  idx > 0 && "pt-3 min-[950px]:pt-0"
                )}
              >
                <AnimatedCounter
                  target={stat.numericValue}
                  suffix={stat.suffix}
                  isDecimal={stat.isDecimal}
                />
                <p className="font-sans text-[11px] sm:text-xs font-medium text-slate uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}