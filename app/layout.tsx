import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit",
});

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Artifact SMP – Official Server Webstore",
  description: "Enhance your survival experience on Artifact SMP. Buy subscription ranks, lifetime ranks, and server crate keys securely.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#080b11] text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
