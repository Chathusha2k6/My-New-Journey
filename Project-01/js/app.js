// Shared logic for CTS_SM
document.addEventListener('DOMContentLoaded', () => {
    console.log('CTS_SM App Initialized');
    
    // Initialize Lucide icons for all pages
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Simple Cart Persistence
    const cart = {
        items: JSON.parse(localStorage.getItem('cts_cart')) || [],
        
        add(product) {
            this.items.push(product);
            this.save();
            this.updateUI();
        },
        
        save() {
            localStorage.setItem('cts_cart', JSON.stringify(this.items));
        },
        
        updateUI() {
            // This could be handled by Alpine.js if we use it globally
            const event = new CustomEvent('cart-updated', { detail: { count: this.items.length } });
            window.dispatchEvent(event);
        }
    };

    window.ctsCart = cart;
});
