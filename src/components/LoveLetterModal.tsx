import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LoveLetterData } from '../types';
import { playUiClick } from '../utils/audio';
import { X, Sparkles } from 'lucide-react';

interface LoveLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  letter: LoveLetterData;
  girlfriendName: string;
  boyfriendName: string;
}

export const LoveLetterModal: React.FC<LoveLetterModalProps> = ({
  isOpen,
  onClose,
  letter,
  girlfriendName,
  boyfriendName,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        id="love-letter-modal"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-lg p-3 sm:p-6 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-3xl w-full bg-[#181818] border border-red-900/40 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(229,9,20,0.3)] my-auto max-h-[92vh] flex flex-col"
        >
          {/* Top Bar with actions */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-red-950 via-[#181818] to-neutral-900 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[#E50914] text-lg">❤️</span>
              <span className="font-bebas text-xl md:text-2xl tracking-wider text-white">
                Surat Cinta ke- 18 Kamu
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  playUiClick();
                  onClose();
                }}
                className="p-2 rounded-full hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Letter Body (Parchment Styled Card) */}
          <div className="p-6 sm:p-10 overflow-y-auto space-y-6 bg-radial from-[#221012] to-[#141414]">
            {/* Header / Date */}
            <div className="flex items-start justify-between border-b border-red-900/30 pb-4 gap-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#E50914] block">
                  HADIAH SPESIAL DARI NETFLIX
                </span>
                <h3 className="font-serif-love text-2xl sm:text-3xl font-bold text-white mt-1">
                  {letter.title}
                </h3>
              </div>
              <span className="text-xs text-neutral-400 font-mono pt-0.5 shrink-0">{letter.date}</span>
            </div>

            {/* Salutation */}
            <div className="font-serif-love text-xl sm:text-2xl text-pink-200 font-semibold italic">
              {letter.dearName || `My Dearest ${girlfriendName},`}
            </div>

            {/* Paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-neutral-200 leading-relaxed font-serif-love">
              {letter.paragraphs.map((p, idx) => (
                <p key={idx} className="indent-4">
                  {p}
                </p>
              ))}
            </div>

            {/* Closing */}
            <div className="pt-6 border-t border-red-900/30 space-y-2">
              <p className="text-sm italic text-neutral-300 font-serif-love">
                {letter.closing}
              </p>
              <p className="font-serif-love text-lg font-bold text-[#E50914]">
                {letter.fromName || `Forever Yours, ${boyfriendName} ❤️`}
              </p>
            </div>

            {/* Photo Collage Strip */}
            {letter.photos && letter.photos.length > 0 && (
              <div className="pt-4">
                <p className="text-xs uppercase tracking-wider font-bold text-neutral-400 mb-3 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-[#E50914]" />
                  <span>FOTO TERCANTIK KAMU</span>
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {letter.photos.map((photo, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-lg overflow-hidden border border-neutral-700/80 shadow-md bg-neutral-900 group"
                    >
                      <img
                        src={photo}
                        alt="Memory"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
