import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import confetti from "canvas-confetti";
import { getCountries, getCountryCallingCode } from "react-phone-number-input";
import type { Country } from "react-phone-number-input";
import countryLabels from "react-phone-number-input/locale/en.json";
import { AsYouType, parsePhoneNumberFromString } from "libphonenumber-js";
import finalRevealImage from "./assets/final-reveal.jpeg";

// ─── Pixel Icons ────────────────────────────────────────────────────────────

function PixelHeart({ size = 24, color = "#FF5C9A" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" style={{ imageRendering: "pixelated" }} fill={color}>
      <rect x="1" y="4" width="2" height="2" />
      <rect x="3" y="2" width="2" height="2" />
      <rect x="5" y="1" width="3" height="2" />
      <rect x="8" y="1" width="3" height="2" />
      <rect x="11" y="2" width="2" height="2" />
      <rect x="13" y="4" width="2" height="2" />
      <rect x="1" y="6" width="14" height="3" />
      <rect x="2" y="9" width="12" height="2" />
      <rect x="3" y="11" width="10" height="2" />
      <rect x="4" y="13" width="8" height="1" />
      <rect x="5" y="14" width="6" height="1" />
      <rect x="6" y="15" width="4" height="1" />
      <rect x="7" y="16" width="2" height="1" />
    </svg>
  );
}

function PixelEnvelope({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 16" style={{ imageRendering: "pixelated" }} fill="#FF5C9A">
      <rect x="0" y="0" width="20" height="1" />
      <rect x="0" y="15" width="20" height="1" />
      <rect x="0" y="0" width="1" height="16" />
      <rect x="19" y="0" width="1" height="16" />
      <rect x="1" y="1" width="2" height="2" fill="#D92F70" />
      <rect x="3" y="3" width="2" height="2" fill="#D92F70" />
      <rect x="5" y="5" width="2" height="2" fill="#D92F70" />
      <rect x="7" y="7" width="2" height="2" fill="#D92F70" />
      <rect x="9" y="7" width="2" height="2" fill="#D92F70" />
      <rect x="11" y="5" width="2" height="2" fill="#D92F70" />
      <rect x="13" y="3" width="2" height="2" fill="#D92F70" />
      <rect x="15" y="1" width="2" height="2" fill="#D92F70" />
      <rect x="1" y="1" width="18" height="14" fill="#FFD6E5" />
      <rect x="1" y="1" width="2" height="2" fill="#FF5C9A" />
      <rect x="3" y="3" width="2" height="2" fill="#FF5C9A" />
      <rect x="5" y="5" width="2" height="2" fill="#FF5C9A" />
      <rect x="7" y="7" width="2" height="2" fill="#FF5C9A" />
      <rect x="9" y="7" width="2" height="2" fill="#FF5C9A" />
      <rect x="11" y="5" width="2" height="2" fill="#FF5C9A" />
      <rect x="13" y="3" width="2" height="2" fill="#FF5C9A" />
      <rect x="15" y="1" width="2" height="2" fill="#FF5C9A" />
    </svg>
  );
}

function PixelRing({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" style={{ imageRendering: "pixelated" }}>
      <rect x="6" y="1" width="8" height="2" fill="#FFD700" />
      <rect x="4" y="3" width="2" height="2" fill="#FFD700" />
      <rect x="14" y="3" width="2" height="2" fill="#FFD700" />
      <rect x="2" y="5" width="4" height="6" fill="#FFD700" />
      <rect x="14" y="5" width="4" height="6" fill="#FFD700" />
      <rect x="6" y="9" width="8" height="4" fill="#FFD700" />
      <rect x="4" y="11" width="2" height="2" fill="#FFD700" />
      <rect x="14" y="11" width="2" height="2" fill="#FFD700" />
      <rect x="6" y="13" width="8" height="2" fill="#FFD700" />
      <rect x="5" y="2" width="10" height="2" fill="#FFF0C0" />
      <rect x="8" y="4" width="4" height="2" fill="#FF5C9A" />
      <rect x="7" y="5" width="6" height="4" fill="#FF5C9A" />
      <rect x="8" y="9" width="4" height="1" fill="#D92F70" />
    </svg>
  );
}

