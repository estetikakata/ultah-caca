import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TriviaQuestion } from '../types';
import { playUiClick, playSuccessChime } from '../utils/audio';
import confetti from 'canvas-confetti';
import { X, CheckCircle, Trophy, RotateCcw } from 'lucide-react';

interface TriviaModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: TriviaQuestion[];
  girlfriendName: string;
}

export const TriviaModal: React.FC<TriviaModalProps> = ({
  isOpen,
  onClose,
  questions,
  girlfriendName,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  if (!isOpen) return null;

  const currentQ = questions[currentIndex] || questions[0];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    playUiClick();
    setSelectedAnswer(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctIndex || currentQ.correctIndex === -1;
    if (isCorrect) {
      setScore((s) => s + 1);
      playSuccessChime();
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#E50914', '#10B981', '#FFD166', '#FFFFFF'],
      });
    }
  };

  const handleNext = () => {
    playUiClick();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
      playSuccessChime();
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#E50914', '#FF4D6D', '#FFB703', '#FFFFFF'],
      });
    }
  };

  const handleRestart = () => {
    playUiClick();
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
  };

  return (
    <AnimatePresence>
      <div
        id="trivia-modal"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto"
        onClick={() => {
          if (!showResults || score >= 3) {
            onClose();
          }
        }}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-xl w-full bg-[#181818] border border-neutral-700 rounded-2xl overflow-hidden shadow-2xl my-auto"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-[#E50914] text-white flex items-center justify-center font-bold text-sm shadow-md">
                ❤️
              </span>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Special Quiz!
                </h3>
                <p className="text-[11px] text-neutral-400">
                  Seberapa kamu tahu tentang diri kamu dan KITA?
                </p>
              </div>
            </div>

            {/* Close button in header (hidden if failed results) */}
            {(!showResults || score >= 3) && (
              <button
                onClick={() => {
                  playUiClick();
                  onClose();
                }}
                className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Body */}
          <div className="p-5 sm:p-6">
            {!showResults ? (
              <div>
                {/* Progress Bar & Counter */}
                <div className="flex items-center justify-between text-xs text-neutral-400 font-semibold mb-2">
                  <span>Pertanyaan {currentIndex + 1} dari {questions.length}</span>
                  <span className="text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                    Skor: {score} Poin
                  </span>
                </div>
                <div className="w-full h-2 bg-neutral-800 rounded-full mb-5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#E50914] to-pink-500 transition-all duration-300 rounded-full"
                    style={{
                      width: `${((currentIndex + 1) / questions.length) * 100}%`,
                    }}
                  />
                </div>

                {/* Question Header */}
                <div className="mb-4">
                  <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                    {currentQ.question}
                  </h4>
                </div>

                {/* Clickable Options */}
                <div className="space-y-2.5 mb-5">
                  {currentQ.options.map((option, idx) => {
                    const isSelected = selectedAnswer === idx;
                    const isCorrect = idx === currentQ.correctIndex || currentQ.correctIndex === -1;
                    
                    let btnStyle = 'bg-neutral-900/90 hover:bg-neutral-800 hover:border-neutral-500 border-neutral-700 text-white cursor-pointer active:scale-[0.99]';

                    if (isAnswered) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold cursor-default';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-red-950/80 border-red-500 text-red-300 line-through cursor-default';
                      } else {
                        btnStyle = 'bg-neutral-900/40 border-neutral-800 text-neutral-500 cursor-default opacity-60';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isAnswered}
                        onClick={() => handleSelectOption(idx)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-neutral-800 text-neutral-300 text-xs flex items-center justify-center font-bold shrink-0 border border-neutral-700">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="leading-tight">{option}</span>
                        </div>
                        {isAnswered && isCorrect && (
                          <span className="flex items-center gap-1 text-emerald-400 text-xs font-bold shrink-0">
                            <CheckCircle size={16} /> Benar!
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Next / Finish Button */}
                {isAnswered && (
                  <button
                    onClick={handleNext}
                    className="w-full py-3 bg-[#E50914] hover:bg-red-700 text-white font-bold rounded-xl text-xs sm:text-sm transition-all transform active:scale-98 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{currentIndex < questions.length - 1 ? 'Pertanyaan Selanjutnya ▶' : 'Lihat Hasil Kecocokan Cinta 🏆'}</span>
                  </button>
                )}
              </div>
            ) : (
              /* Final Results Screen */
              <div className="text-center py-4 space-y-4">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto flex items-center justify-center ${
                  score >= 3
                    ? 'bg-gradient-to-tr from-amber-500/20 to-red-500/30 border border-amber-500/40 shadow-lg shadow-red-950/50'
                    : 'bg-gradient-to-tr from-red-900/40 to-red-600/30 border border-red-500/50 shadow-lg shadow-red-950/60'
                }`}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    {score >= 3 ? (
                      <Trophy className="text-amber-400 w-8 h-8 sm:w-10 sm:h-10" />
                    ) : (
                      <X className="text-red-500 w-8 h-8 sm:w-10 sm:h-10" strokeWidth={3} />
                    )}
                  </motion.div>
                </div>

                <div>
                  {score < 3 && (
                    <span className="inline-block px-3 py-1 bg-red-950/80 border border-red-800 text-red-400 text-xs rounded-full font-bold uppercase tracking-wider mb-2">
                      GAGAL BESAR!
                    </span>
                  )}
                  <h4 className="text-xl sm:text-2xl font-bold text-white mb-1">
                    {Math.min(100, score * 25)}% BENAR!
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300">
                    Kamu berhasil menjawab <span className="text-emerald-400 font-bold">{score} dari {questions.length}</span> pertanyaan{score === questions.length ? ' dengan benar!' : ''}!
                  </p>
                </div>

                <div className="bg-neutral-900/90 p-5 rounded-xl border border-neutral-800 text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                  {score >= 3 ? (
                    `"SELAMAT KAMU BERHASIL LULUS KUIS SPESIAL ULANG TAHUN CACA YANG KE -18, AKU AKAN SELALU SAYANG SAMA KAMU GAPEDULI NILAINYA BERAPA JUGAK!"`
                  ) : (
                    `"WOI MASA SALAH SIH?! ULANG LAGI AH TEU BISAEUN!!"`
                  )}
                </div>

                <div className="pt-2">
                  {score >= 3 ? (
                    <div className="flex gap-3">
                      <button
                        id="btn-retry-trivia"
                        onClick={handleRestart}
                        className="flex-1 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-neutral-700"
                      >
                        <RotateCcw size={14} />
                        <span>Main Lagi</span>
                      </button>
                      <button
                        id="btn-close-trivia-completed"
                        onClick={onClose}
                        className="flex-1 py-2.5 bg-[#E50914] hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                      >
                        Tutup
                      </button>
                    </div>
                  ) : (
                    <button
                      id="btn-retry-trivia"
                      onClick={handleRestart}
                      className="w-full py-3 bg-[#E50914] hover:bg-red-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-950/40"
                    >
                      <RotateCcw size={16} />
                      <span>ULANGI KUIS!</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
