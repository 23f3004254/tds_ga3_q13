const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  let globalSum = 0;

  const urls = [
    'https://sanand0.github.io/tdsdata/js_table/?seed=33',
    'https://sanand0.github.io/tdsdata/js_table/?seed=34',
    'https://sanand0.github.io/tdsdata/js_table/?seed=35',
    'https://sanand0.github.io/tdsdata/js_table/?seed=36',
    'https://sanand0.github.io/tdsdata/js_table/?seed=37',
    'https://sanand0.github.io/tdsdata/js_table/?seed=38',
    'https://sanand0.github.io/tdsdata/js_table/?seed=39',
    'https://sanand0.github.io/tdsdata/js_table/?seed=40',
    'https://sanand0.github.io/tdsdata/js_table/?seed=41',
    'https://sanand0.github.io/tdsdata/js_table/?seed=42'
  ];

  for (const url of urls) {
    console.log(`Visiting: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle' });  // Waits for dynamic tables to load

    // Find all table cells and extract numbers
    const numbers = await page.$$eval('table td, table th', els =>
      els.flatMap(el => {
        const text = el.textContent.trim();
        const num = parseFloat(text);
        return isNaN(num) ? [] : [num];
      })
    );

    const pageSum = numbers.reduce((a, b) => a + b, 0);
    globalSum += pageSum;
    console.log(`Page sum: ${pageSum.toFixed(2)}, Running total: ${globalSum.toFixed(2)}`);
  }

  console.log(`\nFINAL TOTAL SUM: ${globalSum.toFixed(2)}`);
  await browser.close();
})();
