# 爱吃蟠桃的孙悟空（二分）

## 目录

- [题目描述](#题目描述)
- [输入描述](#输入描述)
- [输出描述](#输出描述)
- [用例](#用例)
- [题目解析](#题目解析)

> 最大；最小类；可以尝试二分法

#### 题目描述

孙悟空爱吃蟠桃，有一天趁着蟠桃园守卫不在来偷吃。已知蟠桃园有 N 棵桃树，每颗树上都有桃子，守卫将在 H 小时后回来。

孙悟空可以决定他吃蟠桃的速度K（个/小时），每个小时选一颗桃树，并从树上吃掉 K 个，如果树上的桃子少于 K 个，则全部吃掉，并且这一小时剩余的时间里不再吃桃。

孙悟空喜欢慢慢吃，但又想在守卫回来前吃完桃子。

请返回孙悟空可以在 H 小时内吃掉所有桃子的最小速度 K（K为整数）。如果以任何速度都吃不完所有桃子，则返回0。

#### 输入描述

第一行输入为 N 个数字，N 表示桃树的数量，这 N 个数字表示每颗桃树上蟠桃的数量。

第二行输入为一个数字，表示守卫离开的时间 H。

其中数字通过空格分割，N、H为正整数，每颗树上都有蟠桃，且 0 < N < 10000，0 < H < 10000。

#### 输出描述

吃掉所有蟠桃的最小速度 K，无解或输入异常时输出 0。

#### 用例

|    |                   |
| -- | ----------------- |
| 输入 | 2 3 4 5 \&#x20; 4 |
| 输出 | 5                 |
| 说明 | 无                 |

|    |                   |
| -- | ----------------- |
| 输入 | 2 3 4 5 \&#x20; 3 |
| 输出 | 0                 |
| 说明 | 无                 |

|    |                         |
| -- | ----------------------- |
| 输入 | 30 11 23 4 20 \&#x20; 6 |
| 输出 | 23                      |
| 说明 | 无                       |

#### 题目解析

本题可以使用二分法解题。

本题和[华为OD机试 - 机器人搬砖（Java & JS & Python & C）-CSDN博客](https://fcqian.blog.csdn.net/article/details/134454058?spm=1001.2014.3001.5502 "华为OD机试 - 机器人搬砖（Java & JS & Python & C）-CSDN博客")

类似。具体解析可以参照上面博客。或者直接看当前博客代码注释，已加入详细注释说明。

```javascript 
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
  const cnts = (await readline()).split(" ").map(Number);
  const h = parseInt(await readline());

  console.log(getResult(cnts, h));
})();

function getResult(cnts, h) {
  // 每个小时只能选一颗桃树，因此 h 小时最多只能选 h 棵树，如果桃树数量cnts.length > h，那么h小时肯定吃不完
  if (cnts.length > h) {
    return 0;
  }

  // 拥有最多桃子的那颗桃树上的桃子数量
  let max = Math.max(...cnts);

  // 如果桃树数量就是h棵，那么只能一小时吃完一颗树，才能保证h小时内吃完。此时，吃桃速度至少是max
  if (cnts.length == h) {
    return max;
  }

  // 如果只有1棵桃树，且这颗树上只有1个桃，那么吃桃速度可以是1
  let min = 1;

  // 当桃树数量少于h棵时，以max速度吃桃肯定可以吃完，但是不一定是最优解
  let ans = max;

  // 二分法
  while (min <= max) {
    // 取中间值作为吃桃速度进行尝试
    const mid = (min + max) >> 1;

    // 如果以mid速度，可以在h小时内吃完cnts所有桃，那么mid就是一个可能解
    if (check(mid, h, cnts)) {
      ans = mid;
      // 继续尝试更小的速度
      max = mid - 1;
    } else {
      // 以mid速度无法在h小时内吃完cnts所有桃，那么mid就取小了，下次应该取更大的吃桃速度
      min = mid + 1;
    }
  }

  return ans;
}

function check(speed, limit, cnts) {
  // 已花费时间
  let cost = 0;

  for (const cnt of cnts) {
    // 以speed速度吃完一颗桃树需要的时间，累加进cost
    cost += Math.ceil(cnt / speed);

    // 如果已花费时间超过了limit限制，那么说明无法以speed速度在limit时间内吃完所有桃树，此时可以直接返回false
    if (cost > limit) {
      return false;
    }
  }

  // 可以以speed速度，在limit小时内吃完所有cnts桃树
  return true;
}
```
