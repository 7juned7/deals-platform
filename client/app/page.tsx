'use client';

import { motion } from "framer-motion";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="bg-[#0B0B0C] text-white overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center">
        {/* Background glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[400px] w-[400px] rounded-full bg-blue-500/20 blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-5xl md:text-6xl font-semibold tracking-tight"
          >
            Unlock <span className="text-blue-400">exclusive deals</span>
            <br /> built for modern users
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-6 max-w-2xl mx-auto text-gray-400 text-lg"
          >
            A premium platform to explore, claim, and manage high-value deals
            with seamless verification and real-time status tracking.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-10 flex justify-center gap-4"
          >
            <Link
              href="/deals"
              className="rounded-xl bg-white px-6 py-3 text-black font-medium hover:bg-gray-200 transition"
            >
              Explore Deals
            </Link>

            <Link
              href="/register"
              className="rounded-xl border border-white/20 px-6 py-3 text-white hover:border-white/40 transition"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ================= VALUE PROPS ================= */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.15 },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Curated Deals",
                desc: "Only high-quality, verified deals — no noise, no clutter.",
              },
              {
                title: "Smart Claiming",
                desc: "Claim once, track status, and avoid duplicates automatically.",
              },
              {
                title: "Secure & Verified",
                desc: "Locked deals stay protected until your account is verified.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="
                  rounded-2xl border border-white/5
                  bg-[#111113] p-6
                  hover:border-white/10 transition
                "
              >
                <h3 className="text-lg font-medium text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-400">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= FEATURE HIGHLIGHT ================= */}
      <section className="py-24 bg-gradient-to-b from-transparent to-black/40">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-semibold tracking-tight"
          >
            Built like a premium product
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-gray-400 max-w-xl mx-auto"
          >
            Smooth animations, clean UX, and a modern dark interface —
            designed to feel fast, intentional, and trustworthy.
          </motion.p>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="
              rounded-3xl border border-white/10
              bg-[#111113] p-12
            "
          >
            <h3 className="text-3xl font-semibold">
              Ready to explore premium deals?
            </h3>
            <p className="mt-3 text-gray-400">
              Join now and unlock access to curated opportunities.
            </p>

            <Link
              href="/deals"
              className="inline-block mt-8 rounded-xl bg-white px-8 py-3 text-black font-medium hover:bg-gray-200 transition"
            >
              Start Exploring
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
