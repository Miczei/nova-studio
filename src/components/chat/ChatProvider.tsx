"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import { getChatUi, type ChatUi } from "@/i18n/chat";

const WEBHOOK_URL = "https://hook.eu1.make.com/0krgthjdn9jelek8s8edykmzqis7nttj";
const TIMEOUT_MS = 90000; // an assistant that also reads PDFs can be slower

export type ChatMessage = {
  id: number;
  text: string;
  sender: "user" | "bot" | "error";
};

type ChatContextValue = {
  ui: ChatUi;
  messages: ChatMessage[];
  isWaiting: boolean;
  sendMessage: (text: string) => void;
};

const ChatContext = createContext<ChatContextValue | null>(null);

/**
 * Single conversation shared by every chat surface on the site (the
 * bottom-left floating launcher and the embedded hero chat box) so a
 * message sent in one shows up in the other. Provided once in the root
 * layout, above both surfaces.
 */
export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
}

export default function ChatProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const ui = useMemo(() => getChatUi(locale), [locale]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isWaiting, setIsWaiting] = useState(false);
  const threadIdRef = useRef<string | null>(null);
  const idRef = useRef(0);
  const seededRef = useRef(false);

  useEffect(() => {
    try {
      threadIdRef.current = sessionStorage.getItem("aiw_thread_id");
    } catch {
      // private browsing: sessionStorage may throw
    }
  }, []);

  useEffect(() => {
    if (seededRef.current) return;
    seededRef.current = true;
    setMessages([{ id: idRef.current++, text: ui.welcomeMessage, sender: "bot" }]);
    // Seed once with whatever locale is active on first mount; a locale
    // switch mid-conversation shouldn't retroactively rewrite history.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function sendMessage(raw: string) {
    const text = raw.trim();
    if (!text || isWaiting) return;

    setMessages((m) => [...m, { id: idRef.current++, text, sender: "user" }]);
    setIsWaiting(true);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    
    fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        message: text,
        thread_id: threadIdRef.current || "",
        page_url: window.location.href,
      }),
    })
      .then((res) => {
        console.log("[Chat] HTTP status:", res.status, "| Content-Type:", res.headers.get("content-type"));
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.text(); // read as text first — Make doesn't always return strict JSON
      })
      .then((raw) => {
        clearTimeout(timer);
        console.log("[Chat] Raw response from Make:", raw);

        let reply = "";
        try {
          const data = JSON.parse(raw);
          if (data && typeof data.reply === "string" && data.reply.trim()) {
            reply = data.reply.trim();
          }
          if (data && data.thread_id) {
            threadIdRef.current = data.thread_id;
            try {
              sessionStorage.setItem("aiw_thread_id", data.thread_id);
            } catch {
              // private browsing
            }
          }
        } catch (parseError) {
          console.warn("[Chat] Response wasn't valid JSON, using raw text as the reply.", parseError);
          reply = raw.trim();
        }

        if (!reply) {
          console.error("[Chat] Empty reply — check the Webhook Response module in Make.");
        }
        setMessages((m) => [
          ...m,
          { id: idRef.current++, text: reply || ui.errorMessage, sender: reply ? "bot" : "error" },
        ]);
      })
      .catch((error) => {
        clearTimeout(timer);
        console.error("[Chat] Network/connection error:", error);
        if (error?.name === "AbortError") {
          console.error("[Chat] Timed out after " + TIMEOUT_MS + " ms — Make scenario may be too slow or missing Webhook Response.");
        }
        setMessages((m) => [...m, { id: idRef.current++, text: ui.errorMessage, sender: "error" }]);
      })
      .finally(() => setIsWaiting(false));
  }

  return (
    <ChatContext.Provider value={{ ui, messages, isWaiting, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
}
