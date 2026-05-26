"use client";

import { useState, useEffect } from "react";

interface TimerProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ days: initDays, hours: initHours, minutes: initMins, seconds: initSecs }: TimerProps) {
  // Convert initial props to total seconds to make decrementing trivial
  const initialTotalSeconds = 
    initDays * 24 * 60 * 60 + 
    initHours * 60 * 60 + 
    initMins * 60 + 
    initSecs;

  const [totalSeconds, setTotalSeconds] = useState(initialTotalSeconds);

  useEffect(() => {
    if (totalSeconds <= 0) return;

    const timer = setInterval(() => {
      setTotalSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [totalSeconds]);

  // Format total seconds back to visual segments
  const formatTime = () => {
    if (totalSeconds <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const d = Math.floor(totalSeconds / (24 * 60 * 60));
    const h = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
    const m = Math.floor((totalSeconds % (60 * 60)) / 60);
    const s = totalSeconds % 60;

    return { days: d, hours: h, minutes: m, seconds: s };
  };

  const time = formatTime();

  const timeBlocks = [
    { value: time.days, label: "days" },
    { value: time.hours, label: "hrs" },
    { value: time.minutes, label: "mins" },
    { value: time.seconds, label: "secs" }
  ];

  return (
    <div className="flex gap-2 sm:gap-3 bg-amber-500/10 border border-amber-500/20 p-2 sm:p-3 rounded-xl shadow-lg">
      {timeBlocks.map((block, i) => (
        <div 
          key={i} 
          className="flex flex-col items-center justify-center bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg w-14 h-14 sm:w-16 sm:h-16 text-white shadow"
        >
          <span className="font-outfit font-black text-lg sm:text-2xl leading-none">
            {String(block.value).padStart(2, "0")}
          </span>
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-white/80 mt-1">
            {block.label}
          </span>
        </div>
      ))}
    </div>
  );
}
