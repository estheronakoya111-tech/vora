"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { menuItems } from "@/data/menu";

// Individual 3D Interactive Card Component
function SignatureCard({
  dish,
}: {
  dish: (typeof menuItems)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tilt tracking values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 25 });

  // Subtle 3D tilt angles without visual distortion
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
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
    <div className="shrink-0 [perspective:1000px]">
      <Link
        href={`/menu?search=${encodeURIComponent(dish.name)}`}
        className="group block outline-none"
      >
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative flex flex-col space-y-4 rounded-3xl border border-onyx/10 bg-cream p-3 shadow-lg transition-all duration-500 group-hover:shadow-xl"
        >
          {/* Layer 1: Food Photograph Container */}
          <div
            style={{ transform: "translateZ(10px)" }}
            className="relative h-[280px] w-[240px] sm:h-[340px] sm:w-[300px] lg:h-[380px] lg:w-[340px] overflow-hidden rounded-2xl bg-onyx/5 shadow-md transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          >
            <Image
              src={dish.image}
              alt={dish.name}
              fill
              sizes="(max-width: 640px) 240px, (max-width: 1024px) 300px, 340px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>

          {/* Layer 2: Midground Info Section */}
          <div
            style={{ transform: "translateZ(5px)" }}
            className="w-[240px] sm:w-[300px] lg:w-[340px] space-y-1.5 px-2 pb-1"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display text-base sm:text-lg lg:text-xl font-medium text-onyx transition-colors duration-300 group-hover:text-cherry truncate">
                {dish.name}
              </h3>
              <span className="font-sans text-sm sm:text-base font-bold text-cherry shrink-0">
                ₦{dish.price.toLocaleString()}
              </span>
            </div>

            <p className="font-sans text-xs sm:text-sm text-slate font-normal leading-relaxed line-clamp-2">
              {dish.description}
            </p>
          </div>
        </motion.div>
      </Link>
    </div>
  );
}

export function SignatureDish() {
  const signatureDishes = menuItems.slice(0, 10);
  const marqueeItems = [...signatureDishes, ...signatureDishes];

  return (
    <section className="relative z-20 w-full bg-cream pt-6 sm:pt-10 pb-16 sm:pb-24 overflow-hidden select-none">
      
      {/* Header Container */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-3xl space-y-3"
        >
          {/* Eyebrow Text */}
          <span className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-cherry block">
            SIGNATURE DISHES
          </span>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-onyx leading-tight">
            A taste of what defines VORA.
          </h2>

          <p className="font-sans text-sm sm:text-base text-slate leading-relaxed pt-1">
            Every creation is a reflection of continental heritage—combining slow-cooked traditions, hand-selected indigenous spices, and contemporary plating techniques crafted for an unforgettable culinary journey.
          </p>
        </motion.div>
      </div>

      {/* -------------------------------------------------------------------------- */}
      {/* AUTOMATIC INFINITE MARQUEE TRACK                                           */}
      {/* -------------------------------------------------------------------------- */}
      <div className="relative z-10 w-full overflow-hidden py-4">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 42,
            repeat: Infinity,
          }}
          className="flex gap-6 sm:gap-8 lg:gap-10 w-max px-4"
        >
          {marqueeItems.map((dish, index) => (
            <SignatureCard
              key={`${dish.id}-${index}`}
              dish={dish}
              index={index}
            />
          ))}
        </motion.div>
      </div>

    </section>
  );
}