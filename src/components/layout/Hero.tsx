"use client";

import { motion } from "framer-motion";
import { NeonButton } from "@/components/ui/CyberUI";
import { Zap, Activity, Cpu } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-16 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-purple/10 border border-cyber-purple/30 text-cyber-purple text-xs font-mono mb-6"
        >
          <Zap className="w-3 h-3 fill-current" />
          <span>v2.0 // NEURAL GRAPHING ENGINE ACTIVE</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-black mb-6 tracking-tighter"
        >
          <span className="text-white">GRAPH</span>
          <span className="text-cyber-yellow text-glow-yellow">X</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light"
        >
          Transform complex mathematical equations into interactive, high-fidelity visualizations. 
          The future of mathematical exploration starts here.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <NeonButton variant="yellow" size="lg">
            Initialize App
          </NeonButton>
          <NeonButton variant="purple" size="lg">
            Documentation
          </NeonButton>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-cyber-purple/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-cyber-yellow/5 blur-[100px] pointer-events-none" />
    </section>
  );
}
