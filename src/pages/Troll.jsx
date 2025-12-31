import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Hamster from "../assets/hamster.jpg"; // your meme
import Arthur from "../assets/arthur.png";   // your RDR image

export default function Troll() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Disable auto scroll bounce feeling
    document.body.style.overflow = "auto";

    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-[200vh] bg-black text-white flex flex-col items-center">

      {/* TOP MESSAGE */}
      <div className="h-screen flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-3xl md:text-5xl font-black mb-4">
          🚫 No Future Machine Found
        </h1>
        <p className="text-white/60 tracking-wide">
          Scroll if you dare.
        </p>
      </div>

      {/* HAMSTER MEME */}
      {scrollY > 120 && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md text-center mb-32"
        >
          <img
            src={Hamster}
            alt="Let him cook"
            className="rounded-xl mb-4"
          />
          <p className="text-lg font-semibold">
            “Wait bro… let him cook.”
          </p>
        </motion.div>
      )}

      {/* ARTHUR MORGAN */}
      {scrollY > 420 && (
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl text-center mb-40"
        >
          <img
            src={Arthur}
            alt="Arthur Morgan"
            className="rounded-xl mb-6"
          />
          <p className="text-2xl font-black">
            There is no time machine, buddy.
          </p>
          <p className="mt-2 text-sm tracking-widest opacity-60">
            — Arthur Morgan
          </p>
        </motion.div>
      )}
    </div>
  );
}
