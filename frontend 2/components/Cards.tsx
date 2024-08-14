"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import Link from "next/link";
import { Button } from "./ui/moving-border";


export function Cards() {
  return (
    <div>
      <CardContainer className="flex flex-row justify-start space-x-4">
        <CardBody className="bg-gray-50 relative group dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[25rem] h-[30rem] rounded-xl p-6 border mx-2 flex flex-col justify-between">
          <div>
            <CardItem
              translateZ="50"
              className="text-xl font-bold font-serif text-neutral-600 dark:text-white"
            >
              Draft email replies
              <br />
              to Customers
            </CardItem>

            <CardItem translateZ="100" className="w-full mt-4">
              <Image
                src="https://res.cloudinary.com/deadhqx3x/image/upload/v1722921914/Zapier/apym9atm0y9ka8pk8iiw.png"
                height="1000"
                width="1000"
                className="h-60 w-full object-cover rounded-xl group-hover:shadow-xl"
                alt="thumbnail"
              />
            </CardItem>
          </div>
          <div className="flex justify-between items-center mt-4">
            <CardItem
              translateZ={20}
              as={Link}
              href="/"
              target="__blank"
              className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
            >
              Get Started →
            </CardItem>
          </div>
        </CardBody>

        <CardBody className="bg-gray-50 relative group dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[25rem] h-[30rem] rounded-xl p-6 border mx-2 flex flex-col justify-between">
          <div>
            <CardItem
              translateZ="50"
              className="text-xl font-bold font-serif text-neutral-600 dark:text-white"
            >
              Create an expenses hub for your team
            </CardItem>

            <CardItem translateZ="100" className="w-full mt-4">
              <Image
                src="https://res.cloudinary.com/deadhqx3x/image/upload/v1722923472/Zapier/qu17urfmc7x83zubavmg.jpg"
                height="1000"
                width="1000"
                className="h-60 w-full object-cover rounded-xl group-hover:shadow-xl"
                alt="thumbnail"
              />
            </CardItem>
          </div>
          <div className="flex justify-between items-center mt-4">
            <CardItem
              translateZ={20}
              as={Link}
              href="/"
              target="__blank"
              className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
            >
              Get Started →
            </CardItem>
          </div>
        </CardBody>

        <CardBody className="bg-gray-50 relative group dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[25rem] h-[30rem] rounded-xl p-6 border mx-2 flex flex-col justify-between">
          <div>
            <CardItem
              translateZ="50"
              className="text-xl font-bold font-serif text-neutral-600 dark:text-white"
            >
              Turn Slack messages into a prioritized task list
            </CardItem>

            <CardItem translateZ="100" className="w-full mt-4">
              <Image
                src="https://res.cloudinary.com/deadhqx3x/image/upload/v1722923576/Zapier/wyra1chvpk7efbanf8zg.jpg"
                height="1000"
                width="1000"
                className="h-60 w-full object-cover rounded-xl group-hover:shadow-xl"
                alt="thumbnail"
              />
            </CardItem>
          </div>
          <div className="flex justify-between items-center mt-4">
            <CardItem
              translateZ={20}
              as={Link}
              href="/"
              target="__blank"
              className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
            >
              Get Started →
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>

      <div className="flex justify-center">
        <Button
          borderRadius="2.75rem"
          className="bg-purple-300 font-serif dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 "
        >
          Explore More Templates
        </Button>
      </div>
    </div>
  );
}
