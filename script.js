// =========================================================================
// EDIT YOUR PERSONAL DETAILS DIRECTLY IN THIS CONFIG BLOCK BELOW:
// =========================================================================
const CONFIG = {
  herName: "JOY MORAA",
  myName: "TICOHGENERALI",
  anniversaryDate: "2025-10-28", // Format: YYYY-MM-DD
  
  loveLetter: `My Dearest Love,\n\nFrom the moment you entered my life, everything took on a brighter color. You are my home, my peace, and my greatest adventure.\n\nThank you for being my rock, my best friend, and my favorite person to laugh with. I built this place to hold a tiny fraction of the love I feel for you every single day.\n\nHappy Anniversary, my love! ❤️`,

  memories: [
    { title: "The Beginning ❤️", date: "First Day", location: "Our Favorite Spot", caption: "The day my whole world changed for the better.", img: "memory1.png" },
    { title: "That Special Spark 😍", date: "A Beautiful Evening", location: "City Lights", caption: "The exact moment I realized you were the one.", img: "memory2.png" },
    { title: "Crazy Laughs 😂❤️", date: "Weekend Getaway", location: "By the Beach", caption: "Laughing until our stomachs hurt. I live for these moments.", img: "memory3.png" },
    { title: "And All The Little Moments… 💕", date: "Everyday Magic", location: "Everywhere With You", caption: "Nothing beats just sitting next to you doing nothing.", img: "memory4.png" }
  ],

  achievements: [
    { trophy: "🏆", title: "Best Couple Energy Award", desc: "For effortlessly matching each other's vibe everywhere we go." },
    { trophy: "🏆", title: "Survived The Arguments Award 😂", desc: "Because hugging it out always wins in the end." },
    { trophy: "🏆", title: "Best Memories Award", desc: "For creating the most unforgettable story together." },
    { trophy: "🏆", title: "Still Choosing Each Other Award ❤️", desc: "Day after day, without a second thought." },
    { trophy: "🏆", title: "My Favorite Person Award", desc: "Undefeated champion of my heart, every single day." },
    { trophy: "🏆", title: "Forever Team Award 🥰", desc: "You and me against the world." }
  ],

  timeline: [
    { date: "Day One", title: "The Day We Met", desc: "A simple hello that started our greatest story." },
    { date: "First Spark", title: "First Conversation", desc: "Talking for hours and realizing we never wanted it to end." },
    { date: "Date Night", title: "First Date", desc: "Nervous butterflies that turned into absolute magic." },
    { date: "Milestone", title: "First 'I Love You'", desc: "Three words that meant everything, said from the bottom of my heart." },
    { date: "Today", title: "Our Anniversary", desc: "Celebrating us and looking forward to forever." }
  ],

  notes: [
    { title: "Open When You Miss Me 💌", content: "Close your eyes and take a deep breath. I am thinking about you right now and sending you the biggest hug! ❤️" },
    { title: "Open When You're Sad 🥹", content: "Remember that you never have to face hard days alone. I am always right here by your side." },
    { title: "Open When You Need A Smile 😊", content: "Remember that time we couldn't stop laughing over nothing? Your smile is literally my favorite thing in the world." },
    { title: "Open When You Want To Know Why I Love You 💕", content: "Because you are kind, beautiful, ridiculously funny, and you make my world complete." },
    { title: "Open When You Miss Us 📸", content: "Look through our memories above. Every photo is a promise of thousands more to come." }
  ],

  reasons: [
    "You make ordinary moments feel like magic.",
    "Your smile can completely turn around my worst day.",
    "You became someone I don't just love… but genuinely cherish with all my heart.",
    "You support my dreams and believe in me even when I doubt myself."
  ]
};

// =========================================================================
// APPLICATION LOGIC
// =========================================================================

let currentReasonIndex = 0;
let musicStarted = false;

document.addEventListener('DOMContentLoaded', () => {
  initBackgroundCanvas();
  loadConfigIntoUI();
  initAudioPlayer();
  initEnvelope();
  initCountdown();
  renderMemories();
  initImageSlider();
  renderAchievements();
  renderTimeline();
  renderNotes();
  initReasonsCarousel();
  initFinalSurprise();
  initScrollAnimations();
});

/* Canvas Background Star Particles */
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + Math.random() * 20;
      this.size = Math.random() * 15 + 8;
      this.speed = Math.random() * 1.5 + 0.5;
      this.opacity = Math.random() * 0.7 + 0.3;
    }
    update() {
      this.y -= this.speed;
      if (this.y < -20) this.reset();
    }
    draw() {
      ctx.fillStyle = `rgba(255, 42, 95, ${this.opacity})`;
      ctx.font = `${this.size}px serif`;
      ctx.fillText('❤️', this.x, this.y);
    }
  }

  for (let i = 0; i < 25; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
}

