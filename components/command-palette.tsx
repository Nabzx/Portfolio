"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import { SECTIONS, SOCIAL_LINKS } from "@/lib/constants";
import { smoothScrollTo } from "@/lib/utils";
import {
  Github,
  Linkedin,
  Mail,
  Home,
  Briefcase,
  FolderKanban,
  Code,
  Award,
  MessageSquare,
} from "lucide-react";

const icons = {
  hero: Home,
  experience: Briefcase,
  projects: FolderKanban,
  tech: Code,
  achievements: Award,
  contact: MessageSquare,
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl"
          >
            <Command className="glass rounded-2xl shadow-2xl border border-white/20">
              <Command.Input
                placeholder="Type a command or search..."
                className="w-full px-4 py-3 bg-transparent border-none outline-none text-foreground placeholder:text-gray-500"
              />
              <Command.List className="max-h-96 overflow-y-auto p-2">
                <Command.Empty className="px-4 py-8 text-center text-gray-500">
                  No results found.
                </Command.Empty>

                <Command.Group heading="Navigation">
                  {SECTIONS.map((section) => {
                    const Icon = icons[section.id as keyof typeof icons];
                    return (
                      <Command.Item
                        key={section.id}
                        onSelect={() => {
                          smoothScrollTo(section.id);
                          setOpen(false);
                        }}
                        className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer hover:bg-white/10"
                      >
                        <Icon className="w-4 h-4" />
                        <span>{section.label}</span>
                      </Command.Item>
                    );
                  })}
                </Command.Group>

                <Command.Group heading="Social">
                  <Command.Item
                    onSelect={() => {
                      window.open(SOCIAL_LINKS.github, "_blank");
                      setOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer hover:bg-white/10"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => {
                      window.open(SOCIAL_LINKS.linkedin, "_blank");
                      setOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer hover:bg-white/10"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => {
                      window.location.href = SOCIAL_LINKS.email;
                      setOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer hover:bg-white/10"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

