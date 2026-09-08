"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Award, Flame, GraduationCap, UtensilsCrossed } from "lucide-react";

export function Chef() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking physics for 3D Parallax Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative z-20 w-full bg-cream pt-2 sm:pt-4 pb-16 sm:pb-24 overflow-hidden select-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Split-Screen Layout: Text First on Mobile, Left Column on Desktop */}
        <div className="grid grid-cols-1 min-[1050px]:grid-cols-12 gap-12 min-[1050px]:gap-16 items-center">
          
          {/* Column 1: Culinary Philosophy & Chef Sanni's Story */}
          <div className="min-[1050px]:col-span-6 space-y-6 sm:space-y-8 order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-3"
            >
              <span className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-cherry block">
                MEET OUR CHEF
              </span>

              <h2 className="font-display text-3xl sm:text-4xl min-[1050px]:text-5xl font-normal text-onyx leading-tight">
                Crafted by Chef Sanni.
              </h2>
            </motion.div>

            {/* Editorial Copy Fade Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.15 }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-4 font-sans text-sm sm:text-base text-slate leading-relaxed"
            >
              <p>
                Having graduated from world-class culinary academy, Chef Sanni brings classically trained precision to indigenous African flavors. At VORA, his vision bridges refined European culinary technique with centuries-old pan-African traditions.
              </p>
              <p>
                From slow-smoked woodfire grills to hand-selected wild spices, Chef Sanni meticulously balances taste, texture, and heritage—creating an elevated dining experience with every single plate.
              </p>
            </motion.div>

            {/* Key Pillar Highlights Fade Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-2 gap-4 border-t border-b border-onyx/10 py-6"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-cherry font-bold text-xs uppercase tracking-wider">
                  <GraduationCap className="h-4 w-4" />
                  <span>Culinary Graduate</span>
                </div>
                <p className="font-sans text-xs text-slate">Classically trained in international gastronomy.</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-cherry font-bold text-xs uppercase tracking-wider">
                  <UtensilsCrossed className="h-4 w-4" />
                  <span>Modern Mastery</span>
                </div>
                <p className="font-sans text-xs text-slate">Elevated pan-African presentation.</p>
              </div>
            </motion.div>
          </div>

          {/* Column 2: Borderless 3D Interactive Parallax Stage with Scroll Reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="min-[1050px]:col-span-6 relative flex items-center justify-center order-2 [perspective:1200px]"
          >
            {/* 3D Motion Stage Wrapper */}
            <motion.div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative w-full max-w-[480px] min-[1050px]:max-w-none h-[420px] sm:h-[520px] min-[1050px]:h-[580px] flex items-center justify-center cursor-grab active:cursor-grabbing"
            >
              {/* Layer 1 (Background): Soft Architectural Arch & Glow */}
              <div
                style={{ transform: "translateZ(10px)" }}
                className="absolute inset-x-8 top-12 bottom-0 rounded-t-[140px] sm:rounded-t-[180px] bg-gradient-to-b from-cherry/10 via-onyx/5 to-transparent border-t border-x border-onyx/10 backdrop-blur-3xl"
              />

              {/* Layer 2 (Midground): Borderless Chef Sanni Illustration */}
              <div
                style={{ transform: "translateZ(30px)" }}
                className="relative z-10 h-full w-full max-h-[460px] sm:max-h-[520px] filter drop-shadow-[0_25px_30px_rgba(0,0,0,0.22)]"
              >
                <Image
                  src="/images/home/chef.png"
                  alt="Executive Chef Sanni Illustration"
                  fill
                  priority
                  className="object-contain object-bottom pointer-events-none"
                />
              </div>

              {/* Layer 3 (Foreground): Floating 3D Pill Badges */}
              <div
                style={{ transform: "translateZ(60px)" }}
                className="absolute top-8 right-4 sm:right-8 z-20 flex items-center gap-2 rounded-full bg-cream/90 px-4 py-2 shadow-xl border border-onyx/10 backdrop-blur-md"
              >
                <Award className="h-4 w-4 text-cherry" />
                <span className="font-sans text-[11px] font-bold uppercase tracking-widest text-onyx">
                  Chef Sanni
                </span>
              </div>

              <div
                style={{ transform: "translateZ(60px)" }}
                className="absolute bottom-8 left-4 sm:left-8 z-20 flex items-center gap-2 rounded-full bg-cream/90 px-4 py-2 shadow-xl border border-onyx/10 backdrop-blur-md"
              >
                <Flame className="h-4 w-4 text-gold" />
                <span className="font-sans text-[11px] font-bold uppercase tracking-widest text-onyx">
                  Executive Chef
                </span>
              </div>
            </motion.div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}