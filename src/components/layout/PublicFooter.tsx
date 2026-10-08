import React from "react";
import Link from "next/link";
import { Globe, MessageSquare, Send, Heart } from "lucide-react";

export default function PublicFooter() {
  return (
    <footer className="relative border-t border-white/10 bg-[#07080F] z-10 pt-16 pb-12 overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand info */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-cyan-500 p-[1px]">
                <div className="w-full h-full bg-[#0A0B14] rounded-[7px] flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                </div>
              </div>
              <span className="text-xl font-heading font-bold text-white tracking-tight">Orbit</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm mb-6 leading-relaxed">
              Synchronous deep work & collaborative study universe for high-performing students, researchers, and creators.
            </p>
            <div className="flex items-center gap-3 text-slate-400">
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:text-white hover:bg-white/10 transition-colors" aria-label="Web">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:text-cyan-400 hover:bg-white/10 transition-colors" aria-label="Community">
                <MessageSquare className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:text-violet-400 hover:bg-white/10 transition-colors" aria-label="Broadcast">
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link href="/rooms" className="hover:text-white transition-colors">Study Rooms</Link></li>
              <li><Link href="/flashcards" className="hover:text-white transition-colors">AI Flashcards</Link></li>
              <li><Link href="/leaderboard" className="hover:text-white transition-colors">Leaderboard</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#how-it-works" className="hover:text-white transition-colors">Pomodoro Technique</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Spaced Repetition</a></li>
              <li><a href="#demo" className="hover:text-white transition-colors">Interactive Demo</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Student Stories</a></li>
            </ul>
          </div>

          {/* Links 3 */}
          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Orbit Technologies, Inc. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Designed for cosmic focus <span className="text-violet-400">✦</span> Deep Space Edition
          </p>
        </div>
      </div>
    </footer>
  );
}
