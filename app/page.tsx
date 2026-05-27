import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ExpandingGallery from "@/components/ExpandingGallery";
import StoreSection from "@/components/StoreSection";
import BottomLeftOverlay from "@/components/BottomLeftOverlay";
import { Package } from "@/app/api/packages/route";

async function getPackages(): Promise<Package[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/packages`,
      { cache: "no-store" }
    );
    if (!res.ok) {
      console.error("Failed to fetch packages from internal API");
      return [];
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching packages:", error);
    return [];
  }
}

export default async function Home() {
  const packages = await getPackages();

  return (
    <main 
      className="relative flex min-h-screen flex-col text-[#FCFBF7] overflow-hidden"
      style={{
        backgroundImage: "url('/assets/hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#0A0A09]/80 to-[#0A0A09] -z-10 fixed"></div>
      
      <Navbar />
      <BottomLeftOverlay />
      <Hero />
      
      {/* Rest of the page content */}
      <div className="relative w-full">
        <StoreSection packages={packages} />
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900/50 backdrop-blur-md border-t border-gray-800/50 py-16">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
              <span className="font-serif font-bold text-2xl text-white tracking-wider">
                ARTIFACT
              </span>
            </div>
            <p className="text-gray-400 text-sm max-w-sm font-sans leading-relaxed">
              Experience the pinnacle of luxury vanilla-plus survival. 
              Purchases contribute directly to our continuous development.
            </p>
          </div>
          <div className="text-xs text-gray-500 font-sans flex flex-col gap-2 md:items-end">
            <span>&copy; {new Date().getFullYear()} Artifact SMP. All rights reserved.</span>
            <span>Not affiliated with Mojang Studios, Minecraft, or Microsoft.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
