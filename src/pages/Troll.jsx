import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Troll() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center text-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl"
      >
        <h1 className="text-5xl md:text-6xl font-black mb-6">
          🚫 ACCESS DENIED
        </h1>

        <p className="text-white/70 text-lg mb-4">
          The future is <span className="font-bold">not unlocked yet</span>.
        </p>

        <p className="text-white/50 text-sm mb-10">
          Time-based mission. Please return after midnight.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl"
        >
          <ArrowLeft size={18} />
          Go Back
        </motion.button>

        <p className="mt-10 text-xs tracking-widest uppercase text-white/40">
          — Praveen
        </p>
      </motion.div>
    </div>
  );
}
