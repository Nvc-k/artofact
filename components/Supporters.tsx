"use client";

import Image from "next/image";
import { Crown } from "lucide-react";

export default function Supporters() {
  const recentPayments = ["BLUEFLAMES999", "3w1ho_", "skimi82_", "jacob_sweat", "Theoyt49"];

  return (
    <div className="max-w-4xl mx-auto px-4 w-full">
      <div className="flex flex-col md:flex-row gap-6 items-stretch">
        {/* Top Supporter Card */}
        <div className="flex-1 bg-white border border-gray-100 rounded-3xl p-6 flex items-center gap-6 lux-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-full blur-2xl -z-10"></div>
          <div className="p-4 bg-gold-500/10 text-gold-500 rounded-2xl flex-shrink-0">
            <Crown className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1 block">Top Customer</span>
            <h4 className="font-serif font-bold text-gray-900 text-xl">Coming Soon</h4>
            <p className="text-sm text-gray-500 mt-1">Support this launch week!</p>
          </div>
        </div>

        {/* Recent Purchases list */}
        <div className="flex-[2] bg-white border border-gray-100 rounded-3xl p-6 flex flex-col justify-center lux-shadow relative overflow-hidden">
           <div className="absolute bottom-0 left-0 w-32 h-32 bg-gray-500/5 rounded-full blur-2xl -z-10"></div>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4 block">Recent Buyers</span>
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {recentPayments.map((payment, i) => (
              <div key={i} className="flex items-center gap-3 bg-gray-50 border border-gray-100 py-2 px-4 rounded-xl flex-shrink-0 transition-transform hover:-translate-y-1 duration-300">
                <Image
                  src={`https://crafthead.net/avatar/${payment}`}
                  alt={payment}
                  width={24}
                  height={24}
                  className="rounded-lg bg-gray-200"
                  unoptimized
                />
                <span className="font-sans text-sm text-gray-800 font-semibold">{payment}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
