# 线性缓存

## 目录

- [爬楼梯](#爬楼梯)
  - [一](#一)
  - [二](#二)
- [斐波那契数](#斐波那契数)

# 爬楼梯

> 链接：[爬楼梯](https://link.juejin.cn/?target=https://leetcode-cn.com/problems/climbing-stairs/ "爬楼梯")

## 一

假设你正在爬楼梯。需要 *n* 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

**注意：** 给定*n* 是一个正整数。

示例 1：

```javascript 
输入： 2
输出： 2
解释： 有两种方法可以爬到楼顶。

1.  1 阶 + 1 阶
2.  2 阶

```


示例 2：

```javascript 
输入： 3
输出： 3
解释： 有三种方法可以爬到楼顶。

1.  1 阶 + 1 阶 + 1 阶
2.  1 阶 + 2 阶
3.  2 阶 + 1 阶

```


**我们按照解题思路走一遍👇**

**第一步：状态定义**

dp\[i] 表示的含义:**到第i阶方案数**

**第二步： 确定状态转移方程**

根据实际的情况，我们很容易想到👇

- 到第i阶梯有两种方式
- 第一种, 从i-1向上走一步即可
- 第二中，从i-2向上走二步即可
- 所以 `dp[i] = dp[i-1] + dp[i-2]`

**第三步,** ​**初始化状态，dp数组**

```javascript 
dp[1] = 1,dp[2] = 2

```


按照这个三步走的话，我们就可以写出完整的解题代码

代码👇

```javascript 
// 爬楼梯
// https://leetcode-cn.com/problems/climbing-stairs/
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {

    // 第一步：定义dp数组,dp[i] 表示的含义:到第i阶方案数

    let dp = []

    // 第二步： 确定状态转移方程
    // 很容易得到,到第i阶梯有两种方式
    // 第一种, 从i-1向上走一步即可
    // 第二中，从i-2向上走二步即可
    // 所以 dp[i] = dp[i-1] + dp[i-2]

    // 第三步,初始化dp数组
    dp[1] = 1,dp[2] = 2
    for(let i = 3; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2]
    }

    return dp[n]
};
```


## 二

关于代码部分，仅这道题写一下，后面的题目如无特殊原因就不写代码了：

```javascript 
function dp(i: number) {
  switch (i) {
    case 1:
      return 1;
    case 2:
      return 2;
    default:
      return dp(i - 1) + dp(i - 2);
  }
}

return dp(n);

```


当然这样写重复计算了子结构，所以我们不要每次傻傻的执行 `dp(i - 1)`（因为这样**计算了超多重复子问题**），我们**需要用缓存兜底**：

```javascript 
const cache: number[] = [];

function dp(i: number) {
  switch (i) {
    case 1:
      cache[i] = 1;
      break;
    case 2:
      cache[i] = 2;
      break;
    default:
      cache[i] = cache[i - 1] + cache[i - 2];
  }

  return cache[i];
}

// 既然用了缓存，最好子底向上递归，这样前面的缓存才能优先算出来
for (let i = 1; i <= n; i++) {
  dp(i);
}

return cache[n];

```


# **斐波那契数**

**斐波那契数** （通常用 `F(n)` 表示）形成的序列称为 **斐波那契数列** 。该数列由 `0` 和 `1` 开始，后面的每一项数字都是前面两项数字的和。也就是：

F(0) = 0，F(1) = 1
F(n) = F(n - 1) + F(n - 2)，其中 n > 1

给定 `n` ，请计算 `F(n)` 。

**示例 1：**

**输入：** n = 2
**输出：** 1
**解释：** F(2) = F(1) + F(0) = 1 + 0 = 1

**示例 2：**

**输入：** n = 3
**输出：** 2
**解释：** F(3) = F(2) + F(1) = 1 + 1 = 2

**示例 3：**

**输入：** n = 4
**输出：** 3
**解释：** F(4) = F(3) + F(2) = 2 + 1 = 3

**提示：**

- `0 <= n <= 30`

```javascript 
  /**
     * @param {number} n
     * @return {number}
     */
    var fib2 = function(n) {
        const dp = []
        dp[0] = 0
        dp[1] = 1
        for(let i = 2;i<=n;i++){
            dp[i] = dp[i-1]+dp[i-2]
        }
        return dp[n]
    };
```
