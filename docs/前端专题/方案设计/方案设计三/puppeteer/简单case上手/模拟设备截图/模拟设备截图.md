# 模拟设备截图

通过puppeteer模拟iPhone6进行访问百度的域名，进行当前网页的截图

```javascript 
const puppeteer = require("puppeteer");
const iPhone = puppeteer.devices["iPhone 6"];

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.emulate(iPhone);
  await page.goto("https://baidu.com/");
  await page.screenshot({
    path: "full.png",
    fullPage: true,
  });
  console.log(await page.title());
  await browser.close();
})();

```
