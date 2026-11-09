/* ==============================================================
   VISUAL EFFECTS & VIBES MODULE (CANVAS + PARTICLES + AMBIENT)
   ============================================================== */

const canvas = document.getElementById('festiveCanvas');
const ctx = canvas.getContext('2d');
let w, h;

function resizeCanvas() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const particles = [];
const festivePalettes = [
  ['#ff416c', '#ff4b2b', '#ffc107', '#ffeb3b'], // Fireworks/Love
  ['#ffd700', '#ffb300', '#ff9800', '#ffffff'], // Prosperity/Gold
  ['#ff69b4', '#ff1493', '#ffa07a', '#ffffff'], // Lotus/Rose
  ['#00e676', '#1de9b6', '#ffd700', '#ffffff'], // Positivity
];

class Particle {
  constructor(x, y, isExplosion = false, customPalette = null) {
    this.x = x || Math.random() * w;
    this.y = y || (isExplosion ? y : -20);
    this.size = Math.random() * 7 + 3;
    const palette = customPalette || festivePalettes[Math.floor(Math.random() * festivePalettes.length)];
    this.color = palette[Math.floor(Math.random() * palette.length)];
    
    if (isExplosion) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 2;
      this.speedX = Math.cos(angle) * speed;
      this.speedY = Math.sin(angle) * speed;
      this.gravity = 0.12;
      this.life = 60 + Math.random() * 30;
      this.maxLife = this.life;
    } else {
      this.speedY = Math.random() * 1.6 + 0.8;
      this.speedX = Math.random() * 1 - 0.5;
      this.gravity = 0;
      this.life = null;
    }
    
    this.rotation = Math.random() * 360;
    this.rotSpeed = (Math.random() - 0.5) * 3;
    this.opacity = Math.random() * 0.7 + 0.3;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY += this.gravity;
    this.rotation += this.rotSpeed;

    if (this.life !== null) {
      this.life--;
      this.opacity = this.life / this.maxLife;
    }

    if (this.y > h + 20 && this.life === null) {
      this.y = -20;
      this.x = Math.random() * w;
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.globalAlpha = Math.max(0, this.opacity);
    ctx.fillStyle = this.color;

    // Draw festive petal/star
    ctx.beginPath();
    ctx.ellipse(0, 0, this.size, this.size * 0.55, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// Populate ambient particles
for (let i = 0; i < 40; i++) {
  particles.push(new Particle(Math.random() * w, Math.random() * h));
}

function triggerBurst(x = w / 2, y = h / 3, count = 70, palette = null) {
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(x, y, true, palette));
  }
}

function loopCanvas() {
  ctx.clearRect(0, 0, w, h);
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.update();
    p.draw();
    if (p.life !== null && p.life <= 0) {
      particles.splice(i, 1);
    }
  }
  requestAnimationFrame(loopCanvas);
}
loopCanvas();

// ==============================================================
// INTERACTIVE VIBE BUTTON CLICKS (LIGHT, PROSPERITY, LOVE, ETC.)
// ==============================================================
function triggerVibe(vibeType) {
  playTempleBell();
  const centerX = w / 2;
  const centerY = h / 3;

  if (vibeType === 'light') {
    triggerBurst(centerX, centerY, 80, ['#ffd700', '#fff', '#ff9800']);
    showToastMsg("🪔 दिव्य प्रकाश: दीपों का पावन उजाला!");
  } else if (vibeType === 'prosperity') {
    triggerBurst(centerX, centerY, 90, ['#ffd700', '#ffb300', '#00e676']);
    showToastMsg("💰 समृद्धि: छठी मैया आपके भंडार भरें!");
  } else if (vibeType === 'love') {
    triggerBurst(centerX, centerY, 90, ['#ff416c', '#ff69b4', '#ff1493']);
    showToastMsg("❤️ प्रेम व भक्ति: परिवार में अखंड सद्भाव रहे!");
  } else if (vibeType === 'pujan') {
    playShankhNaad();
    triggerBurst(centerX, centerY, 90, ['#ff9800', '#ffeb3b', '#ffd700']);
    showToastMsg("🙏 पावन अर्घ्य: ॐ सूर्याय नमः! जय छठी मैया!");
  } else if (vibeType === 'thekua') {
    triggerBurst(centerX, centerY, 70, ['#ff8c00', '#ffd54f', '#ffffff']);
    showToastMsg("🍬 महाप्रसाद: शुद्ध घी का ठेकुआ व मौसमी फल!");
  } else if (vibeType === 'fireworks') {
    triggerFirecrackerShow();
    showToastMsg("🎆 विशेष अर्घ्य आतिशबाजी: जय छठी मैया!");
  } else if (vibeType === 'positivity') {
    triggerBurst(centerX, centerY, 80, ['#00e676', '#76ff03', '#ffd700']);
    showToastMsg("✨ सकारात्मक ऊर्जा: जीवन में खुशहाली का सवेरा!");
  } else if (vibeType === 'family') {
    triggerBurst(centerX, centerY, 90, ['#ff416c', '#ffd700', '#ff69b4']);
    showToastMsg("👨‍👩‍👧 परिवार: हर घर में खुशियों का उजाला हो!");
  }
}

function triggerFirecrackerShow() {
  playTempleBell();
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const rx = Math.random() * (w * 0.8) + (w * 0.1);
      const ry = Math.random() * (h * 0.5) + (h * 0.15);
      triggerBurst(rx, ry, 60);
    }, i * 280);
  }
}

// ==============================================================
// AMBIENT FLOATING LOTUS & DIYAS IN BACKGROUND
// ==============================================================
const ambientLayer = document.getElementById('ambientLotusLayer');
const festiveIcons = ['🪷', '🌸', '🪔', '✨', '🌺', '🌾'];

function spawnAmbientLotus() {
  if (!ambientLayer) return;
  const el = document.createElement('div');
  el.className = 'floating-lotus-item';
  el.textContent = festiveIcons[Math.floor(Math.random() * festiveIcons.length)];
  el.style.left = Math.random() * 94 + 'vw';
  const duration = 12 + Math.random() * 8;
  el.style.animationDuration = duration + 's';
  ambientLayer.appendChild(el);
  setTimeout(() => el.remove(), duration * 1000);
}

setInterval(spawnAmbientLotus, 2200);
for (let i = 0; i < 6; i++) {
  setTimeout(spawnAmbientLotus, i * 400);
}
