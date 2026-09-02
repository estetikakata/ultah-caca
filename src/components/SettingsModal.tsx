import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BirthdayAppConfig, LoveLetterData, MediaItem } from '../types';
import { playUiClick, playSuccessChime } from '../utils/audio';
import { X, Save, RotateCcw, Sparkles, User, Image, Heart, Film, Plus } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: BirthdayAppConfig;
  letter: LoveLetterData;
  onSave: (newConfig: BirthdayAppConfig, newLetter: LoveLetterData) => void;
  onReset: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  letter,
  onSave,
  onReset,
}) => {
  const [formData, setFormData] = useState<BirthdayAppConfig>({ ...config });
  const [letterData, setLetterData] = useState<LoveLetterData>({ ...letter });
  const [activeTab, setActiveTab] = useState<'general' | 'letter' | 'photos'>('general');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    playSuccessChime();
    onSave(formData, letterData);
    onClose();
  };

  const handleAddPhoto = () => {
    if (!newPhotoUrl.trim()) return;
    playUiClick();
    setLetterData((prev) => ({
      ...prev,
      photos: [...(prev.photos || []), newPhotoUrl.trim()],
    }));
    setNewPhotoUrl('');
  };

  const handleRemovePhoto = (index: number) => {
    playUiClick();
    setLetterData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  return (
    <AnimatePresence>
      <div
        id="settings-modal"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-2xl w-full bg-[#181818] border border-neutral-700 rounded-2xl overflow-hidden shadow-2xl my-auto max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#E50914] text-white flex items-center justify-center font-bold">
                🎬
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  Director's Cut • Customize Story
                </h3>
                <p className="text-xs text-neutral-400">
                  Tailor names, dates, photos, and messages for her special day.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                playUiClick();
                onClose();
              }}
              className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-neutral-800 px-6 pt-3 gap-6 text-xs sm:text-sm font-semibold bg-neutral-900/50">
            <button
              onClick={() => setActiveTab('general')}
              className={`pb-3 transition-colors ${
                activeTab === 'general'
                  ? 'text-[#E50914] border-b-2 border-[#E50914]'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Names & Dates
            </button>
            <button
              onClick={() => setActiveTab('letter')}
              className={`pb-3 transition-colors ${
                activeTab === 'letter'
                  ? 'text-[#E50914] border-b-2 border-[#E50914]'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Love Letter Text
            </button>
            <button
              onClick={() => setActiveTab('photos')}
              className={`pb-3 transition-colors ${
                activeTab === 'photos'
                  ? 'text-[#E50914] border-b-2 border-[#E50914]'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Photos & Backdrops
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
            {activeTab === 'general' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-300 font-medium mb-1">
                      Girlfriend's Name
                    </label>
                    <input
                      type="text"
                      value={formData.girlfriendName}
                      onChange={(e) =>
                        setFormData({ ...formData, girlfriendName: e.target.value })
                      }
                      placeholder="e.g. Sarah, Emma, My Love"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#E50914]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 font-medium mb-1">
                      Boyfriend's Name
                    </label>
                    <input
                      type="text"
                      value={formData.boyfriendName}
                      onChange={(e) =>
                        setFormData({ ...formData, boyfriendName: e.target.value })
                      }
                      placeholder="e.g. Azka"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#E50914]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-300 font-medium mb-1">
                      App Logo / Title
                    </label>
                    <input
                      type="text"
                      value={formData.appName}
                      onChange={(e) =>
                        setFormData({ ...formData, appName: e.target.value })
                      }
                      placeholder="e.g. LOVEFLIX, SARAHFLIX"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#E50914]"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 font-medium mb-1">
                      Milestone Badge Text
                    </label>
                    <input
                      type="text"
                      value={formData.relationshipMilestone}
                      onChange={(e) =>
                        setFormData({ ...formData, relationshipMilestone: e.target.value })
                      }
                      placeholder="e.g. 1,414 Days Together, 4 Years of Magic"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#E50914]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Hero Featured Billboard Synopsis
                  </label>
                  <textarea
                    rows={3}
                    value={formData.heroDescription}
                    onChange={(e) =>
                      setFormData({ ...formData, heroDescription: e.target.value })
                    }
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#E50914]"
                  />
                </div>
              </div>
            )}

            {activeTab === 'letter' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Letter Title
                  </label>
                  <input
                    type="text"
                    value={letterData.title}
                    onChange={(e) =>
                      setLetterData({ ...letterData, title: e.target.value })
                    }
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#E50914]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Salutation (Dear...)
                  </label>
                  <input
                    type="text"
                    value={letterData.dearName}
                    onChange={(e) =>
                      setLetterData({ ...letterData, dearName: e.target.value })
                    }
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#E50914]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Letter Paragraphs (One per line)
                  </label>
                  <textarea
                    rows={5}
                    value={letterData.paragraphs.join('\n\n')}
                    onChange={(e) =>
                      setLetterData({
                        ...letterData,
                        paragraphs: e.target.value.split('\n\n').filter((p) => p.trim()),
                      })
                    }
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#E50914]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Closing Sign-off
                  </label>
                  <input
                    type="text"
                    value={letterData.closing}
                    onChange={(e) =>
                      setLetterData({ ...letterData, closing: e.target.value })
                    }
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#E50914]"
                  />
                </div>
              </div>
            )}

            {activeTab === 'photos' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Hero Billboard Background URL
                  </label>
                  <input
                    type="text"
                    value={formData.heroBackdrop}
                    onChange={(e) =>
                      setFormData({ ...formData, heroBackdrop: e.target.value })
                    }
                    placeholder="https://..."
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#E50914]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Memory Gallery Photos (Image URLs)
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={newPhotoUrl}
                      onChange={(e) => setNewPhotoUrl(e.target.value)}
                      placeholder="Paste image URL here..."
                      className="flex-1 bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-white text-xs focus:outline-none focus:border-[#E50914]"
                    />
                    <button
                      type="button"
                      onClick={handleAddPhoto}
                      className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
                    >
                      <Plus size={14} />
                      <span>Add</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {letterData.photos?.map((url, i) => (
                      <div
                        key={i}
                        className="relative aspect-square rounded-md overflow-hidden bg-neutral-800 group"
                      >
                        <img
                          src={url}
                          alt="Photo"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(i)}
                          className="absolute top-1 right-1 bg-red-600/80 hover:bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  playUiClick();
                  onReset();
                  onClose();
                }}
                className="px-3 py-2 text-xs text-neutral-400 hover:text-red-400 flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw size={13} />
                <span>Reset to Defaults</span>
              </button>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg font-semibold text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E50914] hover:bg-red-700 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 shadow-lg transition-transform active:scale-95"
                >
                  <Save size={14} />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
