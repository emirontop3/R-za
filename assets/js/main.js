/*
  Ultra Premium F1 Portfolio interactions
  - GSAP ScrollSmoother cinematic scroll
  - Hero mouse mask reveal
  - ScrollTrigger typography + parallax + social deck
  - Interactive split panels + draggable infinite carousel
*/

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

ScrollSmoother.create({
  wrapper: '#smooth-wrapper',
  content: '#smooth-content',
  smooth: 1.4,
  effects: true,
  normalizeScroll: true,
  smoothTouch: 0.1
});

// HERO MASK FOLLOW
const hero = document.getElementById('hero');
const heroOverlay = document.getElementById('heroOverlay');
const maskRadius = 155;
const current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const target = { ...current };

hero.addEventListener('mousemove', (event) => {
  const rect = hero.getBoundingClientRect();
  target.x = event.clientX - rect.left;
  target.y = event.clientY - rect.top;
});

hero.addEventListener('mouseleave', () => {
  heroOverlay.style.clipPath = 'circle(0px at 0px 0px)';
});

gsap.ticker.add(() => {
  current.x += (target.x - current.x) * 0.14;
  current.y += (target.y - current.y) * 0.14;
  heroOverlay.style.clipPath = `circle(${maskRadius}px at ${current.x}px ${current.y}px)`;
});

// TEXT REVEAL
 gsap.to('.line', {
  y: '0%',
  opacity: 1,
  stagger: 0.12,
  ease: 'power4.out',
  scrollTrigger: {
    trigger: '#manifesto',
    start: 'top 75%',
    end: 'bottom 45%',
    scrub: true
  }
});

// PARALLAX
 document.querySelectorAll('.parallax').forEach((card) => {
  const speed = Number(card.dataset.speed || 1);
  gsap.to(card, {
    y: () => -120 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: card,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
});

// SPLIT INTERACTION
const splitShowcase = document.getElementById('splitShowcase');
splitShowcase.querySelectorAll('.split-panel').forEach((panel) => {
  panel.addEventListener('mouseenter', () => {
    splitShowcase.classList.toggle('left-active', panel.dataset.side === 'left');
    splitShowcase.classList.toggle('right-active', panel.dataset.side === 'right');
  });
});
splitShowcase.addEventListener('mouseleave', () => {
  splitShowcase.classList.remove('left-active', 'right-active');
});

// INFINITE CAROUSEL + DRAG
const carouselWrap = document.getElementById('carouselWrap');
const carouselTrack = document.getElementById('carouselTrack');
carouselTrack.innerHTML += carouselTrack.innerHTML;

const autoLoop = gsap.to(carouselTrack, {
  xPercent: -50,
  duration: 30,
  repeat: -1,
  ease: 'none'
});

let dragging = false;
let pointerX = 0;
carouselWrap.addEventListener('pointerdown', (event) => {
  dragging = true;
  pointerX = event.clientX;
  autoLoop.pause();
  carouselWrap.style.cursor = 'grabbing';
});

window.addEventListener('pointermove', (event) => {
  if (!dragging) return;
  const delta = event.clientX - pointerX;
  pointerX = event.clientX;
  gsap.set(carouselTrack, { x: `+=${delta}` });
});

window.addEventListener('pointerup', () => {
  dragging = false;
  autoLoop.resume();
  carouselWrap.style.cursor = 'grab';
});

// SOCIAL CARD FAN-OUT
gsap.fromTo('.social-card',
  { y: 80, opacity: 0, rotate: 0 },
  {
    y: 0,
    opacity: 1,
    rotate: (i) => (i - 1) * 4,
    stagger: 0.14,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#socialDeck',
      start: 'top 85%',
      end: 'bottom 65%',
      scrub: true
    }
  }
);
