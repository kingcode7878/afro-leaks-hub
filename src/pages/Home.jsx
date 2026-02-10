import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Zap, Flame, Heart, LayoutGrid, List } from "lucide-react";
import { videoData } from '../videoData'; // Note the ../ because we are in /pages
import { VideoCard } from '../components/VideoCard';

const tabs = [
  { id: 'Trends', icon: <TrendingUp size={16}/> },
  { id: 'Knacks', icon: <Zap size={16}/> },
  { id: 'Hotties', icon: <Flame size={16}/> },
  { id: 'Baddies', icon: <Heart size={16}/> }
];

export default function Home({ category, setCategory, viewMode, setViewMode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Header */}
      <header className="p-4 flex justify-between items-center border-b border-zinc-800 sticky top-0 bg-black/80 backdrop-blur-md z-50">
        <h1 className="text-accent font-black tracking-tighter text-xl italic">AFRO LEAKS</h1>
        <div className="flex bg-zinc-900 rounded-lg p-1">
          <button onClick={() => setViewMode('dashboard')} className={`p-1.5 rounded-md ${viewMode === 'dashboard' ? 'bg-zinc-700' : ''}`}>
            <LayoutGrid size={18} />
          </button>
          <button onClick={() => setViewMode('category')} className={`p-1.5 rounded-md ${viewMode === 'category' ? 'bg-zinc-700' : ''}`}>
            <List size={18} />
          </button>
        </div>
      </header>

      {/* Sliding Tabs */}
      <nav className="flex justify-around border-b border-zinc-800 bg-black sticky top-[61px] z-40">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setCategory(tab.id)} className={`relative py-4 px-2 flex items-center gap-2 text-xs font-bold ${category === tab.id ? 'text-white' : 'text-zinc-500'}`}>
            {tab.icon} {tab.id}
            {category === tab.id && (
              <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent shadow-[0_0_10px_#ff3b30]" />
            )}
          </button>
        ))}
      </nav>

      {/* Grid */}
      <div className={`p-2 grid ${viewMode === 'dashboard' ? "grid-cols-3 gap-1" : "grid-cols-2 gap-2"}`}>
        <AnimatePresence mode='popLayout'>
          {videoData.filter(v => v.category === category).map((video) => (
            <motion.div key={video.id} layout initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
              <VideoCard video={video} compact={viewMode === 'dashboard'} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}