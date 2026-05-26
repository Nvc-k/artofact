"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { ShieldAlert, Sparkles, Key, Landmark, Loader2 } from "lucide-react";

interface Package {
  id: number;
  name: string;
  price: number;
  type: "single" | "subscription";
  description: string;
  image?: string;
  perks?: string[];
}

export default function StoreSection() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"ranks" | "keys">("ranks");

  useEffect(() => {
    async function loadPackages() {
      try {
        const res = await fetch("/api/packages");
        if (!res.ok) {
          throw new Error("Failed to load store products");
        }
        const data = await res.json();
        setPackages(data);
      } catch (err) {
        console.error("Failed to load store packages, using mock fallback", err);
        setError("Could not connect to Tebex, showing mock store packages.");
      } finally {
        setLoading(false);
      }
    }
    loadPackages();
  }, []);

  const ranks = packages.filter(
    (p) => p.name.toLowerCase().includes("artifact") && !p.name.toLowerCase().includes("key") && !p.name.toLowerCase().includes("crate")
  );
  
  const keys = packages.filter(
    (p) => p.name.toLowerCase().includes("key") || p.name.toLowerCase().includes("crate")
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-amber-500 animate-spin mb-4" />
        <p className="text-slate-400 font-jakarta text-sm">Loading Storefront packages...</p>
      </div>
    );
  }

  return (
    <section id="store" className="py-20 border-t border-white/5 relative">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-outfit font-black text-3xl sm:text-4xl text-white mb-3 tracking-tight">
            SERVER WEBSTORE
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto font-jakarta">
            Support the server release and unlock exclusive in-game perks, ranks, and custom keys. All payments are processed securely by Tebex.
          </p>
        </div>

        {/* Categories Tab Swapper */}
        <div className="flex justify-center mb-10">
          <div className="flex bg-[#0b0f19] border border-white/5 p-1 rounded-xl shadow-inner">
            <button
              onClick={() => setActiveTab("ranks")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-outfit font-bold text-sm sm:text-base transition-all ${
                activeTab === "ranks"
                  ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Landmark className="w-4 h-4" />
              <span>Subscription & Lifetime Ranks</span>
            </button>
            <button
              onClick={() => setActiveTab("keys")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-outfit font-bold text-sm sm:text-base transition-all ${
                activeTab === "keys"
                  ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Key className="w-4 h-4" />
              <span>Crate Keys</span>
            </button>
          </div>
        </div>

        {/* Tab Contents Grid */}
        <div className="transition-all duration-300">
          {activeTab === "ranks" && (
            <div>
              {ranks.length === 0 ? (
                <div className="text-center py-12 text-slate-500">No ranks available right now.</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {ranks.map((pkg) => (
                    <ProductCard key={pkg.id} pkg={pkg} />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "keys" && (
            <div>
              {keys.length === 0 ? (
                <div className="text-center py-12 text-slate-500">No keys available right now.</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {keys.map((pkg) => (
                    <ProductCard key={pkg.id} pkg={pkg} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Minecraft Affiliate Footer Warning */}
        <div className="mt-16 text-center text-xs text-slate-500 max-w-2xl mx-auto border-t border-white/5 pt-6 font-jakarta leading-relaxed">
          <p>
            Artifact SMP is not affiliated with, supported by, or associated with Mojang Studios, Minecraft, or Microsoft Corporation.
          </p>
          <p className="mt-1">
            Webstore powered by Tebex. If you require purchasing support or assistance, please join our Discord.
          </p>
        </div>

      </div>
    </section>
  );
}
