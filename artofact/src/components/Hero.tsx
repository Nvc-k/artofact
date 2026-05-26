"use client";

import Countdown from "./Countdown";
import Supporters from "./Supporters";

export default function Hero() {
  // Set launch date to 3 days from now
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 3);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-16 px-4 overflow-hidden">
      {/* Background elegant accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold-500/5 rounded-full blur-[120px] -z-10"></div>
      
      <div className="max-w-5xl mx-auto text-center z-10 w-full">
        {/* Subtle top label */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-12 h-[1px] bg-gold-500/50"></div>
          <span className="text-gold-500 text-xs font-bold tracking-[0.3em] uppercase">Premium Experience</span>
          <div className="w-12 h-[1px] bg-gold-500/50"></div>
        </div>

        {/* Main Heading */}
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-gray-900 mb-8 leading-tight">
          Enter the <span className="text-gradient-gold">Artifact</span> Realm
        </h1>
        
        {/* Description */}
        <p className="text-gray-500 font-sans text-lg md:text-xl max-w-2xl mx-auto mb-16 font-light leading-relaxed">
          Unearth ancient relics, claim your kingdom, and survive alongside an active community on the ultimate luxury vanilla-plus server.
        </p>

        {/* Dynamic Launch & Supporters Section */}
        <div className="w-full flex flex-col items-center">
          <Countdown targetDate={launchDate} />
          <Supporters />
        </div>
      </div>
    </section>
  );
}
