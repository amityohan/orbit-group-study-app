import React from "react";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  status?: "Focusing" | "On break" | "Away" | "Offline";
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "User avatar",
  initials = "U",
  size = "md",
  status,
  className,
}) => {
  const sizeClasses = {
    xs: "w-6 h-6 text-[10px]",
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-base",
    xl: "w-20 h-20 text-xl font-bold",
  };

  const statusColors = {
    Focusing: "bg-emerald-400 ring-[#0A0B14]",
    "On break": "bg-amber-400 ring-[#0A0B14]",
    Away: "bg-slate-400 ring-[#0A0B14]",
    Offline: "bg-slate-600 ring-[#0A0B14]",
  };

  return (
    <div className={cn("relative inline-block shrink-0", className)}>
      <div
        className={cn(
          "rounded-full overflow-hidden flex items-center justify-center font-medium border border-white/15 bg-gradient-to-br from-violet-600/40 to-cyan-600/40 text-white shadow-inner",
          sizeClasses[size]
        )}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            onError={(e) => {
              // fallback to initials on error
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>

      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full ring-2",
            statusColors[status],
            size === "xs" ? "w-1.5 h-1.5" : size === "sm" ? "w-2 h-2" : size === "lg" || size === "xl" ? "w-3.5 h-3.5" : "w-2.5 h-2.5"
          )}
        />
      )}
    </div>
  );
};

interface AvatarStackProps {
  users: Array<{
    name: string;
    avatar?: string;
    initials?: string;
  }>;
  max?: number;
  size?: "xs" | "sm" | "md";
  className?: string;
}

export const AvatarStack: React.FC<AvatarStackProps> = ({
  users,
  max = 4,
  size = "sm",
  className,
}) => {
  const visible = users.slice(0, max);
  const remaining = users.length - max;

  return (
    <div className={cn("flex items-center -space-x-2.5", className)}>
      {visible.map((u, i) => (
        <Avatar
          key={i}
          src={u.avatar}
          alt={u.name}
          initials={u.initials || u.name.slice(0, 2).toUpperCase()}
          size={size}
          className="ring-2 ring-[#0A0B14] hover:z-10 hover:scale-105 transition-transform"
        />
      ))}
      {remaining > 0 && (
        <div
          className={cn(
            "rounded-full flex items-center justify-center bg-white/10 text-white/90 font-medium border border-white/20 ring-2 ring-[#0A0B14]",
            size === "xs" ? "w-6 h-6 text-[10px]" : size === "sm" ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm"
          )}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
};

