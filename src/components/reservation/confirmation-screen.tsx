"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Users,
  Utensils,
  CalendarPlus,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

type ConfirmationProps = {
  details: {
    name: string;
    date: string;
    time: string;
    guests: number;
    experience: string;
  };
  onReset: () => void;
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function formatEditorialDate(dateStr: string) {
  if (!dateStr) return "Today";
  const parsed = new Date(dateStr);
  if (isNaN(parsed.getTime())) return dateStr;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

const EXPERIENCE_LABELS: Record<string, string> = {
  dining: "Main Dining Room",
  chef: "Chef's Counter",
  private: "Private Suite",
};

export function ConfirmationScreen({ details, onReset }: ConfirmationProps) {
  const formattedDate = formatEditorialDate(details.date);
  const zoneTitle = EXPERIENCE_LABELS[details.experience] || details.experience;

  const handleAddToCalendar = () => {
    const title = encodeURIComponent("Dinner at VORA");
    const detailsText = encodeURIComponent(
      `Reservation for ${details.guests} guests in the ${zoneTitle}.`
    );
    const location = encodeURIComponent("VORA Restaurant");
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${detailsText}&location=${location}`;
    window.open(calendarUrl, "_blank");
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-10 min-[950px]:grid-cols-12 xl:gap-14"
    >
      {/* Left Column: Full-Width Confirmation Overview */}
      <div className="min-[950px]:col-span-7 xl:col-span-8 space-y-6">
        <motion.div
          variants={itemVariants}
          className="rounded-3xl border border-onyx/10 bg-cream/50 p-8 backdrop-blur-sm sm:p-10"
        >
          <div className="flex items-center gap-3 text-cherry">
            <CheckCircle2 className="h-7 w-7" />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">
              Reservation Confirmed
            </span>
          </div>

          <h2 className="mt-4 font-display text-4xl font-bold uppercase tracking-tight text-onyx sm:text-5xl">
            Table Confirmed
          </h2>

          <p className="mt-2 text-sm text-slate">
            Thank you, <span className="font-bold text-onyx">{details.name || "Guest"}</span>. We look forward to hosting you at VORA.
          </p>

          {/* Grid Cards for Booking Details */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-onyx/10 bg-cream/80 p-5 space-y-1">
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate">
                <Calendar className="h-4 w-4 text-cherry" /> Date
              </span>
              <p className="font-display text-base font-bold text-onyx">
                {formattedDate}
              </p>
            </div>

            <div className="rounded-2xl border border-onyx/10 bg-cream/80 p-5 space-y-1">
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate">
                <Clock className="h-4 w-4 text-cherry" /> Time Slot
              </span>
              <p className="font-display text-base font-bold text-onyx">
                {details.time}
              </p>
            </div>

            <div className="rounded-2xl border border-onyx/10 bg-cream/80 p-5 space-y-1">
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate">
                <Users className="h-4 w-4 text-cherry" /> Party Size
              </span>
              <p className="font-display text-base font-bold text-onyx">
                {details.guests} {details.guests === 1 ? "Guest" : "Guests"}
              </p>
            </div>

            <div className="rounded-2xl border border-onyx/10 bg-cream/80 p-5 space-y-1">
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate">
                <Utensils className="h-4 w-4 text-cherry" /> Seating Zone
              </span>
              <p className="font-display text-base font-bold uppercase text-onyx">
                {zoneTitle}
              </p>
            </div>
          </div>

          <p className="mt-6 text-xs text-slate/80">
            * Note: Tables are held for 15 minutes past the scheduled reservation time.
          </p>
        </motion.div>
      </div>

      {/* Right Column: VORA Dining Pass Actions */}
      <motion.div variants={itemVariants} className="min-[950px]:col-span-5 xl:col-span-4">
        <div className="sticky top-24 rounded-3xl border border-onyx/10 bg-cream/60 p-6 backdrop-blur-sm sm:p-8 space-y-6 shadow-sm">
          <div className="border-b border-onyx/10 pb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cherry">
              VORA Dining Pass
            </span>
            <h3 className="mt-1 font-display text-2xl font-bold uppercase text-onyx">
              {details.name || "Guest Pass"}
            </h3>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={handleAddToCalendar}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-onyx/20 bg-cream py-4 text-xs font-bold uppercase tracking-wider text-onyx transition-all hover:bg-onyx/5 active:scale-95 shadow-sm"
            >
              <CalendarPlus className="h-4 w-4 text-cherry" /> Add To Calendar
            </button>

            <Link
              href="/menu"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-onyx py-4 text-xs font-bold uppercase tracking-wider text-cream transition-all hover:bg-onyx/90 active:scale-95 shadow-md"
            >
              Explore Menu <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="border-t border-onyx/10 pt-4 text-center">
            <button
              type="button"
              onClick={onReset}
              className="text-xs font-bold uppercase tracking-widest text-cherry hover:opacity-80"
            >
              Modify Reservation Details
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}