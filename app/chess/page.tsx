"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const chessPieces = ["♔", "♕", "♖", "♗", "♘", "♙"];

export default function ChessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-3xl" />
      
      <motion.button
        onClick={() => router.push("/")}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-6 left-6 glass rounded-full p-3 text-gray-700 dark:text-gray-300 hover:bg-white/20 transition-colors z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowLeft className="w-5 h-5" />
      </motion.button>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-6xl sm:text-8xl font-bold mb-8 gradient-text"
        >
          ♟️ Chess
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 dark:text-gray-400 mb-12"
        >
          You found the easter egg! Chess is one of my favorite hobbies.
        </motion.p>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-8">
          {chessPieces.map((piece, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.3 + index * 0.1,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              whileHover={{
                scale: 1.2,
                rotate: [0, -10, 10, -10, 0],
                transition: { duration: 0.5 },
              }}
              className="glass rounded-2xl p-8 text-6xl cursor-pointer"
            >
              {piece}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16 glass rounded-2xl p-8"
        >
          <p className="text-lg text-gray-700 dark:text-gray-300">
            I enjoy playing chess as a way to sharpen strategic thinking and 
            problem-solving skills. The game's complexity and depth make it a 
            perfect complement to my work in AI and systems engineering.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

