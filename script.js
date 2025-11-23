// ==========================================
// Portfolio Website - Interactive JavaScript
// Future-Forward Minimalism with Advanced Features
// ==========================================

// ==========================================
// Typing Animation Effect
// ==========================================

class TypingAnimation {
  constructor() {
    this.element = document.querySelector('.typing-text');
    this.texts = [
      'AI & ML Enthusiast',
      'Full Stack Developer',
      'Software Developer',
      'Problem Solver'
    ];
    this.textIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.typingSpeed = 100;
    this.deletingSpeed = 50;
    this.pauseTime = 2000;
    this.init();
  }

  init() {
    if (!this.element) return;
    this.type();
  }

  type() {
    const currentText = this.texts[this.textIndex];
    
    if (this.isDeleting) {
      this.element.textContent = currentText.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.element.textContent = currentText.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let speed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;

    if (!this.isDeleting && this.charIndex === currentText.length) {
      speed = this.pauseTime;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.textIndex = (this.textIndex + 1) % this.texts.length;
      speed = 500;
    }

    setTimeout(() => this.type(), speed);
  }
}

// ==========================================
// Scroll to Top Button
// ==========================================

class ScrollToTop {
  constructor() {
    this.button = document.getElementById('scrollToTop');
    this.ticking = false;
    this.init();
  }

  init() {
    if (!this.button) return;

    window.addEventListener('scroll', () => {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.toggleVisibility();
          this.ticking = false;
        });
        this.ticking = true;
      }
    }, { passive: true });
    this.button.addEventListener('click', () => this.scrollToTop());
  }

  toggleVisibility() {
    if (window.pageYOffset > 300) {
      this.button.classList.add('visible');
    } else {
      this.button.classList.remove('visible');
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

// ==========================================
// Contact Form Handler
// ==========================================

class ContactForm {
  constructor() {
    this.form = document.getElementById('contact-form');
    this.init();
  }

  init() {
    if (!this.form) return;

    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  handleSubmit(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);

    console.log('Form submitted:', data);

    // Show success message (you can replace this with actual form submission)
    this.showMessage('Thank you! Your message has been sent successfully.', 'success');

    // Reset form
    this.form.reset();

    // In a real application, you would send this data to a server
    // Example: fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
  }

  showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      padding: 1rem 2rem;
      background: ${type === 'success' ? 'var(--color-primary)' : '#ef4444'};
      color: white;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
      z-index: 10000;
      animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(messageDiv);

    setTimeout(() => {
      messageDiv.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
  }
}

// Add animation keyframes
const messageStyle = document.createElement('style');
messageStyle.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(messageStyle);

// ==========================================
// Theme Toggle Functionality
// ==========================================

class ThemeManager {
  constructor() {
    this.themeToggle = document.querySelector('.theme-toggle');
    this.body = document.body;
    this.init();
  }

  init() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
      this.enableDarkMode();
    }

    // Theme toggle event listener
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
    
    // Keyboard accessibility
    this.themeToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.toggleTheme();
      }
    });
  }

  toggleTheme() {
    if (this.body.classList.contains('dark-mode')) {
      this.disableDarkMode();
    } else {
      this.enableDarkMode();
    }
    
    // Add spring animation to toggle button
    this.animateToggle();
  }

  enableDarkMode() {
    this.body.classList.add('dark-mode');
    this.themeToggle.setAttribute('aria-pressed', 'true');
    localStorage.setItem('theme', 'dark');
  }

  disableDarkMode() {
    this.body.classList.remove('dark-mode');
    this.themeToggle.setAttribute('aria-pressed', 'false');
    localStorage.setItem('theme', 'light');
  }

  animateToggle() {
    this.themeToggle.style.transform = 'scale(0.8) rotate(180deg)';
    setTimeout(() => {
      this.themeToggle.style.transform = '';
    }, 300);
  }
}

// ==========================================
// 3D Cursor-Reactive Hero Element
// ==========================================

class Hero3D {
  constructor() {
    this.hero3d = document.getElementById('hero-3d');
    this.shapeContainer = document.querySelector('.shape-container');
    this.shapes = document.querySelectorAll('.shape');
    this.mouseX = 0;
    this.mouseY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.isAnimating = false;
    this.animationId = null;
    this.init();
  }

