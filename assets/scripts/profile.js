// profile.js: Profile page functionality

document.addEventListener('DOMContentLoaded', function() {
  loadProfileData();
  setupLogout();
});

function loadProfileData() {
  // Get user data from registration/login
  const currentUser = JSON.parse(localStorage.getItem('bloomie_user')) || {};
  // Get additional profile data if edited
  const profileData = JSON.parse(localStorage.getItem('bloomie_user_profile')) || {};
  
  // Merge data - profile edits take priority
  const userData = {
    name: profileData.name || currentUser.name || currentUser.firstName || 'User',
    email: profileData.email || currentUser.email || 'user@email.com',
    phone: profileData.phone || '+51 999 999 999',
    address: profileData.address || 'Lima, Peru'
  };
  
  // Update profile display
  const profileName = document.getElementById('profileName');
  const profileEmail = document.getElementById('profileEmail');
  const infoEmail = document.getElementById('infoEmail');
  const infoPhone = document.getElementById('infoPhone');
  const infoAddress = document.getElementById('infoAddress');
  
  if (profileName) profileName.textContent = userData.name;
  if (profileEmail) profileEmail.textContent = userData.email;
  if (infoEmail) infoEmail.textContent = userData.email;
  if (infoPhone) infoPhone.textContent = userData.phone;
  if (infoAddress) infoAddress.textContent = userData.address;
}

function setupLogout() {
  const logoutBtn = document.getElementById('logoutBtn');
  
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      if (confirm('Are you sure you want to log out?')) {
        // Clear user session data
        localStorage.removeItem('bloomie_user');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('bloomie_scan_completed');
        
        // Redirect to login
        window.location.href = 'login.html';
      }
    });
  }
}
