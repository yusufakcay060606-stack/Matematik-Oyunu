/**
 * Web Audio API & MP3/WAV tabanlı Ses Efektleri Sentezleyicisi
 * - takeDamage.mp3 (Roblox Hasar Sesi)
 * - correctSound.wav (Doğru Cevap Sesi)
 * - wrongSound.wav (Yanlış Cevap Sesi)
 * - gameMusic.mp3 (Oyun İçi Arka Plan Müziği - Loop & Kısık Ses)
 * - winMusic.mp3 (Zafer Ekranı Müziği)
 * - Baloncuk Tıklama Sesleri (Bubble Pop)
 */

let audioCtx = null;
let soundEnabled = true;

// Ses Nesneleri (public/sounds/)
let robloxAudio = null;
let correctAudio = null;
let wrongAudio = null;
let gameBgAudio = null;
let winAudio = null;

if (typeof window !== 'undefined') {
  try {
    robloxAudio = new Audio('/sounds/takeDamage.mp3');
    robloxAudio.preload = 'auto';

    correctAudio = new Audio('/sounds/correctSound.wav');
    correctAudio.preload = 'auto';

    wrongAudio = new Audio('/sounds/wrongSound.wav');
    wrongAudio.preload = 'auto';

    gameBgAudio = new Audio('/sounds/gameMusic.mp3');
    gameBgAudio.preload = 'auto';
    gameBgAudio.loop = true;
    gameBgAudio.volume = 0.22; // Hafif kısık sesle loop

    winAudio = new Audio('/sounds/winMusic.mp3');
    winAudio.preload = 'auto';
    winAudio.volume = 0.25; // Zafer müziğinin sesini hafif kısık ve dengeli yap
  } catch (e) {
    console.warn('Audio init error:', e);
  }
}

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}


let isGameMusicActive = false;
let isMusicMuted = false;

export function toggleMusic() {
  isMusicMuted = !isMusicMuted;
  if (isMusicMuted) {
    stopGameMusic();
  } else {
    startGameMusic();
  }
  return !isMusicMuted;
}

export function isMusicPlaying() {
  return !isMusicMuted;
}

/**
 * Oyun İçi Arka Plan Müziğini Başlat (Hafif Kısık Ses & Loop)
 */
export function startGameMusic() {
  if (!soundEnabled || isMusicMuted || !gameBgAudio) return;
  try {
    isGameMusicActive = true;
    gameBgAudio.volume = 0.22;
    const p = gameBgAudio.play();
    if (p !== undefined) {
      p.then(() => {
        if ((!isGameMusicActive || isMusicMuted) && gameBgAudio) {
          gameBgAudio.pause();
          gameBgAudio.currentTime = 0;
        }
      }).catch((err) => {
        console.log('Audio autoplay policy:', err);
      });
    }
  } catch (e) {
    console.warn('Game music error:', e);
  }
}

/**
 * Oyun İçi Arka Plan Müziğini Durdur
 */
export function stopGameMusic() {
  isGameMusicActive = false;
  if (gameBgAudio) {
    try {
      gameBgAudio.pause();
      gameBgAudio.currentTime = 0;
    } catch {
      // ignore
    }
  }
}

/**
 * İkonik Roblox "Oof!" Hasar Yeme Sesi (takeDamage.mp3)
 */
export function playRobloxOof() {
  if (!soundEnabled) return;

  if (robloxAudio) {
    try {
      robloxAudio.currentTime = 0;
      const p = robloxAudio.play();
      if (p !== undefined) {
        p.catch(() => playRobloxOofSynthesized());
      }
      return;
    } catch (e) {
      console.warn('takeDamage playback error, fallback to synth:', e);
    }
  }

  playRobloxOofSynthesized();
}

function playRobloxOofSynthesized() {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const duration = 0.28;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    const formantFilter = ctx.createBiquadFilter();
    formantFilter.type = 'bandpass';
    formantFilter.frequency.setValueAtTime(650, now);
    formantFilter.frequency.linearRampToValueAtTime(450, now + duration);
    formantFilter.Q.setValueAtTime(3.5, now);

    osc1.type = 'sine';
    osc2.type = 'triangle';

    osc1.frequency.setValueAtTime(370, now);
    osc1.frequency.exponentialRampToValueAtTime(210, now + duration);

    osc2.frequency.setValueAtTime(370, now);
    osc2.frequency.exponentialRampToValueAtTime(210, now + duration);

    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.45, now + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc1.connect(formantFilter);
    osc2.connect(formantFilter);
    formantFilter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  } catch (e) {
    console.warn('Roblox synth error:', e);
  }
}

