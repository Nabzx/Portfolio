"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./theme-provider";

export function EasterEggs() {
  const [activeEgg, setActiveEgg] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (key === "c") {
        setActiveEgg("matrix");
        setTimeout(() => setActiveEgg(null), 3000);
      } else if (key === "p") {
        setActiveEgg("piano");
        setTimeout(() => setActiveEgg(null), 2000);
      } else if (key === "s") {
        setActiveEgg("lightsaber");
        setTimeout(() => setActiveEgg(null), 1500);
      } else if (key === "m") {
        setActiveEgg("mma");
        setTimeout(() => setActiveEgg(null), 1000);
      } else if (key === "h") {
        setActiveEgg("chess");
        setTimeout(() => setActiveEgg(null), 5000);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <>
      {/* Matrix Code Rain */}
      <AnimatePresence>
        {activeEgg === "matrix" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] pointer-events-none"
          >
            <MatrixRain />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Piano Animation */}
      <AnimatePresence>
        {activeEgg === "piano" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] pointer-events-none flex items-center justify-center"
          >
            <PianoAnimation />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightsaber */}
      <AnimatePresence>
        {activeEgg === "lightsaber" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] pointer-events-none"
          >
            <LightsaberBeam />
          </motion.div>
        )}
      </AnimatePresence>

      {/* MMA Glove */}
      <AnimatePresence>
        {activeEgg === "mma" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] pointer-events-none flex items-center justify-center"
          >
            <MMAGlove />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chess Board */}
      <AnimatePresence>
        {activeEgg === "chess" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-[10000]"
          >
            <ChessBoard />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MatrixRain() {
  return (
    <div className="absolute inset-0 bg-black/90 overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-green-400 font-mono text-sm"
          initial={{
            x: `${(i * 2) % 100}%`,
            y: -100,
            opacity: 0,
          }}
          animate={{
            y: "100vh",
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 3,
            delay: i * 0.1,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {Array.from({ length: 20 })
            .map(() => String.fromCharCode(0x30a0 + Math.random() * 96))
            .join("")}
        </motion.div>
      ))}
    </div>
  );
}

function PianoAnimation() {
  return (
    <div className="flex gap-2">
      {["C", "D", "E", "F", "G", "A", "B"].map((note, i) => (
        <motion.div
          key={note}
          className="w-16 h-32 bg-white rounded-lg shadow-lg flex items-end justify-center pb-4"
          initial={{ scale: 1 }}
          animate={{
            scale: [1, 1.1, 1],
            y: [0, -10, 0],
          }}
          transition={{
            delay: i * 0.1,
            duration: 0.5,
            repeat: 2,
          }}
        >
          <span className="text-gray-800 font-bold">{note}</span>
        </motion.div>
      ))}
    </div>
  );
}

function LightsaberBeam() {
  return (
    <motion.div
      className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: "200%", opacity: [0, 1, 1, 0] }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      style={{
        boxShadow: "0 0 20px #3b82f6, 0 0 40px #3b82f6, 0 0 60px #3b82f6",
      }}
    />
  );
}

function MMAGlove() {
  return (
    <motion.div
      className="text-6xl"
      initial={{ x: -200, rotate: -45 }}
      animate={{
        x: [0, 50, 0],
        rotate: [-45, 0, -45],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 1,
        ease: "easeOut",
      }}
    >
      🥊
    </motion.div>
  );
}

function ChessBoard() {
  const squares = Array.from({ length: 64 });
  return (
    <div className="glass rounded-lg p-4">
      <div className="grid grid-cols-8 gap-0 w-64 h-64">
        {squares.map((_, i) => {
          const row = Math.floor(i / 8);
          const col = i % 8;
          const isLight = (row + col) % 2 === 0;
          return (
            <div
              key={i}
              className={`w-8 h-8 ${
                isLight ? "bg-amber-100" : "bg-amber-800"
              } flex items-center justify-center`}
            >
              {i === 0 && "♜"}
              {i === 7 && "♜"}
              {i === 1 && "♞"}
              {i === 6 && "♞"}
              {i === 2 && "♝"}
              {i === 5 && "♝"}
              {i === 3 && "♛"}
              {i === 4 && "♚"}
              {i >= 8 && i <= 15 && "♟"}
              {i >= 48 && i <= 55 && "♙"}
              {i === 56 && "♖"}
              {i === 63 && "♖"}
              {i === 57 && "♘"}
              {i === 62 && "♘"}
              {i === 58 && "♗"}
              {i === 61 && "♗"}
              {i === 59 && "♕"}
              {i === 60 && "♔"}
            </div>
          );
        })}
      </div>
    </div>
  );
}

