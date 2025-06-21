class AdvancedSearchEngine {
    constructor() {
        this.searchInput = document.getElementById('search-input');
        this.searchBtn = document.getElementById('search-btn');
        this.clearBtn = document.getElementById('clear-btn');
        this.refreshBtn = document.getElementById('refresh-btn');
        this.searchResults = document.getElementById('search-results');
        this.noResults = document.getElementById('no-results');
        this.searchLoading = document.getElementById('search-loading');
        
        // Filter elements
        this.filterPosts = document.getElementById('filter-posts');
        this.filterWriteups = document.getElementById('filter-writeups');
        this.filterCtf = document.getElementById('filter-ctf');
        this.filterWeb = document.getElementById('filter-web');
        this.filterRe = document.getElementById('filter-re');
        this.filterCrypto = document.getElementById('filter-crypto');
        
        this.searchData = [];
        this.currentResults = [];
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.testFetch(); 
    }
    
    bindEvents() {
        this.searchBtn.addEventListener('click', () => this.performSearch());
        
        this.clearBtn.addEventListener('click', () => this.clearSearch());
        
        this.refreshBtn.addEventListener('click', () => this.refreshFiles());
        
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });
        
        this.searchInput.addEventListener('input', () => {
            if (this.searchInput.value.length >= 2) {
                this.performSearch();
            } else if (this.searchInput.value.length === 0) {
                this.clearResults();
            }
        });
        
        [this.filterPosts, this.filterWriteups, this.filterCtf, this.filterWeb, this.filterRe, this.filterCrypto].forEach(filter => {
            filter.addEventListener('change', () => {
                if (this.currentResults.length > 0) {
                    this.applyFilters();
                }
            });
        });
    }
    
    async testFetch() {
        await this.loadFromIndex();
    }
    
    async loadFromIndex() {
        try {
            const response = await fetch('/assets/data/search-index.json');
            if (response.ok) {
                const indexData = await response.json();
                
                for (const fileInfo of indexData.files) {
                    await this.loadSingleFile(fileInfo.path, fileInfo.type);
                }
                
                this.showMessage(`Loaded ${this.searchData.length} files from index`, 'success');
            } else {
                this.loadFallbackFiles();
            }
        } catch (error) {
            console.error('Error loading search index:', error);
            this.loadFallbackFiles();
        }
    }
    
    loadFallbackFiles() {
        const fallbackFiles = [
            { path: '/_posts/2025-06-21-sample-post.md', type: 'post' },
            { path: '/_writeups/2025-06-15-thm-hackfinity-rev.md', type: 'writeup' }
        ];
        
        for (const fileInfo of fallbackFiles) {
            this.loadSingleFile(fileInfo.path, fileInfo.type);
        }
    }
    
    async loadSingleFile(filePath, type) {
        try {
            const response = await fetch(filePath);
            if (response.ok) {
                const content = await response.text();
                const filename = filePath.split('/').pop();
                const parsedData = this.parseMarkdownFile(content, filename, type);
                if (parsedData) {
                    this.searchData.push(parsedData);
                }
            }
        } catch (error) {
            console.error(`Error loading ${filePath}:`, error);
        }
    }
    
    async discoverMarkdownFiles() {
        return [];
    }
    
    parseMarkdownFile(content, filename, type) {
        try {
            let frontmatter = {};
            let markdownContent = content;
            
            const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
            
            if (frontmatterMatch) {
                frontmatter = this.parseYaml(frontmatterMatch[1]);
                markdownContent = frontmatterMatch[2];
            } else {
                const titleMatch = content.match(/^#\s+(.+)$/m);
                if (titleMatch) {
                    frontmatter.title = titleMatch[1].trim();
                }
            }
            
            const url = this.generateUrl(filename, type);
            const excerpt = frontmatter.excerpt || this.extractExcerpt(markdownContent);
            
            const result = {
                id: filename.replace('.md', ''),
                type: type,
                title: frontmatter.title || this.generateTitleFromFilename(filename),
                excerpt: excerpt,
                content: markdownContent,
                author: frontmatter.author || 'HowToPwn Team',
                date: frontmatter.date || this.extractDateFromFilename(filename),
                category: frontmatter.category || this.detectCategory(markdownContent),
                tags: frontmatter.tags || this.extractTags(markdownContent),
                difficulty: frontmatter.difficulty || null,
                url: url,
                filename: filename,
                rawContent: content
            };
            
            return result;
            
        } catch (error) {
            console.error(`Error parsing ${filename}:`, error);
            return null;
        }
    }
    
    parseYaml(yamlString) {
        const result = {};
        const lines = yamlString.split('\n');
        
        for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine || trimmedLine.startsWith('#')) {
                continue;
            }
            
            const colonIndex = trimmedLine.indexOf(':');
            if (colonIndex > 0) {
                const key = trimmedLine.substring(0, colonIndex).trim();
                let value = trimmedLine.substring(colonIndex + 1).trim();
                
                if ((value.startsWith('"') && value.endsWith('"')) || 
                    (value.startsWith("'") && value.endsWith("'"))) {
                    value = value.slice(1, -1);
                }
                
                if (value.startsWith('[') && value.endsWith(']')) {
                    value = value.slice(1, -1).split(',').map(item => item.trim().replace(/['"]/g, ''));
                }
                
                if (value === '') {
                    let multiLineValue = '';
                    let i = lines.indexOf(line) + 1;
                    while (i < lines.length && (lines[i].startsWith('  ') || lines[i].startsWith('\t'))) {
                        multiLineValue += lines[i].trim() + ' ';
                        i++;
                    }
                    value = multiLineValue.trim();
                }
                
                result[key] = value;
            }
        }
        
        return result;
    }
    
    generateTitleFromFilename(filename) {
        return filename
            .replace('.md', '')
            .replace(/^\d{4}-\d{2}-\d{2}-/, '')
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    
    extractDateFromFilename(filename) {
        const dateMatch = filename.match(/^(\d{4}-\d{2}-\d{2})/);
        return dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0];
    }
    
    extractExcerpt(content) {
        const paragraphs = content.split('\n\n').filter(p => p.trim().length > 0);
        if (paragraphs.length > 0) {
            let excerpt = paragraphs[0].replace(/^#+\s*/, '').trim();
            if (excerpt.length > 200) {
                excerpt = excerpt.substring(0, 200) + '...';
            }
            return excerpt;
        }
        return content.substring(0, 200) + '...';
    }
    
    detectCategory(content) {
        const lowerContent = content.toLowerCase();
        if (lowerContent.includes('web') || lowerContent.includes('http') || lowerContent.includes('xss')) {
            return 'Web Exploitation';
        } else if (lowerContent.includes('reverse') || lowerContent.includes('binary') || lowerContent.includes('assembly')) {
            return 'Reverse Engineering';
        } else if (lowerContent.includes('crypto') || lowerContent.includes('encryption') || lowerContent.includes('hash')) {
            return 'Cryptography';
        } else if (lowerContent.includes('ctf') || lowerContent.includes('competition')) {
            return 'CTF';
        }
        return 'General';
    }
    
    extractTags(content) {
        const tags = [];
        const lowerContent = content.toLowerCase();
        
        const tagPatterns = [
            { pattern: /web|http|xss|sqli|csrf/i, tag: 'Web' },
            { pattern: /reverse|binary|assembly|disassembly/i, tag: 'RE' },
            { pattern: /crypto|encryption|hash|rsa|aes/i, tag: 'Crypto' },
            { pattern: /ctf|competition|challenge/i, tag: 'CTF' },
            { pattern: /network|tcp|udp|dns/i, tag: 'Network' },
            { pattern: /forensics|memory|volatility/i, tag: 'Forensics' },
            { pattern: /pwn|exploit|buffer|overflow/i, tag: 'Pwn' },
            { pattern: /mobile|android|ios/i, tag: 'Mobile' }
        ];
        
        for (const { pattern, tag } of tagPatterns) {
            if (pattern.test(lowerContent) && !tags.includes(tag)) {
                tags.push(tag);
            }
        }
        
        return tags;
    }
    
    generateUrl(filename, type) {
        const baseName = filename.replace('.md', '');
        if (type === 'post') {
            return `/posts/${baseName}`;
        } else {
            return `/writeups/${baseName}`;
        }
    }
    
    performSearch() {
        const query = this.searchInput.value.trim().toLowerCase();
        
        if (query.length < 2) {
            this.clearResults();
            return;
        }
        
        this.showLoading();
        
        setTimeout(() => {
            const results = this.searchData.filter(item => {
                if (!this.matchesContentTypeFilter(item)) {
                    return false;
                }
                
                if (!this.matchesCategoryFilter(item)) {
                    return false;
                }
                
                const searchableText = [
                    item.title,
                    item.excerpt,
                    item.content,
                    item.tags?.join(' '),
                    item.category,
                    item.author
                ].join(' ').toLowerCase();
                
                return searchableText.includes(query);
            });
            
            this.currentResults = results;
            this.displayResults(results);
        }, 500);
    }
    
    matchesContentTypeFilter(item) {
        if (item.type === 'post' && !this.filterPosts.checked) return false;
        if (item.type === 'writeup' && !this.filterWriteups.checked) return false;
        return true;
    }
    
    matchesCategoryFilter(item) {
        const itemTags = item.tags || [];
        const itemCategory = item.category || '';
        
        const allTags = [...itemTags, itemCategory].map(tag => tag.toLowerCase());
        
        if (this.filterCtf.checked && allTags.some(tag => tag.includes('ctf'))) return true;
        if (this.filterWeb.checked && allTags.some(tag => tag.includes('web'))) return true;
        if (this.filterRe.checked && allTags.some(tag => tag.includes('reverse') || tag.includes('re'))) return true;
        if (this.filterCrypto.checked && allTags.some(tag => tag.includes('crypto') || tag.includes('cryptography'))) return true;
        
        if (!this.filterCtf.checked && !this.filterWeb.checked && !this.filterRe.checked && !this.filterCrypto.checked) {
            return true;
        }
        
        return false;
    }
    
    applyFilters() {
        const filteredResults = this.currentResults.filter(item => {
            return this.matchesContentTypeFilter(item) && this.matchesCategoryFilter(item);
        });
        
        this.displayResults(filteredResults);
    }
    
    displayResults(results) {
        this.hideLoading();
        
        if (results.length === 0) {
            this.showNoResults();
            return;
        }
    
        this.hideNoResults();
        
        const resultsHTML = `
            <div class="search-results-header glass-panel" data-aos="fade-up">
                <div class="results-stats">
                    <span class="results-count gradient-text">${results.length} result${results.length !== 1 ? 's' : ''} found</span>
                    <div class="results-filters">
                        <span class="filter-tag glow-effect">${this.getActiveFiltersText()}</span>
                    </div>
                </div>
            </div>
            
            <div class="results-grid">
                ${results.map((item, index) => this.createResultCard(item, index)).join('')}
            </div>
        `;
        
        this.searchResults.innerHTML = resultsHTML;
        
        this.addResultCardHandlers();
    }
    
    createResultCard(item, index) {
        const delay = index * 100;
        const typeIcon = item.type === 'post' ? 'fas fa-newspaper' : 'fas fa-file-code';
        const typeLabel = item.type === 'post' ? 'Blog Post' : 'CTF Writeup';
        const difficultyBadge = item.difficulty ? `<span class="difficulty-badge ${item.difficulty.toLowerCase()} pulse-effect">${item.difficulty}</span>` : '';
        
        return `
            <article class="result-card glass-card" data-aos="fade-up" data-aos-delay="${delay}" data-url="${item.url}" data-filename="${item.filename}" data-type="${item.type}">
                <div class="result-header">
                    <div class="result-meta">
                        <div class="result-type glow-effect">
                            <i class="${typeIcon}"></i>
                            <span>${typeLabel}</span>
                        </div>
                        <time class="result-date">
                            <i class="far fa-calendar-alt"></i> ${this.formatDate(item.date)}
                        </time>
                    </div>
                    ${difficultyBadge}
                </div>
                
                <div class="result-content">
                    <h3 class="result-title gradient-text">${item.title}</h3>
                    <p class="result-excerpt">${item.excerpt}</p>
                    
                    <div class="result-author">
                        <i class="fas fa-user"></i>
                        <span>${item.author}</span>
                    </div>
                </div>
                
                <footer class="result-footer">
                    <div class="result-tags">
                        ${item.tags?.map(tag => `<span class="tag glow-effect">${tag}</span>`).join('') || ''}
                    </div>
                    <div class="result-actions">
                        <button class="read-more-btn glow-effect">
                            <i class="fas fa-arrow-right"></i>
                            <span>Read More</span>
                        </button>
                    </div>
                </footer>
                
                <div class="card-glow"></div>
            </article>
        `;
    }
    
    addResultCardHandlers() {
        const resultCards = document.querySelectorAll('.result-card');
        resultCards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.read-more-btn')) {
                    const url = card.dataset.url;
                    const filename = card.dataset.filename;
                    const type = card.dataset.type;
                    this.showDetailPage(filename, type);
                }
            });
            
            const readMoreBtn = card.querySelector('.read-more-btn');
            if (readMoreBtn) {
                readMoreBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const url = card.dataset.url;
                    const filename = card.dataset.filename;
                    const type = card.dataset.type;
                    this.showDetailPage(filename, type);
                });
            }
        });
    }
    
    showDetailPage(filename, type) {
        // Create a modal or new page to show the markdown content
        this.createDetailModal(filename, type);
    }
    
    createDetailModal(filename, type) {
        const item = this.searchData.find(item => item.filename === filename);
        if (!item) return;
        
        // Create modal overlay
        const modal = document.createElement('div');
        modal.className = 'detail-modal-overlay';
        modal.innerHTML = `
            <div class="detail-modal glass-panel">
                <div class="modal-header">
                    <div class="modal-meta">
                        <div class="modal-category glow-effect">
                            <i class="fas fa-${type === 'post' ? 'newspaper' : 'file-code'}"></i>
                            <span>${type === 'post' ? 'Blog Post' : 'CTF Writeup'}</span>
                        </div>
                        <time class="modal-date">
                            <i class="far fa-calendar-alt"></i> ${this.formatDate(item.date)}
                        </time>
                        <div class="modal-author">
                            <i class="fas fa-user"></i>
                            <span>${item.author}</span>
                        </div>
                    </div>
                    <button class="modal-close glow-effect">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="modal-content">
                    <h1 class="modal-title gradient-text">${item.title}</h1>
                    
                    <div class="modal-tags">
                        ${item.tags?.map(tag => `<span class="tag glow-effect">${tag}</span>`).join('') || ''}
                    </div>
                    
                    <div class="modal-body">
                        ${this.convertMarkdownToHtml(item.content)}
                    </div>
                </div>
                
                <div class="modal-footer">
                    <button class="modal-close-btn glow-effect">
                        <i class="fas fa-times"></i>
                        <span>Close</span>
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listeners
        const closeButtons = modal.querySelectorAll('.modal-close, .modal-close-btn');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                document.body.removeChild(modal);
            });
        });
        
        // Close on overlay click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', function closeOnEscape(e) {
            if (e.key === 'Escape') {
                document.body.removeChild(modal);
                document.removeEventListener('keydown', closeOnEscape);
            }
        });
        
        // Animate in
        setTimeout(() => modal.classList.add('active'), 10);
    }
    
    convertMarkdownToHtml(markdown) {
        // Simple markdown to HTML conversion
        let html = markdown
            // Headers
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            // Bold
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            // Italic
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            // Code blocks
            .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
            // Inline code
            .replace(/`(.*?)`/g, '<code>$1</code>')
            // Lists
            .replace(/^\* (.*$)/gim, '<li>$1</li>')
            .replace(/^- (.*$)/gim, '<li>$1</li>')
            // Paragraphs
            .replace(/\n\n/g, '</p><p>')
            .replace(/^(.+)$/gm, '<p>$1</p>');
        
        // Wrap lists
        html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
        
        return html;
    }
    
    getActiveFiltersText() {
        const activeFilters = [];
        
        if (this.filterPosts.checked) activeFilters.push('Posts');
        if (this.filterWriteups.checked) activeFilters.push('Writeups');
        if (this.filterCtf.checked) activeFilters.push('CTF');
        if (this.filterWeb.checked) activeFilters.push('Web');
        if (this.filterRe.checked) activeFilters.push('RE');
        if (this.filterCrypto.checked) activeFilters.push('Crypto');
        
        return activeFilters.join(', ');
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    showLoading() {
        this.searchLoading.style.display = 'block';
        this.searchResults.innerHTML = '';
        this.noResults.style.display = 'none';
    }
    
    hideLoading() {
        this.searchLoading.style.display = 'none';
    }
    
    showNoResults() {
        this.noResults.style.display = 'block';
        this.searchResults.innerHTML = '';
    }
    
    hideNoResults() {
        this.noResults.style.display = 'none';
    }
    
    clearResults() {
        this.searchResults.innerHTML = '';
        this.noResults.style.display = 'none';
        this.currentResults = [];
    }
    
    clearSearch() {
        this.searchInput.value = '';
        this.clearResults();
        this.searchInput.focus();
    }
    
    async refreshFiles() {
        if (this.refreshBtn.classList.contains('loading')) {
            return;
        }
        
        this.refreshBtn.classList.add('loading');
        this.refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i><span>Refreshing...</span>';
        
        try {
            this.searchData = [];
            this.currentResults = [];
            this.clearResults();
            
            await this.loadFromIndex();
            
            this.showMessage(`Successfully loaded ${this.searchData.length} markdown files!`, 'success');
            
        } catch (error) {
            console.error('Refresh failed:', error);
            this.showMessage('Failed to refresh files. Please try again.', 'error');
        } finally {
            this.refreshBtn.classList.remove('loading');
            this.refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i><span>Refresh Files</span>';
        }
    }
    
    showMessage(text, type = 'info') {
        const message = document.createElement('div');
        message.className = `message ${type} glass-panel`;
        message.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${text}</span>
        `;
        
        this.searchResults.parentNode.insertBefore(message, this.searchResults);
        
        // Remove message after 3 seconds
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 3000);
    }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedSearchEngine();
});

// Add search functionality to main navigation
document.addEventListener('DOMContentLoaded', () => {
    // Add search icon to navigation
    const navItems = document.querySelector('.nav-items');
    if (navItems) {
        const searchNavItem = document.createElement('a');
        searchNavItem.className = 'nav-item glitch-hover';
        searchNavItem.href = '/page/search/';
        searchNavItem.setAttribute('data-text', '/search');
        searchNavItem.innerHTML = `
            <i class="fas fa-search"></i>
            <span>/search</span>
        `;
        
        // Insert search item after home
        const homeItem = navItems.querySelector('a[href="/"]');
        if (homeItem) {
            homeItem.parentNode.insertBefore(searchNavItem, homeItem.nextSibling);
        }
    }
}); 