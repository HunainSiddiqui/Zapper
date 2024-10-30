import { Appbar } from "@/components/Appbar";
import { Benefits } from "@/components/Benefits";
import { Branding } from "@/components/Branding";
import { Cards } from "@/components/Cards";
import { Hero } from "@/components/Hero";
import { HeroVideo } from "@/components/HeroVideo";
import { Reviews } from "@/components/Reviews";
import { Typewriter } from "@/components/Typewriter";

export default function Home() {
  return (
    <main className="pb-48">
      <Appbar />
      <Hero />

      {/* <div className="pt-8">
        <HeroVideo />
      </div> */}
      
     
      <Branding/>
      <Benefits/>
      <Cards/>
      <Typewriter/>
      {/* <Reviews/> */}
    </main>
  );
}
