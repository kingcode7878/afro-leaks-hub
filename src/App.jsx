import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, TrendingUp, LayoutGrid, List, Flame, Heart, Zap } from 'lucide-react';
import { videoData } from './videoData';
import { VideoCard } from './components/VideoCard';

const tg = window.Telegram?.WebApp;

const tabs = [
  { id: 'Trends', icon: <TrendingUp size={16}/> },
  { id: 'Knacks', icon: <Zap size={16}/> },
  { id: 'Hotties', icon: <Flame size={16}/> },
  { id: 'Baddies', icon: <Heart size={16}/> }
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Trends');
  const [viewMode, setViewMode] = useState('category'); // 'dashboard' (3 cols) or 'category' (2 cols)

  useEffect(() => {
    if (tg) {
      tg.ready();
      tg.expand();
    }
    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (loading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center text-accent font-bold text-2xl animate-pulse">
        AFRO LEAKS
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pb-24 text-white font-sans">
      {/* Header */}
      <header className="p-4 flex justify-between items-center border-b border-zinc-800 sticky top-0 bg-black/80 backdrop-blur-md z-50">
        <h1 className="text-accent font-black tracking-tighter text-xl italic">AFRO LEAKS</h1>
        
        {/* View Toggle */}
        <div className="flex bg-zinc-900 rounded-lg p-1">
          <button 
            onClick={() => setViewMode('dashboard')}
            className={`p-1.5 rounded-md transition ${viewMode === 'dashboard' ? 'bg-zinc-700 text-white' : 'text-zinc-500'}`}
          >
            <LayoutGrid size={18} />
          </button>
          <button 
            onClick={() => setViewMode('category')}
            className={`p-1.5 rounded-md transition ${viewMode === 'category' ? 'bg-zinc-700 text-white' : 'text-zinc-500'}`}
          >
            <List size={18} />
          </button>
        </div>
      </header>

      {/* Tab Navigation with Sliding Red Indicator */}
      <nav className="flex justify-around border-b border-zinc-800 bg-black sticky top-[61px] z-40">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative py-4 px-2 flex items-center gap-2 text-xs font-bold transition-colors ${
              activeTab === tab.id ? 'text-white' : 'text-zinc-500'
            }`}
          >
            {tab.icon}
            {tab.id}
            {activeTab === tab.id && (
              <motion.div 
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent shadow-[0_0_10px_#ff3b30]"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
          </button>
        ))}
      </nav>

      {/* Video Content Grid */}
      <main className="p-2">
        <div className={
          viewMode === 'dashboard' 
            ? "grid grid-cols-3 gap-1" 
            : "grid grid-cols-2 gap-2"
        }>
          <AnimatePresence mode='popLayout'>
            {videoData
              .filter(v => v.category === activeTab)
              .map((video) => (
                <motion.div
                  key={video.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <VideoCard 
                    video={video} 
                    compact={viewMode === 'dashboard'} 
                  />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Fixed Bottom Navigation */}
      <footer className="fixed bottom-0 w-full border-t border-zinc-800 bg-black p-4 flex justify-around items-center z-50">
        <TrendingUp className={activeTab === 'Trends' ? 'text-accent' : 'text-zinc-500'} />
        <div className="w-12 h-12 bg-accent rounded-full -mt-10 border-4 border-black flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-accent/20 active:scale-90 transition-transform">
          +
        </div>
        <User className="text-zinc-500" />
      </footer>
    </div>
  );
}