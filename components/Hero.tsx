"use client";

import Image from "next/image";
import Countdown from "./Countdown";

export default function Hero() {
  // Set launch date to 3 days from now
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 3);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-16 px-4 overflow-hidden">
      {/* Background Hero Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/hero.png"
          alt="Hero Background"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Dark overlay with toned down yellow/gold tint */}
        <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px]"></div>
      </div>
      
      <div className="max-w-5xl mx-auto text-center z-10 w-full flex flex-col items-center">
        {/* Launch Countdown Section Only */}
        <Countdown targetDate={launchDate} />
      </div>
    </section>
  );
}
