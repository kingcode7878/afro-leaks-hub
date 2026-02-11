import React, { useEffect, useState } from "react";
import { Home as HomeIcon, User as UserIcon } from "lucide-react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [refreshKey, setRefreshKey] = useState({ home: 0, profile: 0 });

  // Handle Tab Logic with Refresh capability
  const handleTabClick = (tab) => {
    if (activeTab === tab) {
      setRefreshKey((prev) => ({ ...prev, [tab]: prev[tab] + 1 }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setActiveTab(tab);
    }
  };

  useEffect(() => {
    // Telegram WebApp Integration
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
      tg.setHeaderColor('#000000');
      tg.setBackgroundColor('#000000');
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-accent/30 font-sans">
      
      {/* 🟢 MAIN CONTENT AREA */}
      <main className="pb-[90px] relative z-0">
        {activeTab === "home" ? (
          <Home 
            key={`home-${refreshKey.home}`} 
            category="Trends" 
            viewMode="category"
          />
        ) : (
          <Profile key={`profile-${refreshKey.profile}`} />
        )}
      </main>

      {/* 🧭 PROFESSIONAL BOTTOM NAVIGATION */}
      <nav style={navWrapperStyle}>
        <div style={navInnerContainer}>
          
          {/* Home Tab */}
          <button 
            onClick={() => handleTabClick("home")}
            style={activeTab === 'home' ? activeBtnStyle : inactiveBtnStyle}
          >
            <div className="relative flex flex-col items-center pointer-events-none">
              <HomeIcon 
                size={22} 
                strokeWidth={activeTab === 'home' ? 2.5 : 2} 
                className="transition-transform duration-300"
                style={{ transform: activeTab === 'home' ? 'translateY(-2px)' : 'translateY(0)' }}
              />
              {activeTab === 'home' && <div style={activeIndicator} />}
            </div>
            <span style={labelStyle}>Home</span>
          </button>

          {/* Center Action Button (Pro Look) */}
          <div className="relative flex items-center justify-center w-[64px]">
            <div style={centerButtonBg} />
            <button style={centerButtonStyle}>
              <span className="mb-0.5 pointer-events-none">+</span>
            </button>
          </div>

          {/* Profile Tab */}
          <button 
            onClick={() => handleTabClick("profile")}
            style={activeTab === 'profile' ? activeBtnStyle : inactiveBtnStyle}
          >
            <div className="relative flex flex-col items-center pointer-events-none">
              <UserIcon 
                size={22} 
                strokeWidth={activeTab === 'profile' ? 2.5 : 2} 
                className="transition-transform duration-300"
                style={{ transform: activeTab === 'profile' ? 'translateY(-2px)' : 'translateY(0)' }}
              />
              {activeTab === 'profile' && <div style={activeIndicator} />}
            </div>
            <span style={labelStyle}>Profile</span>
          </button>

        </div>
      </nav>
    </div>
  );
}

// 🎨 COMPONENT STYLES (Fixed for Clicks)

const navWrapperStyle = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  height: '88px',
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
  zIndex: 1000,
  display: 'flex',
  justifyContent: 'center',
  paddingBottom: 'env(safe-area-inset-bottom)',
  pointerEvents: 'auto', 
};

const navInnerContainer = {
  width: '100%',
  maxWidth: '450px',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  padding: '0 10px',
  height: '100%',
  position: 'relative',
};

const baseBtnStyle = {
  background: 'none',
  border: 'none',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  outline: 'none',
  flex: 1,
  height: '100%',
  position: 'relative',
  zIndex: 10,
  pointerEvents: 'auto',
};

const activeBtnStyle = {
  ...baseBtnStyle,
  color: '#ff3b30',
};

const inactiveBtnStyle = {
  ...baseBtnStyle,
  color: '#555',
};

const labelStyle = {
  fontSize: '10px',
  fontWeight: '800',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  pointerEvents: 'none',
};

const activeIndicator = {
  position: 'absolute',
  bottom: '-14px',
  width: '12px',
  height: '2px',
  backgroundColor: '#ff3b30',
  borderRadius: '2px',
  boxShadow: '0 0 12px rgba(255, 59, 48, 0.8)',
};

const centerButtonStyle = {
  width: '52px',
  height: '52px',
  backgroundColor: '#ff3b30',
  borderRadius: '50%',
  border: 'none',
  color: 'white',
  fontSize: '28px',
  fontWeight: '300',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 8px 20px rgba(255, 59, 48, 0.3)',
  cursor: 'pointer',
  zIndex: 5,
  position: 'absolute',
  top: '-26px', 
  pointerEvents: 'auto',
};

const centerButtonBg = {
  position: 'absolute',
  top: '-32px', 
  width: '64px',
  height: '64px',
  backgroundColor: '#000',
  borderRadius: '50%',
  zIndex: 1,
  pointerEvents: 'none', 
};