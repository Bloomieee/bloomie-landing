document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Parse user data
    const userData = JSON.parse(currentUser);
    
    // Update user info in header
    updateUserInfo(userData);
    
    // Initialize routine
    initializeRoutine();
    
    // Initialize calendar
    initializeCalendar();
    
    // Initialize step interactions
    initializeSteps();
});

function updateUserInfo(userData) {
    const avatarEl = document.querySelector('.routine-avatar img');
    
    if (avatarEl) {
        // Use a realistic avatar instead of placeholder
        avatarEl.src = userData.avatar || 'https://images.unsplash.com/photo-1494790108755-2616b332c1d2?w=35&h=35&fit=crop&crop=face&q=80';
    }
}

function initializeCalendar() {
    const calendarDays = document.querySelectorAll('.calendar-day');
    
    calendarDays.forEach(day => {
        day.addEventListener('click', function() {
            // Remove active class from all days
            calendarDays.forEach(d => d.classList.remove('active'));
            
            // Add active class to clicked day
            this.classList.add('active');
            
            // Update routine for selected day
            updateRoutineForDay(this.textContent);
        });
    });
}

function updateRoutineForDay(dayNumber) {
    // This could be expanded to show different routines for different days
    console.log(`Loading routine for day ${dayNumber}`);
}

function initializeSteps() {
    const expandButtons = document.querySelectorAll('.step-expand');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const step = this.closest('.routine-step');
            let details = step.querySelector('.step-details');
            
            if (details) {
                // Toggle existing details
                if (details.style.display === 'none' || !details.style.display) {
                    details.style.display = 'block';
                    this.innerHTML = '<i class="fas fa-chevron-up"></i>';
                } else {
                    details.style.display = 'none';
                    this.innerHTML = '<i class="fas fa-chevron-down"></i>';
                }
            } else {
                // Create and show details
                details = document.createElement('div');
                details.className = 'step-details';
                details.innerHTML = getStepDetails(step);
                step.appendChild(details);
                this.innerHTML = '<i class="fas fa-chevron-up"></i>';
            }
        });
    });
}

function getStepDetails(step) {
    const stepTitle = step.querySelector('.step-info h4').textContent;
    
    const detailsMap = {
        'Limpiador Espumoso': 'Aplica sobre el rostro húmedo con movimientos circulares suaves. Masajea durante 30 segundos y enjuaga con agua tibia. Este limpiador ayuda a remover impurezas y exceso de grasa sin resecar la piel.',
        'Serum Hidratante': 'Aplica 2-3 gotas sobre la piel limpia y seca. Masajea suavemente hasta que se absorba completamente. El serum proporciona hidratación profunda y nutrientes esenciales para la piel.',
        'Crema Hidratante': 'Aplica una cantidad del tamaño de una arveja sobre rostro y cuello. Masajea con movimientos ascendentes hasta absorción completa. Proporciona hidratación duradera y protección.',
        'Protector Solar': 'Aplica generosamente 15 minutos antes de la exposición solar. Reaplicar cada 2 horas o después de nadar/sudar. SPF 30+ es esencial para proteger contra rayos UV.',
        'Tónico Facial': 'Aplica con un algodón o directamente en las manos. Presiona suavemente sobre la piel limpia. Ayuda a equilibrar el pH y prepara la piel para los siguientes pasos.'
    };
    
    return detailsMap[stepTitle] || 'Sigue las instrucciones del producto para mejores resultados.';
}

function initializeRoutine() {
    // Get lifestyle answers from localStorage
    const lifestyleAnswers = localStorage.getItem('lifestyleAnswers');
    
    if (lifestyleAnswers) {
        const answers = JSON.parse(lifestyleAnswers);
        console.log('Lifestyle answers:', answers);
        
        // You could customize the routine based on answers here
        customizeRoutineBasedOnAnswers(answers);
    }
}

function customizeRoutineBasedOnAnswers(answers) {
    // This function could modify the routine based on user's lifestyle answers
    // For now, we'll keep the default routine
    
    if (answers.skinType === 'grasa') {
        // Could add oil-control products
        console.log('Adjusting routine for oily skin');
    } else if (answers.skinType === 'seca') {
        // Could add more moisturizing products
        console.log('Adjusting routine for dry skin');
    }
}

// Bottom navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const currentPage = window.location.pathname.split('/').pop();
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && href === currentPage) {
            item.classList.add('active');
        }
        
        item.addEventListener('click', function(e) {
            if (href === '#') {
                e.preventDefault();
                return;
            }
        });
    });
});