"use client";

import { motion } from "framer-motion";
import { ACHIEVEMENTS } from "@/lib/constants";

export function Achievements() {
  return (
    <section
      id="achievements"
      className="section-padding scroll-snap-section relative"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            Achievements
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Highlights from my journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass rounded-2xl p-6 text-center hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="text-5xl mb-4">{achievement.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-foreground">
                {achievement.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

