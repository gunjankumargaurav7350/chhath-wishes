/* ==============================================================
   AUDIO ENGINE MODULE (AUTOPLAY CONTINUOUS - NO PAUSE OPTION)
   ============================================================== */

const songPlayer = document.getElementById('chhathAudio');

function startContinuousAudio() {
  if (!songPlayer) return;
  songPlayer.volume = 0.95;
  songPlayer.play().catch(err => {
    console.log("Autoplay will trigger on first touch:", err.message);
  });
}

// Immediate attempt on DOMContentLoaded and load
window.addEventListener('DOMContentLoaded', startContinuousAudio);
window.addEventListener('load', startContinuousAudio);

// Any user gesture (touch, click, scroll) starts audio immediately if blocked initially
const startOnFirstInteraction = () => {
  if (songPlayer && songPlayer.paused) {
    startContinuousAudio();
  }
};

window.addEventListener('click', startOnFirstInteraction, { passive: true });
window.addEventListener('touchstart', startOnFirstInteraction, { passive: true });
window.addEventListener('scroll', startOnFirstInteraction, { passive: true, once: true });
