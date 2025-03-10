import { chromium } from '@playwright/test';

async function generatePDF() {
  // Launch a browser (Playwright supports Chromium, Firefox, and WebKit)
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Set the viewport size
  await page.setViewportSize({ width: 1200, height: 800 });

  // Navigate to the target website
  await page.goto('https://example.com', { waitUntil: 'networkidle' });

  // Generate PDF
  await page.pdf({
    path: 'example.pdf',
    format: 'A4',
    printBackground: true
  });

  // Close browser
  await browser.close();

  console.log('PDF generated successfully');
}

// Execute the function
generatePDF().catch(console.error)
