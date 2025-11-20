"use client";

import { motion } from "framer-motion";
import { EXPERIENCE } from "@/lib/constants";
import { Briefcase } from "lucide-react";

export function Experience() {
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
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Building production systems and AI platforms
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 hidden md:block" />

          {EXPERIENCE.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative mb-12 md:ml-20"
            >
              <div className="glass rounded-2xl p-6 md:p-8 hover:scale-[1.02] transition-transform duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="glass rounded-full p-3 bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-1 text-foreground">
                      {exp.role}
                    </h3>
                    <p className="text-xl text-purple-400 font-semibold mb-2">
                      {exp.company}
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
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
                      className="flex items-start gap-3 text-slate-700 dark:text-slate-300"
                    >
                      <span className="text-purple-500 mt-2">▹</span>
                      <span className="leading-relaxed">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="absolute left-0 top-6 w-4 h-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-4 border-background hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

