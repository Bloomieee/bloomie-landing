// Language Toggle Functionality for Internationalization
class LanguageManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('bloomie-language') || 'en';
        this.translations = {};
        this.init();
    }

    async init() {
        await this.loadTranslations();
        this.createLanguageToggle();
        this.applyLanguage(this.currentLanguage);
        this.bindEvents();
    }

    async loadTranslations() {
        try {
            // Load English translations
            const enResponse = await fetch('assets/i18n/en.json');
            this.translations.en = await enResponse.json();

            // Load Spanish translations
            const esResponse = await fetch('assets/i18n/es.json');
            this.translations.es = await esResponse.json();
        } catch (error) {
            console.warn('Could not load translations, using default English');
            this.translations.en = {}; // Fallback to existing content
            this.translations.es = {};
        }
    }

    createLanguageToggle() {
        const navbar = document.querySelector('.navbar .container');
        if (!navbar) return;

        const languageToggle = document.createElement('div');
        languageToggle.className = 'language-toggle';
        languageToggle.innerHTML = `
            <button class="language-btn" data-lang="en" title="English" aria-label="Switch to English">
                EN
            </button>
            <button class="language-btn" data-lang="es" title="Español" aria-label="Cambiar a Español">
                ES
            </button>
        `;

        // Insert before the nav-toggle
        const navToggle = navbar.querySelector('.nav-toggle');
        navbar.insertBefore(languageToggle, navToggle);

        // Update active state
        this.updateActiveLanguage();
    }

    bindEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('language-btn')) {
                const lang = e.target.dataset.lang;
                this.switchLanguage(lang);
            }
        });
    }

    switchLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('bloomie-language', lang);
        this.applyLanguage(lang);
        this.updateActiveLanguage();
        
        // Update video captions
        this.updateVideoLanguage(lang);
        
        // Announce language change for screen readers
        this.announceLanguageChange(lang);
    }

    applyLanguage(lang) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.dataset.i18n;
            const translation = this.getTranslation(key, lang);
            
            if (translation) {
                if (element.tagName === 'INPUT' && element.type === 'submit') {
                    element.value = translation;
                } else if (element.hasAttribute('placeholder')) {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Update document language attribute
        document.documentElement.lang = lang;
    }

    getTranslation(key, lang) {
        const keys = key.split('.');
        let translation = this.translations[lang];
        
        for (const k of keys) {
            if (translation && translation[k]) {
                translation = translation[k];
            } else {
                return null;
            }
        }
        
        return translation;
    }

    updateActiveLanguage() {
        const buttons = document.querySelectorAll('.language-btn');
        buttons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === this.currentLanguage);
        });
    }

    updateVideoLanguage(lang) {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            const tracks = video.querySelectorAll('track');
            tracks.forEach(track => {
                track.default = track.srclang === lang;
                if (track.srclang === lang) {
                    track.mode = 'showing';
                } else {
                    track.mode = 'hidden';
                }
            });
        });
    }

    announceLanguageChange(lang) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = lang === 'en' 
            ? 'Language changed to English' 
            : 'Idioma cambiado a Español';
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
}

// Accessibility Enhancements
class AccessibilityEnhancer {
    constructor() {
        this.init();
    }

    init() {
        this.enhanceKeyboardNavigation();
        this.addSkipLinks();
        this.enhanceFormAccessibility();
        this.addAriaLabels();
        this.monitorFocusManagement();
    }

    enhanceKeyboardNavigation() {
        // Make sure all interactive elements are keyboard accessible
        const interactiveElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]');
        
