import React, { useEffect, useState, useRef } from "react";
import { Home as HomeIcon, User as UserIcon, X, ChevronLeft } from "lucide-react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [category, setCategory] = useState("Leaks");
  const [viewMode, setViewMode] = useState("category");
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
      tg.setHeaderColor('#000000');
      tg.setBackgroundColor('#000000');
    }
  }, []);

  const handleTabClick = (tab) => {
    if (activeTab === tab) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setActiveTab(tab);
    }
  };

  const isTelegram = !!window.Telegram?.WebApp?.initData;

  // --- Shared Navigation Component ---
  const Navigation = () => (
    <nav style={navWrapperStyle}>
      <div style={navInnerContainer}>
        <button onClick={() => handleTabClick("home")} style={activeTab === 'home' ? activeBtnStyle : inactiveBtnStyle}>
          <HomeIcon size={22} strokeWidth={activeTab === 'home' ? 2.5 : 2} /><span style={labelStyle}>Home</span>
          {activeTab === 'home' && <div style={activeIndicator} />}
        </button>
        <div className="relative flex items-center justify-center w-[64px]">
          <div style={centerButtonBg} /><button style={centerButtonStyle}>+</button>
        </div>
        <button onClick={() => handleTabClick("profile")} style={activeTab === 'profile' ? activeBtnStyle : inactiveBtnStyle}>
          <UserIcon size={22} strokeWidth={activeTab === 'profile' ? 2.5 : 2} /><span style={labelStyle}>Profile</span>
          {activeTab === 'profile' && <div style={activeIndicator} />}
        </button>
      </div>
    </nav>
  );

  // --- Video Player Component with 3s Auto-Hide Caption ---
  const VideoPlayer = ({ video, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);
    const timerRef = useRef(null);

    const startTimer = () => {
      setIsVisible(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    };

    useEffect(() => {
      startTimer();
      return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    }, []);

    return (
      <div 
        className="absolute inset-0 z-[2000] bg-black flex flex-col h-full w-full overflow-hidden"
        onMouseMove={startTimer}
        onClick={startTimer}
        onTouchStart={startTimer}
      >
        <div className={`absolute top-0 left-0 right-0 p-6 flex justify-between z-[2002] bg-gradient-to-b from-black/90 to-transparent transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <button onClick={onClose} className="p-2 bg-white/10 backdrop-blur-md rounded-full"><ChevronLeft size={28} /></button>
          <button onClick={onClose} className="p-2 bg-white/10 backdrop-blur-md rounded-full"><X size={28} /></button>
        </div>

        <div className="flex-1 flex items-center justify-center bg-black h-full w-full">
          <video 
            autoPlay controls 
            controlsList="nodownload noplaybackrate" 
            disablePictureInPicture 
            onContextMenu={(e) => e.preventDefault()}
            src={video.video_url} 
            className="w-full max-h-full object-contain" 
            onPlay={startTimer}
          />
        </div>

        <div className={`absolute bottom-0 left-0 right-0 p-8 pb-12 bg-gradient-to-t from-black via-black/90 to-transparent z-[2002] transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-xl font-black italic uppercase tracking-tighter leading-tight">{video.caption}</h2>
          <p className="text-xs text-zinc-400 mt-2 font-bold uppercase tracking-widest">{video.views} views</p>
        </div>
      </div>
    );
  };

  // 1. TELEGRAM VIEW BLOCK
  if (isTelegram) {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        <main className="h-full pb-[90px] overflow-y-auto">
          {activeTab === "home" ? <Home category={category} setCategory={setCategory} onVideoSelect={setSelectedVideo} /> : <Profile />}
        </main>
        <Navigation />
        {selectedVideo && <VideoPlayer video={selectedVideo} onClose={() => setSelectedVideo(null)} />}
      </div>
    );
  }

  // 2. MOBILE WEB VIEW BLOCK
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  if (isMobile) {
    return (
      <div className="h-screen w-full bg-black text-white relative overflow-hidden">
        <main className="h-full pb-[90px] overflow-y-auto">
          {activeTab === "home" ? <Home category={category} setCategory={setCategory} onVideoSelect={setSelectedVideo} /> : <Profile />}
        </main>
        <Navigation />
        {selectedVideo && <VideoPlayer video={selectedVideo} onClose={() => setSelectedVideo(null)} />}
      </div>
    );
  }

  // 3. DESKTOP VIEW BLOCK
  return (
    <div className="min-h-screen bg-zinc-950 flex justify-center items-center overflow-hidden">
      <div className="w-full max-w-[450px] h-[90vh] max-h-[850px] bg-black text-white relative overflow-hidden border-x border-zinc-900/50 rounded-2xl shadow-2xl">
        <main className="h-full pb-[90px] overflow-y-auto">
          {activeTab === "home" ? <Home category={category} setCategory={setCategory} onVideoSelect={setSelectedVideo} /> : <Profile />}
        </main>
        <Navigation />
        {selectedVideo && <VideoPlayer video={selectedVideo} onClose={() => setSelectedVideo(null)} />}
      </div>
    </div>
  );
}

// Styles
const navWrapperStyle = { position: 'absolute', bottom: 0, left: 0, right: 0, height: '88px', backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255, 255, 255, 0.08)', zIndex: 1000, display: 'flex', justifyContent: 'center', paddingBottom: 'env(safe-area-inset-bottom)' };
const navInnerContainer = { width: '100%', maxWidth: '450px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '100%', position: 'relative' };
const baseBtnStyle = { background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', outline: 'none', flex: 1, color: '#555' };
const activeBtnStyle = { ...baseBtnStyle, color: '#ff3b30' };
const inactiveBtnStyle = { ...baseBtnStyle };
const labelStyle = { fontSize: '10px', fontWeight: '800', textTransform: 'uppercase' };
const activeIndicator = { position: 'absolute', bottom: '10px', width: '12px', height: '2px', backgroundColor: '#ff3b30' };
const centerButtonStyle = { width: '52px', height: '52px', backgroundColor: '#ff3b30', borderRadius: '50%', color: 'white', fontSize: '28px', zIndex: 5, position: 'absolute', top: '-26px' };
const centerButtonBg = { position: 'absolute', top: '-32px', width: '64px', height: '64px', backgroundColor: '#000', borderRadius: '50%', zIndex: 1 };