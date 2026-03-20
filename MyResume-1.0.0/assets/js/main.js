// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = navToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
      icon.classList.remove('bi-list');
      icon.classList.add('bi-x');
      document.body.style.overflow = 'hidden';
    } else {
      icon.classList.remove('bi-x');
      icon.classList.add('bi-list');
      document.body.style.overflow = 'auto';
    }
  });
}

// Close mobile menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    const icon = navToggle.querySelector('i');
    icon.classList.remove('bi-x');
    icon.classList.add('bi-list');
    document.body.style.overflow = 'auto';
  });
});

// Active link highlighting on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink?.classList.add('active');
    } else {
      navLink?.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', highlightNavigation);

// Scroll to top button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Animated counters
const counters = document.querySelectorAll('.stat-number');
const speed = 200;

const animateCounter = (counter) => {
  const target = parseInt(counter.getAttribute('data-target'));
  let count = 0;
  
  const updateCount = () => {
    const increment = target / speed;
    
    if (count < target) {
      count += increment;
      counter.innerText = Math.ceil(count);
      setTimeout(updateCount, 1);
    } else {
      counter.innerText = target;
    }
  };
  
  updateCount();
};

// Intersection Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      animateCounter(counter);
      counterObserver.unobserve(counter);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => {
  counterObserver.observe(counter);
});

// Form submission handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Show loading state
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span> <i class="bi bi-hourglass-split"></i>';
    submitBtn.disabled = true;

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      submitBtn.innerHTML = '<span>Sent!</span> <i class="bi bi-check-circle"></i>';
      contactForm.reset();
      
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 3000);
      
    } catch (error) {
      submitBtn.innerHTML = '<span>Error!</span> <i class="bi bi-exclamation-circle"></i>';
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 3000);
    }
  });
}

// Parallax effect for hero section
const hero = document.querySelector('.hero');
if (hero) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
  });
}

// Typing effect for hero subtitle
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
  const text = heroSubtitle.textContent;
  heroSubtitle.textContent = '';
  
  let i = 0;
  function typeWriter() {
    if (i < text.length) {
      heroSubtitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }
  
  window.addEventListener('load', typeWriter);
}

// Skill bars animation
const skillLevels = document.querySelectorAll('.skill-level');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.style.width;
    }
  });
}, { threshold: 0.5 });

skillLevels.forEach(skill => {
  skillObserver.observe(skill);
});

// Random floating animation for shapes
const shapes = document.querySelectorAll('.shape');
shapes.forEach((shape, index) => {
  shape.style.animation = `float ${6 + index}s ease-in-out infinite`;
  shape.style.animationDelay = `${index * 0.5}s`;
});

// Preloader
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }
});

// Add preloader
const preloaderHtml = `
  <div id="preloader" style="
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--gradient);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    transition: opacity 0.5s ease;
  ">
    <div style="
      width: 50px;
      height: 50px;
      border: 3px solid rgba(255,255,255,0.3);
      border-top-color: var(--white);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    "></div>
  </div>
`;

if (!document.getElementById('preloader')) {
  document.body.insertAdjacentHTML('afterbegin', preloaderHtml);
}

// Add keyframe animation for preloader
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

// Mouse move parallax effect for hero
if (hero) {
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    shapes.forEach((shape, index) => {
      const speed = (index + 1) * 20;
      const x = mouseX * speed;
      const y = mouseY * speed;
      shape.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
}

// Reveal animations on scroll
const revealElements = document.querySelectorAll('.skill-card, .project-card, .info-card, .benefits-list li');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'all 0.6s ease';
  revealObserver.observe(el);
});

// Particle effect for hero section
function createParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 3}px;
      height: ${Math.random() * 3}px;
      background: rgba(255, 255, 255, ${Math.random() * 0.5});
      border-radius: 50%;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      pointer-events: none;
      animation: float ${5 + Math.random() * 10}s linear infinite;
    `;
    hero.appendChild(particle);
  }
}

window.addEventListener('load', createParticles);

// Add floating animation for particles
const particleStyle = document.createElement('style');
particleStyle.textContent = `
  @keyframes float {
    0% {
      transform: translateY(0) translateX(0);
    }
    100% {
      transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
    }
  }
`;
document.head.appendChild(particleStyle);