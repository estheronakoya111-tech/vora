"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

const row1Testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Amina Bello",
    role: "Food & Wine Critic",
    quote: "Chef Sanni’s woodfire smoking elevates West African flavors into pure contemporary art.",
    rating: 5,
  },
  {
    id: 2,
    name: "Dr. Marcus Vance",
    role: "Culinary Historian",
    quote: "An unforgettable dining journey. The depth of indigenous spices is completely unmatched.",
    rating: 5,
  },
  {
    id: 3,
    name: "Chidimma Okafor",
    role: "Lifestyle Editor",
    quote: "VORA is a living celebration of pan-African heritage. Atmosphere and taste are 10/10.",
    rating: 5,
  },
  {
    id: 4,
    name: "Elena Rostova",
    role: "Global Travel Journal",
    quote: "Sensory mastery from start to finish. The hospitality mirrors top Michelin standards.",
    rating: 5,
  },
];

const row2Testimonials: Testimonial[] = [
  {
    id: 5,
    name: "Julian Thorne",
    role: "Sommelier",
    quote: "The wine pairings alongside signature spice profiles create an unparalleled experience.",
    rating: 5,
  },
  {
    id: 6,
    name: "Tunde Folawiyo",
    role: "Patron",
    quote: "Every single dish tells an authentic story. The ambiance makes every dinner memorable.",
    rating: 5,
  },
  {
    id: 7,
    name: "Sophia Chen",
    role: "Gastronomy Writer",
    quote: "Impeccable balance of smoke, spice, and texture. A benchmark for fine dining.",
    rating: 5,
  },
  {
    id: 8,
    name: "Kofi Mensah",
    role: "Architecture & Design",
    quote: "The interior lighting and physical detail mirror the exquisite precision on the plate.",
    rating: 5,
  },
];

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <div className="w-[260px] sm:w-[320px] shrink-0 p-5 rounded-2xl border border-onyx/10 bg-cream/90 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-cherry/30 hover:shadow-md">
      <div className="flex items-center justify-between mb-3">
        <Quote className="h-4 w-4 text-cherry/40" />
        <div className="flex items-center gap-0.5">
          {Array.from({ length: item.rating }).map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-gold text-gold" />
          ))}
        </div>
      </div>

      <p className="font-sans text-xs sm:text-sm text-onyx leading-relaxed font-medium mb-4 line-clamp-3">
        &ldquo;{item.quote}&rdquo;
      </p>

      <div className="border-t border-onyx/10 pt-3">
        <h3 className="font-display text-xs sm:text-sm font-bold text-onyx">
          {item.name}
        </h3>
        <p className="font-sans text-[11px] text-slate">
          {item.role}
        </p>
      </div>
    </div>
  );
}

export function Testimonials() {
  const [isHovered, setIsHovered] = useState(false);

  // Duplicated arrays for seamless infinite track loop
  const duplicatedRow1 = [...row1Testimonials, ...row1Testimonials];
  const duplicatedRow2 = [...row2Testimonials, ...row2Testimonials];

  return (
    <section className="relative z-20 w-full bg-cream pt-0 sm:pt-2 pb-16 sm:pb-24 overflow-hidden select-none">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-[80%] rounded-full bg-cherry/5 blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-xl mx-auto space-y-3 mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-onyx/10 bg-cream/80 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-cherry shadow-sm backdrop-blur-md">
            <Star className="h-3 w-3 fill-gold text-gold" />
            <span>4.9 Rated by Guests</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-normal text-onyx leading-[1.1] tracking-tight">
            Words of praise from others <br className="hidden sm:block" />
            <span className="italic font-light text-cherry">about our presence.</span>
          </h2>
        </div>

        {/* -------------------------------------------------------------------------- */}
        {/* DUAL DAMPED INFINITE TRACKS WITH EDGE GRADIENT VIGNETTES                   */}
        {/* -------------------------------------------------------------------------- */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          className="relative w-full overflow-hidden space-y-4 sm:space-y-6"
        >
          {/* Left & Right Fade Vignettes */}
          <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-cream to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-cream to-transparent z-20 pointer-events-none" />

          {/* Row 1: Sliding Left (Damps to 140s on hover/touch) */}
          <div className="flex w-max overflow-hidden">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                ease: "linear",
                duration: isHovered ? 140 : 28,
                repeat: Infinity,
              }}
              className="flex gap-4 sm:gap-6 pr-4 sm:pr-6"
            >
              {duplicatedRow1.map((item, index) => (
                <TestimonialCard key={`row1-${item.id}-${index}`} item={item} />
              ))}
            </motion.div>
          </div>

          {/* Row 2: Sliding Right (Damps to 160s on hover/touch) */}
          <div className="flex w-max overflow-hidden">
            <motion.div
              animate={{ x: ["-50%", "0%"] }}
              transition={{
                ease: "linear",
                duration: isHovered ? 160 : 32,
                repeat: Infinity,
              }}
              className="flex gap-4 sm:gap-6 pr-4 sm:pr-6"
            >
              {duplicatedRow2.map((item, index) => (
                <TestimonialCard key={`row2-${item.id}-${index}`} item={item} />
              ))}
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}