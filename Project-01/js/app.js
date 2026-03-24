// CTS_SM Premium App Logic (v2.2)
document.addEventListener('alpine:init', () => {
    // Theme Store
    Alpine.store('theme', {
        isDark: localStorage.getItem('cts_theme') === 'dark',
        
        init() {
            this.sync();
        },

        toggle() {
            this.isDark = !this.isDark;
            localStorage.setItem('cts_theme', this.isDark ? 'dark' : 'light');
            this.sync();
        },

        sync() {
            if (this.isDark) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    });

    // Shared Product Database
    Alpine.store('products', {
        list: [
            // Vegetables
            { id: 1, name: 'Organic Carrots', category: 'Vegetables', weight: '500g', price: 180, img: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?q=80&w=400' },
            { id: 2, name: 'Fresh Broccoli', category: 'Vegetables', weight: '1 Unit', price: 320, img: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=400' },
            { id: 3, name: 'Red Bell Pepper', category: 'Vegetables', weight: '250g', price: 150, img: 'https://images.unsplash.com/photo-1558818498-28c1e002b655?auto=format&fit=crop&w=400&q=80' },
            { id: 4, name: 'Spinach Bunch', category: 'Vegetables', weight: '200g', price: 90, img: 'https://images.unsplash.com/photo-1576045057995-568f588f829a?auto=format&fit=crop&w=400&q=80' },
            { id: 5, name: 'Local Potatoes', category: 'Vegetables', weight: '1kg', price: 280, img: 'https://images.unsplash.com/photo-1518977676601-b53f02ac695d?auto=format&fit=crop&w=400&q=80' },
            
            // Fruits
            { id: 6, name: 'Local Strawberries', category: 'Fruits', weight: '250g', price: 450, img: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=400&q=80' },
            { id: 7, name: 'Avocado Pack', category: 'Fruits', weight: '2 Units', price: 680, img: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=400&q=80' },
            { id: 8, name: 'Premium Bananas', category: 'Fruits', weight: '500g', price: 120, img: 'https://images.unsplash.com/photo-1571771894821-ad990241274d?auto=format&fit=crop&w=400&q=80' },
            { id: 9, name: 'Fresh Pineapple', category: 'Fruits', weight: '1 Unit', price: 380, img: 'https://images.unsplash.com/photo-1550258114-68bd299768a5?auto=format&fit=crop&w=400&q=80' },
            { id: 10, name: 'Seedless Grapes', category: 'Fruits', weight: '250g', price: 550, img: 'https://images.unsplash.com/photo-1533062391945-667389c97800?auto=format&fit=crop&w=400&q=80' },

            // Meat
            { id: 11, name: 'Chicken Breast', category: 'Meat & Poultry', weight: '500g', price: 950, img: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?q=80&w=400' },
            { id: 12, name: 'Fresh Beef', category: 'Meat & Poultry', weight: '500g', price: 1450, img: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?q=80&w=400' },
            
            // Dairy
            { id: 13, name: 'Fresh Milk', category: 'Dairy', weight: '1L', price: 240, img: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=400' },
            { id: 14, name: 'Greek Yogurt', category: 'Dairy', weight: '500g', price: 550, img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=400' },
            { id: 15, name: 'Cheddar Cheese', category: 'Dairy', weight: '200g', price: 850, img: 'https://images.unsplash.com/photo-1618164435735-413d3b066c9a?q=80&w=400' },

            // Bakery
            { id: 16, name: 'Sourdough Bread', category: 'Bakery', weight: 'Large', price: 340, img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400' },
            { id: 17, name: 'Fresh Croissants', category: 'Bakery', weight: '2 Units', price: 420, img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=400' },

            // Household
            { id: 18, name: 'Multi-cleaner', category: 'Household', weight: '500ml', price: 650, img: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=400' }
        ],
        
        get categories() {
            return [...new Set(this.list.map(p => p.category))];
        }
    });

    // Global Cart Store
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

        get totalAmount() {
            return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
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
