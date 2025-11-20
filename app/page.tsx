import { Hero } from "@/components/hero";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { TechStack } from "@/components/tech-stack";
import { Achievements } from "@/components/achievements";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Experience />
      <TechStack />
      <Projects />
      <Achievements />
      <Contact />
    </>
  );
}
