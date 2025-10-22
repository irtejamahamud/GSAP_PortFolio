// Basic initializations
document.getElementById("year").textContent = new Date().getFullYear();

// EmailJS init: replace USER_ID with your EmailJS user ID
(function () {
  emailjs.init("YOUR_EMAILJS_USER_ID");
})();

// Loader animation
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  gsap.to(loader, {
    autoAlpha: 0,
    delay: 0.5,
    onComplete: () => (loader.style.display = "none"),
  });
  initApp();
});

function initApp() {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // Parallax particles
  const particlesEl = document.getElementById("particles");
  const colors = ["#1d2d44", "#3e5c76", "#748cab", "#0d1321", "#f0ebd8"];
  for (let i = 0; i < 28; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    const size = Math.random() * 28 + 6;
    p.style.width = size + "px";
    p.style.height = size + "px";
    p.style.left = Math.random() * 100 + "%";
    p.style.top = Math.random() * 100 + "%";
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.opacity = (Math.random() * 0.6).toFixed(2);
    particlesEl.appendChild(p);
    gsap.to(p, {
      y: "+=30",
      x: "+=20",
      duration: 6 + Math.random() * 6,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      delay: Math.random() * 3,
    });
  }

  // Hero intro timeline
  const tl = gsap.timeline();
  tl.from("#title", {
    y: 30,
    autoAlpha: 0,
    duration: 0.7,
    stagger: 0.08,
    ease: "power3.out",
  })
    .from(".sub", { y: 20, autoAlpha: 0, duration: 0.6 }, "-=.3")
    .from(".lead", { y: 20, autoAlpha: 0, duration: 0.6 }, "-=.4")
    .from(
      ".cta .btn",
      { y: 10, autoAlpha: 0, duration: 0.5, stagger: 0.08 },
      "-=.4"
    );

  // About fade-ins
  // ===== ABOUT SECTION ANIMATION =====
  gsap.from(".about-img img", {
    scrollTrigger: {
      trigger: ".about-section",
      start: "top 80%",
    },
    opacity: 0,
    x: -100,
    duration: 1.2,
    ease: "power3.out",
  });

  gsap.from(".about-text", {
    scrollTrigger: {
      trigger: ".about-section",
      start: "top 80%",
    },
    opacity: 0,
    x: 100,
    duration: 1.2,
    delay: 0.3,
    ease: "power3.out",
  });

  gsap.from(".stat-card", {
    scrollTrigger: {
      trigger: ".about-stats",
      start: "top 85%",
    },
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 1,
    ease: "back.out(1.7)",
  });

  // Projects reveal
  gsap.from("#projectsGrid .project", {
    scrollTrigger: { trigger: "#projects", start: "top 85%" },
    y: 40,
    autoAlpha: 0,
    duration: 0.7,
    stagger: 0.12,
  });

  // Contact form animate
  gsap.from("#contactForm input, #contactForm textarea, #contactForm button", {
    scrollTrigger: { trigger: "#contact", start: "top 85%" },
    y: 20,
    autoAlpha: 0,
    duration: 0.6,
    stagger: 0.08,
  });

  // Cursor follow
  const cursor = document.getElementById("cursor");
  const follower = document.getElementById("cursorF");
  let pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    mouse = { x: pos.x, y: pos.y };
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    gsap.to(cursor, { x: mouse.x, y: mouse.y, duration: 0.06 });
  });
  gsap.ticker.add(() => {
    pos.x += (mouse.x - pos.x) / 6;
    pos.y += (mouse.y - pos.y) / 6;
    follower.style.transform = `translate(${pos.x - 18}px, ${pos.y - 18}px)`;
  });

  // Cursor hover effects
  const hoverTargets = document.querySelectorAll("button, a, .btn");
  hoverTargets.forEach((t) => {
    t.addEventListener("mouseenter", () => {
      cursor.classList.add("cursor--active");
      follower.style.borderColor = "rgba(240,235,216,0.9)";
    });
    t.addEventListener("mouseleave", () => {
      cursor.classList.remove("cursor--active");
      follower.style.borderColor = "rgba(255,255,255,0.08)";
    });
  });

  // Projects horizontal pinned scroll
  const projectsGrid = document.querySelector(".projects-grid");
  if (projectsGrid) {
    const projectsWidth = projectsGrid.scrollWidth;
    gsap.to(projectsGrid, {
      x: () => -(projectsWidth - document.documentElement.clientWidth + 40),
      ease: "none",
      scrollTrigger: {
        trigger: "#projects",
        start: "top top",
        end: () => "+=" + (projectsWidth - window.innerWidth),
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Keep per-project reveal (if desired) — they will animate within the pinned area
    const projectCards = gsap.utils.toArray(".project");
    gsap.from(projectCards, {
      opacity: 0,
      y: 40,
      stagger: 0.12,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#projects",
        start: "top 85%",
      },
    });
  }

  // Skill hover interactions using GSAP (color glow + scale)
  const skillCardsHover = gsap.utils.toArray(".skill-card");
  if (skillCardsHover.length) {
    skillCardsHover.forEach((card) => {
      const icon = card.querySelector("i");
      // capture original computed styles so we can revert exactly
      const originalIconColor = getComputedStyle(icon).color;
      const originalBoxShadow = getComputedStyle(card).boxShadow || "none";

      // mouseenter: color icon and add glow/scale
      card.addEventListener("mouseenter", () => {
        gsap.to(icon, { color: "#cfe8ff", duration: 0.28, ease: "power1.out" });
        gsap.to(card, {
          scale: 1.06,
          boxShadow: "0 20px 40px rgba(207,232,255,0.12)",
          duration: 0.35,
          ease: "power1.out",
        });
      });

      // mouseleave: revert to captured original values
      card.addEventListener("mouseleave", () => {
        gsap.to(icon, { color: originalIconColor, duration: 0.28, ease: "power1.out" });
        gsap.to(card, { scale: 1, boxShadow: originalBoxShadow, duration: 0.35, ease: "power1.out" });
      });
    });
  }

  // Lenis smooth scroll
  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Optional: scroll-to buttons
  document.getElementById("viewWork").addEventListener("click", () => {
    gsap.to(window, { duration: 1, scrollTo: "#projects" });
  });
  document.getElementById("hireBtn").addEventListener("click", () => {
    gsap.to(window, { duration: 1, scrollTo: "#contact" });
  });

  // Simple parallax by mouse movement
  document.addEventListener("mousemove", (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    gsap.to(".particle", {
      x: (i) => dx * 10,
      y: (i) => dy * 10,
      stagger: 0,
      overwrite: true,
      duration: 1,
    });
  });

  // Contact form handler via EmailJS
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    status.textContent = "Sending...";
    const payload = {
      from_name: form.name.value,
      from_email: form.email.value,
      message: form.message.value,
    };
    // Replace service_id and template_id with yours
    emailjs
      .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", payload)
      .then(() => {
        status.textContent = "Message sent — thank you!";
        form.reset();
      })
      .catch((err) => {
        console.error(err);
        status.textContent = "Error sending message.";
      });
  });

  // Accessibility: allow keyboard focus outlines for keyboard users
  window.addEventListener("keydown", (e) => {
    if (e.key === "Tab") document.body.classList.add("show-focus");
  });
}
