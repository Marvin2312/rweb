/* ══════════════════════════════════════════
   RWEBDESIGN — Main Script
══════════════════════════════════════════ */

// ── Scroll Reveal
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

reveals.forEach((el) => revealObserver.observe(el));


// ── Services Carousel
(function () {
  const track  = document.getElementById('svcTrack');
  const slides = Array.from(track.querySelectorAll('.svc-slide'));
  const dots   = Array.from(document.querySelectorAll('#svcDots .dot'));

  let perView = window.innerWidth < 640 ? 1 : window.innerWidth < 960 ? 2 : 3;
  let pages   = Math.ceil(slides.length / perView);
  let cur     = 0;

  function slideW() {
    return slides[0].offsetWidth + 12;
  }

  function go(n) {
    cur = ((n % pages) + pages) % pages;
    track.style.transform = `translateX(-${cur * perView * slideW()}px)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === cur));
  }

  document.getElementById('svcPrev').addEventListener('click', () => go(cur - 1));
  document.getElementById('svcNext').addEventListener('click', () => go(cur + 1));
  dots.forEach((d) => d.addEventListener('click', () => go(+d.dataset.i)));

  setInterval(() => go(cur + 1), 4500);
})();


// ── Gallery Carousel
(function () {
  const track  = document.getElementById('galTrack');
  const slides = Array.from(track.querySelectorAll('.gal-slide'));

  let perView = window.innerWidth < 640 ? 1 : window.innerWidth < 960 ? 2 : 3;
  let pages   = Math.ceil(slides.length / perView);
  let cur     = 0;

  function slideW() {
    return slides[0].offsetWidth + 12;
  }

  function go(n) {
    cur = ((n % pages) + pages) % pages;
    track.style.transform = `translateX(-${cur * perView * slideW()}px)`;
  }

  document.getElementById('galPrev').addEventListener('click', () => go(cur - 1));
  document.getElementById('galNext').addEventListener('click', () => go(cur + 1));

  setInterval(() => go(cur + 1), 5000);
})();


// ── Navbar Active Link on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;

  sections.forEach((sec) => {
    if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
      navLinks.forEach((a) => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + sec.id) {
          a.classList.add('active');
        }
      });
    }
  });
});