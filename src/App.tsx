import React, { useState } from 'react';
import {
  UserProfile,
  MediaItem,
  LoveLetterData,
  BirthdayAppConfig,
} from './types';
import {
  loadStoredData,
  saveStoredData,
  resetStoredData,
  INITIAL_MEDIA_ITEMS,
} from './data/initialData';
import { playUiClick } from './utils/audio';

import { ProfileSelector } from './components/ProfileSelector';
import { Navbar } from './components/Navbar';
import { HeroBillboard } from './components/HeroBillboard';
import { Top10Row } from './components/Top10Row';
import { VideoMemoryPlayer } from './components/VideoMemoryPlayer';
import { LoveLetterModal } from './components/LoveLetterModal';
import { TriviaModal } from './components/TriviaModal';
import { SurpriseGiftModal } from './components/SurpriseGiftModal';
import { SettingsModal } from './components/SettingsModal';
import { Sparkles, HelpCircle, Play } from 'lucide-react';

export default function App() {
  const [data, setData] = useState(() => loadStoredData());
  const [hasSelectedProfile, setHasSelectedProfile] = useState(false);
  const [activeProfile, setActiveProfile] = useState<UserProfile>(
    data.profiles.find((p) => p.id === data.activeProfileId) || data.profiles[0]
  );

  // Modals & Active states
  const [playingItem, setPlayingItem] = useState<MediaItem | null>(null);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isTriviaOpen, setIsTriviaOpen] = useState(false);
  const [isSurpriseOpen, setIsSurpriseOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [currentSection, setCurrentSection] = useState('home');

  // Sync profile selection changes
  const handleSelectProfile = (profile: UserProfile) => {
    setActiveProfile(profile);
    setHasSelectedProfile(true);
    saveStoredData({ activeProfileId: profile.id });

    if (profile.role === 'surprise') {
      setIsSurpriseOpen(true);
    }
  };

  const handleSaveSettings = (
    newConfig: BirthdayAppConfig,
    newLetter: LoveLetterData
  ) => {
    setData((prev) => ({
      ...prev,
      config: newConfig,
      letter: newLetter,
    }));
    saveStoredData({ config: newConfig, letter: newLetter });
  };

  const handleResetAll = () => {
    const initial = resetStoredData();
    setData(initial);
    setActiveProfile(initial.profiles[0]);
  };

  const handleNavigate = (sectionId: string) => {
    setCurrentSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const featuredItem = data.mediaItems[0] || INITIAL_MEDIA_ITEMS[0];

  return (
    <div className="min-h-screen bg-[#141414] text-white selection:bg-[#E50914] selection:text-white relative">
      {/* 1. "Who's Watching?" Profile Selector Screen */}
      {!hasSelectedProfile && (
        <ProfileSelector
          profiles={data.profiles}
          onSelectProfile={handleSelectProfile}
          onOpenSettings={() => setIsSettingsOpen(true)}
          appName={data.config.appName}
        />
      )}

      {/* 2. Main Netflix Experience */}
      {hasSelectedProfile && (
        <div className="flex flex-col min-h-screen">
          {/* Header Navigation */}
          <Navbar
            config={data.config}
            activeProfile={activeProfile}
            profiles={data.profiles}
            onSelectProfile={handleSelectProfile}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onOpenLetter={() => setIsLetterOpen(true)}
            onOpenTrivia={() => setIsTriviaOpen(true)}
            onOpenSurprise={() => setIsSurpriseOpen(true)}
            currentSection={currentSection}
            onNavigate={handleNavigate}
          />

          <main className="flex-1">
            {/* Hero Billboard Banner */}
            <div id="home">
              <HeroBillboard
                config={data.config}
                featuredItem={featuredItem}
                onPlay={(item) => setPlayingItem(item)}
                onOpenLetter={() => setIsLetterOpen(true)}
              />
            </div>

            {/* Media Carousels */}
            <div id="shows" className="relative z-30 space-y-6 pt-2 md:pt-6 pb-12">
              {/* Iconic Top 10 */}
              <Top10Row
                girlfriendName={data.config.girlfriendName}
                reasons={data.topReasons}
              />

              {/* Love Quiz Interactive Banner Card */}
              <div id="trivia" className="max-w-7xl mx-auto px-4 md:px-12 pt-2">
                <div
                  onClick={() => {
                    playUiClick();
                    setIsTriviaOpen(true);
                  }}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-950/80 via-[#1a1415] to-neutral-900 border border-neutral-800 hover:border-red-600/50 p-6 md:p-8 cursor-pointer transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(229,9,20,0.25)] flex flex-col md:flex-row items-center justify-between gap-6"
                >
                  <div className="space-y-2 text-left">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#E50914] text-white text-[11px] font-bold tracking-wider uppercase flex items-center gap-1">
                        <Sparkles size={12} /> Special Quiz
                      </span>
                      <span className="text-xs text-neutral-400 font-medium">5 Pertanyaan MENEGANGKAN!</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-red-400 transition-colors">
                      Seberapa Kamu Tahu Tentang Diri Kamu & Kita?
                    </h3>
                    <p className="text-xs md:text-sm text-neutral-300 max-w-xl">
                      Apakah kamu bisa menjawab quiz yang pacar kamu buat?  HARUS DAPET 100!!
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playUiClick();
                        setIsTriviaOpen(true);
                      }}
                      className="px-6 py-3 bg-[#E50914] hover:bg-red-700 text-white font-bold rounded-xl text-sm transition-all transform group-hover:scale-105 shadow-lg flex items-center gap-2 cursor-pointer"
                    >
                      <Play size={16} fill="currentColor" />
                      <span>Mulai Kuis Sekarang</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-black/90 border-t border-neutral-800 py-12 px-4 md:px-8 text-neutral-500 text-xs select-none">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex flex-wrap items-center justify-center border-b border-neutral-800/80 pb-6">
                <div className="flex items-center gap-2">
                  <span className="font-bebas text-2xl text-[#E50914] tracking-wider">
                    {data.config.appName || 'NETFLIX'}
                  </span>
                </div>
              </div>

              <div className="text-center text-neutral-400 text-xs sm:text-[13px] space-y-1">
                <p className="font-bold text-neutral-300 tracking-wider uppercase text-[11px] mb-1.5">Starring</p>
                <p className="text-neutral-200 font-medium">{data.config.girlfriendName} <span className="text-neutral-400 font-normal">(The Birthday Queen)</span></p>
                <p className="text-neutral-200 font-medium">{data.config.boyfriendName} <span className="text-neutral-400 font-normal">(Her #1 Fan)</span></p>
              </div>

              <p className="text-center pt-4 text-neutral-600 text-[11px]">
                Made with infinite love and adoration for {data.config.girlfriendName}'s birthday. &copy; 2026 {data.config.appName || 'NETFLIX'}. All rights reserved forever.
              </p>
            </div>
          </footer>
        </div>
      )}

      {/* Video Memory Player Fullscreen */}
      {playingItem && (
        <VideoMemoryPlayer
          item={playingItem}
          onClose={() => setPlayingItem(null)}
          girlfriendName={data.config.girlfriendName}
        />
      )}

      {/* Love Letter Modal */}
      <LoveLetterModal
        isOpen={isLetterOpen}
        onClose={() => setIsLetterOpen(false)}
        letter={data.letter}
        girlfriendName={data.config.girlfriendName}
        boyfriendName={data.config.boyfriendName}
      />

      {/* Couple Trivia Modal */}
      <TriviaModal
        isOpen={isTriviaOpen}
        onClose={() => setIsTriviaOpen(false)}
        questions={data.trivia}
        girlfriendName={data.config.girlfriendName}
      />

      {/* Secret Surprise Gift Modal */}
      <SurpriseGiftModal
        isOpen={isSurpriseOpen}
        onClose={() => setIsSurpriseOpen(false)}
        config={data.config}
      />

      {/* Director's Cut Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={data.config}
        letter={data.letter}
        onSave={handleSaveSettings}
        onReset={handleResetAll}
      />
    </div>
  );
}
