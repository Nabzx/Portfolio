"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";
import { HeroOrb } from "./hero-orb";
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
      <HeroOrb />
      
      {/* Background gradient */}
      <div
          className={`absolute inset-0 -z-10 ${
            theme === "dark"
              ? "bg-gradient-radial from-teal-500/20 via-green-500/20 to-blue-600/20"
              : "bg-gradient-radial from-pink-500/20 via-blue-500/20 to-purple-500/20"
          } blur-3xl`}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        {/* Logo with radial gradient background */}
        <motion.div variants={itemVariants} className="mb-8 relative inline-block">
          <div
            className={`absolute inset-0 rounded-full blur-xl opacity-40 ${
              theme === "dark"
                ? "bg-gradient-radial from-teal-400 to-green-400"
                : "bg-gradient-radial from-pink-400 to-blue-400"
            }`}
          />

          <div
            className={`relative w-32 h-32 mx-auto rounded-full p-1 ${
              theme === "dark"
                ? "bg-gradient-to-br from-teal-400 to-green-400"
                : "bg-gradient-to-br from-pink-400 to-blue-400"
            }`}
          >
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center text-4xl font-bold text-foreground font-display">
              NS
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-foreground font-display"
        >
          Nabil Shah
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-xl sm:text-2xl text-slate-700 dark:text-slate-300 mb-8 font-medium"
        >
          Software Engineer @ Minexx • AI Systems • Distributed Pipelines • Multi-Agent RL
        </motion.p>

        {/* Paragraph */}
        <motion.div
          variants={itemVariants}
          className="max-w-2xl mx-auto text-slate-800 dark:text-slate-200 mb-12 space-y-4"
        >
          <p className="text-lg leading-relaxed">
            I'm a Computer Science student with a First Class prediction, currently 
            interning as a Software Engineer at Minexx. I specialise in building scalable 
            systems, AI pipelines, and multi-agent reinforcement learning. Outside of work, 
            I enjoy MMA, playing the piano, chess, competitive debating, and indulging in 
            all things Star Wars.
          </p>
          <p className="text-lg leading-relaxed">
            I'm actively working towards postgraduate study at Oxford and aiming for a 
            future role at a FAANG company.
          </p>
        </motion.div>

        {/* CV Button */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
              theme === "dark"
                ? "bg-gradient-to-r from-green-500 to-teal-500 text-white"
                : "bg-gradient-to-r from-pink-500 to-blue-500 text-white"
            } hover:shadow-lg`}
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
            className="glass rounded-full p-4 text-foreground hover:text-purple-500 dark:hover:text-green-400 transition-colors"
          >
            <Github className="w-6 h-6" />
          </motion.a>
          <motion.a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="glass rounded-full p-4 text-foreground hover:text-blue-500 dark:hover:text-teal-400 transition-colors"
          >
            <Linkedin className="w-6 h-6" />
          </motion.a>
          <motion.a
            href={SOCIAL_LINKS.email}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="glass rounded-full p-4 text-foreground hover:text-pink-500 dark:hover:text-green-400 transition-colors"
          >
            <Mail className="w-6 h-6" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
