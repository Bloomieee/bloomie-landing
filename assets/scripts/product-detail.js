document.addEventListener('DOMContentLoaded', function() {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    // Load products from localStorage
    const products = JSON.parse(localStorage.getItem('bloomie_products')) || [];
    
    // Find the product
    const product = products.find(p => p.id === parseInt(productId));
    
    if (!product) {
        // Redirect to trending if product not found
        window.location.href = 'trending.html';
        return;
    }
    
    // Load favorites
    let favorites = JSON.parse(localStorage.getItem('bloomie_favorites')) || [];
    
    // Populate product details
    populateProductDetails(product);
    
    // Initialize favorite button state
    const favoriteBtn = document.getElementById('favoriteBtn');
    if (favorites.includes(productId)) {
        favoriteBtn.innerHTML = '<i class="fas fa-heart"></i>';
        favoriteBtn.classList.add('active');
    }
    
    // Favorite button click
    favoriteBtn.addEventListener('click', function() {
        toggleFavorite(productId);
    });
    
    // Add to cart button
    const addToCartBtn = document.getElementById('addToCartBtn');
    addToCartBtn.addEventListener('click', function() {
        // Show added to cart feedback
        this.innerHTML = '<i class="fas fa-check"></i> Added to Cart';
        this.style.background = '#4caf50';
        
        setTimeout(() => {
            this.innerHTML = 'Add to Cart';
            this.style.background = '';
        }, 2000);
        
        // Store in cart (optional functionality)
        let cart = JSON.parse(localStorage.getItem('bloomie_cart')) || [];
        if (!cart.includes(productId)) {
            cart.push(productId);
            localStorage.setItem('bloomie_cart', JSON.stringify(cart));
        }
    });
    
    function populateProductDetails(product) {
        // Set product image
        const productImage = document.getElementById('productImage');
        if (product.image) {
            // Has actual image
            productImage.innerHTML = `<img src="${product.image}" alt="${product.name}">` + productImage.innerHTML;
            productImage.style.background = '#f8f8f8';
        } else {
            // Use gradient background
            productImage.style.background = product.bgColor;
        }
        
        // Set AI badge visibility
        const aiBadge = document.getElementById('aiBadge');
        if (product.aiRecommended) {
            aiBadge.style.display = 'flex';
        } else {
            aiBadge.style.display = 'none';
        }
        
        // Set basic info
        document.getElementById('productBrand').textContent = product.brand;
        document.getElementById('productName').textContent = product.name;
        document.getElementById('productDescription').textContent = product.description;
        
        // Set compatibility
        document.getElementById('compatibilityScore').textContent = product.compatibility + '%';
        document.getElementById('compatibilityFill').style.width = product.compatibility + '%';
        
        // Set benefits
        const benefitsList = document.getElementById('benefitsList');
        benefitsList.innerHTML = '';
        product.benefits.forEach(benefit => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fas fa-check-circle"></i> ${benefit}`;
            benefitsList.appendChild(li);
        });
        
        // Set suggested use
        document.getElementById('suggestedUse').textContent = product.suggestedUse;
    }
    
    function toggleFavorite(productId) {
        const favoriteBtn = document.getElementById('favoriteBtn');
        const icon = favoriteBtn.querySelector('i');
        
        if (favorites.includes(productId)) {
            // Remove from favorites
            favorites = favorites.filter(id => id !== productId);
            icon.className = 'far fa-heart';
            favoriteBtn.classList.remove('active');
        } else {
            // Add to favorites
            favorites.push(productId);
            icon.className = 'fas fa-heart';
            favoriteBtn.classList.add('active');
        }
        
        // Save to localStorage
        localStorage.setItem('bloomie_favorites', JSON.stringify(favorites));
    }
});
