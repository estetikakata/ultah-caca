import React, { useRef, useState } from 'react';
import { MediaItem } from '../types';
import { playUiClick } from '../utils/audio';
import { Play, Info, Heart, Plus } from 'lucide-react';

interface MediaRowProps {
  title: string;
  subtitle?: string;
  items: MediaItem[];
  onPlay: (item: MediaItem) => void;
  onMoreInfo: (item: MediaItem) => void;
}

export const MediaRow: React.FC<MediaRowProps> = ({
  title,
  subtitle,
  items,
  onPlay,
  onMoreInfo,
}) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [, setHoveredItemId] = useState<string | null>(null);

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    playUiClick();
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="relative py-4 md:py-6 group/row select-none">
      {/* Row Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 mb-3 flex items-baseline justify-between">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight hover:text-neutral-200 cursor-pointer flex items-center space-x-2">
            <span>{title}</span>
          </h2>
          {subtitle && (
            <p className="text-xs md:text-sm text-gray-400 mt-0.5 font-light">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Horizontal Carousel Container */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-12">
        {/* Scrolling Items */}
        <div
          ref={rowRef}
          className="flex items-center space-x-3 md:space-x-4 overflow-x-auto no-scrollbar scroll-smooth py-3"
        >
          {items.map((item, idx) => {
            const isFav = favoriteIds.includes(item.id);
            const progress = (idx * 29 + 42) % 100;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredItemId(item.id)}
                onMouseLeave={() => setHoveredItemId(null)}
                onClick={() => {
                  playUiClick();
                  onMoreInfo(item);
                }}
                className="group/card relative flex-none w-56 sm:w-64 md:w-72 rounded shadow-2xl overflow-hidden bg-gradient-to-b from-[#333] to-[#111] cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-20 border border-neutral-800/80 hover:border-neutral-500"
              >
                {/* Cover Photo */}
                <div className="relative aspect-video w-full overflow-hidden bg-[#2a2a2a]">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-80" />

                  {/* Top Season / Episode Badge */}
                  <div className="absolute top-2 left-2 flex items-center space-x-1">
                    {item.season && (
                      <span className="px-1.5 py-0.5 bg-black/80 backdrop-blur-md border border-white/10 rounded text-[9px] font-bold text-gray-300 uppercase tracking-wider">
                        {item.season}
                      </span>
                    )}
                  </div>

                  {/* Match Score */}
                  <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 border border-green-500/40 rounded text-[11px] font-bold text-green-500">
                    {item.matchScore}% Match
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-3.5 flex flex-col justify-between">
                  <h3 className="text-sm font-bold text-white group-hover/card:text-[#E50914] transition-colors truncate">
                    {item.title}
                  </h3>

                  {/* Quick Metadata */}
                  <div className="flex items-center space-x-2 text-[11px] text-gray-400 font-medium my-1.5">
                    <span className="text-gray-200">{item.year}</span>
                    <span>•</span>
                    <span className="px-1 border border-gray-600 rounded text-[10px] text-gray-300">
                      {item.ageRating}
                    </span>
                    <span>•</span>
                    <span>{item.duration}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-2.5">
                    {item.tags?.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] text-gray-300 bg-neutral-800/80 px-1.5 py-0.5 rounded truncate max-w-[120px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Red Progress Indicator */}
                  <div className="w-full bg-neutral-800 h-1 mb-3 rounded-full overflow-hidden">
                    <div
                      className="bg-red-600 h-full rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-1 border-t border-neutral-800/80">
                    <div className="flex items-center space-x-1.5">
                      {/* Play Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playUiClick();
                          onPlay(item);
                        }}
                        title="Play Memory"
                        className="w-8 h-8 rounded-full bg-white text-black hover:bg-neutral-200 flex items-center justify-center transition-transform active:scale-90 shadow-md"
                      >
                        <Play size={14} fill="currentColor" className="ml-0.5" />
                      </button>

                      {/* Favorite / Heart */}
                      <button
                        onClick={(e) => toggleFavorite(e, item.id)}
                        title={isFav ? 'In My Favorites' : 'Add to Favorites'}
                        className={`w-8 h-8 rounded-full border border-neutral-600 hover:border-white flex items-center justify-center transition-colors ${
                          isFav ? 'bg-red-600/30 border-red-500 text-[#E50914]' : 'text-gray-300'
                        }`}
                      >
                        {isFav ? <Heart size={14} fill="currentColor" /> : <Plus size={14} />}
                      </button>
                    </div>

                    {/* Details Info Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playUiClick();
                        onMoreInfo(item);
                      }}
                      title="More Info & Episodes"
                      className="w-8 h-8 rounded-full border border-neutral-600 hover:border-white text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                    >
                      <Info size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
