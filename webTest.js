const {chromium} = require('playwright');

// Specify the directory you want to serve
const directory = '/c/Users/veillette/physics-book';

// Specify the port number you want to use for the server
const port = 4000;

const url = '127.0.0.1';

(async () => {
    // Launch the browser
    const browser = await chromium.launch();

    // Create a new browser context
    const context = await browser.newContext();

    // Create a new page
    const page = await context.newPage();

    const localhostURL = `http://${url}:${port}`

    console.log('%o', localhostURL);

    // Navigate to the localhost URL
    await page.goto(localhostURL);

    // Wait for the page to load
    await page.waitForLoadState("load", {timeout: 10000});

    // Fetch the links using the evaluate function
    const links = await page.evaluate(() => {
        // Select all the anchor elements
        const elements = document.querySelectorAll('a');

        // Extract the href attribute from each anchor element
        const hrefs = Array.from(elements, (el) => el.href);

        // Return the array of links
        return hrefs;
    });

    const smallLinks = links.slice(90, 102);

    // Iterate through each link and check its validity
    for (const link of smallLinks) {
        // Navigate to the link
        await page.goto(link);

        // Wait for the navigation to complete
        await page.waitForLoadState('load', {timeout: 25000});

        // Get the HTTP status code
        const response = await page.waitForResponse(
            (res) => res.url() === link, {timeout: 40000});
        const status = response.status();

        // Check if the link is internal (on the same origin) and valid (status code 200)
        const isInternal = link.startsWith(localhostURL);
        const isValid = status === 200;

        // Print the link and its validity status
        console.log(`Link: ${link}`);
        console.log(`Internal: ${isInternal}`);
        console.log(`Valid: ${isValid}`);
        console.log('---');
    }

    // Close the browser
    await browser.close();
})();
