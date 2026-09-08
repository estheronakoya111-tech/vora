// DishCard.tsx
"use client";

import Image from "next/image";
import { motion, type PanInfo } from "framer-motion";
import { cn } from "@/lib/utils";
import type { MenuItem } from "@/data/menu";

type Shape = "blob" | "circle" | "arch" | "square";

const shapeStyle: Record<Shape, React.CSSProperties> = {
 blob: { borderRadius: "58% 42% 55% 45% / 55% 45% 60% 40%" },
 circle: { borderRadius: "9999px" },
 arch: { borderRadius: "50% 50% 0 0 / 100% 100% 0 0" },
 square: { borderRadius: "1rem" },
}; 

interface DishCardProps {
  dish: MenuItem;
  shape?: Shape;
  className?: string;
  onClick?: () => void;
  onDoubleClick?: () => void;
  draggable?: boolean;
  priority?: boolean;
  onDragEnd?: (event: unknown, info: PanInfo) => void;
}

export function DishCard({
  dish,
  shape = "square",
  className,
  onClick,
  onDoubleClick,
  draggable = false,
  priority = false,
  onDragEnd,
}: DishCardProps) {
  return (
    <motion.div
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      drag={draggable}
      dragConstraints={{ top: -10, bottom: 10, left: -10, right: 10 }}
      dragElastic={0.4}
      onDragEnd={onDragEnd}
      initial="rest"
      whileHover="hover"
      animate="rest"
      whileTap={onClick || draggable ? { scale: 0.96 } : undefined}
      // Card itself no longer scales on hover — that was the bug: it grew
      // beyond its own box and visually overlapped the caption/text below it.
      // Only the image inside now zooms, and that's clipped by overflow-hidden.
      variants={{ rest: { scale: 1 }, hover: { scale: 1 } }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      style={shapeStyle[shape]}
      className={cn(
        "relative overflow-hidden shadow-sm",
        (onClick || draggable) && "cursor-pointer",
        className
      )}
    >
      <motion.div
        variants={{ rest: { scale: 1 }, hover: { scale: 1.12 } }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative h-full w-full"
      >
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          priority={priority}
          draggable={false}
          sizes="(max-width: 768px) 60vw, (max-width: 1024px) 40vw, 33vw"
          className="object-cover"
        />
      </motion.div>
    </motion.div>
  );
}