function PixelStar({ size = 16, color = "#FF5C9A" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 9 9" style={{ imageRendering: "pixelated" }} fill={color}>
      <rect x="4" y="0" width="1" height="2" />
      <rect x="4" y="7" width="1" height="2" />
      <rect x="0" y="4" width="2" height="1" />
      <rect x="7" y="4" width="2" height="1" />
      <rect x="1" y="1" width="2" height="2" />
      <rect x="6" y="1" width="2" height="2" />
      <rect x="1" y="6" width="2" height="2" />
      <rect x="6" y="6" width="2" height="2" />
      <rect x="3" y="3" width="3" height="3" />
    </svg>
  );
}

function PixelSparkle({ size = 20, color = "#FF5C9A" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 11 11" style={{ imageRendering: "pixelated" }} fill={color}>
      <rect x="5" y="0" width="1" height="11" />
      <rect x="0" y="5" width="11" height="1" />
      <rect x="2" y="2" width="1" height="1" />
      <rect x="8" y="2" width="1" height="1" />
      <rect x="2" y="8" width="1" height="1" />
      <rect x="8" y="8" width="1" height="1" />
    </svg>
  );
}

// ─── Floating decorations ────────────────────────────────────────────────────

function FloatingDecor() {
  const items = [
    { x: "8%", y: "12%", delay: 0, type: "heart", size: 14 },
    { x: "88%", y: "8%", delay: 0.4, type: "star", size: 12 },
    { x: "5%", y: "70%", delay: 0.8, type: "sparkle", size: 16 },
    { x: "92%", y: "65%", delay: 0.3, type: "heart", size: 10 },
    { x: "15%", y: "40%", delay: 1.1, type: "star", size: 10 },
    { x: "80%", y: "40%", delay: 0.6, type: "sparkle", size: 14 },
    { x: "50%", y: "5%", delay: 0.9, type: "heart", size: 12 },
    { x: "45%", y: "92%", delay: 0.2, type: "star", size: 14 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {items.map((item, i) => (
        <div
          key={i}
          className="absolute float"
          style={{
            left: item.x,
            top: item.y,
            animationDelay: `${item.delay}s`,
            opacity: 0.45,
          }}
        >
          {item.type === "heart" && <PixelHeart size={item.size} color="#FF5C9A" />}
          {item.type === "star" && <PixelStar size={item.size} color="#D92F70" />}
          {item.type === "sparkle" && <PixelSparkle size={item.size} color="#FF5C9A" />}
        </div>
      ))}
    </div>
  );
}

// ─── Screens ─────────────────────────────────────────────────────────────────

type Screen = "intro" | "question" | "celebration" | "baba" | "loading" | "final";

const pageVariants: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -24, transition: { duration: 0.25 } },
};

// ─── Screen 1: Intro ─────────────────────────────────────────────────────────

