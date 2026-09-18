# 最长公共子序列

## 目录

- [JavaScript 实现](#JavaScript-实现)
- [优化空间复杂度（滚动数组）](#优化空间复杂度滚动数组)
- [总结](#总结)

给定两个字符串`text1`和`text2`，返回这两个字符串的最长**公共子序列**的长度。如果不存在**公共子序列**，返回`0`。

一个字符串的**子序列**是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。

- 例如，`"ace"`是`"abcde"`的子序列，但`"aec"`不是`"abcde"`的子序列。

两个字符串的**公共子序列**是这两个字符串所共同拥有的子序列。

**示例 1：**

**输入：** text1 = "abcde", text2 = "ace"\*\*输出：**3**解释：\*\*最长公共子序列是 "ace" ，它的长度为 3 。

**示例 2：**

**输入：** text1 = "abc", text2 = "abc"\*\*输出：**3**解释：\*\*最长公共子序列是 "abc" ，它的长度为 3 。

**示例 3：**

**输入：** text1 = "abc", text2 = "def"\*\*输出：**0**解释：\*\*两个字符串没有公共子序列，返回 0 。

**提示：**

- `1 <= text1.length, text2.length <= 1000`
- `text1`和`text2`仅由小写英文字符组成。

最长公共子序列（Longest Common Subsequence, LCS）是经典的动态规划问题。我们可以用动态规划的思想来解决它：

1. **定义状态**：
   - 设`dp[i][j]`表示`text1`的前`i`个字符和`text2`的前`j`个字符的最长公共子序列的长度。
   - 例如，`dp[3][4]`表示`text1`的前 3 个字符和`text2`的前 4 个字符的 LCS 长度。
2. **状态转移方程**：
   - 如果`text1[i-1] === text2[j-1]`（即当前字符匹配），则：
   ```javascript 
   dp[i][j]=dp[i−1][j−1]+1
   ```

   - 否则（当前字符不匹配），则：
   ```javascript 
   dp[i][j]=max(dp[i−1][j],dp[i][j−1])
   ```

3. **初始化**：
   - `dp[0][j] = 0`（`text1`为空字符串时，LCS 长度为 0）
   - `dp[i][0] = 0`（`text2`为空字符串时，LCS 长度为 0）
4. **最终结果**：
   - `dp[m][n]`，其中`m`是`text1`的长度，`n`是`text2`的长度。

### JavaScript 实现

```javascript 
function longestCommonSubsequence(text1, text2) {
    const m = text1.length;
    const n = text2.length;
    
    // 初始化 dp 表，大小为 (m+1) x (n+1)，初始值为 0
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                // 当前字符匹配，LCS 长度 +1
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                // 当前字符不匹配，取左边或上边的最大值
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[m][n];
}

// 测试用例
console.log(longestCommonSubsequence("abcde", "ace")); // 3 ("ace")
console.log(longestCommonSubsequence("abc", "def"));    // 0 (无公共子序列)
```


### 优化空间复杂度（滚动数组）

如果`text1`和`text2`很长，可以用**滚动数组**优化空间复杂度，从O(mn)O(mn)降到O(n)O(n)：

```javascript 
function longestCommonSubsequence(text1, text2) {
    const m = text1.length;
    const n = text2.length;
    
    // 仅保留前一行的 dp 值
    let prev = Array(n + 1).fill(0);
    let curr = Array(n + 1).fill(0);
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                curr[j] = prev[j - 1] + 1;
            } else {
                curr[j] = Math.max(prev[j], curr[j - 1]);
            }
        }
        // 更新 prev 为当前行，准备计算下一行
        [prev, curr] = [curr, prev];
    }
    
    return prev[n];
}
```


### 总结

- **时间复杂度**：O(mn)O(mn)（遍历整个`dp`表）
- **空间复杂度**：
  - 未优化：O(mn)O(mn)
  - 优化后：O(n)O(n)
- **核心思想**：动态规划填表，利用子问题的解逐步求解更大问题。
