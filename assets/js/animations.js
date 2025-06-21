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

// Terminal typing effect class
class TerminalTyping {
    constructor(element, text, speed = 50, delay = 0) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.delay = delay;
        this.cursor = '█';
        this.currentIndex = 0;
        this.isTyping = false;
        
        // Store original text
        this.originalText = element.textContent;
        
        // Clear element and start typing after delay
        setTimeout(() => {
            this.element.textContent = '';
            this.type();
        }, this.delay);
    }
    
    type() {
        if (this.currentIndex < this.text.length) {
            this.element.textContent += this.text.charAt(this.currentIndex);
            this.currentIndex++;
            setTimeout(() => this.type(), this.speed);
        } else {
            // Không thêm cursor ở cuối dòng terminal nữa
        }
    }
}

// Terminal line typing effect
class TerminalLineTyping {
    constructor(terminalBody, lines, speed = 50, lineDelay = 1000) {
        this.terminalBody = terminalBody;
        this.lines = lines;
        this.speed = speed;
        this.lineDelay = lineDelay;
        this.currentLineIndex = 0;
        
        // Clear terminal body
        this.terminalBody.innerHTML = '';
        this.startTyping();
    }
    
    startTyping() {
        if (this.currentLineIndex < this.lines.length) {
            const line = this.lines[this.currentLineIndex];
            const lineElement = document.createElement('div');
            lineElement.className = 'line';
            
            
            if (line.includes('root@HowToPwn:~#') || line.includes('$')) {
                const promptSpan = document.createElement('span');
                promptSpan.className = 'prompt';
                promptSpan.textContent = line.includes('root@HowToPwn:~#') ? 'root@HowToPwn:~# ' : '$ ';
                
                const commandSpan = document.createElement('span');
                commandSpan.className = 'command';
                commandSpan.textContent = line.replace(/^(root@HowToPwn:~# |\$ )/, '');
                
                lineElement.appendChild(promptSpan);
                lineElement.appendChild(commandSpan);
            } else {
                let outputClass = 'output';
                if (line.includes('✓')) {
                    outputClass += ' success';
                } else if (line.includes('[*]')) {
                    outputClass += ' warning';
                } else if (line.includes('Status:') || line.includes('Rank:') || line.includes('Level:')) {
                    outputClass += ' info';
                } else if (line.includes('tcp') || line.includes('LISTEN')) {
                    outputClass += ' network';
                } else if (line.includes('root') && line.includes('hack')) {
                    outputClass += ' process';
                } else if (line.includes('compromised') || line.includes('exploit')) {
                    outputClass += ' hack';
                } else if (line.includes('Mission accomplished')) {
                    outputClass += ' victory';
                }
                
                const outputSpan = document.createElement('span');
                outputSpan.className = outputClass;
                outputSpan.textContent = line;
                lineElement.appendChild(outputSpan);
            }
            
            this.terminalBody.appendChild(lineElement);
            
            this.terminalBody.scrollTop = this.terminalBody.scrollHeight;

            const textElement = lineElement.querySelector('.command, .output') || lineElement;
            new TerminalTyping(textElement, textElement.textContent, this.speed);
            
            this.currentLineIndex++;
            setTimeout(() => this.startTyping(), this.lineDelay);
        }
    }
}

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


function startHeroTerminalInteractive(terminalBody) {
    const COMMANDS = {
        help: `Available commands:\n- about\n- services\n- info\n- prompt\n- clear\n- help`,
        about: `HowToPwn - Rising Cybersecurity Talent\nFormed: March 2025\nAchievements:\n- Top #54 HackTheBox Apocalypse CTF 2025\n- Top #80 HTB Global\n- Top #80 TryHackMe Hackfinity 2025`,
        services: `Penetration Testing:\n- Web Application, Network, Mobile, API\nCTF Training:\n- Workshops, Advanced Exploitation, Custom CTF, Team Training\nSecurity Consulting:\n- Architecture Review, Threat Modeling, Policy, Incident Response`,
        info: `HowToPwn is a newly established cybersecurity team (March 2025) with a modest scale, specializing in CTF competitions, security research, and consulting.\nSee 'about' and 'services' for more.`,
        prompt: `Project Prompt:\nA professional cybersecurity team website for HowToPwn, formed March 2025. Black-and-white, Inter Mono font, minimalist, inspired by owlsec.ai.\n7-member grid, CTF/blog, contact form, responsive, subtle animations.\nSee 'help' for commands.`,
        clear: '',
    };
  

 
    function createInputLine() {
        const line = document.createElement('div');
        line.className = 'line terminal-input-line';
        const promptSpan = document.createElement('span');
        promptSpan.className = 'prompt';
        promptSpan.textContent = 'root@HowToPwn:~# ';
        const input = document.createElement('input');
        input.className = 'terminal-input';
        input.type = 'text';
        input.autocomplete = 'off';
        input.spellcheck = false;
        input.style.background = 'transparent';
        input.style.border = 'none';
        input.style.color = 'inherit';
        input.style.font = 'inherit';
        input.style.outline = 'none';
        input.style.width = '60%';
        input.style.caretColor = '#00e5ff';
        input.style.fontFamily = 'inherit';
        input.style.fontSize = 'inherit';
        input.style.padding = '0';
        input.style.marginLeft = '0.5rem';
        line.appendChild(promptSpan);
        line.appendChild(input);
        terminalBody.appendChild(line);
        input.focus();
        return input;
    }

    function handleCommand(cmd) {
        const clean = cmd.trim().toLowerCase();
        if (!clean) return;
        let output = '';
        if (COMMANDS[clean] !== undefined) {
            output = COMMANDS[clean];
        } else {
            output = `Command not found: ${clean}\nType 'help' for available commands.`;
        }
        if (clean === 'clear') {
            terminalBody.innerHTML = '';
            return;
        }
        output.split('\n').forEach(line => {
            const outDiv = document.createElement('div');
            outDiv.className = 'line';
            const outSpan = document.createElement('span');
            outSpan.className = 'output';
            outSpan.textContent = line;
            outDiv.appendChild(outSpan);
            terminalBody.appendChild(outDiv);
        });
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function inputLoop() {
        const input = createInputLine();
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const value = input.value;
                const parent = input.parentElement;
                const cmdSpan = document.createElement('span');
                cmdSpan.className = 'command';
                cmdSpan.textContent = value;
                parent.removeChild(input);
                parent.appendChild(cmdSpan);
                handleCommand(value);
                setTimeout(() => {
                    terminalBody.scrollTop = terminalBody.scrollHeight;
                }, 50);
                setTimeout(inputLoop, 100);
            }
        });
    }
    inputLoop();
}

