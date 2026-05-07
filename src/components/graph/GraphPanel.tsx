"use client";

import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { DataPoint } from '@/lib/math-utils';

interface GraphPanelProps {
  data: DataPoint[];
  color?: string;
  showGrid?: boolean;
  showAxes?: boolean;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-900/90 border border-cyber-yellow/50 p-2 rounded-lg backdrop-blur-md shadow-[0_0_10px_rgba(251,191,36,0.3)]">
        <p className="text-cyber-yellow font-mono text-xs">x: {payload[0].payload.x}</p>
        <p className="text-cyber-purple font-mono text-xs">y: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function GraphPanel({ 
  data, 
  color = "#fbbf24", 
  showGrid = true,
  showAxes = true 
}: GraphPanelProps) {
  
  const yDomain = useMemo(() => {
    if (data.length === 0) return [-10, 10];
    const values = data.map(d => d.y).filter(v => v !== null) as number[];
    if (values.length === 0) return [-10, 10];
    const min = Math.min(...values);
    const max = Math.max(...values);
    const padding = Math.abs(max - min) * 0.1 || 1;
    return [min - padding, max + padding];
  }, [data]);

  return (
    <div className="w-full h-full min-h-[400px] relative">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          {showGrid && (
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="rgba(147, 51, 234, 0.1)" 
              vertical={true}
              horizontal={true}
            />
          )}
          
          {showAxes && (
            <>
              <XAxis 
                dataKey="x" 
                stroke="#6b7280" 
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                tickFormatter={(val) => Number.isInteger(val) ? val : ''}
              />
              <YAxis 
                stroke="#6b7280" 
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                domain={yDomain}
              />
            </>
          )}

          <ReferenceLine y={0} stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
          <ReferenceLine x={0} stroke="rgba(255,255,255,0.2)" strokeWidth={1} />

          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(251, 191, 36, 0.2)', strokeWidth: 1 }} />
          
          <Line
            type="monotone"
            dataKey="y"
            stroke={color}
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, fill: color, stroke: '#fff', strokeWidth: 2 }}
            animationDuration={1000}
            isAnimationActive={true}
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>
      
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyber-yellow/30" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyber-yellow/30" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyber-yellow/30" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyber-yellow/30" />
    </div>
  );
}
