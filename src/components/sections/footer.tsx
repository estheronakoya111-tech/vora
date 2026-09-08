"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, UtensilsCrossed, Clock, MapPin } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                      STRICT PROJECT ROUTE MAP                              */
/* -------------------------------------------------------------------------- */

const footerLinks = {
  navigation: [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Reservation", href: "/reservation" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],

  account: [
    { name: "Login", href: "/login" },
    { name: "Cart", href: "/cart" },
  ],
};

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.25" cy="6.75" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M14 8h2V4.8c-.35-.05-1.55-.15-2.95-.15-2.92 0-4.92 1.78-4.92 5.08V12H5v3.55h3.13V20h3.84v-4.45h3.13L15.6 12h-3.63V10.1c0-1.02.28-2.1 2.03-2.1Z"
        fill="currentColor"
      />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M18.9 3H22l-6.77 7.74L23.2 21h-6.24l-4.89-6.39L6.48 21H3.37l7.24-8.27L3 3h6.4l4.42 5.85L18.9 3Zm-1.1 16.05h1.73L8.49 4.85H6.64L17.8 19.05Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Footer() {
  const reduceMotion = useReducedMotion();

  return (
    <footer className="relative w-full bg-cream pt-0 pb-8 sm:pb-12 text-onyx overflow-hidden select-none">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="pt-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-8 border-b border-onyx/10">
            
            {/* BRAND & LOCATION COLUMN (6 Cols on Desktop) */}
            <div className="lg:col-span-6 space-y-4">
              <Link href="/" aria-label="VORA Home" className="group inline-flex items-center gap-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-onyx/10 bg-cream text-cherry shadow-sm transition-transform duration-300 group-hover:-rotate-12">
                  <UtensilsCrossed className="h-3.5 w-3.5" />
                </span>
                <Image
                  src="/logo/vora.svg"
                  alt="VORA"
                  width={130}
                  height={40}
                  priority
                  className="h-auto w-[110px] sm:w-[125px]"
                />
              </Link>

              <p className="font-sans text-xs sm:text-sm text-slate leading-relaxed max-w-sm">
                A contemporary pan-African culinary sanctuary honoring woodfire provenance, wild spices, and architectural hospitality.
              </p>

              {/* OPERATING HOURS */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-onyx">
                  <Clock className="h-3.5 w-3.5 text-cherry" />
                  <span>Dinner Service: Tue – Sun, 5:00 PM – 11:30 PM</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-onyx">
                  <MapPin className="h-3.5 w-3.5 text-cherry" />
                  <span>Victoria Island, Lagos</span>
                </div>
              </div>

              {/* SOCIAL BUTTONS */}
              <div className="flex items-center gap-2 pt-1">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-onyx/10 bg-cream text-onyx/70 transition-all duration-200 hover:border-cherry/40 hover:bg-cherry hover:text-cream shadow-sm"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-onyx/10 bg-cream text-onyx/70 transition-all duration-200 hover:border-cherry/40 hover:bg-cherry hover:text-cream shadow-sm"
                >
                  <FacebookIcon />
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-onyx/10 bg-cream text-onyx/70 transition-all duration-200 hover:border-cherry/40 hover:bg-cherry hover:text-cream shadow-sm"
                >
                  <TwitterIcon />
                </a>
              </div>
            </div>

            {/* NAVIGATION & ACCOUNT LINKS (6 Cols on Desktop) */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-6 sm:gap-8">
              
              {/* MAIN NAVIGATION */}
              <div className="space-y-3">
                <h4 className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-cherry">
                  Navigation
                </h4>
                <ul className="space-y-2">
                  {footerLinks.navigation.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-onyx transition-colors duration-200 hover:text-cherry"
                      >
                        <span>{link.name}</span>
                        <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ACCOUNT */}
              <div className="space-y-3">
                <h4 className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-cherry">
                  Account
                </h4>
                <ul className="space-y-2">
                  {footerLinks.account.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-onyx transition-colors duration-200 hover:text-cherry"
                      >
                        <span>{link.name}</span>
                        <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

          {/* COPYRIGHT & FUTURE LEGAL ROUTES */}
          <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-sans text-xs text-slate">
              © 2026 VORA. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <Link href="/privacy" className="font-sans text-xs text-slate transition-colors hover:text-cherry">
                Privacy Policy
              </Link>
       <Link 
  href="/privacy?tab=terms" 
  className="font-sans text-xs text-slate transition-colors hover:text-cherry"
>
  Terms of Service
</Link>
            </div>
          </div>

        </motion.div>

      </div>
    </footer>
  );
}