// Login functionality
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const passwordToggle = document.querySelector('.password-toggle');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');

    // Mock user database for demo purposes
    const mockUsers = [
        { email: 'user@bloomie.com', password: 'password123' },
        { email: 'admin@bloomie.com', password: 'admin123' },
        { email: 'demo@example.com', password: 'demo123' }
    ];

    // Password visibility toggle
    if (passwordToggle) {
        passwordToggle.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            const icon = this.querySelector('i');
            if (type === 'password') {
                icon.className = 'fa fa-eye';
            } else {
                icon.className = 'fa fa-eye-slash';
            }
        });
    }

    // Form validation functions
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePassword(password) {
        return password.length >= 6;
    }

    function showError(errorElement, message) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    function hideError(errorElement) {
        errorElement.classList.remove('show');
    }

    function showSuccess() {
        // Create success message
        const successDiv = document.createElement('div');
        successDiv.className = 'login-success';
        successDiv.innerHTML = `
            <div style="
                background: #d4edda;
                color: #155724;
                padding: 16px;
                border-radius: 8px;
                margin: 16px 0;
                border: 1px solid #c3e6cb;
                text-align: center;
            ">
                <i class="fa fa-check-circle"></i>
                Login successful! Redirecting...
            </div>
        `;
        loginForm.insertBefore(successDiv, loginForm.firstChild);
        // Simulate redirect after 2 seconds
        setTimeout(() => {
            // Check if lifestyle questions have been answered
            if (!localStorage.getItem('bloomie_lifestyle')) {
                window.location.href = 'lifestyle.html';
            } else if (!localStorage.getItem('bloomie_scan_completed')) {
                window.location.href = 'scan.html';
            } else {
                window.location.href = 'dashboard.html';
            }
        }, 2000);
    }

    function authenticateUser(email, password) {
        // Check demo users
        let user = mockUsers.find(user => user.email === email && user.password === password);
        if (user) return user;
        // Check registered user in localStorage
        const regUser = localStorage.getItem('bloomie_user');
        if (regUser) {
            const regData = JSON.parse(regUser);
            if (regData.email === email && regData.password === password) {
                return regData;
            }
        }
        return null;
    }

    // Real-time validation
    emailInput.addEventListener('blur', function() {
        const email = this.value.trim();
        if (email && !validateEmail(email)) {
            showError(emailError, 'Please enter a valid email address');
        } else {
            hideError(emailError);
        }
    });

    passwordInput.addEventListener('blur', function() {
        const password = this.value.trim();
        if (password && !validatePassword(password)) {
            showError(passwordError, 'Password must be at least 6 characters long');
        } else {
            hideError(passwordError);
        }
    });

    // Clear errors on input
    emailInput.addEventListener('input', function() {
        hideError(emailError);
    });

    passwordInput.addEventListener('input', function() {
        hideError(passwordError);
    });

    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        let isValid = true;

        // Reset errors
        hideError(emailError);
        hideError(passwordError);

        // Validate email
        if (!email) {
            showError(emailError, 'Email is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError(emailError, 'Please enter a valid email address');
            isValid = false;
        }

        // Validate password
        if (!password) {
            showError(passwordError, 'Password is required');
            isValid = false;
        } else if (!validatePassword(password)) {
            showError(passwordError, 'Password must be at least 6 characters long');
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        // Show loading state
        const submitBtn = loginForm.querySelector('.login-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Signing In...';
        submitBtn.disabled = true;

        // Simulate API call delay
        setTimeout(() => {
            const user = authenticateUser(email, password);
            
            if (user) {
                // Store user session (in real app, this would be handled by backend)
                const userData = {
                    email: user.email,
                    firstName: user.firstName || 'User',
                    name: user.firstName || 'User',
                    loginTime: new Date().toISOString()
                };
                localStorage.setItem('bloomie_user', JSON.stringify(userData));
                localStorage.setItem('currentUser', JSON.stringify(userData));
                
                showSuccess();
            } else {
                showError(emailError, 'Invalid email or password');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        }, 1000);
    });

    // Social login buttons (mock functionality)
    const googleBtn = document.querySelector('.google-btn');
    const facebookBtn = document.querySelector('.facebook-btn');

    if (googleBtn) {
        googleBtn.addEventListener('click', function() {
            alert('Google login would be implemented here. For demo purposes, this logs you in as demo@example.com');
            const userData = {
                email: 'demo@example.com',
                firstName: 'User',
                name: 'User',
                loginTime: new Date().toISOString(),
                provider: 'google'
            };
            localStorage.setItem('bloomie_user', JSON.stringify(userData));
            localStorage.setItem('currentUser', JSON.stringify(userData));
            showSuccess();
        });
    }

    if (facebookBtn) {
        facebookBtn.addEventListener('click', function() {
            alert('Facebook login would be implemented here. For demo purposes, this logs you in as demo@example.com');
            const userData = {
                email: 'demo@example.com',
                firstName: 'User',
                name: 'User',
                loginTime: new Date().toISOString(),
                provider: 'facebook'
            };
            localStorage.setItem('bloomie_user', JSON.stringify(userData));
            localStorage.setItem('currentUser', JSON.stringify(userData));
            showSuccess();
        });
    }

    // Check if user is already logged in (but allow staying on login page)
    const existingUser = localStorage.getItem('bloomie_user');
    if (existingUser) {
        const userData = JSON.parse(existingUser);
        const loginTime = new Date(userData.loginTime);
        const now = new Date();
        const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
        
        // Session expires after 24 hours - just clean up expired sessions
        if (hoursDiff >= 24) {
            localStorage.removeItem('bloomie_user');
            localStorage.removeItem('bloomie_lifestyle');
        }
        // Don't auto-redirect, let user manually log in again if they want
    }
});

// Utility function to check login status (can be used in other pages)
function isUserLoggedIn() {
    const user = localStorage.getItem('bloomie_user');
    if (!user) return false;
    
    const userData = JSON.parse(user);
    const loginTime = new Date(userData.loginTime);
    const now = new Date();
    const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
    
    if (hoursDiff >= 24) {
        localStorage.removeItem('bloomie_user');
        return false;
    }
    
    return userData;
}

// Logout function
function logout() {
    localStorage.removeItem('bloomie_user');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('bloomie_lifestyle');
    localStorage.removeItem('bloomie_scan_completed');
    window.location.href = 'login.html';
}