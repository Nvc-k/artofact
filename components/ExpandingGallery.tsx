"use client";

import Image from "next/image";

export default function ExpandingGallery() {
  const images = [
    { src: "/assets/hero.png", title: "Survival", desc: "Vanilla-plus experience." },
    { src: "/assets/afkkey.png", title: "Economy", desc: "Player-driven marketplace." },
    { src: "/assets/artifactcratekey.png", title: "Artifacts", desc: "Discover rare items." },
    { src: "/assets/playtimekey.png", title: "Rewards", desc: "Earn as you play." },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h2 className="font-serif text-3xl md:text-5xl text-[#FCFBF7] mb-4">Discover the Realm</h2>
        <div className="h-1 w-20 bg-gold-500 mx-auto rounded-full"></div>
      </div>
      
      <div className="flex h-[400px] md:h-[500px] w-full gap-2 md:gap-4 overflow-hidden rounded-3xl">
        {images.map((img, i) => (
          <div
            key={i}
            className="group relative flex-1 hover:flex-[3] transition-all duration-500 ease-in-out cursor-pointer overflow-hidden rounded-2xl"
          >
            <Image
              src={img.src}
              alt={img.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
              <div className="flex items-center gap-3 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                <div className="w-8 h-[1px] bg-gold-500"></div>
                <span className="text-gold-500 text-xs font-bold tracking-widest uppercase">{img.title}</span>
              </div>
              <h3 className="font-serif text-white text-2xl md:text-3xl mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150 whitespace-nowrap">
                {img.title}
              </h3>
              <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                {img.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
