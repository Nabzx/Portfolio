"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, PROJECT_CATEGORIES } from "@/lib/constants";
import { Github, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filteredProjects =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
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
            Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
            Building scalable systems and AI solutions
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {PROJECT_CATEGORIES.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveFilter(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all",
                  activeFilter === category
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    : "glass text-gray-700 dark:text-gray-300 hover:bg-white/20"
                )}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="glass rounded-2xl p-6 h-full flex flex-col hover:border-purple-500/50 transition-all duration-300 glow-effect">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-purple-400 transition-colors">
                      {project.title}
                    </h3>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-purple-500 transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1">
                    {project.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    {project.highlights.map((highlight, i) => (
                      <div
                        key={i}
                        className="text-sm text-gray-500 dark:text-gray-400 flex items-start gap-2"
                      >
                        <span className="text-purple-500 mt-1">▸</span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