function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      key="intro"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col items-center justify-center min-h-dvh px-6 py-12 text-center relative z-10"
    >
      <div className="mb-8 float heartbeat" style={{ display: "inline-block" }}>
        <PixelEnvelope size={80} />
      </div>

      <div className="pixel-border-card px-8 py-8 mb-8 max-w-sm w-full mx-auto" style={{ background: "#FFFFFF" }}>
        <p
          className="text-xs font-bold uppercase tracking-widest mb-4"
          style={{ color: "#D92F70", fontFamily: "VT323, monospace", fontSize: "1rem", letterSpacing: "0.15em" }}
        >
          ★ PRIVATE MESSAGE ★
        </p>
        <h1
          className="mb-3 leading-snug"
          style={{ fontFamily: "Pixelify Sans, monospace", fontSize: "1.6rem", fontWeight: 700, color: "#4A1830" }}
        >
          I have something
          <br />
          important to
          <br />
          ask you…
        </h1>
        <div className="flex justify-center gap-2 mt-4">
          {[0, 0.2, 0.4].map((d, i) => (
            <div key={i} className="sparkle" style={{ animationDelay: `${d}s` }}>
              <PixelHeart size={16} color="#FF5C9A" />
            </div>
          ))}
        </div>
      </div>

      <button
        className="pixel-btn-primary"
        onClick={onStart}
        style={{ fontSize: "1.3rem", padding: "16px 48px", letterSpacing: "0.1em" }}
      >
        START ♥
      </button>

      <p className="mt-6 text-sm" style={{ color: "#D92F70", opacity: 0.7, fontFamily: "VT323, monospace", fontSize: "1rem" }}>
        <span className="blink">▶</span> tap to open
      </p>
    </motion.div>
  );
}

// ─── Screen 2: The Question ───────────────────────────────────────────────────

const noMessages = [
  "Are you sure? 🥺",
  "Think about it again 😭",
  "Really? 👀",
  "You're making this appointment difficult.",
  "The system refuses to accept NO.",
];

const yesScale = [1, 1.15, 1.35, 1.6, 1.85];

function QuestionScreen({ onYes }: { onYes: () => void }) {
  const [noCount, setNoCount] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const noRef = useRef<HTMLButtonElement>(null);

  const moveNo = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const maxX = rect.width - 160;
    const maxY = 120;
    const rx = (Math.random() - 0.5) * maxX * 0.8;
    const ry = (Math.random() - 0.5) * maxY;
    setNoPos({ x: rx, y: ry });
    setNoCount((c) => {
      const next = c + 1;
      const msg = noMessages[Math.min(next - 1, noMessages.length - 1)];
      setMessage(msg);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2200);
      return next;
    });
  }, []);

  const scale = yesScale[Math.min(noCount, yesScale.length - 1)];

  return (
    <motion.div
      key="question"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col items-center justify-center min-h-dvh px-6 py-12 relative z-10"
    >
      {/* Appointment card */}
      <div className="pixel-border-card w-full max-w-sm mx-auto mb-8" style={{ background: "#FFFFFF" }}>
        {/* Card header */}
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{ background: "#FF5C9A", borderBottom: "4px solid #4A1830" }}
        >
          <span style={{ fontFamily: "VT323, monospace", fontSize: "1.1rem", color: "#FFF", letterSpacing: "0.12em" }}>
            LOVE APPOINTMENT SYSTEM
          </span>
          <PixelHeart size={14} color="#FFF" />
        </div>

        {/* Card body */}
        <div className="px-6 py-8 text-center">
          <div className="flex justify-center gap-3 mb-5">
            <div className="sparkle"><PixelRing size={32} /></div>
            <div className="sparkle" style={{ animationDelay: "0.4s" }}><PixelHeart size={28} color="#FF5C9A" /></div>
            <div className="sparkle" style={{ animationDelay: "0.8s" }}><PixelStar size={24} color="#D92F70" /></div>
          </div>

          <h2
            style={{
              fontFamily: "Pixelify Sans, monospace",
              fontSize: "clamp(1.6rem, 5vw, 2.2rem)",
              fontWeight: 700,
              color: "#4A1830",
              lineHeight: 1.2,
              marginBottom: "0.5rem",
            }}
          >
            CAN I MARRY YOU
            <br />
            IN 2–3 YEARS?
          </h2>

          <p style={{ color: "#D92F70", fontSize: "1rem", marginBottom: "1.5rem", fontFamily: "Pixelify Sans, monospace" }}>
            I'd like to book your appointment from now. 👀❤️
          </p>

          {/* Status bar */}
          <div
            style={{
              background: "#FFF0F6",
              border: "3px solid #4A1830",
              padding: "6px 12px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "0.25rem",
            }}
          >
            <div style={{ width: 8, height: 8, background: "#FF5C9A", display: "inline-block" }} className="blink" />
            <span style={{ fontFamily: "VT323, monospace", fontSize: "1rem", color: "#4A1830", letterSpacing: "0.1em" }}>
              STATUS: AWAITING CONFIRMATION
            </span>
          </div>
        </div>
      </div>

      {/* Message bubble */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mb-4 px-5 py-3"
            style={{
              background: "#4A1830",
              color: "#FFF",
              fontFamily: "Pixelify Sans, monospace",
              fontSize: "1rem",
              border: "3px solid #FF5C9A",
            }}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Buttons */}
      <div ref={containerRef} className="relative flex items-center justify-center gap-6 w-full max-w-sm mx-auto h-24">
        {/* YES */}
        <motion.button
          className="pixel-btn-primary"
          onClick={onYes}
          animate={{ scale }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{ fontSize: "1.25rem", zIndex: 2 }}
        >
          YES ♥
        </motion.button>

        {/* NO */}
        <motion.button
          ref={noRef}
          className="pixel-btn-secondary"
          animate={{ x: noPos.x, y: noPos.y }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          onHoverStart={moveNo}
          onTouchStart={moveNo}
          onFocus={moveNo}
          style={{ fontSize: "1.25rem", zIndex: 2, position: "relative" }}
          aria-label="No (this button will try to escape)"
        >
          NO :(
        </motion.button>
      </div>

      {noCount > 0 && (
        <p style={{ fontFamily: "VT323, monospace", fontSize: "0.95rem", color: "#D92F70", opacity: 0.7, marginTop: "0.5rem" }}>
          (nice try)
        </p>
      )}
    </motion.div>
  );
}

