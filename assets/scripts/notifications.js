// notifications.js: Notification settings functionality

document.addEventListener('DOMContentLoaded', function() {
  loadNotificationSettings();
  setupToggleListeners();
  setupSaveButton();
});

function loadNotificationSettings() {
  // Get saved settings from localStorage
  const settings = JSON.parse(localStorage.getItem('bloomie_notifications')) || getDefaultSettings();
  
  // Apply settings to toggles
  document.getElementById('appointmentReminders').checked = settings.appointmentReminders;
  document.getElementById('dailySummary').checked = settings.dailySummary;
  document.getElementById('productRecommendations').checked = settings.productRecommendations;
  document.getElementById('progressUpdates').checked = settings.progressUpdates;
  document.getElementById('emailNotifications').checked = settings.emailNotifications;
  
  // Set reminder time
  const reminderTime = document.getElementById('reminderTime');
  if (reminderTime) {
    reminderTime.value = settings.reminderTime || '30';
  }
  
  // Show/hide reminder time based on toggle state
  toggleReminderTimeVisibility(settings.appointmentReminders);
}

function getDefaultSettings() {
  return {
    appointmentReminders: true,
    reminderTime: '30',
    dailySummary: true,
    productRecommendations: true,
    progressUpdates: false,
    emailNotifications: false
  };
}

function setupToggleListeners() {
  // Appointment reminders toggle - show/hide time selector
  const appointmentToggle = document.getElementById('appointmentReminders');
  if (appointmentToggle) {
    appointmentToggle.addEventListener('change', function() {
      toggleReminderTimeVisibility(this.checked);
    });
  }
}

function toggleReminderTimeVisibility(show) {
  const reminderTimeGroup = document.getElementById('reminderTimeGroup');
  if (reminderTimeGroup) {
    reminderTimeGroup.style.display = show ? 'block' : 'none';
  }
}

function setupSaveButton() {
  const saveBtn = document.getElementById('saveNotifications');
  
  if (saveBtn) {
    saveBtn.addEventListener('click', function() {
      // Collect settings
      const settings = {
        appointmentReminders: document.getElementById('appointmentReminders').checked,
        reminderTime: document.getElementById('reminderTime').value,
        dailySummary: document.getElementById('dailySummary').checked,
        productRecommendations: document.getElementById('productRecommendations').checked,
        progressUpdates: document.getElementById('progressUpdates').checked,
        emailNotifications: document.getElementById('emailNotifications').checked
      };
      
      // Save to localStorage
      localStorage.setItem('bloomie_notifications', JSON.stringify(settings));
      
      // Show success feedback
      const originalText = saveBtn.textContent;
      saveBtn.textContent = 'Saved!';
      saveBtn.style.background = '#4caf50';
      
      setTimeout(() => {
        saveBtn.textContent = originalText;
        saveBtn.style.background = '';
        window.history.back();
      }, 1000);
    });
  }
}
