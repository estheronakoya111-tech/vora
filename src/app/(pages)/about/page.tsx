"use client";

import { useRef, useState, MouseEvent } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  MapPin,
  Clock,
  Compass,
  Sparkles,
  Flame,
} from "lucide-react";
import { menuItems } from "@/data/menu";

// --- Framer Motion Variants ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

// --- Extract unique ingredients from menu data ---
const CRAFT_INGREDIENTS = Array.from(
  new Set(
    menuItems.flatMap((item) =>
      item.ingredients ? item.ingredients : item.description.split(", ")
    )
  )
)
  .slice(0, 8)
  .map((ing) => ({
    name: ing.trim(),
    note: `Hand-selected element sourced directly from VORA's signature woodfire menu.`,
  }));

const PHILOSOPHIES = [
  {
    num: "01",
    title: "ROOTED PROVENANCE",
    tagline: "Ancestral Grains & Wild Botanicals",
    desc: "We honor the native ingredients, fermentations, and traditional smoke recipes that define pan-African gastronomy.",
    bgImage: "/images/interior.jpg",
  },
  {
    num: "02",
    title: "WOODFIRE CRAFT",
    tagline: "Ember, Smoke & Intention",
    desc: "From mahogany ember roasting to bespoke plate presentation, every detail serves a sensory culinary purpose.",
    bgImage: "/images/interior.jpg",
  },
  {
    num: "03",
    title: "ARCHITECTURAL HEARTH",
    tagline: "Shared Moments & Sanctuary",
    desc: "VORA is engineered around the intimacy of the dining table — designed for connection, memory, and lingering conversations.",
    bgImage: "/images/interior.jpg",
  },
];

