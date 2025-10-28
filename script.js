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

  // Projects reveal with interesting animations
  const projectCards = gsap.utils.toArray(".project");
  
  projectCards.forEach((card, index) => {
    // Set initial state
    gsap.set(card, { 
      y: 60, 
      autoAlpha: 0,
      scale: 0.95,
      rotationY: index % 2 === 0 ? -5 : 5
    });
    
    // Animate in
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
    
    tl.to(card, {
      y: 0,
      autoAlpha: 1,
      scale: 1,
      rotationY: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: index * 0.1
    });
  });
  
  // Hover animations for project cards
  projectCards.forEach((card) => {
    const cardContent = card.querySelector('.project-content');
    const links = card.querySelectorAll('.project-link');
    
    // Magnetic effect on cards
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const moveX = (x - centerX) * 0.1;
      const moveY = (y - centerY) * 0.1;
      
      gsap.to(cardContent, {
        x: moveX,
        y: moveY,
        duration: 0.3,
        ease: "power1.out"
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(cardContent, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      });
    });
    
    // Animate links on hover
    links.forEach((link, index) => {
      link.addEventListener('mouseenter', () => {
        gsap.to(link, {
          scale: 1.15,
          rotation: Math.random() * 10 - 5,
          y: -5,
          duration: 0.3,
          ease: "back.out(1.7)"
        });
      });
      
      link.addEventListener('mouseleave', () => {
        gsap.to(link, {
          scale: 1,
          rotation: 0,
          y: 0,
          duration: 0.4,
          ease: "elastic.out(1, 0.5)"
        });
      });
    });
  });
  
  // Animate project badge on featured cards
  const featuredBadge = document.querySelector('.project.featured .project-badge');
  if (featuredBadge) {
    gsap.to(featuredBadge, {
      scrollTrigger: {
        trigger: ".project.featured",
        start: "top 85%",
        toggleActions: "play none none none"
      },
      opacity: 1,
      scale: 1,
      rotation: 360,
      duration: 0.8,
      ease: "elastic.out(1, 0.8)"
    });
  }
  
  // Chip stagger animation
  gsap.utils.toArray('.chip').forEach((chip, index) => {
    gsap.from(chip, {
      scrollTrigger: {
        trigger: chip.closest('.project'),
        start: "top 85%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      scale: 0,
      x: -20,
      duration: 0.4,
      ease: "back.out(1.7)",
      delay: 0.4 + (index * 0.05)
    });
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

  // Animate projects header
  const projectsHeader = document.querySelector('.projects-header');
  if (projectsHeader) {
    gsap.from(projectsHeader, {
      scrollTrigger: {
        trigger: "#projects",
        start: "top 85%",
        toggleActions: "play none none none"
      },
      y: 30,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power3.out"
    });
  }
  
  // Animate projects footer
  const projectsFooter = document.querySelector('.projects-footer');
  if (projectsFooter) {
    gsap.from(projectsFooter, {
      scrollTrigger: {
        trigger: "#projects",
        start: "top 60%",
        toggleActions: "play none none none"
      },
      y: 20,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power2.out"
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

  // ===== Skills marquee auto-slide (continuous rows) =====
  let marqueeTweens = [];
  function initSkillMarquees() {
    // kill previous tweens
    marqueeTweens.forEach((t) => t.kill && t.kill());
    marqueeTweens = [];

    const rows = gsap.utils.toArray('.skills-row');
    rows.forEach((row, idx) => {
      const track = row.querySelector('.skills-track');
      if (!track) return;

      // duplicate content so the marquee is seamless
      track.innerHTML = track.innerHTML + track.innerHTML;
      const distance = track.scrollWidth / 2; // distance to travel for a seamless loop
      const speed = 80; // pixels per second
      const duration = Math.max(8, distance / speed);

      // row 0 (first) should go right-to-left, row1 left-to-right, row2 right-to-left
      const direction = (idx % 2 === 0) ? -1 : 1;

      if (direction === -1) {
        // animate from 0 -> -distance
        const tw = gsap.to(track, {
          x: () => -distance,
          ease: 'none',
          duration: duration,
          repeat: -1,
        });
        marqueeTweens.push(tw);
      } else {
        // for rightwards movement, start offset at -distance and animate to 0
        gsap.set(track, { x: -distance });
        const tw = gsap.to(track, {
          x: 0,
          ease: 'none',
          duration: duration,
          repeat: -1,
        });
        marqueeTweens.push(tw);
      }
    });
  }

  // initialize marquees and re-init on resize
  initSkillMarquees();
  let marqueeResizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(marqueeResizeTimer);
    marqueeResizeTimer = setTimeout(() => {
      // restore original single set of items then re-init (avoid exponential duplication)
      gsap.utils.toArray('.skills-track').forEach((t) => {
        const children = Array.from(t.children);
        const half = Math.ceil(children.length / 2);
        // keep only first half
        const firstHalf = children.slice(0, half).map((c) => c.outerHTML).join('');
        t.innerHTML = firstHalf;
      });
      initSkillMarquees();
    }, 150);
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
  
  // ===== Collaboration section animations (converted from React component) =====
  (function initCollab() {
    const collab = document.getElementById('collaboration');
    if (!collab) return;

    const quoteEl = collab.querySelector('.collab-quote');
    const textStrong = collab.querySelector('.text-strong');

    const smallScreen = document.body.clientWidth < 767;

    const quoteTl = gsap.timeline({ defaults: { ease: 'none' } });
    if (quoteEl) {
      quoteTl.from(quoteEl, { opacity: 0, duration: 1.6 })
        .to(textStrong, { backgroundPositionX: '100%', duration: 1 });

      ScrollTrigger.create({
        trigger: collab,
        start: 'center bottom',
        end: 'center center',
        scrub: 1,
        animation: quoteTl,
      });
    }

    const slidingTl = gsap.timeline({ defaults: { ease: 'none' } });
    const leftEl = collab.querySelector('.ui-left');
    const rightEl = collab.querySelector('.ui-right');

    if (leftEl) {
      slidingTl.to(leftEl, { xPercent: smallScreen ? -500 : -150, duration: 1 }, 0);
    }
    if (rightEl) {
      // move right element from the right into view as the left moves left
      // we use a from for the right so it appears to slide in opposite direction
      slidingTl.from(rightEl, { xPercent: smallScreen ? 500 : 150, duration: 1 }, 0);
    }

    ScrollTrigger.create({
      trigger: collab,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      animation: slidingTl,
    });
  })();
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
