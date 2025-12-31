import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  AnimatePresence,
} from "framer-motion";
import { Star, ChevronRight } from "lucide-react";
// import { VideoText } from "./components/VideoText";
import { VideoText } from "@/components/ui/video-text";




/* -------------------- HYPER TEXT (WELCOME TO) -------------------- */

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const rand = (max) => Math.floor(Math.random() * max);

function HyperText({ children, className = "", duration = 800, delay = 0 }) {
  const [text, setText] = useState(children.split(""));
  const animating = useRef(false);

  useEffect(() => {
    const t = setTimeout(start, delay);
    return () => clearTimeout(t);
    // eslint-disable-next-line
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
          c === " "
            ? " "
            : i <= reveal
            ? c
            : CHARSET[rand(CHARSET.length)]
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
  <span
    className="bg-gradient-to-r from-white/40 via-white to-white/40
    bg-[length:200%_100%] bg-clip-text text-transparent
    animate-[shimmer_3s_linear_infinite]"
  >
    {children}
  </span>
);

/* -------------------- MAIN PAGE -------------------- */

export default function NewYearCelebration() {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [hasArrived, setHasArrived] = useState(false);
  const { x, y, size } = useMouseGlow(650);

  useEffect(() => {
    const timer = setInterval(() => {
      const target = new Date("January 1, 2026 00:00:00").getTime();
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
    <div className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center text-white">

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

      {/* BACKGROUND BLOBS */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-white/10 blur-[160px] rounded-full"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 14, repeat: Infinity }}
        className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-white/10 blur-[160px] rounded-full"
      />

      {/* CONFETTI AFTER MIDNIGHT */}
      <AnimatePresence>
        {hasArrived && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {[...Array(40)].map((_, i) => (
              <motion.span
                key={i}
                initial={{ y: "-10%", x: `${Math.random() * 100}%`, opacity: 1 }}
                animate={{ y: "110%", rotate: 360, opacity: 0 }}
                transition={{ duration: 4 + Math.random() * 2 }}
                className="absolute text-white"
              >
                ✦
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-4xl px-6 text-center">

        {/* BADGE */}
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-bold tracking-[0.35em] uppercase">
            The Grand Countdown
          </span>
        </div>

        {/* HERO TEXT */}
        {!hasArrived ? (
          <HyperText
            delay={200}
            className="text-4xl md:text-6xl font-black tracking-tight mb-2"
          >
            WELCOME TO
          </HyperText>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 12 }}
            className="text-4xl md:text-6xl font-black mb-2"
          >
            HAPPY NEW YEAR 🎉
          </motion.div>
        )}

<div className="relative h-[220px] md:h-[320px] w-full mb-12 overflow-hidden">
  <VideoText
    src="https://cdn.magicui.design/ocean-small.webm"
    fontSize={22}
    fontWeight={900}
  >
    2026
  </VideoText>
</div>



        {/* COUNTDOWN */}
        {!hasArrived && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {Object.entries(timeLeft).map(([label, value]) => (
              <div
                key={label}
                className="rounded-3xl bg-white/[0.05] border border-white/10 p-8 backdrop-blur-xl"
              >
                <div className="text-5xl md:text-6xl font-black mb-2">
                  {String(value).padStart(2, "0")}
                </div>
                <div className="text-[10px] tracking-[0.35em] uppercase text-white/60">
                  {label === "d"
                    ? "Days"
                    : label === "h"
                    ? "Hours"
                    : label === "m"
                    ? "Minutes"
                    : "Seconds"}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-6 bg-white text-black font-black rounded-2xl tracking-widest shadow-[0_0_40px_rgba(255,255,255,0.3)]"
        >
          {hasArrived ? "START THE YEAR" : "ENTER THE FUTURE"}
          <ChevronRight className="inline ml-2" />
        </motion.button>
      </div>

      {/* SIDE DECOR */}
      <div className="absolute bottom-10 left-10 hidden lg:flex items-center gap-4">
        <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-white/30" />
        <span className="text-[10px] tracking-[0.45em] uppercase text-white/60">
          <ShimmerText>Limited Edition 2026</ShimmerText>
        </span>
      </div>

      {/* SHIMMER KEYFRAMES */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </div>
  );
}
