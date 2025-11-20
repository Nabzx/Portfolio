"use client";

import { motion } from "framer-motion";
import { ACHIEVEMENTS } from "@/lib/constants";
import { useTheme } from "./theme-provider";
import { cn } from "@/lib/utils";

export function Achievements() {
  const { theme } = useTheme();

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
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 font-display">
            <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-slate-200 text-lg">
            Highlights from my journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5, rotate: 2 }}
              className="group"
            >
              <div
                className={cn(
                  "rounded-2xl p-[1px]",
                  theme === "dark"
                    ? "bg-gradient-to-br from-sky-500/50 to-emerald-400/50"
                    : "bg-gradient-to-br from-pink-500 to-blue-500"
                )}
              >
                <div className="glass rounded-2xl p-6 text-center bg-slate-900/80 hover:bg-slate-900/90 transition-all duration-300">
                  <div className="text-5xl mb-4">{achievement.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-slate-50 font-display">
                    {achievement.title}
                  </h3>
                  <p className="text-slate-200 text-sm">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
