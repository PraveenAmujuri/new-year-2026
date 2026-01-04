import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Hamster from "../assets/hamster.jpg";
import Arthur from "../assets/arthur.png";
import { useNavigate } from "react-router-dom";


const COMMANDS = [
  "Initializing 2026 kernel...",
  "Mounting reality partitions...",
  "Loading responsibilities...",
  "Loading regrets...",
  "Loading motivation...",
  "Motivation module failed ❌",
  "Retrying...",
  "Retrying...",
  "Fallback: Manual effort required",
];

const PROMPT = "praveen@admin:~ $";

export default function Troll2() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [currentText, setCurrentText] = useState("");
  const [cmdIndex, setCmdIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    if (!typing) return;

    if (cmdIndex >= COMMANDS.length) {
      setTyping(false);
      return;
    }

    if (charIndex < COMMANDS[cmdIndex].length) {
      const t = setTimeout(() => {
        setCurrentText((prev) => prev + COMMANDS[cmdIndex][charIndex]);
        setCharIndex((i) => i + 1);
      }, 35); // typing speed
      return () => clearTimeout(t);
    } else {
      // Line complete
      const t = setTimeout(() => {
        setHistory((h) => [...h, COMMANDS[cmdIndex]]);
        setCurrentText("");
        setCharIndex(0);
        setCmdIndex((i) => i + 1);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [charIndex, cmdIndex, typing]);

  return (
    <div className="bg-black text-white">

      {/* ================= BOOT SCREEN ================= */}
      <section className="h-screen flex flex-col items-center justify-center px-6">

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-black mb-2"
        >
          SYSTEM BOOTING
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.4 }}
          className="text-xs tracking-widest uppercase mb-10"
        >
          Initializing Year 2026
        </motion.p>

        {/* TERMINAL */}
        <div className="w-full max-w-2xl bg-black/70 border border-white/10 rounded-2xl p-6 font-mono text-sm relative overflow-hidden">

          {/* Flicker */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.04] animate-[flicker_3s_infinite]" />

          {/* HISTORY */}
          {history.map((line, i) => (
            <div key={i} className="text-white/80">
              <span className="text-green-400">{PROMPT}</span> {line}
            </div>
          ))}

          {/* CURRENT LINE */}
          {typing && (
            <div className="flex items-center text-white/80">
              <span className="text-green-400">{PROMPT}</span>
              <span className="ml-1">{currentText}</span>
              <span className="ml-0.5 w-2 h-4 bg-green-400 animate-blink" />
            </div>
          )}

          {/* IDLE PROMPT */}
          {!typing && (
            <div className="flex items-center text-green-400 mt-2">
              {PROMPT}
              <span className="ml-1 w-2 h-4 bg-green-400 animate-blink" />
            </div>
          )}
        </div>

        {/* SCROLL HINT */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 4 }}
          className="absolute bottom-10 text-xs tracking-widest uppercase"
        >
          Scroll to continue ↓
        </motion.div>
      </section>

      {/* SPACER */}
      <div className="h-[40vh]" />

      {/* HAMSTER */}
      <section className="flex justify-center mb-48 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-md text-center"
        >
          <img src={Hamster} className="rounded-xl mb-4" />
          <p className="text-sm opacity-70">
            Hold up bro… let him cook 🔥
          </p>
        </motion.div>
      </section>

      {/* ARTHUR */}
      <section className="flex justify-center mb-40 px-6">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-xl text-center"
        >
          <img src={Arthur} className="rounded-xl mb-6" />
          <p className="text-lg md:text-xl font-semibold">
            There ain’t no shortcut, partner.
          </p>
          <p className="mt-2 text-sm opacity-60">
            A year don’t mean nothin’ without action.
          </p>
        </motion.div>
      </section>

<div className="flex justify-center mb-32">
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => navigate("/")}
    className="
      px-10 py-4
      bg-white text-black
      font-black tracking-widest
      rounded-2xl
      shadow-[0_0_30px_rgba(255,255,255,0.25)]
    "
  >
    ACCEPT REALITY
  </motion.button>
</div>


      {/* EFFECTS */}
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1 }
          51%, 100% { opacity: 0 }
        }
        .animate-blink {
          animation: blink 1s steps(1) infinite;
        }
        @keyframes flicker {
          0%, 100% { opacity: 0.03 }
          50% { opacity: 0.06 }
        }
      `}</style>
    </div>
  );
}
