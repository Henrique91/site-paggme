// Theme Toggle
function toggleMenu(btn) {
  const root = document.documentElement;
  const isOpen = root.classList.toggle("nav-open");
  btn?.setAttribute("aria-expanded", String(isOpen));
  document.body.style.overflow = isOpen ? "hidden" : "";
}

// fecha ao clicar em um link (melhor UX)
document.addEventListener("click", (e) => {
  const a = e.target.closest("#nav-links a");
  if (!a) return;

  if (document.documentElement.classList.contains("nav-open")) {
    document.documentElement.classList.remove("nav-open");
    document.body.style.overflow = "";
    const btn = document.querySelector(".nav-toggle");
    btn?.setAttribute("aria-expanded", "false");
  }
});

// fecha com ESC
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (!document.documentElement.classList.contains("nav-open")) return;

  document.documentElement.classList.remove("nav-open");
  document.body.style.overflow = "";
  const btn = document.querySelector(".nav-toggle");
  btn?.setAttribute("aria-expanded", "false");
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
