"use client";

import React, { useEffect, useState } from 'react';
import { GlassPanel } from '@/components/ui/CyberUI';
import 'katex/dist/katex.min.css';
import KaTeX from '@/components/ui/KaTeX';
import * as math from 'mathjs';

interface MathSolverProps {
  equation: string;
}

export default function MathSolver({ equation }: MathSolverProps) {
  const [latex, setLatex] = useState("");
  const [derivative, setDerivative] = useState("");

  useEffect(() => {
    try {
      const node = math.parse(equation);
      setLatex(node.toTex());
      
      try {
        const d = math.derivative(equation, 'x');
        setDerivative(d.toTex());
      } catch (e) {
        setDerivative("");
      }
    } catch (e) {
      setLatex("");
      setDerivative("");
    }
  }, [equation]);

  if (!latex) return null;

  return (
    <GlassPanel variant="yellow" className="h-full">
      <h3 className="text-cyber-yellow font-bold uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-cyber-yellow rounded-full animate-pulse" />
        Mathematical Analysis
      </h3>
      
      <div className="space-y-6">
        <div>
          <p className="text-zinc-500 text-xs uppercase mb-2 font-mono">Rendered Function</p>
          <div className="bg-white/5 p-4 rounded-xl flex justify-center items-center overflow-x-auto min-h-[60px]">
             <div className="text-xl">
               <KaTeX math={`y = ${latex}`} block />
             </div>
          </div>
        </div>

        {derivative && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <p className="text-zinc-500 text-xs uppercase mb-2 font-mono">First Derivative (dy/dx)</p>
            <div className="bg-cyber-purple/5 p-4 rounded-xl border border-cyber-purple/10 flex justify-center items-center overflow-x-auto min-h-[60px]">
               <div className="text-lg">
                 <KaTeX math={`\\frac{dy}{dx} = ${derivative}`} block />
               </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-zinc-900/50 border border-white/5">
            <p className="text-zinc-500 text-[10px] uppercase font-mono">Type</p>
            <p className="text-white text-sm font-mono truncate">
              {equation.includes('sin') || equation.includes('cos') ? 'Trigonometric' : 'Algebraic'}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-zinc-900/50 border border-white/5">
            <p className="text-zinc-500 text-[10px] uppercase font-mono">Domain</p>
            <p className="text-white text-sm font-mono">(-∞, ∞)</p>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}
