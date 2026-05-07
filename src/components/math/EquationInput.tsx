"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassPanel } from '@/components/ui/CyberUI';
import { Search, History, Sparkles } from 'lucide-react';

interface EquationInputProps {
  onEquationChange: (eq: string) => void;
  initialValue?: string;
}

const presets = [
  "sin(x)",
  "x^2",
  "tan(x)",
  "log(x)",
  "e^x",
  "x^3 - 4x",
  "sin(x) / x",
  "abs(x)",
];

export default function EquationInput({ onEquationChange, initialValue = "sin(x)" }: EquationInputProps) {
  const [value, setValue] = useState(initialValue);
  const [showPresets, setShowPresets] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      onEquationChange(value);
    }, 300);
    return () => clearTimeout(timer);
  }, [value, onEquationChange]);

  return (
    <div className="relative w-full">
      <GlassPanel variant="purple" className="relative p-2">
        <div className="flex items-center gap-3 px-4">
          <Search className="text-cyber-purple w-5 h-5" />
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setShowPresets(true)}
            onBlur={() => setTimeout(() => setShowPresets(false), 200)}
            placeholder="Enter equation (e.g., y = sin(x))"
            className="w-full bg-transparent border-none outline-none text-white font-mono text-lg py-2 placeholder:text-zinc-600"
          />
          <button 
            onClick={() => setValue(presets[Math.floor(Math.random() * presets.length)])}
            className="text-cyber-yellow hover:text-white transition-colors"
            title="Random Equation"
          >
            <Sparkles className="w-5 h-5" />
          </button>
        </div>
        
        {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-2xl border border-cyber-purple/50 pointer-events-none shadow-[0_0_15px_rgba(147,51,234,0.2)]" />
      </GlassPanel>

      <AnimatePresence>
        {showPresets && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-2 z-50"
          >
            <GlassPanel className="p-2 grid grid-cols-2 md:grid-cols-4 gap-2">
              {presets.map((p) => (
                <button
                  key={p}
                  onClick={() => setValue(p)}
                  className="px-3 py-2 rounded-lg bg-white/5 hover:bg-cyber-purple/20 text-zinc-400 hover:text-white text-xs font-mono transition-colors text-left truncate"
                >
                  {p}
                </button>
              ))}
            </GlassPanel>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
