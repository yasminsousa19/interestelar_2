// Smooth scroll para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Toggle menu mobile (duplicate proteção)
const toggle = document.querySelector('.header__toggle');
const nav = document.querySelector('.header__nav');
const header = document.querySelector('.header');

if (toggle && nav && header) {
  toggle.addEventListener('click', () => {
    header.classList.toggle('open');
    const expanded = header.classList.contains('open');
    toggle.setAttribute('aria-expanded', expanded);
  });

  // Fecha o menu ao clicar em qualquer link do menu
  const navLinks = nav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      header.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
    });
  });
}

// Carousel automático da hero (somente JPG)
(function() {
  const slides = document.querySelectorAll('.hero .slide');
  if (!slides.length) return;
  let current = 0;

  function setBackgrounds() {
    slides.forEach(slide => {
      const jpg = slide.dataset.srcJpg;
      if (jpg) {
        slide.style.backgroundImage = `url('${jpg}')`;
      }
    });
  }

  function show(index) {
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
  }

  function next() {
    current = (current + 1) % slides.length;
    show(current);
  }

  // inicialização
  setBackgrounds();
  show(current);
  setInterval(next, 5000);

  // parallax leve baseado em mouse
  const hero = document.querySelector('.hero');
  hero?.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    slides.forEach((slide, i) => {
      const depth = (i + 1) / slides.length;
      const moveX = x * 15 * depth;
      const moveY = y * 15 * depth;
      slide.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });

  // parallax leve no scroll
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    slides.forEach((slide, i) => {
      const offset = scrollY * 0.02 * (i + 1);
      slide.style.transform = `translateY(${offset}px)`;
    });
  });
})();

