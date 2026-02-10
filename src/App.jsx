import React, { useState, useEffect } from 'react';
import { Play, User, Search, TrendingUp } from 'lucide-react';

const tg = window.Telegram?.WebApp;

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tg) {
      tg.ready();
      tg.expand(); // Make app full screen in Telegram
    }
    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (loading) return <div className="h-screen bg-black flex items-center justify-center text-accent font-bold text-2xl animate-pulse">AFRO LEAKS</div>;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="p-4 flex justify-between items-center border-b border-zinc-800 sticky top-0 bg-black/80 backdrop-blur-md z-50">
        <h1 className="text-accent font-black tracking-tighter text-xl">AFRO LEAKS</h1>
        <div className="flex gap-4 text-zinc-400">
          <Search size={22} />
          <User size={22} />
        </div>
      </header>

      {/* Video Grid */}
      <main className="grid grid-cols-2 gap-2 p-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="aspect-[9/16] bg-card rounded-xl relative overflow-hidden group border border-zinc-800">
             <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <Play className="text-accent fill-accent" size={32} />
             </div>
             <div className="absolute bottom-2 left-2 right-2 text-[10px] font-bold">
                Exclusive Leak #{i} <br/>
                <span className="text-zinc-500 font-normal">14.2K views</span>
             </div>
          </div>
        ))}
      </main>

      {/* Bottom Nav */}
      <footer className="fixed bottom-0 w-full border-t border-zinc-800 bg-black p-4 flex justify-around">
        <TrendingUp className="text-accent" />
        <div className="w-10 h-10 bg-accent rounded-full -mt-8 border-4 border-black flex items-center justify-center text-white font-bold">+</div>
        <Search className="text-zinc-500" />
      </footer>
    </div>
  );
}