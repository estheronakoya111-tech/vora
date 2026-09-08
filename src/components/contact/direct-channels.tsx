import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";

export default function DirectChannels() {
  return (
    <div className="rounded-3xl border border-onyx/15 bg-cream/70 p-6 sm:p-8 backdrop-blur-md shadow-lg space-y-8 h-full flex flex-col justify-between">
      <div className="space-y-6">
        <div>
          <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-cherry block mb-1">
            PREFER TO SPEAK WITH US?
          </span>
          <h3 className="font-display text-2xl font-normal text-onyx">Direct Channels</h3>
        </div>

        <div className="space-y-6 font-sans text-sm text-onyx">
          <div className="space-y-1">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate">
              <Mail className="h-4 w-4 text-cherry" /> Email
            </span>
            <p className="font-bold text-base">hello@vora.example</p>
          </div>

          <div className="space-y-1">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate">
              <Phone className="h-4 w-4 text-cherry" /> Phone
            </span>
            <p className="font-bold text-base">+234 800 000 0000</p>
          </div>

          <div className="space-y-1">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate">
              <MapPin className="h-4 w-4 text-cherry" /> Visit
            </span>
            <p className="font-bold text-base leading-snug">
              18 Adebayo Crescent <br />
              Lekki Phase 1, Lagos, Nigeria
            </p>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-onyx/10 space-y-3">
        <span className="flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider text-slate">
          <Clock className="h-4 w-4 text-cherry" /> Operating Hours
        </span>

        <div className="space-y-2 font-sans text-xs text-onyx">
          <div className="flex justify-between border-b border-onyx/10 pb-1.5">
            <span className="text-slate font-medium">Mon — Thu</span>
            <span className="font-bold">12:00 — 22:00</span>
          </div>
          <div className="flex justify-between border-b border-onyx/10 pb-1.5">
            <span className="text-slate font-medium">Fri — Sat</span>
            <span className="font-bold">12:00 — 23:00</span>
          </div>
          <div className="flex justify-between border-b border-onyx/10 pb-1.5">
            <span className="text-slate font-medium">Sun</span>
            <span className="font-bold">13:00 — 21:00</span>
          </div>
        </div>

        <a
          href="https://maps.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-widest text-cherry underline hover:opacity-80 pt-2"
        >
          GET DIRECTIONS <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}