  init() {
    if (!this.hero3d || !this.shapeContainer) return;

    // Throttled mouse move event
    let timeout;
    document.addEventListener('mousemove', (e) => {
      if (timeout) return;
      timeout = setTimeout(() => {
        timeout = null;
        this.handleMouseMove(e);
      }, 16); // ~60fps
    });
    
    // Only animate on hero section
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.isAnimating) {
          this.startAnimation();
        } else if (!entry.isIntersecting && this.isAnimating) {
          this.stopAnimation();
        }
      });
    });
    observer.observe(this.hero3d);
  }

  handleMouseMove(e) {
    const rect = this.hero3d.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate mouse position relative to center (-1 to 1)
    this.mouseX = (e.clientX - centerX) / (rect.width / 2);
    this.mouseY = (e.clientY - centerY) / (rect.height / 2);
  }

  startAnimation() {
    this.isAnimating = true;
    this.animate();
  }

  stopAnimation() {
    this.isAnimating = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  animate() {
    if (!this.isAnimating) return;

    // Smooth interpolation for spring effect
    this.currentX += (this.mouseX - this.currentX) * 0.1;
    this.currentY += (this.mouseY - this.currentY) * 0.1;

    // Apply 3D transforms with will-change for performance
    const rotateY = this.currentX * 15; // Reduced from 20
    const rotateX = -this.currentY * 15; // Reduced from 20

    this.shapeContainer.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;

    // Animate individual shapes (reduced complexity)
    this.shapes.forEach((shape, index) => {
      const multiplier = (index + 1) * 0.3; // Reduced from 0.5
      const translateX = this.currentX * 15 * multiplier;
      const translateY = this.currentY * 15 * multiplier;
      const rotate = this.currentX * 8 * multiplier;
      
      shape.style.transform = `
        translate(-50%, -50%) 
        translateX(${translateX}px) 
        translateY(${translateY}px) 
        rotateZ(${rotate}deg)
      `;
    });

    this.animationId = requestAnimationFrame(() => this.animate());
  }
}

// ==========================================
// Parallax Scroll Effects
// ==========================================

class ParallaxManager {
  constructor() {
    this.parallaxElements = document.querySelectorAll('[data-parallax]');
    this.ticking = false;
    this.lastScroll = 0;
    this.init();
  }

  init() {
    if (this.parallaxElements.length === 0) return;

    // Passive event listener for better scroll performance
    window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    // Initial calculation
    this.updateParallax();
  }

  handleScroll() {
    // Only update if scrolled more than 5px
    const currentScroll = window.pageYOffset;
    if (Math.abs(currentScroll - this.lastScroll) < 5) return;
    
    this.lastScroll = currentScroll;
    
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.updateParallax();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  updateParallax() {
    const scrolled = window.pageYOffset;

    this.parallaxElements.forEach(element => {
      const speed = parseFloat(element.dataset.parallax);
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }
}

// ==========================================
// Horizontal Scrolling Timeline
// ==========================================

class TimelineManager {
  constructor() {
    this.timeline = document.getElementById('timeline-container');
    this.prevBtn = document.querySelector('.timeline-nav-prev');
    this.nextBtn = document.querySelector('.timeline-nav-next');
    this.init();
  }

  init() {
    if (!this.timeline) return;

    // Navigation button events
    this.prevBtn?.addEventListener('click', () => this.scroll('left'));
    this.nextBtn?.addEventListener('click', () => this.scroll('right'));

    // Keyboard navigation for timeline
    this.timeline.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.scroll('left');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.scroll('right');
      }
    });

    // Add spring animation to timeline items on scroll
    this.addScrollAnimations();
  }

  scroll(direction) {
    const scrollAmount = 370; // Item width + gap
    const currentScroll = this.timeline.scrollLeft;
    
    if (direction === 'left') {
      this.timeline.scrollTo({
        left: currentScroll - scrollAmount,
        behavior: 'smooth'
      });
    } else {
      this.timeline.scrollTo({
        left: currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
  }

  addScrollAnimations() {
    const items = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger animation
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100);
        }
      });
    }, { threshold: 0.1 });

    items.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(30px)';
      item.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
      observer.observe(item);
    });
  }
}

// ==========================================
// Project Filtering with Staggered Animations
// ==========================================

