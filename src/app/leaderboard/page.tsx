"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Trophy,
  Flame,
  Crown,
  Medal,
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles,
  Lock,
  CheckCircle2,
  Users,
  Globe,
  Clock,
  Compass,
  Rocket,
  Brain,
} from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import {
  mockLeaderboard,
  mockAchievements,
  currentUser,
  LeaderboardUser,
  Achievement,
} from "@/lib/mockData";
import { Card, Badge } from "@/components/ui/Primitives";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState<"week" | "month" | "all-time">("week");
  const [scope, setScope] = useState<"global" | "my-rooms">("global");

  // Top 3 for podium
  const topThree = [mockLeaderboard[0], mockLeaderboard[1], mockLeaderboard[2]];
  const restOfLeaderboard = mockLeaderboard.slice(3);

  const getAchievementIcon = (iconName: string) => {
    switch (iconName) {
      case "Rocket":
        return Rocket;
      case "Flame":
        return Flame;
      case "Sparkles":
        return Sparkles;
      case "Brain":
        return Brain;
      case "Users":
        return Users;
      case "Compass":
      default:
        return Compass;
    }
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* ================= PAGE HEADER & TOGGLES ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <Trophy className="w-3.5 h-3.5" />
              <span>Cosmic Rankings</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
              Leaderboard & Orbit Trophies
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">
              Celebrate deep work consistency, focus sprints, and cohort milestones.
            </p>
          </div>

          {/* Dual Toggle Pill Controls */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Scope: Global vs My Rooms */}
            <div className="inline-flex p-1 rounded-xl bg-white/5 border border-white/10">
              <button
                onClick={() => setScope("global")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  scope === "global"
                    ? "bg-white/15 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Global
              </button>
              <button
                onClick={() => setScope("my-rooms")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  scope === "my-rooms"
                    ? "bg-white/15 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                My Cohort
              </button>
            </div>

            {/* Timeframe: Week / Month / All-time */}
            <div className="inline-flex p-1 rounded-xl bg-white/5 border border-white/10">
              <button
                onClick={() => setTimeframe("week")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  timeframe === "week"
                    ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                This Week
              </button>
              <button
                onClick={() => setTimeframe("month")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  timeframe === "month"
                    ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                This Month
              </button>
              <button
                onClick={() => setTimeframe("all-time")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  timeframe === "all-time"
                    ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                All Time
              </button>
            </div>
          </div>
        </div>

        {/* ================= PODIUM FOR TOP 3 ================= */}
        <div className="relative pt-6 pb-2">
          {/* Subtle cosmic glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-36 bg-violet-600/10 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto items-end">
            {/* Rank 2 (Silver) */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-3">
                <Avatar
                  src={topThree[1].user.avatar}
                  alt={topThree[1].user.name}
                  initials={topThree[1].user.initials}
                  size="lg"
                  className="ring-4 ring-slate-300/40 shadow-xl"
                />
                <span className="absolute -top-2.5 -right-1 w-6 h-6 rounded-full bg-slate-300 text-slate-900 font-mono-numbers text-xs font-bold flex items-center justify-center shadow-md">
                  2
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-white truncate max-w-[120px]">
                {topThree[1].user.name}
              </p>
              <p className="text-[10px] text-slate-400 truncate max-w-[120px]">
                {topThree[1].user.university?.split("•")[0]}
              </p>
              <div className="mt-2 w-full h-28 sm:h-36 rounded-t-2xl bg-white/[0.04] border-t-2 border-x border-slate-300/30 flex flex-col items-center justify-center p-2 backdrop-blur-xl">
                <span className="text-xs sm:text-sm font-mono-numbers font-bold text-white">
                  {topThree[1].focusHours}h
                </span>
                <span className="text-[10px] text-slate-400">focus hours</span>
              </div>
            </div>

            {/* Rank 1 (Gold - Center & Elevated) */}
            <div className="flex flex-col items-center text-center -translate-y-4">
              <div className="relative mb-3">
                <Crown className="w-6 h-6 text-amber-400 absolute -top-7 left-1/2 -translate-x-1/2 animate-bounce" />
                <Avatar
                  src={topThree[0].user.avatar}
                  alt={topThree[0].user.name}
                  initials={topThree[0].user.initials}
                  size="xl"
                  className="ring-4 ring-amber-400 shadow-[0_0_25px_#FBBF24]"
                />
                <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-amber-400 text-slate-900 font-mono-numbers text-sm font-bold flex items-center justify-center shadow-lg">
                  1
                </span>
              </div>
              <p className="text-sm sm:text-base font-semibold text-white truncate max-w-[140px]">
                {topThree[0].user.name}
              </p>
              <p className="text-[11px] text-slate-400 truncate max-w-[140px]">
                {topThree[0].user.university?.split("•")[0]}
              </p>
              <div className="mt-2 w-full h-36 sm:h-44 rounded-t-2xl bg-gradient-to-t from-amber-500/10 to-amber-500/20 border-t-2 border-x border-amber-400/50 flex flex-col items-center justify-center p-2 backdrop-blur-xl shadow-lg shadow-amber-500/10">
                <span className="text-base sm:text-lg font-mono-numbers font-bold text-amber-300">
                  {topThree[0].focusHours}h
                </span>
                <span className="text-[10px] text-amber-400/80">focus hours</span>
                <span className="mt-1 text-[10px] font-mono text-amber-300 px-2 py-0.5 rounded-full bg-amber-400/20">
                  🔥 {topThree[0].user.streak}d streak
                </span>
              </div>
            </div>

            {/* Rank 3 (Bronze) */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-3">
                <Avatar
                  src={topThree[2].user.avatar}
                  alt={topThree[2].user.name}
                  initials={topThree[2].user.initials}
                  size="lg"
                  className="ring-4 ring-amber-700/50 shadow-xl"
                />
                <span className="absolute -top-2.5 -right-1 w-6 h-6 rounded-full bg-amber-700 text-white font-mono-numbers text-xs font-bold flex items-center justify-center shadow-md">
                  3
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-white truncate max-w-[120px]">
                {topThree[2].user.name}
              </p>
              <p className="text-[10px] text-slate-400 truncate max-w-[120px]">
                {topThree[2].user.university?.split("•")[0]}
              </p>
              <div className="mt-2 w-full h-24 sm:h-32 rounded-t-2xl bg-white/[0.04] border-t-2 border-x border-amber-700/40 flex flex-col items-center justify-center p-2 backdrop-blur-xl">
                <span className="text-xs sm:text-sm font-mono-numbers font-bold text-white">
                  {topThree[2].focusHours}h
                </span>
                <span className="text-[10px] text-slate-400">focus hours</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= MAIN CONTENT: RANKED TABLE & ACHIEVEMENTS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* RANKED TABLE */}
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Ranked Orbit Registry
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Updated live every 5 minutes
              </span>
            </div>

            {/* Pinned Current User Card */}
            <Card className="p-4 bg-gradient-to-r from-violet-950/40 via-[#12132D] to-cyan-950/30 border-cyan-400/50 shadow-lg shadow-violet-500/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 text-center font-mono-numbers font-bold text-sm text-cyan-300">
                  #4
                </div>
                <Avatar
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  initials={currentUser.initials}
                  size="sm"
                  status="Focusing"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-white">{currentUser.name}</p>
                    <Badge variant="cyan" className="text-[10px] py-0">You</Badge>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {currentUser.university?.split("•")[0]}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm font-mono-numbers font-bold text-cyan-300">
                    {currentUser.focusHours}h
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono">34 sessions</p>
                </div>
                <div className="flex items-center gap-1 text-emerald-400 font-mono text-xs">
                  <TrendingUp className="w-4 h-4" />
                  <span>+2</span>
                </div>
              </div>
            </Card>

            {/* Rest of the table */}
            <div className="space-y-2 pt-2">
              {restOfLeaderboard.map((item) => {
                const isUser = item.isCurrentUser;
                const rankDelta = item.prevRank - item.rank;

                return (
                  <div
                    key={item.user.id}
                    className={`p-3.5 rounded-xl border flex items-center justify-between transition-colors ${
                      isUser
                        ? "bg-violet-900/20 border-violet-500/40"
                        : "bg-white/[0.03] border-white/5 hover:bg-white/[0.06]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 text-center font-mono-numbers text-xs text-slate-400">
                        #{item.rank}
                      </div>
                      <Avatar
                        src={item.user.avatar}
                        alt={item.user.name}
                        initials={item.user.initials}
                        size="sm"
                        status={item.user.status}
                      />
                      <div>
                        <p className="text-xs font-semibold text-white">{item.user.name}</p>
                        <p className="text-[10px] text-slate-400">
                          {item.user.university?.split("•")[0]}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-xs font-mono-numbers font-medium text-white">
                          {item.focusHours}h
                        </p>
                        <p className="text-[10px] text-slate-500 font-mono">
                          {item.studySessions} sessions
                        </p>
                      </div>

                      {/* Rank change arrow */}
                      <div className="w-8 flex justify-center">
                        {rankDelta > 0 ? (
                          <div className="flex items-center gap-0.5 text-emerald-400 font-mono text-[10px]">
                            <TrendingUp className="w-3.5 h-3.5" />
                            <span>{rankDelta}</span>
                          </div>
                        ) : rankDelta < 0 ? (
                          <div className="flex items-center gap-0.5 text-rose-400 font-mono text-[10px]">
                            <TrendingDown className="w-3.5 h-3.5" />
                            <span>{Math.abs(rankDelta)}</span>
                          </div>
                        ) : (
                          <Minus className="w-3.5 h-3.5 text-slate-600" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SIDE CARD: ACHIEVEMENTS & TROPHIES */}
          <div className="lg:col-span-4">
            <Card className="glass-panel p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <h3 className="text-base font-heading font-semibold text-white">
                    Cosmic Badges
                  </h3>
                  <p className="text-xs text-slate-400">4 of 6 trophies unlocked</p>
                </div>
                <Badge variant="amber" className="text-xs">
                  <Sparkles className="w-3 h-3" />
                  <span>Tier II</span>
                </Badge>
              </div>

              <div className="space-y-3">
                {mockAchievements.map((ach) => {
                  const Icon = getAchievementIcon(ach.icon);

                  return (
                    <div
                      key={ach.id}
                      className={`p-3 rounded-xl border flex items-start gap-3 transition-colors ${
                        ach.unlocked
                          ? "bg-white/[0.04] border-white/10"
                          : "bg-white/[0.01] border-white/5 opacity-50"
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          ach.unlocked
                            ? "bg-gradient-to-tr from-violet-600 to-cyan-500 text-white shadow-md shadow-violet-500/20"
                            : "bg-white/5 text-slate-500"
                        }`}
                      >
                        {ach.unlocked ? (
                          <Icon className="w-4 h-4" />
                        ) : (
                          <Lock className="w-4 h-4" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-white truncate">
                            {ach.title}
                          </p>
                          {ach.unlocked && (
                            <span className="text-[10px] text-emerald-400 font-mono">
                              Unlocked
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                          {ach.description}
                        </p>
                        {ach.progress && (
                          <div className="mt-2">
                            <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                              <span>Progress</span>
                              <span>
                                {ach.progress.current} / {ach.progress.total}
                              </span>
                            </div>
                            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                              <div
                                style={{
                                  width: `${(ach.progress.current / ach.progress.total) * 100}%`,
                                }}
                                className="h-full bg-cyan-400 rounded-full"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

