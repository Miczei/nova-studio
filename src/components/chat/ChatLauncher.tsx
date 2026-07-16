"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useChat } from "./ChatProvider";
import { ChatHeader, ChatInput, ChatMessages, QuickReplies } from "./ChatBox";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * The floating bottom-right chat bubble. MiniAgent's status ticker on the
 * AI Engine / Security pages lives at bottom-left so the two never collide.
 * Shares its conversation with HeroChat via ChatProvider — a message sent
 * here shows up there too, and vice versa.
 */
export default function ChatLauncher() {
  const { ui } = useChat();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label={open ? ui.closeLabel : ui.openLabel}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-[999999] flex h-[60px] w-[60px] items-center justify-center rounded-full border border-white/10 bg-black/80 text-white shadow-[0_6px_24px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-transform duration-300 hover:scale-105 md:bottom-8 md:right-8"
      >
        {open ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="h-6 w-6"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-7 w-7"
            aria-hidden="true"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[999997] bg-black/50 sm:hidden"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              role="dialog"
              aria-label={ui.botName}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.28, ease: EASE }}
              className="fixed inset-0 z-[999998] flex flex-col overflow-hidden border border-white/15 bg-black/85 shadow-2xl backdrop-blur-xl sm:inset-auto sm:bottom-[96px] sm:right-6 sm:h-[560px] sm:w-[380px] sm:rounded-2xl md:right-8"
            >
              <ChatHeader />
              <ChatMessages className="flex-1 px-4 py-4" />
              <QuickReplies />
              <ChatInput autoFocus />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