// --- 3D Tilt Card Component ---
function TiltPhilosophyCard({
  num,
  title,
  tagline,
  desc,
  bgImage,
}: {
  num: string;
  title: string;
  tagline: string;
  desc: string;
  bgImage: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setRotateX((y - centerY) / -16);
    setRotateY((x - centerX) / 16);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      style={{ transformStyle: "preserve-3d" }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-onyx/15 bg-cream/90 p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-xl"
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.2, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <Image src={bgImage} alt={title} fill className="object-cover brightness-50" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-cherry">
            {num}
          </span>
          <Flame className="h-4 w-4 text-cherry/60 transition-transform duration-300 group-hover:scale-125" />
        </div>
        <h3 className="font-display text-xl sm:text-2xl font-normal text-onyx tracking-tight">
          {title}
        </h3>
        <p className="font-sans text-xs italic text-slate">{tagline}</p>
      </div>

      <p className="relative z-10 font-sans text-xs sm:text-sm leading-relaxed text-slate/90 pt-4 border-t border-onyx/10 mt-6">
        {desc}
      </p>
    </motion.div>
  );
}

export default function AboutPage() {
  // Video Scroll Transformation
  const videoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: videoScroll } = useScroll({
    target: videoRef,
    offset: ["start end", "center center"],
  });
  const videoRotateX = useTransform(videoScroll, [0, 1], [10, 0]);
  const videoScale = useTransform(videoScroll, [0, 1], [0.96, 1]);

  // Active Ingredient State
  const [activeIngredient, setActiveIngredient] = useState(
    CRAFT_INGREDIENTS[0] || { name: "Woodfire Suya Spice", note: "House-milled African pepper blend." }
  );

  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8 lg:py-8 space-y-16 sm:space-y-24 select-none overflow-hidden">
      
      {/* Soft Ambient Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-80 w-[80%] rounded-full bg-cherry/5 blur-3xl pointer-events-none z-0" />
      <div className="absolute top-1/2 right-0 translate-x-1/3 h-96 w-96 rounded-full bg-gold/10 blur-3xl pointer-events-none z-0" />

      {/* -------------------------------------------------------------------------- */}
      {/* 1. EDITORIAL HERO SECTION                                                  */}
      {/* -------------------------------------------------------------------------- */}
      <section className="relative z-10 pt-2 pb-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl space-y-4"
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-3">
            <span className="h-px w-8 bg-cherry" />
            <span className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-cherry">
              ABOUT VORA
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] text-onyx tracking-tight"
          >
            A taste of home, <br />
            <span className="italic font-light text-cherry">architecturally reimagined.</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="font-sans text-sm sm:text-base lg:text-lg leading-relaxed text-slate max-w-2xl pt-1"
          >
            VORA brings the depth of West African woodfire gastronomy into a contemporary sanctuary — celebrating wild spices, intentional craft, and a table built for connection.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="pt-4 flex items-center gap-2 text-[11px] font-sans font-bold uppercase tracking-widest text-slate/70"
          >
            <span>Scroll to explore</span>
            <ArrowDown className="h-3.5 w-3.5 animate-bounce text-cherry" />
          </motion.div>
        </motion.div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 2. CINEMATIC REEL SHOWCASE                                                 */}
      {/* -------------------------------------------------------------------------- */}
      <div ref={videoRef} className="perspective-1000 z-10 relative">
        <motion.section
          style={{ rotateX: videoRotateX, scale: videoScale }}
          className="mx-auto w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-onyx/15 shadow-2xl bg-onyx/5"
        >
          <div className="relative aspect-[16/9] lg:aspect-[21/9] w-full">
            <video autoPlay muted loop playsInline className="h-full w-full object-cover brightness-95">
              <source src="/images/about.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-onyx/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.section>
      </div>

      {/* -------------------------------------------------------------------------- */}
      {/* 3. OUR STORY & COMPACT DUAL PHOTO DISPLAY                                 */}
      {/* -------------------------------------------------------------------------- */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={staggerContainer}
        className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-center z-10 relative"
      >
        <motion.div variants={fadeInUp} className="lg:col-span-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="h-px w-6 bg-cherry" />
            <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-cherry">
              OUR PROVENANCE
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-onyx">
            Rooted in ember. <br />
            <span className="italic font-light text-cherry">Served for the modern palate.</span>
          </h2>

          <div className="space-y-3 font-sans text-xs sm:text-sm leading-relaxed text-slate">
            <p>
              VORA was created to elevate pan-African woodfire traditions into an architectural dining narrative. Inspired by wild botanicals, native fermentations, and ancestral hearth cooking, every course tells a story of origin.
            </p>
            <p>
              We collaborate directly with smallholder cultivators across West Africa to harvest heirloom grains and rare spices—bringing raw, unforgettable depth to every modern plate.
            </p>
          </div>
        </motion.div>

        {/* Dual Frame Display */}
        <motion.div variants={fadeInUp} className="lg:col-span-6 relative h-[320px] sm:h-[360px] w-full flex items-center justify-center">
          <div className="absolute left-0 top-0 h-[220px] sm:h-[250px] w-[55%] overflow-hidden rounded-2xl border border-onyx/15 shadow-lg">
            <Image src="/images/interior.jpg" alt="VORA Ambience" fill className="object-cover" />
          </div>

          <div className="absolute right-0 bottom-0 h-[220px] sm:h-[250px] w-[55%] overflow-hidden rounded-2xl border border-onyx/15 shadow-2xl z-10">
            <Image src="/images/interior.jpg" alt="VORA Dining Detail" fill className="object-cover brightness-90" />
          </div>
        </motion.div>
      </motion.section>

      {/* -------------------------------------------------------------------------- */}
      {/* 4. OUR PHILOSOPHIES                                                         */}
      {/* -------------------------------------------------------------------------- */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={staggerContainer}
        className="space-y-6 z-10 relative"
      >
        <motion.div variants={fadeInUp} className="flex items-center justify-between border-b border-onyx/10 pb-3">
          <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-cherry">
            OUR PHILOSOPHY
          </span>
          <span className="font-sans text-[10px] font-semibold text-slate uppercase tracking-widest">
            3 CORE PILLARS
          </span>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {PHILOSOPHIES.map((item) => (
            <TiltPhilosophyCard key={item.num} {...item} />
          ))}
        </div>
      </motion.section>

      {/* -------------------------------------------------------------------------- */}
      {/* 5. INGREDIENTS OF CRAFT                                                    */}
      {/* -------------------------------------------------------------------------- */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={staggerContainer}
        className="rounded-2xl sm:rounded-3xl border border-onyx/15 bg-cream/80 p-6 sm:p-10 backdrop-blur-md space-y-6 shadow-sm z-10 relative"
      >
        <motion.div variants={fadeInUp} className="flex items-center gap-2 text-cherry">
          <Sparkles className="h-4 w-4" />
          <span className="font-sans text-xs font-bold uppercase tracking-[0.25em]">
            THE INGREDIENTS OF CRAFT
          </span>
        </motion.div>

        <motion.div variants={fadeInUp} className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-center">
          {/* Ingredient Selector Pills */}
          <div className="lg:col-span-7 flex flex-wrap gap-2">
            {CRAFT_INGREDIENTS.map((item) => {
              const isActive = activeIngredient.name === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveIngredient(item)}
                  className={`rounded-full px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? "bg-cherry text-cream shadow-md scale-105"
                      : "border border-onyx/15 bg-cream text-onyx hover:border-cherry/40 hover:bg-cream/90"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* Active Profile Box */}
          <div className="lg:col-span-5 rounded-xl border border-onyx/10 bg-cream p-5 space-y-1.5 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-widest text-cherry block">
              FLAVOR PROFILE
            </span>
            <h4 className="font-display text-lg sm:text-xl font-normal text-onyx">
              {activeIngredient.name}
            </h4>
            <p className="font-sans text-xs sm:text-sm text-slate leading-relaxed">
              {activeIngredient.note}
            </p>
          </div>
        </motion.div>
      </motion.section>

      {/* -------------------------------------------------------------------------- */}
      {/* 6. FIND VORA (LOCATION & OPERATING HOURS)                                 */}
      {/* -------------------------------------------------------------------------- */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={staggerContainer}
        className="border-t border-onyx/10 pt-10 space-y-8 z-10 relative"
      >
        <motion.div variants={fadeInUp} className="flex items-center justify-between border-b border-onyx/10 pb-3">
          <div className="flex items-center gap-2 text-cherry">
            <Compass className="h-4 w-4" />
            <span className="font-sans text-xs font-bold uppercase tracking-[0.25em]">
              FIND VORA
            </span>
          </div>
          <span className="font-sans text-[11px] font-bold uppercase tracking-widest text-slate">
            VICTORIA ISLAND, LAGOS
          </span>
        </motion.div>

        <motion.div variants={fadeInUp} className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-start">
          <div className="lg:col-span-6 space-y-3">
            <span className="flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider text-slate">
              <MapPin className="h-3.5 w-3.5 text-cherry" /> Address
            </span>
            <div className="font-sans text-xl sm:text-2xl leading-snug text-onyx font-semibold">
              Plot 12 Ahmadu Bello Way <br />
              Victoria Island <br />
              <span className="text-slate font-normal text-base">Lagos, Nigeria</span>
            </div>

            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-widest text-cherry hover:underline pt-1"
            >
              <span>GET DIRECTIONS</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="lg:col-span-6 space-y-3">
            <span className="flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider text-slate">
              <Clock className="h-3.5 w-3.5 text-cherry" /> Operating Hours
            </span>

            <div className="space-y-2.5 font-sans text-xs sm:text-sm text-onyx">
              <div className="flex justify-between border-b border-onyx/10 pb-2">
                <span className="text-slate font-medium">Tue — Thu</span>
                <span className="font-semibold">17:00 — 23:00</span>
              </div>
              <div className="flex justify-between border-b border-onyx/10 pb-2">
                <span className="text-slate font-medium">Fri — Sat</span>
                <span className="font-semibold">17:00 — 00:00</span>
              </div>
              <div className="flex justify-between border-b border-onyx/10 pb-2">
                <span className="text-slate font-medium">Sun</span>
                <span className="font-semibold">16:00 — 22:00</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* -------------------------------------------------------------------------- */}
      {/* 7. FINAL CALL TO ACTION                                                    */}
      {/* -------------------------------------------------------------------------- */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="text-center space-y-6 pt-6 pb-4 border-t border-onyx/10 z-10 relative"
      >
        <motion.div variants={fadeInUp} className="space-y-2">
          <h2 className="font-display text-3xl sm:text-5xl font-normal text-onyx">
            A seat at the hearth awaits.
          </h2>
          <p className="font-sans text-xs sm:text-sm text-slate max-w-sm mx-auto">
            Experience the depth of pan-African woodfire gastronomy.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <Link
            href="/menu"
            className="w-full sm:w-auto flex-1 rounded-full border border-onyx bg-cream px-6 py-3 font-sans text-xs font-bold uppercase tracking-widest text-onyx transition-all duration-300 hover:bg-onyx hover:text-cream shadow-sm text-center"
          >
            Culinary Menu
          </Link>
          <Link
            href="/reservation"
            className="w-full sm:w-auto flex-1 rounded-full bg-cherry px-6 py-3 font-sans text-xs font-bold uppercase tracking-widest text-cream transition-all duration-300 hover:bg-cherry/90 shadow-md text-center"
          >
            Reserve A Table
          </Link>
        </motion.div>
      </motion.section>

    </div>
  );
}