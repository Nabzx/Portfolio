"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";

export function Contact() {
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
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            Let's Connect
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
            Always open to discussing AI, systems, or potential collaborations
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-8 md:p-12 text-center"
        >
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
            Whether you're interested in AI research, building scalable systems, 
            or just want to chat about technology, I'd love to hear from you!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.a
              href={SOCIAL_LINKS.email}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              <Mail className="w-5 h-5" />
              <span>Email Me</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>

            <motion.a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 rounded-full glass text-gray-700 dark:text-gray-300 hover:bg-white/20 transition-all"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </motion.a>

            <motion.a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 rounded-full glass text-gray-700 dark:text-gray-300 hover:bg-white/20 transition-all"
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

