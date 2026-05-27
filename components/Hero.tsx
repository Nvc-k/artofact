"use client";

import Image from "next/image";
import Countdown from "./Countdown";

export default function Hero() {
  // Set launch date to 3 days from now
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 3);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-16 px-4 overflow-hidden">
      {/* Background is now handled in page.tsx */}
      
      {/* Centered Logo */}
      <div className="relative w-64 h-64 md:w-96 md:h-96 drop-shadow-2xl filter drop-shadow-[0_0_30px_rgba(230,194,84,0.4)] animate-float">
        <Image
          src="/assets/artifactsmpt.png"
          alt="Artifact SMP Logo"
          fill
          priority
          className="object-contain"
        />
      </div>
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 w-full flex flex-col items-center">
        {/* Launch Countdown Section Only */}
        <Countdown targetDate={launchDate} />
      </div>
    </section>
  );
}
