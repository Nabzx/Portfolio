"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center section-padding scroll-snap-section relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 blur-3xl" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <motion.div
          variants={itemVariants}
          className="mb-8 relative inline-block"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-50 animate-pulse" />
          <div className="relative w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-purple-400 to-pink-400 p-1">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center text-4xl font-bold gradient-text">
              NS
            </div>
          </div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
        >
          <span className="gradient-text">NABIL SHAH PORTFOLIO IN PROGRESS</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 font-medium"
        >
          AI Engineer • Systems + ML • Multi-Agent RL • Distributed Pipelines
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300 mb-12 space-y-4"
        >
          <p className="text-lg leading-relaxed">
            I'm a Computer Science student with a First Class predicted grade, 
            passionate about becoming a world-class AI engineer. I specialize in 
            building scalable systems, machine learning pipelines, and multi-agent 
            reinforcement learning.
          </p>
          <p className="text-lg leading-relaxed">
            When I'm not coding, you'll find me playing chess, writing technical 
            articles, diving into research papers, or staying active at the gym. 
            I believe in the power of continuous learning and pushing the boundaries 
            of what's possible with AI.
          </p>
        </motion.div>

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
            className="glass rounded-full p-4 text-gray-700 dark:text-gray-300 hover:text-purple-500 transition-colors"
          >
            <Github className="w-6 h-6" />
          </motion.a>
          <motion.a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="glass rounded-full p-4 text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors"
          >
            <Linkedin className="w-6 h-6" />
          </motion.a>
          <motion.a
            href={SOCIAL_LINKS.email}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="glass rounded-full p-4 text-gray-700 dark:text-gray-300 hover:text-pink-500 transition-colors"
          >
            <Mail className="w-6 h-6" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}

