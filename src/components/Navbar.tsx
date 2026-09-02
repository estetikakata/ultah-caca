import React, { useState, useEffect } from 'react';
import { UserProfile, BirthdayAppConfig } from '../types';
import { playUiClick, startAmbientMusic, stopAmbientMusic } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Volume2,
  VolumeX,
  Sparkles,
  Heart,
  ChevronDown,
  Settings,
  User,
  PartyPopper,
} from 'lucide-react';

interface NavbarProps {
  config: BirthdayAppConfig;
  activeProfile: UserProfile;
  profiles: UserProfile[];
  onSelectProfile: (profile: UserProfile) => void;
  onOpenSettings: () => void;
  onOpenLetter: () => void;
  onOpenTrivia: () => void;
  onOpenSurprise: () => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  currentSection: string;
  onNavigate: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  config,
  activeProfile,
  profiles,
  onSelectProfile,
  onOpenSettings,
  onOpenLetter,
  onOpenTrivia,
  onOpenSurprise,
  currentSection,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMusic = () => {
    playUiClick();
    if (isMusicPlaying) {
      stopAmbientMusic();
      setIsMusicPlaying(false);
    } else {
      startAmbientMusic(0.25);
      setIsMusicPlaying(true);
    }
  };

  const triggerCelebration = () => {
    playUiClick();
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#E50914', '#FF4D6D', '#FFB703', '#FFFFFF'],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#E50914', '#FF4D6D', '#FFB703', '#FFFFFF'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'top10', label: 'Top 10 Reasons' },
    { id: 'letter', label: 'Love Letter', action: onOpenLetter },
    { id: 'trivia', label: 'Love Quiz', action: onOpenTrivia },
  ];

  return (
    <header
      id="navbar-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#141414]/95 backdrop-blur-md shadow-2xl py-3 border-b border-neutral-800/40'
          : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-12 flex items-center justify-between">
        {/* Left: Brand + Nav Links */}
        <div className="flex items-center space-x-6 md:space-x-10">
          {/* Logo */}
          <button
            onClick={() => {
              playUiClick();
              onNavigate('home');
            }}
            className="flex items-center gap-1.5 text-left group"
          >
            <h1 className="text-[#E50914] text-3xl md:text-4xl font-black tracking-tighter transition-transform group-hover:scale-105 drop-shadow-[0_0_15px_rgba(229,9,20,0.5)]">
              {config.appName || 'NETFLIX'}
            </h1>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-5 text-sm font-light text-gray-200 mt-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  playUiClick();
                  if (item.action) {
                    item.action();
                  } else {
                    onNavigate(item.id);
                  }
                }}
                className={`transition-colors relative py-1 cursor-pointer ${
                  currentSection === item.id
                    ? 'text-white font-medium'
                    : 'text-gray-200 hover:text-gray-400'
                }`}
              >
                {item.label}
                {currentSection === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E50914] rounded-full" />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Right: Tools, Celebration, Music & Profile */}
        <div className="flex items-center space-x-4 md:space-x-6">

          {/* Background Ambient Sound Toggle */}
          <button
            id="btn-nav-music"
            onClick={toggleMusic}
            title={isMusicPlaying ? 'Mute romantic ambient music' : 'Play romantic ambient music'}
            className={`p-1.5 rounded transition-colors flex items-center gap-1.5 ${
              isMusicPlaying
                ? 'text-[#E50914] bg-neutral-900 border border-[#E50914]/40'
                : 'text-gray-200 hover:text-white'
            }`}
          >
            {isMusicPlaying ? (
              <>
                <Volume2 size={20} className="animate-pulse" />
                <span className="hidden xl:inline text-[11px] font-semibold uppercase tracking-wider text-gray-200">
                  Music ON
                </span>
              </>
            ) : (
              <VolumeX size={20} />
            )}
          </button>

          {/* Confetti Celebration Button */}
          <button
            id="btn-nav-celebrate"
            onClick={triggerCelebration}
            title="Pop Birthday Fireworks!"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-gradient-to-r from-[#E50914] to-pink-600 hover:from-red-600 hover:to-pink-700 text-white text-xs md:text-sm font-bold shadow-md transition-all transform active:scale-95"
          >
            <PartyPopper size={16} />
            <span className="hidden sm:inline">Celebrate</span>
          </button>

          {/* Profile Badge */}
          <div className="relative">
            <button
              id="btn-nav-profile"
              onClick={() => {
                playUiClick();
                setShowProfileMenu(!showProfileMenu);
              }}
              className="flex items-center space-x-2 group p-1 rounded transition-opacity hover:opacity-90 cursor-pointer"
            >
              <span className="hidden sm:inline text-sm font-medium text-gray-200 group-hover:text-white">
                {activeProfile.name}
              </span>
              <div className="w-8 h-8 rounded bg-gradient-to-br from-pink-500 to-rose-600 shadow-inner overflow-hidden flex items-center justify-center border-2 border-pink-500 shadow-[0_0_12px_rgba(236,72,153,0.4)]">
                {activeProfile.avatar ? (
                  <img
                    src={activeProfile.avatar}
                    alt={activeProfile.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <User size={16} className="text-white" />
                )}
              </div>
              <ChevronDown
                size={14}
                className={`text-gray-400 group-hover:text-white transition-transform ${
                  showProfileMenu ? 'rotate-180' : ''
                }`}
              />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-3 w-56 bg-[#181818] border border-neutral-700 rounded-lg shadow-2xl overflow-hidden py-2 z-50">
                <div className="px-4 py-2 border-b border-neutral-800">
                  <p className="text-xs text-gray-400">Current Profile</p>
                  <p className="text-sm font-semibold text-white truncate">{activeProfile.name}</p>
                </div>

                {profiles.length > 1 && (
                  <div className="py-1">
                    <p className="px-4 py-1 text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                      Switch Profile
                    </p>
                    {profiles.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          playUiClick();
                          onSelectProfile(p);
                          setShowProfileMenu(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs flex items-center gap-2.5 transition-colors ${
                          p.id === activeProfile.id
                            ? 'bg-neutral-800 text-[#E50914] font-semibold'
                            : 'text-gray-300 hover:bg-neutral-800 hover:text-white'
                        }`}
                      >
                        <div className="w-6 h-6 rounded overflow-hidden bg-neutral-700 shrink-0">
                          {p.avatar && (
                            <img
                              src={p.avatar}
                              alt=""
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          )}
                        </div>
                        <span className="truncate">{p.name}</span>
                      </button>
                    ))}
                  </div>
                )}

                <div className="border-t border-neutral-800 mt-1 pt-1">
                  <button
                    onClick={() => {
                      playUiClick();
                      onOpenSettings();
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-gray-300 hover:bg-neutral-800 hover:text-white flex items-center gap-2"
                  >
                    <Settings size={14} />
                    <span>Customize Story & Photos</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-gray-200 hover:text-white"
          >
            <span className="text-xl">☰</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#181818] border-b border-neutral-800 px-6 py-4 mt-2 flex flex-col gap-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                playUiClick();
                if (item.action) {
                  item.action();
                } else {
                  onNavigate(item.id);
                }
                setMobileMenuOpen(false);
              }}
              className="text-left text-sm py-2 text-neutral-200 hover:text-[#E50914] font-medium"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              onOpenSettings();
              setMobileMenuOpen(false);
            }}
            className="text-left text-sm py-2 text-neutral-400 hover:text-white flex items-center gap-2"
          >
            <Settings size={16} />
            <span>Customize Story</span>
          </button>
        </div>
      )}
    </header>
  );
};
