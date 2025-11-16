"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SECTIONS } from "@/lib/constants";
import { smoothScrollTo } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = SECTIONS.map((s) => s.id);
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
    >
      <div className="glass rounded-full p-4 space-y-4">
        {SECTIONS.map((section, index) => (
          <motion.button
            key={section.id}
            onClick={() => {
              smoothScrollTo(section.id);
              setActiveSection(section.id);
            }}
            className={cn(
              "relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
              activeSection === section.id
                ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white"
                : "text-gray-600 dark:text-gray-400 hover:bg-white/10"
            )}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className="text-xs font-medium">{index + 1}</span>
            {activeSection === section.id && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
}

