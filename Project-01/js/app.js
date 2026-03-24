// CTS_SM Premium App Logic
document.addEventListener('alpine:init', () => {
    Alpine.store('cart', {
        items: JSON.parse(localStorage.getItem('cts_cart_v2')) || [],
        
        get count() {
            return this.items.reduce((sum, item) => sum + item.quantity, 0);
        },

        get subtotal() {
            return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        },

        addItem(product) {
            const existing = this.items.find(i => i.id === product.id);
            if (existing) {
                existing.quantity++;
            } else {
                this.items.push({ ...product, quantity: 1 });
            }
            this.save();
            this.notify(`Added ${product.name} to cart`);
        },

        removeItem(id) {
            this.items = this.items.filter(i => i.id !== id);
            this.save();
        },

        updateQuantity(id, delta) {
            const item = this.items.find(i => i.id === id);
            if (item) {
                item.quantity = Math.max(1, item.quantity + delta);
                this.save();
            }
        },

        clear() {
            this.items = [];
            this.save();
        },

        save() {
            localStorage.setItem('cts_cart_v2', JSON.stringify(this.items));
        },

        notify(message) {
            window.dispatchEvent(new CustomEvent('toast', { detail: { message } }));
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) {
        window.lucide.createIcons();
    }
});
