# 悄悄话

## 目录

- [题目描述](#题目描述)
- [输入描述](#输入描述)
- [输出描述](#输出描述)
- [用例](#用例)
- [题目解析](#题目解析)
- [JS算法源码](#JS算法源码)

#### 题目描述

给定一个二叉树，每个节点上站一个人，节点数字表示父节点到该节点传递悄悄话需要花费的时间。

初始时，根节点所在位置的人有一个悄悄话想要传递给其他人，求二叉树所有节点上的人都接收到悄悄话花费的时间。

#### 输入描述

给定二叉树

> 0 9 20 -1 -1 15 7 -1 -1 -1 -1 3 2

注：-1表示空节点

![](https://img-blog.csdnimg.cn/fa48ff09af474377babcb793c5352a28.png)

#### 输出描述

返回所有节点都接收到悄悄话花费的时间

> 38

#### 用例

|    |                                   |
| -- | --------------------------------- |
| 输入 | 0 9 20 -1 -1 15 7 -1 -1 -1 -1 3 2 |
| 输出 | 38                                |
| 说明 | 无                                 |

#### 题目解析

题目给的输入信息对照图示来看，应该就是二叉树的层序遍历序列，如下图所示：

![](https://img-blog.csdnimg.cn/direct/534ffed960dc4adea53d7ddc9198c0e3.png)

层序遍历序列中，父子节点存在如下关系：

> 如果父节点在序列中的索引是k，则其两个子节点在序列中的索引分别为 2k+1, 2k+2

因此，我们就无需建树操作了。

而悄悄话的传递，其实父节点将自身得到消息的时延累加到其各个子节点上，最终叶子节点中最大的时延值就是：二叉树所有节点上的人都接收到悄悄话花费的时间

![](https://img-blog.csdnimg.cn/direct/8cc7ebc6f77a47f3b1a785979b40289a.png)

#### JS算法源码

> 遍历找到最长的；

> 同层遍历；然后累加times

```javascript 
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
  const times = (await readline()).split(" ").map(Number);

  // 记录题解
  let ans = 0;

  // 根节点的索引是0
  const queue = [0];
  while (queue.length > 0) {
    const fa = queue.shift(); // 父节点索引

    const ch1 = 2 * fa + 1; // 左子节点索引
    const ch2 = 2 * fa + 2; // 右子节点索引

    // fa是否存在左子节点
    const ch1_exist = ch1 < times.length && times[ch1] != -1;
    // fa是否存在右子节点
    const ch2_exist = ch2 < times.length && times[ch2] != -1;

    // fa如果存在左子节点
    if (ch1_exist) {
      times[ch1] += times[fa];
      queue.push(ch1);
    }

    // fa如果存在右子节点
    if (ch2_exist) {
      times[ch2] += times[fa];
      queue.push(ch2);
    }

    // fa是叶子节点
    if (!ch1_exist && !ch2_exist) {
      // 保留叶子节点中最大时延
      ans = Math.max(ans, times[fa]);
    }
  }

  console.log(ans);
})();
```
