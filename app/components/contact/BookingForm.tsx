"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const COUNTRY_CODES = [
  { code: "+420", label: "+420 CZ" },
  { code: "+84",  label: "+84  VN" },
  { code: "+1",   label: "+1   US/CA" },
  { code: "+44",  label: "+44  UK" },
  { code: "+49",  label: "+49  DE" },
  { code: "+33",  label: "+33  FR" },
  { code: "+43",  label: "+43  AT" },
  { code: "+48",  label: "+48  PL" },
  { code: "+36",  label: "+36  HU" },
  { code: "+421", label: "+421 SK" },
  { code: "+39",  label: "+39  IT" },
  { code: "+34",  label: "+34  ES" },
  { code: "+31",  label: "+31  NL" },
  { code: "+32",  label: "+32  BE" },
  { code: "+41",  label: "+41  CH" },
  { code: "+46",  label: "+46  SE" },
  { code: "+47",  label: "+47  NO" },
  { code: "+45",  label: "+45  DK" },
  { code: "+7",   label: "+7   RU" },
  { code: "+61",  label: "+61  AU" },
  { code: "+81",  label: "+81  JP" },
  { code: "+82",  label: "+82  KR" },
  { code: "+65",  label: "+65  SG" },
  { code: "+66",  label: "+66  TH" },
  { code: "+86",  label: "+86  CN" },
  { code: "+91",  label: "+91  IN" },
];

const SERVICES = [
  "DJ Performance",
  "Music Production",
  "Co-Production",
  "Mixing & Mastering",
  "Beat Licensing",
  "Creative Consultation",
  "Other",
];

interface Fields {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  service: string;
  message: string;
}

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
}

type Status = "idle" | "sending" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim())    e.name    = "Full name is required.";
  if (!f.email.trim())   e.email   = "Email address is required.";
  else if (!EMAIL_RE.test(f.email.trim())) e.email = "Please enter a valid email address.";
  if (!f.phone.trim())   e.phone   = "Phone number is required.";
  if (!f.service)        e.service = "Please select a service.";
  if (!f.message.trim()) e.message = "Message is required.";
  return e;
}

const BLANK: Fields = {
  name: "", email: "", countryCode: "+420", phone: "", service: "", message: "",
};

const LABEL = "text-[0.6rem] tracking-[0.3em] uppercase text-charcoal/35 font-body block mb-2";
const INPUT  = "w-full bg-transparent border-b text-charcoal font-body text-sm py-3 outline-none transition-colors duration-200 placeholder:text-charcoal/25";

