/* ========================================================
   MAHANTESH PADATARI - INTERACTIVE PORTFOLIO & ANIMATIONS SCRIPT
   ======================================================== */

// --- 1. Typing Animation for Roles ---
const roles = [
  "Software QA & Automation",
  "Frontend Development (ReactJS)",
  "Python Programming",
  "Selenium Test Suites",
  "UI/UX Designing"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 90;
const deletingSpeed = 45;
const pauseDelay = 1600;
const typingElement = document.getElementById("typingRole");

function typeEffect() {
  if (!typingElement) return;

  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typingElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? deletingSpeed : typingSpeed;

  if (!isDeleting && charIndex === currentRole.length) {
    delay = pauseDelay;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 350;
  }

  setTimeout(typeEffect, delay);
}

// --- 2. Theme Switcher (Dark / Light) ---
const html = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const mobileThemeToggle = document.getElementById("mobileThemeToggle");

function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    if (savedTheme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  } else {
    // Default to dark mode for sleek developer aesthetic
    html.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
}

function toggleTheme() {
  const isDark = html.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  showToast(isDark ? "Switched to Dark Mode 🌙" : "Switched to Light Mode ☀️");
}

if (themeToggle) themeToggle.addEventListener("click", toggleTheme);
if (mobileThemeToggle) mobileThemeToggle.addEventListener("click", toggleTheme);

// --- 3. Mobile Navigation Menu ---
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const mobileMenuIcon = document.getElementById("mobileMenuIcon");
const mobileLinks = document.querySelectorAll(".mobile-nav-link");

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener("click", () => {
    const isHidden = mobileMenu.classList.contains("hidden");
    if (isHidden) {
      mobileMenu.classList.remove("hidden");
      mobileMenuIcon.classList.remove("fa-bars");
      mobileMenuIcon.classList.add("fa-xmark");
    } else {
      mobileMenu.classList.add("hidden");
      mobileMenuIcon.classList.remove("fa-xmark");
      mobileMenuIcon.classList.add("fa-bars");
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      mobileMenuIcon.classList.remove("fa-xmark");
      mobileMenuIcon.classList.add("fa-bars");
    });
  });
}

// --- 4. Resume Modal Controls ---
const resumeModal = document.getElementById("resumeModal");

function openResumeModal() {
  if (resumeModal) {
    resumeModal.classList.remove("hidden");
    resumeModal.classList.add("flex");
    document.body.style.overflow = "hidden";
  }
}

function closeResumeModal() {
  if (resumeModal) {
    resumeModal.classList.add("hidden");
    resumeModal.classList.remove("flex");
    document.body.style.overflow = "auto";
  }
}

if (resumeModal) {
  resumeModal.addEventListener("click", (e) => {
    if (e.target === resumeModal) closeResumeModal();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && resumeModal && !resumeModal.classList.contains("hidden")) {
    closeResumeModal();
  }
});

// --- 5. Clipboard Copy with Toast Feedback ---
function copyToClipboard(text, successMessage) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(successMessage || "Copied to clipboard!");
  }).catch(() => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    showToast(successMessage || "Copied to clipboard!");
  });
}

// --- 6. Toast Notification Manager ---
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toastMessage");
  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  toast.classList.remove("hidden");
  toast.classList.add("flex");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.add("hidden");
    toast.classList.remove("flex");
  }, 3000);
}

// --- 7. Contact Form Handling ---
function handleFormSubmit(event) {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    showToast("Please fill in all required fields!");
    return;
  }

  const mailSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject}`);
  const mailBody = encodeURIComponent(
    `Hello Mahantesh,\n\nMy name is ${name} (${email}).\n\n${message}\n\nBest regards,\n${name}`
  );

  const mailtoUrl = `mailto:mpcreatiobgm@gmail.com?subject=${mailSubject}&body=${mailBody}`;
  window.location.href = mailtoUrl;

  showToast("Opening your email client to send message...");
}

// --- 8. Active Nav Link on Scroll & Scroll Progress Bar ---
function initScrollProgressAndSpy() {
  const progressBar = document.getElementById("scrollProgressBar");
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    // 1. Scroll Progress Bar
    if (progressBar) {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      progressBar.style.width = `${scrolled}%`;
    }

    // 2. Active Section Spy
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }, { passive: true });
}

// --- 9. Interactive Particle Mesh Canvas ---
function initParticleCanvas() {
  const canvas = document.getElementById("particleCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(Math.floor(window.innerWidth / 18), 75);
  const particles = [];
  const mouse = { x: null, y: null, radius: 120 };

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1;
      this.color = Math.random() > 0.5 ? "rgba(59, 130, 246, 0.45)" : "rgba(6, 182, 212, 0.45)";
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;

      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const dirX = (dx / dist) * force * 1.5;
          const dirY = (dy / dist) * force * 1.5;
          this.x -= dirX;
          this.y -= dirY;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function connectParticles() {
    const maxDistance = 110;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = 1 - dist / maxDistance;
          ctx.strokeStyle = `rgba(59, 130, 246, ${alpha * 0.18})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  let animationFrameId;
  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Only render if hero is visible or near top
    if (window.scrollY < window.innerHeight * 1.5) {
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      connectParticles();
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  animate();
}

// --- 10. 3D Tilt & Mouse Spotlight on Cards ---
function init3DTiltAndSpotlight() {
  const cards = document.querySelectorAll(".tilt-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update CSS variables for radial glare
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);

      // 3D Tilt angles
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });
}

// --- 11. Animated Stats Counter ---
function initAnimatedCounters() {
  const counterElements = document.querySelectorAll("[data-counter-target]");
  if (!counterElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute("data-counter-target"));
        const suffix = el.getAttribute("data-counter-suffix") || "";
        const isDecimal = target % 1 !== 0;
        const duration = 1800;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentVal = easeOut * target;

          el.textContent = (isDecimal ? currentVal.toFixed(1) : Math.floor(currentVal)) + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
          }
        }

        requestAnimationFrame(updateCounter);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counterElements.forEach((el) => observer.observe(el));
}

// --- 12. Scroll-Driven Reveal Animations ---
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal-on-scroll");
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

  revealElements.forEach((el) => observer.observe(el));
}

// --- 13. Custom Glowing Cursor (Desktop Only) ---
function initCustomCursor() {
  const cursorDot = document.getElementById("cursorDot");
  const cursorRing = document.getElementById("cursorRing");
  if (!cursorDot || !cursorRing) return;

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  // Lerp smoothing loop for outer ring
  function renderCursor() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Hover states on clickable elements
  const hoverTargets = document.querySelectorAll("a, button, input, textarea, .tilt-card, .skill-badge");
  hoverTargets.forEach((target) => {
    target.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    target.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
  });

  document.addEventListener("mouseleave", () => {
    cursorDot.style.opacity = "0";
    cursorRing.style.opacity = "0";
  });
  document.addEventListener("mouseenter", () => {
    cursorDot.style.opacity = "1";
    cursorRing.style.opacity = "1";
  });
}

// --- Initialize All Components on DOM Ready ---
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  typeEffect();
  initScrollProgressAndSpy();
  initParticleCanvas();
  init3DTiltAndSpotlight();
  initAnimatedCounters();
  initScrollReveal();
  initCustomCursor();
});
