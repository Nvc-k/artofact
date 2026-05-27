import ProductCard from "./ProductCard";
import { Package } from "@/app/api/packages/route";

export default function StoreSection({ packages }: { packages: Package[] }) {
  // Rely on the API packages to populate the store dynamically.
  // The ProductCard will assign local images if Tebex doesn't provide them.
  const subscriptionRanks = packages.filter((p) => p.type === "subscription");
  const oneTimeKeys = packages.filter((p) => p.type === "single");

  return (
    <section id="store" className="py-32 bg-transparent border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="text-center mb-24">
          <span className="text-gold-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">The Shop</span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#FCFBF7]">Curated Collections</h2>
          <div className="h-1 w-20 bg-gold-400 mx-auto rounded-full mt-6"></div>
        </div>

        {/* Section 1: Ranks & Crates */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-12">
            <h3 className="font-serif text-3xl text-[#FCFBF7]">Ranks & Crates</h3>
            <div className="flex-1 h-[1px] bg-white/10"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {subscriptionRanks.length > 0 ? (
              subscriptionRanks.map((pkg) => (
                <ProductCard key={pkg.id} pkg={pkg} />
              ))
            ) : (
              <p className="text-white/50 italic col-span-full">No ranks available at the moment. Add them in Tebex.</p>
            )}
          </div>
        </div>

        {/* Section 2: Exclusive Keys */}
        <div>
          <div className="flex items-center gap-4 mb-12">
            <h3 className="font-serif text-3xl text-[#FCFBF7]">Exclusive Keys</h3>
            <div className="flex-1 h-[1px] bg-white/10"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {oneTimeKeys.length > 0 ? (
              oneTimeKeys.map((pkg) => (
                <ProductCard key={pkg.id} pkg={pkg} />
              ))
            ) : (
              <p className="text-white/50 italic col-span-full">No keys available at the moment. Add them in Tebex.</p>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
