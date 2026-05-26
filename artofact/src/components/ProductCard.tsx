"use client";

import { useState } from "react";
import { Package } from "@/app/api/packages/route";

export default function ProductCard({ pkg }: { pkg: Package }) {
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/create-basket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId: pkg.id }),
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
    <div className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col hover:-translate-y-2 transition-all duration-300 lux-shadow group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-full blur-2xl -z-10 group-hover:bg-gold-500/10 transition-colors duration-500"></div>
      
      <div className="flex justify-between items-start mb-6">
        <h3 className="font-serif text-2xl font-bold text-gray-900 group-hover:text-gold-500 transition-colors">{pkg.name}</h3>
        <div className="text-right">
          <div className="text-xl font-bold text-gray-900">
            ${pkg.price.toFixed(2)}
          </div>
          {pkg.type === "subscription" && (
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest">/ Month</div>
          )}
        </div>
      </div>
      
      <p className="text-gray-500 text-sm font-sans mb-8 flex-grow leading-relaxed">
        {pkg.description}
      </p>

      {pkg.perks && pkg.perks.length > 0 && (
        <ul className="mb-8 space-y-3">
          {pkg.perks.map((perk, i) => (
            <li key={i} className="flex items-start gap-3 text-xs text-gray-600 font-sans">
              <div className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1.5 flex-shrink-0"></div>
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
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gray-900 text-white hover:bg-gold-500 hover:shadow-lg hover:shadow-gold-500/20"
        }`}
      >
        {loading ? "Processing..." : "Add to Cart"}
      </button>
    </div>
  );
}
