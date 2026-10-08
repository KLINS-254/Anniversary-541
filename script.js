// Default Configuration Data with Local .png Images and Local .mp3 Audio
const defaultConfig = {
  herName: "My Princess",
  myName: "Yours Forever",
  anniversaryDate: "2023-02-14",
  musicUrl: "song.mp3", // Change to match your song filename
  loveLetter: `My Dearest Love,\n\nFrom the moment you entered my life, everything took on a brighter color. You are my home, my peace, and my greatest adventure.\n\nThank you for being my rock, my best friend, and my favorite person to laugh with. I built this place to hold a tiny fraction of the love I feel for you every single day.\n\nHappy Anniversary, my love! ❤️`,
  memories: [
    { title: "The Beginning ❤️", date: "First Day", location: "Our Favorite Spot", caption: "The day my whole world changed for the better.", img: "memory1.png" },
    { title: "That Special Spark 😍", date: "A Beautiful Evening", location: "City Lights", caption: "The exact moment I realized you were the one.", img: "memory2.png" },
    { title: "Crazy Laughs 😂❤️", date: "Weekend Getaway", location: "By the Beach", caption: "Laughing until our stomachs hurt. I live for these moments.", img: "memory3.png" }
  ],
  achievements: [
    { trophy: "🏆", title: "Best Couple Energy", desc: "For effortlessly matching each other's vibe everywhere we go." },
    { trophy: "🏆", title: "Survived The Arguments Award 😂", desc: "Because hugging it out always wins in the end." },
    { trophy: "🏆", title: "My Favorite Person Award", desc: "Undefeated champion of my heart, every single day." }
  ],
  timeline: [
    { date: "Day One", title: "The Day We Met", desc: "A simple hello that started our greatest story." },
    { date: "First Spark", title: "First Late Night Talk", desc: "Talking for hours and realizing we never wanted it to end." },
    { date: "Milestone", title: "First 'I Love You'", desc: "Three words that meant everything, said from the bottom of my heart." }
  ],
  notes: [
    { title: "Open When You Miss Me 💌", content: "Close your eyes and take a deep breath. I am thinking about you right now and sending you the biggest hug! ❤️" },
    { title: "Open When You Need A Smile 😊", content: "Remember that time we couldn't stop laughing over nothing? Your smile is literally my favorite thing in the world." },
    { title: "Open When You Want To Know Why I Love You 💕", content: "Because you are kind, beautiful, ridiculously funny, and you make my world complete." }
  ],
  reasons: [
    "You make ordinary moments feel like magic.",
    "Your smile can completely turn around my worst day.",
    "You became someone I don't just love… but genuinely cherish with all my heart."
  ]
};

// Application State
let config = JSON.parse(localStorage.getItem('loveStoryConfig')) || defaultConfig;
let currentReasonIndex = 0;

// Initialize Web App
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
  initAdminModal();
  initScrollAnimations();
});

/* Canvas Background Engine */
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
    constructor() {
      this.reset();
    }
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

/* UI Data Loader */
function loadConfigIntoUI() {
  document.getElementById('display-letter-text').innerText = config.loveLetter;
  document.getElementById('display-letter-sign').innerText = `Forever Yours, ${config.myName} ❤️`;
  document.getElementById('display-anniversary-date').innerText = new Date(config.anniversaryDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  
  const audioSource = document.getElementById('audio-source');
  if (audioSource) {
    audioSource.src = config.musicUrl;
    document.getElementById('bg-music').load();
  }
  
  // Admin inputs preset
  document.getElementById('cfg-herName').value = config.herName;
  document.getElementById('cfg-myName').value = config.myName;
  document.getElementById('cfg-anniversaryDate').value = config.anniversaryDate;
  document.getElementById('cfg-musicUrl').value = config.musicUrl;
  document.getElementById('cfg-loveLetter').value = config.loveLetter;
}

/* Audio Player */
function initAudioPlayer() {
  const btn = document.getElementById('audio-control');
  const audio = document.getElementById('bg-music');
  
  btn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().catch(e => console.log("Audio play deferred:", e));
      btn.classList.add('playing');
    } else {
      audio.pause();
      btn.classList.remove('playing');
    }
  });
}

