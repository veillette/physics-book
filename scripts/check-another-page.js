import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const url = 'http://localhost:4000/physics-book/contents/ch11ArchimedesPrinciple.html';
  console.log('Checking: ' + url + '\n');
  
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  const result = await page.evaluate(() => {
    const bodyText = document.body.innerText;
    const lines = bodyText.split('\n');
    const linesWithDollarSigns = [];
    
    lines.forEach((line, idx) => {
      if (line.includes('$$')) {
        linesWithDollarSigns.push({
          lineNum: idx,
          text: line.trim()
        });
      }
    });
    
    return {
      linesWithDollarSigns: linesWithDollarSigns,
      renderedMath: document.querySelectorAll('mjx-container').length
    };
  });

  console.log('Rendered math elements: ' + result.renderedMath);
  console.log('Lines with unrendered $$:\n');
  
  result.linesWithDollarSigns.forEach(line => {
    console.log('  ' + line.text.substring(0, 150));
  });

  await browser.close();
})();
