// Hero animation timeline
const tl = gsap.timeline();

tl.from(".hero-title", {
  duration: 1,
  y: -80,
  opacity: 0,
  ease: "power4.out",
})
  .from(".hero-subtitle", {
    duration: 1,
    y: 30,
    opacity: 0,
    ease: "power3.out",
  }, "-=0.6")
  .from(".hero-btn", {
    duration: 0.8,
    scale: 0,
    opacity: 0,
    ease: "back.out(1.7)",
  }, "-=0.4");

// Scroll Animations
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".album-card").forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    delay: i * 0.1,
    ease: "power2.out",
  });
});

gsap.utils.toArray(".artist-card").forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 90%",
    },
    y: 80,
    opacity: 0,
    duration: 1,
    delay: i * 0.2,
  });
});

gsap.from(".cta", {
  scrollTrigger: {
    trigger: ".cta",
    start: "top 85%",
  },
  y: 100,
  opacity: 0,
  duration: 1,
  ease: "power2.out",
});
