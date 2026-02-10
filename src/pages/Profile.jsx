import React from 'react';
import { Settings, ShieldCheck, Award, Clock, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Profile() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }} 
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen bg-black text-white pb-10"
    >
      {/* 🛠️ Profile Header with Glass Effect */}
      <div className="relative h-48 bg-gradient-to-b from-accent/20 to-black flex items-end justify-center pb-6">
        <button className="absolute top-6 right-6 p-2 bg-white/5 rounded-full border border-white/10 active:scale-90 transition-transform">
          <Settings size={20} className="text-zinc-400" />
        </button>
        
        <div className="relative">
          <div className="w-28 h-28 bg-zinc-900 rounded-full border-4 border-black shadow-2xl overflow-hidden">
            {/* Placeholder for actual image */}
            <div className="w-full h-full bg-gradient-to-tr from-zinc-800 to-zinc-700 flex items-center justify-center">
              <span className="text-3xl font-black italic text-zinc-500">U</span>
            </div>
          </div>
          <div className="absolute bottom-1 right-1 bg-accent p-1.5 rounded-full border-2 border-black">
            <ShieldCheck size={14} className="text-white" />
          </div>
        </div>
      </div>

      <div className="px-6 flex flex-col items-center">
        <h2 className="text-2xl font-black tracking-tight italic">USER #8273</h2>
        <div className="flex items-center gap-2 mt-1">
          <Award size={14} className="text-accent" />
          <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Premium Member</p>
        </div>

        {/* 📊 Stats Glass Card */}
        <div className="mt-8 grid grid-cols-2 gap-3 w-full max-w-md">
          <div className="bg-zinc-900/40 border border-white/5 backdrop-blur-md p-5 rounded-2xl text-center shadow-xl">
            <p className="text-white font-black text-2xl tracking-tighter">12</p>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-1">Liked Leaks</p>
          </div>
          <div className="bg-zinc-900/40 border border-white/5 backdrop-blur-md p-5 rounded-2xl text-center shadow-xl">
            <p className="text-white font-black text-2xl tracking-tighter">5</p>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-1">Followers</p>
          </div>
        </div>

        {/* 📜 Account Actions List */}
        <div className="mt-10 w-full max-w-md space-y-2">
          <h3 className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em] mb-4 ml-2">Account Settings</h3>
          
          <ProfileAction icon={<Clock size={18}/>} label="Watch History" />
          <ProfileAction icon={<ShieldCheck size={18}/>} label="Privacy & Safety" />
          <ProfileAction icon={<Settings size={18}/>} label="App Preferences" />
          
          <button className="w-full py-4 mt-6 text-accent text-xs font-black uppercase tracking-widest border border-accent/20 rounded-2xl bg-accent/5 active:scale-95 transition-all">
            Logout
          </button>
        </div>

        <p className="mt-10 text-[10px] text-zinc-600 font-medium italic">Joined AfroLeaks in 2026</p>
      </div>
    </motion.div>
  );
}

// 📱 Reusable Action Row Component
function ProfileAction({ icon, label }) {
  return (
    <div className="flex items-center justify-between p-4 bg-zinc-900/20 border border-white/5 rounded-2xl hover:bg-zinc-900/40 transition-colors cursor-pointer group">
      <div className="flex items-center gap-4">
        <div className="text-zinc-400 group-hover:text-accent transition-colors">
          {icon}
        </div>
        <span className="text-sm font-bold text-zinc-300">{label}</span>
      </div>
      <ChevronRight size={16} className="text-zinc-600" />
    </div>
  );
}