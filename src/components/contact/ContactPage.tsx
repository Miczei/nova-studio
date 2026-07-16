"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AmbientGlow from "@/components/couders/AmbientGlow";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { ContactContent } from "@/i18n/contact";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type FormFields = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

const EMPTY_FIELDS: FormFields = { firstName: "", lastName: "", email: "", message: "" };

const INPUT_CLASS =
  "w-full rounded-lg border border-white/10 bg-black/50 p-3.5 text-base text-white outline-none transition-all placeholder:text-zinc-500 focus:border-[#C06C4C]";

export default function ContactPage({
  locale,
  dict,
  content,
}: {
  locale: Locale;
  dict: Dictionary;
  content: ContactContent;
}) {
  const reduced = Boolean(useReducedMotion());
  const home = `/${locale}`;
  const [fields, setFields] = useState<FormFields>(EMPTY_FIELDS);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const submitRef = useRef<HTMLButtonElement>(null);

  function update<K extends keyof FormFields>(key: K, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  // Inserting the banner above the form pushes the submit button down the
  // page without the viewport following it (no user scroll gesture caused
  // the reflow), so it can end up dipping under the fixed chat launcher's
  // bottom-right corner. Nudge the scroll down by exactly however far the
  // button now overlaps that reserved corner (0 if it doesn't).
  function clearLauncherOverlap() {
    const LAUNCHER_RESERVE = 110; // launcher: up to 32px offset + 60px size, plus margin
    requestAnimationFrame(() => {
      const btn = submitRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const overlap = rect.bottom - (window.innerHeight - LAUNCHER_RESERVE);
      if (overlap > 0) {
        window.scrollBy({ top: overlap, behavior: reduced ? "auto" : "smooth" });
      }
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const { firstName, lastName, email, message } = fields;
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !message.trim()) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, timestamp: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error(`request failed: ${res.status}`);
      setStatus("success");
      setFields(EMPTY_FIELDS);
      clearLauncherOverlap();
    } catch {
      setStatus("error");
      clearLauncherOverlap();
    }
  }

  return (
    <div className="sub-shell">
      <Navbar locale={locale} dict={dict} />

      <main className="sub relative overflow-hidden bg-black">
        <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
          <nav className="sub__crumbs" aria-label="Breadcrumb">
            <Link href={home}>Couders</Link>
            <span aria-hidden="true">/</span>
            <span>{content.breadcrumb}</span>
          </nav>

          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
            {/* Left column: copy & value proposition */}
            <div className="relative lg:col-span-5 lg:pt-6">
              <AmbientGlow
                className="-left-24 -top-24 h-[380px] w-[380px]"
                color="rgba(192,108,76,0.18)"
              />
              <AmbientGlow
                className="bottom-[-10%] right-0 h-[320px] w-[320px]"
                color="rgba(90,120,150,0.14)"
              />

              <motion.h1
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="relative max-w-lg text-balance text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl md:text-5xl"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                {content.h1}
              </motion.h1>

              <motion.p
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
                className="relative mt-6 max-w-md text-pretty text-lg leading-relaxed text-[#C7CCD6]"
              >
                {content.lead}
              </motion.p>
            </div>

            {/* Right column: form card */}
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              className="relative overflow-hidden rounded-2xl border border-white/10 border-t-white/20 bg-[#0E1117]/90 p-6 shadow-2xl backdrop-blur-xl md:p-10 lg:col-span-7"
            >
              <h2
                className="text-xl font-semibold tracking-[-0.02em] text-white sm:text-2xl"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                {content.formH2}
              </h2>

              {status === "success" && (
                <div
                  role="status"
                  className="mt-6 rounded-lg border border-emerald-400/25 bg-emerald-400/10 p-4 text-sm text-emerald-200"
                >
                  {content.successMessage}
                </div>
              )}
              {status === "error" && (
                <div
                  role="alert"
                  className="mt-6 rounded-lg border border-red-500/25 bg-red-500/10 p-4 text-sm text-red-200"
                >
                  {content.errorMessage}
                </div>
              )}

              <form className="mt-6 flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-firstName" className="mb-2 block text-sm text-zinc-300">
                      {content.firstNameLabel}
                    </label>
                    <input
                      id="contact-firstName"
                      name="firstName"
                      type="text"
                      required
                      autoComplete="given-name"
                      value={fields.firstName}
                      onChange={(e) => update("firstName", e.target.value)}
                      className={INPUT_CLASS}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-lastName" className="mb-2 block text-sm text-zinc-300">
                      {content.lastNameLabel}
                    </label>
                    <input
                      id="contact-lastName"
                      name="lastName"
                      type="text"
                      required
                      autoComplete="family-name"
                      value={fields.lastName}
                      onChange={(e) => update("lastName", e.target.value)}
                      className={INPUT_CLASS}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-sm text-zinc-300">
                    {content.emailLabel}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={fields.email}
                    onChange={(e) => update("email", e.target.value)}
                    className={INPUT_CLASS}
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="mb-2 block text-sm text-zinc-300">
                    {content.messageLabel}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    placeholder={content.messagePlaceholder}
                    value={fields.message}
                    onChange={(e) => update("message", e.target.value)}
                    className={`${INPUT_CLASS} resize-none`}
                  />
                </div>

                <button
                  ref={submitRef}
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[#C06C4C] px-7 py-3.5 text-center text-[15px] font-medium text-white transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {status === "sending" ? content.sendingLabel : content.submitLabel}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer dict={dict} locale={locale} />
    </div>
  );
}
