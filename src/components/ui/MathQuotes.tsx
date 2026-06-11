"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPanel } from "./CyberUI";
import { ChevronLeft, ChevronRight, Sparkles, Pause, Play } from "lucide-react";

interface Quote {
  text: string;
  author: string;
}

const mathQuotes: Quote[] = [
  {
    text: "Mathematics is the music of reason.",
    author: "James Joseph Sylvester",
  },
  {
    text: "Nature is written in mathematical language.",
    author: "Galileo Galilei",
  },
  {
    text: "Pure mathematics is the poetry of logical ideas.",
    author: "Albert Einstein",
  },
  {
    text: "God used beautiful mathematics in creating the world.",
    author: "Paul Dirac",
  },
  {
    text: "The only way to learn mathematics is to do mathematics.",
    author: "Paul Halmos",
  },
  {
    text: "Mathematics is the most beautiful and most powerful creation of the human spirit.",
    author: "Stefan Banach",
  },
  {
    text: "In mathematics, the art of proposing a question must be held of higher value than solving it.",
    author: "Georg Cantor",
  },
  {
    text: "Mathematics reveals its secrets only to those who approach it with pure love.",
    author: "Archimedes",
  },
];

export default function MathQuotes() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isPlaying, setIsPlaying] = useState(true);

  const nextQuote = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mathQuotes.length);
  }, []);

  const prevQuote = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + mathQuotes.length) % mathQuotes.length);
  }, []);

  const randomQuote = () => {
    setDirection(Math.random() > 0.5 ? 1 : -1);
    let newIndex = currentIndex;
    while (newIndex === currentIndex) {
      newIndex = Math.floor(Math.random() * mathQuotes.length);
    }
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(nextQuote, 7000);
    return () => clearInterval(interval);
  }, [isPlaying, nextQuote]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
    }),
  };

  return (
    <section className="relative max-w-4xl mx-auto px-6 py-8 my-6 z-10">
      <div className="text-center mb-4">
        <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyber-purple/80 flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyber-purple animate-ping" />
          Neural Mathematical Musings
        </h2>
      </div>

      <GlassPanel 
        variant="purple" 
        className="relative overflow-hidden p-8 md:p-12 border border-cyber-purple/20 hover:border-cyber-purple/40 transition-colors duration-500 shadow-[0_0_30px_rgba(147,51,234,0.05)] hover:shadow-[0_0_40px_rgba(147,51,234,0.1)] group"
      >
        {/* Large stylized quote mark in background */}
        <span className="absolute top-2 left-6 text-8xl font-serif text-cyber-purple/10 pointer-events-none select-none select-none">
          “
        </span>
        <span className="absolute bottom-2 right-6 text-8xl font-serif text-cyber-purple/10 pointer-events-none select-none">
          ”
        </span>

        {/* Ambient background glow orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-cyber-purple/5 blur-[60px] pointer-events-none rounded-full group-hover:bg-cyber-purple/8 transition-colors duration-500" />

        <div className="min-h-[140px] flex flex-col justify-center items-center relative z-10">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="text-center space-y-6 max-w-2xl"
            >
              <p className="text-xl md:text-2xl font-mono text-zinc-100 leading-relaxed font-medium tracking-wide">
                "{mathQuotes[currentIndex].text}"
              </p>
              
              <div className="flex items-center justify-center gap-3">
                <span className="h-[1px] w-8 bg-cyber-yellow/40" />
                <p className="text-xs md:text-sm font-mono tracking-widest text-cyber-yellow uppercase font-bold text-glow-yellow">
                  — {mathQuotes[currentIndex].author}
                </p>
                <span className="h-[1px] w-8 bg-cyber-yellow/40" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls Overlay */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5 relative z-10">
          <div className="flex gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 text-zinc-500 hover:text-white rounded-lg transition-colors border border-transparent hover:border-white/5 hover:bg-white/5 active:scale-95"
              title={isPlaying ? "Pause auto-rotation" : "Resume auto-rotation"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={randomQuote}
              className="p-2 text-zinc-500 hover:text-cyber-yellow rounded-lg transition-colors border border-transparent hover:border-cyber-yellow/10 hover:bg-cyber-yellow/5 active:scale-95"
              title="Surprise me with a random quote"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-zinc-500">
              {currentIndex + 1} / {mathQuotes.length}
            </span>
            <div className="flex gap-1.5">
              <button
                onClick={prevQuote}
                className="p-2 text-zinc-400 hover:text-white rounded-lg transition-all duration-200 border border-white/5 hover:border-white/10 hover:bg-white/5 active:scale-90"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextQuote}
                className="p-2 text-zinc-400 hover:text-white rounded-lg transition-all duration-200 border border-white/5 hover:border-white/10 hover:bg-white/5 active:scale-90"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Progress Bar (Fills up when auto-playing) */}
        {isPlaying && (
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
            <motion.div
              key={currentIndex}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 7, ease: "linear" }}
              className="h-full bg-cyber-purple shadow-[0_0_8px_rgba(147,51,234,0.8)]"
            />
          </div>
        )}
      </GlassPanel>
    </section>
  );
}