/* Envelope Interaction */
function initEnvelope() {
  const envelope = document.getElementById('envelope');
  const closeBtn = document.getElementById('close-letter-btn');

  envelope.addEventListener('click', (e) => {
    if (e.target !== closeBtn && !envelope.classList.contains('open')) {
      envelope.classList.add('open');
      createSparkles(e.clientX, e.clientY);
    }
  });

  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    envelope.classList.remove('open');
    document.querySelectorAll('.section-padding').forEach(sec => sec.classList.remove('hidden'));
    document.getElementById('anniversary').scrollIntoView({ behavior: 'smooth' });
  });
}

/* Sparkle Effects */
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

/* Countdown Logic */
function initCountdown() {
  function update() {
    const start = new Date(config.anniversaryDate).getTime();
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

/* Memories Cards Render */
function renderMemories() {
  const grid = document.getElementById('memories-grid');
  grid.innerHTML = '';

  config.memories.forEach((mem) => {
    const card = document.createElement('div');
    card.className = 'memory-card glass-card';
    card.innerHTML = `
      <img src="${mem.img}" alt="${mem.title}" onerror="this.src='https://via.placeholder.com/400x300.png?text=Memory+.png'">
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

/* Image Comparison Slider */
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

/* Achievements Render */
function renderAchievements() {
  const container = document.getElementById('podium-container');
  container.innerHTML = '';

  config.achievements.forEach(ach => {
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

/* Timeline Render */
function renderTimeline() {
  const wrapper = document.getElementById('timeline-wrapper');
  wrapper.innerHTML = '';

  config.timeline.forEach(item => {
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

/* Love Notes Render */
function renderNotes() {
  const grid = document.getElementById('notes-grid');
  grid.innerHTML = '';

  config.notes.forEach(note => {
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
    textEl.innerText = config.reasons[currentReasonIndex];
    counterEl.innerText = `${currentReasonIndex + 1} / ${config.reasons.length}`;
  }

  document.getElementById('prev-reason').addEventListener('click', () => {
    currentReasonIndex = (currentReasonIndex - 1 + config.reasons.length) % config.reasons.length;
    update();
  });

  document.getElementById('next-reason').addEventListener('click', () => {
    currentReasonIndex = (currentReasonIndex + 1) % config.reasons.length;
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

/* Canvas Confetti Fireworks Engine */
function triggerConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let pieces = [];
  const emojis = ['😍', '😘', '🥰', '❤️', '💕', '✨', '🏆', '🎉'];

  for (let i = 0; i < 100; i++) {
    pieces.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 15,
      vy: (Math.random() - 0.5) * 15,
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
      p.vy += 0.1; // gravity
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

/* Admin / Customizer Panel Controls */
function initAdminModal() {
  const modal = document.getElementById('admin-modal');
  document.getElementById('admin-toggle').addEventListener('click', () => modal.classList.add('active'));
  document.getElementById('admin-close').addEventListener('click', () => modal.classList.remove('active'));

  document.getElementById('admin-form').addEventListener('submit', (e) => {
    e.preventDefault();
    config.herName = document.getElementById('cfg-herName').value;
    config.myName = document.getElementById('cfg-myName').value;
    config.anniversaryDate = document.getElementById('cfg-anniversaryDate').value;
    config.musicUrl = document.getElementById('cfg-musicUrl').value;
    config.loveLetter = document.getElementById('cfg-loveLetter').value;

    localStorage.setItem('loveStoryConfig', JSON.stringify(config));
    loadConfigIntoUI();
    modal.classList.remove('active');
    alert("Love story dynamic settings updated! ❤️");
  });
}

/* Reveal Scroll Trigger */
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
