/**
 * Web Audio API Sound Synthesizers & HTML5 Audio
 * Generates Netflix iconic "Ta-Dum", UI clicks, celebration chimes, and plays background MP3.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play authentic Netflix-style "TA-DUM" cinematic sound
 */
export function playNetflixTadum() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // 1. Deep Sub Bass Impact (The "TA")
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(80, now);
    subOsc.frequency.exponentialRampToValueAtTime(35, now + 0.6);
    subGain.gain.setValueAtTime(0.7, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 0.8);

    // 2. Mid Cello / Brass Chime (The "DUM")
    const midOsc1 = ctx.createOscillator();
    const midGain1 = ctx.createGain();
    midOsc1.type = 'sawtooth';
    midOsc1.frequency.setValueAtTime(110, now + 0.18);
    midOsc1.frequency.exponentialRampToValueAtTime(82.4, now + 1.2);
    midGain1.gain.setValueAtTime(0.001, now);
    midGain1.gain.setValueAtTime(0.4, now + 0.18);
    midGain1.gain.exponentialRampToValueAtTime(0.001, now + 1.8);
    midOsc1.connect(midGain1);
    midGain1.connect(ctx.destination);
    midOsc1.start(now + 0.18);
    midOsc1.stop(now + 1.8);

    // 3. Shimmer Chord (Cinematic bloom)
    const chordFreqs = [220, 277.18, 329.63, 440, 554.37];
    chordFreqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + 0.22);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.setValueAtTime(0.08 / (i + 1), now + 0.22);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2 + i * 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + 0.22);
      osc.stop(now + 2.5);
    });
  } catch (err) {
    console.warn('Audio playback not allowed or failed:', err);
  }
}

/**
 * Play a light UI click / hover sound
 */
export function playUiClick() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(480, now);
    osc.frequency.exponentialRampToValueAtTime(240, now + 0.06);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.06);
  } catch {
    // ignore
  }
}

/**
 * Play celebratory chime when coupon is redeemed or quiz answered correctly
 */
export function playSuccessChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = now + index * 0.09;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.18, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.45);
    });
  } catch {
    // ignore
  }
}

// ==========================================
// MP3 BACKGROUND MUSIC PLAYER
// ==========================================
let bgAudioElement: HTMLAudioElement | null = null;

/**
 * Play romantic background MP3 music
 */
export function startAmbientMusic(volume = 0.2) {
  try {
    if (!bgAudioElement) {
      // Link lagu.mp3 dari GitHub
      bgAudioElement = new Audio('https://raw.githubusercontent.com/estetikakata/ultah-caca/main/lagu.mp3');
      
      // Mengatur agar lagu diputar berulang-ulang
      bgAudioElement.loop = true; 
    }
    bgAudioElement.volume = volume;
    
    // Perintah untuk memutar lagu
    bgAudioElement.play().catch(err => console.warn('Menunggu interaksi klik dari user untuk memutar lagu:', err));
  } catch (err) {
    console.warn('Gagal memutar musik latar:', err);
  }
}

export function stopAmbientMusic() {
  if (bgAudioElement) {
    bgAudioElement.pause();
  }
}