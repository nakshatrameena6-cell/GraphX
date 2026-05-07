import Hero from "@/components/layout/Hero";
import GraphDashboard from "@/components/graph/GraphDashboard";
import GridBackground from "@/components/effects/GridBackground";
import MathDoodles from "@/components/effects/MathDoodles";

const quotes = [
  "Mathematics is the music of reason.",
  "Nature is written in mathematical language.",
  "Pure mathematics is the poetry of logical ideas.",
  "God used beautiful mathematics in creating the world.",
  "The only way to learn mathematics is to do mathematics.",
];

export default function Home() {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <main className="min-h-screen selection:bg-cyber-yellow selection:text-black">
      {/* Background Effects */}
      <GridBackground />
      <MathDoodles />

      {/* Hero Section */}
      <Hero />

      {/* Dashboard Section */}
      <GraphDashboard />

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-cyber-yellow rounded flex items-center justify-center text-black font-bold text-xs">G</div>
            <span className="font-bold tracking-tighter text-lg">Graph<span className="text-cyber-yellow">X</span></span>
          </div>
          <p className="text-zinc-500 text-sm font-mono tracking-widest text-center">
            "{randomQuote}"
          </p>
          <div className="flex gap-6 text-zinc-500 text-xs font-mono">
            <a href="#" className="hover:text-cyber-yellow transition-colors">GITHUB</a>
            <a href="#" className="hover:text-cyber-purple transition-colors">DOCS</a>
            <a href="#" className="hover:text-white transition-colors">V2.0.4</a>
          </div>
        </div>
      </footer>
    </main>
  );
}