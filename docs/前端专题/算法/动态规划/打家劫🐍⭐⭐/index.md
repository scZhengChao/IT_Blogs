# 打家劫🐍⭐⭐

## 目录

- [打家劫🐍⭐⭐](#打家劫)

### [打家劫🐍⭐⭐](https://link.juejin.cn?target=https://leetcode-cn.com/problems/house-robber-ii/?utm_source=LCUS\&utm_medium=ip_redirect_q_uns\&utm_campaign=transfer2china "打家劫🐍⭐⭐")

> 链接：[打家劫舍 II](https://link.juejin.cn?target=https://leetcode-cn.com/problems/house-robber-ii/ "打家劫舍 II")

你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都围成一圈，这意味着第一个房屋和最后一个房屋是紧挨着的。同时，相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组，计算你在不触动警报装置的情况下，能够偷窃到的最高金额。

示例 1:

```javascript 
输入: [2,3,2]
输出: 3
解释: 你不能先偷窃 1 号房屋（金额 = 2），然后偷窃 3 号房屋（金额 = 2）, 因为他们是相邻的。

```


示例 2:

```javascript 
输入: [1,2,3,1]
输出: 4
解释: 你可以先偷窃 1 号房屋（金额 = 1），然后偷窃 3 号房屋（金额 = 3）。
     偷窃到的最高金额 = 1 + 3 = 4 。

```


来源：力扣（LeetCode） 链接：[leetcode-cn.com/problems/ho…](https://link.juejin.cn/?target=https://leetcode-cn.com/problems/house-robber-ii "leetcode-cn.com/problems/ho…") 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

***

**我们按照解题思路走一遍👇**

**第一步：状态定义**

```javascript 
// 这里就利用二维状态,既然可以选择偷或者是不偷

// dp[i][0] 表示不偷当前第i个房间,获取最高金币数

// dp[i][1] 表示的是偷第i房间,获取最高金币数

```


**第二步： 确定状态转移方程**

```javascript 
// 第i个房间偷的话,dp[i][1] = nums[i] + dp[i-1][0]
// 第i个房间不偷的话, dp[i][0] = Math.max(dp[i-1][0],dp[i-1][1])

```


**第三步,初始化状态，dp数组**

```javascript 
// dp[0][0] = 0
// dp[0][1] = nums[0]

```


但是这个题目的难点在于👇

第一个房子跟最后一个房子是挨着的，意味着我们需要做些改变，这个我也是在提示下完成的，写法很巧妙，我们具体看下代码下👇

按照这个三步走的话，我们就可以写出完整的解题代码👇

```javascript 
/**
 * @param {number[]} nums
 * @return {number}
 */

// 第一步：定义状态dp[i][j]
// 这里就利用二维状态,既然可以选择偷或者是不偷
// dp[i][0] 表示不偷当前第i个房间,获取最高金币数
// dp[i][1] 表示的是偷第i房间,获取最高金币数

// 第二步：确定状态转移方程
// 第i个房间偷的话,dp[i][1] = nums[i] + dp[i-1][0]
// 第i个房间不偷的话, dp[i][0] = Math.max(dp[i-1][0],dp[i-1][1])

// 第三步：初始化状态
// dp[0][0] = 0
// dp[0][1] = nums[0]


// 但是这个题目难点在于它第一个房子跟最后一个房子是连在一起的
// 所以我们需要做些改变
var rob = function (nums) {
    const n = nums.length;
    if (n === 0) return 0;
    if (n === 1) return nums[0];
  
    function dpHandle(nums) {
      const n = nums.length;
      if (n === 0) return 0;
      if (n === 1) return nums[0];
      let dp = Array.from(new Array(n), () => new Array(n).fill(0));
      dp[0][0] = 0;
      dp[0][1] = nums[0];
      for (var i = 1; i < n; i++) {
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1]);
        dp[i][1] = dp[i - 1][0] + nums[i];
      }
      return Math.max(dp[n - 1][0], dp[n - 1][1]);
    }
    const ans1 = dpHandle(nums.slice(1))
    const ans2 = dpHandle(nums.slice(0, nums.length - 1))
    return Math.max(ans1, ans2)
  };
  
```


[代码点这里☑️](https://link.juejin.cn/?target=https://github.com/daydaylee1227/Blog/blob/master/%E7%AE%97%E6%B3%95/%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92/leetcode-%E5%81%B7%E6%88%BF%E5%AD%90.js "代码点这里☑️")