// ─── Screen 3: Celebration / Confirmation ────────────────────────────────────

function CelebrationScreen({ onContinue }: { onContinue: () => void }) {
  useEffect(() => {
    const fire = () => {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.55 },
        colors: ["#FF5C9A", "#D92F70", "#FFD6E5", "#FFFFFF", "#FFD700"],
        shapes: ["square"],
        scalar: 0.9,
      });
    };
    const t1 = setTimeout(fire, 100);
    const t2 = setTimeout(fire, 600);
    const t3 = setTimeout(fire, 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <motion.div
      key="celebration"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col items-center justify-center min-h-dvh px-6 py-12 text-center relative z-10"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.1 }}
        className="mb-6"
      >
        <PixelHeart size={80} color="#FF5C9A" />
      </motion.div>

      <div className="pixel-border-card w-full max-w-sm mx-auto mb-8" style={{ background: "#FFFFFF" }}>
        <div
          className="px-5 py-2 text-center"
          style={{ background: "#FF5C9A", borderBottom: "4px solid #4A1830" }}
        >
          <span style={{ fontFamily: "VT323, monospace", fontSize: "1.1rem", color: "#FFF", letterSpacing: "0.12em" }}>
            ★ APPOINTMENT CONFIRMED ★
          </span>
        </div>
        <div className="px-6 py-7">
          <h2
            style={{
              fontFamily: "Pixelify Sans, monospace",
              fontSize: "1.9rem",
              fontWeight: 700,
              color: "#FF5C9A",
              marginBottom: "1rem",
            }}
          >
            APPOINTMENT
            <br />
            CONFIRMED ♥
          </h2>
          <p style={{ fontFamily: "Pixelify Sans, monospace", color: "#4A1830", fontSize: "1.05rem", marginBottom: "0.5rem" }}>
            "I knew you had good taste." 😌
          </p>

          <div
            className="mt-5 px-4 py-3"
            style={{ background: "#FFF0F6", border: "3px solid #FFD6E5" }}
          >
            <p style={{ fontFamily: "VT323, monospace", fontSize: "1rem", color: "#D92F70", letterSpacing: "0.08em" }}>
              REF: LOVE-2025-001<br />
              DATE: IN 2–3 YEARS<br />
              VENUE: TBD ♥
            </p>
          </div>
        </div>
      </div>

      <p
        style={{ fontFamily: "Pixelify Sans, monospace", color: "#4A1830", marginBottom: "1.5rem", fontSize: "1rem" }}
      >
        But… I have one more thing to ask you.
      </p>

      <button className="pixel-btn-primary" onClick={onContinue} style={{ fontSize: "1.2rem" }}>
        CONTINUE →
      </button>
    </motion.div>
  );
}

