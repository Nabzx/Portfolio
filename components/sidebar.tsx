"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SECTIONS } from "@/lib/constants";
import { smoothScrollTo } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useTheme } from "./theme-provider";

export function Sidebar() {
  const [activeSection, setActiveSection] = useState("hero");
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const sections = SECTIONS.map((s) => s.id);
      const scrollPosition = window.scrollY + 200;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(id);
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
        {SECTIONS.map((section, index) => {
          const isActive = activeSection === section.id;

          return (
            <motion.button
              key={section.id}
              onClick={() => {
                smoothScrollTo(section.id);
                setActiveSection(section.id);
              }}
              className={cn(
                "relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 overflow-hidden font-display",
                isActive
                  ? "text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-white/10"
              )}
              whileHover={{ 
                scale: 1.1,
                rotate: 3,
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Active Background with gradient */}
              {isActive && (
                <motion.div
                  layoutId="sidebarActiveBg"
                  className={`absolute inset-0 rounded-full ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-green-500 to-teal-500"
                      : "bg-gradient-to-br from-pink-500 to-blue-500"
                  }`}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}

              {/* Number Label */}
              <span className="relative z-10 text-sm font-bold">
                {index + 1}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
}
