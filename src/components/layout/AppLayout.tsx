"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Compass,
  Layers,
  Trophy,
  User,
  Plus,
  Flame,
  Search,
  Bell,
  LogOut,
  Sparkles,
  ChevronRight,
  Check,
} from "lucide-react";
import { currentUser, mockNotifications } from "@/lib/mockData";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Primitives";
import { useToast } from "@/components/ui/Toast";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomSubject, setNewRoomSubject] = useState("Computer Science");
  const [newRoomPrivate, setNewRoomPrivate] = useState(false);
  const [newRoomDesc, setNewRoomDesc] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [unreadNotifications, setUnreadNotifications] = useState(
    mockNotifications.filter((n) => !n.read).length
  );

  const navLinks = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Rooms", href: "/rooms", icon: Compass },
    { label: "Flashcards", href: "/flashcards", icon: Layers },
    { label: "Leaderboard", href: "/leaderboard", icon: Trophy },
    { label: "Profile", href: "/profile", icon: User },
  ];

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomName.trim()) return;

    const generatedCode = `ORB-${Math.floor(100 + Math.random() * 900)}`;
    setCreateModalOpen(false);
    toast({
      title: "Room Created Successfully! 🚀",
      description: `Invite code: ${generatedCode} (copied to clipboard)`,
      type: "success",
    });
    navigator.clipboard?.writeText(generatedCode);
    router.push("/rooms/room-cs-algorithms");
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/rooms?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0A0B14] text-slate-100 relative">
      {/* ================= LEFT SIDEBAR (Desktop) ================= */}
      <aside className="hidden md:flex w-64 lg:w-72 flex-col justify-between p-5 border-r border-white/10 bg-[#0C0D1A]/70 backdrop-blur-2xl shrink-0 z-30 sticky top-0 h-screen">
        {/* Top brand & quick create */}
        <div className="flex flex-col gap-6">
          <Link href="/dashboard" className="flex items-center gap-3 px-2">
            <div className="relative w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 p-[1px] shadow-lg shadow-violet-500/20">
              <div className="w-full h-full bg-[#0A0B14] rounded-[11px] flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22D3EE]" />
              </div>
            </div>
            <span className="text-xl font-heading font-bold text-white tracking-tight">
              Orbit
            </span>
          </Link>

          {/* User quick streak pill */}
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Avatar
                src={currentUser.avatar}
                alt={currentUser.name}
                initials={currentUser.initials}
                size="sm"
                status={currentUser.status}
              />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate">{currentUser.name}</p>
                <p className="text-[10px] text-slate-400 truncate">Rank #{currentUser.rank} Global</p>
              </div>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono-numbers text-xs font-semibold">
              <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{currentUser.streak}d</span>
            </div>
          </div>

          {/* Quick "Create room" button */}
          <Button
            onClick={() => setCreateModalOpen(true)}
            variant="primary"
            className="w-full justify-center shadow-violet-500/25"
            size="md"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            <span>Create room</span>
          </Button>

          {/* Nav Links */}
          <nav className="flex flex-col gap-1 mt-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive =
                pathname === link.href ||
                (link.href !== "/dashboard" && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group ${
                    isActive
                      ? "bg-gradient-to-r from-violet-600/30 to-cyan-500/20 text-white border border-violet-500/30 shadow-md shadow-violet-500/10"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? "text-cyan-400" : "text-slate-400 group-hover:text-slate-200"
                    }`}
                  />
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22D3EE]" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom card: Pro Upgrade banner */}
        <div className="p-3.5 rounded-xl bg-gradient-to-br from-violet-900/30 to-cyan-900/20 border border-white/10 relative overflow-hidden">
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <span className="text-xs font-semibold text-white">Orbit Pro Active</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
            Unlimited AI flashcards and HD whiteboard sync enabled.
          </p>
          <Link href="/profile">
            <span className="text-[11px] text-cyan-300 hover:text-cyan-200 font-medium flex items-center gap-1">
              Manage subscription <ChevronRight className="w-3 h-3" />
            </span>
          </Link>
        </div>
      </aside>

      {/* ================= MAIN CONTENT AREA ================= */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-6">
        {/* Top Bar (Search, Notifications, Profile Dropdown) */}
        <header className="sticky top-0 z-20 h-16 px-4 md:px-8 border-b border-white/10 bg-[#0A0B14]/80 backdrop-blur-xl flex items-center justify-between gap-4">
          {/* Mobile brand indicator */}
          <Link href="/dashboard" className="md:hidden flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-violet-600 to-cyan-500 p-[1px]">
              <div className="w-full h-full bg-[#0A0B14] rounded-[7px] flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
              </div>
            </div>
            <span className="font-heading font-bold text-base text-white">Orbit</span>
          </Link>

          {/* Global Search */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 max-w-md relative hidden sm:block"
          >
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search rooms, flashcards, subjects... (Cmd+K)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/80 focus:ring-1 focus:ring-cyan-400/80 transition-colors"
            />
          </form>

          {/* Right actions: Streak, Notifications, Avatar */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Streak indicator on header */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono-numbers text-xs font-semibold">
              <Flame className="w-4 h-4 fill-amber-400 text-amber-400 animate-pulse" />
              <span>{currentUser.streak} days</span>
            </div>

            {/* Notifications Menu */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifications > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_6px_#FB7185]" />
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#111224] border border-white/10 shadow-2xl p-4 backdrop-blur-2xl z-50">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Notifications
                    </span>
                    <button
                      onClick={() => setUnreadNotifications(0)}
                      className="text-[11px] text-cyan-400 hover:underline"
                    >
                      Mark all as read
                    </button>
                  </div>
                  <div className="flex flex-col gap-2.5 max-h-72 overflow-y-auto">
                    {mockNotifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-2.5 rounded-xl text-left transition-colors ${
                          notif.read ? "bg-white/[0.02]" : "bg-white/[0.06] border border-white/10"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs font-semibold text-white">{notif.title}</p>
                          <span className="text-[10px] text-slate-500">{notif.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-tight">
                          {notif.message}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-cyan-400/50 transition-all"
                aria-label="User profile menu"
              >
                <Avatar
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  initials={currentUser.initials}
                  size="sm"
                  status="Focusing"
                />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#111224] border border-white/10 shadow-2xl p-2 backdrop-blur-2xl z-50">
                  <div className="px-3 py-2 border-b border-white/10 mb-1">
                    <p className="text-xs font-semibold text-white">{currentUser.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{currentUser.university}</p>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>View Profile</span>
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-rose-300 hover:bg-rose-500/10 transition-colors mt-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign out</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Page Children */}
        <main className="flex-1 px-4 md:px-8 py-6 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* ================= MOBILE BOTTOM TAB BAR ================= */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0C0D1A]/95 border-t border-white/10 backdrop-blur-2xl px-4 py-2 flex items-center justify-around">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive =
            pathname === link.href ||
            (link.href !== "/dashboard" && pathname.startsWith(link.href));

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center gap-1 py-1 px-2 text-xs font-medium transition-colors ${
                isActive ? "text-cyan-400 font-semibold" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px]">{link.label}</span>
            </Link>
          );
        })}
        {/* Floating Quick Create for mobile */}
        <button
          onClick={() => setCreateModalOpen(true)}
          className="flex flex-col items-center gap-1 py-1 px-2 text-xs font-medium text-violet-400"
          aria-label="Create study room"
        >
          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 flex items-center justify-center text-[#0A0B14]">
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="text-[10px]">Create</span>
        </button>
      </nav>

      {/* ================= CREATE ROOM MODAL ================= */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Create Study Room"
        description="Launch an orbital space for synchronous group focus and whiteboard co-working."
      >
        <form onSubmit={handleCreateRoom} className="space-y-4">
          <Input
            label="Room Name"
            placeholder="e.g. Distributed Systems & Algorithms"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
            required
          />

          <div>
            <label className="text-xs font-medium text-slate-300 mb-1.5 block">
              Academic Subject
            </label>
            <select
              value={newRoomSubject}
              onChange={(e) => setNewRoomSubject(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-slate-100 text-sm focus:outline-none focus:border-cyan-400/80"
            >
              <option value="Computer Science" className="bg-[#111224]">Computer Science</option>
              <option value="Mathematics" className="bg-[#111224]">Mathematics</option>
              <option value="Biology" className="bg-[#111224]">Biology</option>
              <option value="Languages" className="bg-[#111224]">Languages</option>
              <option value="Law" className="bg-[#111224]">Law</option>
              <option value="Physics" className="bg-[#111224]">Physics</option>
              <option value="Literature" className="bg-[#111224]">Literature</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-300 mb-1.5 block">
              Room Description & Goals
            </label>
            <textarea
              rows={3}
              value={newRoomDesc}
              onChange={(e) => setNewRoomDesc(e.target.value)}
              placeholder="e.g. 25-minute Pomodoro sprints solving LeetCode hard graphs with camera/mic off."
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400/80 resize-none"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <div>
              <p className="text-xs font-medium text-white">Private Room</p>
              <p className="text-[11px] text-slate-400">
                Only invited users with the 6-character code can enter.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setNewRoomPrivate(!newRoomPrivate)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${
                newRoomPrivate ? "bg-cyan-500" : "bg-white/15"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                  newRoomPrivate ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setCreateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Launch Room 🚀
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

