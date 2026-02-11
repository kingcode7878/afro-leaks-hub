import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Zap, Flame, Heart, LayoutGrid, List } from "lucide-react";
import { videoData } from '../videoData'; 
import { VideoCard } from '../components/VideoCard';

const tabs = [
  { id: 'Trends', icon: <TrendingUp size={16}/> },
  { id: 'Knacks', icon: <Zap size={16}/> },
  { id: 'Hotties', icon: <Flame size={16}/> },
  { id: 'Baddies', icon: <Heart size={16}/> }
];

export default function Home({ category, setCategory, viewMode, setViewMode }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="relative z-0"
    >
      {/* Header */}
      <header className="p-4 flex justify-between items-center border-b border-zinc-800 sticky top-0 bg-black/80 backdrop-blur-md z-[60]">
        <h1 className="text-accent font-black tracking-tighter text-xl italic pointer-events-none">
          AFRO LEAKS
        </h1>
        <div className="flex bg-zinc-900 rounded-lg p-1 relative z-[70]">
          <button 
            onClick={() => setViewMode('dashboard')} 
            className={`p-1.5 rounded-md transition-colors cursor-pointer relative z-[80] ${viewMode === 'dashboard' ? 'bg-zinc-700 text-white' : 'text-zinc-500'}`}
          >
            <LayoutGrid size={18} className="pointer-events-none" />
          </button>
          <button 
            onClick={() => setViewMode('category')} 
            className={`p-1.5 rounded-md transition-colors cursor-pointer relative z-[80] ${viewMode === 'category' ? 'bg-zinc-700 text-white' : 'text-zinc-500'}`}
          >
            <List size={18} className="pointer-events-none" />
          </button>
        </div>
      </header>

      {/* Sliding Tabs */}
      <nav className="flex justify-around border-b border-zinc-800 bg-black sticky top-[61px] z-50">
        {tabs.map((tab) => (
          <button 
            key={tab.id} 
            onClick={() => setCategory(tab.id)} 
            className={`relative py-4 px-2 flex items-center gap-2 text-xs font-bold transition-colors cursor-pointer z-[55] ${category === tab.id ? 'text-white' : 'text-zinc-500'}`}
          >
            <span className="pointer-events-none flex items-center gap-2">
              {tab.icon} {tab.id}
            </span>
            {category === tab.id && (
              <motion.div 
                layoutId="activeTabUnderline" 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent shadow-[0_0_10px_#ff3b30] pointer-events-none" 
              />
            )}
          </button>
        ))}
      </nav>

      {/* Grid */}
      <div className={`p-2 grid relative z-10 ${viewMode === 'dashboard' ? "grid-cols-3 gap-1" : "grid-cols-2 gap-2"}`}>
        <AnimatePresence mode='popLayout'>
          {videoData.filter(v => v.category === category).map((video) => (
            <motion.div 
              key={video.id} 
              layout 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="cursor-pointer active:scale-95 transition-transform"
            >
              <VideoCard video={video} compact={viewMode === 'dashboard'} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}