// ─── Screen 4: Baba Request ───────────────────────────────────────────────────

const preferredCountries: Country[] = ["AE", "IN", "SA", "QA", "KW", "OM", "BH", "GB", "US"];

function countryFlag(country: Country) {
  return country
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

function countryName(country: Country) {
  return countryLabels[country] || country;
}

function formatCountry(country: Country) {
  return `${countryFlag(country)} ${countryName(country)} (+${getCountryCallingCode(country)})`;
}

function orderedCountries() {
  const countries = getCountries();
  const preferred = preferredCountries.filter((country) => countries.includes(country));
  const rest = countries
    .filter((country) => !preferredCountries.includes(country))
    .sort((a, b) => countryName(a).localeCompare(countryName(b)));

  return [...preferred, ...rest];
}

function normalizePhone(country: Country, nationalPhone: string) {
  const parsed = parsePhoneNumberFromString(nationalPhone, country);

  if (!parsed || !parsed.isValid()) {
    return null;
  }

  return {
    country: formatCountry(country),
    phone: parsed.formatNational(),
    fullNumber: parsed.number,
  };
}

function formatNationalInput(country: Country, value: string) {
  return new AsYouType(country).input(value);
}

const web3FormsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "6b5635a8-90ff-4e81-adcf-88eba61eb142";

async function submitBabaNumber(payload: { country: string; phone: string; fullNumber: string }): Promise<void> {
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: web3FormsAccessKey,
      subject: "Love Appointment - Baba's Number",
      from_name: "Love Appointment",
      country: payload.country,
      phone: payload.phone,
      full_number: payload.fullNumber,
      message: [
        "Baba's number submitted from Love Appointment.",
        "",
        `Country: ${payload.country}`,
        `Phone: ${payload.phone}`,
        `Full number: ${payload.fullNumber}`,
      ].join("\n"),
      botcheck: false,
    }),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok || data?.success === false) {
    throw new Error(data?.message || "Phone number submission failed");
  }
}

