import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MediaItem, MediaEpisode } from '../types';
import { playUiClick } from '../utils/audio';
import {
  X,
  Play,
  Heart,
  Plus,
  Check,
  Calendar,
  MapPin,
  Sparkles,
  Film,
  Users,
  Award,
} from 'lucide-react';

interface MediaDetailModalProps {
  item: MediaItem | null;
  onClose: () => void;
  onPlayEpisode: (item: MediaItem, episode?: MediaEpisode) => void;
}

export const MediaDetailModal: React.FC<MediaDetailModalProps> = ({
  item,
  onClose,
  onPlayEpisode,
}) => {
  const [activeTab, setActiveTab] = useState<'episodes' | 'cast' | 'behindTheScenes'>('episodes');
  const [isInList, setIsInList] = useState(true);

  if (!item) return null;

  return (
    <AnimatePresence>
      <div
        id="media-detail-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 md:p-6 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-4xl w-full bg-[#181818] border border-neutral-700/80 rounded-xl overflow-hidden shadow-2xl my-auto max-h-[90vh] flex flex-col"
        >
          {/* Close Button */}
          <button
            id="btn-close-media-modal"
            onClick={() => {
              playUiClick();
              onClose();
            }}
            className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-[#181818]/80 hover:bg-neutral-800 text-white flex items-center justify-center transition-colors border border-white/20"
          >
            <X size={20} />
          </button>

          {/* Hero Header Area */}
          <div className="relative aspect-video sm:h-96 w-full shrink-0 overflow-hidden bg-[#2a2a2a]">
            <img
              src={item.backdropImage || item.coverImage}
              alt={item.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#181818] via-[#181818]/60 to-transparent w-3/4" />

            {/* Floating Title & CTAs */}
            <div className="absolute bottom-6 left-6 right-6 z-10">
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-2 py-0.5 rounded bg-[#E50914] text-[10px] font-black uppercase tracking-wider text-white shadow">
                  ORIGINAL
                </span>
                {item.season && (
                  <span className="text-xs font-semibold text-gray-300">
                    {item.season}
                  </span>
                )}
              </div>

              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase leading-tight drop-shadow-2xl mb-4">
                {item.title}
              </h2>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    playUiClick();
                    onPlayEpisode(item);
                  }}
                  className="flex items-center space-x-2 px-6 py-2.5 bg-white text-black hover:bg-neutral-200 rounded font-bold text-sm shadow-2xl transition-transform active:scale-95 cursor-pointer"
                >
                  <Play size={18} fill="currentColor" />
                  <span>Play All Memories</span>
                </button>

                <button
                  onClick={() => {
                    playUiClick();
                    setIsInList(!isInList);
                  }}
                  className="w-10 h-10 rounded-full border border-gray-400 hover:border-white bg-black/50 text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="My List"
                >
                  {isInList ? <Check size={18} className="text-emerald-400" /> : <Plus size={18} />}
                </button>
              </div>
            </div>
          </div>

          {/* Modal Body & Metadata */}
          <div className="p-6 overflow-y-auto space-y-6">
            {/* Metadata Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-3">
                <div className="flex flex-wrap items-center space-x-3 text-xs md:text-sm font-semibold text-gray-300">
                  <span className="text-green-500 font-bold">{item.matchScore}% Match</span>
                  <span className="text-gray-400">{item.year}</span>
                  <span className="px-1.5 py-0.5 border border-gray-600 rounded text-[11px] text-gray-300">
                    {item.ageRating}
                  </span>
                  <span>{item.duration}</span>
                  <span className="px-2 py-0.5 bg-red-950/60 border border-red-800/60 text-red-300 rounded text-xs flex items-center space-x-1">
                    <Heart size={12} fill="currentColor" />
                    <span>Certified Soulmate Edition</span>
                  </span>
                </div>

                <p className="text-sm md:text-base text-gray-200 leading-relaxed font-light">
                  {item.description}
                </p>

                {/* Romantic Note Quote */}
                {item.romanticNote && (
                  <div className="bg-[#222] border-l-4 border-[#E50914] p-4 rounded-r text-sm text-gray-300 italic font-serif-love">
                    "{item.romanticNote}"
                  </div>
                )}
              </div>

              {/* Cast & Crew sidebox */}
              <div className="space-y-2 text-xs text-gray-400 border-t md:border-t-0 md:border-l border-neutral-800 pt-4 md:pt-0 md:pl-6">
                <div>
                  <span className="text-gray-500 font-semibold">Starring: </span>
                  <span className="text-gray-200">
                    {item.cast?.map((c) => `${c.name} (${c.role})`).join(', ')}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 font-semibold">Genres: </span>
                  <span className="text-gray-200">{item.tags?.join(', ')}</span>
                </div>
                <div>
                  <span className="text-gray-500 font-semibold">Mood: </span>
                  <span className="text-gray-200">Heartwarming, Romantic, Adorable</span>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-neutral-800 flex space-x-6 text-sm font-bold pt-2">
              <button
                onClick={() => setActiveTab('episodes')}
                className={`pb-3 relative transition-colors cursor-pointer ${
                  activeTab === 'episodes'
                    ? 'text-white border-b-2 border-[#E50914]'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                Memories & Episodes ({item.episodes?.length || 0})
              </button>
              <button
                onClick={() => setActiveTab('cast')}
                className={`pb-3 relative transition-colors cursor-pointer ${
                  activeTab === 'cast'
                    ? 'text-white border-b-2 border-[#E50914]'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                Cast & Credits
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'episodes' && (
              <div className="space-y-4">
                {item.episodes && item.episodes.length > 0 ? (
                  item.episodes.map((ep, idx) => (
                    <div
                      key={ep.id || idx}
                      onClick={() => {
                        playUiClick();
                        onPlayEpisode(item, ep);
                      }}
                      className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 rounded bg-[#222] hover:bg-[#2a2a2a] border border-neutral-800 hover:border-neutral-600 transition-colors cursor-pointer gap-4 shadow"
                    >
                      <div className="flex items-start sm:items-center space-x-4">
                        {/* Number */}
                        <span className="text-lg font-bebas text-gray-500 group-hover:text-white w-6 shrink-0 text-center">
                          {idx + 1}
                        </span>

                        {/* Thumbnail */}
                        <div className="relative w-28 h-18 sm:w-36 sm:h-20 rounded overflow-hidden bg-neutral-800 shrink-0">
                          <img
                            src={ep.photoUrl}
                            alt={ep.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 flex items-center justify-center transition-colors">
                            <div className="w-8 h-8 rounded-full bg-black/70 border border-white/40 flex items-center justify-center text-white">
                              <Play size={14} fill="currentColor" className="ml-0.5" />
                            </div>
                          </div>
                        </div>

                        {/* Details */}
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="text-sm font-bold text-white group-hover:text-[#E50914] transition-colors">
                              {ep.title}
                            </h4>
                            {ep.date && (
                              <span className="text-[10px] text-gray-400 bg-neutral-800 px-1.5 py-0.5 rounded">
                                {ep.date}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-400 mt-1 line-clamp-2 font-light">
                            {ep.description}
                          </p>
                          {ep.location && (
                            <span className="inline-flex items-center space-x-1 text-[10px] text-gray-500 mt-1">
                              <MapPin size={10} />
                              <span>{ep.location}</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Duration */}
                      <span className="text-xs font-semibold text-gray-400 shrink-0 self-end sm:self-center">
                        {ep.duration}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 py-6 text-center">
                    Feature length special memory. Click Play to start streaming!
                  </p>
                )}
              </div>
            )}

            {activeTab === 'cast' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
                {item.cast?.map((c, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 p-3 bg-[#222] rounded border border-neutral-800"
                  >
                    <div className="w-10 h-10 rounded-full bg-red-950/80 border border-red-800/60 flex items-center justify-center text-[#E50914] shrink-0 font-bold">
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{c.name}</h4>
                      <p className="text-xs text-gray-400 font-light">{c.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
