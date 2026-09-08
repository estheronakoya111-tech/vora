"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ShieldCheck, FileText, ArrowUpRight, Lock, Key, AlertCircle } from "lucide-react";
import Link from "next/link";

type LegalTab = "privacy" | "terms";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

function LegalContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState<LegalTab>("privacy");

  // Sync active tab state with the URL query parameter
  useEffect(() => {
    if (tabParam === "terms" || tabParam === "privacy") {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-14 space-y-10 select-none">
      
      {/* DEMO NOTICE BANNER */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-cherry/20 bg-cherry/10 p-4 sm:p-5 text-onyx backdrop-blur-md flex items-start gap-3 shadow-sm"
      >
        <AlertCircle className="h-5 w-5 text-cherry shrink-0 mt-0.5" />
        <div className="space-y-1 font-sans text-xs sm:text-sm">
          <p className="font-bold text-cherry uppercase tracking-wider">
            DEMO WEBSITE NOTICE
          </p>
          <p className="text-slate leading-relaxed">
            This platform is a portfolio demonstration project created exclusively for web design and development showcases. All brand assets, menu items, media, and reservations are simulated. No commercial services are offered, and no copyright infringement is intended.
          </p>
        </div>
      </motion.div>

      {/* 1. HERO HEADER */}
      <section className="space-y-3 text-center sm:text-left border-b border-onyx/10 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center sm:justify-start gap-2 text-cherry"
        >
          <Lock className="h-4 w-4" />
          <span className="font-sans text-xs font-bold uppercase tracking-[0.25em]">
            VORA LEGAL & GOVERNANCE
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl sm:text-6xl font-normal leading-tight text-onyx"
        >
          Privacy & Terms
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-sans text-xs sm:text-sm text-slate max-w-xl"
        >
          Review our commitment to simulated guest privacy, reservation policies, and project terms of use.
        </motion.p>

        {/* INTERACTIVE TOGGLE TABS */}
        <div className="pt-4 flex items-center justify-center sm:justify-start gap-3">
          <button
            onClick={() => setActiveTab("privacy")}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              activeTab === "privacy"
                ? "bg-onyx text-cream shadow-md"
                : "border border-onyx/15 bg-cream text-onyx hover:bg-onyx/5"
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => setActiveTab("terms")}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              activeTab === "terms"
                ? "bg-onyx text-cream shadow-md"
                : "border border-onyx/15 bg-cream text-onyx hover:bg-onyx/5"
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Terms of Service</span>
          </button>
        </div>
      </section>

      {/* 2. DYNAMIC LEGAL CONTENT DISPLAY */}
      <AnimatePresence mode="wait">
        {activeTab === "privacy" ? (
          <motion.div
            key="privacy-section"
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -10 }}
            variants={staggerContainer}
            className="space-y-8"
          >
            {/* Section 01 */}
            <motion.div variants={fadeInUp} className="space-y-2 border-b border-onyx/10 pb-6">
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-cherry">
                SECTION 01
              </span>
              <h2 className="font-display text-2xl font-normal text-onyx">
                Demonstration Data Handling
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate leading-relaxed">
                When using the interactive cart or inputting sample reservation forms, data is processed temporarily in local browser storage (`localStorage`). No real personal data or payment credentials are stored on external server databases.
              </p>
            </motion.div>

            {/* Section 02 */}
            <motion.div variants={fadeInUp} className="space-y-2 border-b border-onyx/10 pb-6">
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-cherry">
                SECTION 02
              </span>
              <h2 className="font-display text-2xl font-normal text-onyx">
                Third-Party & Media Usage
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate leading-relaxed">
                All high-resolution culinary photography and typography used in this project serve aesthetic and promotional display purposes for concept evaluation. Rights belong to their respective creators.
              </p>
            </motion.div>

            {/* Section 03 */}
            <motion.div variants={fadeInUp} className="space-y-2">
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-cherry">
                SECTION 03
              </span>
              <h2 className="font-display text-2xl font-normal text-onyx">
                Local Storage & Preferences
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate leading-relaxed">
                VORA uses minimal client session state to manage active cart items and UI themes. Clearing your browser cache resets all interactive state immediately.
              </p>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="terms-section"
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -10 }}
            variants={staggerContainer}
            className="space-y-8"
          >
            {/* Section 01 */}
            <motion.div variants={fadeInUp} className="space-y-2 border-b border-onyx/10 pb-6">
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-cherry">
                TERMS 01
              </span>
              <h2 className="font-display text-2xl font-normal text-onyx">
                Simulated Dining & Orders
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate leading-relaxed">
                Submitting a table reservation or placing an item in the cart performs front-end state simulation. No actual monetary transactions take place, and no physical tables are booked.
              </p>
            </motion.div>

            {/* Section 02 */}
            <motion.div variants={fadeInUp} className="space-y-2 border-b border-onyx/10 pb-6">
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-cherry">
                TERMS 02
              </span>
              <h2 className="font-display text-2xl font-normal text-onyx">
                Intellectual Property & Fair Use
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate leading-relaxed">
                This project represents original user interface design and software engineering. Design frameworks and media assets are utilized under fair-use educational and creative showcase guidelines.
              </p>
            </motion.div>

            {/* Section 03 */}
            <motion.div variants={fadeInUp} className="space-y-2">
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-cherry">
                TERMS 03
              </span>
              <h2 className="font-display text-2xl font-normal text-onyx">
                AI Culinary Guide Notice
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate leading-relaxed">
                The embedded VORA Culinary Guide assistant generates simulated responses based on programmed menu data. Recommendations are intended solely for interactive presentation.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. CONCIERGE ASSISTANCE FOOTER */}
      <section className="rounded-2xl border border-onyx/15 bg-cream/70 p-6 sm:p-8 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-1.5 text-cherry text-xs font-bold uppercase tracking-wider">
            <Key className="h-3.5 w-3.5" />
            <span>Questions or Feedback?</span>
          </div>
          <p className="font-sans text-xs text-slate">
            Feel free to test out all features across the site.
          </p>
        </div>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-onyx px-6 py-3 font-sans text-xs font-bold uppercase tracking-widest text-cream transition-all hover:bg-cherry shadow-md"
        >
          <span>Contact Concierge</span>
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </section>

    </div>
  );
}

export default function LegalPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-[50vh] items-center justify-center font-sans text-xs uppercase tracking-widest text-slate">
        Loading Legal Information...
      </div>
    }>
      <LegalContent />
    </Suspense>
  );
}