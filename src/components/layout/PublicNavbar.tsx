"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function PublicNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0B14]/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/30 py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with orbiting dot motif */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 p-[1px] shadow-lg shadow-violet-500/20 group-hover:shadow-cyan-500/30 transition-shadow">
            <div className="w-full h-full bg-[#0A0B14] rounded-[11px] flex items-center justify-center relative overflow-hidden">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22D3EE]" />
              <span className="absolute w-6 h-6 border border-violet-400/40 rounded-full animate-orbit" />
            </div>
          </div>
          <span className="text-xl font-heading font-bold text-white tracking-tight flex items-center gap-1.5">
            Orbit
            <span className="text-[10px] font-mono-numbers px-1.5 py-0.5 rounded-md bg-white/10 text-cyan-300 font-normal">
              v2.0
            </span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link
            href="#features"
            className="hover:text-white transition-colors duration-200"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="hover:text-white transition-colors duration-200"
          >
            How it works
          </Link>
          <Link
            href="#demo"
            className="hover:text-white transition-colors duration-200"
          >
            Interactive Demo
          </Link>
          <Link
            href="#pricing"
            className="hover:text-white transition-colors duration-200"
          >
            Pricing
          </Link>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="primary" size="sm" className="group">
              <span>Get started</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-300 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0D0E1D]/95 border-b border-white/10 px-6 py-6 flex flex-col gap-4 backdrop-blur-2xl">
          <Link
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base text-slate-200 hover:text-cyan-400 py-1"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base text-slate-200 hover:text-cyan-400 py-1"
          >
            How it works
          </Link>
          <Link
            href="#demo"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base text-slate-200 hover:text-cyan-400 py-1"
          >
            Interactive Demo
          </Link>
          <Link
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base text-slate-200 hover:text-cyan-400 py-1"
          >
            Pricing
          </Link>
          <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="secondary" className="w-full">
                Log in
              </Button>
            </Link>
            <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" className="w-full">
                Get started free
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

