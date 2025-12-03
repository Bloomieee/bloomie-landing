// register.js: Registration logic with updated form fields

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('registerForm');
  const successMsg = document.getElementById('registerSuccess');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
      email: form.elements['email'].value.trim(),
      password: form.elements['password'].value.trim(),
      firstName: form.elements['firstName'].value.trim(),
      lastName: form.elements['lastName'].value.trim(),
      rememberMe: form.elements['rememberMe'].checked
    };
    
    // Basic validation
    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Save user to localStorage (demo, not secure)
    const userData = {
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      name: formData.firstName + ' ' + formData.lastName,
      loginTime: new Date().toISOString()
    };
    localStorage.setItem('currentUser', JSON.stringify(userData));
    localStorage.setItem('bloomie_user', JSON.stringify(userData));
    
    successMsg.style.display = 'block';
    setTimeout(() => {
      window.location.href = 'lifestyle.html';
    }, 2000);
  });
  
  // Social login buttons
  const socialBtns = document.querySelectorAll('.social-btn');
  socialBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const provider = this.classList.contains('google-btn') ? 'google' : 
                     this.classList.contains('facebook-btn') ? 'facebook' : 'apple';
      
      const userData = {
        email: `demo@${provider}.com`,
        provider: provider,
        firstName: 'Usuario',
        name: 'Usuario',
        loginTime: new Date().toISOString()
      };
      localStorage.setItem('currentUser', JSON.stringify(userData));
      localStorage.setItem('bloomie_user', JSON.stringify(userData));
      
      successMsg.style.display = 'block';
      setTimeout(() => {
        window.location.href = 'lifestyle.html';
      }, 2000);
    });
  });
});