/**
 * Professional Industrial Interactions
 * Enhanced UX for cybersecurity professionals
 */

class ProfessionalInteractions {
    constructor() {
        this.initializeSystem();
    }

    initializeSystem() {
        this.setupCommandLineInterface();
        this.setupSecurityFeatures();
        this.setupNetworkStatus();
        this.setupSystemMonitoring();
        this.setupAdvancedAnimations();
    }

    // Command Line Interface Simulation
    setupCommandLineInterface() {
        // Add terminal-style input to newsletter
        const emailInput = document.querySelector('input[type="email"]');
        if (emailInput) {
            emailInput.addEventListener('focus', () => {
                emailInput.placeholder = 'root@howtopwn:~$ echo "your@email.com"';
            });

            emailInput.addEventListener('blur', () => {
                if (!emailInput.value) {
                    emailInput.placeholder = 'ENTER.SECURE.EMAIL.ADDRESS';
                }
            });

            emailInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.simulateCommandExecution(emailInput);
                }
            });
        }

        // Terminal loading for buttons
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                if (button.classList.contains('loading')) return;
                
                e.preventDefault();
                this.simulateProcessing(button);
            });
        });
    }

    simulateCommandExecution(input) {
        const originalValue = input.value;
        const originalPlaceholder = input.placeholder;
        
        input.value = '';
        input.placeholder = 'Processing...';
        input.disabled = true;

        let dots = 0;
        const loadingInterval = setInterval(() => {
            dots = (dots + 1) % 4;
            input.placeholder = 'Processing' + '.'.repeat(dots);
        }, 200);

        setTimeout(() => {
            clearInterval(loadingInterval);
            input.placeholder = originalPlaceholder;
            input.value = originalValue;
            input.disabled = false;
            
            // Show success message
            this.showSystemMessage('EMAIL.ENCRYPTED.AND.TRANSMITTED', 'success');
        }, 2000);
    }

    simulateProcessing(button) {
        const originalText = button.innerHTML;
        const originalHref = button.href;
        
        button.classList.add('loading');
        button.innerHTML = '<i class="fas fa-cog fa-spin me-2"></i>PROCESSING...';
        
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-check me-2"></i>EXECUTED';
            setTimeout(() => {
                if (originalHref && originalHref !== '#') {
                    window.location.href = originalHref;
                } else {
                    button.innerHTML = originalText;
                    button.classList.remove('loading');
                }
            }, 500);
        }, 1500);
    }

    // Security Features
    setupSecurityFeatures() {
        // Security scan animation
        this.createSecurityScanner();
        
        // Access denied for unauthorized clicks
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.showSystemMessage('ACCESS.DENIED - RIGHT.CLICK.DISABLED', 'warning');
        });

        // Konami code for easter egg
        this.setupKonamiCode();
    }

    createSecurityScanner() {
        const scanner = document.createElement('div');
        scanner.className = 'security-scanner';
        scanner.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 3px;
            height: 100vh;
            background: linear-gradient(to bottom, transparent, #00ff88, transparent);
            z-index: 9999;
            pointer-events: none;
            opacity: 0.7;
            animation: scan 8s linear infinite;
        `;

        const style = document.createElement('style');
        style.textContent = `
            @keyframes scan {
                0% { transform: translateX(-100vw); }
                100% { transform: translateX(100vw); }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(scanner);
    }

    setupKonamiCode() {
        let sequence = [];
        const konamiCode = [
            'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
            'KeyB', 'KeyA'
        ];

        document.addEventListener('keydown', (e) => {
            sequence.push(e.code);
            sequence = sequence.slice(-konamiCode.length);

            if (sequence.join('') === konamiCode.join('')) {
                this.activateMatrixMode();
            }
        });
    }

    activateMatrixMode() {
        document.body.style.filter = 'hue-rotate(120deg) contrast(1.5)';
        this.showSystemMessage('MATRIX.MODE.ACTIVATED - WELCOME.TO.THE.REAL.WORLD', 'success');
        
        setTimeout(() => {
            document.body.style.filter = '';
        }, 10000);
    }

    // Network Status Indicator
    setupNetworkStatus() {
        const statusIndicator = document.createElement('div');
        statusIndicator.className = 'network-status';
        statusIndicator.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            border: 1px solid #00ff88;
            border-radius: 4px;
            padding: 10px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 12px;
            color: #00ff88;
            z-index: 1000;
            transition: all 0.3s ease;
        `;

        this.updateNetworkStatus(statusIndicator);
        document.body.appendChild(statusIndicator);

        // Update every 30 seconds
        setInterval(() => {
            this.updateNetworkStatus(statusIndicator);
        }, 30000);
    }

    updateNetworkStatus(indicator) {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        const ping = this.simulatePing();
        
        let status = `
            <div>STATUS: <span style="color: #00ff88;">SECURE</span></div>
            <div>PING: ${ping}ms</div>
            <div>PROTOCOL: HTTPS/2.0</div>
        `;

        if (connection) {
            status += `<div>BANDWIDTH: ${connection.downlink}Mbps</div>`;
        }

        indicator.innerHTML = status;
    }

    simulatePing() {
        return Math.floor(Math.random() * 50) + 10;
    }

    // System Monitoring
    setupSystemMonitoring() {
        // CPU usage simulation
        this.createSystemMonitor();
        
        // Memory usage warning
        this.monitorPerformance();
    }

    createSystemMonitor() {
        const monitor = document.createElement('div');
        monitor.className = 'system-monitor';
        monitor.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: rgba(0, 0, 0, 0.9);
            border: 1px solid #00ccff;
            border-radius: 4px;
            padding: 15px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 11px;
            color: #00ccff;
            z-index: 1000;
            min-width: 200px;
        `;

        document.body.appendChild(monitor);
        this.updateSystemStats(monitor);

        setInterval(() => {
            this.updateSystemStats(monitor);
        }, 2000);
    }

    updateSystemStats(monitor) {
        const cpu = Math.floor(Math.random() * 30) + 5;
        const memory = Math.floor(Math.random() * 40) + 20;
        const processes = Math.floor(Math.random() * 50) + 120;
        
        monitor.innerHTML = `
            <div style="color: #00ff88; font-weight: bold; margin-bottom: 5px;">SYSTEM.MONITOR</div>
            <div>CPU: ${cpu}% ${'█'.repeat(Math.floor(cpu/5))}</div>
            <div>MEM: ${memory}% ${'█'.repeat(Math.floor(memory/5))}</div>
            <div>PROC: ${processes}</div>
            <div>UPTIME: ${this.getUptime()}</div>
        `;
    }

    getUptime() {
        const start = performance.now();
        const uptime = Math.floor(start / 1000);
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = uptime % 60;
        
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    monitorPerformance() {
        if ('memory' in performance) {
            setInterval(() => {
                const memory = performance.memory;
                const usedMB = Math.round(memory.usedJSHeapSize / 1048576);
                const limitMB = Math.round(memory.jsHeapSizeLimit / 1048576);
                
                if (usedMB > limitMB * 0.8) {
                    this.showSystemMessage('WARNING: HIGH.MEMORY.USAGE.DETECTED', 'warning');
                }
            }, 60000);
        }
    }

    // Advanced Animations
    setupAdvancedAnimations() {
        // Parallax scrolling for hero section
        this.setupParallaxScrolling();
        
        // Typewriter effect for important text
        this.setupTypewriterEffect();
        
        // Mouse trail effect
        this.setupMouseTrail();
    }

    setupParallaxScrolling() {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            heroSection.style.transform = `translateY(${parallax}px)`;
        });
    }

    setupTypewriterEffect() {
        const headers = document.querySelectorAll('h1, h2.display-4');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('typed')) {
                    entry.target.classList.add('typed');
                    this.typewriterEffect(entry.target);
                }
            });
        });

        headers.forEach(header => observer.observe(header));
    }

    typewriterEffect(element) {
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
        }, 50);
    }

    setupMouseTrail() {
        const trail = [];
        const trailLength = 10;

        document.addEventListener('mousemove', (e) => {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                width: 4px;
                height: 4px;
                background: #00ff88;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                animation: fadeOut 0.5s ease-out forwards;
            `;

            document.body.appendChild(particle);
            trail.push(particle);

            if (trail.length > trailLength) {
                const oldParticle = trail.shift();
                oldParticle.remove();
            }

            setTimeout(() => particle.remove(), 500);
        });

        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeOut {
                to {
                    opacity: 0;
                    transform: scale(0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // System Messages
    showSystemMessage(message, type = 'info') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `system-message ${type}`;
        messageDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.95);
            border: 2px solid ${type === 'warning' ? '#ffaa00' : type === 'success' ? '#00ff88' : '#00ccff'};
            border-radius: 4px;
            padding: 20px;
            font-family: 'JetBrains Mono', monospace;
            color: ${type === 'warning' ? '#ffaa00' : type === 'success' ? '#00ff88' : '#00ccff'};
            z-index: 10000;
            text-align: center;
            animation: messageSlide 0.3s ease-out;
        `;

        messageDiv.textContent = message;
        document.body.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.style.animation = 'messageSlide 0.3s ease-out reverse';
            setTimeout(() => messageDiv.remove(), 300);
        }, 3000);

        const style = document.createElement('style');
        style.textContent = `
            @keyframes messageSlide {
                from {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
            }
        `;
        if (!document.querySelector('#message-styles')) {
            style.id = 'message-styles';
            document.head.appendChild(style);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProfessionalInteractions();
});

