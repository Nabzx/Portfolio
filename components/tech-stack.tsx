"use client";

import { motion } from "framer-motion";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { TECH_STACK } from "@/lib/constants";
import { useTheme } from "./theme-provider";
import { useMemo } from "react";

function TechRing() {
  const { theme } = useTheme();
  const allTech = useMemo(() => {
    return [
      ...TECH_STACK.languages.map((t) => t.name),
      ...TECH_STACK.ml.map((t) => t.name),
      ...TECH_STACK.cloud.map((t) => t.name),
      ...TECH_STACK.systems.map((t) => t.name),
    ];
  }, []);

  return (
    <group rotation={[0, 0, 0]}>
      {allTech.map((tech, i) => {
        const angle = (i / allTech.length) * Math.PI * 2;
        const radius = 3;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <mesh
            key={tech}
            position={[x, 0, z]}
            rotation={[0, -angle, 0]}
          >
            <boxGeometry args={[0.3, 0.3, 0.3]} />
            <meshStandardMaterial
              color={theme === "dark" ? "#22c55e" : "#8b5cf6"}
              emissive={theme === "dark" ? "#10b981" : "#a855f7"}
              emissiveIntensity={0.5}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function TechScene() {
  // Only render on client side
  if (typeof window === "undefined") {
    return <div className="h-96 w-full" />;
  }

  return (
    <Canvas camera={{ position: [0, 0, 8] }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        <TechRing />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1}
        />
      </Suspense>
    </Canvas>
  );
}

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
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 font-display">
            <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Technologies I work with
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 3D Ring */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-96 w-full"
          >
            <TechScene />
          </motion.div>

          {/* Category Lists */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {Object.entries(TECH_STACK).map(([category, items], categoryIndex) => {
              const categoryLabels: Record<string, string> = {
                languages: "Languages",
                ml: "ML/AI",
                cloud: "Cloud & Data",
                systems: "Systems & Tools",
              };

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: categoryIndex * 0.1 }}
                  className="glass rounded-2xl p-6"
                >
                  <h3 className="text-xl font-bold mb-4 text-foreground font-display">
                    {categoryLabels[category]}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span
                        key={item.name}
                        className="px-4 py-2 rounded-full text-sm bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-green-500/10 dark:to-teal-500/10 text-foreground border border-purple-500/20 dark:border-green-500/20 hover:scale-105 transition-transform"
                      >
                        {item.name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
