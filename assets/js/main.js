gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

ScrollSmoother.create({
  wrapper: '#smooth-wrapper',
  content: '#smooth-content',
  smooth: 1.35,
  effects: true,
  normalizeScroll: true,
  smoothTouch: 0.1
});

const hero = document.getElementById('hero');
const heroOverlay = document.getElementById('heroOverlay');
const current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const target = { ...current };
const radius = 150;

hero.addEventListener('mousemove', (e) => {
  const rect = hero.getBoundingClientRect();
  target.x = e.clientX - rect.left;
  target.y = e.clientY - rect.top;
});

hero.addEventListener('mouseleave', () => {
  heroOverlay.style.clipPath = 'circle(0px at 0px 0px)';
});

hero.addEventListener('mouseenter', () => {
  heroOverlay.style.clipPath = `circle(${radius}px at ${current.x}px ${current.y}px)`;
});

gsap.ticker.add(() => {
  current.x += (target.x - current.x) * 0.14;
  current.y += (target.y - current.y) * 0.14;
  heroOverlay.style.clipPath = `circle(${radius}px at ${current.x}px ${current.y}px)`;
});

gsap.to('.line', {
  y: '0%',
  opacity: 1,
  stagger: 0.14,
  ease: 'power4.out',
  scrollTrigger: {
    trigger: '#manifesto',
    start: 'top 74%',
    end: 'bottom 42%',
    scrub: true
  }
});

document.querySelectorAll('.parallax').forEach((item) => {
  const speed = Number(item.dataset.speed || 1);
  gsap.to(item, {
    y: () => -120 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: item,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
});

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

const carouselWrap = document.getElementById('carouselWrap');
const carouselTrack = document.getElementById('carouselTrack');
carouselTrack.innerHTML += carouselTrack.innerHTML;

const loop = gsap.to(carouselTrack, {
  xPercent: -50,
  ease: 'none',
  duration: 28,
  repeat: -1
});

let down = false;
let pointerX = 0;
carouselWrap.addEventListener('pointerdown', (e) => {
  down = true;
  pointerX = e.clientX;
  carouselWrap.style.cursor = 'grabbing';
  loop.pause();
});
window.addEventListener('pointermove', (e) => {
  if (!down) return;
  const delta = e.clientX - pointerX;
  pointerX = e.clientX;
  gsap.set(carouselTrack, { x: `+=${delta}` });
});
window.addEventListener('pointerup', () => {
  down = false;
  carouselWrap.style.cursor = 'grab';
  loop.resume();
});

gsap.fromTo('.social-card',
  { y: 90, opacity: 0, rotate: 0 },
  {
    y: 0,
    opacity: 1,
    rotate: (i) => (i - 1) * 4,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#socialDeck',
      start: 'top 86%',
      end: 'bottom 64%',
      scrub: true
    }
  }
);
