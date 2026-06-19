"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function NewsletterForm() {
  const [email, setEmail]         = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setSubmitted(true);
  }

  return (
    <section
      id="contact"
      className="bg-off-white px-5 md:px-16 lg:px-24 py-16 md:py-24 border-t border-crimson/15"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="text-xs tracking-[0.35em] text-crimson/55 font-body uppercase mb-4">
            Stay Connected
          </p>

          <h2 className="font-heading font-black text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-crimson text-render-opt mb-5">
            STAY IN
            <br />
            THE LOOP
          </h2>

          <p className="text-crimson/60 font-body mb-10 text-base leading-relaxed">
            New drops, tour dates, and exclusive content — direct to your inbox.
          </p>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -8, transition: { duration: 0.3 } }}
                className="flex flex-col sm:flex-row"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="flex-1 bg-crimson/5 border border-crimson/20 text-crimson font-body text-sm px-5 py-4 placeholder:text-crimson/35 focus:outline-none focus:border-crimson transition-colors duration-300"
                />
                <button
                  type="submit"
                  className="bg-crimson text-off-white font-body font-medium text-sm tracking-widest uppercase px-8 py-4 hover:bg-charcoal transition-colors duration-300 whitespace-nowrap"
                >
                  Subscribe →
                </button>
              </motion.form>
            ) : (
              <motion.p
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-crimson/80 font-body text-sm tracking-wide"
              >
                You&apos;re on the list. Stay tuned for the next drop. ✓
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