export default function BookingForm() {
  const [fields,  setFields]  = useState<Fields>(BLANK);
  const [errors,  setErrors]  = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status,  setStatus]  = useState<Status>("idle");

  const currentErrors = validate(fields);
  const isValid = Object.keys(currentErrors).length === 0;

  function set(key: keyof Fields, value: string) {
    const next = { ...fields, [key]: value };
    setFields(next);
    if (touched[key]) setErrors(validate(next));
  }

  function blur(key: keyof Errors) {
    setTouched(prev => ({ ...prev, [key]: true }));
    setErrors(validate(fields));
  }

  function fieldError(key: keyof Errors): string | undefined {
    return touched[key] ? errors[key] : undefined;
  }

  function borderClass(key: keyof Errors): string {
    return touched[key] && errors[key]
      ? "border-crimson"
      : "border-charcoal/20 focus:border-crimson";
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, service: true, message: true });
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:    fields.name.trim(),
          email:   fields.email.trim(),
          phone:   `${fields.countryCode} ${fields.phone.trim()}`,
          service: fields.service,
          message: fields.message.trim(),
        }),
      });

      if (!res.ok) throw new Error("Send failed");

      setStatus("success");
      setFields(BLANK);
      setTouched({});
      setErrors({});
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="booking" className="px-5 md:px-16 lg:px-24 pt-32 pb-28 bg-off-white border-t border-charcoal/8">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="lg:col-span-6"
          >
            <p className="text-xs tracking-[0.35em] text-olive-gold font-body uppercase mb-6">
              Bookings &amp; Inquiries
            </p>
            <h2 className="font-heading font-black text-[clamp(3rem,8vw,7rem)] leading-[0.88] tracking-tight text-crimson text-render-opt">
              LET&apos;S
              <br />
              WORK
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            className="lg:col-span-5 lg:col-start-8 self-end pb-1"
          >
            <p className="text-charcoal/50 font-body text-sm leading-relaxed">
              Available for DJ sets, studio sessions, co-productions, and
              creative collaborations. Fill in the form and I&apos;ll get back
              to you within 48 hours.
            </p>
          </motion.div>
        </div>

        {/* Success state */}
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="py-20 flex flex-col items-start gap-6"
            >
              <div className="w-12 h-px bg-olive-gold" />
              <p className="font-heading font-black text-[clamp(1.8rem,4vw,3.5rem)] leading-tight text-crimson">
                Message Sent.
              </p>
              <p className="text-charcoal/60 font-body text-sm leading-relaxed max-w-md">
                Thank you! Your message has been sent directly to Anky. Expect a
                reply within 48 hours.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-2 text-xs tracking-widest uppercase font-body text-charcoal/40 hover:text-crimson transition-colors duration-200 underline underline-offset-4"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              noValidate
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10"
            >
              {/* Full Name */}
              <div className="md:col-span-1">
                <label className={LABEL}>
                  Full Name <span className="text-crimson">*</span>
                </label>
                <input
                  name="name"
                  type="text"
                  value={fields.name}
                  onChange={e => set("name", e.target.value)}
                  onBlur={() => blur("name")}
                  placeholder="Your full name"
                  className={`${INPUT} ${borderClass("name")}`}
                />
                <FieldError msg={fieldError("name")} />
              </div>

              {/* Email */}
              <div className="md:col-span-1">
                <label className={LABEL}>
                  Email Address <span className="text-crimson">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  value={fields.email}
                  onChange={e => set("email", e.target.value)}
                  onBlur={() => blur("email")}
                  placeholder="you@example.com"
                  className={`${INPUT} ${borderClass("email")}`}
                />
                <FieldError msg={fieldError("email")} />
              </div>

              {/* Phone with country code */}
              <div className="md:col-span-1">
                <label className={LABEL}>
                  Phone Number <span className="text-crimson">*</span>
                </label>
                <div className={`flex gap-2 border-b transition-colors duration-200 ${touched.phone && errors.phone ? "border-crimson" : "border-charcoal/20 focus-within:border-crimson"}`}>
                  <select
                    value={fields.countryCode}
                    onChange={e => set("countryCode", e.target.value)}
                    aria-label="Country code"
                    className="bg-transparent text-charcoal/60 font-body text-xs py-3 pr-2 outline-none shrink-0 cursor-pointer"
                  >
                    {COUNTRY_CODES.map(({ code, label }) => (
                      <option key={code} value={code}>{label}</option>
                    ))}
                  </select>
                  <div className="w-px bg-charcoal/15 self-stretch my-2" />
                  <input
                    name="phone"
                    type="tel"
                    value={fields.phone}
                    onChange={e => set("phone", e.target.value)}
                    onBlur={() => blur("phone")}
                    placeholder="773 115 935"
                    className="flex-1 bg-transparent text-charcoal font-body text-sm py-3 outline-none placeholder:text-charcoal/25"
                  />
                </div>
                <FieldError msg={fieldError("phone")} />
              </div>

              {/* Service Type */}
              <div className="md:col-span-1">
                <label className={LABEL}>
                  Service Type <span className="text-crimson">*</span>
                </label>
                <select
                  name="service"
                  value={fields.service}
                  onChange={e => set("service", e.target.value)}
                  onBlur={() => blur("service")}
                  className={`${INPUT} cursor-pointer appearance-none ${borderClass("service")}`}
                >
                  <option value="" disabled>Select a service…</option>
                  {SERVICES.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <FieldError msg={fieldError("service")} />
              </div>

              {/* Message */}
              <div className="md:col-span-2">
                <label className={LABEL}>
                  Message <span className="text-crimson">*</span>
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={fields.message}
                  onChange={e => set("message", e.target.value)}
                  onBlur={() => blur("message")}
                  placeholder="Tell me about your project, event, or idea…"
                  className={`${INPUT} resize-none leading-relaxed ${borderClass("message")}`}
                />
                <FieldError msg={fieldError("message")} />
              </div>

              {/* Submit row */}
              <div className="md:col-span-2 flex flex-col gap-4">
                <AnimatePresence>
                  {Object.keys(touched).length > 0 && !isValid && (
                    <motion.p
                      key="validation-banner"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-xs text-crimson font-body"
                    >
                      Please fill out all required fields before sending.
                    </motion.p>
                  )}
                  {status === "error" && (
                    <motion.p
                      key="error-banner"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-xs text-crimson font-body"
                    >
                      Something went wrong — please try again or email{" "}
                      <a href="mailto:anky.lohi5@gmail.com" className="underline">
                        anky.lohi5@gmail.com
                      </a>{" "}
                      directly.
                    </motion.p>
                  )}
                </AnimatePresence>

                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center gap-3 bg-crimson text-off-white font-body font-medium text-xs tracking-widest uppercase px-10 py-5 hover:bg-charcoal transition-colors duration-300 self-start disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? (
                      <>Sending… <span aria-hidden="true" className="animate-pulse">●</span></>
                    ) : (
                      <>Send Message <span aria-hidden="true">→</span></>
                    )}
                  </button>

                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-charcoal/30 font-body tracking-wide">
                      anky.lohi5@gmail.com
                    </span>
                    <span className="text-xs text-charcoal/20 font-body tracking-wide">
                      Response within 48 hours
                    </span>
                  </div>
                </div>
              </div>

            </motion.form>
          )}
        </AnimatePresence>

        {/* Studio address callout */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-20 pt-10 border-t border-charcoal/8 flex flex-wrap gap-8"
        >
          <div>
            <p className="text-[0.58rem] tracking-[0.3em] uppercase text-charcoal/25 font-body mb-1">
              Studio
            </p>
            <p className="text-sm text-charcoal/55 font-body">
              Senovážné nám. 1464/6, 110 00 Nové Město, Praha
            </p>
          </div>
          <div>
            <p className="text-[0.58rem] tracking-[0.3em] uppercase text-charcoal/25 font-body mb-1">
              Phone
            </p>
            <a
              href="tel:+420773115935"
              className="text-sm text-charcoal/55 font-body hover:text-crimson transition-colors duration-200"
            >
              +420 773 115 935
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

function FieldError({ msg }: { msg?: string }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-1.5 text-[0.65rem] text-crimson font-body tracking-wide"
        >
          {msg}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
