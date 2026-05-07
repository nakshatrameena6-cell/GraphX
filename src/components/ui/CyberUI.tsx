import { cn } from "@/lib/utils";
import React from "react";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "purple" | "yellow" | "default";
}

export const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ children, className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-zinc-900/40 border-white/10 shadow-xl backdrop-blur-md",
      purple: "bg-cyber-purple/5 border-cyber-purple/30 shadow-[0_0_20px_rgba(147,51,234,0.1)] backdrop-blur-lg",
      yellow: "bg-cyber-yellow/5 border-cyber-yellow/30 shadow-[0_0_20px_rgba(251,191,36,0.1)] backdrop-blur-lg",
    };

    return (
      <div 
        ref={ref}
        className={cn(
          "rounded-2xl border p-6 transition-all duration-300",
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassPanel.displayName = "GlassPanel";

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "purple" | "yellow";
  size?: "sm" | "md" | "lg";
}

export function NeonButton({ 
  children, 
  className, 
  variant = "purple",
  size = "md",
  ...props 
}: NeonButtonProps) {
  const variants = {
    purple: "border-cyber-purple text-cyber-purple hover:bg-cyber-purple hover:text-white shadow-[0_0_10px_rgba(147,51,234,0.3)] hover:shadow-[0_0_20px_rgba(147,51,234,0.6)]",
    yellow: "border-cyber-yellow text-cyber-yellow hover:bg-cyber-yellow hover:text-black shadow-[0_0_10px_rgba(251,191,36,0.3)] hover:shadow-[0_0_20px_rgba(251,191,36,0.6)]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg font-bold tracking-wider",
  };

  return (
    <button
      className={cn(
        "rounded-xl border-2 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed uppercase",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
