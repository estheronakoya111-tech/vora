import { Hero } from "@/components/home/hero";
import { SignatureDish } from "@/components/home/signaturedish";
import { Chef } from "@/components/home/chef";
import { Testimonials } from "@/components/home/testimonials";
import { About } from "@/components/home/about";
export default function HomePage() {
  return (
    <main>
      <Hero />
      <SignatureDish />
      <Chef />
      < Testimonials />
   < About />
    </main>
  );
}