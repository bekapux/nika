const fs = require('fs');
const puppeteer = require('puppeteer');
const sharp = require('sharp');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 200, height: 300 });

  const url = 'http://188.129.139.228:8080/?fbclid=IwAR2Rca9fH0LLkdKzfq6Skow3pyOx0ucKAeuzvTnXQ6MMBr4H2IymKN6Q7Gk';
  await page.goto(url, { waitUntil: 'networkidle2' });

  const characterDivs = await page.$$('div');

  for (let i = 0; i < characterDivs.length; i++) {
    const characterDiv = characterDivs[i];
    const imageBuffer = await characterDiv.screenshot({ omitBackground: true });

    fs.writeFileSync(`chars/character-${i + 1}.png`, imageBuffer);
  }

  await browser.close();
})();