// --- End Terminal Interactive ---

// Footer Terminal Effects
function addFooterTerminalCursor(terminalBody) {
    const cursorLine = document.createElement('div');
    cursorLine.className = 'line footer-cursor-line';
    const promptSpan = document.createElement('span');
    promptSpan.className = 'prompt';
    promptSpan.textContent = '$ ';
    const cursorSpan = document.createElement('span');
    cursorSpan.className = 'footer-cursor';
    cursorSpan.textContent = '█';
    cursorLine.appendChild(promptSpan);
    cursorLine.appendChild(cursorSpan);
    terminalBody.appendChild(cursorLine);
}

function addFooterScanLine(terminalBody) {
    const scanLine = document.createElement('div');
    scanLine.className = 'footer-scan-line';
    scanLine.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, transparent, #00e5ff, transparent);
        animation: footerScanLine 3s linear infinite;
        pointer-events: none;
        z-index: 10;
    `;
    terminalBody.parentElement.style.position = 'relative';
    terminalBody.parentElement.appendChild(scanLine);
}

function addFooterMatrixRain(terminalBody) {
    const matrixContainer = document.createElement('div');
    matrixContainer.className = 'footer-matrix-rain';
    matrixContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 1;
        opacity: 0.1;
    `;
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    for (let i = 0; i < 20; i++) {
        const char = document.createElement('div');
        char.textContent = chars[Math.floor(Math.random() * chars.length)];
        char.style.cssText = `
            position: absolute;
            top: -20px;
            left: ${Math.random() * 100}%;
            color: #00e5ff;
            font-size: 12px;
            animation: footerMatrixDrop ${2 + Math.random() * 3}s linear infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        matrixContainer.appendChild(char);
    }
    
    terminalBody.parentElement.appendChild(matrixContainer);
}

function addFooterPulseEffect(terminalBody) {
    const terminal = terminalBody.closest('.footer-terminal');
    if (terminal) {
        terminal.style.animation = 'footerTerminalPulse 4s ease-in-out infinite';
    }
}

const footerStyles = document.createElement('style');
footerStyles.textContent = `
    @keyframes footerScanLine {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100%); }
    }
    
    @keyframes footerMatrixDrop {
        0% { transform: translateY(-20px); opacity: 1; }
        100% { transform: translateY(200px); opacity: 0; }
    }
    
    @keyframes footerTerminalPulse {
        0%, 100% { box-shadow: 0 0 0 1px rgba(0, 229, 255, 0.2); }
        50% { box-shadow: 0 0 0 1px rgba(0, 229, 255, 0.4), 0 0 20px rgba(0, 229, 255, 0.2); }
    }
    
    .footer-cursor {
        color: #00e5ff;
        animation: cursor-blink 1s infinite;
    }
    
    .footer-cursor-line {
        margin-top: 0.5rem;
    }
