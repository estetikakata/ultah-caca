import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MediaItem } from '../types';
import { playUiClick, startAmbientMusic, stopAmbientMusic } from '../utils/audio';
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Sparkles,
} from 'lucide-react';

interface VideoMemoryPlayerProps {
  item: MediaItem;
  onClose: () => void;
  girlfriendName: string;
}

export const VideoMemoryPlayer: React.FC<VideoMemoryPlayerProps> = ({
  item,
  onClose,
  girlfriendName: _girlfriendName,
}) => {
  // Gunakan useRef untuk mengontrol elemen video asli
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Hentikan lagu latar saat video diputar agar suaranya tidak tabrakan
  useEffect(() => {
    stopAmbientMusic();
    return () => {
      // Putar kembali lagu latar dengan volume pelan saat video ditutup
      startAmbientMusic(0.2);
    };
  }, []);

  // Sembunyikan kontrol otomatis jika video sedang jalan dan mouse diam
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, [showControls, isPlaying]);

  // Fungsi Play & Pause
  const togglePlay = () => {
    playUiClick();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Fungsi Skip / Rewind 10 detik
  const skipTime = (seconds: number) => {
    playUiClick();
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  // Update progress bar sesuai waktu asli video
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setCurrentTime(current);
      setProgress((current / total) * 100);
    }
  };

  // Ambil durasi asli video saat video berhasil dimuat
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Fungsi klik pada garis waktu (Scrubber)
  const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setProgress((clickX / rect.width) * 100);
    }
  };

  // Ubah detik menjadi format MM:SS
  const formatSeconds = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return '0:00';
    const min = Math.floor(timeInSeconds / 60);
    const sec = Math.floor(timeInSeconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  // Fungsi Mute/Unmute
  const toggleMute = () => {
    playUiClick();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div
      id="video-player-container"
      onMouseMove={() => setShowControls(true)}
      onClick={() => setShowControls(true)}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center select-none overflow-hidden"
    >
      {/* Pemutar Video Asli */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black">
        <div className="relative w-full aspect-video max-h-screen max-w-full flex items-center justify-center overflow-hidden shadow-2xl bg-neutral-950">
          
          <video
            ref={videoRef}
            src="https://www.dropbox.com/scl/fi/t21rsw8hnsd0njq4tc3y4/videocaca.mp4?rlkey=uyj07v08wy2vsaka7a1zj1qkd&st=dkh8y3hs&raw=1" 
            className="w-full h-full object-contain aspect-video"
            autoPlay
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
          />

          {/* Ambient Cinema Lighting Effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none opacity-40" />
        </div>
      </div>

      {/* Top Controls Overlay */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 inset-x-0 z-40 bg-gradient-to-b from-black/90 via-black/50 to-transparent p-6 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  playUiClick();
                  onClose();
                }}
                className="p-2 rounded-full hover:bg-neutral-800 text-white transition-colors cursor-pointer"
                title="Back"
              >
                <ArrowLeft size={28} />
              </button>
              <div>
                <h3 className="text-base md:text-xl font-bold text-white tracking-wide">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-neutral-400">
                  Special Movie by Azka
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Big Center Play/Pause on click */}
      {!isPlaying && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          className="absolute z-30 w-20 h-20 rounded-full bg-black/70 border border-white/30 flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform shadow-2xl"
        >
          <Play size={36} fill="currentColor" className="ml-1 text-white" />
        </div>
      )}

      {/* Bottom Scrubber & Video Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-0 inset-x-0 z-40 bg-gradient-to-t from-black/95 via-black/70 to-transparent px-6 py-4 flex flex-col gap-2"
          >
            {/* Scrubber Bar */}
            <div
              className="relative w-full h-2 bg-neutral-700 hover:h-3 rounded-full cursor-pointer transition-all flex items-center group/scrubber"
              onClick={handleScrubberClick}
            >
              <div
                className="h-full bg-[#E50914] rounded-full relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow opacity-0 group-hover/scrubber:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* Bottom Controls Row */}
            <div className="flex items-center justify-between text-white text-sm mt-1">
              <div className="flex items-center gap-4">
                {/* Play / Pause */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  className="p-1.5 hover:text-[#E50914] transition-colors cursor-pointer"
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} fill="currentColor" />}
                </button>

                {/* Rewind 10s */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    skipTime(-10);
                  }}
                  className="p-1.5 hover:text-[#E50914] transition-colors cursor-pointer flex items-center gap-0.5 text-xs text-neutral-300"
                  title="Rewind 10s"
                >
                  <RotateCcw size={18} />
                  <span>10s</span>
                </button>

                {/* Forward 10s */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    skipTime(10);
                  }}
                  className="p-1.5 hover:text-[#E50914] transition-colors cursor-pointer flex items-center gap-0.5 text-xs text-neutral-300"
                  title="Forward 10s"
                >
                  <RotateCw size={18} />
                  <span>10s</span>
                </button>

                {/* Volume */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                  }}
                  className="p-1.5 hover:text-[#E50914] transition-colors cursor-pointer"
                  title={isMuted ? 'Unmute video' : 'Mute video'}
                >
                  {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
                </button>

                {/* Timestamp Asli Video */}
                <span className="text-xs text-neutral-400 font-mono">
                  {formatSeconds(currentTime)} / {formatSeconds(duration)}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
                  <Sparkles size={14} />
                  <span>Original Movie</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};