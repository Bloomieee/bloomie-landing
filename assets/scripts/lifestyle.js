// lifestyle.js: Validación y lógica del cuestionario

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('lifestyleForm');
  const skinHelp = document.getElementById('skinHelp');
  const skinModal = document.getElementById('skinModal');
  const closeModal = document.getElementById('closeModal');

  // Modal ayuda tipo de piel
  skinHelp.addEventListener('click', function(e) {
    e.preventDefault();
    skinModal.style.display = 'flex';
  });
  
  closeModal.addEventListener('click', function() {
    skinModal.style.display = 'none';
  });

  // Close modal when clicking outside
  skinModal.addEventListener('click', function(e) {
    if (e.target === skinModal) {
      skinModal.style.display = 'none';
    }
  });

  // Validación y guardado
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;
    const requiredFields = ['water', 'sleep', 'sun'];
    
    // Clear previous errors
    requiredFields.forEach(name => {
      const field = form.elements[name];
      field.classList.remove('error');
    });
    
    // Validate required fields
    requiredFields.forEach(name => {
      const field = form.elements[name];
      if (!field.value) {
        field.classList.add('error');
        valid = false;
      }
    });
    
    if (!valid) {
      // Scroll to first error
      const firstError = form.querySelector('.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    // Guardar respuestas en localStorage
    const answers = {
      water: form.elements['water'].value,
      sleep: form.elements['sleep'].value,
      sun: form.elements['sun'].value,
      skin: form.elements['skin'].value
    };
    
    localStorage.setItem('bloomie_lifestyle', JSON.stringify(answers));
    
    // Show success feedback
    const submitBtn = form.querySelector('.lifestyle-submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Saving...';
    submitBtn.disabled = true;
    
    // Simulate saving delay
    setTimeout(() => {
      window.location.href = 'scan.html';
    }, 1000);
  });
});