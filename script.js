document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href.startsWith("#")) return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".project-card, .arch-card, .about-card").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(el);
  });

  const style = document.createElement("style");
  style.textContent = ".visible { opacity: 1 !important; transform: translateY(0) !important; }";
  document.head.appendChild(style);

  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const current = window.scrollY;
    if (current > 80) {
      header.style.boxShadow = "0 4px 24px rgba(0,0,0,0.3)";
    } else {
      header.style.boxShadow = "none";
    }
    lastScroll = current;
  });
});
