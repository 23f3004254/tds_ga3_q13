import { chromium } from 'playwright';

const seeds = [33,34,35,36,37,38,39,40,41,42];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let totalSum = 0;

  for (let seed of seeds) {
    const url = `https://tds-playwright.vercel.app/?seed=${seed}`;
    await page.goto(url);

    const numbers = await page.$$eval('table td', tds =>
      tds.map(td => parseFloat(td.innerText)).filter(n => !isNaN(n))
    );

    const sum = numbers.reduce((a, b) => a + b, 0);
    totalSum += sum;
  }


console.log(`FINAL TOTAL: ${totalSum}`);
console.log("SUM =", totalSum);

  await browser.close();
})();