class ProjectFilter {
  constructor() {
    this.filterBtns = document.querySelectorAll('.filter-btn');
    this.projectCards = document.querySelectorAll('.project-card');
    this.currentFilter = 'all';
    this.init();
  }

  init() {
    if (this.filterBtns.length === 0) return;

    // Add click events to filter buttons
    this.filterBtns.forEach(btn => {
      btn.addEventListener('click', () => this.handleFilter(btn));
      
      // Keyboard accessibility
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.handleFilter(btn);
        }
      });
    });

    // Initial staggered entrance animation
    this.animateInitialEntrance();
  }

  handleFilter(btn) {
    const filter = btn.dataset.filter;
    
    // Update active state
    this.filterBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');

    // Filter projects with staggered animation
    this.filterProjects(filter);
  }

  filterProjects(filter) {
    let visibleCount = 0;

    this.projectCards.forEach((card, index) => {
      const category = card.dataset.category;
      
      if (filter === 'all' || category === filter) {
        // Show card with staggered animation
        setTimeout(() => {
          card.classList.remove('hidden');
          card.style.animation = 'none';
          card.offsetHeight; // Trigger reflow
          card.style.animation = `slideUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`;
        }, visibleCount * 80);
        visibleCount++;
      } else {
        // Hide card
        card.classList.add('hidden');
      }
    });
  }

  animateInitialEntrance() {
    this.projectCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px) scale(0.95)';
      
      setTimeout(() => {
        card.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
      }, index * 100);
    });
  }
}

// ==========================================
// Smooth Scroll for Navigation Links
// ==========================================

class SmoothScroll {
  constructor() {
    this.links = document.querySelectorAll('a[href^="#"]');
    this.init();
  }

  init() {
    this.links.forEach(link => {
      link.addEventListener('click', (e) => this.handleClick(e));
    });
  }

  handleClick(e) {
    const href = e.currentTarget.getAttribute('href');
    
    // Don't prevent default for empty hash or just "#"
    if (href === '#' || href === '') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    
    // Smooth scroll with offset for fixed nav
    const offset = 80;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });

    // Update focus for accessibility
    target.focus({ preventScroll: true });
  }
}

// ==========================================
// Navbar Scroll Effect
// ==========================================

class NavbarManager {
  constructor() {
    this.nav = document.querySelector('.main-nav');
    this.lastScroll = 0;
    this.ticking = false;
    this.init();
  }

  init() {
    if (!this.nav) return;

    // Passive listener for better performance
    window.addEventListener('scroll', () => {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.handleScroll();
          this.ticking = false;
        });
        this.ticking = true;
      }
    }, { passive: true });
  }

  handleScroll() {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100 && this.lastScroll <= 100) {
      this.nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
      this.nav.style.padding = '0.8rem 0';
    } else if (currentScroll <= 100 && this.lastScroll > 100) {
      this.nav.style.boxShadow = 'none';
      this.nav.style.padding = '1.2rem 0';
    }

    this.lastScroll = currentScroll;
  }
}

// ==========================================
// Micro-interactions with Spring Physics
// ==========================================

class MicroInteractions {
  constructor() {
    this.init();
  }

  init() {
    // Add spring effect to all interactive elements
    this.addSpringToButtons();
    this.addSpringToCards();
    this.addHoverEffects();
  }

  addSpringToButtons() {
    const buttons = document.querySelectorAll('button, .cta-button, .nav-link');
    
    buttons.forEach(btn => {
      btn.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
      });
      
      btn.addEventListener('mouseleave', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      });
    });
  }

  addSpringToCards() {
    const cards = document.querySelectorAll('.project-card, .skill-item, .timeline-content');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
      });
    });
  }

  addHoverEffects() {
    // Add ripple effect to buttons on click
    const interactiveElements = document.querySelectorAll('.cta-button, .filter-btn, .contact-link');
    
    interactiveElements.forEach(element => {
      element.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
      });
    });
  }
}

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ==========================================
// Intersection Observer for Scroll Animations
// ==========================================

class ScrollAnimations {
  constructor() {
    this.init();
  }

  init() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    sections.forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
      section.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
      observer.observe(section);
    });
  }
}

// ==========================================
// Keyboard Navigation Enhancement
// ==========================================

