const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();

  // Create a new page
  const page = await browser.newPage();

  // Navigate to Google Flights
  await page.goto('https://www.google.com/flights');


  await page.waitForSelector('div[role="search"]');

  // Enter the origin and destination airports
  await page.type('input[aria-label="Leaving from"]', 'New York');
  await page.type('input[aria-label="Going to"]', 'Los Angeles');

  // Select a date for departure and return
  await page.click('input[aria-label="Departure date"]');
  await page.waitForSelector('div.gws-flights-datepicker__dropdown');
  await page.click('div.gws-flights-datepicker__dropdown [aria-label="Jun 20, 2023"]');
  await page.click('input[aria-label="Return date"]');
  await page.waitForSelector('div.gws-flights-datepicker__dropdown');
  await page.click('div.gws-flights-datepicker__dropdown [aria-label="Jun 27, 2023"]');
  await page.click('button[aria-label="Search flights"]');
  await page.waitForNavigation();

  // Extract and display the flight prices
  const flightPrices = await page.$$eval('div.gws-flights-results__itinerary-price', (elements) =>
    elements.map((el) => el.textContent.trim())
  );

  console.log('Flight Prices:');
  flightPrices.forEach((price) => console.log(price));

  await browser.close();
})();