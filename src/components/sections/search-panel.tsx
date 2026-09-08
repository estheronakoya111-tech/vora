"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import { SearchInput } from "@/components/ui/search-input";
import { filterSearchIndex } from "@/lib/search-data";

export function SearchPanel() {
  const [query, setQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const results = filterSearchIndex(query);

  const handleSelect = () => {
    setIsExpanded(false);
    setQuery("");
  };

  return (
    <Popover open={isExpanded} onOpenChange={setIsExpanded}>
      <PopoverAnchor asChild>
        <div>
          <SearchInput
            value={query}
            onValueChange={setQuery}
            isExpanded={isExpanded}
            onExpandedChange={setIsExpanded}
          />
        </div>
      </PopoverAnchor>

      <PopoverContent
        align="end"
        sideOffset={12}
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="w-[90vw] max-w-sm rounded-xl border border-onyx/10 bg-cream p-2 shadow-xl backdrop-blur-md sm:w-80"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={results.length}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
          >
            {query.trim() === "" ? (
              <p className="px-3 py-4 text-xs font-semibold text-slate">
                Start typing to explore dishes...
              </p>
            ) : results.length === 0 ? (
              <p className="px-3 py-4 text-xs font-semibold text-slate">
                No dishes found matching &ldquo;{query}&rdquo;.
              </p>
            ) : (
              <ul className="flex flex-col gap-0.5 max-h-[60vh] overflow-y-auto">
                {results.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/menu?search=${encodeURIComponent(item.name)}`}
                      onClick={handleSelect}
                      className="flex items-center justify-between rounded-lg px-3 py-2.5 text-onyx transition-colors hover:bg-onyx/5 hover:text-cherry"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">{item.name}</span>
                        <span className="text-[10px] font-bold text-slate/70">
                          {item.category}
                        </span>
                      </div>
                      {item.price && (
                        <span className="font-display text-xs font-bold text-onyx">
                          ₦{item.price.toLocaleString("en-NG")}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </AnimatePresence>
      </PopoverContent>
    </Popover>
  );
}