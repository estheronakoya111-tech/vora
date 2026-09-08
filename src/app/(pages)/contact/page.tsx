"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowRight, CheckCircle2, RotateCcw } from "lucide-react";
import CulinaryGuide from "@/components/contact/culinary-guide";
import DirectChannels from "@/components/contact/direct-channels";

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
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Auto-reset form view back to input mode after 6 seconds
    setTimeout(() => {
      handleResetForm();
    }, 6000);
  };

  const handleResetForm = () => {
    setFormSubmitted(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-16 space-y-24 sm:space-y-32">
      
      {/* 1. HERO SECTION */}
      <section className="space-y-4 max-w-3xl">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block font-sans text-xs font-bold uppercase tracking-[0.25em] text-cherry"
        >
          CONTACT VORA
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl font-normal leading-[1.1] text-onyx sm:text-6xl lg:text-7xl"
        >
          How can we help?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-sans text-base text-slate max-w-xl sm:text-lg"
        >
          Whether you&apos;re planning a dinner, looking for something on our menu, or simply have a question, we&apos;re here.
        </motion.p>
      </section>

      {/* 2. CULINARY GUIDE & DIRECT CHANNELS (SPLIT GRID) */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 items-stretch"
      >
        <motion.div variants={fadeInUp} className="lg:col-span-7">
          <CulinaryGuide />
        </motion.div>

        <motion.div variants={fadeInUp} className="lg:col-span-5">
          <DirectChannels />
        </motion.div>
      </motion.section>

      {/* 3. TRADITIONAL MESSAGE FORM */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="rounded-3xl border border-onyx/15 bg-cream/50 p-8 sm:p-12 backdrop-blur-sm space-y-8"
      >
        <motion.div variants={fadeInUp}>
          <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-cherry block mb-1">
            SEND US A MESSAGE
          </span>
          <h2 className="font-display text-3xl font-normal text-onyx sm:text-4xl">
            We&apos;d love to hear from you.
          </h2>
        </motion.div>

        <AnimatePresence mode="wait">
          {formSubmitted ? (
            <motion.div
              key="success-banner"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border border-cherry/20 bg-cherry/10 p-8 text-center space-y-4"
            >
              <CheckCircle2 className="mx-auto h-10 w-10 text-cherry" />
              <div className="space-y-1">
                <h3 className="font-display text-2xl font-bold text-onyx">Message Received</h3>
                <p className="font-sans text-sm text-slate max-w-md mx-auto">
                  Thank you for reaching out. A member of our hospitality team will respond shortly.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="inline-flex items-center gap-2 rounded-full border border-onyx/20 bg-cream px-6 py-2.5 font-sans text-xs font-bold uppercase tracking-wider text-onyx hover:bg-onyx hover:text-cream transition-colors shadow-sm"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Send Another Message</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="contact-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleFormSubmit}
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              <div className="space-y-2">
                <label className="font-sans text-xs font-bold uppercase tracking-wider text-slate">
                  Name
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your full name"
                  className="w-full rounded-2xl border border-onyx/20 bg-cream px-5 py-3.5 font-sans text-sm text-onyx focus:border-cherry focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="font-sans text-xs font-bold uppercase tracking-wider text-slate">
                  Email
                </label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full rounded-2xl border border-onyx/20 bg-cream px-5 py-3.5 font-sans text-sm text-onyx focus:border-cherry focus:outline-none"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="font-sans text-xs font-bold uppercase tracking-wider text-slate">
                  Subject
                </label>
                <input
                  required
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Inquiry subject"
                  className="w-full rounded-2xl border border-onyx/20 bg-cream px-5 py-3.5 font-sans text-sm text-onyx focus:border-cherry focus:outline-none"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="font-sans text-xs font-bold uppercase tracking-wider text-slate">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we assist you?"
                  className="w-full rounded-2xl border border-onyx/20 bg-cream px-5 py-3.5 font-sans text-sm text-onyx focus:border-cherry focus:outline-none resize-none"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto rounded-full bg-onyx px-8 py-4 font-sans text-xs font-bold uppercase tracking-widest text-cream transition-transform hover:scale-105 active:scale-95 shadow-md"
                >
                  Send Message <ArrowRight className="h-4 w-4 inline ml-1" />
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.section>

    </div>
  );
}