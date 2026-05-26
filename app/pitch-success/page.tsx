"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Home, ArrowRight, ShieldCheck } from "lucide-react";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const packageId = searchParams.get("packageId");

  // Lookup package details for display
  const getPackageName = () => {
    switch (Number(packageId)) {
      case 7323479:
        return "Artifact (Lifetime) Rank";
      case 7323483:
        return "Artifact+ (Lifetime) Rank";
      case 7438077:
        return "Artifact Monthly Rank";
      case 7438082:
        return "Artifact+ Monthly Rank";
      case 7323582:
        return "Playtime Key";
      case 7323584:
        return "AFK Key";
      case 7337367:
        return "Artifact Crate Key";
      default:
        return "Server Item Upgrade";
    }
  };

  const getProductImage = () => {
    const name = getPackageName().toLowerCase();
    if (name.includes("afk")) return "/assets/afkkey.png";
    if (name.includes("playtime")) return "/assets/playtimekey.png";
    if (name.includes("crate") || name.includes("artifact key")) return "/assets/artifactcratekey.png";
    return "/assets/artifactsmpt.png";
  };

  return (
    <div className="glass-panel max-w-lg w-full rounded-2xl shadow-2xl overflow-hidden p-8 border border-white/10 text-center relative">
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl"></div>

      <div className="flex justify-center mb-6">
        <div className="relative p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
          <CheckCircle2 className="w-12 h-12 text-emerald-400" />
        </div>
      </div>

      <h1 className="font-outfit font-black text-2xl sm:text-3xl text-white mb-2">
        CHECKOUT SIMULATED!
      </h1>
      
      <p className="text-slate-400 text-sm sm:text-base font-jakarta mb-6 leading-relaxed">
        Thank you for demonstrating the storefront! In production, Tebex will handle the payment gateway and redirect the user back.
      </p>

      {/* Item info block */}
      <div className="bg-black/20 rounded-xl p-4 border border-white/5 mb-8 flex items-center gap-4 text-left">
        <div className="relative w-16 h-16 flex-shrink-0 bg-[#080b11] rounded-lg border border-white/5 p-2 flex items-center justify-center">
          <Image
            src={getProductImage()}
            alt={getPackageName()}
            fill
            className="object-contain p-1"
          />
        </div>
        <div>
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Simulated Purchase</span>
          <h3 className="font-outfit font-bold text-lg text-white leading-tight">
            {getPackageName()}
          </h3>
        </div>
      </div>

      <div className="space-y-4">
        <Link
          href="/"
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-outfit font-bold rounded-xl shadow-md transition-all active:scale-95"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        
        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-jakarta">
          <ShieldCheck className="w-4 h-4 text-amber-500" />
          <span>Minecraft EULA Compliant Checkout flow</span>
        </div>
      </div>
    </div>
  );
}

export default function PitchSuccessPage() {
  return (
    <main className="min-h-screen bg-[#080b11] flex items-center justify-center px-4 py-16">
      <Suspense fallback={
        <div className="text-center text-slate-400">Loading pitch checkout data...</div>
      }>
        <SuccessContent />
      </Suspense>
    </main>
  );
}
