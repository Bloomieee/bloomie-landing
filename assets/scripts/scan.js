// scan.js: Face scanning simulation

document.addEventListener('DOMContentLoaded', function() {
  const startScanBtn = document.getElementById('startScanBtn');
  const continueBtn = document.getElementById('continueBtn');
  const prepareScreen = document.getElementById('prepareScreen');
  const scanningScreen = document.getElementById('scanningScreen');
  const scanProgress = document.querySelector('.scan-progress');

  startScanBtn.addEventListener('click', function() {
    // Hide prepare screen, show scanning screen
    prepareScreen.style.display = 'none';
    scanningScreen.style.display = 'block';
    
    // Start scan animation
    simulateScan();
  });

  function simulateScan() {
    let progress = 0;
    const scanInterval = setInterval(() => {
      progress += 2;
      
      // Update circular progress
      const circumference = 2 * Math.PI * 80; // radius = 80
      const offset = circumference - (progress / 100) * circumference;
      scanProgress.style.strokeDashoffset = offset;
      
      if (progress >= 100) {
        clearInterval(scanInterval);
        
        // Show continue button after scan completes
        setTimeout(() => {
          document.querySelector('.scan-status p').textContent = 'Scan completed successfully!';
          continueBtn.style.display = 'block';
        }, 500);
      }
    }, 50);
  }

  continueBtn.addEventListener('click', function() {
    // Mark scan as completed and redirect to main dashboard
    localStorage.setItem('bloomie_scan_completed', 'true');
    window.location.href = 'dashboard.html';
  });
});