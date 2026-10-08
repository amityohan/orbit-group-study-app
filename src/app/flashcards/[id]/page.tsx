"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  RotateCw,
  Sparkles,
  Trophy,
  ArrowRight,
  Flame,
  Check,
  Brain,
  HelpCircle,
} from "lucide-react";
import confetti from "canvas-confetti";
import { mockDecks, Flashcard } from "@/lib/mockData";
import { Card, Badge } from "@/components/ui/Primitives";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

function DeckStudyContent() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const deckId = (params?.id as string) || "deck-javascript-internals";
  const deck = mockDecks.find((d) => d.id === deckId) || mockDecks[0];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  // Stats for the current session
  const [stats, setStats] = useState({
    again: 0,
    good: 0,
    easy: 0,
  });

  const currentCard: Flashcard | undefined = deck.cards[currentIndex];
  const progressPercent = ((currentIndex + 1) / deck.cards.length) * 100;

  // Spacebar flips card
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        setFlipped((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleGrade = (grade: "again" | "good" | "easy") => {
    setStats((prev) => ({ ...prev, [grade]: prev[grade] + 1 }));

    if (currentIndex + 1 < deck.cards.length) {
      setFlipped(false);
      setShowHint(false);
      setCurrentIndex((prev) => prev + 1);
    } else {
      setSessionCompleted(true);
      // Trigger festive confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#7C5CFF", "#22D3EE", "#34D399", "#FBBF24"],
      });
    }
  };

  const restartSession = () => {
    setCurrentIndex(0);
    setFlipped(false);
    setShowHint(false);
    setSessionCompleted(false);
    setStats({ again: 0, good: 0, easy: 0 });
  };

  return (
    <div className="min-h-screen bg-[#0A0B14] text-slate-100 flex flex-col p-4 sm:p-8">
      {/* ================= TOP STUDY HEADER ================= */}
      <header className="max-w-4xl w-full mx-auto flex items-center justify-between pb-6 border-b border-white/10 shrink-0">
        <Link href="/flashcards">
          <Button variant="ghost" size="sm" className="gap-1 -ml-3 text-slate-400 hover:text-white">
            <ChevronLeft className="w-4 h-4" />
            <span>Decks</span>
          </Button>
        </Link>

        <div className="text-center">
          <h1 className="text-sm font-heading font-semibold text-white truncate max-w-xs sm:max-w-md">
            {deck.title}
          </h1>
          <span className="text-[11px] text-cyan-400 font-mono">
            {deck.subject} • Card {currentIndex + 1} of {deck.cards.length}
          </span>
        </div>

        <button
          onClick={restartSession}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          title="Restart deck"
        >
          <RotateCw className="w-4 h-4" />
        </button>
      </header>

      {/* ================= PROGRESS BAR ================= */}
      <div className="max-w-4xl w-full mx-auto my-6">
        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
          <div
            style={{ width: `${sessionCompleted ? 100 : progressPercent}%` }}
            className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full transition-all duration-300"
          />
        </div>
      </div>

      {/* ================= MAIN FLASHCARD ARENA ================= */}
      <main className="max-w-3xl w-full mx-auto flex-1 flex flex-col justify-center items-center py-4">
        {!sessionCompleted && currentCard ? (
          <div className="w-full flex flex-col items-center">
            {/* 3D Flip Card Container */}
            <div
              onClick={() => setFlipped(!flipped)}
              className="w-full h-80 sm:h-96 perspective-1000 cursor-pointer select-none"
            >
              <div
                className={`relative w-full h-full rounded-3xl p-8 sm:p-12 transition-all duration-500 transform-style-3d border shadow-2xl flex flex-col justify-between ${
                  flipped
                    ? "rotate-y-180 bg-gradient-to-br from-violet-950/60 via-[#10122B] to-[#0A0B18] border-cyan-400/40"
                    : "bg-white/[0.04] border-white/10 hover:border-violet-500/40 backdrop-blur-2xl"
                }`}
              >
                {/* FRONT FACE */}
                <div
                  className={`absolute inset-0 p-8 sm:p-12 flex flex-col justify-between backface-hidden ${
                    flipped ? "opacity-0 pointer-events-none" : "opacity-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Badge variant="cyan" className="font-mono">
                      Question #{currentIndex + 1}
                    </Badge>
                    <span className="text-xs text-slate-400 font-mono">
                      Difficulty: {currentCard.difficulty || "medium"}
                    </span>
                  </div>

                  <div className="my-auto text-center py-4">
                    <p className="text-xl sm:text-2xl font-heading font-medium text-white leading-relaxed">
                      {currentCard.front}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-white/5">
                    {currentCard.hint && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowHint(!showHint);
                        }}
                        className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-mono text-[11px]"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>{showHint ? currentCard.hint : "Show Hint"}</span>
                      </button>
                    )}
                    <span className="ml-auto text-[11px]">Click or press Space to flip ↵</span>
                  </div>
                </div>

                {/* BACK FACE */}
                <div
                  className={`absolute inset-0 p-8 sm:p-12 flex flex-col justify-between backface-hidden rotate-y-180 ${
                    flipped ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Badge variant="emerald" className="font-mono">
                      Answer Key
                    </Badge>
                    <span className="text-xs text-emerald-400 font-mono">Active Recall</span>
                  </div>

                  <div className="my-auto py-4">
                    <p className="text-base sm:text-lg text-slate-100 leading-relaxed font-sans">
                      {currentCard.back}
                    </p>
                  </div>

                  <div className="text-[11px] text-slate-400 pt-4 border-t border-white/5 text-center font-mono">
                    Grade your retention below to adjust review schedule
                  </div>
                </div>
              </div>
            </div>

            {/* SPACED REPETITION GRADE BUTTONS */}
            <div className="flex items-center gap-3 sm:gap-4 mt-8 w-full max-w-md justify-center">
              <Button
                onClick={() => handleGrade("again")}
                variant="danger"
                size="md"
                className="flex-1 font-medium text-xs sm:text-sm"
              >
                Again (<span className="font-mono">1m</span>)
              </Button>
              <Button
                onClick={() => handleGrade("good")}
                variant="secondary"
                size="md"
                className="flex-1 font-medium text-xs sm:text-sm text-cyan-300 border-cyan-500/30 hover:border-cyan-400"
              >
                Good (<span className="font-mono">1d</span>)
              </Button>
              <Button
                onClick={() => handleGrade("easy")}
                variant="primary"
                size="md"
                className="flex-1 font-medium text-xs sm:text-sm"
              >
                Easy (<span className="font-mono">4d</span>)
              </Button>
            </div>
          </div>
        ) : (
          /* ================= COMPLETION SCREEN WITH STATS ================= */
          <Card className="glass-panel p-8 sm:p-12 max-w-md w-full text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white mb-6 shadow-xl shadow-amber-500/20">
              <Trophy className="w-8 h-8" />
            </div>

            <h2 className="text-2xl font-heading font-bold text-white mb-2">
              Deck Completed! 🚀
            </h2>
            <p className="text-xs text-slate-400 mb-8">
              All {deck.cards.length} cards in this orbit have been reviewed.
            </p>

            {/* Performance Breakdown */}
            <div className="w-full grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10 mb-8 text-center font-mono-numbers">
              <div>
                <p className="text-xl font-bold text-rose-400">{stats.again}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Again</p>
              </div>
              <div>
                <p className="text-xl font-bold text-cyan-400">{stats.good}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Good</p>
              </div>
              <div>
                <p className="text-xl font-bold text-emerald-400">{stats.easy}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Easy</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
              <Button onClick={restartSession} variant="secondary" className="w-full">
                Review Again
              </Button>
              <Link href="/flashcards" className="w-full">
                <Button variant="primary" className="w-full">
                  Back to Decks
                </Button>
              </Link>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}

export default function DeckStudyPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-[#0A0B14] flex items-center justify-center text-slate-400 font-mono text-xs">Entering Orbit Deck...</div>}>
      <DeckStudyContent />
    </React.Suspense>
  );
}
