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

      <div className="flex flex-row gap-3 pointer-events-auto pb-4">
        {/* IP Copy Button */}
        <button
          onClick={handleCopy}
          className="group flex items-center justify-center gap-2 bg-black/50 backdrop-blur-xl border border-white/5 shadow-xl w-40 py-3 rounded-2xl hover:-translate-y-1 hover:border-white/20 transition-all duration-300"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-white/70 group-hover:text-white" />}
          <span className="text-xs font-bold tracking-widest text-white/90 uppercase">{ip}</span>
        </button>

        {/* Discord Redirect Button */}
        <Link
          href="https://discord.gg/2M4MachNVx"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center gap-2 bg-black/50 backdrop-blur-xl border border-white/5 shadow-xl w-40 py-3 rounded-2xl hover:-translate-y-1 hover:border-[#5865F2]/50 transition-all duration-300"
        >
          <MessageSquare className="w-4 h-4 text-[#5865F2] group-hover:text-[#5865F2] transition-colors" />
          <span className="text-xs font-bold tracking-widest text-white/90 uppercase">Discord</span>
        </Link>
      </div>
    </div>
  );
}
