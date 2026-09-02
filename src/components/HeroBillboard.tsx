import React from 'react';
import { BirthdayAppConfig, MediaItem } from '../types';
import { playUiClick } from '../utils/audio';
import { Heart } from 'lucide-react';

interface HeroBillboardProps {
  config: BirthdayAppConfig;
  featuredItem: MediaItem;
  onPlay: (item: MediaItem) => void;
  onOpenLetter: () => void;
}

export const HeroBillboard: React.FC<HeroBillboardProps> = ({
  config,
  featuredItem,
  onPlay,
  onOpenLetter,
}) => {
  const bgImage = featuredItem.backdropImage || config.heroBackdrop;

  return (
    <section
      id="hero-billboard"
      className="relative w-full min-h-[540px] md:min-h-[600px] lg:min-h-[660px] flex items-center px-4 md:px-12 pt-24 pb-12 md:pb-16 overflow-hidden select-none"
    >
      {/* Cinematic Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent z-10" />

      {/* Backdrop photo container */}
      <div className="absolute inset-0 bg-[#2a2a2a]">
        <div
          className="w-full h-full opacity-45 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{ backgroundImage: `url("${bgImage}")` }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-2xl pt-6 md:pt-10">
        {/* Top Badges */}
        <div className="flex items-center space-x-2 mb-2.5">
          <span className="bg-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded shadow text-white tracking-wide">
            ORIGINAL
          </span>
          <span className="text-gray-300 uppercase tracking-widest text-[10px] font-bold">
            Birthday Exclusive
          </span>
          {config.relationshipMilestone && (
            <span className="hidden sm:inline-block border border-gray-600 px-1.5 py-0.5 text-[10px] font-medium text-gray-300 rounded-sm">
              {config.relationshipMilestone}
            </span>
          )}
        </div>

        {/* Big Blockbuster Title */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 uppercase leading-[0.9] tracking-tighter text-white drop-shadow-2xl">
          {featuredItem.title}
        </h2>

        {/* Metadata Details */}
        <div className="flex flex-wrap items-center space-x-3 mb-5 text-sm">
          <span className="text-green-500 font-bold">99.9% Original</span>
          <span className="text-gray-400">{featuredItem.year || '2026'}</span>
          {featuredItem.ageRating && featuredItem.ageRating !== 'Masterpiece' && (
            <span className="border border-gray-500 px-1.5 py-0.5 text-[10px] rounded-sm text-gray-300">
              {featuredItem.ageRating}
            </span>
          )}
          <span className="font-medium text-gray-300">Limited Edition</span>
          <span className="border border-gray-600 px-1 text-[10px] font-bold text-gray-400">
            4K ULTRA HD
          </span>
        </div>

        {/* Description */}
        <p className="text-base md:text-lg leading-relaxed mb-8 text-gray-100 drop-shadow-lg max-w-xl line-clamp-3 md:line-clamp-4 font-normal">
          {config.heroDescription || featuredItem.description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          <button
            id="btn-hero-play"
            onClick={() => {
              playUiClick();
              onPlay(featuredItem);
            }}
            className="bg-white text-black px-8 md:px-10 py-3 rounded-md font-bold text-base md:text-lg flex items-center hover:bg-opacity-90 active:scale-95 cursor-pointer transition-all shadow-2xl"
          >
            <span className="mr-2 text-lg">▶</span>
            <span>Play</span>
          </button>

          <button
            id="btn-hero-letter"
            onClick={() => {
              playUiClick();
              onOpenLetter();
            }}
            className="flex items-center gap-2 px-6 py-3 bg-red-950/60 hover:bg-red-900/80 border border-[#E50914]/50 text-red-200 rounded-md font-bold text-sm md:text-base backdrop-blur-sm transition-all cursor-pointer"
          >
            <Heart size={16} className="text-[#E50914]" fill="currentColor" />
            <span>Love Letter</span>
          </button>
        </div>
      </div>
    </section>
  );
};
