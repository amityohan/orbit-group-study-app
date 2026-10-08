"use client";

import React, { useState } from "react";
import {
  User as UserIcon,
  Flame,
  Award,
  Calendar,
  Settings,
  Edit3,
  Sparkles,
  Compass,
  CheckCircle2,
  Clock,
  BookOpen,
  PieChart as PieIcon,
  Bell,
  Palette,
  Volume2,
} from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import {
  currentUser,
  mockAchievements,
  mockStreakHeatmap,
  mockUsers,
} from "@/lib/mockData";
import { Card, Badge, Input } from "@/components/ui/Primitives";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";

export default function ProfilePage() {
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<"overview" | "settings">("overview");

  // Profile Edit State
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [university, setUniversity] = useState(currentUser.university || "");
  const [bio, setBio] = useState(currentUser.bio || "");
  const [currentTask, setCurrentTask] = useState(currentUser.currentTask || "");

  // Settings: Accent Color Live Switching
  const [themeAccent, setThemeAccent] = useState<
    "violet-cyan" | "emerald-cyan" | "amber-rose" | "fuchsia-indigo"
  >("violet-cyan");

  // Settings: Notifications and Sound Toggles
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [streakWarnings, setStreakWarnings] = useState(true);
  const [focusAutoMute, setFocusAutoMute] = useState(true);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    currentUser.name = name;
    currentUser.university = university;
    currentUser.bio = bio;
    currentUser.currentTask = currentTask;
    setEditModalOpen(false);
    toast({
      title: "Profile Updated ✨",
      description: "Changes applied to your public study avatar.",
      type: "success",
    });
  };

  const handleThemeChange = (
    accent: "violet-cyan" | "emerald-cyan" | "amber-rose" | "fuchsia-indigo"
  ) => {
    setThemeAccent(accent);
    document.documentElement.setAttribute("data-theme-accent", accent);
    toast({
      title: "Theme Accent Updated 🎨",
      description: `Accent shifted to ${accent}.`,
      type: "info",
    });
  };

  // Subjects Donut breakdown
  const subjectsData = [
    { name: "Computer Science", percent: 45, color: "#7C5CFF" },
    { name: "Mathematics", percent: 25, color: "#22D3EE" },
    { name: "Cognitive Science", percent: 20, color: "#34D399" },
    { name: "Languages", percent: 10, color: "#FBBF24" },
  ];

  const recentTimeline = [
    {
      title: "Completed 4x Pomodoro blocks in Deep Algorithms",
      time: "Today • 2 hours ago",
      subject: "Computer Science",
      duration: "100 min",
    },
    {
      title: "Reviewed 18 flashcards in JavaScript Engine & Event Loop",
      time: "Today • 4 hours ago",
      subject: "Spaced Repetition",
      duration: "15 min",
    },
    {
      title: "Unlocked '14-Day Orbit' consistency badge",
      time: "Yesterday • 8:30 PM",
      subject: "Achievement",
      duration: "Milestone",
    },
    {
      title: "Whiteboard derivation session on Raft Log Replication",
      time: "Yesterday • 3:00 PM",
      subject: "Computer Science",
      duration: "75 min",
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* ================= BANNER & AVATAR PROFILE HEADER ================= */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#0E0F22]">
          {/* Banner Gradient */}
          <div className="h-44 sm:h-52 w-full bg-gradient-to-r from-violet-900/40 via-indigo-900/30 to-cyan-900/40 relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-60" />
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <Badge variant="cyan" className="font-mono text-xs shadow-md">
                Member since Sept 2025
              </Badge>
            </div>
          </div>

          {/* Profile details strip */}
          <div className="px-6 sm:px-8 pb-8 pt-0 relative flex flex-col sm:flex-row sm:items-end justify-between gap-6 -mt-16 sm:-mt-20">
            <div className="flex flex-col sm:flex-row sm:items-end gap-5">
              <div className="relative inline-block">
                <Avatar
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  initials={currentUser.initials}
                  size="xl"
                  status="Focusing"
                  className="ring-4 ring-[#0E0F22] shadow-2xl"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
                    {name}
                  </h1>
                  <Badge variant="violet" className="text-xs">
                    Rank #{currentUser.rank} Global
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-cyan-300 font-medium">
                  {university}
                </p>
                <p className="text-xs text-slate-300 max-w-xl leading-relaxed pt-1">
                  {bio}
                </p>
              </div>
            </div>

            <Button
              onClick={() => setEditModalOpen(true)}
              variant="secondary"
              size="sm"
              className="glass-panel shrink-0"
            >
              <Edit3 className="w-3.5 h-3.5 mr-1.5" />
              <span>Edit profile</span>
            </Button>
          </div>

          {/* Tab Navigation: Overview vs Settings */}
          <div className="px-6 sm:px-8 border-t border-white/10 flex items-center gap-6 text-xs font-medium">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-3.5 transition-colors relative ${
                activeTab === "overview"
                  ? "text-cyan-400 font-semibold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Overview & Analytics
              {activeTab === "overview" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-400" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`py-3.5 transition-colors relative flex items-center gap-1.5 ${
                activeTab === "settings"
                  ? "text-cyan-400 font-semibold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>App Settings & Theme</span>
              {activeTab === "settings" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-400" />
              )}
            </button>
          </div>
        </div>

        {/* ================= TAB 1: OVERVIEW & ANALYTICS ================= */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="glass-panel p-5">
                <p className="text-xs text-slate-400">Total Focus Logged</p>
                <p className="text-2xl font-heading font-bold text-white font-mono-numbers mt-1">
                  {currentUser.focusHours}h
                </p>
                <p className="text-[11px] text-emerald-400 mt-1">+12.4h this week</p>
              </Card>

              <Card className="glass-panel p-5">
                <p className="text-xs text-slate-400">Active Streak</p>
                <p className="text-2xl font-heading font-bold text-amber-300 font-mono-numbers mt-1 flex items-center gap-1">
                  <Flame className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span>{currentUser.streak} days</span>
                </p>
                <p className="text-[11px] text-slate-400 mt-1">Best: 34 days</p>
              </Card>

              <Card className="glass-panel p-5">
                <p className="text-xs text-slate-400">Study Sessions</p>
                <p className="text-2xl font-heading font-bold text-white font-mono-numbers mt-1">
                  34
                </p>
                <p className="text-[11px] text-cyan-400 mt-1">Avg 52m duration</p>
              </Card>

              <Card className="glass-panel p-5">
                <p className="text-xs text-slate-400">Flashcards Mastered</p>
                <p className="text-2xl font-heading font-bold text-white font-mono-numbers mt-1">
                  184
                </p>
                <p className="text-[11px] text-violet-400 mt-1">84% retention</p>
              </Card>
            </div>

            {/* Middle Section: Subjects Donut & Streak Heatmap */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Subjects Studied Donut Chart */}
              <Card className="glass-panel lg:col-span-5 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-heading font-semibold text-white mb-1">
                    Subject Distribution
                  </h3>
                  <p className="text-xs text-slate-400 mb-6">
                    Time spent across focus categories
                  </p>

                  <div className="flex items-center justify-center my-4 relative">
                    {/* SVG Donut */}
                    <svg width="160" height="160" viewBox="0 0 42 42" className="transform -rotate-90">
                      <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#16172E" strokeWidth="5" />
                      {/* CS: 45% */}
                      <circle
                        cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#7C5CFF" strokeWidth="5"
                        strokeDasharray="45 55" strokeDashoffset="0"
                      />
                      {/* Math: 25% */}
                      <circle
                        cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#22D3EE" strokeWidth="5"
                        strokeDasharray="25 75" strokeDashoffset="-45"
                      />
                      {/* CogSci: 20% */}
                      <circle
                        cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#34D399" strokeWidth="5"
                        strokeDasharray="20 80" strokeDashoffset="-70"
                      />
                      {/* Lang: 10% */}
                      <circle
                        cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#FBBF24" strokeWidth="5"
                        strokeDasharray="10 90" strokeDashoffset="-90"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-xl font-mono-numbers font-bold text-white">4</span>
                      <span className="text-[10px] text-slate-400 uppercase font-mono">Disciplines</span>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="grid grid-cols-2 gap-2 pt-4 border-t border-white/5">
                  {subjectsData.map((s) => (
                    <div key={s.name} className="flex items-center gap-2 text-xs">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: s.color }}
                      />
                      <span className="text-slate-300 truncate">{s.name}</span>
                      <span className="text-slate-500 ml-auto font-mono">{s.percent}%</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Recent Activity Timeline */}
              <Card className="glass-panel lg:col-span-7 p-6">
                <h3 className="text-base font-heading font-semibold text-white mb-1">
                  Recent Focus Timeline
                </h3>
                <p className="text-xs text-slate-400 mb-6">
                  Verified orbital sprints and session milestones
                </p>

                <div className="space-y-4">
                  {recentTimeline.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 relative pb-4 last:pb-0">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0 shadow-[0_0_8px_#22D3EE]" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-white">{item.title}</p>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                          <span>{item.time}</span>
                          <span>•</span>
                          <span className="text-cyan-300">{item.subject}</span>
                        </div>
                      </div>
                      <Badge variant="default" className="text-[10px] font-mono shrink-0">
                        {item.duration}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ================= TAB 2: SETTINGS & LIVE THEME PICKER ================= */}
        {activeTab === "settings" && (
          <div className="space-y-6 max-w-3xl">
            {/* Live Theme Accent Picker */}
            <Card className="glass-panel p-6 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                <Palette className="w-5 h-5 text-cyan-400" />
                <div>
                  <h3 className="text-base font-heading font-semibold text-white">
                    Accent Glow Palette
                  </h3>
                  <p className="text-xs text-slate-400">
                    Live customization changes buttons, progress rings, and neon highlights across the app.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {/* 1. Electric Violet & Cyan */}
                <button
                  type="button"
                  onClick={() => handleThemeChange("violet-cyan")}
                  className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                    themeAccent === "violet-cyan"
                      ? "bg-white/10 border-cyan-400 shadow-md shadow-violet-500/10"
                      : "bg-white/[0.02] border-white/5 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#7C5CFF] to-[#22D3EE]" />
                    <div>
                      <p className="text-xs font-semibold text-white">Cosmic Orbit (Default)</p>
                      <p className="text-[10px] text-slate-400">#7C5CFF to #22D3EE</p>
                    </div>
                  </div>
                  {themeAccent === "violet-cyan" && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                </button>

                {/* 2. Emerald & Cyan */}
                <button
                  type="button"
                  onClick={() => handleThemeChange("emerald-cyan")}
                  className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                    themeAccent === "emerald-cyan"
                      ? "bg-white/10 border-emerald-400 shadow-md shadow-emerald-500/10"
                      : "bg-white/[0.02] border-white/5 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#10B981] to-[#06B6D4]" />
                    <div>
                      <p className="text-xs font-semibold text-white">Aurora Borealis</p>
                      <p className="text-[10px] text-slate-400">#10B981 to #06B6D4</p>
                    </div>
                  </div>
                  {themeAccent === "emerald-cyan" && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </button>

                {/* 3. Amber & Rose */}
                <button
                  type="button"
                  onClick={() => handleThemeChange("amber-rose")}
                  className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                    themeAccent === "amber-rose"
                      ? "bg-white/10 border-amber-400 shadow-md shadow-amber-500/10"
                      : "bg-white/[0.02] border-white/5 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#FB7185]" />
                    <div>
                      <p className="text-xs font-semibold text-white">Solar Flare</p>
                      <p className="text-[10px] text-slate-400">#F59E0B to #FB7185</p>
                    </div>
                  </div>
                  {themeAccent === "amber-rose" && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                </button>

                {/* 4. Fuchsia & Indigo */}
                <button
                  type="button"
                  onClick={() => handleThemeChange("fuchsia-indigo")}
                  className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                    themeAccent === "fuchsia-indigo"
                      ? "bg-white/10 border-fuchsia-400 shadow-md shadow-fuchsia-500/10"
                      : "bg-white/[0.02] border-white/5 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#D946EF] to-[#6366F1]" />
                    <div>
                      <p className="text-xs font-semibold text-white">Nebula Pulsar</p>
                      <p className="text-[10px] text-slate-400">#D946EF to #6366F1</p>
                    </div>
                  </div>
                  {themeAccent === "fuchsia-indigo" && <CheckCircle2 className="w-4 h-4 text-fuchsia-400" />}
                </button>
              </div>
            </Card>

            {/* Focus Mode & Notification Preferences */}
            <Card className="glass-panel p-6 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                <Bell className="w-5 h-5 text-violet-400" />
                <div>
                  <h3 className="text-base font-heading font-semibold text-white">
                    Preferences & Automation
                  </h3>
                  <p className="text-xs text-slate-400">
                    Configure notifications and synchronous focus behaviors.
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-white">Daily Streak Warnings</p>
                    <p className="text-[11px] text-slate-400">
                      Notify me at 8:00 PM if my orbit streak is about to reset.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStreakWarnings(!streakWarnings)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                      streakWarnings ? "bg-cyan-500" : "bg-white/15"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        streakWarnings ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-white">Auto-Mute on Sprint Start</p>
                    <p className="text-[11px] text-slate-400">
                      Silence all peripheral room alerts when Pomodoro timer is running.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFocusAutoMute(!focusAutoMute)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                      focusAutoMute ? "bg-cyan-500" : "bg-white/15"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        focusAutoMute ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* ================= EDIT PROFILE MODAL ================= */}
      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Public Scholar Profile"
        description="Update your bio and current study topic visible to co-workers."
      >
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <Input
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            label="Institution / Field of Study"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            placeholder="Stanford University • Cognitive Science"
          />

          <div>
            <label className="text-xs font-medium text-slate-300 mb-1.5 block">
              Personal Bio
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400/80 resize-none"
            />
          </div>

          <Input
            label="Current Deep Work Focus (Displayed in rooms)"
            value={currentTask}
            onChange={(e) => setCurrentTask(e.target.value)}
            placeholder="e.g. Distributed Systems & Raft Consensus"
          />

          <div className="pt-2 flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setEditModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </AppLayout>
  );
}

