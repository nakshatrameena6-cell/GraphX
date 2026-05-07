"use client";

import React, { useEffect, useRef } from 'react';
import katex from 'katex';

interface KaTeXProps {
  math: string;
  block?: boolean;
}

export default function KaTeX({ math, block = false }: KaTeXProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      katex.render(math, containerRef.current, {
        throwOnError: false,
        displayMode: block,
      });
    }
  }, [math, block]);

  return <span ref={containerRef} />;
}
