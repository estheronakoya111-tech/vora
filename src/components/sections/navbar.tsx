"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ShoppingCart, User, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SearchPanel } from "@/components/sections/search-panel";
import { primaryLinks, moreLinks, allNavLinks } from "@/lib/nav-links";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                DECORATIVE DOTS                             */
/* -------------------------------------------------------------------------- */

function Dots() {
  return (
    <>
      <span className="h-[3px] w-[3px] rounded-full bg-cherry/60" />
      <span className="h-[5px] w-[5px] rounded-full bg-cherry shadow-[0_0_6px_rgba(200,75,49,0.55)]" />
      <span className="h-[3px] w-[3px] rounded-full bg-cherry/60" />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                         ACTIVE NAVIGATION INDICATOR                        */
/* -------------------------------------------------------------------------- */

function NavIndicator({
  layoutId,
  watch,
}: {
  layoutId: string;
  watch: string;
}) {
  return (
    <motion.div
      layoutId={layoutId}
      layout
      transition={{
        type: "spring",
        stiffness: 420,
        damping: 28,
        mass: 0.7,
      }}
      className="absolute left-1/2 top-full mt-1.5 flex -translate-x-1/2 items-center gap-[3px]"
    >
      <motion.span
        key={watch}
        initial={{ scale: 1.3, opacity: 0.4 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="flex items-center gap-[3px]"
      >
        <Dots />
      </motion.span>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                             HOVER DOT INDICATOR                            */
/* -------------------------------------------------------------------------- */

function GhostDots() {
  return (
    <div className="absolute left-1/2 top-full mt-1.5 flex -translate-x-1/2 items-center gap-[3px] opacity-0 transition-opacity duration-200 group-hover:opacity-30">
      <Dots />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                             DESKTOP NAV LINK                               */
/* -------------------------------------------------------------------------- */

function NavLink({
  name,
  href,
}: {
  name: string;
  href: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "group relative py-2 text-sm font-medium outline-none transition-colors",
        "focus-visible:ring-2 focus-visible:ring-cherry/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
        isActive
          ? "tracking-wide text-cherry"
          : "text-onyx hover:text-cherry"
      )}
    >
      {name}

      {isActive ? (
        <NavIndicator
          layoutId="desktop-active-indicator"
          watch={pathname}
        />
      ) : (
        <GhostDots />
      )}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/*                         HAMBURGER / CLOSE BUTTON                           */
/* -------------------------------------------------------------------------- */

function MenuToggle({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const dur = reduceMotion ? 0 : 0.2;

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      onClick={onClick}
      className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-sm text-onyx transition-colors hover:text-cherry focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cherry/50 md:hidden"
    >
      <motion.span
        className="absolute h-[1.5px] w-4 rounded-full bg-current"
        animate={{
          rotate: open ? 45 : 0,
          y: open ? 0 : -5,
        }}
        transition={{ duration: dur }}
      />

      <motion.span
        className="absolute h-[1.5px] w-4 rounded-full bg-current"
        animate={{
          opacity: open ? 0 : 1,
        }}
        transition={{
          duration: reduceMotion ? 0 : 0.15,
        }}
      />

      <motion.span
        className="absolute h-[1.5px] w-4 rounded-full bg-current"
        animate={{
          rotate: open ? -45 : 0,
          y: open ? 0 : 5,
        }}
        transition={{ duration: dur }}
      />
    </motion.button>
  );
}

/* -------------------------------------------------------------------------- */
/*                              ANIMATION VARIANTS                            */
/* -------------------------------------------------------------------------- */

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    x: 16,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

/* -------------------------------------------------------------------------- */
/*                              MOBILE SIDEBAR                                */
/* -------------------------------------------------------------------------- */

function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const content = document.getElementById("page-content");

    if (!content) {
      document.body.style.overflow = open ? "hidden" : "";
      return;
    }

    if (open) {
      document.body.style.overflow = "hidden";

      if (!reduceMotion) {
        content.style.transition = "transform 0.3s ease";
        content.style.transformOrigin = "center top";
        content.style.transform = "scale(0.98)";
      }
    } else {
      content.style.transform = "";
      content.style.transition = "";
      document.body.style.overflow = "";
    }

    return () => {
      content.style.transform = "";
      content.style.transition = "";
      document.body.style.overflow = "";
    };
  }, [open, reduceMotion]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-onyx/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modern Rounded Drawer */}
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed right-0 top-0 z-50 flex h-dvh w-[85vw] max-w-[380px] flex-col rounded-l-3xl border-l border-onyx/10 bg-cream/95 p-6 shadow-2xl backdrop-blur-2xl sm:w-[400px]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
            }}
          >
            {/* Sidebar Header */}
            <div className="flex shrink-0 items-center justify-between pb-6 border-b border-onyx/10">
              <Image
                src="/logo/vora.svg"
                alt="VORA"
                width={110}
                height={48}
                priority
                className="h-auto w-[110px]"
              />

              <MenuToggle
                open
                onClick={onClose}
              />
            </div>

            {/* Sidebar Navigation */}
            <motion.nav
              variants={listVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-2 py-6 overflow-y-auto"
            >
              {allNavLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <motion.div
                    key={link.href}
                    variants={itemVariants}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-all outline-none",
                        "focus-visible:ring-2 focus-visible:ring-cherry/50",
                        isActive
                          ? "bg-cherry/10 font-semibold text-cherry shadow-sm"
                          : "text-onyx hover:bg-onyx/5 hover:text-cherry"
                      )}
                    >
                      {link.name}

                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-cherry shadow-[0_0_8px_rgba(200,75,49,0.8)]" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>

            {/* Cart & Login Footer Actions */}
            <div className="mt-auto border-t border-onyx/10 pt-6">
              <div className="flex flex-col gap-3">
                <Link
                  href="/cart"
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-xl border border-onyx/10 bg-cream px-4 py-3 text-onyx transition-all hover:border-cherry/30 hover:bg-cherry/5 hover:text-cherry"
                >
                  <ShoppingCart
                    className="h-4 w-4 shrink-0 text-cherry"
                    strokeWidth={2}
                  />

                  <span className="text-sm font-medium">
                    Cart
                  </span>
                </Link>

                <Link
                  href="/login"
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-xl border border-onyx/10 bg-cream px-4 py-3 text-onyx transition-all hover:border-cherry/30 hover:bg-cherry/5 hover:text-cherry"
                >
                  <User
                    className="h-4 w-4 shrink-0 text-cherry"
                    strokeWidth={2}
                  />

                  <span className="text-sm font-medium">
                    Login
                  </span>
                </Link>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/*                                MAIN NAVBAR                                 */
/* -------------------------------------------------------------------------- */

export function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();

  const isMoreActive = moreLinks.some(
    (link) => link.href === pathname
  );

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
        className={cn(
          "static top-0 z-40 w-full transition-[background-color,backdrop-filter,height] duration-300",
          scrolled
            ? "bg-cream/90 backdrop-blur-md"
            : "bg-cream"
        )}
      >
        <nav
          className={cn(
            "mx-auto flex w-full max-w-7xl items-center justify-between px-4 transition-[height] duration-300 sm:px-6 lg:px-8",
            scrolled ? "h-14" : "h-16"
          )}
        >
          {/* LOGO */}
          <motion.div
            whileTap={{ scale: 0.96 }}
            className="min-w-0 shrink-0"
          >
            <Link
              href="/"
              aria-label="VORA home"
              className="flex shrink-0 items-center"
            >
              {/* Desktop / Tablet */}
              <Image
                src="/logo/vora.svg"
                alt="VORA"
                width={125}
                height={36}
                priority
                className="hidden h-auto w-[125px] sm:block"
              />

              {/* Normal Mobile — 294px and above */}
              <Image
                src="/logo/vora.svg"
                alt="VORA"
                width={87}
                height={30}
                priority
                className="hidden h-auto h-[30px] w-[87px] min-[280px]:block sm:hidden"
              />

              {/* Small Mobile — 250px to 293px */}
              <Image
                src="/logo/v.svg"
                alt="VORA"
                width={70}
                height={20}
                priority
                className="hidden h-[20px] w-[70px] min-[235px]:block min-[280px]:hidden"
              />

              {/* Extra Small Mobile — below 250px */}
              <Image
                src="/logo/v.svg"
                alt="VORA"
                width={40}
                height={16}
                priority
                className="block h-[16px] w-[40px] min-[235px]:hidden"
              />
            </Link>
          </motion.div>

          {/* MEDIUM SCREEN NAV */}
          <motion.div
            variants={listVariants}
            initial="hidden"
            animate="visible"
            className="hidden items-center gap-8 md:flex lg:hidden"
          >
            {primaryLinks.map((link) => (
              <motion.div
                key={link.href}
                variants={itemVariants}
              >
                <NavLink {...link} />
              </motion.div>
            ))}

            <motion.div variants={itemVariants}>
              <DropdownMenu
                open={moreOpen}
                onOpenChange={setMoreOpen}
              >
                <DropdownMenuTrigger
                  className={cn(
                    "group relative flex items-center gap-1 py-2 text-sm font-medium outline-none transition-colors",
                    "focus-visible:ring-2 focus-visible:ring-cherry/50",
                    isMoreActive
                      ? "tracking-wide text-cherry"
                      : "text-onyx hover:text-cherry"
                  )}
                >
                  More

                  <motion.span
                    animate={{
                      rotate: moreOpen ? 180 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex"
                  >
                    <ChevronDown
                      className="h-3.5 w-3.5"
                      strokeWidth={2}
                    />
                  </motion.span>

                  {isMoreActive ? (
                    <NavIndicator
                      layoutId="desktop-active-indicator"
                      watch={pathname}
                    />
                  ) : (
                    <GhostDots />
                  )}
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="center"
                  className="min-w-[120px] rounded-md border border-onyx/10 bg-cream p-1 shadow-md"
                >
                  {moreLinks.map((link) => (
                    <DropdownMenuItem
                      key={link.href}
                      asChild
                      className="rounded-md px-3 py-1.5 focus:bg-cherry/10 focus:text-cherry data-[highlighted]:bg-cherry/10 data-[highlighted]:text-cherry"
                    >
                      <Link
                        href={link.href}
                        className="block w-full cursor-pointer text-sm font-medium text-onyx transition-colors"
                      >
                        {link.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          </motion.div>

          {/* LARGE SCREEN NAV */}
          <motion.div
            variants={listVariants}
            initial="hidden"
            animate="visible"
            className="hidden items-center gap-8 lg:flex"
          >
            {allNavLinks.map((link) => (
              <motion.div
                key={link.href}
                variants={itemVariants}
              >
                <NavLink {...link} />
              </motion.div>
            ))}
          </motion.div>

          {/* ACTIONS */}
          <div className="flex shrink-0 items-center gap-4 sm:gap-5">
            <SearchPanel />

            <Link
              href="/cart"
              aria-label="Cart"
              className="shrink-0 text-onyx transition-colors hover:text-cherry focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cherry/50"
            >
              <ShoppingCart
                className="h-5 w-5"
                strokeWidth={1.75}
              />
            </Link>

            <Link
              href="/login"
              className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-onyx transition-colors hover:text-cherry focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cherry/50 md:inline-flex"
            >
              <User
                className="h-4 w-4"
                strokeWidth={1.75}
              />
              Login
            </Link>

            {!sidebarOpen && (
              <MenuToggle
                open={false}
                onClick={() => setSidebarOpen(true)}
              />
            )}
          </div>
        </nav>
      </motion.header>

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </>
  );
}