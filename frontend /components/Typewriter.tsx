"use client";
import { Reviews } from "./Reviews";
import { Button } from "./ui/moving-border";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
export function Typewriter() {
  const words = [
    {
      text: "For",
      className: "font-serif",
    },
    {
      text: "2.2 Million+ ",
      className: "font-serif",
    },
    {
      text: "Businesses",
      className: "font-serif",
    },
    {
      text: "One magical ",
      className: "font-serif",
    },
    {
      text: "Automation.",
      className: "text-blue-500 dark:text-blue-500 font-serif",
    },
  ];
  return (
    <div className=" flex flex-col mt-3 items-center justify-center h-[30rem]  bg-blue-200 dark:bg-blue-900">
      <TypewriterEffectSmooth words={words} />

      <div className=" flex justify-center">
        <Button
          borderRadius="2.75rem"
          className="bg-purple-300 font-serif dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 "
        >
          See Customer Stories
        </Button>
      </div>
      <Reviews/>
    </div>
  );
}
