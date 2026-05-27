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
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 w-full flex flex-col items-center">
        {/* Launch Countdown Section Only */}
        <Countdown targetDate={launchDate} />
      </div>
    </section>
  );
}
