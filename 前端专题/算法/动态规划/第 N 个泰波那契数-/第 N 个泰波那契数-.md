第 N 个泰波那契数

泰波那契序列 Tn 定义如下： 

T0 = 0, T1 = 1, T2 = 1, 且在 n >= 0 的条件下 Tn+3 = Tn + Tn+1 + Tn+2

给你整数 `n`，请返回第 n 个泰波那契数 Tn 的值。

**示例 1：**

**输入：** n = 4
**输出：** 4**解释：**
T\_3 = 0 + 1 + 1 = 2
T\_4 = 1 + 1 + 2 = 4

**示例 2：**

**输入：** n = 25
**输出：** 1389537

**提示：**

- `0 <= n <= 37`
- 答案保证是一个 32 位整数，即 `answer <= 2^31 - 1`。

```javascript 

var tribonacci = function(n) {
    if (n === 0) {
        return 0;
    }
    if (n <= 2) {
        return 1;
    }
    let p = 0, q = 0, r = 1, s = 1;
    for (let i = 3; i <= n; ++i) {
        p = q;
        q = r;
        r = s;
        s = p + q + r;
    }
    return s;
};


```


```javascript 

/**
 * @param {number} n
 * @return {number}
 */
var tribonacci = function(n) {
    let x= 0,y=1,z=1,m=0,i=3;
    if(n<1) return n
    if(n === 2) return  1
    for(;;){
        m = x + y + z;
        [x,y,z] = [y,z,m]
        if(++i>n) return z
    }
};

```
