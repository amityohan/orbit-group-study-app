import React from "react";
import { cn } from "@/lib/utils";

// Card
export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] p-5 md:p-6 transition-all duration-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// Badge
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "violet" | "cyan" | "amber" | "emerald" | "rose";
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  className,
  children,
  ...props
}) => {
  const variantStyles = {
    default: "bg-white/10 text-slate-300 border-white/10",
    violet: "bg-violet-500/15 text-violet-300 border-violet-500/25",
    cyan: "bg-cyan-500/15 text-cyan-300 border-cyan-500/25",
    amber: "bg-amber-500/15 text-amber-300 border-amber-500/25",
    emerald: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
    rose: "bg-rose-500/15 text-rose-300 border-rose-500/25",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border tracking-wide",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

// Input
export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }
>(({ className, label, error, ...props }, ref) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && <label className="text-xs font-medium text-slate-300">{label}</label>}
      <input
        ref={ref}
        className={cn(
          "w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400/80 focus:ring-1 focus:ring-cyan-400/80 transition-colors duration-200",
          error && "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500",
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-rose-400">{error}</span>}
    </div>
  );
});
Input.displayName = "Input";

// Skeleton
export const Skeleton: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-white/[0.06] border border-white/[0.04]",
        className
      )}
      {...props}
    />
  );
};

