"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";
import { useTheme } from "./theme-provider";

export function Hero() {
  const { theme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center section-padding scroll-snap-section overflow-visible"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        {/* Logo with radial gradient background */}
        <motion.div variants={itemVariants} className="mb-8 relative inline-block">
          <div
            className={`absolute inset-0 rounded-full blur-xl opacity-30 ${
              theme === "dark"
                ? "bg-gradient-radial from-sky-400 to-emerald-400"
                : "bg-gradient-radial from-pink-400 to-blue-400"
            }`}
          />

          <div
            className={`relative w-32 h-32 mx-auto rounded-full p-1 ${
              theme === "dark"
                ? "bg-gradient-to-br from-sky-400 to-emerald-400"
                : "bg-gradient-to-br from-pink-400 to-blue-400"
            }`}
          >
            <div className="w-full h-full rounded-full bg-slate-950 dark:bg-slate-950 flex items-center justify-center text-4xl font-bold text-white font-display">
              NS
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 text-white font-display"
        >
          Nabil Shah in the making...
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-slate-200 mb-6 font-medium"
        >
          Software Engineer @ Minexx • Artificial Intelligence • President of Founders
        </motion.p>

        {/* Paragraph */}
        <motion.div
          variants={itemVariants}
          className="max-w-2xl mx-auto text-base sm:text-lg text-slate-200 leading-relaxed mb-12 space-y-4"
        >
          <p>
            I'm a final year Computer Science student with a First Class prediction, currently 
            interning as a Software Engineer at Minexx. I specialise in building scalable 
            systems, AI pipelines, and multi-agent reinforcement learning. Outside of work, 
            I enjoy MMA, playing the piano, chess, competitive debating and travelling. 
            Self Improvement is my motto and I'm always looking for new challenges and opportunities to grow.
            I'm actively working towards postgraduate study at Oxford and aiming for a 
            future role at a FAANG company.
          </p>
        </motion.div>

        {/* CV Button */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.a
            href="/Nabil_Shah_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-sky-500 to-emerald-400 text-slate-900 font-semibold shadow-lg hover:shadow-emerald-500/40 transition-all"
          >
            <FileText className="w-5 h-5" />
            <span>View CV</span>
          </motion.a>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-6"
        >
          <motion.a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="glass rounded-full p-4 text-slate-200 hover:text-sky-400 transition-colors"
          >
            <Github className="w-6 h-6" />
          </motion.a>
          <motion.a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="glass rounded-full p-4 text-slate-200 hover:text-emerald-400 transition-colors"
          >
            <Linkedin className="w-6 h-6" />
          </motion.a>
          <motion.a
            href={SOCIAL_LINKS.email}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="glass rounded-full p-4 text-slate-200 hover:text-sky-400 transition-colors"
          >
            <Mail className="w-6 h-6" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
