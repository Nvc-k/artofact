"use client";

import Image from "next/image";
import Countdown from "./Countdown";

export default function Hero() {
  // Set launch date to 3 days from now
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 3);

  return (
    <section 
      className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-16 px-4 overflow-hidden"
      style={{
        backgroundImage: "url('/assets/hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* Dark overlay blending into body background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-[#0A0A09] -z-10"></div>
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 w-full flex flex-col items-center">
        {/* Launch Countdown Section Only */}
        <Countdown targetDate={launchDate} />
      </div>
    </section>
  );
}