`;
document.head.appendChild(footerStyles);

// --- End Footer Terminal Effects ---

// Initialize terminal typing effects
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const body = document.querySelector('body');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            body.classList.toggle('nav-open');
        });
    }
    
    // Hero terminal typing
    const heroTerminalBody = document.querySelector('.hero-terminal .terminal-body');
    if (heroTerminalBody) {
        const heroLines = [
            'root@HowToPwn:~# ./initialize_system.sh',
            '✓ System initialized successfully',
            'Loading core modules...',
            '✓ Security protocols active',
            '✓ CTF framework ready',
            'root@HowToPwn:~# ./deploy_mission.sh --target="cybersecurity_excellence"',
            '[*] Mission parameters set',
            '✓ Ready to hack the planet',
            'root@HowToPwn:~# ./status.sh',
            'Team Status: ONLINE | CTF Rank: #54 | Missions: ACTIVE'
        ];
        
        new TerminalLineTyping(heroTerminalBody, heroLines, 30, 800);
        setTimeout(() => {
            startHeroTerminalInteractive(heroTerminalBody);
        }, heroLines.length * 800 + 1000);
    }
    
    const footerTerminalBody = document.querySelector('.footer-terminal .terminal-content');
    if (footerTerminalBody) {
        const footerLines = [
            '$ whoami',
            'root@howtopwn:~# Elite Cybersecurity Team',
            '$ cat /etc/team_status',
            '[*] Team Status: ACTIVE',
            '[*] Security Level: MAXIMUM',
            '[*] CTF Rank: #54 | HTB Global: #80',
            '$ ps aux | grep "hacking"',
            'root    1234  0.5  2.1  12345  6789  ?  S  10:30  0:15 /usr/bin/hack_the_planet',
            'root    1235  0.3  1.8  9876  5432  ?  S  10:31  0:08 /usr/bin/ctf_engine',
            '$ netstat -tuln | grep "1337"',
            'tcp6    0    0 :::1337    :::*    LISTEN',
            '$ echo "System compromised successfully"',
            'System compromised successfully',
            '$ ./deploy_cyber_attack.sh',
            '[*] Initializing cyber warfare protocols...',
            '[*] Bypassing firewalls...',
            '[*] Exploiting vulnerabilities...',
            '✓ Mission accomplished',
            '$ uptime',
            'Established March 2025 | Always Active | 99.9% Uptime',
            '$ echo "Terminal ready for next hack..."',
            'Terminal ready for next hack...'
        ];
        
        setTimeout(() => {
            new TerminalLineTyping(footerTerminalBody, footerLines, 40, 600);
            
            setTimeout(() => {
                addFooterTerminalCursor(footerTerminalBody);
            }, footerLines.length * 600 + 1000);
            
            addFooterScanLine(footerTerminalBody);
            
            addFooterMatrixRain(footerTerminalBody);
            
            addFooterPulseEffect(footerTerminalBody);
        }, 5000);
    }
    
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = "Established March 2025 | Rising Force in Cybersecurity";
        new TerminalTyping(typingText, text, 50, 2000);
    }
    
    animateStats();
});

// Parallax effect for grid pattern
document.addEventListener('mousemove', (e) => {
    const pattern = document.querySelector('.grid-pattern');
    if (pattern) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        pattern.style.transform = `rotate(-5deg) scale(1.5) translate(${x * 20}px, ${y * 20}px)`;
    }
});

// Cursor blink animation
const cursorBlink = () => {
    const cursors = document.querySelectorAll('.typing-cursor');
    cursors.forEach(cursor => {
        cursor.style.animation = 'cursor-blink 1s infinite';
    });
};

setTimeout(cursorBlink, 8000);
