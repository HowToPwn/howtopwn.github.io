/**
 * Industrial Cyberpunk Effects - Enhanced Version
 * Advanced animations and interactions for industrial design
 * Configurable for different page types
 */

class IndustrialEffects {
    constructor(config = {}) {
        this.config = {
            // Default configuration
            enableParticles: true,
            enableMatrixRain: true,
            enableScanner: true,
            enableGrid: true,
            particleCount: 50,
            scanInterval: 8000,
            matrixSpeed: 50,
            // Page-specific overrides
            ...config
        };
        
        this.pageType = this.detectPageType();
        this.applyPageSpecificConfig();
        this.init();
    }

    detectPageType() {
        const path = window.location.pathname;
        if (path.includes('/about')) return 'about';
        if (path.includes('/services')) return 'services';
        if (path.includes('/blogs')) return 'blog';
        if (path.includes('/contact')) return 'contact';
        if (path.includes('/reports')) return 'reports';
        return 'home';
    }

    applyPageSpecificConfig() {
        const pageConfigs = {
            home: {
                enableParticles: true,
                enableMatrixRain: true,
                enableScanner: true,
                particleCount: 50,
                primaryColor: '#00ff88',
                secondaryColor: '#00ccff'
            },
            about: {
                enableParticles: true,
                enableMatrixRain: false,
                enableScanner: true,
                particleCount: 30,
                primaryColor: '#00ccff',
                secondaryColor: '#00ff88'
            },
            services: {
                enableParticles: true,
                enableMatrixRain: true,
                enableScanner: true,
                particleCount: 40,
                primaryColor: '#ff6600',
                secondaryColor: '#00ff88'
            },
            blog: {
                enableParticles: true,
                enableMatrixRain: false,
                enableScanner: false,
                particleCount: 25,
                primaryColor: '#00ff88',
                secondaryColor: '#ffaa00'
            },
            contact: {
                enableParticles: true,
                enableMatrixRain: false,
                enableScanner: true,
                particleCount: 35,
                primaryColor: '#00ccff',
                secondaryColor: '#ff0080'
            },
            reports: {
                enableParticles: true,
                enableMatrixRain: true,
                enableScanner: true,
                particleCount: 45,
                primaryColor: '#ff0080',
                secondaryColor: '#00ff88'
            }
        };

        this.config = { ...this.config, ...pageConfigs[this.pageType] };
    }

    init() {
        console.log(`🔧 Initializing Industrial Effects for ${this.pageType} page`);
        
        if (this.config.enableParticles) this.setupParticleSystem();
        if (this.config.enableScanner) this.setupGlitchEffects();
        if (this.config.enableMatrixRain) this.setupMatrixRain();
        if (this.config.enableGrid) this.setupCyberGrid();
        
        this.setupNeonPulse();
        this.setupInteractiveElements();
        this.setupTerminalTyping();
        this.setupScrollAnimations();
    }

    // Particle System for Background
    setupParticleSystem() {
        if (!this.config.enableParticles) return;
        
        const canvas = document.createElement('canvas');
        canvas.id = 'particle-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '-1';
        canvas.style.opacity = '0.3';
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const particles = [];
        const particleCount = this.config.particleCount;

        // Resize canvas
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.life = Math.random() * 100;
                this.maxLife = 100;
                this.color = Math.random() > 0.5 ? this.config.primaryColor : this.config.secondaryColor;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.life--;

                if (this.life <= 0 || this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.life = this.maxLife;
                }
            }

            draw() {
                const alpha = this.life / this.maxLife;
                ctx.globalAlpha = alpha * 0.6;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            requestAnimationFrame(animate);
        }

