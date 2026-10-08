"use client";

import React from "react";
import Link from "next/link";
import { Compass, ArrowLeft, Rocket, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0B14] text-slate-100 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Planetary and orbital background circles */}
      <div className="absolute w-[600px] h-[600px] rounded-full border border-violet-500/10 pointer-events-none animate-orbit" />
      <div className="absolute w-[400px] h-[400px] rounded-full border border-cyan-400/10 pointer-events-none animate-orbit-reverse" />
      <div className="absolute w-80 h-80 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />

      {/* Playful Floating Astronaut SVG */}
      <div className="relative z-10 mb-8 animate-float">
        <svg
          className="w-44 h-44 text-cyan-400 mx-auto drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Helmet outline */}
          <circle cx="60" cy="50" r="32" stroke="currentColor" strokeWidth="3" />
          {/* Visor */}
          <rect
            x="40"
            y="38"
            width="40"
            height="22"
            rx="11"
            fill="#12132D"
            stroke="#7C5CFF"
            strokeWidth="2.5"
          />
          {/* Visor Reflection shine */}
          <path
            d="M48 44C52 42 62 42 68 45"
            stroke="#22D3EE"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Backpack */}
          <rect x="25" y="44" width="10" height="36" rx="4" fill="#1C1E3A" />
          <rect x="85" y="44" width="10" height="36" rx="4" fill="#1C1E3A" />
          {/* Body */}
          <path
            d="M38 78C38 74 44 70 60 70C76 70 82 74 82 78L84 100H36L38 78Z"
            stroke="currentColor"
            strokeWidth="3"
            fill="#0F1022"
          />
          {/* Chest badge */}
          <circle cx="60" cy="84" r="4" fill="#7C5CFF" />
          {/* Tether cord drifting off into space */}
          <path
            d="M60 100C60 110 50 115 55 125C60 135 45 140 40 150"
            stroke="#7C5CFF"
            strokeWidth="2"
            strokeDasharray="4 4"
            opacity="0.6"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-md">
        <span className="text-xs font-mono text-cyan-400 px-3 py-1 rounded-full bg-white/5 border border-white/10 uppercase tracking-widest">
          Error 404 • Lost in Deep Space
        </span>

        <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-white tracking-tight mt-4 mb-3">
          Off the Orbit
        </h1>

        <p className="text-sm text-slate-400 mb-8 leading-relaxed">
          The coordinate vector you requested has drifted out of gravitational range. Let's redirect your thrusters back to base.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button variant="primary" size="md" className="w-full sm:w-auto shadow-violet-500/30">
              <Home className="w-4 h-4 mr-2" />
              <span>Return to Dashboard</span>
            </Button>
          </Link>
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="secondary" size="md" className="w-full sm:w-auto">
              <span>Landing Page</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

