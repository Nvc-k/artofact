"use client";

import { useState } from "react";
import Image from "next/image";
import { Info, ShoppingCart, Gift, X, CheckCircle, RefreshCw } from "lucide-react";

interface Package {
  id: number;
  name: string;
  price: number;
  type: "single" | "subscription";
  description: string;
  image?: string;
  perks?: string[];
}

export default function ProductCard({ pkg }: { pkg: Package }) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/create-basket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ packageId: pkg.id }),
      });

      if (!res.ok) {
        throw new Error("Failed to create basket");
      }

      const basket = await res.json();

      // Check if checkout URL is returned
      if (basket.links?.checkout) {
        window.location.href = basket.links.checkout;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Determine which local asset to use based on package name/type
  const getProductImage = () => {
    if (pkg.image) return pkg.image;
    
    const nameLower = pkg.name.toLowerCase();
    if (nameLower.includes("afk")) {
      return "/assets/afkkey.png";
    } else if (nameLower.includes("playtime")) {
      return "/assets/playtimekey.png";
    } else if (nameLower.includes("crate") || nameLower.includes("artifact key") || nameLower.includes("artifact crate")) {
      return "/assets/artifactcratekey.png";
    }
    
    // Ranks fallback assets
    return "/assets/artifactsmpt.png";
  };

  const isCrateKey = pkg.name.toLowerCase().includes("key") || pkg.name.toLowerCase().includes("crate");

  return (
    <>
      <div className="glass-card flex flex-col rounded-xl overflow-hidden shadow-lg p-5">
        {/* Visual Asset Section */}
        <div className="relative w-full h-44 flex items-center justify-center bg-black/20 rounded-lg mb-4 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent z-1"></div>
          <div className="relative w-32 h-32 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
            <Image
              src={getProductImage()}
              alt={pkg.name}
              fill
              className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>

        {/* Title & Description */}
        <div className="flex-grow flex flex-col justify-between">
          <div>
            <h3 className="font-outfit font-extrabold text-lg sm:text-xl text-slate-100 mb-1 group-hover:text-amber-400 transition-colors">
              {pkg.name}
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed font-jakarta">
              {pkg.description || "Unlock special features and boost your gameplay."}
            </p>
          </div>

          <div>
            {/* Price section */}
            <div className="flex items-baseline gap-1.5 mb-4">
              <span className="font-outfit font-black text-2xl tracking-tight text-white">
                ${pkg.price.toFixed(2)}
              </span>
              <span className="text-xs text-slate-400 font-semibold tracking-wider uppercase">
                USD
              </span>
              {pkg.type === "subscription" && (
                <span className="text-xs text-slate-400 font-medium lowercase">/month</span>
              )}
            </div>

            {/* Actions Grid */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowModal(true)}
                className="p-3 bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 hover:border-white/20 rounded-lg text-slate-300 hover:text-white transition-all duration-200"
                title="View Perks & Info"
              >
                <Info className="w-5 h-5" />
              </button>

              <button
                onClick={handlePurchase}
                disabled={loading}
                className="flex-grow flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 disabled:from-slate-700 disabled:to-slate-800 disabled:cursor-not-allowed text-white font-outfit font-bold rounded-lg shadow-md active:scale-95 transition-all duration-200"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Redirecting...</span>
                  </>
                ) : (
                  <>
                    {pkg.type === "subscription" ? (
                      <RefreshCw className="w-4 h-4" />
                    ) : (
                      <ShoppingCart className="w-4 h-4" />
                    )}
                    <span className="text-sm">Buy Now</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Overlay Details View */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-[#0e1422] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
            
            {/* Modal Header Banner */}
            <div className="relative w-full h-36 bg-gradient-to-br from-indigo-950 to-slate-950 flex items-center justify-center overflow-hidden border-b border-white/5">
              <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/assets/hero.png')" }}></div>
              <div className="relative w-24 h-24">
                <Image
                  src={getProductImage()}
                  alt={pkg.name}
                  fill
                  className="object-contain drop-shadow-lg"
                />
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <h3 className="font-outfit font-extrabold text-2xl text-slate-100 mb-2">
                {pkg.name}
              </h3>
              
              <div className="max-h-60 overflow-y-auto mb-6 pr-2">
                {pkg.perks && pkg.perks.length > 0 ? (
                  <ul className="space-y-2.5">
                    {pkg.perks.map((perk, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-slate-300 text-sm leading-relaxed font-jakarta">
                        <CheckCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span>
                          {/* Replicate the Tebex look by coloring rank titles or keywords */}
                          {perk.startsWith("Artifact") ? (
                            <span className="text-amber-400 font-bold">{perk.split(" ")[0]}</span>
                          ) : null}
                          {perk.startsWith("Artifact") ? " " + perk.split(" ").slice(1).join(" ") : perk}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-300 text-sm leading-relaxed font-jakarta">
                    {pkg.description}
                  </p>
                )}
              </div>

              {/* Modal Footer Pricing and Checkout Button */}
              <div className="flex items-center justify-between pt-5 border-t border-white/5">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Price</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-outfit font-black text-2xl text-white">
                      ${pkg.price.toFixed(2)}
                    </span>
                    <span className="text-xs text-slate-400">USD</span>
                    {pkg.type === "subscription" && <span className="text-xs text-slate-400">/mo</span>}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handlePurchase}
                    disabled={loading}
                    className="p-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 rounded-xl transition-all active:scale-95"
                    title="Gift to Friend"
                  >
                    <Gift className="w-5 h-5" />
                  </button>

                  <button
                    onClick={handlePurchase}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 disabled:from-slate-700 disabled:to-slate-800 disabled:cursor-not-allowed text-white font-outfit font-bold rounded-xl shadow-md transition-all active:scale-95"
                  >
                    {loading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <ShoppingCart className="w-4 h-4" />
                    )}
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
