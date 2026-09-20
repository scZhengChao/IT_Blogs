# Intl

很多人会用 moment.js 处理日期、货币格式化，但这个库体积特别大（压缩后也有几十 KB）；而 `Intl` 是浏览器原生 API，支持货币、日期、数字的本地化，体积为 0，还能自动适配地区。

举个例子：

多语言货币格式化（适配中英文）

```javascript 
const price = 1234.56;

// 人民币格式（自动加 ¥ 和千分位）
const cnyPrice = new Intl.NumberFormat("zh-CN", {
  style: "currency",
  currency: "CNY",
}).format(price);

// 美元格式（自动加 $ 和千分位）
const usdPrice = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
}).format(price);

console.log(cnyPrice, usdPrice); // ¥1,234.56 $1,234.56

```


日期本地化（不用手动拼接年月日）：

```javascript 
const now = new Date();

// 中文日期：2025年11月3日 15:40:22
const cnDate = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
}).format(now);

// 英文日期：November 3, 2025, 03:40:22 PM
const enDate = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
}).format(now);
console.log(cnDate, enDate);

```
