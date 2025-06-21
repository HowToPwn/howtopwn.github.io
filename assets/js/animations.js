// Initialize smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true
});

// Animate stats on scroll
const animateStats = () => {
    const stats = document.querySelectorAll('.stat-item');
    
    const options = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress-bar');
                const progress = progressBar.dataset.progress;
                progressBar.style.width = `${progress}%`;
            }
        });
    }, options);
    
    stats.forEach(stat => observer.observe(stat));
};

// Terminal typing effect
class TerminalTyping {
    constructor(element, text, speed = 50) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.cursor = '█';
        this.isDeleting = false;
        this.type();
    }
    
    type() {
        const current = this.element.innerHTML;
        
        if (!this.isDeleting && current.length < this.text.length) {
            this.element.innerHTML = this.text.substring(0, current.length + 1) + this.cursor;
            setTimeout(() => this.type(), this.speed);
        } else if (this.isDeleting && current.length > 0) {
            this.element.innerHTML = this.text.substring(0, current.length - 1) + this.cursor;
            setTimeout(() => this.type(), this.speed / 2);
        }
    }
}

// Initialize terminal typing effects
document.addEventListener('DOMContentLoaded', () => {
    const terminalCommands = document.querySelectorAll('.terminal-body .command');
    terminalCommands.forEach(cmd => {
        new TerminalTyping(cmd, cmd.textContent);
    });
    
    animateStats();
});

// Parallax effect for grid pattern
document.addEventListener('mousemove', (e) => {
    const pattern = document.querySelector('.grid-pattern');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    pattern.style.transform = `rotate(-5deg) scale(1.5) translate(${x * 20}px, ${y * 20}px)`;
});
