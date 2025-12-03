// favorites.js: Favorites page functionality

document.addEventListener('DOMContentLoaded', function() {
    const favoritesGrid = document.getElementById('favoritesGrid');
    const emptyState = document.getElementById('emptyState');
    const favoritesCount = document.getElementById('favoritesCount');
    
    // Load products and favorites
    const products = JSON.parse(localStorage.getItem('bloomie_products')) || [];
    let favorites = JSON.parse(localStorage.getItem('bloomie_favorites')) || [];
    
    // Render favorites
    renderFavorites();
    
    // Handle remove clicks
    favoritesGrid.addEventListener('click', function(e) {
        const removeBtn = e.target.closest('.remove-favorite');
        const card = e.target.closest('.favorite-card');
        
        if (removeBtn) {
            e.stopPropagation();
            const productId = removeBtn.getAttribute('data-id');
            removeFavorite(productId, card);
            return;
        }
        
        if (card) {
            const productId = card.getAttribute('data-id');
            window.location.href = `product-detail.html?id=${productId}`;
        }
    });
    
    function renderFavorites() {
        favoritesGrid.innerHTML = '';
        
        // Update count badge
        favoritesCount.textContent = favorites.length;
        
        if (favorites.length === 0) {
            emptyState.style.display = 'flex';
            return;
        }
        
        emptyState.style.display = 'none';
        
        favorites.forEach(favoriteId => {
            const product = products.find(p => p.id === parseInt(favoriteId));
            if (product) {
                const card = createFavoriteCard(product);
                favoritesGrid.appendChild(card);
            }
        });
    }
    
    function createFavoriteCard(product) {
        const card = document.createElement('div');
        card.className = 'favorite-card';
        card.setAttribute('data-id', product.id);
        
        // Check if product has an actual image or just background color
        let imageContent = '';
        if (product.image && !product.image.startsWith('linear-gradient')) {
            imageContent = `<img src="${product.image}" alt="${product.name}">`;
        }
        
        card.innerHTML = `
            <div class="favorite-image" style="background: ${product.bgColor || '#f5f5f5'}">
                ${imageContent}
                ${product.aiRecommended ? '<span class="ai-badge"><i class="fas fa-sparkles"></i> AI</span>' : ''}
                <button class="remove-favorite" data-id="${product.id}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="favorite-info">
                <p class="favorite-brand">${product.brand}</p>
                <h4 class="favorite-name">${product.name}</h4>
                <div class="favorite-compatibility">
                    <i class="fas fa-check-circle"></i>
                    <span>${product.compatibility}% Match</span>
                </div>
            </div>
        `;
        
        return card;
    }
    
    function removeFavorite(productId, card) {
        // Animate removal
        card.style.transform = 'scale(0.8)';
        card.style.opacity = '0';
        
        setTimeout(() => {
            // Remove from array
            favorites = favorites.filter(id => id !== productId);
            localStorage.setItem('bloomie_favorites', JSON.stringify(favorites));
            
            // Re-render
            renderFavorites();
        }, 300);
    }
});
