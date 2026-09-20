# 零值相等

**类似于同值相等，** ​**但 +0 和 -0 被视为相等。**

零值相等不作为 JavaScript API 公开，但可以通过自定义代码实现：

```javascript 
function sameValueZero(x, y) {
  if (typeof x === "number" && typeof y === "number") {
    // x 和 y 相等（可能是 -0 和 0）或它们都是 NaN
    return x === y || (x !== x && y !== y);
  }
  return x === y;
}

```


> 就是对比了 +0 和 -0相等 ；NaN 和 NaN  相等
