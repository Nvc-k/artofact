"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User, LogOut } from "lucide-react";

export default function Navbar() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Read from localStorage on mount
    const stored = localStorage.getItem("artifact_username");
    if (stored) {
      setUsername(stored);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("artifact_username");
    setUsername(null);
  };

  return (
    <nav className="absolute top-0 left-0 w-full z-50 p-6 flex justify-center md:justify-end">
      <div className="flex items-center gap-6 md:gap-8 bg-black/50 backdrop-blur-xl px-6 md:px-8 py-3.5 rounded-full border border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
        <Link href="/" className="text-xs md:text-sm font-medium tracking-[0.1em] text-white/70 hover:text-white transition-colors uppercase">
          Home
        </Link>
        <Link href="/#store" className="text-xs md:text-sm font-medium tracking-[0.1em] text-white/70 hover:text-white transition-colors uppercase">
          Store
        </Link>
        <Link href="/#gallery" className="text-xs md:text-sm font-medium tracking-[0.1em] text-white/70 hover:text-white transition-colors uppercase">
          Gallery
        </Link>
        <div className="w-[1px] h-4 bg-white/20 mx-2"></div>
        
        {username ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gold-400">
              <User className="w-4 h-4" />
              <span className="text-xs md:text-sm font-bold tracking-[0.1em] uppercase">{username}</span>
            </div>
            <button onClick={handleLogout} className="text-white/50 hover:text-red-400 transition-colors" title="Logout">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <Link href="/login" className="text-xs md:text-sm font-bold tracking-[0.1em] text-white hover:text-gold-400 transition-colors uppercase flex items-center gap-2">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