        animate();
    }

    // Glitch Effects
    setupGlitchEffects() {
        const glitchElements = document.querySelectorAll('.text-gradient, .navbar-brand');
        
        glitchElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.animation = 'cyber-glitch 0.3s ease-in-out';
                setTimeout(() => {
                    element.style.animation = '';
                }, 300);
            });
        });
    }

    // Matrix Rain Effect
    setupMatrixRain() {
        if (!this.config.enableMatrixRain) return;
        
        const targetSelector = this.pageType === 'home' ? '.hero-section' : 
                              this.pageType === 'services' ? '.services-hero' :
                              this.pageType === 'reports' ? '.reports-hero' :
                              'main > section:first-child';
        
        const heroSection = document.querySelector(targetSelector);
        if (!heroSection) return;

        const matrixCanvas = document.createElement('canvas');
        matrixCanvas.style.position = 'absolute';
        matrixCanvas.style.top = '0';
        matrixCanvas.style.left = '0';
        matrixCanvas.style.width = '100%';
        matrixCanvas.style.height = '100%';
        matrixCanvas.style.pointerEvents = 'none';
        matrixCanvas.style.opacity = '0.1';
        matrixCanvas.style.zIndex = '1';
        heroSection.appendChild(matrixCanvas);

        const ctx = matrixCanvas.getContext('2d');
        const chars = this.pageType === 'blog' ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' : 
                     '01アカサタナハマヤラワ';
        const fontSize = 14;
        let columns, drops;

        function initMatrix() {
            matrixCanvas.width = heroSection.offsetWidth;
            matrixCanvas.height = heroSection.offsetHeight;
            columns = Math.floor(matrixCanvas.width / fontSize);
            drops = Array(columns).fill(1);
        }

        const drawMatrix = () => {
            ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
            ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

            ctx.fillStyle = this.config.primaryColor || '#00ff88';
            ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        initMatrix();
        window.addEventListener('resize', initMatrix);
        setInterval(drawMatrix, this.config.matrixSpeed || 50);
    }

    // Cyber Grid Lines
    setupCyberGrid() {
        if (!this.config.enableGrid) return;
        
        const sections = document.querySelectorAll('section');
        
        sections.forEach((section, index) => {
            // Skip if already has grid
            if (section.querySelector('.cyber-grid')) return;
            
            const grid = document.createElement('div');
            grid.className = 'cyber-grid';
            grid.style.position = 'absolute';
            grid.style.top = '0';
            grid.style.left = '0';
            grid.style.width = '100%';
            grid.style.height = '100%';
            grid.style.pointerEvents = 'none';
            grid.style.opacity = '0.03';
            
            // Different grid patterns for different page types
            const gridPatterns = {
                home: `
                    linear-gradient(90deg, transparent 49%, rgba(0, 255, 136, 0.3) 50%, transparent 51%),
                    linear-gradient(0deg, transparent 49%, rgba(0, 204, 255, 0.2) 50%, transparent 51%)
                `,
                about: `
                    linear-gradient(45deg, transparent 49%, rgba(0, 204, 255, 0.3) 50%, transparent 51%),
                    linear-gradient(-45deg, transparent 49%, rgba(0, 255, 136, 0.2) 50%, transparent 51%)
                `,
                services: `
                    linear-gradient(90deg, transparent 49%, rgba(255, 102, 0, 0.3) 50%, transparent 51%),
                    linear-gradient(0deg, transparent 49%, rgba(0, 255, 136, 0.2) 50%, transparent 51%)
                `,
                blog: `
                    linear-gradient(60deg, transparent 49%, rgba(0, 255, 136, 0.3) 50%, transparent 51%),
                    linear-gradient(-60deg, transparent 49%, rgba(255, 170, 0, 0.2) 50%, transparent 51%)
                `,
                contact: `
                    linear-gradient(90deg, transparent 49%, rgba(0, 204, 255, 0.3) 50%, transparent 51%),
                    linear-gradient(0deg, transparent 49%, rgba(255, 0, 128, 0.2) 50%, transparent 51%)
                `,
                reports: `
                    linear-gradient(90deg, transparent 49%, rgba(255, 0, 128, 0.3) 50%, transparent 51%),
                    linear-gradient(0deg, transparent 49%, rgba(0, 255, 136, 0.2) 50%, transparent 51%)
                `
            };
            
            grid.style.backgroundImage = gridPatterns[this.pageType] || gridPatterns.home;
            grid.style.backgroundSize = '20px 20px';
            grid.style.animation = `grid-move ${30 + index * 5}s linear infinite`;
            
            if (getComputedStyle(section).position === 'static') {
                section.style.position = 'relative';
            }
            section.appendChild(grid);
        });
    }

    // Neon Pulse Animation
    setupNeonPulse() {
        const neonElements = document.querySelectorAll('.text-neon, .service-icon i, .logo');
        
        neonElements.forEach(element => {
            element.style.animation = 'neon-pulse 3s ease-in-out infinite';
            element.style.animationDelay = `${Math.random() * 2}s`;
        });
    }

    // Interactive Elements
    setupInteractiveElements() {
        // Hover effects for cards
        const cards = document.querySelectorAll('.card, .service-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
                
                // Add glowing border effect
                card.style.boxShadow = `
                    0 0 20px rgba(0, 255, 136, 0.3),
                    0 0 40px rgba(0, 255, 136, 0.1),
                    0 10px 30px rgba(0, 0, 0, 0.3)
                `;
            });

            card.addEventListener('mouseleave', () => {
                card.style.boxShadow = '';
            });

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });

        // Button pulse effects
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.position = 'absolute';
                ripple.style.width = `${size}px`;
                ripple.style.height = `${size}px`;
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                ripple.style.background = 'rgba(0, 255, 136, 0.5)';
                ripple.style.borderRadius = '50%';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple 0.6s linear';
                ripple.style.pointerEvents = 'none';
                
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // Terminal Typing Effect
    setupTerminalTyping() {
        const typeElements = document.querySelectorAll('.display-3, .display-4');
        
        typeElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.borderRight = '2px solid #00ff88';
            
            let i = 0;
            const typeInterval = setInterval(() => {
                element.textContent += text.charAt(i);
                i++;
                
                if (i >= text.length) {
                    clearInterval(typeInterval);
                    setTimeout(() => {
                        element.style.borderRight = 'none';
                    }, 1000);
                }
            }, 100);
        });
    }

    // Scroll Animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideInUp 0.8s ease-out forwards';
                }
            });
        }, observerOptions);

        // Observe sections
        const sections = document.querySelectorAll('section > .container > .row');
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            observer.observe(section);
        });

        // Counter animation for stats
        const statNumbers = document.querySelectorAll('.stat-item h3, .stat-mini h4');
        
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = parseInt(target.textContent.replace(/\D/g, ''));
                    const suffix = target.textContent.replace(/\d/g, '');
                    
                    let current = 0;
                    const increment = finalValue / 30;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= finalValue) {
                            current = finalValue;
                            clearInterval(timer);
                        }
                        target.textContent = Math.floor(current) + suffix;
                    }, 50);
                    
                    statsObserver.unobserve(target);
                }
            });
        }, observerOptions);

        statNumbers.forEach(stat => {
            statsObserver.observe(stat);
        });
    }
}

