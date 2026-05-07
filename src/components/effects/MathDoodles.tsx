"use client";

import { motion } from "framer-motion";

const symbols = [
  "∑", "∫", "π", "∞", "√", "∂", "∆", "λ", "Ω", "θ", "φ", "ψ", "ξ", "ζ", "η", "μ", "ν"
];

const formulas = [
  "e^{iπ} + 1 = 0",
  "f(x) = sin(x)",
  "∇ × E = -∂B/∂t",
  "∫ x dx = x²/2",
  "a² + b² = c²",
  "E = mc²",
];

export default function MathDoodles() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-5 overflow-hidden">
      {/* Floating Symbols */}
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={`symbol-${i}`}
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: 0,
            scale: 0.5
          }}
          animate={{
            y: [null, (Math.random() - 0.5) * 200 + "px"],
            opacity: [0, 0.4, 0],
            scale: [0.5, 1, 0.5],
            rotate: [0, 360],
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10,
          }}
          className="absolute text-cyber-purple/30 font-mono text-xl md:text-3xl"
        >
          {symbols[Math.floor(Math.random() * symbols.length)]}
        </motion.div>
      ))}

      {/* Floating Formulas */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`formula-${i}`}
          initial={{ 
            x: Math.random() * 80 + 10 + "%", 
            y: Math.random() * 80 + 10 + "%",
            opacity: 0
          }}
          animate={{
            x: [null, (Math.random() - 0.5) * 100 + "px"],
            y: [null, (Math.random() - 0.5) * 100 + "px"],
            opacity: [0, 0.2, 0],
          }}
          transition={{
            duration: 15 + Math.random() * 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
          className="absolute text-cyber-yellow/20 font-mono text-sm md:text-base whitespace-nowrap"
        >
          {formulas[Math.floor(Math.random() * formulas.length)]}
        </motion.div>
      ))}
    </div>
  );
}
