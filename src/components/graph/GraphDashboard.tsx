import React, { useState, useMemo, useRef } from 'react';
import { GlassPanel, NeonButton } from '@/components/ui/CyberUI';
import EquationInput from '@/components/math/EquationInput';
import GraphPanel from '@/components/graph/GraphPanel';
import MathSolver from '@/components/math/MathSolver';
import PresetGallery from '@/components/math/PresetGallery';
import { evaluateEquation } from '@/lib/math-utils';
import { Settings, Maximize2, Download, RefreshCw, Trash2, Github, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toPng } from 'html-to-image';

export default function GraphDashboard() {
  const [equation, setEquation] = useState("sin(x)");
  const [color, setColor] = useState("#fbbf24");
  const [showGrid, setShowGrid] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const graphRef = useRef<HTMLDivElement>(null);

  const graphData = useMemo(() => {
    return evaluateEquation(equation);
  }, [equation]);

  const handleExport = async () => {
    if (graphRef.current === null) return;
    
    try {
      const dataUrl = await toPng(graphRef.current, { cacheBust: true, backgroundColor: '#09090b' });
      const link = document.createElement('a');
      link.download = `graphx-${equation.replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed', err);
    }
  };

  const handleReset = () => {
    setEquation("sin(x)");
    setColor("#fbbf24");
    setShowGrid(true);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Input and Analysis */}
        <div className="lg:col-span-4 space-y-6">
          <section className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
              <Settings className="w-3 h-3" />
              Command Center
            </h2>
            <EquationInput onEquationChange={setEquation} initialValue={equation} />
          </section>

          <MathSolver equation={equation} />

          <PresetGallery onSelect={setEquation} />
          
          <GlassPanel className="p-4 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">Visualization Config</h3>
            <div className="flex flex-wrap gap-3">
               {[ "#fbbf24", "#9333ea", "#3b82f6", "#ef4444", "#10b981" ].map((c) => (
                 <button
                   key={c}
                   onClick={() => setColor(c)}
                   className={`w-8 h-8 rounded-full border-2 transition-transform active:scale-90 ${color === c ? 'border-white scale-110' : 'border-transparent opacity-50'}`}
                   style={{ backgroundColor: c }}
                 />
               ))}
            </div>
            <div className="flex items-center justify-between py-2 border-t border-white/5">
              <span className="text-sm text-zinc-400 font-mono">Grid Display</span>
              <button 
                onClick={() => setShowGrid(!showGrid)}
                className={`w-10 h-5 rounded-full transition-colors relative ${showGrid ? 'bg-cyber-purple' : 'bg-zinc-800'}`}
              >
                <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${showGrid ? 'translate-x-5' : ''}`} />
              </button>
            </div>
          </GlassPanel>
        </div>

        {/* Right Column: Interactive Graph */}
        <div className={`lg:col-span-8 space-y-6 ${isFullscreen ? 'fixed inset-0 z-[100] bg-cyber-bg p-6' : ''}`}>
          <GlassPanel className={`relative p-0 overflow-hidden flex flex-col ${isFullscreen ? 'h-full' : 'h-[600px]'}`} ref={graphRef}>
            {/* Graph Header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-zinc-900/50">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-zinc-400">SYS_STATUS: OPTIMAL</span>
                </div>
                <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />
                <span className="text-xs font-mono text-cyber-yellow hidden sm:block truncate max-w-[200px]">y = {equation}</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handleReset} className="p-2 hover:bg-white/5 rounded-lg text-zinc-500 transition-colors" title="Reset">
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button onClick={handleExport} className="p-2 hover:bg-white/5 rounded-lg text-zinc-500 transition-colors" title="Export PNG">
                  <Download className="w-4 h-4" />
                </button>
                <button onClick={toggleFullscreen} className="p-2 hover:bg-white/5 rounded-lg text-zinc-500 transition-colors" title="Toggle Fullscreen">
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Main Graph Area */}
            <div className="flex-1 p-4 relative">
              <GraphPanel data={graphData} color={color} showGrid={showGrid} />
              
              {/* Overlay HUD elements */}
              <div className="absolute bottom-8 right-8 pointer-events-none opacity-50">
                <div className="text-[8px] font-mono text-cyber-purple text-right space-y-1">
                  <p>COORD_SYSTEM: CARTESIAN_2D</p>
                  <p>RESOLUTION: 200_PTS</p>
                  <p>TIMESTAMP: {new Date().toLocaleTimeString()}</p>
                </div>
              </div>

              {/* Decorative Scanlines */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />
            </div>
          </GlassPanel>

          {!isFullscreen && (
            <div className="flex gap-4">
               <GlassPanel className="flex-1 py-4 flex items-center justify-center gap-4 hover:bg-white/5 cursor-pointer transition-colors border-dashed group">
                  <Share2 className="w-4 h-4 text-zinc-500 group-hover:text-cyber-yellow" />
                  <span className="text-xs font-mono text-zinc-400 group-hover:text-white">Share Simulation</span>
               </GlassPanel>
               <GlassPanel className="flex-1 py-4 flex items-center justify-center gap-4 hover:bg-white/5 cursor-pointer transition-colors border-dashed group">
                  <Github className="w-4 h-4 text-zinc-500 group-hover:text-cyber-purple" />
                  <span className="text-xs font-mono text-zinc-400 group-hover:text-white">Source Protocol</span>
               </GlassPanel>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
