"use client";
import { partners } from "@/app/configs/constants";
import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";

export const Branding = () => {
  return (
    <div className="border-t border-b border-[#000] py-10">
      
      <div className="w-full text-center pt-1">
        <h3 className="uppercase bg-[#F091DD] rounded p-2 text-xl md:text-2xl text-center inline-block font-medium z-20 relative">
          NOW POWERING THE WORLD&apos;S TOP Automation Tool
        </h3>
      </div>
      <Marquee className="w-full flex">
        {partners.map((i: PartnersTypes, index: number) => (
          <>
            <Image
              src={i.url}
              key={i.url}
              width={200}
              height={200}
              alt="partner"
              className={`md:mx-8 w-[150px] md:w-[180px] mx-3`}
            />
          </>
        ))}
      </Marquee>
    </div>
  );
};
