import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set the viewport to ensure proper rendering
  await page.setViewport({ width: 1200, height: 800 });

  // Navigate to the webpage you want to parse
  await page.goto('https://example.com');

  // Wait for any additional content to load if necessary
  await page.waitForTimeout(2000); // Adjust this delay as needed
  
  // Generate PDF of the webpage
  await page.pdf({ 
    path: 'example.pdf', // Path to save the PDF file
    format: 'A4', // Paper format. Use 'Letter' for US letter size
    printBackground: true // Include background colors and images
  });

  await browser.close();
})();const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set the viewport to ensure proper rendering
  await page.setViewport({ width: 1200, height: 800 });

  // Navigate to the webpage you want to parse
  await page.goto('https://example.com');

  // Wait for any additional content to load if necessary
  await page.waitForTimeout(2000); // Adjust this delay as needed
  
  // Generate PDF of the webpage
  await page.pdf({ 
    path: 'example.pdf', // Path to save the PDF file
    format: 'A4', // Paper format. Use 'Letter' for US letter size
    printBackground: true // Include background colors and images
  });

  await browser.close();
})();
