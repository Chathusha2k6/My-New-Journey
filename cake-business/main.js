/**
 * Amma's Heavenly Treats - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    let cart = [];
    let galleryImages = [];
    let currentLightboxIndex = 0;
    
    // DOM Elements
    const menuBtn = document.getElementById('menu-btn');
    const closeMenu = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const themeToggle = document.getElementById('theme-toggle');
    const cartBtn = document.getElementById('cart-btn');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCart = document.getElementById('close-cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    const checkoutBtn = document.getElementById('checkout-btn');
    const orderForm = document.getElementById('order-form');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const closeLightbox = document.getElementById('close-lightbox');
    const prevImg = document.getElementById('prev-img');
    const nextImg = document.getElementById('next-img');

    // Collect all gallery images
    document.querySelectorAll('.gallery-item img').forEach(img => {
        const container = img.closest('.gallery-item');
        galleryImages.push({
            src: img.src,
            title: container.querySelector('span')?.textContent || '',
            desc: ''
        });
    });

    // Dark Mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    }

    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    });

    // Performance Toggle
    const perfToggle = document.getElementById('perf-toggle');
    let perfMode = localStorage.getItem('perfMode') === 'true';
    
    function updatePerfMode() {
        if (perfMode) {
            document.body.classList.add('performance-mode');
            document.querySelectorAll('.animate-pulse').forEach(el => el.style.animation = 'none');
            document.querySelectorAll('.blur-3xl').forEach(el => el.style.filter = 'blur(0)');
            perfToggle.innerHTML = '<i class="fas fa-tachometer-alt text-green-500 text-sm"></i>';
        } else {
            document.body.classList.remove('performance-mode');
            perfToggle.innerHTML = '<i class="fas fa-bolt text-bakery-gold text-sm"></i>';
        }
    }
    
    updatePerfMode();
    
    perfToggle.addEventListener('click', () => {
        perfMode = !perfMode;
        localStorage.setItem('perfMode', perfMode);
        updatePerfMode();
    });

    // Mobile Menu
    const toggleMobileMenu = (open) => {
        if (open) {
            mobileMenu.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = 'auto';
        }
    };

    menuBtn.addEventListener('click', () => toggleMobileMenu(true));
    closeMenu.addEventListener('click', () => toggleMobileMenu(false));
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => toggleMobileMenu(false));
    });

    // Cart
    const toggleCart = (open) => {
        if (open) {
            cartSidebar.classList.remove('translate-x-full');
            cartOverlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        } else {
            cartSidebar.classList.add('translate-x-full');
            cartOverlay.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    };

    cartBtn.addEventListener('click', () => toggleCart(true));
    closeCart.addEventListener('click', () => toggleCart(false));
    cartOverlay.addEventListener('click', () => toggleCart(false));

    // Add to Cart
    window.addToCart = function(btn) {
        const card = btn.closest('[data-price]');
        const name = card.dataset.name;
        const price = parseInt(card.dataset.price);
        
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        
        updateCart();
        
        btn.innerHTML = '<i class="fas fa-check"></i>';
        btn.classList.add('bg-green-500', 'text-white');
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-cart-plus"></i>';
            btn.classList.remove('bg-green-500', 'text-white');
        }, 1000);
    };

    // Remove from Cart
    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        updateCart();
    };

    // Update Cart UI
    function updateCart() {
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        cartCount.textContent = count;
        cartTotal.textContent = `LKR ${total.toLocaleString()}`;
        checkoutBtn.disabled = cart.length === 0;
        
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="text-center text-gray-400 py-12">
                    <i class="fas fa-shopping-bag text-4xl mb-3 opacity-50"></i>
                    <p class="text-sm">Your cart is empty</p>
                </div>`;
        } else {
            cartItems.innerHTML = cart.map((item, index) => `
                <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div class="flex-1 min-w-0">
                        <h4 class="font-bold text-xs sm:text-sm truncate">${item.name}</h4>
                        <p class="text-bakery-gold text-xs">LKR ${item.price.toLocaleString()} x ${item.quantity}</p>
                    </div>
                    <div class="flex items-center gap-2 ml-2">
                        <span class="font-bold text-xs">LKR ${(item.price * item.quantity).toLocaleString()}</span>
                        <button onclick="removeFromCart(${index})" class="w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600">
                            <i class="fas fa-trash text-[10px]"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }

    // WhatsApp Checkout
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) return;
        
        let message = '🛒 *New Order - Heavenly Treats*\n\n*Items:*\n';
        cart.forEach(item => {
            message += `• ${item.name} x${item.quantity} - LKR ${(item.price * item.quantity).toLocaleString()}\n`;
        });
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        message += `\n*Total: LKR ${total.toLocaleString()}*\n\n🙏 Please confirm my order!`;
        
        window.open(`https://wa.me/94726709280?text=${encodeURIComponent(message)}`, '_blank');
    });

    // Order Form
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('cust-name').value;
        const phone = document.getElementById('cust-phone').value;
        const occasion = document.getElementById('cust-occasion').value;
        const message = document.getElementById('cust-message').value;
        
        let whatsappMsg = `📋 *New Order*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Occasion:* ${occasion}\n`;
        if (message) whatsappMsg += `*Message:* ${message}\n`;
        whatsappMsg += `\n🙏 Please confirm.`;
        
        window.open(`https://wa.me/94726709280?text=${encodeURIComponent(whatsappMsg)}`, '_blank');
        orderForm.reset();
    });

    // Lightbox
    window.openLightbox = function(element) {
        const img = element.querySelector('img');
        const title = element.querySelector('.font-serif')?.textContent || element.querySelector('span')?.textContent || '';
        
        lightboxImg.src = img.src;
        lightboxTitle.textContent = title;
        lightboxDesc.textContent = '';
        
        lightbox.classList.remove('hidden');
        lightbox.classList.add('flex');
        document.body.style.overflow = 'hidden';
    };

    window.openGalleryLightbox = function(element) {
        const img = element.querySelector('img');
        const title = element.querySelector('span')?.textContent || '';
        
        lightboxImg.src = img.src;
        lightboxTitle.textContent = title;
        lightboxDesc.textContent = '';
        
        lightbox.classList.remove('hidden');
        lightbox.classList.add('flex');
        document.body.style.overflow = 'hidden';
    };

    closeLightbox.addEventListener('click', () => {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
        document.body.style.overflow = 'auto';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.add('hidden');
            lightbox.classList.remove('flex');
            document.body.style.overflow = 'auto';
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('hidden') && e.key === 'Escape') {
            lightbox.classList.add('hidden');
            lightbox.classList.remove('flex');
            document.body.style.overflow = 'auto';
        }
    });

    // Gallery Scroll
    window.scrollGallery = function(direction) {
        const gallery = document.getElementById('gallery-scroll');
        gallery.scrollBy({ left: 320 * direction, behavior: 'smooth' });
    };

    // Scroll Reveal
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
            } else {
                entry.target.classList.remove('reveal-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.group, .grid > div').forEach(target => {
        target.classList.add('reveal-hidden');
        revealObserver.observe(target);
    });

    // Sticky Header
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            header.classList.add('shadow-md');
        } else {
            header.classList.remove('shadow-md');
        }
    });

    // Year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Price Calculator
    const calcType = document.getElementById('calc-type');
    const calcSize = document.getElementById('calc-size');
    const calcSizeDisplay = document.getElementById('calc-size-display');
    const calcFlavor = document.getElementById('calc-flavor');
    const calcWriting = document.getElementById('calc-writing');
    const calcDelivery = document.getElementById('calc-delivery');
    const calcCandles = document.getElementById('calc-candles');
    const calcTotal = document.getElementById('calc-total');

    function calculatePrice() {
        let base = 2500;
        const size = parseInt(calcSize.value);
        
        // Size multiplier
        base = base + (size * 100);
        
        // Type multiplier
        const typeMult = { birthday: 1, wedding: 1.5, anniversary: 1.3, custom: 1.4, traditional: 0.8 };
        base *= typeMult[calcType.value] || 1;
        
        // Flavor
        const flavorCost = { vanilla: 500, chocolate: 700, redvelvet: 1000, butter: 600, fruit: 800 };
        base += flavorCost[calcFlavor.value] || 0;
        
        // Add-ons
        if (calcWriting.checked) base += 500;
        if (calcDelivery.checked) base += 1500;
        if (calcCandles.checked) base += 300;
        
        calcTotal.textContent = Math.round(base).toLocaleString();
        calcSizeDisplay.textContent = size + ' Portions';
    }

    if (calcType) {
        [calcType, calcSize, calcFlavor, calcWriting, calcDelivery, calcCandles].forEach(el => {
            el.addEventListener('change', calculatePrice);
            el.addEventListener('input', calculatePrice);
        });
    }

    window.orderFromCalculator = function() {
        const type = calcType.options[calcType.selectedIndex].text;
        const size = calcSize.value;
        const flavor = calcFlavor.options[calcFlavor.selectedIndex].text;
        let extras = [];
        if (calcWriting.checked) extras.push('Custom Message');
        if (calcDelivery.checked) extras.push('Island Delivery');
        if (calcCandles.checked) extras.push('Candles & Sparklers');
        
        const price = calcTotal.textContent;
        
        let msg = `🧁 *Cake Order Request*\n\n`;
        msg += `*Type:* ${type}\n`;
        msg += `*Size:* ${size} Portions\n`;
        msg += `*Flavor:* ${flavor}\n`;
        if (extras.length > 0) msg += `*Extras:* ${extras.join(', ')}\n`;
        msg += `\n*Estimated Price:* LKR ${price}\n\n`;
        msg += `🙏 Please confirm availability!`;
        
        window.open(`https://wa.me/94726709280?text=${encodeURIComponent(msg)}`, '_blank');
    };

    // Order Tracking
    window.trackOrder = function() {
        const orderId = document.getElementById('tracking-id').value.trim();
        const result = document.getElementById('tracking-result');
        const trackOrderId = document.getElementById('track-order-id');
        const trackStatus = document.getElementById('track-status');
        const trackProgress = document.getElementById('track-progress');
        
        if (!orderId) {
            alert('Please enter an Order ID');
            return;
        }
        
        trackOrderId.textContent = orderId;
        
        // Simulate tracking (in production, this would be an API call)
        const stages = ['ordered', 'preparing', 'ready', 'delivered'];
        const statusTexts = ['Confirmed', 'Preparing', 'Ready', 'Delivered'];
        const statusColors = ['bg-blue-100 text-blue-700', 'bg-yellow-100 text-yellow-700', 'bg-green-100 text-green-700', 'bg-purple-100 text-purple-700'];
        
        // Random status for demo
        const randomStage = Math.floor(Math.random() * 4);
        const stage = randomStage;
        
        trackStatus.textContent = statusTexts[stage];
        trackStatus.className = `px-3 py-1 ${statusColors[stage]} text-xs font-bold rounded-full`;
        trackProgress.style.height = ((stage + 1) / 4 * 100) + '%';
        
        stages.forEach((s, i) => {
            const el = document.getElementById('step-' + s);
            const dot = el.querySelector('.absolute');
            const title = el.querySelector('span:first-child');
            const desc = el.querySelector('p');
            
            if (i <= stage) {
                dot.className = 'absolute -left-[26px] w-5 h-5 bg-bakery-gold rounded-full flex items-center justify-center';
                dot.innerHTML = '<i class="fas fa-check text-white text-[8px]"></i>';
                title.className = 'text-sm font-bold';
                title.classList.remove('text-slate-400');
                desc.classList.remove('text-slate-400');
            }
        });
        
        result.classList.remove('hidden');
    };

    // Review Form
    window.setRating = function(stars) {
        document.getElementById('review-rating').value = stars;
        const buttons = document.querySelectorAll('#star-rating button');
        buttons.forEach((btn, i) => {
            if (i < stars) {
                btn.classList.remove('text-gray-300');
                btn.classList.add('text-yellow-400');
            } else {
                btn.classList.add('text-gray-300');
                btn.classList.remove('text-yellow-400');
            }
        });
    };

    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('review-name').value;
            const phone = document.getElementById('review-phone').value;
            const rating = document.getElementById('review-rating').value;
            const text = document.getElementById('review-text').value;
            
            if (rating === '0') {
                alert('Please select a rating');
                return;
            }
            
            let stars = '⭐'.repeat(parseInt(rating));
            let msg = `📝 *New Review*\n\n`;
            msg += `*Name:* ${name}\n`;
            if (phone) msg += `*Phone:* ${phone}\n`;
            msg += `*Rating:* ${stars} (${rating}/5)\n\n`;
            msg += `*Review:*\n${text}`;
            
            window.open(`https://wa.me/94726709280?text=${encodeURIComponent(msg)}`, '_blank');
            reviewForm.reset();
            setRating(0);
        });
    }

    // Disable heavy animations for performance
    document.documentElement.style.setProperty('--transition-speed', '0ms');
    
    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('.animate-pulse, .animate-spin, .group-hover\\:scale-105').forEach(el => {
            el.style.animation = 'none';
            el.style.transform = 'none';
        });
    }
});
