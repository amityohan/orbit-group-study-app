"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Flame,
  Clock,
  Target,
  Layers,
  Plus,
  Hash,
  UploadCloud,
  ArrowUpRight,
  Sparkles,
  Calendar,
  Users,
  Play,
} from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import {
  currentUser,
  mockRooms,
  mockDecks,
  mockWeeklyFocusData,
  mockStreakHeatmap,
} from "@/lib/mockData";
import { Card, Badge } from "@/components/ui/Primitives";
import { Avatar, AvatarStack } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Primitives";
import { useToast } from "@/components/ui/Toast";

export default function DashboardPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [inviteCode, setInviteCode] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");

  const [today, setToday] = useState("Thursday, Oct 8");

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      })
    );
  }, []);

  const handleJoinWithCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteCode.length < 3) return;

    setJoinModalOpen(false);
    toast({
      title: "Joined Room Successfully!",
      description: `Entering room ${inviteCode.toUpperCase()}...`,
      type: "success",
    });
    router.push("/rooms/room-cs-algorithms");
  };

  const handleUploadNotes = (e: React.FormEvent) => {
    e.preventDefault();
    setUploadModalOpen(false);
    toast({
      title: "Notes Uploaded! ✨",
      description: "AI deck generation queued. Visit Flashcards to review.",
      type: "success",
    });
    router.push("/flashcards");
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* ================= GREETING HEADER ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{today}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
              Welcome back, {currentUser.name.split(" ")[0]} 👋
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">
              Your focus orbit is aligned. Ready to conquer your deep work goals today?
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setJoinModalOpen(true)}
              className="glass-panel"
            >
              <Hash className="w-3.5 h-3.5 mr-1 text-cyan-400" />
              <span>Join with code</span>
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setUploadModalOpen(true)}
              className="glass-panel"
            >
              <UploadCloud className="w-3.5 h-3.5 mr-1 text-violet-400" />
              <span>Upload notes</span>
            </Button>
            <Link href="/rooms">
              <Button variant="primary" size="sm">
                <Play className="w-3.5 h-3.5 mr-1 fill-white" />
                <span>Enter Room</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* ================= STAT CARDS ROW ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Streak Card */}
          <Card className="glass-panel-interactive flex items-center justify-between p-5">
            <div>
              <p className="text-xs font-medium text-slate-400">Current Streak</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-heading font-bold text-white font-mono-numbers">
                  {currentUser.streak}
                </span>
                <span className="text-xs text-amber-400 font-medium">Days on orbit</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Keep it up tomorrow!</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/10">
              <Flame className="w-6 h-6 fill-amber-400" />
            </div>
          </Card>

          {/* Focus Time Today */}
          <Card className="glass-panel-interactive flex items-center justify-between p-5">
            <div>
              <p className="text-xs font-medium text-slate-400">Focus Time Today</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-heading font-bold text-white font-mono-numbers">
                  3h 45m
                </span>
                <span className="text-xs text-emerald-400 font-medium">+45m vs avg</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Goal: 4h 00m</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/10">
              <Clock className="w-6 h-6" />
            </div>
          </Card>

          {/* Weekly Goal Progress Ring */}
          <Card className="glass-panel-interactive flex items-center justify-between p-5">
            <div>
              <p className="text-xs font-medium text-slate-400">Weekly Goal</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-heading font-bold text-white font-mono-numbers">
                  82%
                </span>
                <span className="text-xs text-violet-400 font-medium">23 / 28 hrs</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">5 hrs left this week</p>
            </div>
            <ProgressRing progress={82} size={54} strokeWidth={5}>
              <Target className="w-4 h-4 text-cyan-400" />
            </ProgressRing>
          </Card>

          {/* Cards Due Today */}
          <Card className="glass-panel-interactive flex items-center justify-between p-5">
            <div>
              <p className="text-xs font-medium text-slate-400">Cards Due for Review</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-heading font-bold text-white font-mono-numbers">
                  18
                </span>
                <span className="text-xs text-rose-400 font-medium">Across 3 decks</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Spaced repetition priority</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shadow-lg shadow-violet-500/10">
              <Layers className="w-6 h-6" />
            </div>
          </Card>
        </div>

        {/* ================= FOCUS CHART & UPCOMING SESSIONS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Weekly Focus Bar Chart */}
          <Card className="glass-panel lg:col-span-8 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-heading font-semibold text-white">
                  Weekly Focus Breakdown
                </h3>
                <p className="text-xs text-slate-400">Hours spent in synchronous flow states</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-1.5 text-cyan-400">
                  <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-r from-violet-500 to-cyan-400" />
                  <span>Actual Focus</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-2.5 h-0.5 bg-slate-600" />
                  <span>4h Target</span>
                </div>
              </div>
            </div>

            {/* Custom SVG/CSS Bar Chart with Animated Bars */}
            <div className="h-48 flex items-end justify-between gap-3 pt-6 pb-2 border-b border-white/5">
              {mockWeeklyFocusData.map((d, i) => {
                const max = 8.0;
                const heightPercent = (d.hours / max) * 100;
                const isHighest = d.hours === 7.2;

                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                    {/* Tooltip on hover */}
                    <span className="text-[10px] font-mono font-medium text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      {d.hours}h
                    </span>
                    {/* Bar */}
                    <div className="w-full max-w-[40px] bg-white/5 rounded-t-lg relative overflow-hidden flex items-end h-full">
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full rounded-t-lg transition-all duration-700 ${
                          isHighest
                            ? "bg-gradient-to-t from-violet-600 via-cyan-400 to-emerald-300 shadow-[0_0_12px_#22D3EE]"
                            : "bg-gradient-to-t from-violet-600 to-cyan-500/80 group-hover:brightness-125"
                        }`}
                      />
                    </div>
                    {/* Day label */}
                    <span className="text-xs text-slate-400 font-mono group-hover:text-white transition-colors">
                      {d.day}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 pt-3">
              <span>Weekly Total: 36.6 hours</span>
              <span className="text-emerald-400 font-medium">Top 5% on campus this week</span>
            </div>
          </Card>

          {/* Upcoming Sessions List */}
          <Card className="glass-panel lg:col-span-4 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-heading font-semibold text-white">
                  Upcoming Sessions
                </h3>
                <span className="text-xs text-cyan-400 font-mono">Synced</span>
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-wider">
                      Today • 4:00 PM
                    </span>
                    <p className="text-xs font-semibold text-white mt-0.5">
                      Distributed Raft Consensus Sprint
                    </p>
                    <p className="text-[11px] text-slate-400">Room: Deep Algorithms</p>
                  </div>
                  <Badge variant="cyan" className="text-[10px]">
                    25m x 4
                  </Badge>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-violet-300 uppercase tracking-wider">
                      Tomorrow • 10:00 AM
                    </span>
                    <p className="text-xs font-semibold text-white mt-0.5">
                      Quantum Wave Function Derivations
                    </p>
                    <p className="text-[11px] text-slate-400">ETH Zürich Cohort</p>
                  </div>
                  <Badge variant="violet" className="text-[10px]">
                    Whiteboard
                  </Badge>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-amber-300 uppercase tracking-wider">
                      Friday • 2:00 PM
                    </span>
                    <p className="text-xs font-semibold text-white mt-0.5">
                      MCAT Organic Reaction Sprint
                    </p>
                    <p className="text-[11px] text-slate-400">Pre-Med Table</p>
                  </div>
                  <Badge variant="amber" className="text-[10px]">
                    Deck Drill
                  </Badge>
                </div>
              </div>
            </div>

            <Link href="/rooms" className="mt-4">
              <Button variant="ghost" size="sm" className="w-full justify-center text-xs">
                <span>View all schedule</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </Card>
        </div>

        {/* ================= CONTINUE STUDYING (RECENT ROOMS) ================= */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-heading font-bold text-white tracking-tight">
                Continue Studying
              </h2>
              <p className="text-xs text-slate-400">Active rooms with your peers currently focusing</p>
            </div>
            <Link href="/rooms">
              <span className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1">
                Explore all {mockRooms.length} rooms <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {mockRooms.slice(0, 3).map((r) => (
              <Card
                key={r.id}
                className="glass-panel-interactive p-5 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant={r.subject === "Computer Science" ? "violet" : r.subject === "Biology" ? "emerald" : "cyan"}>
                      {r.subject}
                    </Badge>
                    <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{r.membersCount} focusing</span>
                    </div>
                  </div>

                  <h3 className="text-base font-heading font-semibold text-white group-hover:text-cyan-300 transition-colors line-clamp-1 mb-1.5">
                    {r.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                    {r.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <AvatarStack users={r.members} max={3} size="xs" />
                  <Link href={`/rooms/${r.id}`}>
                    <Button variant="secondary" size="sm" className="group-hover:bg-white/20">
                      <span>Join Room</span>
                      <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* ================= 12-WEEK STUDY STREAK HEATMAP ================= */}
        <Card className="glass-panel p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-base font-heading font-semibold text-white">
                12-Week Orbital Heatmap
              </h3>
              <p className="text-xs text-slate-400">
                84 days of continuous academic focus and active recall
              </p>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-400">
              <span>Less</span>
              <span className="w-2.5 h-2.5 rounded-sm bg-white/5" />
              <span className="w-2.5 h-2.5 rounded-sm bg-violet-950" />
              <span className="w-2.5 h-2.5 rounded-sm bg-violet-600" />
              <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400" />
              <span>More</span>
            </div>
          </div>

          {/* Grid representation */}
          <div className="overflow-x-auto pb-2">
            <div className="grid grid-flow-col grid-rows-7 gap-1.5 min-w-[680px]">
              {mockStreakHeatmap.map((day, idx) => {
                const colors = [
                  "bg-white/[0.04]",
                  "bg-violet-950/70 border border-violet-800/30",
                  "bg-violet-600/60 border border-violet-500/40",
                  "bg-gradient-to-br from-violet-500 to-cyan-400 shadow-[0_0_4px_#22D3EE]",
                ];
                return (
                  <div
                    key={idx}
                    title={`${day.date}: ${day.hours} focus hours`}
                    className={`w-3.5 h-3.5 rounded-sm ${colors[day.intensity]} hover:ring-2 hover:ring-white transition-all cursor-pointer`}
                  />
                );
              })}
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-white/5">
            <span>Current run: {currentUser.streak} days without breaking orbit</span>
            <span className="text-amber-300 font-mono">Longest streak: 34 days</span>
          </div>
        </Card>
      </div>

      {/* ================= JOIN WITH CODE MODAL ================= */}
      <Modal
        isOpen={joinModalOpen}
        onClose={() => setJoinModalOpen(false)}
        title="Join Room with Code"
        description="Enter the 6-character room passkey shared by your classmate."
      >
        <form onSubmit={handleJoinWithCode} className="space-y-4">
          <Input
            label="Room Code"
            placeholder="e.g. ALG-902"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
            maxLength={10}
            required
            className="font-mono text-center text-lg tracking-widest uppercase"
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setJoinModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Enter Room
            </Button>
          </div>
        </form>
      </Modal>

      {/* ================= UPLOAD NOTES MODAL ================= */}
      <Modal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        title="Upload Study Notes"
        description="Orbit AI transforms your PDF or markdown notes into flashcards with hints and difficulty tiers."
      >
        <form onSubmit={handleUploadNotes} className="space-y-4">
          <div className="border-2 border-dashed border-white/20 hover:border-cyan-400/60 rounded-2xl p-8 text-center flex flex-col items-center justify-center transition-colors cursor-pointer bg-white/[0.02]">
            <UploadCloud className="w-10 h-10 text-cyan-400 mb-3" />
            <p className="text-sm font-medium text-white">
              {uploadedFileName || "Click to browse or drag PDF / Markdown files"}
            </p>
            <p className="text-xs text-slate-400 mt-1">Supports PDF, DOCX, TXT, MD up to 25MB</p>
            <input
              type="file"
              className="hidden"
              id="file-upload"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setUploadedFileName(e.target.files[0].name);
                }
              }}
            />
            <label
              htmlFor="file-upload"
              className="mt-4 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white cursor-pointer"
            >
              Select File
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setUploadModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Generate Deck ✨
            </Button>
          </div>
        </form>
      </Modal>
    </AppLayout>
  );
}