/* Load Static Code Config into HTML elements */
function loadConfigIntoUI() {
  document.getElementById('her-name-greeting').innerText = CONFIG.herName;
  document.getElementById('display-letter-text').innerText = CONFIG.loveLetter;
  document.getElementById('display-letter-sign').innerText = `Forever Yours, ${CONFIG.myName} ❤️`;
  
  const parsedDate = new Date(CONFIG.anniversaryDate);
  document.getElementById('display-anniversary-date').innerText = parsedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

/* Audio Player and Autoplay on First Interaction */
function initAudioPlayer() {
  const btn = document.getElementById('audio-control');
  const audio = document.getElementById('bg-music');
  
  function tryPlayMusic() {
    if (!musicStarted) {
      audio.play().then(() => {
        musicStarted = true;
        btn.classList.add('playing');
      }).catch(() => {});
    }
  }

  // Trigger auto-play on first tap anywhere
  window.addEventListener('click', tryPlayMusic, { once: true });
  window.addEventListener('touchstart', tryPlayMusic, { once: true });

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (audio.paused) {
      audio.play();
      musicStarted = true;
      btn.classList.add('playing');
    } else {
      audio.pause();
      btn.classList.remove('playing');
    }
  });
}

/* Envelope Letter Interaction */
function initEnvelope() {
  const envelope = document.getElementById('envelope');
  const closeBtn = document.getElementById('close-letter-btn');

  envelope.addEventListener('click', (e) => {
    if (e.target !== closeBtn && !envelope.classList.contains('open')) {
      envelope.classList.add('open');
      createSparkles(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2);
    }
  });

  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    envelope.classList.remove('open');
    document.getElementById('anniversary').scrollIntoView({ behavior: 'smooth' });
  });
}

/* Sparkle Floating Effect */
function createSparkles(x, y) {
  for (let i = 0; i < 15; i++) {
    const el = document.createElement('div');
    el.innerText = '✨';
    el.style.position = 'fixed';
    el.style.left = `${x + (Math.random() * 60 - 30)}px`;
    el.style.top = `${y + (Math.random() * 60 - 30)}px`;
    el.style.pointerEvents = 'none';
    el.style.zIndex = '9999';
    el.style.transition = 'transform 1s ease, opacity 1s ease';
    document.body.appendChild(el);

    setTimeout(() => {
      el.style.transform = `translateY(-50px) scale(1.5)`;
      el.style.opacity = '0';
    }, 10);

    setTimeout(() => el.remove(), 1000);
  }
}

/* Live Anniversary Countdown */
function initCountdown() {
  function update() {
    const start = new Date(CONFIG.anniversaryDate).getTime();
    const now = new Date().getTime();
    const diff = now - start;

    if (diff > 0) {
      document.getElementById('days').innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
      document.getElementById('hours').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      document.getElementById('minutes').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      document.getElementById('seconds').innerText = Math.floor((diff % (1000 * 60)) / 1000);
    }
  }
  update();
  setInterval(update, 1000);
}

/* Render Photo Memories */
function renderMemories() {
  const grid = document.getElementById('memories-grid');
  grid.innerHTML = '';

  CONFIG.memories.forEach((mem) => {
    const card = document.createElement('div');
    card.className = 'memory-card glass-card';
    card.innerHTML = `
      <img src="${mem.img}" alt="${mem.title}" onerror="this.src='https://via.placeholder.com/400x300.png?text=Add+PNG+Photo'">
      <div class="memory-info">
        <h4>${mem.title}</h4>
        <p class="meta">${mem.date} • ${mem.location}</p>
        <p class="desc">${mem.caption}</p>
      </div>
    `;
    card.addEventListener('click', () => openLightbox(mem));
    grid.appendChild(card);
  });
}

function openLightbox(mem) {
  const modal = document.getElementById('lightbox-modal');
  document.getElementById('lightbox-img').src = mem.img;
  document.getElementById('lightbox-title').innerText = mem.title;
  document.getElementById('lightbox-meta').innerText = `${mem.date} — ${mem.location}`;
  document.getElementById('lightbox-caption').innerText = mem.caption;
  modal.classList.add('active');
}

document.querySelector('.lightbox-close').addEventListener('click', () => {
  document.getElementById('lightbox-modal').classList.remove('active');
});

