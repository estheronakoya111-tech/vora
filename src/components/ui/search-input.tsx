"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                              SEARCH SVG GLYPH                              */
/* -------------------------------------------------------------------------- */

function SearchGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M14.2 4.6a7 7 0 1 0 3.6 9.9l3.7 3.7"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  TYPES                                     */
/* -------------------------------------------------------------------------- */

interface SearchInputProps {
  value: string;
  onValueChange: (value: string) => void;
  isExpanded: boolean;
  onExpandedChange: (open: boolean) => void;
}

type ViewportSize = "desktop" | "small" | "tiny" | "extreme";

/* -------------------------------------------------------------------------- */
/*                              SEARCH INPUT                                  */
/* -------------------------------------------------------------------------- */

export function SearchInput({
  value,
  onValueChange,
  isExpanded,
  onExpandedChange,
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  /*
   * IMPORTANT:
   * Start with "desktop" so the server and first client render
   * produce exactly the same HTML.
   *
   * We detect the real viewport only AFTER hydration.
   */
  const [viewport, setViewport] =
    useState<ViewportSize>("desktop");

  /* ---------------------------------------------------------------------- */
  /*                         RESPONSIVE VIEWPORT                             */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;

      if (width < 170) {
        setViewport("extreme");
      } else if (width < 250) {
        setViewport("tiny");
      } else if (width < 640) {
        setViewport("small");
      } else {
        setViewport("desktop");
      }
    };

    updateViewport();

    window.addEventListener("resize", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  /* ---------------------------------------------------------------------- */
  /*                              DIMENSIONS                                 */
  /* ---------------------------------------------------------------------- */

  const dimensions = {
    desktop: {
      collapsed: 40,
      expanded: 220,
    },

    small: {
      collapsed: 36,
      expanded: "min(130px, 35vw)",
    },

    tiny: {
      collapsed: 32,
      expanded: "min(90px, 28vw)",
    },

    extreme: {
      collapsed: 28,
      expanded: 70,
    },
  }[viewport];

  /* ---------------------------------------------------------------------- */
  /*                               AUTO FOCUS                                */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    if (isExpanded) {
      inputRef.current?.focus();
    }
  }, [isExpanded]);

  /* ---------------------------------------------------------------------- */
  /*                                TOGGLE                                   */
  /* ---------------------------------------------------------------------- */

  function handleToggle(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();

    if (isExpanded) {
      onValueChange("");
      onExpandedChange(false);
    } else {
      onExpandedChange(true);
    }
  }

  /* ---------------------------------------------------------------------- */
  /*                                RENDER                                   */
  /* ---------------------------------------------------------------------- */

  return (
    <motion.div
      layout
      onClick={() => {
        if (!isExpanded) {
          onExpandedChange(true);
        }
      }}
      animate={{
        width: isExpanded
          ? dimensions.expanded
          : dimensions.collapsed,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 32,
      }}
      className="flex min-w-0 max-w-full shrink-0 items-center overflow-hidden rounded-full border border-onyx/15 bg-cream"
      style={{
        height: dimensions.collapsed,
      }}
    >
      {/* ------------------------------------------------------------------ */}
      {/* SEARCH / CLOSE BUTTON                                              */}
      {/* ------------------------------------------------------------------ */}

      <button
        type="button"
        onClick={handleToggle}
        aria-label={isExpanded ? "Close search" : "Open search"}
        className="flex shrink-0 items-center justify-center text-onyx transition-colors hover:text-cherry focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cherry/50"
        style={{
          width: dimensions.collapsed,
          height: dimensions.collapsed,
        }}
      >
        {isExpanded ? (
          <X
            className="h-4 w-4"
            strokeWidth={1.75}
          />
        ) : (
          <SearchGlyph className="h-4 w-4" />
        )}
      </button>

      {/* ------------------------------------------------------------------ */}
      {/* INPUT                                                               */}
      {/* ------------------------------------------------------------------ */}

      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder={
          viewport === "desktop"
            ? "Search the menu..."
            : "Search..."
        }
        aria-label="Search menu"
        className="min-w-0 flex-1 bg-transparent pr-3 text-sm text-onyx outline-none placeholder:text-slate"
        style={{
          width: isExpanded ? "100%" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
      />
    </motion.div>
  );
}