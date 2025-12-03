// trending.js: Trending products functionality

// Products data
const products = [
    {
        id: 1,
        name: 'Hyaluronic Acid Repair Serum',
        brand: 'La Roche-Posay',
        image: 'assets/images/acid-repair.webp',
        bgColor: 'linear-gradient(135deg, #e8f4e8 0%, #c8e6c8 100%)',
        aiRecommended: true,
        description: 'A powerful serum formulated with hyaluronic acid to deeply hydrate and repair damaged skin. Perfect for dry and mature skin types.',
        benefits: [
            'Intense hydration for up to 48 hours',
            'Repairs skin barrier damage',
            'Reduces fine lines and wrinkles',
            'Suitable for sensitive skin'
        ],
        compatibility: 92,
        suggestedUse: 'Apply 2-3 drops to clean face and neck, morning and evening. Follow with moisturizer.'
    },
    {
        id: 2,
        name: 'Balanceful Cica Cream',
        brand: 'Torriden',
        image: 'assets/images/torriden-cica.webp',
        bgColor: 'linear-gradient(135deg, #f8e1e1 0%, #f0c8c8 100%)',
        aiRecommended: false,
        description: 'A soothing cream with Centella Asiatica to calm irritated skin and strengthen the skin barrier.',
        benefits: [
            'Calms redness and irritation',
            'Strengthens skin barrier',
            'Lightweight, non-greasy formula',
            'Ideal for acne-prone skin'
        ],
        compatibility: 88,
        suggestedUse: 'Apply a generous amount as the last step of your skincare routine.'
    },
    {
        id: 3,
        name: 'Post-Acne Moisturizer',
        brand: 'PURITO',
        image: 'assets/images/purito-moisturizer.png',
        bgColor: 'linear-gradient(135deg, #e0e8f0 0%, #b8c8d8 100%)',
        aiRecommended: false,
        description: 'Specially formulated moisturizer for post-acne care. Helps fade acne scars and prevents new breakouts.',
        benefits: [
            'Fades acne scars and hyperpigmentation',
            'Prevents future breakouts',
            'Oil-free hydration',
            'Contains niacinamide and tea tree'
        ],
        compatibility: 85,
        suggestedUse: 'Apply to clean skin twice daily. Can be used under sunscreen.'
    },
    {
        id: 4,
        name: 'Madagascar Centella Toner',
        brand: 'SKIN1004',
        image: 'assets/images/centella-toner.webp',
        bgColor: 'linear-gradient(135deg, #f5e6e0 0%, #e8d0c8 100%)',
        aiRecommended: true,
        description: 'A refreshing, alcohol-free toner formulated with Centella Asiatica extract to calm irritation, restore the skin barrier, and balance hydration levels.',
        benefits: [
            'Soothes redness and irritation',
            'Strengthens the skin\'s natural moisture barrier',
            'Provides lightweight hydration without clogging pores',
            'Helps maintain pH balance for a healthy complexion'
        ],
        compatibility: 95,
        suggestedUse: 'Apply evenly over clean skin with your hands or a cotton pad after cleansing, morning and night.'
    },
    {
        id: 5,
        name: 'Hydrating Cleanser',
        brand: 'CeraVe',
        image: 'assets/images/cerave-hydrating.webp',
        bgColor: 'linear-gradient(135deg, #e6e0f0 0%, #d0c8e8 100%)',
        aiRecommended: true,
        description: 'Gentle, hydrating cleanser with ceramides and hyaluronic acid. Removes dirt and makeup without stripping the skin.',
        benefits: [
            'Gentle cleansing without drying',
            'Restores ceramides',
            'Fragrance-free formula',
            'Dermatologist recommended'
        ],
        compatibility: 90,
        suggestedUse: 'Massage onto wet skin, morning and night. Rinse thoroughly with water.'
    }
];

// Save products to localStorage for access in other pages
localStorage.setItem('bloomie_products', JSON.stringify(products));

document.addEventListener('DOMContentLoaded', function() {
    const productsGrid = document.getElementById('productsGrid');
    const searchInput = document.getElementById('searchInput');
    
    // Load favorites from localStorage
    let favorites = JSON.parse(localStorage.getItem('bloomie_favorites')) || [];
    
    // Initialize favorite buttons
    initializeFavorites();
    
    // Product card click - go to detail
    productsGrid.addEventListener('click', function(e) {
        const card = e.target.closest('.product-card');
        const favoriteBtn = e.target.closest('.favorite-btn');
        
        if (favoriteBtn) {
            e.stopPropagation();
            toggleFavorite(favoriteBtn);
            return;
        }
        
        if (card) {
            const productId = card.getAttribute('data-id');
            window.location.href = `product-detail.html?id=${productId}`;
        }
    });
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const cards = document.querySelectorAll('.product-card');
        
        cards.forEach(card => {
            const name = card.querySelector('.product-name').textContent.toLowerCase();
            if (name.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
    
    function initializeFavorites() {
        const favoriteButtons = document.querySelectorAll('.favorite-btn');
        
        favoriteButtons.forEach(btn => {
            const productId = btn.getAttribute('data-id');
            if (favorites.includes(productId)) {
                btn.innerHTML = '<i class="fas fa-heart"></i>';
                btn.classList.add('active');
            }
        });
    }
    
    function toggleFavorite(btn) {
        const productId = btn.getAttribute('data-id');
        const icon = btn.querySelector('i');
        
        if (favorites.includes(productId)) {
            // Remove from favorites
            favorites = favorites.filter(id => id !== productId);
            icon.className = 'far fa-heart';
            btn.classList.remove('active');
        } else {
            // Add to favorites
            favorites.push(productId);
            icon.className = 'fas fa-heart';
            btn.classList.add('active');
        }
        
        // Save to localStorage
        localStorage.setItem('bloomie_favorites', JSON.stringify(favorites));
    }
});
