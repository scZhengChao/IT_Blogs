# 补零

当你需要在一个数字num不足len位数的时候前面补零操作

```javascript 
const replenishZero = (num, len, zero = 0) => num.toString().padStart(len, zero)
replenishZero(8, 2) // 08

```
