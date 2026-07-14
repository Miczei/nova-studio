"use client";

import { motion } from "framer-motion";
import { ChatHeader, ChatInput, ChatMessages, QuickReplies } from "@/components/chat/ChatBox";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * The hero's focal point: an always-visible, embedded version of the same
 * chat as ChatLauncher (shares ChatProvider, so the conversation is one
 * thread regardless of which surface you type into).
 */
export default function HeroChat() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 2.9, ease: EASE }}
      className="mt-8 flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-black/60 px-0 shadow-2xl backdrop-blur-xl sm:mt-10"
    >
      <ChatHeader />
      <ChatMessages className="h-[220px] px-4 py-4 sm:h-[260px]" />
      <QuickReplies />
      <ChatInput />
    </motion.div>
  );
}
