"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Users,
  Timer,
  Layers,
  Flame,
  Focus,
  PenTool,
  ArrowRight,
  Play,
  RotateCcw,
  Check,
  Star,
  Quote,
  Shield,
  Zap,
} from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import PublicFooter from "@/components/layout/PublicFooter";
import { Button } from "@/components/ui/Button";
import { Badge, Card } from "@/components/ui/Primitives";
import { Avatar, AvatarStack } from "@/components/ui/Avatar";
import { mockUsers } from "@/lib/mockData";

export default function LandingPage() {
  // Mini Pomodoro Demo State
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [timerActive, setTimerActive] = useState(false);
  const [timerMode, setTimerMode] = useState<"focus" | "break">("focus");

  // Mini Flashcard Demo State
  const [cardFlipped, setCardFlipped] = useState(false);

  // Pricing Interval State
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");

  // Timer tick effect
  React.useEffect(() => {
    let interval: any = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const resetTimer = () => {
    setTimerActive(false);
    setTimerSeconds(timerMode === "focus" ? 25 * 60 : 5 * 60);
  };

  const features = [
    {
      icon: Users,
      title: "Live Study Rooms",
      description: "Step into virtual study tables with real-time presence, avatars, and focus status cues.",
      gradient: "from-violet-500 to-indigo-500",
    },
    {
      icon: PenTool,
      title: "Shared Whiteboard",
      description: "Infinite canvas for real-time math derivations, system architecture, and reaction maps.",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      icon: Timer,
      title: "Synced Pomodoro",
      description: "Synchronize 25/5 intervals with peers so everybody enters and exits flow states together.",
      gradient: "from-amber-400 to-orange-500",
    },
    {
      icon: Layers,
      title: "AI Flashcards",
      description: "Drop lecture PDFs or raw lecture notes to automatically generate active-recall decks.",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      icon: Flame,
      title: "Streaks & Leaderboard",
      description: "Gamified focus streaks, weekly hours podium, and unlocked cosmic orbital achievements.",
      gradient: "from-yellow-400 to-amber-600",
    },
    {
      icon: Focus,
      title: "Deep Space Focus Mode",
      description: "One click dims all peripheral chat and sidebars, creating distraction-free tunnel vision.",
      gradient: "from-emerald-400 to-teal-500",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Enter an Orbital Room",
      description: "Join public study hubs by subject (CS, Pre-med, Law, Math) or launch a private room for your cohort.",
    },
    {
      step: "02",
      title: "Sync Focus Timers",
      description: "Lock in with synced 25-minute Pomodoro sprints. Visual indicators keep everyone accountable without awkward video calls.",
    },
    {
      step: "03",
      title: "Master with Active Recall",
      description: "Switch to integrated flashcards or whiteboard sketches to test memory retention before breaking.",
    },
  ];

  const testimonials = [
    {
      name: "Marcus Vance",
      school: "Oxford Law (1L)",
      quote: "Orbit completely transformed my tort law preparation. Studying alongside people quietly grinding around the globe makes 4-hour sessions feel effortless.",
      avatar: mockUsers[4].avatar,
      streak: "14-day streak",
    },
    {
      name: "Elena Rostova",
      school: "ETH Zürich • Quantum Physics",
      quote: "The synchronized Pomodoro and shared whiteboard let me derive quantum mechanics formulas with peers in Tokyo and Stanford in real time.",
      avatar: mockUsers[1].avatar,
      streak: "28-day streak",
    },
    {
      name: "Maya Chen",
      school: "UC Berkeley • Molecular Bio",
      quote: "The AI flashcard generation turns messy cellular respiration slide decks into spaced repetition cards in 10 seconds. Unbelievably good.",
      avatar: mockUsers[3].avatar,
      streak: "18-day streak",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#0A0B14] overflow-x-hidden">
      <PublicNavbar />

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-36 pb-24 md:pt-44 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Glow ambient circle */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-violet-600/20 via-cyan-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        <Badge variant="violet" className="mb-6 px-3.5 py-1.5 shadow-lg shadow-violet-500/10">
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          <span>The Next-Generation Virtual Study Universe</span>
        </Badge>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight text-white max-w-4xl leading-[1.1] mb-6">
          Study together. <br className="hidden sm:inline" />
          <span className="gradient-text">Stay in orbit.</span>
        </h1>

        <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed mb-10">
          Join quiet co-working rooms with synchronized Pomodoro timers, collaborative whiteboards, and intelligent spaced repetition. Built for deep focus.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto">
          <Link href="/signup" className="w-full sm:w-auto">
            <Button size="lg" variant="primary" className="w-full sm:w-auto group shadow-violet-500/30">
              <span>Start studying free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <a href="#how-it-works" className="w-full sm:w-auto">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
              See how it works
            </Button>
          </a>
        </div>

        {/* 3D-tilted Mockup Card */}
        <div className="w-full max-w-5xl relative mt-4">
          <div className="relative rounded-3xl p-1 bg-gradient-to-b from-white/20 via-white/5 to-white/0 shadow-2xl shadow-violet-900/40">
            <div className="rounded-[22px] bg-[#0E0F1F]/90 backdrop-blur-2xl border border-white/10 p-4 sm:p-6 text-left overflow-hidden">
              {/* Window controls */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-slate-400 ml-2">
                    orbit://room/deep-algorithms-raft
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="cyan">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span>6 Co-studiers Live</span>
                  </Badge>
                </div>
              </div>

              {/* Mock Room Workspace Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                {/* Left Mini Sidebar */}
                <div className="lg:col-span-3 rounded-xl bg-white/[0.03] border border-white/5 p-3 flex flex-col gap-2.5">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Study Table Members
                  </p>
                  <div className="space-y-2">
                    {mockUsers.slice(0, 4).map((u) => (
                      <div key={u.id} className="flex items-center justify-between p-1.5 rounded-lg bg-white/[0.02]">
                        <div className="flex items-center gap-2">
                          <Avatar src={u.avatar} alt={u.name} initials={u.initials} size="xs" status={u.status} />
                          <span className="text-xs text-white truncate max-w-[90px]">{u.name}</span>
                        </div>
                        <span className="text-[10px] text-emerald-400 font-mono">Focusing</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Center Canvas Preview */}
                <div className="lg:col-span-6 rounded-xl bg-[#080914] border border-white/5 p-4 flex flex-col justify-between min-h-[220px]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-300">Whiteboard Derivation</span>
                    <span className="text-[10px] text-violet-400 font-mono">Sync latency: 12ms</span>
                  </div>
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <div className="w-32 h-20 border-2 border-dashed border-cyan-400/40 rounded-lg flex items-center justify-center font-mono-numbers text-xs text-cyan-300 mb-2">
                      {"Ĥ|Ψ⟩ = E|Ψ⟩"}
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Elena Rostova is sketching Schrödinger wave equations...
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Auto-saved to Room Notebook</span>
                  </div>
                </div>

                {/* Right Pomodoro Preview */}
                <div className="lg:col-span-3 rounded-xl bg-white/[0.03] border border-white/5 p-4 flex flex-col items-center justify-center text-center">
                  <p className="text-[11px] font-medium text-slate-400 mb-1">Pomodoro Cycle 3/4</p>
                  <div className="text-3xl font-mono-numbers font-bold text-white tracking-wider my-2">
                    18:42
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-3">
                    <div className="bg-gradient-to-r from-violet-500 to-cyan-400 h-full w-3/4 rounded-full" />
                  </div>
                  <Badge variant="violet" className="text-[10px]">
                    Silent Focus Block
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS STRIP ================= */}
      <section className="py-12 border-y border-white/10 bg-[#090A15]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-heading font-bold text-white gradient-text">
              12,400+
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">Active Students & Researchers</p>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-heading font-bold text-white gradient-text">
              480,000+
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">Deep Focus Hours Logged</p>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-heading font-bold text-white gradient-text">
              98.4%
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">Exam Completion Rate</p>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-heading font-bold text-white gradient-text">
              4.9 / 5.0
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">Average Student Rating</p>
          </div>
        </div>
      </section>

      {/* ================= FEATURES GRID ================= */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="cyan" className="mb-3">
            Designed for Immersion
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
            Everything you need for deep collective work
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            Engineered from ground up to recreate the serene focus of university library stacks, powered by modern web technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <Card
                key={i}
                className="glass-panel-interactive flex flex-col justify-between group p-6"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${f.gradient} p-0.5 shadow-lg mb-5 flex items-center justify-center`}
                  >
                    <div className="w-full h-full bg-[#0A0B14]/70 rounded-[10px] flex items-center justify-center backdrop-blur-sm">
                      <Icon className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200" />
                    </div>
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-white mb-2">
                    {f.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how-it-works" className="py-24 border-t border-white/5 bg-[#080912]/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <Badge variant="amber" className="mb-3">
              Simple 3-Step Ritual
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
              How Orbit keeps you focused
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Orbit Line */}
            <div className="hidden md:block absolute top-1/2 left-12 right-12 h-0.5 bg-gradient-to-r from-violet-500/40 via-cyan-400/40 to-emerald-400/40 -translate-y-8 z-0 pointer-events-none" />

            {steps.map((st, i) => (
              <div
                key={i}
                className="relative z-10 rounded-2xl bg-white/[0.03] border border-white/10 p-6 backdrop-blur-xl flex flex-col items-start"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center font-mono-numbers text-lg font-bold text-white mb-5 shadow-lg shadow-violet-500/20">
                  {st.step}
                </div>
                <h3 className="text-lg font-heading font-semibold text-white mb-2">
                  {st.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {st.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= INTERACTIVE DEMO SECTION ================= */}
      <section id="demo" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="violet" className="mb-3">
            Hands-On Experience
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
            Try Orbit right now
          </h2>
          <p className="text-slate-400 mt-2 text-sm">
            Interact with our synchronized timer and 3D active-recall card widget.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Demo 1: Mini Pomodoro Timer */}
          <Card className="glass-panel p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                  Live Pomodoro Simulator
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Mode: {timerMode === "focus" ? "Focus 25m" : "Short Break 5m"}
                </span>
              </div>
              <p className="text-sm text-slate-300 mb-6">
                Test the countdown mechanism. When studying in a room, all connected participants are locked in step.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center py-6 bg-white/[0.02] rounded-2xl border border-white/5 my-2">
              <div className="text-5xl font-mono-numbers font-bold text-white tracking-wider mb-6">
                {formatTimer(timerSeconds)}
              </div>
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => setTimerActive(!timerActive)}
                  variant="primary"
                  size="md"
                >
                  <Play className={`w-4 h-4 fill-white ${timerActive ? "opacity-40" : ""}`} />
                  <span>{timerActive ? "Pause" : "Start Sprint"}</span>
                </Button>
                <Button onClick={resetTimer} variant="secondary" size="md">
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-white/5">
              <span>Sprint cycle: 25 min work • 5 min break</span>
              <span className="text-emerald-400 font-mono">Ready to sync</span>
            </div>
          </Card>

          {/* Demo 2: Interactive 3D Flashcard Flip */}
          <Card className="glass-panel p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">
                  3D Active Recall Card
                </span>
                <span className="text-xs text-slate-400">Click card or spacebar to flip</span>
              </div>
              <p className="text-sm text-slate-300 mb-4">
                Test our spaced repetition flip card. Self-grade answers to optimize retrieval memory.
              </p>
            </div>

            {/* 3D Flip Container */}
            <div
              onClick={() => setCardFlipped(!cardFlipped)}
              className="cursor-pointer perspective-1000 min-h-[180px] my-2 select-none"
            >
              <div
                className={`relative w-full h-full min-h-[180px] rounded-2xl p-6 transition-all duration-500 transform-style-3d border ${
                  cardFlipped
                    ? "rotate-y-180 bg-gradient-to-br from-violet-900/40 to-slate-900/80 border-cyan-400/40"
                    : "bg-white/[0.04] border-white/10 hover:border-violet-500/50"
                }`}
              >
                {/* Front Side */}
                <div
                  className={`absolute inset-0 p-6 flex flex-col justify-between backface-hidden ${
                    cardFlipped ? "opacity-0 pointer-events-none" : "opacity-100"
                  }`}
                >
                  <span className="text-[11px] font-mono text-cyan-300">
                    Question • JavaScript Engine
                  </span>
                  <p className="text-base font-semibold text-white">
                    What is the difference between the Call Stack and the Task Queue in V8?
                  </p>
                  <span className="text-xs text-slate-400">👉 Tap anywhere to reveal answer</span>
                </div>

                {/* Back Side */}
                <div
                  className={`absolute inset-0 p-6 flex flex-col justify-between backface-hidden rotate-y-180 ${
                    cardFlipped ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <span className="text-[11px] font-mono text-emerald-400">
                    Solution & Recall Key
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    The Call Stack executes synchronous code (LIFO). The Task Queue holds asynchronous callbacks (setTimeout, DOM events) waiting for the stack to clear.
                  </p>
                  <span className="text-xs text-cyan-300 font-mono">Difficulty: Medium</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-white/5">
              <span>Deck: JavaScript Internals</span>
              <span className="text-violet-400 font-medium">9 cards remaining</span>
            </div>
          </Card>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-24 border-t border-white/5 bg-[#080912]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="rose" className="mb-3">
              Student Endorsements
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
              From college freshmen to PhD researchers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Card key={i} className="glass-panel p-6 flex flex-col justify-between">
                <div>
                  <Quote className="w-6 h-6 text-violet-400 mb-3 opacity-60" />
                  <p className="text-sm text-slate-300 leading-relaxed mb-6 italic">
                    "{t.quote}"
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <Avatar src={t.avatar} alt={t.name} size="sm" />
                    <div>
                      <p className="text-xs font-semibold text-white">{t.name}</p>
                      <p className="text-[10px] text-slate-400">{t.school}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono-numbers px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    {t.streak}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section id="pricing" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="cyan" className="mb-3">
            Transparent Pricing
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
            Invest in your academic mastery
          </h2>
          <p className="text-slate-400 mt-2 text-sm">
            Free forever for solo sessions. Upgrade for collaborative power and unlimited AI decks.
          </p>

          {/* Monthly / Yearly Toggle */}
          <div className="mt-8 inline-flex items-center p-1 rounded-xl bg-white/5 border border-white/10">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                billingCycle === "monthly" ? "bg-white/15 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                billingCycle === "yearly" ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              <span>Yearly</span>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded-full">Save 25%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Card 1: Free */}
          <Card className="glass-panel p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-heading font-semibold text-white mb-1">Scholar Free</h3>
              <p className="text-xs text-slate-400 mb-4">Core co-working essentials.</p>
              <div className="text-3xl font-mono-numbers font-bold text-white mb-6">
                $0
                <span className="text-xs font-normal text-slate-400"> / forever</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Join unlimited public rooms</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Synced Pomodoro timers</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Up to 3 custom flashcard decks</span>
                </li>
                <li className="flex items-center gap-2 text-slate-500">
                  <Shield className="w-4 h-4 opacity-40" />
                  <span>Community leaderboard</span>
                </li>
              </ul>
            </div>
            <Link href="/signup" className="mt-8">
              <Button variant="secondary" className="w-full">
                Get started free
              </Button>
            </Link>
          </Card>

          {/* Card 2: Pro (Highlighted) */}
          <div className="rounded-2xl p-[1px] bg-gradient-to-b from-cyan-400 via-violet-500 to-indigo-500 shadow-2xl shadow-violet-900/40 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-[10px] font-semibold text-white tracking-wide uppercase">
              Most Popular
            </div>
            <div className="h-full rounded-[15px] bg-[#0E0F20] p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-heading font-semibold text-white mb-1">Orbit Pro</h3>
                <p className="text-xs text-slate-400 mb-4">For ambitious students seeking top percentiles.</p>
                <div className="text-3xl font-mono-numbers font-bold text-white mb-6">
                  {billingCycle === "yearly" ? "$6" : "$8"}
                  <span className="text-xs font-normal text-slate-400"> / month</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-200">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400" />
                    <span>Unlimited private & custom rooms</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400" />
                    <span>Unlimited AI PDF-to-Flashcards</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400" />
                    <span>Vector Whiteboard & PDF export</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400" />
                    <span>Priority orbital leaderboard badge</span>
                  </li>
                </ul>
              </div>
              <Link href="/signup" className="mt-8">
                <Button variant="primary" className="w-full shadow-violet-500/30">
                  Start 7-day Pro Trial
                </Button>
              </Link>
            </div>
          </div>

          {/* Card 3: Team / Campus */}
          <Card className="glass-panel p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-heading font-semibold text-white mb-1">Campus Lab</h3>
              <p className="text-xs text-slate-400 mb-4">For university clubs and research cohorts.</p>
              <div className="text-3xl font-mono-numbers font-bold text-white mb-6">
                {billingCycle === "yearly" ? "$18" : "$24"}
                <span className="text-xs font-normal text-slate-400"> / member / mo</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Everything in Orbit Pro</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Dedicated domain room links</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Shared institution deck repositories</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Admin analytics & attendance logs</span>
                </li>
              </ul>
            </div>
            <Link href="/signup" className="mt-8">
              <Button variant="secondary" className="w-full">
                Contact Campus Sales
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* ================= FINAL CTA BANNER ================= */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-14 overflow-hidden bg-gradient-to-r from-violet-950/60 via-[#10122B] to-cyan-950/40 border border-white/10 text-center flex flex-col items-center">
          {/* Glowing planet decoration */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight mb-4">
              Ready to enter your highest orbit of focus?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mb-8 leading-relaxed">
              Join thousands of dedicated scholars studying smarter every single day. No credit card required.
            </p>
            <Link href="/signup">
              <Button size="lg" variant="primary" className="shadow-violet-500/40">
                <span>Launch Your Orbit Now</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
