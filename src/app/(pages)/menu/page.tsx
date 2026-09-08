import { Suspense } from "react";
import { Menu } from "@/components/menu/menu";

export const dynamic = "force-dynamic";

export default function MenuPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center font-sans text-xs uppercase tracking-widest text-slate">
          Loading Menu...
        </div>
      }
    >
      <Menu />
    </Suspense>
  );
}
