import ProductCard from "./ProductCard";
import { Package } from "@/app/api/packages/route";
import Image from "next/image";

export default function StoreSection({ packages }: { packages: Package[] }) {
  // If packages are fetched, filter them. For display purposes with images, 
  // we'll mock the sections using the images the user provided if the API is empty,
  // or we map the API packages to the images.
  const oneTimeKeys = packages.filter((p) => p.type === "single");

  // Split into 2 sections as requested
  const section1Keys = oneTimeKeys.slice(0, Math.ceil(oneTimeKeys.length / 2));
  const section2Keys = oneTimeKeys.slice(Math.ceil(oneTimeKeys.length / 2));

  return (
    <section id="store" className="py-32 bg-transparent border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="text-center mb-24">
          <span className="text-gold-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">The Vault</span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#FCFBF7]">Exclusive Keys</h2>
          <div className="h-1 w-20 bg-gold-400 mx-auto rounded-full mt-6"></div>
        </div>

        {/* Section 1 */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-12">
            <h3 className="font-serif text-3xl text-[#FCFBF7]">Crate Keys</h3>
            <div className="flex-1 h-[1px] bg-white/10"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {section1Keys.length > 0 ? (
              section1Keys.map((pkg) => (
                <ProductCard key={pkg.id} pkg={pkg} />
              ))
            ) : (
              // Fallback placeholder if no API data yet, showing the images
              <>
                <div className="bg-black/50 border border-white/5 rounded-3xl p-6 flex flex-col items-center hover:border-gold-400/40 transition-colors">
                  <Image src="/assets/artifactcratekey.png" alt="Artifact Key" width={120} height={120} className="mb-6 drop-shadow-2xl" />
                  <h4 className="text-xl font-bold text-white mb-2">Artifact Crate Key</h4>
                  <button className="w-full mt-4 py-3 bg-gold-400 text-gray-950 font-bold rounded-xl">View Details</button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Section 2 */}
        <div>
          <div className="flex items-center gap-4 mb-12">
            <h3 className="font-serif text-3xl text-[#FCFBF7]">Utility Keys</h3>
            <div className="flex-1 h-[1px] bg-white/10"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {section2Keys.length > 0 ? (
              section2Keys.map((pkg) => (
                <ProductCard key={pkg.id} pkg={pkg} />
              ))
            ) : (
              // Fallback placeholder if no API data yet
              <>
                <div className="bg-black/50 border border-white/5 rounded-3xl p-6 flex flex-col items-center hover:border-gold-400/40 transition-colors">
                  <Image src="/assets/afkkey.png" alt="AFK Key" width={120} height={120} className="mb-6 drop-shadow-2xl" />
                  <h4 className="text-xl font-bold text-white mb-2">AFK Key</h4>
                  <button className="w-full mt-4 py-3 bg-gold-400 text-gray-950 font-bold rounded-xl">View Details</button>
                </div>
                <div className="bg-black/50 border border-white/5 rounded-3xl p-6 flex flex-col items-center hover:border-gold-400/40 transition-colors">
                  <Image src="/assets/playtimekey.png" alt="Playtime Key" width={120} height={120} className="mb-6 drop-shadow-2xl" />
                  <h4 className="text-xl font-bold text-white mb-2">Playtime Key</h4>
                  <button className="w-full mt-4 py-3 bg-gold-400 text-gray-950 font-bold rounded-xl">View Details</button>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
