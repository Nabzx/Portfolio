"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";
import { useTheme } from "./theme-provider";
import { cn } from "@/lib/utils";

export function Contact() {
  const { theme } = useTheme();

  return (
    <section
      id="contact"
      className="section-padding scroll-snap-section relative"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 font-display">
            <span className="gradient-text">Let's Connect</span>
          </h2>
          <p className="text-slate-200 text-lg mb-8">
            Always open to discussing AI, systems, or potential collaborations
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-8 md:p-12 text-center bg-slate-900/80"
        >
          <p className="text-xl text-slate-100 mb-8 leading-relaxed">
            Whether you're interested in AI research, building scalable systems, 
            or just want to chat about technology, I'd love to hear from you!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.a
              href={SOCIAL_LINKS.email}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all relative overflow-hidden group",
                theme === "dark"
                  ? "bg-gradient-to-r from-sky-500 to-emerald-400 text-slate-900"
                  : "bg-gradient-to-r from-pink-500 to-blue-500 text-white"
              )}
            >
              <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
              <span className="absolute inset-0 rounded-full ring-2 ring-white/50 opacity-0 group-hover:opacity-100 transition-opacity scale-110" />
              <Mail className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Email Me</span>
              <ArrowRight className="w-4 h-4 relative z-10" />
            </motion.a>

            <motion.a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 rounded-full glass text-slate-100 hover:bg-white/10 transition-all relative group bg-slate-900/80 border border-sky-400/30"
            >
              <span className="absolute inset-0 rounded-full ring-2 ring-sky-500/30 opacity-0 group-hover:opacity-100 transition-opacity scale-110" />
              <Github className="w-5 h-5 relative z-10" />
              <span className="relative z-10">GitHub</span>
            </motion.a>

            <motion.a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 rounded-full glass text-slate-100 hover:bg-white/10 transition-all relative group bg-slate-900/80 border border-emerald-400/30"
            >
              <span className="absolute inset-0 rounded-full ring-2 ring-emerald-500/30 opacity-0 group-hover:opacity-100 transition-opacity scale-110" />
              <Linkedin className="w-5 h-5 relative z-10" />
              <span className="relative z-10">LinkedIn</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
