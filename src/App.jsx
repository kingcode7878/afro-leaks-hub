import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home as HomeIcon, User, TrendingUp, Zap, Flame, Heart, LayoutGrid, List } from "lucide-react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

const tg = window.Telegram?.WebApp;

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [refreshKey, setRefreshKey] = useState({ home: 0, profile: 0 });

  // 🔴 States for the Afro Leaks filtering (Passed to Home)
  const [category, setCategory] = useState('Trends');
  const [viewMode, setViewMode] = useState('category');

  const handleTabClick = (tab) => {
    if (activeTab === tab) {
      setRefreshKey((prev) => ({ ...prev, [tab]: prev[tab] + 1 }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setActiveTab(tab);
    }
  };

  useEffect(() => {
    if (tg) {
      tg.ready();
      tg.expand();
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      
      {/* 🟢 Main Content Area */}
      <main className="pb-24">
        <AnimatePresence mode="wait">
          {activeTab === "home" ? (
            <Home 
              key={`home-${refreshKey.home}`} 
              category={category}
              setCategory={setCategory}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
          ) : (
            <Profile key={`profile-${refreshKey.profile}`} />
          )}
        </AnimatePresence>
      </main>

      {/* 🟢 Bottom Navigation (TikTok Style) */}
      <nav className="fixed bottom-0 left-0 right-0 h-[70px] bg-[#121212] border-t border-zinc-800 flex justify-around items-center z-[1000] pb-[env(safe-area-inset-bottom)]">
        <button 
          onClick={() => handleTabClick("home")}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'home' ? 'text-white' : 'text-zinc-500'}`}
        >
          <HomeIcon size={24} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
          <span className="text-[10px] font-bold">Home</span>
        </button>

        {/* Center "+" Button for leaks */}
        <div className="w-12 h-12 bg-accent rounded-full -mt-10 border-4 border-black flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-accent/20">
          +
        </div>

        <button 
          onClick={() => handleTabClick("profile")}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'profile' ? 'text-white' : 'text-zinc-500'}`}
        >
          <User size={24} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
          <span className="text-[10px] font-bold">Profile</span>
        </button>
      </nav>
    </div>
  );
}