function BabaScreen({ onSubmit }: { onSubmit: () => void }) {
  const [country, setCountry] = useState<Country>("AE");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const normalizedPhone = normalizePhone(country, phone);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submission = normalizePhone(country, phone);

    if (!phone.trim()) {
      setError("Please enter a number.");
      return;
    }
    if (!submission) {
      setError("That doesn't look like a valid number…");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await submitBabaNumber(submission);
      setSubmitting(false);
      onSubmit();
    } catch (err) {
      setSubmitting(false);
      setError(err instanceof Error ? err.message : "Oops… something went wrong. Please try again ❤️");
    }
  };

  return (
    <motion.div
      key="baba"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col items-center justify-center min-h-dvh px-6 py-12 text-center relative z-10"
    >
      <div className="pixel-border-card w-full max-w-sm mx-auto" style={{ background: "#FFFFFF" }}>
        <div
          className="px-5 py-3 flex items-center justify-center gap-2"
          style={{ background: "#D92F70", borderBottom: "4px solid #4A1830" }}
        >
          <span style={{ fontSize: "1.1rem" }}>📱</span>
          <span style={{ fontFamily: "VT323, monospace", fontSize: "1.1rem", color: "#FFF", letterSpacing: "0.12em" }}>
            BABA&apos;S NUMBER
          </span>
        </div>

        <div className="px-6 py-8 text-left">
          <div className="text-center mb-6">
            <div className="float mb-4" style={{ display: "inline-block" }}>
              <svg width="48" height="48" viewBox="0 0 16 16" style={{ imageRendering: "pixelated" }}>
                <rect x="5" y="1" width="6" height="6" fill="#FF5C9A" />
                <rect x="4" y="2" width="1" height="4" fill="#FF5C9A" />
                <rect x="11" y="2" width="1" height="4" fill="#FF5C9A" />
                <rect x="5" y="7" width="6" height="1" fill="#D92F70" />
                <rect x="3" y="9" width="10" height="6" fill="#FF5C9A" />
                <rect x="2" y="10" width="1" height="4" fill="#FF5C9A" />
                <rect x="13" y="10" width="1" height="4" fill="#FF5C9A" />
                <rect x="6" y="3" width="1" height="2" fill="#4A1830" />
                <rect x="9" y="3" width="1" height="2" fill="#4A1830" />
                <rect x="6" y="5" width="4" height="1" fill="#4A1830" />
              </svg>
            </div>
            <p style={{ fontFamily: "Pixelify Sans, monospace", color: "#4A1830", fontSize: "1rem", marginBottom: "0.25rem" }}>
              If we're going to do this properly…
            </p>
            <p style={{ fontFamily: "Pixelify Sans, monospace", color: "#D92F70", fontSize: "1.05rem", fontWeight: 700 }}>
              I think I should speak to your baba first. ❤️
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <label className="baba-field-label" htmlFor="baba-country">
              Country
            </label>
            <div className="baba-country-wrap" style={{ marginBottom: "1rem" }}>
              <select
                id="baba-country"
                className="baba-country-select"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value as Country);
                  setPhone((value) => formatNationalInput(e.target.value as Country, value));
                  setError("");
                }}
                aria-label="Country"
              >
                {orderedCountries().map((option) => (
                  <option key={option} value={option}>
                    {formatCountry(option)}
                  </option>
                ))}
              </select>
            </div>

            <label className="baba-field-label" htmlFor="baba-phone">
              Phone Number
            </label>
            <div className="baba-phone-wrap" style={{ marginBottom: "1rem" }}>
              <input
                id="baba-phone"
                className="baba-phone-input"
                value={phone}
                onChange={(e) => {
                  setPhone(formatNationalInput(country, e.target.value));
                  setError("");
                }}
                inputMode="tel"
                autoComplete="tel-national"
                placeholder="50 123 4567"
                aria-label="Baba's phone number"
              />
            </div>

            {normalizedPhone && (
              <p style={{ fontFamily: "VT323, monospace", fontSize: "1rem", color: "#FF5C9A", marginBottom: "0.75rem", textAlign: "center", letterSpacing: "0.05em" }}>
                ✓ {normalizedPhone.fullNumber}
              </p>
            )}

            {error && (
              <p style={{ fontFamily: "VT323, monospace", color: "#D92F70", fontSize: "1rem", marginBottom: "0.75rem", textAlign: "center" }}>
                ⚠ {error}
              </p>
            )}

            <button
              type="submit"
              className="pixel-btn-primary"
              disabled={submitting}
              style={{ width: "100%", fontSize: "1.2rem", opacity: submitting ? 0.7 : 1 }}
            >
              {submitting ? "SENDING…" : "SEND ♥"}
            </button>
          </form>

          <p style={{ fontFamily: "Pixelify Sans, monospace", color: "#D92F70", fontSize: "0.8rem", marginTop: "1rem", opacity: 0.75, textAlign: "center" }}>
            Only if you're comfortable sharing it. ❤️
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Screen 5: Loading ────────────────────────────────────────────────────────

