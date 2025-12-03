// JS animations for features screenshots
document.addEventListener('DOMContentLoaded', function() {
  // Navbar mobile toggle functionality
  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  var body = document.body;
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      body.classList.toggle('menu-open');
      nav.classList.toggle('nav-open', body.classList.contains('menu-open'));
    });
    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (body.classList.contains('menu-open') && !nav.contains(e.target) && e.target !== navToggle) {
        body.classList.remove('menu-open');
        nav.classList.remove('nav-open');
      }
    });
    // Close menu on resize
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) {
        body.classList.remove('menu-open');
        nav.classList.remove('nav-open');
      }
    });
  }
  const screenshots = document.querySelectorAll('.features-screenshots figure');

  if (screenshots.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 200); // Stagger animation
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    screenshots.forEach(figure => {
      figure.style.opacity = '0';
      figure.style.transform = 'translateY(20px)';
      figure.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(figure);
    });
  }
});