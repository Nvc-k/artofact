"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem("artifact_username", username.trim());
      router.push("/");
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col bg-[#0A0A09] text-[#FCFBF7] overflow-hidden">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center px-4 relative z-10 pt-32 pb-16">
        <div className="bg-black/50 border border-white/5 rounded-3xl p-8 md:p-12 w-full max-w-md backdrop-blur-md shadow-2xl relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/10 rounded-full blur-2xl -z-10"></div>
          
          <div className="text-center mb-10">
            <h1 className="font-serif text-3xl font-bold text-white mb-2">Player Login</h1>
            <p className="text-gray-400 text-sm">Enter your Minecraft username to access the store.</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div>
              <label htmlFor="username" className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                Minecraft Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/50 transition-all"
                placeholder="Notch"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gold-400 text-gray-950 font-bold rounded-xl tracking-widest uppercase hover:bg-gold-500 hover:shadow-[0_4px_20px_rgba(230,194,84,0.3)] transition-all duration-300 text-sm mt-2"
            >
              Continue to Store
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
