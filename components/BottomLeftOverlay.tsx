"use client";

import { useState } from "react";
import Image from "next/image";
import { Copy, Check, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function BottomLeftOverlay() {
  const [copied, setCopied] = useState(false);
  const ip = "play.artifactsmp.com";

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(ip);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = ip;
        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";
        document.body.prepend(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
        } catch (error) {
          console.error(error);
        } finally {
          textArea.remove();
        }
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-end gap-4 pointer-events-none">
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
