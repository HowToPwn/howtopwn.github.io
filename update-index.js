const fs = require('fs');
const path = require('path');

// Scan directories and create index
function createSearchIndex() {
    const files = [];
    
    // Scan _posts
    const postsDir = './_posts';
    if (fs.existsSync(postsDir)) {
        const postFiles = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
        postFiles.forEach(file => {
            files.push({
                path: `/_posts/${file}`,
                type: 'post'
            });
        });
    }
    
    // Scan _writeups
    const writeupsDir = './_writeups';
    if (fs.existsSync(writeupsDir)) {
        const writeupFiles = fs.readdirSync(writeupsDir).filter(f => f.endsWith('.md'));
        writeupFiles.forEach(file => {
            files.push({
                path: `/_writeups/${file}`,
                type: 'writeup'
            });
        });
    }
    
    // Create index
    const index = {
        lastUpdated: new Date().toISOString(),
        totalFiles: files.length,
        files: files
    };
    
    // Ensure directory exists
    const outputDir = './assets/data';
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Write file
    fs.writeFileSync('./assets/data/search-index.json', JSON.stringify(index, null, 2));
    
    console.log(`✅ Index updated! Found ${files.length} markdown files:`);
    files.forEach(f => console.log(`  - ${f.path} (${f.type})`));
}

createSearchIndex(); 