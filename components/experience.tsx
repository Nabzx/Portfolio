"use client";

import { motion } from "framer-motion";
import { EXPERIENCE } from "@/lib/constants";
import { Briefcase } from "lucide-react";
import { useTheme } from "./theme-provider";

export function Experience() {
  const { theme } = useTheme();

  return (
    <section
      id="experience"
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
            <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-slate-200 text-lg">
            Building production systems and AI platforms
          </p>
        </motion.div>

        <div className="relative">
          <div className={`absolute left-8 top-0 bottom-0 w-0.5 hidden md:block ${
            theme === "dark"
              ? "bg-gradient-to-b from-sky-500 via-emerald-500 to-sky-500"
              : "bg-gradient-to-b from-pink-500 via-blue-500 to-purple-500"
          }`} />

          {EXPERIENCE.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative mb-12 md:ml-20"
            >
              <div className="glass rounded-2xl p-6 md:p-8 bg-slate-900/80 hover:scale-[1.02] transition-transform duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`glass rounded-full p-3 flex-shrink-0 ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-sky-500 to-emerald-400"
                      : "bg-gradient-to-br from-pink-500 to-blue-500"
                  }`}>
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-1 text-slate-50">
                      {exp.role}
                    </h3>
                    <p className={`text-xl font-semibold mb-2 ${
                      theme === "dark" ? "text-sky-400" : "text-purple-400"
                    }`}>
                      {exp.company}
                    </p>
                    <p className="text-slate-400 text-sm mb-4">
                      {exp.period}
                    </p>
                  </div>
                </div>

                <ul className="space-y-3 ml-4">
                  {exp.description.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + i * 0.1 }}
                      className="flex items-start gap-3 text-slate-200"
                    >
                      <span className={theme === "dark" ? "text-sky-400" : "text-purple-500"} style={{ marginTop: "0.5rem" }}>▹</span>
                      <span className="leading-relaxed">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className={`absolute left-0 top-6 w-4 h-4 rounded-full border-4 border-background hidden md:block ${
                theme === "dark"
                  ? "bg-gradient-to-br from-sky-500 to-emerald-400"
                  : "bg-gradient-to-br from-purple-500 to-pink-500"
              }`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
