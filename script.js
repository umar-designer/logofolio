// ============================================================
// PROJECT DATA
// ============================================================
const PROJECTS = [
  {
    slug: "7rabbit",
    name: "7 Rabbit Studio",
    category: "Studio & Merch",
    plate: "dark",
    mockCount: 6,
  },
  {
    slug: "fastcode",
    name: "FastCode",
    category: "Tech / Developer",
    plate: "dark",
    mockCount: 6,
  },
  {
    slug: "jewel",
    name: "Jewel Sports",
    category: "Sports & Apparel",
    plate: "dark",
    mockCount: 6,
  },
  {
    slug: "knightx",
    name: "KnightX",
    category: "Gaming / Esports",
    plate: "light",
    mockCount: 6,
  },
  {
    slug: "qastra",
    name: "Qastra",
    category: "Lifestyle & Packaging",
    plate: "light",
    mockCount: 6,
  },
  {
    slug: "starvolt",
    name: "StarVolt",
    category: "Energy / Power",
    plate: "light",
    mockCount: 6,
  },
];

// ============================================================
// RENDER WORK GRID
// ============================================================
const grid = document.getElementById("workGrid");

PROJECTS.forEach((p, i) => {
  const card = document.createElement("article");
  card.className = `card card--${p.plate}`;
  card.setAttribute("data-slug", p.slug);
  card.style.transitionDelay = `${(i % 3) * 90}ms`;

  card.innerHTML = `
    <p class="card__cat">${p.category}</p>
    <div class="card__stage">
      <img class="card__mark" src="assets/logo/${p.slug}-mark.png" alt="${p.name} logo mark" loading="lazy">
      <img class="card__mock" src="assets/mockups/${p.slug}-1.webp" alt="${p.name} application mockup" loading="lazy">
    </div>
    <div class="card__scrim"></div>
    <div class="card__info">
      <span class="card__name">${p.name}</span>
      <span class="card__count">01 / ${String(p.mockCount).padStart(2,"0")}</span>
    </div>
  `;

  card.addEventListener("click", () => openModal(p));
  grid.appendChild(card);
});

// ============================================================
// MODAL
// ============================================================
const modal = document.getElementById("modal");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");
const modalWord = document.getElementById("modalWord");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalGallery = document.getElementById("modalGallery");

function openModal(p){
  modalWord.src = `assets/logos/${p.slug}-word.png`;
  modalWord.alt = `${p.name} wordmark`;
  modalCategory.textContent = `${p.name} — ${p.category}`;
  modalTitle.textContent = p.name;

  let imgs = "";
  for (let i = 1; i <= p.mockCount; i++){
    imgs += `<img src="assets/mockups/${p.slug}-${i}.webp" alt="${p.name} mockup ${i}" loading="lazy">`;
  }
  modalGallery.innerHTML = imgs;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal(){
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

modalBackdrop.addEventListener("click", closeModal);
modalClose.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ============================================================
// SCROLL REVEAL
// ============================================================
const revealItems = document.querySelectorAll("[data-reveal], .card");
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting){
      entry.target.classList.add("is-visible");
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

revealItems.forEach((el) => io.observe(el));

// ============================================================
// NAV SCROLL STATE
// ============================================================
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 20);
}, { passive: true });

// ============================================================
// MOBILE MENU
// ============================================================
const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");
burger.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("open");
  burger.setAttribute("aria-expanded", String(isOpen));
});
mobileMenu.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => mobileMenu.classList.remove("open"));
});

// ============================================================
// FOOTER YEAR
// ============================================================
document.getElementById("year").textContent = new Date().getFullYear();

// ============================================================
// HERO BLUEPRINT PARALLAX (subtle, pointer devices only)
// ============================================================
const blueprint = document.getElementById("blueprint");
const orbit = document.getElementById("orbit");
if (window.matchMedia("(hover: hover)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches){
  document.querySelector(".hero").addEventListener("mousemove", (e) => {
    const { innerWidth: w, innerHeight: h } = window;
    const x = (e.clientX / w - 0.5) * 2;
    const y = (e.clientY / h - 0.5) * 2;
    blueprint.style.transform = `translate(${x * -10}px, ${y * -10}px)`;
    orbit.style.transform = `translate(${x * 14}px, ${y * 14}px)`;
  });
}
