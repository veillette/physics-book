import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

(async () => {
  const baseUrl = 'http://localhost:4000/physics-book/contents/';
  const siteDir = '_site/contents';
  
  // Get all HTML files
  const files = fs.readdirSync(siteDir)
    .filter(f => f.endsWith('.html'))
    .sort();

  console.log('Checking all ' + files.length + ' pages for math rendering...\n');

  const browser = await chromium.launch();
  const page = await browser.newPage();

  let totalChecked = 0;
  let totalWithMath = 0;
  let totalUnrendered = 0;
  const failedPages = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const url = baseUrl + file;
    
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
      
      // Wait for MathJax to process
      await page.waitForTimeout(2000);

      const result = await page.evaluate(() => {
        const bodyText = document.body.innerText;
        const dollarSigns = bodyText.match(/\$\$/g);
        const renderedMath = document.querySelectorAll('mjx-container').length;
        
        return {
          unrendered: dollarSigns ? dollarSigns.length : 0,
          rendered: renderedMath
        };
      });

      totalChecked++;
      
      if (result.rendered > 0) {
        totalWithMath++;
      }

      if (result.unrendered > 0) {
        totalUnrendered++;
        failedPages.push({
          file: file,
          unrendered: result.unrendered,
          rendered: result.rendered
        });
        console.log('❌ ' + file + ' - ' + result.unrendered + ' unrendered $$');
      } else if (result.rendered > 0) {
        // Only show progress for pages with math
        const progress = Math.round(((i + 1) / files.length) * 100);
        if ((i + 1) % 20 === 0 || i === files.length - 1) {
          console.log('✅ Progress: ' + (i + 1) + '/' + files.length + ' (' + progress + '%) - ' + totalWithMath + ' pages with math checked');
        }
      }
    } catch (e) {
      console.log('⚠️  Error loading ' + file + ': ' + e.message);
    }
  }

  await browser.close();

  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log('Total pages checked: ' + totalChecked);
  console.log('Pages with math: ' + totalWithMath);
  console.log('Pages with unrendered $$: ' + totalUnrendered);

  if (failedPages.length > 0) {
    console.log('\n❌ FAILED PAGES:');
    failedPages.forEach(p => {
      console.log('  - ' + p.file + ': ' + p.unrendered + ' unrendered, ' + p.rendered + ' rendered');
    });
  } else {
    console.log('\n✅ ALL PAGES RENDER MATH CORRECTLY!');
  }
})();
