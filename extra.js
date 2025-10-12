const fs = require('fs-extra');

const directoriesToCopy = [
    { source: 'src/views', destination: 'dist/views' },
    { source: 'src/public', destination: 'dist/public' }    
];

async function copyDirectories() {
    try {
        for (const dir of directoriesToCopy) {
            await fs.copy(dir.source, dir.destination);
            console.log(`Copied ${dir.source} to ${dir.destination}`);
        }
        console.log('All directories copied successfully!');
    } catch (err) {
        console.error('Error copying directories:', err);
    }   
}

copyDirectories().then();