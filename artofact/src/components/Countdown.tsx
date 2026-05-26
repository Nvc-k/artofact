"use client";

import { useState, useEffect } from "react";

export default function Countdown({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const [status, setStatus] = useState<"counting" | "open" | "hidden">("counting");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      // 24 hours in ms
      const ONE_DAY_MS = 24 * 60 * 60 * 1000;

      if (distance < -ONE_DAY_MS) {
        setStatus("hidden");
        clearInterval(timer);
      } else if (distance < 0) {
        setStatus("open");
      } else {
        setStatus("counting");
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (status === "hidden") return null;

  if (status === "open") {
    return (
      <div className="flex justify-center items-center py-6 px-12 bg-gold-400 text-white rounded-full lux-shadow mx-auto w-max mb-12 animate-pulse">
        <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-widest">SERVER OPEN NOW</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mb-12">
      <p className="text-sm text-gold-400 font-bold tracking-[0.2em] uppercase mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">Launch Countdown</p>
      <div className="flex gap-4 md:gap-8">
        {[
          { label: "Days", value: timeLeft.days },
          { label: "Hours", value: timeLeft.hours },
          { label: "Minutes", value: timeLeft.minutes },
          { label: "Seconds", value: timeLeft.seconds },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-16 h-16 md:w-24 md:h-24 bg-black/55 backdrop-blur-md border border-gold-400/20 rounded-2xl flex items-center justify-center shadow-[0_8px_30px_rgba(230,194,84,0.08)] hover:scale-105 hover:border-gold-400 hover:shadow-[0_8px_30px_rgba(230,194,84,0.2)] transition-all duration-300 mb-2">
              <span className="font-serif text-2xl md:text-4xl text-[#FCFBF7] font-bold">{item.value}</span>
            </div>
            <span className="text-xs font-semibold text-[#C5C2BA] uppercase tracking-widest drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
