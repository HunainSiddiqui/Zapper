"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";

export function Benefits() {
  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold font-serif text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
      >
        Jumpstart your project with our Expertly
        <Highlight className="text-black dark:text-white">
          Crafted templates
        </Highlight>
      </motion.h1>
      <p className="text-center py-4 font-normal font-serif">
        Begin your project seamlessly with our user-friendly templates.
        <br />
        Designed with best practices in mind, they help you save time and avoid
        common pitfalls.
      </p>
    </HeroHighlight>
  );
}
