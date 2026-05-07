import * as math from 'mathjs';

export interface DataPoint {
  x: number;
  y: number | null;
}

export function evaluateEquation(
  equation: string,
  xMin: number = -10,
  xMax: number = 10,
  steps: number = 200
): DataPoint[] {
  try {
    const node = math.parse(equation);
    const code = node.compile();
    
    const data: DataPoint[] = [];
    const stepSize = (xMax - xMin) / steps;

    for (let i = 0; i <= steps; i++) {
      const x = xMin + i * stepSize;
      let y: number | null = null;
      
      try {
        const result = code.evaluate({ x });
        y = typeof result === 'number' ? result : null;
        
        // Handle cases like log(-1) or sqrt(-1) if needed, mathjs might return complex numbers
        if (typeof result === 'object' && result.isComplex) {
          y = null;
        }

        // Limit Y range to avoid infinity issues in charts
        if (y !== null && (!isFinite(y) || Math.abs(y) > 1000000)) {
          y = null;
        }
      } catch (e) {
        y = null;
      }
      
      data.push({ x: Number(x.toFixed(4)), y: y !== null ? Number(y.toFixed(4)) : null });
    }
    
    return data;
  } catch (error) {
    console.error("MathJS Parse Error:", error);
    return [];
  }
}

export function formatEquation(equation: string): string {
  // Simple cleanup
  return equation.trim().replace(/^y\s*=\s*/, '');
}
