import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playNetflixTadum } from '../utils/audio';
import { Sparkles, Heart } from 'lucide-react';

interface NetflixIntroProps {
  onComplete: () => void;
  appName?: string;
}

export const NetflixIntro: React.FC<NetflixIntroProps> = ({
  onComplete,
  appName = 'LOVEFLIX',
}) => {
  const [stage, setStage] = useState<'initial' | 'tadum' | 'zoom' | 'done'>('initial');

  useEffect(() => {
    // Stage 1: Trigger sound and letter animation after slight delay
    const t1 = setTimeout(() => {
      setStage('tadum');
      playNetflixTadum();
    }, 400);

    // Stage 2: Zoom in burst
    const t2 = setTimeout(() => {
      setStage('zoom');
    }, 2800);

    // Stage 3: Complete
    const t3 = setTimeout(() => {
      setStage('done');
      onComplete();
    }, 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        id="netflix-intro-overlay"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#141414] overflow-hidden select-none cursor-pointer"
        onClick={() => {
          playNetflixTadum();
          onComplete();
        }}
      >
        {/* Ambient background glow */}
        <div className="absolute inset-0 bg-radial from-[#e50914]/20 via-transparent to-black pointer-events-none" />

        {/* Floating Heart Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                y: '110vh',
                x: `${10 + (i * 8)}vw`,
                scale: 0.5 + Math.random() * 0.8,
                opacity: 0,
              }}
              animate={{
                y: '-20vh',
                opacity: [0, 0.8, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 1.5,
                ease: 'linear',
              }}
              className="absolute text-[#e50914]/40"
            >
              <Heart fill="currentColor" size={24} />
            </motion.div>
          ))}
        </div>

        {/* Central Logo Container */}
        <div className="relative flex flex-col items-center justify-center z-10">
          {/* Animated Ribbon N / Heart Icon */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{
              scale: stage === 'zoom' ? 3.5 : stage === 'tadum' ? 1.05 : 0.8,
              opacity: stage === 'zoom' ? 0 : 1,
            }}
            transition={{
              duration: stage === 'zoom' ? 0.9 : 1.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-col items-center"
          >
            {/* Netflix Stylized Red "N" with Heart Emblem */}
            <div className="relative w-28 h-40 mb-6 flex items-center justify-center">
              {/* Left Bar */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute left-2 top-0 bottom-0 w-6 bg-gradient-to-b from-[#e50914] to-[#b81d24] rounded-xs shadow-[0_0_20px_rgba(229,9,20,0.8)] origin-bottom"
              />
              {/* Diagonal Ribbon */}
              <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="absolute inset-x-2 top-0 bottom-0 w-7 mx-auto bg-gradient-to-tr from-[#9b0d13] via-[#e50914] to-[#ff2b37] rounded-xs shadow-2xl -skew-x-28 origin-top z-10"
              />
              {/* Right Bar */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="absolute right-2 top-0 bottom-0 w-6 bg-gradient-to-b from-[#b81d24] to-[#e50914] rounded-xs shadow-[0_0_20px_rgba(229,9,20,0.8)] origin-top"
              />

              {/* Glowing Heart at the center of N */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.4, 1], opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.5 }}
                className="absolute z-20 text-white drop-shadow-[0_0_15px_#ffffff]"
              >
                <Heart size={32} fill="#ffffff" className="text-white animate-pulse" />
              </motion.div>
            </div>

            {/* Glowing Brand Title */}
            <motion.h1
              initial={{ opacity: 0, y: 15, letterSpacing: '0.1em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0.25em' }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="font-bebas text-5xl md:text-7xl font-bold tracking-widest text-[#e50914] drop-shadow-[0_0_35px_rgba(229,9,20,0.9)]"
            >
              {appName}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="flex items-center gap-2 mt-2 text-xs md:text-sm font-medium tracking-widest uppercase text-neutral-400"
            >
              <Sparkles size={14} className="text-[#e50914]" />
              <span>A Birthday Original Production</span>
              <Sparkles size={14} className="text-[#e50914]" />
            </motion.div>
          </motion.div>
        </div>

        {/* Skip button */}
        <button
          id="btn-skip-intro"
          onClick={(e) => {
            e.stopPropagation();
            playNetflixTadum();
            onComplete();
          }}
          className="absolute bottom-8 right-8 px-5 py-2 text-xs md:text-sm uppercase tracking-wider text-neutral-400 hover:text-white border border-neutral-700 hover:border-neutral-400 bg-black/60 backdrop-blur-sm rounded transition-all duration-200"
        >
          Skip Intro ▶
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
