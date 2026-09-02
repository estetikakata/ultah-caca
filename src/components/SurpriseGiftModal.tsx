import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BirthdayAppConfig } from '../types';
import { playUiClick, playSuccessChime } from '../utils/audio';
import confetti from 'canvas-confetti';
import { X, Gift, Sparkles, Heart, Cake, Star } from 'lucide-react';

interface SurpriseGiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: BirthdayAppConfig;
}

export const SurpriseGiftModal: React.FC<SurpriseGiftModalProps> = ({
  isOpen,
  onClose,
  config,
}) => {
  const [isUnwrapped, setIsUnwrapped] = useState(false);

  if (!isOpen) return null;

  const handleUnwrap = () => {
    playSuccessChime();
    setIsUnwrapped(true);

    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#E50914', '#FF4D6D', '#FFB703', '#FFFFFF', '#10B981'],
    });
  };

  return (
    <AnimatePresence>
      <div
        id="surprise-gift-modal"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-lg w-full bg-[#181818] border border-neutral-700/80 rounded overflow-hidden shadow-2xl p-6 sm:p-8 text-center"
        >
          {/* Close button */}
          <button
            onClick={() => {
              playUiClick();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-800 text-gray-400 hover:text-white cursor-pointer"
          >
            <X size={18} />
          </button>

          {!isUnwrapped ? (
            /* Unwrapping Stage */
            <div className="py-8 space-y-6">
              <motion.div
                animate={{ rotate: [-3, 3, -3], scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="w-28 h-28 mx-auto rounded bg-gradient-to-tr from-amber-500 via-[#E50914] to-pink-600 flex items-center justify-center shadow-2xl relative cursor-pointer group"
                onClick={handleUnwrap}
              >
                <Gift size={54} className="text-white drop-shadow-lg" />
                <div className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider shadow">
                  Tap Me!
                </div>
              </motion.div>

              <div>
                <span className="text-xs uppercase font-bold text-amber-400 tracking-widest block mb-1">
                  VIP Birthday Exclusive
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  A Secret Gift Package For {config.girlfriendName}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 max-w-sm mx-auto mt-2 font-light">
                  Specially prepared by {config.boyfriendName}. Tap the box above to break the seal!
                </p>
              </div>

              <button
                onClick={handleUnwrap}
                className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded text-sm shadow-xl transition-transform active:scale-95 flex items-center space-x-2 mx-auto cursor-pointer"
              >
                <Sparkles size={16} />
                <span>Unwrap Birthday Surprise</span>
              </button>
            </div>
          ) : (
            /* Revealed Birthday Card */
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="py-4 space-y-5"
            >
              <div className="w-16 h-16 rounded-full bg-red-950/80 border border-[#E50914]/60 mx-auto flex items-center justify-center text-[#E50914] shadow-lg">
                <Cake size={32} />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
                  Surprise Unlocked!
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                  Happy Birthday, My Queen 👑
                </h3>
                <p className="text-xs text-gray-400 mt-1 font-light">
                  Streaming on LoveFlix • Lifetime VIP Access
                </p>
              </div>

              <div className="bg-[#222] border border-neutral-800 rounded p-5 text-left text-xs sm:text-sm text-gray-200 leading-relaxed font-serif-love italic space-y-3">
                <p>
                  "To the prettiest girl with the sweetest heart: may this year bring you all the endless joy, dream vacations, cozy cuddles, and delicious food you could ever wish for."
                </p>
                <p>
                  "Your official birthday present: Whatever you desire today is 100% granted. Check your 6 VIP vouchers in the main feed to redeem them!"
                </p>
                <p className="font-bold text-[#E50914] not-italic text-right pt-2 border-t border-neutral-800">
                  — All my love, {config.boyfriendName} ❤️
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded text-sm transition-colors shadow-lg cursor-pointer"
              >
                Back to Streaming
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
