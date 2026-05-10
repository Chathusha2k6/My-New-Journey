document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Optional: Add a subtle parallax effect to the hero shapes
    const heroSection = document.querySelector('.hero');
    const shapeMain = document.querySelector('.shape-main');
    const shapeSub = document.querySelector('.shape-sub');

    if (heroSection && shapeMain && shapeSub) {
        heroSection.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;

            // Apply slight transforms to shapes based on mouse position
            shapeMain.style.transform = `rotateX(${10 - y}deg) rotateY(${-20 + x}deg) translateZ(50px)`;
            shapeSub.style.transform = `rotateX(${-5 + y}deg) rotateY(${10 - x}deg) translateZ(30px)`;
        });

        // Reset transform when mouse leaves
        heroSection.addEventListener('mouseleave', () => {
            shapeMain.style.transform = '';
            shapeSub.style.transform = '';
        });
    }
});
