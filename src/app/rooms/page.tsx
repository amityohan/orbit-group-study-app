"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Compass,
  Search,
  Plus,
  Users,
  Lock,
  Globe,
  SlidersHorizontal,
  Flame,
  ArrowRight,
  Sparkles,
  Copy,
  Check,
} from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { mockRooms, Room } from "@/lib/mockData";
import { Card, Badge, Input } from "@/components/ui/Primitives";
import { AvatarStack } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";

export default function RoomsPage() {
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<"discover" | "my-rooms" | "private">("discover");
  const [selectedSubject, setSelectedSubject] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [liveOnly, setLiveOnly] = useState(false);

  // Create room modal state
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomSubject, setNewRoomSubject] = useState<Room["subject"]>("Computer Science");
  const [newRoomDesc, setNewRoomDesc] = useState("");
  const [newRoomPrivate, setNewRoomPrivate] = useState(false);

  const subjects = ["All", "Computer Science", "Biology", "Mathematics", "Languages", "Law", "Physics", "Literature"];

  const filteredRooms = useMemo(() => {
    return mockRooms.filter((room) => {
      // Tab filter
      if (activeTab === "my-rooms" && room.id !== "room-cs-algorithms" && room.id !== "room-quantum-mechanics") {
        return false;
      }
      if (activeTab === "private" && !room.isPrivate) {
        return false;
      }

      // Subject filter
      if (selectedSubject !== "All" && room.subject !== selectedSubject) {
        return false;
      }

      // Search query
      if (
        searchQuery &&
        !room.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !room.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !room.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ) {
        return false;
      }

      // Live only
      if (liveOnly && room.membersCount === 0) {
        return false;
      }

      return true;
    });
  }, [activeTab, selectedSubject, searchQuery, liveOnly]);

  const handleCopyCode = (e: React.MouseEvent, code: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard?.writeText(code);
    toast({
      title: "Room Code Copied! 📋",
      description: `Copied ${code} to clipboard`,
      type: "success",
    });
  };

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomName.trim()) return;

    const generatedCode = `ORB-${Math.floor(100 + Math.random() * 900)}`;
    setCreateModalOpen(false);
    toast({
      title: "Room Created Successfully! 🚀",
      description: `Invite code: ${generatedCode}`,
      type: "success",
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* ================= PAGE HEADER & CTA ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <Compass className="w-3.5 h-3.5" />
              <span>Orbital Spaces</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
              Study Rooms
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">
              Drop into an active room to sync timers, share whiteboards, and enter deep flow.
            </p>
          </div>

          <Button
            onClick={() => setCreateModalOpen(true)}
            variant="primary"
            size="md"
            className="shadow-violet-500/25"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            <span>Create room</span>
          </Button>
        </div>

        {/* ================= TABS & FILTER BAR ================= */}
        <div className="flex flex-col gap-4">
          {/* Main Category Tabs */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3 flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("discover")}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === "discover"
                    ? "bg-white/10 text-white border border-white/10 shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Discover All ({mockRooms.length})</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("my-rooms")}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === "my-rooms"
                    ? "bg-white/10 text-white border border-white/10 shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>My Frequent Rooms (2)</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("private")}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === "private"
                    ? "bg-white/10 text-white border border-white/10 shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Private by Code</span>
                </div>
              </button>
            </div>

            {/* Live toggle */}
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-300">
              <input
                type="checkbox"
                checked={liveOnly}
                onChange={(e) => setLiveOnly(e.target.checked)}
                className="rounded border-white/20 text-cyan-500 focus:ring-0 bg-white/5 w-4 h-4"
              />
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live sessions only
              </span>
            </label>
          </div>

          {/* Search bar & Subject Filter Chips */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search rooms by name, subject, or topics (e.g. Raft, MCAT, Orgo)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/80 transition-colors"
              />
            </div>

            {/* Subject Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {subjects.map((subj) => (
                <button
                  key={subj}
                  onClick={() => setSelectedSubject(subj)}
                  className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all ${
                    selectedSubject === subj
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-medium"
                      : "bg-white/5 text-slate-400 hover:text-white border border-transparent"
                  }`}
                >
                  {subj}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ================= ROOMS GRID ================= */}
        {filteredRooms.length === 0 ? (
          /* Empty state illustration */
          <div className="py-20 text-center flex flex-col items-center justify-center p-8 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="w-16 h-16 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-4">
              <Compass className="w-8 h-8 opacity-60" />
            </div>
            <h3 className="text-lg font-heading font-semibold text-white mb-1">
              No orbital rooms found
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mb-6 leading-relaxed">
              We couldn't find any rooms matching your current filters. Clear the search or launch your own orbital space!
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedSubject("All");
                setLiveOnly(false);
              }}
              variant="secondary"
              size="sm"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredRooms.map((room) => {
              const subjectBadge =
                room.subject === "Computer Science"
                  ? "violet"
                  : room.subject === "Biology"
                  ? "emerald"
                  : room.subject === "Mathematics"
                  ? "cyan"
                  : room.subject === "Languages"
                  ? "amber"
                  : room.subject === "Law"
                  ? "rose"
                  : "cyan";

              return (
                <Card
                  key={room.id}
                  className="glass-panel-interactive flex flex-col justify-between group overflow-hidden relative border-white/10"
                >
                  {/* Top Cover Gradient Banner */}
                  <div
                    className={`h-24 -mx-5 sm:-mx-6 -mt-5 sm:-mt-6 p-4 bg-gradient-to-br ${room.gradient} border-b border-white/5 flex items-start justify-between relative`}
                  >
                    <div className="flex items-center gap-2">
                      <Badge variant={subjectBadge}>{room.subject}</Badge>
                      {room.isPrivate && (
                        <span className="p-1 rounded-md bg-black/40 text-rose-300 border border-rose-500/30" title="Private Room">
                          <Lock className="w-3 h-3" />
                        </span>
                      )}
                    </div>

                    {/* Room code badge with click-to-copy */}
                    <button
                      onClick={(e) => handleCopyCode(e, room.code)}
                      className="px-2 py-1 rounded-md bg-black/50 hover:bg-black/80 border border-white/15 text-[10px] font-mono text-cyan-300 flex items-center gap-1 transition-colors"
                      title="Click to copy room code"
                    >
                      <span>{room.code}</span>
                      <Copy className="w-3 h-3 text-slate-400" />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="pt-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-heading font-semibold text-white group-hover:text-cyan-300 transition-colors mb-2">
                        {room.name}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-4">
                        {room.description}
                      </p>

                      {/* Tag list */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {room.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-400 border border-white/5 font-mono"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Member Stacks & Join Button */}
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AvatarStack users={room.members} max={3} size="xs" />
                        <span className="text-[11px] text-slate-400 font-medium">
                          {room.membersCount}/{room.maxMembers}
                        </span>
                      </div>

                      <Link href={`/rooms/${room.id}`}>
                        <Button
                          variant="primary"
                          size="sm"
                          className="shadow-violet-500/20 group-hover:shadow-cyan-500/25"
                        >
                          <span>Join</span>
                          <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* ================= CREATE ROOM MODAL ================= */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Create Study Room"
        description="Set up your workspace parameters and invite classmates."
      >
        <form onSubmit={handleCreateRoom} className="space-y-4">
          <Input
            label="Room Title"
            placeholder="e.g. Distributed Consensus Reading Table"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
            required
          />

          <div>
            <label className="text-xs font-medium text-slate-300 mb-1.5 block">
              Discipline / Subject
            </label>
            <select
              value={newRoomSubject}
              onChange={(e) => setNewRoomSubject(e.target.value as any)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-slate-100 text-sm focus:outline-none focus:border-cyan-400/80"
            >
              {subjects.filter((s) => s !== "All").map((s) => (
                <option key={s} value={s} className="bg-[#111224]">
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-300 mb-1.5 block">
              Objective & Focus Guidelines
            </label>
            <textarea
              rows={3}
              value={newRoomDesc}
              onChange={(e) => setNewRoomDesc(e.target.value)}
              placeholder="e.g. 50-minute blocks, silent work, camera off. Whiteboard open for questions at the end of each sprint."
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400/80 resize-none"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <div>
              <p className="text-xs font-medium text-white">Private Access Only</p>
              <p className="text-[11px] text-slate-400">
                Hidden from public discovery. Entry requires room code.
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

          <div className="pt-2 flex justify-end gap-2">
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
    </AppLayout>
  );
}

