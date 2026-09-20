# api

## 目录

- [toExponential](#toExponential)

# toExponential

[Number](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number "Number") 值的 **`toExponential()`** 方法返回一个以指数表示法表示该数字的字符串。

```javascript 
unction expo(x, f) {
  return Number.parseFloat(x).toExponential(f);
}

console.log(expo(123456, 2));
// Expected output: "1.23e+5"

console.log(expo('123456'));
// Expected output: "1.23456e+5"

console.log(expo('oink'));
// Expected output: "NaN"

```