        interactiveElements.forEach(element => {
            // Add keyboard event listeners for custom elements
            if (!element.hasAttribute('href') && !element.hasAttribute('type')) {
                element.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        element.click();
                    }
                });
            }
        });
    }

    addSkipLinks() {
        if (document.querySelector('.skip-links')) return;

        const skipLinks = document.createElement('nav');
        skipLinks.className = 'skip-links';
        skipLinks.innerHTML = `
            <a href="#main-content" class="skip-link">Skip to main content</a>
            <a href="#navigation" class="skip-link">Skip to navigation</a>
        `;

        document.body.insertAdjacentElement('afterbegin', skipLinks);

        // Add main content landmark if it doesn't exist
        const mainContent = document.querySelector('main, [role="main"]') || 
                           document.querySelector('.hero, .section');
        if (mainContent && !mainContent.id) {
            mainContent.id = 'main-content';
        }

        // Add navigation landmark
        const navigation = document.querySelector('nav, .navbar');
        if (navigation && !navigation.id) {
            navigation.id = 'navigation';
        }
    }

    enhanceFormAccessibility() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, select, textarea');
            
            inputs.forEach(input => {
                // Associate labels with inputs
                const label = form.querySelector(`label[for="${input.id}"]`);
                if (!label && input.type !== 'submit' && input.type !== 'button') {
                    // Add aria-label if no label exists
                    if (!input.getAttribute('aria-label')) {
                        const placeholder = input.getAttribute('placeholder');
                        if (placeholder) {
                            input.setAttribute('aria-label', placeholder);
                        }
                    }
                }

                // Add aria-describedby for error messages
                const errorElement = form.querySelector(`[data-error-for="${input.name}"], .error-${input.name}`);
                if (errorElement) {
                    input.setAttribute('aria-describedby', errorElement.id || `error-${input.name}`);
                    if (!errorElement.id) {
                        errorElement.id = `error-${input.name}`;
                    }
                }
            });
        });
    }

    addAriaLabels() {
        // Add aria-labels to elements that need them
        const elementsNeedingLabels = [
            { selector: '.nav-toggle', label: 'Toggle navigation menu' },
            { selector: '.brand', label: 'Bloomie home page' },
            { selector: '.feature-icon', label: 'Feature checkmark' },
            { selector: '.card', label: 'Information card' }
        ];

        elementsNeedingLabels.forEach(({ selector, label }) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                if (!element.getAttribute('aria-label')) {
                    element.setAttribute('aria-label', label);
                }
            });
        });

        // Add role attributes where needed
        const roleElements = [
            { selector: '.hero', role: 'banner' },
            { selector: '.footer', role: 'contentinfo' },
            { selector: '.team', role: 'list' },
            { selector: '.team-item', role: 'listitem' }
        ];

        roleElements.forEach(({ selector, role }) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                if (!element.getAttribute('role')) {
                    element.setAttribute('role', role);
                }
            });
        });
    }

    monitorFocusManagement() {
        // Ensure focus is visible
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });

        // Manage focus for mobile menu
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
                
                if (!isExpanded) {
                    // Focus first menu item when opening
                    const firstMenuItem = navMenu.querySelector('a');
                    if (firstMenuItem) {
                        setTimeout(() => firstMenuItem.focus(), 100);
                    }
                }
            });

            // Close menu on escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
                    navToggle.click();
                    navToggle.focus();
                }
            });
        }
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const languageManager = new LanguageManager();
    const accessibilityEnhancer = new AccessibilityEnhancer();
    
    // Add high contrast mode toggle
    const contrastToggle = document.createElement('button');
    contrastToggle.className = 'contrast-toggle';
    contrastToggle.innerHTML = '🎨';
    contrastToggle.setAttribute('aria-label', 'Toggle high contrast mode');
    contrastToggle.setAttribute('title', 'Toggle high contrast mode');
    
    contrastToggle.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
        localStorage.setItem('bloomie-high-contrast', 
            document.body.classList.contains('high-contrast'));
    });

    // Restore high contrast preference
    if (localStorage.getItem('bloomie-high-contrast') === 'true') {
        document.body.classList.add('high-contrast');
    }

    document.body.appendChild(contrastToggle);
});