class KeyboardNavigation {
  constructor() {
    this.init();
  }

  init() {
    // Add visible focus indicators
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });

    // Add focus styles
    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
      .keyboard-navigation *:focus {
        outline: 3px solid var(--color-accent);
        outline-offset: 4px;
      }
    `;
    document.head.appendChild(focusStyle);
  }
}

// ==========================================
// Performance Optimization
// ==========================================

class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    // Lazy load images if any are added
    if ('loading' in HTMLImageElement.prototype) {
      const images = document.querySelectorAll('img[loading="lazy"]');
      images.forEach(img => {
        img.src = img.dataset.src;
      });
    }

    // Reduce motion for accessibility
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.style.setProperty('--spring-duration', '0.01s');
      document.documentElement.style.setProperty('--transition-smooth', '0.01s');
    }
  }
}

// ==========================================
// Cursor Trail Effect (Optional Enhancement)
// ==========================================

class CursorTrail {
  constructor() {
    this.dots = [];
    this.mouse = { x: 0, y: 0 };
    this.init();
  }

  init() {
    // Create cursor dots
    for (let i = 0; i < 8; i++) {
      const dot = document.createElement('div');
      dot.className = 'cursor-dot';
      dot.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--color-primary);
        pointer-events: none;
        z-index: 9999;
        opacity: ${1 - i * 0.1};
        transition: transform 0.2s ease-out;
        display: none;
      `;
      document.body.appendChild(dot);
      this.dots.push({ element: dot, x: 0, y: 0 });
    }

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    // Only show on desktop
    if (window.innerWidth > 768) {
      this.animate();
    }
  }

  animate() {
    let x = this.mouse.x;
    let y = this.mouse.y;

    this.dots.forEach((dot, index) => {
      dot.x += (x - dot.x) * 0.3;
      dot.y += (y - dot.y) * 0.3;
      
      dot.element.style.display = 'block';
      dot.element.style.transform = `translate(${dot.x - 4}px, ${dot.y - 4}px)`;
      
      x = dot.x;
      y = dot.y;
    });

    requestAnimationFrame(() => this.animate());
  }
}

// ==========================================
// Floating Particles Background
// ==========================================

class FloatingParticles {
  constructor() {
    this.container = document.querySelector('.particle-container');
    this.particleCount = 15; // Reduced from 40
    this.init();
  }

  init() {
    if (!this.container) return;

    const colors = ['#06B6D4', '#3B82F6', '#8B5CF6', '#22D3EE', '#60A5FA', '#A78BFA'];
    // Create floating particles
    for (let i = 0; i < this.particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const size = Math.random() * 4 + 2; // Reduced max size
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        opacity: ${Math.random() * 0.4 + 0.1};
        animation: particleFloat ${Math.random() * 10 + 20}s linear infinite;
        animation-delay: ${Math.random() * 5}s;
        will-change: transform;
      `;
      this.container.appendChild(particle);
    }
  }
}

// ==========================================
// Initialize All Features
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // Core functionality
  new TypingAnimation();
  new ThemeManager();
  new Hero3D();
  new ParallaxManager();
  new TimelineManager();
  new ProjectFilter();
  new SmoothScroll();
  new NavbarManager();
  new ScrollToTop();
  new ContactForm();
  
  // Enhancements
  new MicroInteractions();
  new ScrollAnimations();
  new KeyboardNavigation();
  new PerformanceOptimizer();
  new FloatingParticles();
  
  // Cursor trail disabled for performance
  // new CursorTrail();
  
  // Console message
  console.log('%c🚀 Portfolio Loaded Successfully!', 'color: #7C3AED; font-size: 16px; font-weight: bold;');
  console.log('%cFuture-Forward Minimalism', 'color: #FF6B35; font-size: 12px;');
});

// ==========================================
// Service Worker Registration (Optional PWA)
// ==========================================

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Uncomment to register service worker
    // navigator.serviceWorker.register('/sw.js')
    //   .then(reg => console.log('Service Worker registered'))
    //   .catch(err => console.log('Service Worker registration failed'));
  });
}

// ==========================================
// Export for Module Usage (if needed)
// ==========================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ThemeManager,
    Hero3D,
    ParallaxManager,
    TimelineManager,
    ProjectFilter
  };
}
