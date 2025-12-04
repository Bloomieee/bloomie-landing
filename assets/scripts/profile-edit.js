document.addEventListener('DOMContentLoaded', function() {
  loadProfileData();
  setupForm();
});

function loadProfileData() {
  // Get user data from registration/login
  const currentUser = JSON.parse(localStorage.getItem('bloomie_user')) || {};
  // Get additional profile data if edited before
  const profileData = JSON.parse(localStorage.getItem('bloomie_user_profile')) || {};
  
  // Merge data - profile edits take priority
  const userData = {
    name: profileData.name || currentUser.name || currentUser.firstName || '',
    email: profileData.email || currentUser.email || '',
    phone: profileData.phone || '',
    birthdate: profileData.birthdate || '',
    skinType: profileData.skinType || '',
    address: profileData.address || ''
  };
  
  // Populate form fields
  const editName = document.getElementById('editName');
  const editEmail = document.getElementById('editEmail');
  const editPhone = document.getElementById('editPhone');
  const editBirthdate = document.getElementById('editBirthdate');
  const editSkinType = document.getElementById('editSkinType');
  const editAddress = document.getElementById('editAddress');
  
  if (editName) editName.value = userData.name;
  if (editEmail) editEmail.value = userData.email;
  if (editPhone) editPhone.value = userData.phone;
  if (editBirthdate) editBirthdate.value = userData.birthdate;
  if (editSkinType) editSkinType.value = userData.skinType;
  if (editAddress) editAddress.value = userData.address;
}

function setupForm() {
  const form = document.getElementById('profileEditForm');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(form);
      const userData = {
        name: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        birthdate: formData.get('birthdate'),
        skinType: formData.get('skinType'),
        address: formData.get('address')
      };
      
      // Save to localStorage
      localStorage.setItem('bloomie_user_profile', JSON.stringify(userData));
      
      // Show success feedback
      const saveBtn = form.querySelector('.btn-save');
      const originalText = saveBtn.textContent;
      saveBtn.textContent = 'Saved!';
      saveBtn.style.background = '#4caf50';
      
      setTimeout(() => {
        saveBtn.textContent = originalText;
        saveBtn.style.background = '';
        window.location.href = 'profile.html';
      }, 1000);
    });
  }
}

// Photo change functionality (placeholder)
document.querySelector('.change-photo-btn')?.addEventListener('click', function() {
  alert('Photo upload feature coming soon!');
});
