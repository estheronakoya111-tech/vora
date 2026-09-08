import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { CartProvider } from "@/components/cart/cartcontext";
import { FloatingCart } from "@/components/cart/floatingcart";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({ 
  subsets: ["latin"],
  variable: "--font-serif" 
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VORA — Modern Dining",
  description: "A modern dining experience at VORA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        fraunces.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <CartProvider>
          <Navbar />

          <main id="page-content" className="flex-1 pb-24">
            {children}
          </main>

          <Footer />
          <FloatingCart />
        </CartProvider>
      </body>
    </html>
  );
}