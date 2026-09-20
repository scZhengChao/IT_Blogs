# 爬楼梯

## 目录

- [爬楼梯⭐](#爬楼梯)

### [爬楼梯⭐](https://link.juejin.cn/?target=https://leetcode-cn.com/problems/climbing-stairs/ "爬楼梯⭐")

> 链接：[爬楼梯](https://link.juejin.cn/?target=https://leetcode-cn.com/problems/climbing-stairs/ "爬楼梯")

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


来源：力扣（LeetCode） 链接：[leetcode-cn.com/problems/cl…](https://link.juejin.cn/?target=https://leetcode-cn.com/problems/climbing-stairs "leetcode-cn.com/problems/cl…") 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

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
