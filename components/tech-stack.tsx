"use client";

import { motion } from "framer-motion";
import { TECH_STACK } from "@/lib/constants";

const categoryLabels = {
  languages: "Languages",
  ml: "ML/AI",
  cloud: "Cloud & Data",
  systems: "Systems & Tools",
};

export function TechStack() {
  return (
    <section
      id="tech"
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
            Tech Stack
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Technologies I work with
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(TECH_STACK).map(([category, items], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="text-2xl font-bold mb-6 text-foreground">
                {categoryLabels[category as keyof typeof categoryLabels]}
              </h3>
              <div className="space-y-4">
                {items.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.1 + index * 0.05 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {item.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {item.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: categoryIndex * 0.1 + index * 0.05,
                          ease: "easeOut",
                        }}
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

