"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Calendar,
  Clock,
  Users,
  Utensils,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const TIME_SLOTS = ["12:00 PM", "01:30 PM", "05:30 PM", "07:00 PM", "08:30 PM", "10:00 PM"];

const EXPERIENCES = [
  { id: "dining", title: "Main Dining Room", desc: "Vibrant atmosphere with ambient lighting." },
  { id: "chef", title: "Chef's Counter", desc: "Front-row seats to culinary craftsmanship." },
  { id: "private", title: "Private Suite", desc: "Exclusive enclave for intimate gatherings." },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

type FormProps = {
  onSuccess: (details: { name: string; date: string; time: string; guests: number; experience: string }) => void;
};

export function ReservationForm({ onSuccess }: FormProps) {
  // Get today's date formatted as YYYY-MM-DD for the default state and minimum input constraint
  const todayISO = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(todayISO);
  const [guests, setGuests] = useState(2);
  const [time, setTime] = useState(TIME_SLOTS[2]);
  const [experience, setExperience] = useState("dining");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    requests: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess({
        name: formData.name,
        date: selectedDate,
        time,
        guests,
        experience,
      });
    }, 1800);
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-10 min-[950px]:grid-cols-12 xl:gap-14"
    >
      {/* Left Options */}
      <div className="min-[950px]:col-span-7 xl:col-span-8 space-y-8">
        
        {/* Date Selector - Styled Native Date Picker */}
        <motion.div variants={itemVariants} className="rounded-3xl border border-onyx/10 bg-cream/50 p-6 backdrop-blur-sm sm:p-8">
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cherry">
            <Calendar className="h-4 w-4" /> 1. Select Date
          </label>
          <div className="mt-4">
            <input
              type="date"
              min={todayISO}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full max-w-xs rounded-2xl border border-onyx/15 bg-cream/80 px-5 py-3.5 font-display text-sm font-bold text-onyx outline-none transition-colors focus:border-cherry shadow-sm"
              required
            />
          </div>
        </motion.div>

        {/* Guest Counter */}
        <motion.div variants={itemVariants} className="rounded-3xl border border-onyx/10 bg-cream/50 p-6 backdrop-blur-sm sm:p-8">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cherry">
              <Users className="h-4 w-4" /> 2. Party Size
            </label>
            <div className="flex items-center gap-1 font-display text-2xl font-bold text-onyx">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={guests}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="inline-block"
                >
                  {guests}
                </motion.span>
              </AnimatePresence>
              <span className="text-xs font-semibold text-slate uppercase tracking-wider">
                {guests === 1 ? "Guest" : "Guests"}
              </span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setGuests(num)}
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-full font-display text-sm font-bold transition-all",
                  guests === num
                    ? "bg-cherry text-cream shadow-md scale-105"
                    : "border border-onyx/15 bg-cream/80 text-onyx hover:bg-onyx/5"
                )}
              >
                {num}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Time Selector */}
        <motion.div variants={itemVariants} className="rounded-3xl border border-onyx/10 bg-cream/50 p-6 backdrop-blur-sm sm:p-8">
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cherry">
            <Clock className="h-4 w-4" /> 3. Preferred Time
          </label>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {TIME_SLOTS.map((slot) => {
              const isSelected = time === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setTime(slot)}
                  className="relative rounded-full px-4 py-2 text-xs font-bold transition-colors"
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeTime"
                      className="absolute inset-0 rounded-full bg-cherry shadow-sm"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className={cn("relative z-10 tracking-wider", isSelected ? "text-cream" : "text-onyx")}>
                    {slot}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Atmosphere Cards */}
        <motion.div variants={itemVariants} className="rounded-3xl border border-onyx/10 bg-cream/50 p-6 backdrop-blur-sm sm:p-8">
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cherry">
            <Utensils className="h-4 w-4" /> 4. Atmosphere
          </label>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {EXPERIENCES.map((exp) => (
              <button
                key={exp.id}
                type="button"
                onClick={() => setExperience(exp.id)}
                className={cn(
                  "flex flex-col justify-between rounded-2xl border p-4 text-left transition-all",
                  experience === exp.id
                    ? "border-cherry bg-cherry/5 shadow-sm"
                    : "border-onyx/15 bg-cream/80 hover:border-onyx/30"
                )}
              >
                <span className="font-display text-sm font-bold text-onyx">
                  {exp.title}
                </span>
                <span className="mt-2 text-[11px] text-slate leading-relaxed">
                  {exp.desc}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Contact Form */}
      <motion.div variants={itemVariants} className="min-[950px]:col-span-5 xl:col-span-4">
        <div className="sticky top-24 rounded-3xl border border-onyx/10 bg-cream/60 p-6 backdrop-blur-sm sm:p-8 space-y-4 shadow-sm">
          <h2 className="border-b border-onyx/10 pb-3 font-display text-xl font-bold uppercase text-onyx">
            Guest Details
          </h2>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate block mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              placeholder="E.g. Esther Onakoya"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-xl border border-onyx/15 bg-cream/80 px-4 py-2.5 text-sm text-onyx outline-none focus:border-cherry"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate block mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="esther@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-xl border border-onyx/15 bg-cream/80 px-4 py-2.5 text-sm text-onyx outline-none focus:border-cherry"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate block mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              required
              placeholder="+234 800 000 0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full rounded-xl border border-onyx/15 bg-cream/80 px-4 py-2.5 text-sm text-onyx outline-none focus:border-cherry"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate block mb-1">
              Special Requests
            </label>
            <textarea
              rows={2}
              placeholder="Dietary preferences, anniversaries, etc."
              value={formData.requests}
              onChange={(e) => setFormData({ ...formData, requests: e.target.value })}
              className="w-full rounded-xl border border-onyx/15 bg-cream/80 px-4 py-2 text-sm text-onyx outline-none focus:border-cherry resize-none"
            />
          </div>

          <div className="border-t border-onyx/10 pt-4 space-y-1.5 text-xs text-slate">
            <div className="flex justify-between">
              <span>Date & Time:</span>
              <span className="font-bold text-onyx">{selectedDate}, {time}</span>
            </div>
            <div className="flex justify-between">
              <span>Party:</span>
              <span className="font-bold text-onyx">{guests} Guests</span>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-cherry py-4 text-xs font-bold uppercase tracking-widest text-cream shadow-md transition-all hover:bg-cherry/90"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <span>Complete Reservation</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </motion.form>
  );
}