"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Shield, ExternalLink, Gamepad2 } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "Store", href: "#store" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0b0f19]/80 backdrop-blur-md border-b border-white/5 py-4 shadow-lg"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <a href="#home" onClick={(e) => handleLinkClick(e, "#home")} className="flex items-center gap-2">
              <div className="relative w-10 h-10 overflow-hidden rounded-lg">
                <Image
                  src="/assets/artifactsmpt.png"
                  alt="Artifact SMP Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-outfit font-extrabold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 bg-[size:200%] animate-pulse-slow">
                ARTIFACT
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-slate-300 hover:text-white font-medium text-sm transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
            <a
              href="https://discord.gg/zJPKDYvT9A"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-white font-medium text-sm flex items-center gap-1 transition-colors duration-200"
            >
              Discord <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Play Now CTA */}
          <div className="hidden md:block">
            <a
              href="#store"
              onClick={(e) => handleLinkClick(e, "#store")}
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-lg overflow-hidden group bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold text-sm shadow-md transition-all duration-300 hover:shadow-orange-500/20 hover:scale-105"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Shop Webstore</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-[#0b0f19] border-b border-white/5 shadow-xl transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible"
        }`}
      >
        <div className="px-4 pt-4 pb-6 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="block px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 font-medium transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="https://discord.gg/zJPKDYvT9A"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 font-medium flex items-center justify-between"
          >
            <span>Discord</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <div className="pt-4 border-t border-white/5">
            <a
              href="#store"
              onClick={(e) => handleLinkClick(e, "#store")}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold text-center shadow-lg"
            >
              <Gamepad2 className="w-5 h-5" />
              <span>Shop Webstore</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
