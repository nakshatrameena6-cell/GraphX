"use client";

import React from 'react';
import { GlassPanel } from '@/components/ui/CyberUI';
import { motion } from 'framer-motion';

interface Preset {
  name: string;
  eq: string;
  category: "Trigonometric" | "Algebraic" | "Calculus";
}

const presets: Preset[] = [
  { name: "Sine Wave", eq: "sin(x)", category: "Trigonometric" },
  { name: "Parabola", eq: "x^2", category: "Algebraic" },
  { name: "Tangent", eq: "tan(x)", category: "Trigonometric" },
  { name: "Logarithm", eq: "log(x)", category: "Algebraic" },
  { name: "Exponential", eq: "e^x", category: "Algebraic" },
  { name: "Cubic", eq: "x^3 - 4x", category: "Algebraic" },
  { name: "Sinc Function", eq: "sin(x)/x", category: "Calculus" },
  { name: "Absolute", eq: "abs(x)", category: "Algebraic" },
  { name: "Normal Distribution", eq: "exp(-x^2)", category: "Calculus" },
  { name: "Sigmoid", eq: "1 / (1 + exp(-x))", category: "Calculus" },
];

interface PresetGalleryProps {
  onSelect: (eq: string) => void;
}

export default function PresetGallery({ onSelect }: PresetGalleryProps) {
  return (
    <GlassPanel className="p-4 space-y-4">
      <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">Preset Equations</h3>
      <div className="space-y-4">
        {["Trigonometric", "Algebraic", "Calculus"].map((cat) => (
          <div key={cat}>
            <p className="text-[10px] text-cyber-purple font-mono mb-2 opacity-70">{cat.toUpperCase()}</p>
            <div className="grid grid-cols-2 gap-2">
              {presets.filter(p => p.category === cat).map((p) => (
                <button
                  key={p.name}
                  onClick={() => onSelect(p.eq)}
                  className="p-2 rounded-lg bg-white/5 border border-white/5 hover:border-cyber-yellow/30 hover:bg-cyber-yellow/5 text-left transition-all group"
                >
                  <p className="text-[10px] text-zinc-300 font-bold truncate group-hover:text-cyber-yellow">{p.name}</p>
                  <p className="text-[9px] text-zinc-500 font-mono truncate">{p.eq}</p>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}
