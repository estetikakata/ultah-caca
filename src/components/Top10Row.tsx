import React, { useRef, useState } from 'react';
import { TopReason } from '../types';
import { playUiClick } from '../utils/audio';
import { ChevronLeft, ChevronRight, Heart, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Top10RowProps {
  girlfriendName: string;
  reasons: TopReason[];
}

export const Top10Row: React.FC<Top10RowProps> = ({
  girlfriendName,
  reasons,
}) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [selectedReason, setSelectedReason] = useState<TopReason | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    playUiClick();
    if (rowRef.current) {
      const scrollAmount = rowRef.current.clientWidth * 0.75;
      rowRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div id="top10" className="relative py-6 md:py-8 group/top10 select-none">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 mb-3 flex items-baseline justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded bg-[#E50914] text-[10px] font-black uppercase tracking-wider text-white shadow">
              TOP 10
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              10 Alasan Aku Cinta Kamu 💖
            </h2>
          </div>
          <p className="text-xs md:text-sm text-gray-400 mt-0.5 font-light">
            Terlebih dari semua alasan ini, semua yang ada di diri kamu membuat aku makin sayang sama kamu
          </p>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-12">
        {/* Left Nav */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 h-48 w-10 md:w-12 bg-black/70 hover:bg-black/95 text-white flex items-center justify-center opacity-0 group-hover/top10:opacity-100 transition-opacity rounded-r shadow-2xl"
          title="Scroll Left"
        >
          <ChevronLeft size={28} />
        </button>

        {/* List of 10 reasons */}
        <div
          ref={rowRef}
          className="flex items-center space-x-3 md:space-x-4 overflow-x-auto no-scrollbar scroll-smooth py-6 px-2"
        >
          {reasons.map((reason) => (
            <div
              key={reason.id}
              onClick={() => {
                playUiClick();
                setSelectedReason(reason);
              }}
              className="group/topCard relative flex-none flex items-center cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-20"
            >
              {/* Huge Outlined Number */}
              <div className="relative z-10 -mr-6 md:-mr-8 pointer-events-none">
                <span className="netflix-number group-hover/topCard:netflix-number-active transition-colors">
                  {reason.rank}
                </span>
              </div>

              {/* Poster Card */}
              <div className="w-36 sm:w-44 md:w-48 aspect-[2/3] rounded shadow-2xl overflow-hidden bg-gradient-to-b from-[#333] to-[#111] border border-neutral-800/80 group-hover/topCard:border-neutral-500 relative flex flex-col justify-end">
                <img
                  src={reason.photoUrl}
                  alt={reason.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover/topCard:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Content Overlay */}
                <div className="relative z-10 p-3">
                  <div className="flex items-center space-x-1 mb-1">
                    <Heart size={12} className="text-[#E50914]" fill="currentColor" />
                    <span className="text-[10px] uppercase font-bold text-gray-300">
                      Alasan {reason.rank}
                    </span>
                  </div>
                  <h3 className="text-xs md:text-sm font-bold text-white line-clamp-2 drop-shadow-md">
                    {reason.title}
                  </h3>
                  <p className="text-[10px] text-gray-300 mt-1 line-clamp-1 italic font-light">
                    {reason.shortSummary}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Nav */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 h-48 w-10 md:w-12 bg-black/70 hover:bg-black/95 text-white flex items-center justify-center opacity-0 group-hover/top10:opacity-100 transition-opacity rounded-l shadow-2xl"
          title="Scroll Right"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Selected Reason Detail Modal */}
      <AnimatePresence>
        {selectedReason && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            onClick={() => setSelectedReason(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-[#181818] border border-neutral-700 rounded-xl overflow-hidden shadow-2xl"
            >
              {/* Header Image */}
              <div className="relative aspect-video w-full">
                <img
                  src={selectedReason.photoUrl}
                  alt={selectedReason.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
                <button
                  onClick={() => setSelectedReason(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors border border-white/20"
                >
                  <X size={18} />
                </button>

                <div className="absolute bottom-4 left-6 flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#E50914] text-white font-bebas text-2xl flex items-center justify-center shadow-lg">
                    {selectedReason.rank}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                    Why You're One In A Million
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  {selectedReason.title}
                </h3>
                <p className="text-sm font-semibold text-[#E50914] mb-4">
                  {selectedReason.shortSummary}
                </p>
                <div className="bg-neutral-900/90 p-4 rounded-lg border border-neutral-800 text-neutral-300 text-sm md:text-base leading-relaxed font-serif-love italic">
                  {selectedReason.detail}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
