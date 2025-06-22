class Terminal {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.input = document.getElementById('terminalInput');
        this.history = [];
        this.historyIndex = -1;
        this.commands = {
            help: () => this.showHelp(),
            clear: () => this.clear(),
            ls: () => this.listFiles(),
            whoami: () => this.showWhoami(),
            date: () => this.showDate(),
            skills: () => this.showSkills(),
            achievements: () => this.showAchievements(),
            mission: () => this.showMission(),
            hack: (target) => this.simulateHack(target),
        };
        
        this.setupEventListeners();
        this.initializeTerminal();
    }

    initializeTerminal() {
        this.addLine('Terminal v1.0.0 - HowToPwn Security Interface', 'system');
        this.addLine('Type "help" for available commands', 'system');
        this.addLine('');
    }

    setupEventListeners() {
        this.input.addEventListener('keydown', (e) => this.handleInput(e));
        document.addEventListener('click', () => this.input.focus());
    }

    handleInput(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const command = this.input.textContent.trim();
            if (command) {
                this.history.push(command);
                this.historyIndex = this.history.length;
                this.executeCommand(command);
            }
            this.input.textContent = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.navigateHistory('up');
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.navigateHistory('down');
        }
    }

    navigateHistory(direction) {
        if (direction === 'up' && this.historyIndex > 0) {
            this.historyIndex--;
        } else if (direction === 'down' && this.historyIndex < this.history.length) {
            this.historyIndex++;
        }

        this.input.textContent = this.history[this.historyIndex] || '';
    }

    executeCommand(command) {
        this.addLine('root@HowToPwn:~# ' + command, 'command');
        
        const [cmd, ...args] = command.split(' ');
        
        if (this.commands[cmd]) {
            this.commands[cmd](...args);
        } else {
            this.addLine('Command not found: ' + cmd, 'error');
            this.addLine('Type "help" for available commands');
        }
    }

    addLine(text, type = '') {
        const line = document.createElement('div');
        line.className = 'line ' + type;
        
        if (type === 'matrix') {
            this.animateMatrix(line, text);
        } else {
            line.textContent = text;
        }
        
        this.container.querySelector('.terminal-content').appendChild(line);
        this.container.scrollTop = this.container.scrollHeight;
    }

    animateMatrix(element, text) {
        let index = 0;
        const interval = setInterval(() => {
            element.textContent += text[index];
            index++;
            if (index >= text.length) {
                clearInterval(interval);
            }
        }, 50);
    }

    clear() {
        this.container.querySelector('.terminal-content').innerHTML = '';
    }

    showHelp() {
        const commands = [
            'Available commands:',
            '  help         - Show this help message',
            '  clear        - Clear terminal',
            '  ls          - List files',
            '  whoami      - Display user info',
            '  date        - Show current date',
            '  skills      - List team skills',
            '  achievements - Show team achievements',
            '  mission     - Display current mission',
            '  hack [target] - Initiate hack simulation'
        ];
        commands.forEach(cmd => this.addLine(cmd));
    }

    listFiles() {
        const files = [
            'drwxr-xr-x  missions/',
            'drwxr-xr-x  tools/',
            'drwxr-xr-x  writeups/',
            '-rw-r--r--  achievements.log',
            '-rw-r--r--  skills.dat',
            '-rw-r--r--  mission.cfg'
        ];
        files.forEach(file => this.addLine(file));
    }

    showWhoami() {
        const info = [
            'HowToPwn Elite Security Team',
            'Status: Active',
            'Access Level: Maximum',
            'Team Members: Operational',
            'Mission Success Rate: 96%'
        ];
        info.forEach(line => this.addLine(line));
    }

    showDate() {
        this.addLine(new Date().toLocaleString());
    }

    showSkills() {
        const skills = [
            '⚡ Web Exploitation: [██████████] 100%',
            '⚡ Reverse Engineering: [████████░░] 80%',
            '⚡ Cryptography: [███████░░░] 70%',
            '⚡ Binary Exploitation: [████████░░] 80%',
            '⚡ Forensics: [█████████░] 90%'
        ];
        skills.forEach(skill => this.addLine(skill));
    }

    showAchievements() {
        const achievements = [
            '🏆 HTB Cyber Apocalypse CTF 2025: #54',
            '🥈 HTB Team Global Rankings: #80',
            '⭐ THM Hackfinity CTF 2025: #82'
        ];
        achievements.forEach(achievement => this.addLine(achievement));
    }

    showMission() {
        this.addLine('CURRENT MISSION STATUS:', 'header');
        this.addLine('------------------------');
        this.addLine('Target: Cybersecurity Excellence');
        this.addLine('Objective: Enhance and demonstrate elite hacking capabilities');
        this.addLine('Progress: Active');
        this.addLine('------------------------');
    }

    simulateHack(target) {
        if (!target) {
            this.addLine('Error: Target required. Usage: hack <target>', 'error');
            return;
        }

        const phases = [
            'Initializing attack vectors...',
            'Scanning target systems...',
            'Identifying vulnerabilities...',
            'Deploying exploit payload...',
            'Establishing secure connection...',
            'Access granted! Target system compromised.'
        ];

        let i = 0;
        const simulatePhase = () => {
            if (i < phases.length) {
                this.addLine(phases[i], 'matrix');
                i++;
                setTimeout(simulatePhase, 1000);
            }
        };

        this.addLine('Starting hack simulation on target: ' + target, 'system');
        simulatePhase();
    }
}

// Initialize terminal when document is ready
document.addEventListener('DOMContentLoaded', () => {
    new Terminal('terminalBody');
});
