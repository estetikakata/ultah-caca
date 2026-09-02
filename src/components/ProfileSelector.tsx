import React from 'react';
import { motion } from 'motion/react';
import { UserProfile } from '../types';
import { playUiClick } from '../utils/audio';
import { Crown, Sparkles, Heart, Gift, Settings } from 'lucide-react';

interface ProfileSelectorProps {
  profiles: UserProfile[];
  onSelectProfile: (profile: UserProfile) => void;
  onOpenSettings: () => void;
  appName?: string;
}

export const ProfileSelector: React.FC<ProfileSelectorProps> = ({
  profiles,
  onSelectProfile,
  onOpenSettings,
  appName = 'LOVEFLIX',
}) => {
  return (
    <div
      id="profile-selector-container"
      className="min-h-screen bg-[#141414] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden select-none"
    >
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-[#141414] to-black opacity-90 pointer-events-none" />

      {/* Top Left Logo */}
      <div className="absolute top-6 left-6 md:top-10 md:left-12 flex items-center gap-2 z-10">
        <span className="font-bebas text-3xl md:text-4xl tracking-wider text-[#e50914] drop-shadow-[0_0_15px_rgba(229,9,20,0.6)]">
          {appName}
        </span>
      </div>

      {/* Top Right Surprise Button */}
      <button
        id="btn-profile-settings"
        onClick={() => {
          playUiClick();
          onOpenSettings();
        }}
        className="absolute top-6 right-6 md:top-10 md:right-12 flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-700 bg-neutral-900/80 hover:bg-neutral-800 hover:border-neutral-500 text-neutral-300 text-xs md:text-sm transition-all z-10"
      >
        <Settings size={15} />
        <span>Kustomisasi Cerita</span>
      </button>

      {/* Center Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 flex flex-col items-center max-w-4xl w-full"
      >
        <h1 className="text-3xl md:text-5xl font-semibold text-white tracking-wide mb-3 text-center">
          Siapa yang Nonton?
        </h1>
        <p className="text-neutral-400 text-sm md:text-base mb-10 md:mb-14 text-center max-w-md">
          Pilih profil yang mukanya paling cantik 👸
        </p>

        {/* Profiles Layout */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 w-full max-w-2xl mb-12">
          {profiles.map((profile, idx) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + idx * 0.1, duration: 0.4 }}
              onClick={() => {
                playUiClick();
                onSelectProfile(profile);
              }}
              className="group flex flex-col items-center cursor-pointer"
            >
              {/* Avatar Box (Hover Pink) */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-lg overflow-hidden border-2 border-transparent group-hover:border-pink-500 transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] bg-neutral-800 flex items-center justify-center">
                
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full h-full object-cover group-hover:opacity-95 transition-opacity"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback icon placeholder if image fails
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : null}

                {/* Badge Overlay */}
                {profile.role === 'girlfriend' && (
                  <div className="absolute top-2 right-2 bg-[#e50914] text-white p-1.5 rounded-full shadow-lg">
                    <Crown size={16} />
                  </div>
                )}
                {profile.role === 'couple' && (
                  <div className="absolute top-2 right-2 bg-pink-600 text-white p-1.5 rounded-full shadow-lg">
                    <Heart size={16} fill="currentColor" />
                  </div>
                )}
                {profile.role === 'surprise' && (
                  <div className="absolute top-2 right-2 bg-amber-500 text-white p-1.5 rounded-full shadow-lg">
                    <Gift size={16} className="animate-pulse" />
                  </div>
                )}

                {/* Hover Glow Ring (Pink) */}
                <div className="absolute inset-0 border-2 border-pink-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none" />
              </div>

              {/* Profile Name */}
              <span className="mt-4 text-base md:text-lg font-semibold text-neutral-300 group-hover:text-white transition-colors text-center truncate max-w-full">
                {profile.name}
              </span>

              {/* Sub-label */}
              {profile.badge && (
                <span className="mt-1 text-xs uppercase tracking-wider text-neutral-500 group-hover:text-[#e50914] transition-colors font-medium">
                  {profile.badge}
                </span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Edit Button */}
        <motion.button
          id="btn-manage-profiles"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={() => {
            playUiClick();
            onOpenSettings();
          }}
          className="px-6 py-2.5 border border-neutral-600 hover:border-white text-neutral-400 hover:text-white text-xs md:text-sm uppercase tracking-widest transition-all duration-200"
        >
          Kelola Profil / Kenangan
        </motion.button>
      </motion.div>
    </div>
  );
};