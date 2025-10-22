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
  gsap.from("#aboutCard", {
    scrollTrigger: { trigger: "#about", start: "top 80%" },
    y: 30,
    autoAlpha: 0,
    duration: 0.7,
    stagger: 0.12,
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

  // Horizontal skills scrolling using ScrollTrigger
  const track = document.getElementById("skillsTrack");
  const totalWidth = track.scrollWidth;
  gsap.to(track, {
    x: () =>
      -(totalWidth - document.querySelector(".container").clientWidth + 40),
    ease: "none",
    scrollTrigger: {
      trigger: "#skills",
      start: "top top",
      end: () => `+=${totalWidth}`,
      scrub: 0.7,
      pin: true,
      anticipatePin: 1,
    },
  });

  // Each skill animate on enter
  gsap.utils.toArray(".skill").forEach((el, i) => {
    gsap.from(el, {
      autoAlpha: 0,
      y: 20,
      duration: 0.6,
      delay: i * 0.06,
      scrollTrigger: {
        trigger: el,
        start: "left+=50 center",
        horizontal: true,
      },
    });
  });

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
