"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Users,
  Copy,
  PenTool,
  FileText,
  Layers,
  Play,
  Pause,
  RotateCcw,
  Send,
  Maximize2,
  Minimize2,
  Eraser,
  Undo2,
  Square,
  Circle,
  Type,
  ChevronLeft,
  Flame,
  Volume2,
  VolumeX,
  Sparkles,
  ExternalLink,
  Info,
} from "lucide-react";
import {
  mockRooms,
  currentUser,
  mockUsers,
  mockDecks,
  User,
  Room,
} from "@/lib/mockData";
import { Avatar } from "@/components/ui/Avatar";
import { Badge, Card } from "@/components/ui/Primitives";
import { Button } from "@/components/ui/Button";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { useToast } from "@/components/ui/Toast";

function RoomDetailContent() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const roomId = (params?.id as string) || "room-cs-algorithms";
  const currentRoom =
    mockRooms.find((r) => r.id === roomId) || mockRooms[0];

  // Workspace Center Tab
  const [workspaceTab, setWorkspaceTab] = useState<"whiteboard" | "notes" | "flashcards">("whiteboard");

  // Focus Mode Toggle (dims UI and collapses side panels)
  const [focusMode, setFocusMode] = useState(false);

  // Sound cue mute toggle
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Members list (interactive activity status change)
  const [members, setMembers] = useState<User[]>(currentRoom.members);

  // ================= POMODORO TIMER STATE =================
  const [timerMode, setTimerMode] = useState<"focus" | "shortBreak" | "longBreak">("focus");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerRunning(false);
      toast({
        title: timerMode === "focus" ? "Focus Sprint Complete! ☕" : "Break Over! Time to Focus 🚀",
        description: timerMode === "focus" ? "Take a 5-minute breather." : "Syncing 25-minute Pomodoro.",
        type: "info",
      });
    }
    return () => clearInterval(timer);
  }, [timerRunning, timeLeft, timerMode, toast]);

  const switchMode = (mode: "focus" | "shortBreak" | "longBreak") => {
    setTimerMode(mode);
    setTimerRunning(false);
    if (mode === "focus") setTimeLeft(25 * 60);
    if (mode === "shortBreak") setTimeLeft(5 * 60);
    if (mode === "longBreak") setTimeLeft(15 * 60);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getProgress = () => {
    const total =
      timerMode === "focus" ? 25 * 60 : timerMode === "shortBreak" ? 5 * 60 : 15 * 60;
    return ((total - timeLeft) / total) * 100;
  };

  // ================= CHAT STATE =================
  const [chatMessages, setChatMessages] = useState([
    {
      id: "m1",
      sender: mockUsers[1].name,
      senderAvatar: mockUsers[1].avatar,
      text: "Starting section 4 proof derivation on whiteboard. Feel free to follow along!",
      time: "10:14 AM",
    },
    {
      id: "m2",
      sender: mockUsers[2].name,
      senderAvatar: mockUsers[2].avatar,
      text: "Locking into 25m Pomodoro sprint now 🚀",
      time: "10:18 AM",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: Math.random().toString(),
      sender: currentUser.name,
      senderAvatar: currentUser.avatar,
      text: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setChatMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
    setTimeout(() => {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // ================= WHITEBOARD STATE =================
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [activeTool, setActiveTool] = useState<"pen" | "eraser" | "rect" | "text">("pen");
  const [toolColor, setToolColor] = useState("#22D3EE");
  const [brushSize, setBrushSize] = useState(3);
  const [history, setHistory] = useState<ImageData[]>([]);

  // Setup whiteboard canvas dimensions
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set high-res canvas
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Initial mock drawings (formula / diagram)
    ctx.strokeStyle = "#7C5CFF";
    ctx.lineWidth = 2.5;
    ctx.strokeRect(40, 40, 140, 70);

    ctx.fillStyle = "#F1F5F9";
    ctx.font = "14px 'JetBrains Mono', monospace";
    ctx.fillText("Node: Raft Leader", 50, 75);

    ctx.strokeStyle = "#22D3EE";
    ctx.beginPath();
    ctx.moveTo(180, 75);
    ctx.lineTo(260, 75);
    ctx.stroke();

    ctx.strokeRect(260, 40, 140, 70);
    ctx.fillText("Node: Follower A", 270, 75);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Save history snapshot for undo
    setHistory((prev) => [...prev, ctx.getImageData(0, 0, canvas.width, canvas.height)]);

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (activeTool === "pen") {
      ctx.strokeStyle = toolColor;
      ctx.lineWidth = brushSize;
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (activeTool === "eraser") {
      ctx.strokeStyle = "#0B0C18"; // match background
      ctx.lineWidth = brushSize * 4;
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleUndo = () => {
    const canvas = canvasRef.current;
    if (!canvas || history.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const last = history[history.length - 1];
    ctx.putImageData(last, 0, 0);
    setHistory((prev) => prev.slice(0, prev.length - 1));
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // ================= ROOM NOTES MOCK STATE =================
  const [roomNotes, setRoomNotes] = useState(
    `# Distributed Systems & Consensus Architecture\n\n### 1. The Raft Consensus Protocol\n- **Roles:** Leader, Follower, Candidate.\n- **Election Safety:** At most one leader can be elected in a given term.\n- **Log Matching:** If two logs contain an entry with the same index and term, the logs are identical up to that entry.\n\n### 2. Quorum Rules\nQuorum requires: \`Q = floor(N / 2) + 1\`\nFor a cluster of 5 nodes, minimum quorum is 3 nodes alive and responding.\n\n### 3. Action Items for Session:\n- [x] Prove state machine safety invariant\n- [ ] Trace split-vote edge scenario with randomized election timeouts (150ms - 300ms)\n- [ ] Review joint consensus cluster membership changes`
  );

  const copyRoomCode = () => {
    navigator.clipboard?.writeText(currentRoom.code);
    toast({
      title: "Room Code Copied!",
      description: `Share ${currentRoom.code} with your study group.`,
      type: "success",
    });
  };

  return (
    <div
      className={`min-h-screen bg-[#0A0B14] text-slate-100 flex flex-col transition-all duration-500 ${
        focusMode ? "bg-[#06070D]" : ""
      }`}
    >
      {/* ================= ROOM TOP BAR ================= */}
      <header
        className={`h-16 px-4 md:px-6 border-b border-white/10 flex items-center justify-between shrink-0 backdrop-blur-xl z-20 ${
          focusMode ? "bg-[#06070D]/90 border-white/5" : "bg-[#0C0D1C]/80"
        }`}
      >
        <div className="flex items-center gap-3">
          <Link href="/rooms">
            <Button variant="ghost" size="sm" className="p-2 -ml-2 text-slate-400 hover:text-white">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </Link>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-heading font-bold text-white tracking-tight truncate max-w-xs sm:max-w-md">
                {currentRoom.name}
              </h1>
              <Badge variant="cyan" className="hidden sm:inline-flex text-[10px]">
                {currentRoom.subject}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {members.length} peers live
              </span>
              <span>•</span>
              <span className="font-mono">Code: {currentRoom.code}</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {/* Audio toggle */}
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              toast({
                title: soundEnabled ? "Chimes Muted" : "Chimes Enabled",
                description: soundEnabled ? "Timer chimes are now silent." : "Sound cues active on Pomodoro finish.",
                type: "info",
              });
            }}
            className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            title={soundEnabled ? "Mute chimes" : "Enable chimes"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Focus Mode button */}
          <Button
            onClick={() => setFocusMode(!focusMode)}
            variant={focusMode ? "primary" : "secondary"}
            size="sm"
            className="gap-1.5 font-medium"
          >
            {focusMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">
              {focusMode ? "Exit Focus Mode" : "Focus Mode"}
            </span>
          </Button>

          {/* Leave room */}
          <Link href="/rooms">
            <Button variant="danger" size="sm">
              Leave
            </Button>
          </Link>
        </div>
      </header>

      {/* ================= THREE-PANEL ROOM LAYOUT ================= */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* ================= LEFT PANEL: MEMBERS LIST ================= */}
        <aside
          className={`transition-all duration-300 border-r border-white/10 bg-[#0B0C1A]/60 backdrop-blur-xl flex flex-col justify-between shrink-0 overflow-y-auto ${
            focusMode ? "w-0 p-0 border-none opacity-0 pointer-events-none" : "w-64 p-4 hidden md:flex"
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                Study Table ({members.length})
              </span>
              <button
                onClick={copyRoomCode}
                className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono"
                title="Copy room invite link"
              >
                <span>Invite</span>
                <Copy className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-3">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Avatar
                      src={member.avatar}
                      alt={member.name}
                      initials={member.initials}
                      size="sm"
                      status={member.status}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-white truncate">
                        {member.name}
                        {member.id === currentUser.id && (
                          <span className="text-[10px] text-slate-400 font-normal ml-1">
                            (You)
                          </span>
                        )}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {member.status === "Focusing" ? (
                          <span className="text-emerald-400">● Focusing</span>
                        ) : member.status === "On break" ? (
                          <span className="text-amber-400">☕ On break</span>
                        ) : (
                          <span className="text-slate-500">○ Away</span>
                        )}
                      </p>
                    </div>
                  </div>

                  {member.currentTask && (
                    <p className="text-[10px] text-slate-400 bg-black/30 p-1.5 rounded-lg mt-2 truncate">
                      🎯 {member.currentTask}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick invite chip */}
          <div className="mt-4 p-3 rounded-xl bg-gradient-to-br from-violet-900/20 to-cyan-900/20 border border-white/10">
            <p className="text-xs font-semibold text-white mb-1">Invite Study Group</p>
            <p className="text-[10px] text-slate-400 mb-2">Anyone with code can join instantly.</p>
            <button
              onClick={copyRoomCode}
              className="w-full py-1.5 px-3 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-cyan-300 font-mono flex items-center justify-center gap-1.5 transition-colors"
            >
              <Copy className="w-3 h-3" />
              <span>{currentRoom.code}</span>
            </button>
          </div>
        </aside>

        {/* ================= CENTER WORKSPACE ================= */}
        <main className="flex-1 flex flex-col min-w-0 bg-[#090A14] overflow-hidden">
          {/* Workspace Tabs Header */}
          <div className="h-12 px-4 border-b border-white/10 bg-[#0C0D1B]/40 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setWorkspaceTab("whiteboard")}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  workspaceTab === "whiteboard"
                    ? "bg-white/10 text-white border border-white/10 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <PenTool className="w-3.5 h-3.5 text-cyan-400" />
                <span>Whiteboard</span>
              </button>

              <button
                onClick={() => setWorkspaceTab("notes")}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  workspaceTab === "notes"
                    ? "bg-white/10 text-white border border-white/10 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-violet-400" />
                <span>Room Notes</span>
              </button>

              <button
                onClick={() => setWorkspaceTab("flashcards")}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  workspaceTab === "flashcards"
                    ? "bg-white/10 text-white border border-white/10 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>Room Decks</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Canvas Sync: 16ms</span>
            </div>
          </div>

          {/* TAB 1: WHITEBOARD */}
          {workspaceTab === "whiteboard" && (
            <div className="flex-1 relative flex flex-col overflow-hidden bg-[#070810]">
              {/* Floating Whiteboard Toolbar */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#111226]/90 border border-white/15 shadow-2xl backdrop-blur-xl">
                <button
                  onClick={() => setActiveTool("pen")}
                  className={`p-2 rounded-xl transition-colors ${
                    activeTool === "pen"
                      ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                  title="Pen Tool"
                >
                  <PenTool className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveTool("eraser")}
                  className={`p-2 rounded-xl transition-colors ${
                    activeTool === "eraser"
                      ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                  title="Eraser"
                >
                  <Eraser className="w-4 h-4" />
                </button>

                {/* Color choices */}
                <div className="h-5 w-[1px] bg-white/10 mx-1" />
                {["#22D3EE", "#7C5CFF", "#34D399", "#FBBF24", "#FFFFFF"].map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setToolColor(c);
                      setActiveTool("pen");
                    }}
                    style={{ backgroundColor: c }}
                    className={`w-5 h-5 rounded-full transition-transform ${
                      toolColor === c ? "ring-2 ring-white scale-110" : "opacity-80 hover:opacity-100"
                    }`}
                  />
                ))}

                {/* Brush size */}
                <div className="h-5 w-[1px] bg-white/10 mx-1" />
                <button
                  onClick={() => setBrushSize(brushSize === 2 ? 4 : brushSize === 4 ? 8 : 2)}
                  className="px-2 py-1 text-xs font-mono text-slate-300 hover:bg-white/5 rounded-lg"
                  title="Toggle Brush Size"
                >
                  {brushSize}px
                </button>

                {/* Undo & Clear */}
                <div className="h-5 w-[1px] bg-white/10 mx-1" />
                <button
                  onClick={handleUndo}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                  title="Undo"
                >
                  <Undo2 className="w-4 h-4" />
                </button>
                <button
                  onClick={clearCanvas}
                  className="px-2.5 py-1 text-xs text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors font-medium"
                >
                  Clear
                </button>
              </div>

              {/* Working HTML5 Drawing Canvas */}
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                className="w-full h-full cursor-crosshair touch-none"
              />
            </div>
          )}

          {/* TAB 2: RICH NOTES */}
          {workspaceTab === "notes" && (
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="max-w-3xl mx-auto space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-mono text-cyan-400">
                    Collaborative Markdown Notebook
                  </span>
                  <Badge variant="emerald">Live Autocommit</Badge>
                </div>
                <textarea
                  value={roomNotes}
                  onChange={(e) => setRoomNotes(e.target.value)}
                  rows={20}
                  className="w-full p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-slate-200 font-mono text-sm leading-relaxed focus:outline-none focus:border-cyan-400/80 resize-none"
                />
              </div>
            </div>
          )}

          {/* TAB 3: FLASHCARDS FOR THIS ROOM */}
          {workspaceTab === "flashcards" && (
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-heading font-bold text-white">
                      Decks Linked to {currentRoom.name}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Spaced repetition decks designated for this study table
                    </p>
                  </div>
                  <Link href="/flashcards">
                    <Button variant="primary" size="sm">
                      <Sparkles className="w-3.5 h-3.5 mr-1" />
                      <span>Deck Library</span>
                    </Button>
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {mockDecks.slice(0, 2).map((d) => (
                    <Card key={d.id} className="glass-panel p-5 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-cyan-300 uppercase">
                          {d.subject}
                        </span>
                        <h4 className="text-base font-heading font-semibold text-white mt-1 mb-2">
                          {d.title}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-2 mb-4">
                          {d.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-white/5">
                        <span className="text-xs text-slate-400 font-mono">
                          {d.cardCount} cards • {d.masteryPercentage}% mastery
                        </span>
                        <Link href={`/flashcards/${d.id}`}>
                          <Button variant="secondary" size="sm">
                            Study Deck
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>

        {/* ================= RIGHT PANEL: POMODORO & MOCK CHAT ================= */}
        <aside
          className={`transition-all duration-300 border-l border-white/10 bg-[#0B0C1A]/60 backdrop-blur-xl flex flex-col justify-between shrink-0 overflow-y-auto ${
            focusMode ? "w-0 p-0 border-none opacity-0 pointer-events-none" : "w-80 p-5 flex"
          }`}
        >
          {/* POMODORO TIMER WIDGET */}
          <div className="flex flex-col items-center text-center pb-5 border-b border-white/10">
            {/* Mode selection buttons */}
            <div className="inline-flex items-center p-1 rounded-xl bg-white/5 border border-white/10 mb-5">
              <button
                onClick={() => switchMode("focus")}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  timerMode === "focus"
                    ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Focus (25m)
              </button>
              <button
                onClick={() => switchMode("shortBreak")}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  timerMode === "shortBreak"
                    ? "bg-white/15 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Short (5m)
              </button>
              <button
                onClick={() => switchMode("longBreak")}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  timerMode === "longBreak"
                    ? "bg-white/15 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Long (15m)
              </button>
            </div>

            {/* Circular Progress Ring with JetBrains Mono Digits */}
            <ProgressRing
              progress={getProgress()}
              size={150}
              strokeWidth={7}
              className="my-1"
            >
              <div className="flex flex-col items-center">
                <span className="text-3xl font-mono-numbers font-bold text-white tracking-wider">
                  {formatTimer(timeLeft)}
                </span>
                <span className="text-[10px] uppercase font-mono text-cyan-300 tracking-wider mt-0.5">
                  {timerRunning ? "In Orbit" : "Paused"}
                </span>
              </div>
            </ProgressRing>

            {/* Controls */}
            <div className="flex items-center gap-3 mt-5">
              <Button
                onClick={() => setTimerRunning(!timerRunning)}
                variant="primary"
                size="md"
                className="shadow-violet-500/25 px-5"
              >
                {timerRunning ? (
                  <>
                    <Pause className="w-4 h-4 mr-1.5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-1.5 fill-white" />
                    <span>Start Sprint</span>
                  </>
                )}
              </Button>
              <Button
                onClick={() => switchMode(timerMode)}
                variant="secondary"
                size="md"
                title="Reset timer"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* ROOM CHAT */}
          <div className="flex-1 flex flex-col justify-between pt-4 min-h-[240px]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Silent Room Chat
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">Synced</span>
            </div>

            {/* Message list */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-56">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="text-xs">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="font-semibold text-white">{msg.sender}</span>
                    <span className="text-[10px] text-slate-500">{msg.time}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5 text-slate-300 leading-relaxed">
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatBottomRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="mt-3 relative">
              <input
                type="text"
                placeholder="Send a quiet note..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="w-full pl-3 pr-10 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/80 transition-colors"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-cyan-400 hover:text-cyan-300 p-1"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function RoomDetailPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-[#0A0B14] flex items-center justify-center text-slate-400 font-mono text-xs">Entering Orbital Room...</div>}>
      <RoomDetailContent />
    </React.Suspense>
  );
}
