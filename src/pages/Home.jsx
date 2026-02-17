import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Zap, Flame, Heart, LayoutGrid, List } from "lucide-react";
import { videoData } from '../videoData'; 
import { VideoCard } from '../components/VideoCard';

const tabs = [
  { id: 'Leaks', icon: <TrendingUp size={16}/> },
  { id: 'AllAccessFans', icon: <Zap size={16}/> },
  { id: 'BigoLive', icon: <Flame size={16}/> },
  { id: 'Baddies', icon: <Heart size={16}/> }
];

export default function Home({ category, setCategory, viewMode, setViewMode, onVideoSelect }) {
  return (
    <div className="relative z-0">
      <header className="p-4 flex justify-between items-center border-b border-zinc-800 sticky top-0 bg-black/80 backdrop-blur-md z-[60]">
        <h1 className="text-accent font-black tracking-tighter text-xl italic uppercase">Xclusive Premium</h1>
        <div className="flex bg-zinc-900 rounded-lg p-1 relative z-[70]">
          <button 
            onClick={() => setViewMode('dashboard')} 
            className={`p-1.5 rounded-md cursor-pointer transition-colors ${viewMode === 'dashboard' ? 'bg-zinc-700 text-white' : 'text-zinc-500'}`}
          >
            <LayoutGrid size={18} />
          </button>
          <button 
            onClick={() => setViewMode('category')} 
            className={`p-1.5 rounded-md cursor-pointer transition-colors ${viewMode === 'category' ? 'bg-zinc-700 text-white' : 'text-zinc-500'}`}
          >
            <List size={18} />
          </button>
        </div>
      </header>

      <nav className="flex justify-around border-b border-zinc-800 bg-black sticky top-[61px] z-50 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button 
            key={tab.id} 
            onClick={() => setCategory(tab.id)} 
            className={`relative py-4 px-4 flex items-center gap-2 text-xs font-bold transition-all z-[55] whitespace-nowrap ${category === tab.id ? 'text-white' : 'text-zinc-500'}`}
          >
            <span className="flex items-center gap-2 pointer-events-none">
              {tab.icon} {tab.id}
            </span>
            {category === tab.id && (
              <motion.div 
                layoutId="activeTabUnderline" 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent shadow-[0_0_10px_#ff3b30]" 
              />
            )}
          </button>
        ))}
      </nav>

      <div className={`p-2 grid relative z-10 ${viewMode === 'dashboard' ? "grid-cols-3 gap-1" : "grid-cols-2 gap-2"}`}>
        <AnimatePresence mode='popLayout'>
          {videoData.filter(v => v.category === category).map((video) => (
            <motion.div key={video.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <VideoCard 
                video={video} 
                compact={viewMode === 'dashboard'} 
                onVideoSelect={onVideoSelect} 
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}