"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CHURCH_INFO } from "@/lib/constants";
import { Tv, Menu, X, ChevronRight } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Accueil", href: "/" },
    { label: "À propos", href: "/about" },
    { label: "Programmes", href: "/programs" },
    { label: "Sermons", href: "/sermons" },
    { label: "Départements", href: "/departments" },
    { label: "S'inscrire", href: "/inscription" },
    { label: "Rendez-vous", href: "/rendez-vous" },
    { label: "Dons", href: "/give" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-white/90 backdrop-blur-xl shadow-md border-b border-outline-variant/20 py-3" 
        : "bg-white/80 backdrop-blur-lg border-b border-outline-variant/10 py-4"
    }`}>
      <nav className="flex justify-between items-center px-4 md:px-margin-desktop max-w-container-max mx-auto">
        
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-2 group shrink-0 mr-4 lg:mr-6 xl:mr-8">
          <img
            src="/logo.png"
            alt="Logo HOUEKIN MINISTRIES"
            className="h-10 md:h-11 w-auto object-contain group-hover:scale-105 transition-transform"
          />
          <div>
            <span className="font-display font-bold text-sm md:text-lg text-primary block leading-tight whitespace-nowrap">
              {CHURCH_INFO.name}
            </span>
            <span className="font-display text-[9px] md:text-[11px] text-secondary tracking-widest uppercase block font-semibold whitespace-nowrap">
              {CHURCH_INFO.subtitle}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links & CTA Button */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-5">
          <div className="flex items-center gap-3 xl:gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-on-surface-variant hover:text-primary font-semibold text-[11px] xl:text-xs transition-colors py-1 relative group whitespace-nowrap"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          <a
            href={CHURCH_INFO.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary hover:bg-primary-container text-white px-4 py-2 rounded-full font-bold text-[11px] xl:text-xs transition-all shadow-md hover:shadow-lg flex items-center gap-1.5 active:scale-95 whitespace-nowrap shrink-0 ml-1"
          >
            <Tv className="w-4 h-4 text-secondary-container animate-pulse" />
            <span>Regarder le direct</span>
          </a>
        </div>

        {/* Mobile Live Button & Hamburger Toggle */}
        <div className="flex lg:hidden items-center gap-3">
          <a
            href={CHURCH_INFO.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex bg-primary hover:bg-primary-container text-white px-4 py-2 rounded-full font-bold text-xs transition-all shadow-md items-center gap-2"
          >
            <Tv className="w-3.5 h-3.5 text-secondary-container animate-pulse" />
            <span>Direct</span>
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-on-surface hover:text-primary transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-2xl border-b border-outline-variant/20 px-6 py-6 space-y-4 shadow-xl fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 text-on-surface font-semibold hover:text-primary transition-colors border-b border-surface-container-low"
            >
              <span>{link.label}</span>
              <ChevronRight className="w-4 h-4 text-secondary" />
            </Link>
          ))}
          <div className="pt-2">
            <a
              href={CHURCH_INFO.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-primary text-white py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-md"
            >
              <Tv className="w-4 h-4 text-secondary-container" />
              <span>Regarder le direct</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
