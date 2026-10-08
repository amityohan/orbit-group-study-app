"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Lock, Mail, Quote } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Primitives";
import { useToast } from "@/components/ui/Toast";

const quotes = [
  {
    text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Will Durant",
  },
  {
    text: "Deep work is the ability to focus without distraction on a cognitively demanding task.",
    author: "Cal Newport",
  },
  {
    text: "Somewhere, something incredible is waiting to be known.",
    author: "Carl Sagan",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const [quoteIndex] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Welcome back, Alex! 🚀",
        description: "Re-entering your deep study orbit.",
        type: "success",
      });
      router.push("/dashboard");
    }, 900);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Authenticated with Google",
        description: "Welcome to Orbit!",
        type: "success",
      });
      router.push("/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#0A0B14] flex items-stretch">
      {/* ================= LEFT SIDE: AUTH FORM ================= */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 sm:p-12 lg:p-16 z-10 relative">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-cyan-500 p-[1px]">
            <div className="w-full h-full bg-[#0A0B14] rounded-[7px] flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
            </div>
          </div>
          <span className="text-xl font-heading font-bold text-white tracking-tight">Orbit</span>
        </Link>

        {/* Center Form Container */}
        <div className="max-w-md w-full mx-auto my-auto py-10">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight mb-2">
              Welcome back to Orbit
            </h1>
            <p className="text-sm text-slate-400">
              Continue your study streak and rejoin your synchronous rooms.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                label="Email address"
                type="email"
                placeholder="alex.rivera@stanford.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-slate-300">Password</label>
                <a href="#" className="text-xs text-cyan-400 hover:underline">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none transition-colors duration-200 ${
                  errors.password
                    ? "border-rose-500/80 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                    : "border-white/10 focus:border-cyan-400/80 focus:ring-1 focus:ring-cyan-400/80"
                }`}
              />
              {errors.password && (
                <span className="text-xs text-rose-400 mt-1 block">{errors.password}</span>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full mt-2"
              isLoading={loading}
            >
              Sign In to Orbit
            </Button>
          </form>

          {/* Social Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <span className="relative px-3 text-xs bg-[#0A0B14] text-slate-500 uppercase tracking-wider">
              Or continue with
            </span>
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <p className="text-center text-xs text-slate-400 mt-6">
            Don't have an account yet?{" "}
            <Link href="/signup" className="text-cyan-400 hover:underline font-medium">
              Create an orbit free
            </Link>
          </p>
        </div>

        {/* Footer info */}
        <div className="text-xs text-slate-500 text-center">
          Protected by Orbit Security • TLS 1.3 End-to-End Encrypted
        </div>
      </div>

      {/* ================= RIGHT SIDE: SPACE ILLUSTRATION & QUOTE ================= */}
      <div className="hidden lg:flex w-1/2 relative bg-gradient-to-br from-[#12132D] via-[#0D0E22] to-[#0A0B14] p-16 flex-col justify-between border-l border-white/10 overflow-hidden">
        {/* Orbital rings illustration */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full border border-violet-500/20 animate-orbit" />
          <div className="w-[350px] h-[350px] rounded-full border border-cyan-400/20 animate-orbit-reverse" />
          <div className="w-[200px] h-[200px] rounded-full border border-white/10" />
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-400 shadow-[0_0_50px_#7C5CFF]" />
        </div>

        <div className="relative z-10 flex justify-end">
          <span className="text-xs font-mono text-cyan-300 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            Current Orbital Session: 12,410 active
          </span>
        </div>

        {/* Inspirational rotating quote */}
        <div className="relative z-10 max-w-md p-6 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10">
          <Quote className="w-6 h-6 text-cyan-400 mb-3" />
          <p className="text-base text-slate-200 font-medium leading-relaxed italic mb-4">
            "{quotes[quoteIndex].text}"
          </p>
          <p className="text-xs text-slate-400 font-mono">
            — {quotes[quoteIndex].author}
          </p>
        </div>
      </div>
    </div>
  );
}

