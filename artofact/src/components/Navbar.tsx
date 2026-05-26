import Link from "next/link";
import { Store, Map, BookOpen, Crown } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 p-6 flex justify-end">
      <div className="flex items-center gap-8 bg-white/80 backdrop-blur-md px-8 py-3 rounded-full border border-black/5 shadow-sm">
        <Link href="/" className="text-sm font-semibold tracking-wide text-gray-800 hover:text-gold-500 transition-colors uppercase flex items-center gap-2">
          Home
        </Link>
        <Link href="#store" className="text-sm font-semibold tracking-wide text-gray-800 hover:text-gold-500 transition-colors uppercase flex items-center gap-2">
          Store
        </Link>
        <Link href="/rules" className="text-sm font-semibold tracking-wide text-gray-800 hover:text-gold-500 transition-colors uppercase flex items-center gap-2">
          Rules
        </Link>
        <Link href="#store" className="bg-gold-500 hover:bg-gold-600 text-white px-5 py-2 rounded-full text-sm font-bold tracking-widest uppercase transition-all lux-shadow flex items-center gap-2">
          <Crown className="w-4 h-4" /> VIP
        </Link>
      </div>
    </nav>
  );
}
