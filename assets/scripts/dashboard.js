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
        let greeting = 'Buenas tardes';
        
        if (hour < 12) {
            greeting = 'Buenos días';
        } else if (hour >= 18) {
            greeting = 'Buenas noches';
        }
        
        greetingEl.textContent = `${greeting}, ${userData.firstName || userData.name || 'Usuario'}`;
    }
    
    if (subgreetingEl) {
        subgreetingEl.textContent = 'Tu rutina personalizada está lista';
    }
    
    if (avatarEl) {
        // Use a realistic avatar instead of placeholder
        avatarEl.src = userData.avatar || 'https://images.unsplash.com/photo-1494790108755-2616b332c1d2?w=40&h=40&fit=crop&crop=face&q=80';
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
    alert('Notificaciones:\n\n• Tu rutina de noche está lista\n• Recordatorio: Aplicar protector solar\n• Nueva recomendación de productos');
}

function showSettings() {
    alert('Configuraciones:\n\n• Perfil de usuario\n• Notificaciones\n• Privacidad\n• Cerrar sesión');
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
                <p style="margin: 0; font-size: 12px;">Progreso esta semana</p>
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
                <h3>Análisis Completado</h3>
                <p>Tu rutina personalizada está lista</p>
                <button class="get-started-btn" onclick="window.location.href='rutina.html'">Ver Rutina</button>
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