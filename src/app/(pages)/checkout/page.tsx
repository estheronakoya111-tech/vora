"use client";

import Link from "next/link";
import { ArrowLeft, Utensils } from "lucide-react";

export default function CheckoutPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-cherry/30 bg-cherry/10 text-cherry">
        <Utensils className="h-8 w-8" />
      </div>

      <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-onyx sm:text-5xl">
        Checkout
      </h1>
      <p className="mt-3 font-display text-lg font-medium text-cherry uppercase tracking-widest">
        Coming Soon
      </p>

     <p className="mt-2 max-w-md text-sm text-slate">
  We&apos;re preparing the VORA ordering experience.
</p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/cart"
          className="flex items-center gap-2 rounded-full border border-onyx/20 px-6 py-3 text-xs font-bold uppercase tracking-widest text-onyx transition-colors hover:bg-onyx/5"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Cart
        </Link>
        <Link
          href="/menu"
          className="flex items-center gap-2 rounded-full bg-cherry px-6 py-3 text-xs font-bold uppercase tracking-widest text-cream shadow-md transition-transform hover:scale-105 active:scale-95"
        >
          Explore Menu
        </Link>
      </div>
    </div>
  );
}