// Console welcome message
console.log(`
%c
██╗  ██╗ ██████╗ ██╗    ██╗████████╗ ██████╗ ██████╗ ██╗    ██╗███╗   ██╗
██║  ██║██╔═══██╗██║    ██║╚══██╔══╝██╔═══██╗██╔══██╗██║    ██║████╗  ██║
███████║██║   ██║██║ █╗ ██║   ██║   ██║   ██║██████╔╝██║ █╗ ██║██╔██╗ ██║
██╔══██║██║   ██║██║███╗██║   ██║   ██║   ██║██╔═══╝ ██║███╗██║██║╚██╗██║
██║  ██║╚██████╔╝╚███╔███╔╝   ██║   ╚██████╔╝██║     ╚███╔███╔╝██║ ╚████║
╚═╝  ╚═╝ ╚═════╝  ╚══╝╚══╝    ╚═╝    ╚═════╝ ╚═╝      ╚══╝╚══╝ ╚═╝  ╚═══╝

%cINDUSTRIAL CYBERSECURITY COMMAND CENTER
%cSystem Status: OPERATIONAL
Security Level: MAXIMUM
Access Level: AUTHORIZED

Welcome to the cybersecurity warfare platform.
All activities are monitored and logged.
`, 
'color: #00ff88; font-family: monospace;',
'color: #00ccff; font-weight: bold; font-family: monospace;',
'color: #ffffff; font-family: monospace;'
);

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProfessionalInteractions;
}
