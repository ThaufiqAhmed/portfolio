/* ===================================================
   THAUFIQ AHMED — PORTFOLIO JS
   Scroll Animations | Typing Effect | Particles
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ===== Preloader =====
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('loaded');
    }, 800);
  });

  // Fallback: hide preloader after 3 seconds max
  setTimeout(() => {
    preloader.classList.add('loaded');
  }, 3000);


  // ===== Scroll Progress Indicator =====
  const scrollProgress = document.getElementById('scroll-progress');

  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = progress + '%';
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });


  // ===== Navbar Scroll Effect =====
  const navbar = document.getElementById('navbar');

  function handleNavScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });


  // ===== Mobile Nav Toggle =====
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile nav on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });


  // ===== Active Nav Link on Scroll =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightActiveNav() {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightActiveNav, { passive: true });


  // ===== Smooth Scroll for Anchor Links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });


  // ===== Typing Animation =====
  const typedElement = document.getElementById('typed-text');
  const phrases = [
    'Scalable Web Apps',
    'RESTful & GraphQL APIs',
    'React Dashboards',
    'Cloud-Native Solutions',
    'Microservices Architecture',
    'Beautiful User Interfaces'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function typeText() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400; // Pause before next phrase
    }

    setTimeout(typeText, typingSpeed);
  }

  typeText();


  // ===== Scroll Reveal Animation (Intersection Observer) =====
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animations slightly
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, index * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // ===== Counter Animation =====
  const statNumbers = document.querySelectorAll('[data-count]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const countTo = parseInt(target.getAttribute('data-count'));
        let current = 0;
        const duration = 2000;
        const stepTime = Math.max(Math.floor(duration / countTo), 50);

        const counter = setInterval(() => {
          current++;
          target.textContent = current;
          if (current >= countTo) {
            target.textContent = countTo;
            clearInterval(counter);
          }
        }, stepTime);

        counterObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));


  // ===== Particle Background =====
  const particleContainer = document.getElementById('particles');

  function createParticles() {
    if (!particleContainer) return;
    const particleCount = window.innerWidth < 768 ? 15 : 30;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');

      const size = Math.random() * 4 + 2;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 8 + 's';
      particle.style.animationDuration = (Math.random() * 6 + 6) + 's';

      // Randomly color particles
      const colors = ['#6C63FF', '#00D2FF', '#7F5AF0', '#e0e0ff'];
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];

      particleContainer.appendChild(particle);
    }
  }

  createParticles();


  // ===== EmailJS Init & Contact Form =====
  // Initialize EmailJS with your public key
  // Sign up at https://www.emailjs.com (free tier: 200 emails/month)
  emailjs.init('YOUR_PUBLIC_KEY');  // ← Replace with your EmailJS public key

  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const btn = this.querySelector('button[type="submit"]');
      const originalHTML = btn.innerHTML;
      const serviceID = this.dataset.emailjsService;   // from data-emailjs-service attribute
      const templateID = this.dataset.emailjsTemplate;  // from data-emailjs-template attribute

      // Show sending state
      btn.innerHTML = '<span>Sending...</span><i class="bi bi-hourglass-split"></i>';
      btn.disabled = true;
      btn.style.opacity = '0.7';

      // Send real email via EmailJS
      emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
          btn.innerHTML = '<span>Sent Successfully!</span><i class="bi bi-check-circle"></i>';
          btn.style.background = 'linear-gradient(135deg, #00e676, #00c853)';

          setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.disabled = false;
            btn.style.opacity = '1';
            btn.style.background = '';
            contactForm.reset();
          }, 3000);
        })
        .catch((error) => {
          console.error('EmailJS Error:', error);
          btn.innerHTML = '<span>Failed to Send</span><i class="bi bi-x-circle"></i>';
          btn.style.background = 'linear-gradient(135deg, #ff1744, #d50000)';

          setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.disabled = false;
            btn.style.opacity = '1';
            btn.style.background = '';
          }, 3000);
        });
    });
  }


  // ===== Parallax Subtle Effect on Hero =====
  const heroContent = document.querySelector('.hero-content');

  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      const offset = window.scrollY * 0.3;
      if (heroContent) {
        heroContent.style.transform = `translateY(${offset}px)`;
        heroContent.style.opacity = 1 - (window.scrollY / window.innerHeight) * 0.6;
      }
    }
  }, { passive: true });

});