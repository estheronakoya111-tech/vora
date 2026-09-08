"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { HeroBanner } from "@/components/reservation/hero-banner";
import { ReservationForm } from "@/components/reservation/reservation-form";
import { ConfirmationScreen } from "@/components/reservation/confirmation-screen";

type BookingDetails = {
  name: string;
  date: string;
  time: string;
  guests: number;
  experience: string;
};

export default function ReservationPage() {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <HeroBanner />

      <AnimatePresence mode="wait">
        {!bookingDetails ? (
          <ReservationForm key="form" onSuccess={(details) => setBookingDetails(details)} />
        ) : (
          <ConfirmationScreen key="success" details={bookingDetails} onReset={() => setBookingDetails(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}