function LoadingScreen() {
  const [dots, setDots] = useState(".");
  const [phase, setPhase] = useState(0);

  const phases = [
    "BOOKING",
    "CONTACTING APPOINTMENT OFFICE…",
    "Appointment processing…",
  ];

  useEffect(() => {
    const dotTimer = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "." : d + "."));
    }, 350);
    const phaseTimer1 = setTimeout(() => setPhase(1), 600);
    const phaseTimer2 = setTimeout(() => setPhase(2), 1200);
    return () => { clearInterval(dotTimer); clearTimeout(phaseTimer1); clearTimeout(phaseTimer2); };
  }, []);

  return (
    <motion.div
      key="loading"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col items-center justify-center min-h-dvh px-6 text-center relative z-10"
    >
      <div className="heartbeat mb-6">
        <PixelHeart size={60} color="#FF5C9A" />
      </div>
      <p
        style={{
          fontFamily: "VT323, monospace",
          fontSize: "1.8rem",
          color: "#4A1830",
          letterSpacing: "0.1em",
        }}
      >
        {phases[phase]}{dots}
      </p>
    </motion.div>
  );
}

// ─── Screen 6: Final Reveal ───────────────────────────────────────────────────

function FinalScreen({ onReplay }: { onReplay: () => void }) {
  useEffect(() => {
    const fire = () => {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.4 },
        colors: ["#FF5C9A", "#D92F70", "#FFD6E5", "#FFFFFF", "#FFD700"],
        shapes: ["square"],
        scalar: 1.1,
      });
    };
    const t = setTimeout(fire, 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      key="final"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col items-center justify-center min-h-dvh px-6 py-12 text-center relative z-10"
    >
      <div className="pixel-border-card w-full max-w-sm mx-auto mb-8" style={{ background: "#FFFFFF" }}>
        <div
          className="px-5 py-2 text-center"
          style={{ background: "#FF5C9A", borderBottom: "4px solid #4A1830" }}
        >
          <span style={{ fontFamily: "VT323, monospace", fontSize: "1.1rem", color: "#FFF", letterSpacing: "0.12em" }}>
            ★ FINAL MESSAGE ★
          </span>
        </div>
        <div className="px-6 py-10">
          <div
            className="w-full mb-6 overflow-hidden"
            style={{ background: "#FFF0F6", border: "4px solid #FFD6E5" }}
          >
            <img
              src={finalRevealImage}
              alt="A tiny kitten holding a red flower"
              style={{ display: "block", width: "100%", height: "auto" }}
            />
          </div>

          <h2
            style={{
              fontFamily: "Pixelify Sans, monospace",
              fontSize: "1.6rem",
              fontWeight: 700,
              color: "#4A1830",
              marginBottom: "0.5rem",
            }}
          >
            This idiot actually made
            <br />
            an entire website. 😂❤️
          </h2>
        </div>
      </div>

      <button
        className="pixel-btn-secondary"
        onClick={onReplay}
        style={{ fontSize: "1rem" }}
      >
        Replay ↻
      </button>
    </motion.div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>("intro");

  const go = (s: Screen) => setScreen(s);

  useEffect(() => {
    if (screen === "loading") {
      const t = setTimeout(() => go("final"), 2200);
      return () => clearTimeout(t);
    }
  }, [screen]);

  return (
    <div style={{ background: "#FFF0F6", minHeight: "100dvh", position: "relative" }}>
      <div className="scanline" aria-hidden="true" />
      <FloatingDecor />

      <AnimatePresence mode="wait">
        {screen === "intro" && <IntroScreen key="intro" onStart={() => go("question")} />}
        {screen === "question" && <QuestionScreen key="question" onYes={() => go("celebration")} />}
        {screen === "celebration" && <CelebrationScreen key="celebration" onContinue={() => go("baba")} />}
        {screen === "baba" && <BabaScreen key="baba" onSubmit={() => go("loading")} />}
        {screen === "loading" && <LoadingScreen key="loading" />}
        {screen === "final" && <FinalScreen key="final" onReplay={() => go("intro")} />}
      </AnimatePresence>
    </div>
  );
}