// CSS Animations via JavaScript
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .card::before {
        background: radial-gradient(
            600px circle at var(--mouse-x) var(--mouse-y),
            rgba(0, 255, 136, 0.1),
            transparent 40%
        );
    }
`;

document.head.appendChild(styleSheet);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Page-specific configurations
    const pageConfigs = {
        '/about': { 
            enableMatrixRain: false, 
            particleCount: 30,
            primaryColor: '#00ccff'
        },
        '/services': { 
            enableMatrixRain: true, 
            particleCount: 40,
            primaryColor: '#ff6600'
        },
        '/blogs': { 
            enableMatrixRain: false, 
            enableScanner: false,
            particleCount: 25,
            primaryColor: '#00ff88'
        },
        '/contact': { 
            enableMatrixRain: false, 
            particleCount: 35,
            primaryColor: '#00ccff'
        },
        '/reports': { 
            enableMatrixRain: true, 
            particleCount: 45,
            primaryColor: '#ff0080'
        }
    };

    const currentPath = window.location.pathname;
    const config = pageConfigs[currentPath] || {};
    
    new IndustrialEffects(config);
});

// Global configuration function for manual initialization
window.initIndustrialEffects = (customConfig = {}) => {
    return new IndustrialEffects(customConfig);
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IndustrialEffects;
}
