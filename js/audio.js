/* ==============================================================
   AUDIO ENGINE MODULE (AUTOPLAY + WEB AUDIO SYNTHESIZER)
   ============================================================== */

const AudioContextClass = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function initAudioContext() {
  if (!audioCtx) {
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

// Temple Bell Chime
function playTempleBell() {
  initAudioContext();
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 Bell
  osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 1.2);
  gain.gain.setValueAtTime(0.32, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.8);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 1.8);
}

// Authentic Conch Shell (शंखनाद) Synthesizer
function playShankhNaad() {
  initAudioContext();
  if (!audioCtx) return;
  const osc1 = audioCtx.createOscillator();
  const osc2 = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc1.type = 'sawtooth';
  osc2.type = 'triangle';

  osc1.frequency.setValueAtTime(220, audioCtx.currentTime);
  osc1.frequency.exponentialRampToValueAtTime(345, audioCtx.currentTime + 0.8);
  osc1.frequency.exponentialRampToValueAtTime(290, audioCtx.currentTime + 2.3);

  osc2.frequency.setValueAtTime(440, audioCtx.currentTime);
  osc2.frequency.exponentialRampToValueAtTime(690, audioCtx.currentTime + 0.8);
  osc2.frequency.exponentialRampToValueAtTime(580, audioCtx.currentTime + 2.3);

  gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
  gain.gain.linearRampToValueAtTime(0.32, audioCtx.currentTime + 0.4);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2.4);

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(audioCtx.destination);

  osc1.start();
  osc2.start();
  osc1.stop(audioCtx.currentTime + 2.4);
  osc2.stop(audioCtx.currentTime + 2.4);
}

// Main Chhath Song Element
const songPlayer = document.getElementById('chhathAudio');
const musicBtn = document.getElementById('btnMusicToggle');
let isSongPlaying = false;

function setMusicUIState(playing) {
  isSongPlaying = playing;
  if (!musicBtn) return;
  if (playing) {
    musicBtn.classList.add('playing');
    musicBtn.innerHTML = `<span>⏸️</span> Pause Music`;
  } else {
    musicBtn.classList.remove('playing');
    musicBtn.innerHTML = `<span>🎵</span> Play Music`;
  }
}

function startChhathMusic() {
  initAudioContext();
  if (!songPlayer) return;
  songPlayer.volume = 0.95;
  songPlayer.play().then(() => {
    setMusicUIState(true);
  }).catch((err) => {
    console.log("Audio waiting for first user touch/click:", err.message);
    setMusicUIState(false);
  });
}

function toggleChhathMusic() {
  initAudioContext();
  if (!songPlayer) return;
  if (songPlayer.paused) {
    startChhathMusic();
  } else {
    songPlayer.pause();
    setMusicUIState(false);
  }
}

// Instant trigger on page load or any interaction
window.addEventListener('DOMContentLoaded', () => {
  startChhathMusic();
});

const onFirstUserGesture = () => {
  if (songPlayer && songPlayer.paused) {
    startChhathMusic();
  }
  window.removeEventListener('click', onFirstUserGesture);
  window.removeEventListener('touchstart', onFirstUserGesture);
};
window.addEventListener('click', onFirstUserGesture, { once: true });
window.addEventListener('touchstart', onFirstUserGesture, { once: true });
