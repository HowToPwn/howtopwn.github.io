// Handle mouse movement over cards for glow effect
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.glass-card, .button-glow');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
    
    // Add smooth reveal animation for cards
    const revealCards = () => {
        const cards = document.querySelectorAll('.glass-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-in');
            }, index * 100);
        });
    };
    
    // Trigger reveal animation when cards come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                revealCards();
                observer.disconnect();
            }
        });
    });
    
    const cardsContainer = document.querySelector('.writeup-cards, .achievement-cards');
    if (cardsContainer) {
        observer.observe(cardsContainer);
    }
    
    // Enhanced hover effects for buttons
    const buttons = document.querySelectorAll('.cta-button, .read-more');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
            button.style.boxShadow = '0 8px 32px rgba(0, 229, 255, 0.2)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = 'none';
        });
    });
});

// Initialize vanilla-tilt.js for card tilt effect
VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    max: 5,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
});
