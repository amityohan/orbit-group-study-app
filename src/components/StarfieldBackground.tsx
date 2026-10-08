"use client";

import React, { useEffect, useRef } from "react";

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener("resize", handleResize);

    interface Star {
      x: number;
      y: number;
      size: number;
      baseAlpha: number;
      alpha: number;
      speed: number;
      twinkleSpeed: number;
      twinkleOffset: number;
      hue: number;
    }

    let stars: Star[] = [];

    const initStars = () => {
      stars = [];
      const count = Math.floor((width * height) / 3800); // responsive star density
      for (let i = 0; i < count; i++) {
        const size = Math.random() < 0.85 ? Math.random() * 1.2 + 0.4 : Math.random() * 2.2 + 1.2;
        const baseAlpha = Math.random() * 0.6 + 0.15;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size,
          baseAlpha,
          alpha: baseAlpha,
          speed: Math.random() * 0.12 + 0.02, // slow drift upward/left
          twinkleSpeed: Math.random() * 0.03 + 0.008,
          twinkleOffset: Math.random() * Math.PI * 2,
          hue: Math.random() < 0.25 ? 260 : Math.random() < 0.5 ? 190 : 220, // subtle purple/cyan tints
        });
      }
    };

    initStars();

    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Render subtle cosmic nebula ambient glow spots
      const gradient = ctx.createRadialGradient(
        width * 0.8,
        height * 0.2,
        20,
        width * 0.8,
        height * 0.2,
        Math.max(width, height) * 0.5
      );
      gradient.addColorStop(0, "rgba(124, 92, 255, 0.05)");
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const gradient2 = ctx.createRadialGradient(
        width * 0.15,
        height * 0.85,
        20,
        width * 0.15,
        height * 0.85,
        Math.max(width, height) * 0.45
      );
      gradient2.addColorStop(0, "rgba(34, 211, 238, 0.035)");
      gradient2.addColorStop(1, "transparent");
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, width, height);

      // Draw each star
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.y -= s.speed;
        if (s.y < 0) {
          s.y = height;
          s.x = Math.random() * width;
        }

        const twinkle = Math.sin(time * s.twinkleSpeed * 50 + s.twinkleOffset);
        const currentAlpha = Math.max(0.08, Math.min(0.95, s.baseAlpha + twinkle * 0.35));

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 80%, 90%, ${currentAlpha})`;
        ctx.fill();

        // Extra subtle glow for bigger stars
        if (s.size > 1.8) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${s.hue}, 90%, 75%, ${currentAlpha * 0.2})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      aria-hidden="true"
    />
  );
}

