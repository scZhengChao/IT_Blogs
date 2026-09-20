# 绕过验证码检测

对一些网站的验证码的校验，例如下图的google的人机验证，其实可以借助[puppeteer-extra-plugin-recaptcha](https://link.juejin.cn/?target=https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-recaptcha "puppeteer-extra-plugin-recaptcha") 进行破解处理来完成后续数据的操作，实例代码如下：

*Tips: 知识需要付费哦*

![](./image/image_msUsuRMFon.png)

实例代码如下：

```javascript 
const puppeteer = require("puppeteer-extra");
const RecaptchaPlugin = require("puppeteer-extra-plugin-recaptcha");
puppeteer.use(
  RecaptchaPlugin({
    provider: {
      id: "2captcha",
      token: "xxxxx", // 知识需要付费
    },
    visualFeedback: true,
  })
);
const waitFor = async (t) => {
  return new Promise((r) => setTimeout(r, t));
};
puppeteer.launch({ headless: false }).then(async (browser) => {
  const page = await browser.newPage();
  await page.goto("https://www.google.com/recaptcha/api2/demo");

  await page.solveRecaptchas();

  await Promise.all([
    page.waitForNavigation(),
    page.click(`#recaptcha-demo-submit`),
  ]);
    await page.screenshot({ path: 'response.png', fullPage: true })
    await browser.close()
});

```
