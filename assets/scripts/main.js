// JS animations for features screenshots
document.addEventListener('DOMContentLoaded', function() {
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