/**
 * Baloncuk Sesi (Buton Tıklama)
 */
export function playBubbleSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'sine';
    const startFreq = 380 + Math.random() * 80;
    const endFreq = startFreq + 450;

    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.09);

    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.25, now + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  } catch (e) {
    console.warn('Bubble sound error:', e);
  }
}

export function playPop() {
  playBubbleSound();
}

/**
 * Su tabancası fışkırtma efekti
 */
export function playWaterSquirt() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const duration = 0.5;

    const bufferSize = ctx.sampleRate * duration;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1600, now);
    filter.frequency.exponentialRampToValueAtTime(500, now + duration);
    filter.Q.setValueAtTime(2.5, now);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.01, now);
    gainNode.gain.linearRampToValueAtTime(0.35, now + 0.08);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    whiteNoise.start(now);
    whiteNoise.stop(now + duration);
  } catch (e) {
    console.warn('Water squirt error:', e);
  }
}

/**
 * Su çarpma efekti (takeDamage sesini çalar)
 */
export function playWaterHit() {
  playRobloxOof();
}

/**
 * Doğru cevap bildirimi (correctSound.wav)
 */
export function playCorrect() {
  if (!soundEnabled) return;

  if (correctAudio) {
    try {
      correctAudio.currentTime = 0;
      const p = correctAudio.play();
      if (p !== undefined) {
        p.catch(() => playCorrectSynthesized());
      }
      return;
    } catch (e) {
      console.warn('Correct sound playback error, fallback to synth:', e);
    }
  }

  playCorrectSynthesized();
}

function playCorrectSynthesized() {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.09);

      gain.gain.setValueAtTime(0.16, now + idx * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.09);
      osc.stop(now + idx * 0.09 + 0.22);
    });
  } catch (e) {
    console.warn('Correct audio error:', e);
  }
}

/**
 * Yanlış cevap bildirimi (wrongSound.wav)
 */
export function playWrong() {
  if (!soundEnabled) return;

  if (wrongAudio) {
    try {
      wrongAudio.currentTime = 0;
      const p = wrongAudio.play();
      if (p !== undefined) {
        p.catch(() => playWrongSynthesized());
      }
      return;
    } catch (e) {
      console.warn('Wrong sound playback error, fallback to synth:', e);
    }
  }

  playWrongSynthesized();
}

function playWrongSynthesized() {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.linearRampToValueAtTime(100, now + 0.25);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  } catch (e) {
    console.warn('Wrong audio error:', e);
  }
}

/**
 * Zafer ekranı müziği (Yalnızca winMusic.mp3 çalar, diğer tüm sesleri susturur)
 */
export function playVictory() {
  if (!soundEnabled) return;

  // Oyun arka plan müziğini ve diğer tüm sesleri kesin olarak durdur
  stopGameMusic();
  if (robloxAudio) {
    try {
      robloxAudio.pause();
      robloxAudio.currentTime = 0;
    } catch {}
  }
  if (correctAudio) {
    try {
      correctAudio.pause();
      correctAudio.currentTime = 0;
    } catch {}
  }
  if (wrongAudio) {
    try {
      wrongAudio.pause();
      wrongAudio.currentTime = 0;
    } catch {}
  }

  // Yalnızca winAudio çalsın (ikinci bir ses olmadan tek başına)
  if (winAudio) {
    try {
      winAudio.pause();
      winAudio.currentTime = 0;
      winAudio.volume = 0.25;
      winAudio.play().catch((e) => {
        console.warn('winAudio play error:', e);
      });
    } catch (e) {
      console.warn('Victory audio error:', e);
    }
  }
}

export function stopVictory() {
  if (winAudio) {
    try {
      winAudio.pause();
      winAudio.currentTime = 0;
    } catch {
      // ignore
    }
  }
}
