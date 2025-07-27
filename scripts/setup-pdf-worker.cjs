const fs = require('fs');
const path = require('path');
const https = require('https');

const setupPdfWorker = async () => {
  console.log('🔍 Setting up PDF.js worker...');
  
  // Possible locations for the PDF worker file
  const possibleSources = [
    'node_modules/pdfjs-dist/build/pdf.worker.min.js',
    'node_modules/pdfjs-dist/build/pdf.worker.js',
    'node_modules/pdfjs-dist/build/pdf.worker.mjs',
    'node_modules/pdfjs-dist/legacy/build/pdf.worker.min.js',
    'node_modules/pdfjs-dist/legacy/build/pdf.worker.js',
    'node_modules/pdfjs-dist/webpack/pdf.worker.min.js'
  ];

  const destination = 'client/public/pdf.worker.min.js';

  // Ensure destination directory exists
  const destDir = path.dirname(destination);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
    console.log(`📁 Created directory: ${destDir}`);
  }

  // Check if pdfjs-dist is installed
  if (!fs.existsSync('node_modules/pdfjs-dist')) {
    console.error('❌ pdfjs-dist package not found.');
    console.log('📦 Installing pdfjs-dist...');
    
    const { execSync } = require('child_process');
    try {
      execSync('npm install pdfjs-dist', { stdio: 'inherit' });
      console.log('✅ pdfjs-dist installed successfully');
    } catch (err) {
      console.error('❌ Failed to install pdfjs-dist');
      await downloadFromCDN();
      return;
    }
  }

  // Try to find and copy the worker file
  let sourceFile = null;
  console.log('🔍 Searching for PDF worker file...');
  
  for (const source of possibleSources) {
    console.log(`   Checking: ${source}`);
    if (fs.existsSync(source)) {
      sourceFile = source;
      console.log(`✅ Found PDF worker at: ${source}`);
      break;
    }
  }

  if (sourceFile) {
    try {
      fs.copyFileSync(sourceFile, destination);
      const stats = fs.statSync(destination);
      console.log(`✅ PDF worker copied successfully!`);
      console.log(`   From: ${sourceFile}`);
      console.log(`   To: ${destination}`);
      console.log(`   Size: ${(stats.size / 1024).toFixed(2)} KB`);
      return;
    } catch (err) {
      console.log(`❌ Failed to copy from ${sourceFile}:`, err.message);
    }
  }

  // If we get here, local copy failed - try to list what's available
  if (fs.existsSync('node_modules/pdfjs-dist')) {
    console.log('\n📁 Available files in pdfjs-dist:');
    try {
      const listFiles = (dir, prefix = '') => {
        const items = fs.readdirSync(dir);
        items.forEach(item => {
          const fullPath = path.join(dir, item);
          try {
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
              console.log(`${prefix}📁 ${item}/`);
              if (item === 'build' || item === 'legacy') {
                listFiles(fullPath, prefix + '  ');
              }
            } else {
              console.log(`${prefix}📄 ${item}`);
            }
          } catch (e) {
            console.log(`${prefix}❓ ${item} (access error)`);
          }
        });
      };
      
      listFiles('node_modules/pdfjs-dist');
    } catch (err) {
      console.log('   Unable to list files');
    }
  }

  // Download from CDN as fallback
  console.log('\n📥 Downloading PDF worker from CDN...');
  await downloadFromCDN();

  async function downloadFromCDN() {
    // Get version from package.json or use default
    let version = '4.10.38';
    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      if (packageJson.dependencies && packageJson.dependencies['pdfjs-dist']) {
        version = packageJson.dependencies['pdfjs-dist'].replace(/[\^~]/, '');
      }
    } catch (err) {
      console.log(`Using default version: ${version}`);
    }

    const url = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${version}/build/pdf.worker.min.js`;
    console.log(`📡 Downloading from: ${url}`);

    return new Promise((resolve, reject) => {
      const file = fs.createWriteStream(destination);
      
      https.get(url, (response) => {
        if (response.statusCode === 302 || response.statusCode === 301) {
          // Follow redirect
          https.get(response.headers.location, (redirectResponse) => {
            if (redirectResponse.statusCode !== 200) {
              reject(new Error(`Download failed: ${redirectResponse.statusCode}`));
              return;
            }
            redirectResponse.pipe(file);
            handleFileFinish();
          }).on('error', reject);
        } else if (response.statusCode !== 200) {
          reject(new Error(`Download failed: ${response.statusCode}`));
          return;
        } else {
          response.pipe(file);
          handleFileFinish();
        }

        function handleFileFinish() {
          file.on('finish', () => {
            file.close();
            try {
              const stats = fs.statSync(destination);
              console.log('✅ PDF worker downloaded successfully from CDN!');
              console.log(`   Size: ${(stats.size / 1024).toFixed(2)} KB`);
              resolve();
            } catch (err) {
              reject(new Error('Downloaded file verification failed'));
            }
          });
        }
      }).on('error', (err) => {
        fs.unlink(destination, () => {}); // Clean up on error
        reject(err);
      });
    });
  }
};

// Run the setup
setupPdfWorker().catch(err => {
  console.error('❌ Failed to setup PDF worker:', err.message);
  process.exit(1);
});
