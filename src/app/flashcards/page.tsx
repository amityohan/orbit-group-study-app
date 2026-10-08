"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Layers,
  Sparkles,
  UploadCloud,
  FileText,
  ArrowRight,
  Brain,
  CheckCircle2,
  Clock,
  Play,
} from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { mockDecks, FlashcardDeck } from "@/lib/mockData";
import { Card, Badge, Skeleton } from "@/components/ui/Primitives";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export default function FlashcardsPage() {
  const { toast } = useToast();

  const [decks, setDecks] = useState<FlashcardDeck[]>(mockDecks);
  const [pasteNotes, setPasteNotes] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDeck, setGeneratedDeck] = useState<FlashcardDeck | null>(null);

  const handleGenerateAI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pasteNotes.trim()) return;

    setIsGenerating(true);
    setGeneratedDeck(null);

    // Simulate AI generation process with shimmer
    setTimeout(() => {
      const newDeck: FlashcardDeck = {
        id: `deck-ai-${Date.now()}`,
        title: "Neuroplasticity & Synaptic Pruning",
        subject: "Cognitive Science",
        description: "Generated from your lecture notes on LTP, LTD, dendritic spine morphogenesis, and memory consolidation.",
        cardCount: 8,
        masteryPercentage: 0,
        dueToday: 8,
        gradient: "from-cyan-500/20 to-violet-500/20",
        cards: [
          {
            id: "ai1",
            front: "What is Long-Term Potentiation (LTP)?",
            back: "A persistent strengthening of synapses based on recent patterns of activity, considered a cellular basis for learning and memory.",
            hint: "Hebbian plasticity: cells that fire together wire together",
            difficulty: "easy",
          },
          {
            id: "ai2",
            front: "Which receptor acts as the coincident detector for LTP induction?",
            back: "The NMDA receptor, which requires both glutamate binding and membrane depolarization to expel the Mg2+ block.",
            hint: "Magnesium unblocking mechanism",
            difficulty: "medium",
          },
          {
            id: "ai3",
            front: "What role does CaMKII play in synaptic plasticity?",
            back: "Activated by calcium influx through NMDA receptors, it phosphorylates AMPA receptors and facilitates insertion of additional AMPA receptors into the postsynaptic density.",
            hint: "Molecular memory kinase",
            difficulty: "hard",
          },
        ],
      };

      setIsGenerating(false);
      setGeneratedDeck(newDeck);
      setDecks((prev) => [newDeck, ...prev]);
      setPasteNotes("");
      toast({
        title: "AI Deck Generated! ✨",
        description: "8 active-recall flashcards created from your notes.",
        type: "success",
      });
    }, 2000);
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* ================= PAGE HEADER ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>Spaced Repetition & Recall</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
              Flashcard Decks
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">
              Review active recall decks with Leitner algorithm timing or generate new decks from study notes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="amber" className="px-3 py-1 text-xs">
              <Clock className="w-3.5 h-3.5" />
              <span>25 cards due today</span>
            </Badge>
          </div>
        </div>

        {/* ================= AI GENERATION STUDIO CARD ================= */}
        <Card className="glass-panel p-6 border-violet-500/30 bg-gradient-to-br from-violet-950/20 via-[#0E0F20] to-[#0A0B18] relative overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-heading font-semibold text-white">
              Generate Deck with Orbit AI
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-xl mb-5 leading-relaxed">
            Paste raw textbook excerpts, lecture slides, or markdown notes. Orbit extracts core conceptual relationships and formats prompt-and-answer cards with hints.
          </p>

          <form onSubmit={handleGenerateAI} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Drag and Drop Zone */}
              <div className="md:col-span-4 border-2 border-dashed border-white/15 hover:border-cyan-400/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center bg-white/[0.02] cursor-pointer transition-colors">
                <UploadCloud className="w-8 h-8 text-cyan-400 mb-2" />
                <p className="text-xs font-medium text-white">Drop lecture PDF or slides</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Supports PDF, PPTX up to 20MB</p>
              </div>

              {/* Textarea */}
              <div className="md:col-span-8">
                <textarea
                  rows={4}
                  value={pasteNotes}
                  onChange={(e) => setPasteNotes(e.target.value)}
                  placeholder="Paste lecture notes here (e.g. 'Long-Term Potentiation (LTP) is triggered when NMDA receptors open upon glutamate binding and depolarization, permitting Ca2+ entry and activation of CaMKII...')"
                  className="w-full p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-slate-100 placeholder:text-slate-500 text-xs focus:outline-none focus:border-cyan-400/80 resize-none font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-500 font-mono">
                Engine: Orbit Spaced-Neural v3
              </span>
              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isGenerating}
                disabled={!pasteNotes.trim() && !isGenerating}
              >
                <Sparkles className="w-4 h-4 mr-1.5" />
                <span>Generate Active-Recall Deck</span>
              </Button>
            </div>
          </form>

          {/* AI Generating Skeletons */}
          {isGenerating && (
            <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
              <p className="text-xs text-cyan-400 font-mono animate-pulse">
                Analyzing cognitive tokens and formulating retrieval cues...
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Skeleton className="h-28" />
                <Skeleton className="h-28" />
                <Skeleton className="h-28" />
              </div>
            </div>
          )}

          {/* Newly Generated Reveal Card */}
          {generatedDeck && (
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      New Deck Created: {generatedDeck.title}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {generatedDeck.cards.length} cards formulated • Subject: {generatedDeck.subject}
                    </p>
                  </div>
                </div>
                <Link href={`/flashcards/${generatedDeck.id}`}>
                  <Button variant="primary" size="sm">
                    Study Now 🚀
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </Card>

        {/* ================= DECK LIBRARY GRID ================= */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-heading font-bold text-white tracking-tight">
              Deck Library ({decks.length})
            </h2>
            <span className="text-xs text-slate-400 font-mono">
              Sorted by review urgency
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {decks.map((deck) => (
              <Card
                key={deck.id}
                className="glass-panel-interactive flex flex-col justify-between group p-6"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant={deck.subject === "Computer Science" ? "violet" : deck.subject === "Biology" ? "emerald" : "amber"}>
                      {deck.subject}
                    </Badge>
                    {deck.dueToday > 0 && (
                      <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/25">
                        {deck.dueToday} due today
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-heading font-semibold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {deck.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-6">
                    {deck.description}
                  </p>
                </div>

                <div>
                  {/* Mastery Percentage Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
                      <span className="text-slate-400">Mastery</span>
                      <span className="text-cyan-300 font-semibold">{deck.masteryPercentage}%</span>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${deck.masteryPercentage}%` }}
                        className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full transition-all duration-500"
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-mono">
                      {deck.cardCount} cards total
                    </span>
                    <Link href={`/flashcards/${deck.id}`}>
                      <Button variant="secondary" size="sm" className="group-hover:bg-white/20">
                        <Play className="w-3.5 h-3.5 mr-1 fill-white" />
                        <span>Study</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

