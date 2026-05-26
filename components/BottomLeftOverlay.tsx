"use client";

import { useState } from "react";
import Image from "next/image";
import { Copy, Check, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function BottomLeftOverlay() {
  const [copied, setCopied] = useState(false);
  const ip = "play.artifactsmp.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-end gap-4 pointer-events-none">
      {/* Logo */}
      <div className="relative w-32 h-32 md:w-48 md:h-48 drop-shadow-2xl pointer-events-auto filter drop-shadow-[0_0_15px_rgba(230,194,84,0.3)]">
        <Image
          src="/assets/artifactsmpt.png"
          alt="Artifact SMP Logo"
          fill
          priority
          className="object-contain"
        />
      </div>

      <div className="flex flex-col gap-3 pointer-events-auto pb-4">
        {/* IP Copy Button */}
        <button
          onClick={handleCopy}
          className="group flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/10 shadow-xl px-4 py-2.5 rounded-full hover:scale-105 hover:border-gold-400/30 transition-all duration-300 lux-shadow pointer-events-auto"
        >
          <div className="bg-gold-400/10 p-1.5 rounded-full text-gold-400">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </div>
          <div className="flex flex-col items-start">
            <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase leading-none">Server IP</span>
            <span className="text-sm font-semibold text-[#FCFBF7]">{ip}</span>
          </div>
        </button>

        {/* Discord Redirect Button */}
        <Link
          href="https://discord.gg/2M4MachNVx"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 bg-[#5865F2] shadow-lg shadow-[#5865F2]/20 px-4 py-2.5 rounded-full hover:scale-105 transition-all duration-300"
        >
          <div className="bg-white/20 p-1.5 rounded-full text-white">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-[10px] font-bold tracking-widest text-white/80 uppercase leading-none">Join the</span>
            <span className="text-sm font-semibold text-white">Discord</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
