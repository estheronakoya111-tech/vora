"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Send, Compass, ArrowRight } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const QUICK_PROMPTS = [
  "RECOMMEND A DISH",
  "PLAN A DINNER",
  "ASK ABOUT RESERVATIONS",
  "FIND VORA",
];

export default function CulinaryGuide() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello, I'm your VORA Culinary Guide. Curious about flavor pairings, planning a private dining experience, or seeking directions? How may I guide you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scrolls smooth to the bottom whenever messages update or AI is thinking
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  const sendMessage = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: textToSend };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    if (!queryText) setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I encountered a momentary pause. Feel free to explore our [MENU](/menu) or [RESERVATION](/reservation) pages directly.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const parseMessageContent = (content: string) => {
    const linkRegex = /\[(.*?)\]\((.*?)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(content.substring(lastIndex, match.index));
      }
      parts.push(
        <Link
          key={match.index}
          href={match[2]}
          className="inline-flex items-center gap-1 font-bold text-cherry underline hover:opacity-80 mx-1"
        >
          {match[1]} <ArrowRight className="h-3 w-3 inline" />
        </Link>
      );
      lastIndex = linkRegex.lastIndex;
    }
    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex));
    }
    return parts;
  };

  return (
    <div className="w-full rounded-2xl sm:rounded-3xl border border-onyx/15 bg-cream/70 p-4 sm:p-6 lg:p-8 backdrop-blur-md shadow-xl space-y-4 sm:space-y-6">
      <style>{`
        @keyframes prompt-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-onyx/10 pb-3 sm:pb-4">
        <div className="flex items-center gap-2 text-cherry">
          <Compass className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
          <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">
            VORA CULINARY GUIDE
          </span>
        </div>
      </div>

      {/* QUICK PROMPTS: INFINITE MARQUEE (< 950px) / STATIC FLEX WRAP (>= 950px) */}
      <div className="w-full">
        {/* Mobile & Tablet Infinite Marquee (< 950px) */}
        <div className="w-full overflow-hidden min-[950px]:hidden py-1">
          <div
            className="flex w-max"
            onMouseEnter={() => setIsMarqueePaused(true)}
            onMouseLeave={() => setIsMarqueePaused(false)}
            onTouchStart={() => setIsMarqueePaused(true)}
            onTouchEnd={() => setIsMarqueePaused(false)}
            style={{
              animationName: "prompt-marquee",
              animationDuration: "16s",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationPlayState: isMarqueePaused ? "paused" : "running",
            }}
          >
            {[...QUICK_PROMPTS, ...QUICK_PROMPTS].map((prompt, idx) => (
              <button
                key={`${prompt}-${idx}`}
                onClick={() => sendMessage(prompt)}
                disabled={isLoading}
                className="mx-1.5 shrink-0 rounded-full border border-onyx/15 bg-cream px-3 py-1.5 font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-onyx shadow-sm transition-all hover:border-cherry hover:bg-cherry hover:text-cream active:scale-95 disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Static Grid (>= 950px) */}
        <div className="hidden min-[950px]:flex min-[950px]:flex-wrap min-[950px]:gap-2">
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => sendMessage(prompt)}
              disabled={isLoading}
              className="rounded-full border border-onyx/15 bg-cream px-3.5 py-1.5 font-sans text-[11px] font-bold uppercase tracking-wider text-onyx transition-all hover:border-cherry hover:bg-cherry hover:text-cream active:scale-95 disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Log */}
      <div
        ref={chatContainerRef}
        className="h-[280px] sm:h-[340px] overflow-y-auto space-y-3 sm:space-y-4 pr-1 sm:pr-2 custom-scrollbar scroll-smooth"
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-3 sm:p-4 text-xs sm:text-sm font-sans leading-relaxed ${
                msg.role === "user"
                  ? "bg-onyx text-cream rounded-br-none shadow-sm"
                  : "bg-cream border border-onyx/10 text-onyx rounded-bl-none shadow-sm"
              }`}
            >
              {parseMessageContent(msg.content)}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="rounded-2xl border border-onyx/10 bg-cream p-3 sm:p-4 text-xs font-sans italic text-slate flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cherry animate-ping" /> The Guide is considering...
            </div>
          </div>
        )}
      </div>

      {/* Embedded Input Container */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="pt-2 border-t border-onyx/10"
      >
        <div className="relative flex items-center w-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your VORA Culinary Guide..."
            className="w-full rounded-full border border-onyx/20 bg-cream pl-4 pr-12 py-2.5 sm:py-3 font-sans text-xs text-onyx focus:border-cherry focus:outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-1.5 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-cherry text-cream transition-transform active:scale-95 disabled:opacity-40"
            aria-label="Send message"
          >
            <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
        </div>
      </form>

    </div>
  );
}