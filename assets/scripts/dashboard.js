document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Parse user data
    const userData = JSON.parse(currentUser);
    
    // Update user greeting
    updateUserGreeting(userData);
    
    // Initialize dashboard
    initializeDashboard();
});

function updateUserGreeting(userData) {
    const greetingEl = document.querySelector('.greeting');
    const subgreetingEl = document.querySelector('.subgreeting');
    const avatarEl = document.querySelector('.user-avatar');
    
    if (greetingEl) {
        const hour = new Date().getHours();
        let greeting = 'Good afternoon';
        
        if (hour < 12) {
            greeting = 'Good morning';
        } else if (hour >= 18) {
            greeting = 'Good evening';
        }
        
        greetingEl.textContent = `${greeting}, ${userData.firstName || userData.name || 'User'}`;
    }
    
    if (subgreetingEl) {
        subgreetingEl.textContent = 'Your personalized routine is ready';
    }
    
    if (avatarEl) {
        // Use the Bloomie logo
        avatarEl.src = 'assets/images/logo-msize.png';
    }
}

function initializeDashboard() {
    // Initialize notification button
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', showNotifications);
    }
    
    // Initialize settings button
    const settingsBtn = document.querySelector('.settings-btn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', showSettings);
    }
    
    // Initialize get started button
    const getStartedBtn = document.querySelector('.get-started-btn');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', startScanning);
    }
    
    // Initialize progress chart
    initializeProgressChart();
    
    // Initialize trending items
    initializeTrendingItems();
    
    // Check if scan is completed
    checkScanStatus();
}

function showNotifications() {
    alert('Notifications:\n\n• Your night routine is ready\n• Reminder: Apply sunscreen\n• New product recommendation');
}

function showSettings() {
    alert('Settings:\n\n• User Profile\n• Notifications\n• Privacy\n• Log out');
}

function startScanning() {
    window.location.href = 'scan.html';
}

function initializeProgressChart() {
    const progressChart = document.querySelector('.progress-chart');
    if (progressChart) {
        // Create a simple progress visualization
        progressChart.innerHTML = `
            <div style="text-align: center; color: #666;">
                <i class="fas fa-chart-line" style="font-size: 24px; margin-bottom: 10px;"></i>
                <p style="margin: 0; font-size: 12px;">Progress this week</p>
                <p style="margin: 5px 0 0; font-size: 16px; font-weight: 600; color: #333;">85%</p>
            </div>
        `;
    }
}

function initializeTrendingItems() {
    const trendingContainer = document.querySelector('.trending-items');
    if (trendingContainer) {
        const items = [
            { icon: '🧴', name: 'Cleanser' },
            { icon: '🧴', name: 'Serum' },
            { icon: '🧴', name: 'Cream' },
            { icon: '🧴', name: 'Sunscreen' }
        ];
        
        trendingContainer.innerHTML = items.map(item => `
            <div class="trending-item" title="${item.name}">
                ${item.icon}
            </div>
        `).join('');
    }
}

function checkScanStatus() {
    const scanCompleted = localStorage.getItem('bloomie_scan_completed');
    const scanCard = document.querySelector('.scan-card');
    
    if (scanCompleted && scanCard) {
        // Update scan card to show completed status
        const scanCardContent = scanCard.querySelector('.scan-card-content');
        const getStartedBtn = scanCard.querySelector('.get-started-btn');
        
        if (scanCardContent) {
            scanCardContent.innerHTML = `
                <h3>Analysis Complete</h3>
                <p>Your personalized routine is ready</p>
                <button class="get-started-btn" onclick="window.location.href='rutina.html'">View Routine</button>
            `;
        }
    }
}

// Bottom navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const currentPage = window.location.pathname.split('/').pop();
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && (href === currentPage || 
            (currentPage === 'dashboard.html' && href === '#') ||
            (currentPage === '' && href === 'index.html'))) {
            item.classList.add('active');
        }
        
        item.addEventListener('click', function(e) {
            if (href === '#') {
                e.preventDefault();
                // Already on dashboard
                return;
            }
        });
    });
});