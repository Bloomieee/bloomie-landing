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
        // Use the Bloomie logo
        avatarEl.src = 'assets/images/logo-msize.png';
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
        'La Roche-Posay Toleriane Hydrating Gentle Face Cleanser': 'Apply to wet face with gentle circular motions. Massage for 30 seconds and rinse with lukewarm water. This cleanser helps remove impurities and excess oil without drying the skin.',
        'The Ordinary Niacinamide 10% + Zinc 1%': 'Apply 2-3 drops on clean, dry skin. Massage gently until fully absorbed. This serum provides deep hydration and essential nutrients for your skin.',
        'Bioderma Hydrabio Moisturizing Serum': 'Apply a pea-sized amount on face and neck. Massage with upward motions until fully absorbed. Provides long-lasting hydration and protection.',
        'Sunscreen': 'Apply generously 15 minutes before sun exposure. Reapply every 2 hours or after swimming/sweating. SPF 30+ is essential for UV protection.',
        'Toner': 'Apply with cotton pad or directly on hands. Press gently on clean skin. Helps balance pH and prepares skin for next steps.'
    };
    
    return detailsMap[stepTitle] || 'Follow product instructions for best results.';
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