/* Touch / Mouse Image Comparison Slider */
function initImageSlider() {
  const slider = document.getElementById('image-slider');
  const afterWrapper = slider.querySelector('.img-after-wrapper');
  const handle = slider.querySelector('.slider-handle');
  let isDragging = false;

  function move(x) {
    const rect = slider.getBoundingClientRect();
    let pos = x - rect.left;
    if (pos < 0) pos = 0;
    if (pos > rect.width) pos = rect.width;
    const percentage = (pos / rect.width) * 100;
    afterWrapper.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  }

  handle.addEventListener('mousedown', () => isDragging = true);
  window.addEventListener('mouseup', () => isDragging = false);
  window.addEventListener('mousemove', (e) => { if (isDragging) move(e.clientX); });

  handle.addEventListener('touchstart', () => isDragging = true);
  window.addEventListener('touchend', () => isDragging = false);
  window.addEventListener('touchmove', (e) => { if (isDragging) move(e.touches[0].clientX); });
}

/* Render Trophy Achievements */
function renderAchievements() {
  const container = document.getElementById('podium-container');
  container.innerHTML = '';

  CONFIG.achievements.forEach(ach => {
    const item = document.createElement('div');
    item.className = 'trophy-item glass-card';
    item.innerHTML = `
      <div class="trophy-icon">${ach.trophy}</div>
      <div>
        <h4>${ach.title}</h4>
        <p style="font-size:0.85rem; color: var(--text-muted);">${ach.desc}</p>
      </div>
    `;
    container.appendChild(item);
  });
}

/* Render Timeline */
function renderTimeline() {
  const wrapper = document.getElementById('timeline-wrapper');
  wrapper.innerHTML = '';

  CONFIG.timeline.forEach(item => {
    const node = document.createElement('div');
    node.className = 'timeline-node';
    node.innerHTML = `
      <div class="timeline-card glass-card">
        <span style="color:var(--gold-accent); font-size:0.8rem;">${item.date}</span>
        <h4>${item.title}</h4>
        <p style="font-size:0.85rem; color:var(--text-muted); margin-top:5px;">${item.desc}</p>
      </div>
    `;
    wrapper.appendChild(node);
  });
}

/* Render Love Notes */
function renderNotes() {
  const grid = document.getElementById('notes-grid');
  grid.innerHTML = '';

  CONFIG.notes.forEach(note => {
    const card = document.createElement('div');
    card.className = 'note-card glass-card';
    card.innerHTML = `
      <i class="fa-solid fa-envelope"></i>
      <h4>${note.title}</h4>
    `;
    card.addEventListener('click', () => openNoteModal(note));
    grid.appendChild(card);
  });
}

function openNoteModal(note) {
  const modal = document.getElementById('note-modal');
  document.getElementById('note-modal-title').innerText = note.title;
  document.getElementById('note-modal-body').innerText = note.content;
  modal.classList.add('active');
}

document.querySelector('.note-close').addEventListener('click', () => {
  document.getElementById('note-modal').classList.remove('active');
});

/* Reasons Carousel */
function initReasonsCarousel() {
  const textEl = document.getElementById('current-reason-text');
  const counterEl = document.getElementById('reason-counter');

  function update() {
    textEl.innerText = CONFIG.reasons[currentReasonIndex];
    counterEl.innerText = `${currentReasonIndex + 1} / ${CONFIG.reasons.length}`;
  }

  document.getElementById('prev-reason').addEventListener('click', () => {
    currentReasonIndex = (currentReasonIndex - 1 + CONFIG.reasons.length) % CONFIG.reasons.length;
    update();
  });

  document.getElementById('next-reason').addEventListener('click', () => {
    currentReasonIndex = (currentReasonIndex + 1) % CONFIG.reasons.length;
    update();
  });

  update();
}

/* Final Surprise Screen */
function initFinalSurprise() {
  const btn = document.getElementById('grand-reveal-btn');
  const line2 = document.querySelector('.finale-line-2');
  const line3 = document.querySelector('.finale-line-3');
  const celebration = document.getElementById('grand-celebration');

  setTimeout(() => line2.classList.add('show'), 1500);
  setTimeout(() => line3.classList.add('show'), 3000);

  btn.addEventListener('click', () => {
    btn.style.display = 'none';
    celebration.classList.remove('hidden');
    triggerConfetti();
  });
}

/* Confetti Fireworks Engine */
function triggerConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let pieces = [];
  const emojis = ['😍', '😘', '🥰', '❤️', '💕', '✨', '🏆', '🎉'];

  for (let i = 0; i < 120; i++) {
    pieces.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.5) * 16,
      size: Math.random() * 20 + 15,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      opacity: 1
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let active = false;

    pieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.1;
      p.opacity -= 0.008;

      if (p.opacity > 0) {
        active = true;
        ctx.globalAlpha = p.opacity;
        ctx.font = `${p.size}px serif`;
        ctx.fillText(p.emoji, p.x, p.y);
      }
    });

    if (active) requestAnimationFrame(draw);
  }
  draw();
}

/* Scroll Trigger Animations */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section-padding').forEach(sec => observer.observe(sec));
}
