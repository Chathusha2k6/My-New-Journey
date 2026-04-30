/**
 * ICT With NDA - Main JavaScript
 * Handling Theme Toggle, Mobile Menu, and Scroll Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const themeIcon = document.getElementById('theme-toggle-icon');
    const htmlElement = document.documentElement;

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        htmlElement.classList.add('dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    const toggleTheme = () => {
        htmlElement.classList.toggle('dark');
        const isDark = htmlElement.classList.contains('dark');
        
        // Update icon
        if (isDark) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    };

    themeToggle.addEventListener('click', toggleTheme);
    themeToggleMobile.addEventListener('click', toggleTheme);

    // 2. Mobile Menu Logic
    const menuBtn = document.getElementById('menu-btn');
    const closeMenu = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const openMenu = () => {
        mobileMenu.classList.remove('translate-x-full');
    };

    const closeMenuFunc = () => {
        mobileMenu.classList.add('translate-x-full');
    };

    menuBtn.addEventListener('click', openMenu);
    closeMenu.addEventListener('click', closeMenuFunc);
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenuFunc);
    });

    // 3. Current Year Update
    document.getElementById('year').textContent = new Date().getFullYear();

    // 4. Scroll Reveal Logic (Simplified for CPU/GPU optimization)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target); // Reveal only once for performance
            }
        });
    }, observerOptions);

    // Elements to reveal
    const revealElements = document.querySelectorAll('section > div, .group');
    revealElements.forEach(el => {
        el.style.opacity = '0'; // Initial state
        revealOnScroll.observe(el);
    });

    // 5. Contact Form Mock Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check mr-2"></i> Message Sent!';
                btn.classList.replace('bg-primary-600', 'bg-green-600');
                contactForm.reset();
                
                setTimeout(() => {
                    btn.disabled = false;
                    btn.textContent = originalText;
                    btn.classList.replace('bg-green-600', 'bg-primary-600');
                }, 3000);
            }, 1500);
        });
    }

    // 6. Smooth Scroll Fix for Navbar Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for sticky navbar
                    behavior: 'smooth'
                });
            }
        });
    });
});
