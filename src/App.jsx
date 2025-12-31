import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import { Star, ChevronRight } from "lucide-react";
import PraveenLogo from "./assets/praveen-logo.png";
import { Routes, Route, useNavigate } from "react-router-dom";
import Troll from "./pages/Troll";

/* -------------------- HYPER TEXT -------------------- */

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const rand = (max) => Math.floor(Math.random() * max);

function HyperText({ children, className = "", duration = 800, delay = 0 }) {
  const [text, setText] = useState(children.split(""));
  const animating = useRef(false);

  useEffect(() => {
    const t = setTimeout(start, delay);
    return () => clearTimeout(t);
  }, []);

  const start = () => {
    if (animating.current) return;
    animating.current = true;
    const startTime = performance.now();

    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const reveal = Math.floor(progress * children.length);

      setText(
        children.split("").map((c, i) =>
          c === " " ? " " : i <= reveal ? c : CHARSET[rand(CHARSET.length)]
        )
      );

      if (progress < 1) requestAnimationFrame(animate);
      else animating.current = false;
    };

    requestAnimationFrame(animate);
  };

  return (
    <div onMouseEnter={start} className={`font-mono ${className}`}>
      {text.map((c, i) => (
        <span key={i}>{c}</span>
      ))}
    </div>
  );
}

/* -------------------- MOUSE GLOW -------------------- */

function useMouseGlow(size = 600) {
  const x = useMotionValue(-size);
  const y = useMotionValue(-size);

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return { x, y, size };
}

/* -------------------- SHIMMER TEXT -------------------- */

const ShimmerText = ({ children }) => (
  <span className="bg-gradient-to-r from-white/40 via-white to-white/40 bg-[length:200%_100%] bg-clip-text text-transparent animate-[shimmer_3s_linear_infinite]">
    {children}
  </span>
);

/* -------------------- MAIN APP -------------------- */

export default function App() {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [hasArrived, setHasArrived] = useState(false);
  const { x, y, size } = useMouseGlow(650);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
       const target = new Date("January 1, 2026 00:00:00").getTime();
      //const target = new Date("September 15, 2025 19:45:00").getTime();

      const diff = target - Date.now();

      if (diff <= 0) {
        setHasArrived(true);
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Routes>
      {/* MAIN PAGE */}
      <Route
        path="/"
        element={
          <div className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center text-white">

            {/* LOGO */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute top-6 left-6 z-20"
            >
              <img
                src={PraveenLogo}
                alt="Praveen AI"
                className="w-32 md:w-40 lg:w-44 object-contain opacity-90 hover:opacity-100 hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.35)] transition-all"
              />
            </motion.div>

            {/* MOUSE GLOW */}
            <motion.div
              className="pointer-events-none fixed inset-0 z-[1]"
              style={{
                background: useMotionTemplate`
                  radial-gradient(${size}px circle at ${x}px ${y}px,
                  rgba(255,255,255,0.15),
                  transparent 70%)
                `,
              }}
            />

            {/* BACKGROUND */}
            <motion.div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-white/10 blur-[160px] rounded-full" />
            <motion.div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-white/10 blur-[160px] rounded-full" />

            {/* CONTENT */}
            <div className="relative z-10 w-full max-w-4xl px-6 text-center">

              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-xs tracking-[0.35em] uppercase">
                  The Grand Countdown
                </span>
              </div>

              {!hasArrived ? (
                <HyperText className="text-4xl md:text-6xl font-black mb-2">
                  WELCOME TO
                </HyperText>
              ) : (
                <div className="text-4xl md:text-6xl font-black mb-2">
                  HAPPY NEW YEAR 🎉
                </div>
              )}

              <h1 className="text-7xl md:text-9xl font-black italic mb-12">
                2026
              </h1>

              {!hasArrived && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                  {Object.entries(timeLeft).map(([k, v]) => (
                    <div key={k} className="rounded-3xl bg-white/[0.05] p-8">
                      <div className="text-5xl font-black">
                        {String(v).padStart(2, "0")}
                      </div>
                      <div className="text-[10px] tracking-[0.35em] uppercase opacity-60">
                        {k}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (!hasArrived) navigate("/future");
                }}
                className="px-12 py-6 bg-white text-black font-black rounded-2xl"
              >
                {hasArrived ? "START THE YEAR" : "ENTER THE FUTURE"}
                <ChevronRight className="inline ml-2" />
              </motion.button>

              {/* WISH */}
              <div className="mt-10 text-sm opacity-70">
                {hasArrived
                  ? "Wishing you clarity, courage, and momentum in 2026."
                  : "The future isn’t ready yet — but you are."}
                <div className="mt-1 text-xs tracking-widest uppercase">
                  — Praveen
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="absolute bottom-10 left-10 hidden lg:flex gap-4 text-xs tracking-widest opacity-60">
              <ShimmerText>Limited Edition 2026</ShimmerText>
            </div>

            <style>{`
              @keyframes shimmer {
                0% { background-position: 0% 50%; }
                100% { background-position: 200% 50%; }
              }
            `}</style>
          </div>
        }
      />

      {/* TROLL PAGE */}
      <Route path="/future" element={<Troll />} />
    </Routes>
  );
}
