"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Package } from "@/app/api/packages/route";

export default function ProductCard({ pkg }: { pkg: Package }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePurchase = async () => {
    const username = localStorage.getItem("artifact_username");
    
    if (!username) {
      router.push("/login");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/create-basket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId: pkg.id, username }),
      });

      if (!res.ok) throw new Error("Failed to create basket");
      const basket = await res.json();

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

  return (
    <div className="bg-black/50 border border-white/5 rounded-3xl p-8 flex flex-col hover:-translate-y-2 hover:border-gold-400/40 hover:shadow-[0_10px_30px_-10px_rgba(230,194,84,0.15)] transition-all duration-300 group relative overflow-hidden backdrop-blur-sm shadow-xl">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/10 rounded-full blur-2xl -z-10 group-hover:bg-gold-400/20 transition-colors duration-500"></div>
      
      {/* Product Image */}
      <div className="flex justify-center mb-8 relative h-32 w-full">
        <Image
          src={
            pkg.type === "subscription"
              ? "/assets/image.png"
              : pkg.name.toLowerCase().includes("afk")
              ? "/assets/afkkey.png"
              : pkg.name.toLowerCase().includes("playtime")
              ? "/assets/playtimekey.png"
              : "/assets/artifactcratekey.png"
          }
          alt={pkg.name}
          fill
          className="object-contain drop-shadow-[0_10px_20px_rgba(230,194,84,0.2)] group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="flex justify-between items-start mb-6">
        <h3 className="font-serif text-2xl font-bold text-[#FCFBF7] group-hover:text-gold-400 transition-colors">{pkg.name}</h3>
        <div className="text-right flex flex-col items-end">
          <div className="text-xl font-bold text-[#FCFBF7]">
            ${pkg.price.toFixed(2)}
          </div>
          {pkg.type === "subscription" && (
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">/ Month</div>
          )}
        </div>
      </div>
      
      <p className="text-[#C5C2BA] text-sm font-sans mb-8 flex-grow leading-relaxed">
        {pkg.description || "Experience premium perks and unlock exclusive features on the Artifact SMP."}
      </p>

      {pkg.perks && pkg.perks.length > 0 && (
        <ul className="mb-8 space-y-3">
          {pkg.perks.map((perk, i) => (
            <li key={i} className="flex items-start gap-3 text-xs text-[#C5C2BA] font-sans">
              <div className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-1.5 flex-shrink-0"></div>
              <span>{perk}</span>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={handlePurchase}
        disabled={loading}
        className={`w-full py-4 rounded-xl font-bold tracking-widest uppercase transition-all duration-300 text-sm ${
          loading
            ? "bg-white/10 text-white/40 cursor-not-allowed"
            : "bg-gold-400 text-gray-950 hover:bg-gold-500 hover:shadow-[0_4px_20px_rgba(230,194,84,0.3)]"
        }`}
      >
        {loading ? "Processing..." : "Add to Cart"}
      </button>
    </div>
  );
}
