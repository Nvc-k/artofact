import Image from "next/image";
import Navbar from "@/components/Navbar";
import ServerStatus from "@/components/ServerStatus";
import StoreSection from "@/components/StoreSection";
import CountdownTimer from "@/components/CountdownTimer";
import { Shield, Sparkles, Sword, Coins, Compass, ArrowDown, Crown } from "lucide-react";

export default function StorePage() {
  const recentPayments = ["BLUEFLAMES999", "3w1ho_", "skimi82_", "jacob_sweat", "Theoyt49"];

  const features = [
    {
      icon: <Sword className="w-6 h-6 text-amber-500" />,
      title: "Ancient Survival SMP",
      description: "A vanilla-plus survival experience featuring custom artifact items, unique tools, and server-wide events."
    },
    {
      icon: <Coins className="w-6 h-6 text-indigo-400" />,
      title: "Player-Run Economy",
      description: "Trade securely with other players using custom chest shops, virtual currency, and active market structures."
    },
    {
      icon: <Shield className="w-6 h-6 text-emerald-400" />,
      title: "Anti-Grief Protection",
      description: "Claim your land and build safely with friends. Grief prevention tools ensure your builds are safe 24/7."
    },
    {
      icon: <Compass className="w-6 h-6 text-rose-400" />,
      title: "Custom Crate Crates",
      description: "Collect AFK, Playtime, and Artifact keys to open crates at spawn and unlock powerful in-game equipment."
    }
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section (Above the Fold) */}
      <header id="home" className="relative min-h-[90vh] flex items-center justify-center pt-24 overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/hero.png"
            alt="Artifact SMP World Background"
            fill
            priority
            className="object-cover object-center opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080b11] via-[#080b11]/80 to-[#080b11]/40 z-10"></div>
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#080b11]/70 to-[#080b11] z-10"></div>
        </div>

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-[350px] bg-indigo-500/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        {/* Hero Content Container */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 text-center mt-6">
          
          {/* Logo container */}
          <div className="flex justify-center mb-6 animate-float">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 filter drop-shadow-[0_0_35px_rgba(99,102,241,0.25)]">
              <Image
                src="/assets/artifactsmpt.png"
                alt="Artifact SMP 3D Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

          {/* Heading */}
          <h1 className="font-outfit font-black text-4xl sm:text-6xl tracking-tight text-white mb-4 uppercase leading-none">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 bg-[size:200%]">Artifact SMP</span>
          </h1>

          {/* Subheading */}
          <p className="text-slate-300 font-jakarta text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            Unearth ancient relics, claim your kingdom, and survive alongside an active community on the ultimate vanilla-plus survival server.
          </p>

          {/* Server Status Widget */}
          <div className="mb-10">
            <ServerStatus ip="play.artifactsmp.com" />
          </div>

          {/* Scroll Down Indicator */}
          <div className="flex justify-center mt-12">
            <a
              href="#features"
              className="flex flex-col items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors duration-200"
            >
              <span className="font-semibold uppercase tracking-widest">Explore Server</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>
          </div>

        </div>
      </header>

      {/* Countdown Timer release section */}
      <section className="bg-gradient-to-r from-orange-500/10 via-[#0b0f19] to-indigo-500/10 border-y border-white/5 py-8 relative">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-orange-500 font-bold mb-1">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span className="text-sm tracking-wider uppercase font-outfit">Season Release event</span>
            </div>
            <h2 className="font-outfit font-extrabold text-xl sm:text-2xl text-white">
              Crate Keys & Ranks Release
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm font-jakarta">
              Limited-time discounts are active on all ranks and keys during launch.
            </p>
          </div>
          
          {/* Dynamic Countdown widget */}
          <div className="flex-shrink-0">
            <CountdownTimer days={3} hours={8} minutes={26} seconds={46} />
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-outfit font-black text-2xl sm:text-3xl tracking-tight text-white mb-2 uppercase">
            Why Play on Artifact?
          </h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto font-jakarta">
            We feature tailored custom integrations designed to give survival gameplay a brand new adventure feel.
          </p>
        </div>

        {/* Features List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-[#0b0f19]/40 border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center shadow-lg transition-transform hover:-translate-y-1 duration-200"
            >
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl mb-4 flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="font-outfit font-bold text-lg text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-jakarta">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Supporter Spotlight Section */}
      <section className="py-12 bg-white/[0.01] border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Top Supporter Card */}
            <div className="glass-panel p-5 rounded-xl border border-white/5 flex items-center gap-4 col-span-1">
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-lg">
                <Crown className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Top Customer</span>
                <h4 className="font-outfit font-bold text-slate-200 text-sm sm:text-base">No Top Supporter yet</h4>
                <p className="text-xs text-slate-400 font-jakarta">Support this launch week!</p>
              </div>
            </div>

            {/* Recent Purchases list */}
            <div className="glass-panel p-5 rounded-xl border border-white/5 col-span-2 flex flex-col justify-center">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-3 block">Recent Supporters</span>
              <div className="flex items-center gap-4 overflow-x-auto pb-1 scrollbar-none">
                {recentPayments.map((payment, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/5 py-1.5 px-3 rounded-lg flex-shrink-0">
                    <Image
                      src={`https://crafthead.net/avatar/${payment}`}
                      alt={payment}
                      width={20}
                      height={20}
                      className="w-5 h-5 rounded-md bg-black/20"
                      unoptimized
                    />
                    <span className="font-mono text-xs text-slate-200 font-bold">{payment}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Store Section */}
      <StoreSection />

      {/* Webstore Footer */}
      <footer className="bg-[#05070c] border-t border-white/5 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="font-outfit font-extrabold text-lg text-white tracking-widest">
                ARTIFACT SMP
              </span>
            </div>
            <p className="text-slate-400 text-xs max-w-md font-jakarta leading-relaxed">
              We work hard to build a premium, lag-free vanilla-plus survival experience. Purchasing in our shop contributes directly to hosting and developers.
            </p>
          </div>

          <div className="text-xs text-slate-500 font-jakarta flex flex-col gap-1.5 md:items-end">
            <span>&copy; {new Date().getFullYear()} Artifact SMP. All rights reserved.</span>
            <span>We are not affiliated with Mojang Studios, Minecraft, or Microsoft.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
