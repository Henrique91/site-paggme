// Theme Toggle
function toggleTheme() {
  const root = document.documentElement;
  const currentTheme = root.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  const icon = document.getElementById("theme-icon");

  root.setAttribute("data-theme", newTheme);
  localStorage.setItem("paggme-theme", newTheme);
  icon.textContent = newTheme === "dark" ? "☀️" : "🌙";
}

// Load saved theme
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("paggme-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = savedTheme || (prefersDark ? "dark" : "light");
  const icon = document.getElementById("theme-icon");

  document.documentElement.setAttribute("data-theme", theme);
  icon.textContent = theme === "dark" ? "☀️" : "🌙";
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Logo helpers
// setLogoColor('#ff6600') altera a variável CSS --logo-color
function setLogoColor(color) {
  document.documentElement.style.setProperty("--logo-color", color);
}

// Detecta suporte a mask-image; se não suportado, mostra o <img> fallback
window.addEventListener("DOMContentLoaded", () => {
  const logoImage = document.getElementById("logo-image");
  const fallback = document.querySelector(".logo-fallback");
  const supportsMask =
    CSS &&
    (CSS.supports("mask-image", 'url("logoPaggme.png")') ||
      CSS.supports("-webkit-mask-image", 'url("logoPaggme.png")'));
  if (!supportsMask) {
    if (logoImage) logoImage.style.display = "none";
    if (fallback) fallback.style.display = "inline-block";
  }

  // Carousel initialization
  initCarousel();
});

// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-slide");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
  if (slides.length === 0) return;

  // Remove active class from all slides and dots
  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  // Add active class to current slide and dot
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
}

function goToSlide(index) {
  showSlide(index);
  resetAutoPlay();
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

function initCarousel() {
  if (slides.length === 0) return;

  // Show first slide
  showSlide(0);

  // Auto-play carousel every 5 seconds
  const autoPlayInterval = setInterval(nextSlide, 5000);

  // Store interval ID for reset functionality
  window.carouselInterval = autoPlayInterval;
}

function resetAutoPlay() {
  if (window.carouselInterval) {
    clearInterval(window.carouselInterval);
  }
  window.carouselInterval = setInterval(nextSlide, 5000);
}

// FAQ Toggle
function toggleFAQ() {
  const hiddenItems = document.querySelectorAll(".faq-hidden");
  const toggleBtn = document.getElementById("faq-toggle-btn");
  const isExpanded = hiddenItems[0].style.display === "block";

  hiddenItems.forEach((item) => {
    item.style.display = isExpanded ? "none" : "block";
  });

  toggleBtn.textContent = isExpanded
    ? "Mostrar Mais Perguntas"
    : "Mostrar Menos Perguntas";
}

// Scroll to Top
function scrollToTop(event) {
  event.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
