# 报数游戏(递归/双端队列)

## 目录

- [题目描述](#题目描述)
- [输入描述](#输入描述)
- [输出描述](#输出描述)
- [用例](#用例)
- [解法一：递归](#解法一递归)
- [解法二：双端队列](#解法二双端队列)

## 题目描述

100个人围成一圈，每个人有一个编码，编号从1开始到100。

他们从1开始依次报数，报到为M的人自动退出圈圈，然后下一个人接着从1开始报数，直到剩余的人数小于M。

请问最后剩余的人在原先的编号为多少？

## 输入描述

输入一个整数参数 M

## 输出描述

如果输入参数M小于等于1或者大于等于100，输出“ERROR!”；

否则按照原先的编号从小到大的顺序，以英文逗号分割输出编号字符串

## 用例

|    |                |
| -- | -------------- |
| 输入 | 3              |
| 输出 | 58,91          |
| 说明 | 输入M为3，最后剩下两个人。 |

|    |                |
| -- | -------------- |
| 输入 | 4              |
| 输出 | 34,45,97       |
| 说明 | 输入M为4，最后剩下三个人。 |

# 解法一：递归

> 逻辑分析，需要先考虑两点

- 找到报数M的人
- 维持连续报数

我这边维护了一个外部变量count，让他初始值为1，因为报数从1开始。

遍历数组，每遍历完一次，则count++，下次遍历时判断count是不是已经超过M了，若超过则count重置为1，以此模拟报数。

当count%M===0时，表示当前遍历的数组元素就是报数M的人，我们将他filter踢出去了。

维持连续报数，指的是，当我遍历完数组后，如果数组元素个数不少于M个，则需要新的报数轮次，此时新一轮的遍历时，第一个元素的报数需要接着上一轮结束时的报数，这个也可以通过外部变量count来维护。

```javascript 
/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  const m = parseInt(line);

  if (m <= 1 || m >= 100) {
    return console.log("ERROR!");
  }

  const arr = new Array(100).fill().map((_, index) => index + 1);

  console.log(recursive(arr, m, 1));
});

// 1 2 3 4 5 6 7 8 9 10
// 1 2 _ 4 5 _ 7 8 _ 10
// 1 _ _ 4 5 _ _ 8 _ 10
// _ _ _ 4 5 _ _ _ _ 10
// _ _ _ 4 _ _ _ _ _ 10

/* 算法逻辑 */
function recursive(arr, m, count) {
  arr = arr.filter(() => {
    if (count == m + 1) count = 1;
    return count++ % m;
  });

  if (arr.length >= m) {
    return recursive(arr, m, count);
  } else {
    return arr.join(",");
  }
}

```


# 解法二：双端队列

还有一种非常简单，非常好理解的做法就是双端队列。

> 双端队列本质也是维护一个循环结构。
> 即，
> 当报数===m时，则队头出队，报数重置为1，对应此时新对头。
> 当报数 !== m时，则队头加入队尾，报数++，对应此时新队头。

```javascript 
/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  const m = parseInt(line);

  if (m <= 1 || m >= 100) {
    return console.log("ERROR!");
  }

  const dq = new Array(100).fill(0).map((_, idx) => idx + 1);

  let idx = 1;

  while (dq.length >= m) {
    if (idx === m) {
      dq.shift();
      idx = 1;
    } else {
      dq.push(dq.shift());
      idx++;
    }
  }

  console.log(dq.sort((a, b) => a - b).join());
});
```
