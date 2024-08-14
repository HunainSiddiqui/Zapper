"use client"
import { useRouter } from "next/navigation"
import { Feature } from "./Feature"
import { PrimaryButton } from "./buttons/PrimaryButton"
import { SecondaryButton } from "./buttons/SecondaryButton"
import { FlipWords } from "./ui/flip-words"

export const Hero = () => {
    const words = ["Automate", "Streamline", "Digitize", "Mechanize"];
    const router = useRouter();
    return (
      <div>
        <div className="flex justify-center">
          <div className="font-serif font-semibold text-5xl  text-center pt-8 max-w-xl">
            <FlipWords words={words} />
            as fast as you can type
          </div>
        </div>
        <div className="flex justify-center pt-2">
          <div className=" font-Raleway text-xl text-center pt-8 max-w-2xl">
            AI gives you automation superpowers, and Zapper puts them to work.
            Pairing AI and Zapper helps you turn ideas into workflows and bots
            that work for you.
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <div className="flex font-poppins">
            <PrimaryButton
              onClick={() => {
                router.push("/signup");
              }}
              size="big"
            >
            Start free with email
            </PrimaryButton>
            <div className="pl-4 font-poppins">
              <SecondaryButton onClick={() => {}} size="big">
                Contact Sales
              </SecondaryButton>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <Feature title={"Free Forever"} subtitle={"for core features"} />
          <Feature title={"More apps"} subtitle={"than any other platforms"} />
          <Feature title={"Cutting Edge"} subtitle={"AI Features"} />
        </div>
      </div>
    );
}