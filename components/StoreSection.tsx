import ProductCard from "./ProductCard";
import { Package } from "@/app/api/packages/route";

export default function StoreSection({ packages }: { packages: Package[] }) {
  const subscriptionRanks = packages.filter((p) => p.type === "subscription");
  const oneTimeKeys = packages.filter((p) => p.type === "single");

  return (
    <section id="store" className="py-32 bg-gray-50 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="text-center mb-24">
          <span className="text-gold-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">The Boutique</span>
          <h2 className="font-serif text-4xl md:text-5xl text-gray-900">Curated Collections</h2>
          <div className="h-1 w-20 bg-gold-400 mx-auto rounded-full mt-6"></div>
        </div>

        {/* Subscriptions */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-12">
            <h3 className="font-serif text-3xl text-gray-900">Ranks & Memberships</h3>
            <div className="flex-1 h-[1px] bg-gray-200"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {subscriptionRanks.map((pkg) => (
              <ProductCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>

        {/* One Time Keys */}
        <div>
          <div className="flex items-center gap-4 mb-12">
            <h3 className="font-serif text-3xl text-gray-900">Exclusive Keys</h3>
            <div className="flex-1 h-[1px] bg-gray-200"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {oneTimeKeys.map((pkg) => (
              <ProductCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
