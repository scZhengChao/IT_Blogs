# 反转字符串中的单词(栈)

给你一个字符串 `s` ，请你反转字符串中 **单词** 的顺序。

**单词** 是由非空格字符组成的字符串。`s` 中使用至少一个空格将字符串中的 **单词** 分隔开。

返回 **单词** 顺序颠倒且 **单词** 之间用单个空格连接的结果字符串。

**注意：** 输入字符串 `s`中可能会存在前导空格、尾随空格或者单词间的多个空格。返回的结果字符串中，单词间应当仅用单个空格分隔，且不包含任何额外的空格。

**示例 1：**

```git 
输入： s = "the sky is blue"
输出： "blue is sky the"

```


**示例 2：**

```git 
输入： s = "  hello world  "
输出： "world hello"
解释： 反转后的字符串中不能存在前导空格和尾随空格。

```


**示例 3：**

```git 
输入： s = "a good   example"
输出： "example good a"
解释： 如果两个单词间有多余的空格，反转后的字符串需要将单词间的空格减少到仅有一个。

```


**提示：**

- `1 <= s.length <= 104`
- `s` 包含英文大小写字母、数字和空格 `' '`
- `s` 中 **至少存在一个** 单词

```javascript 
/**
 * @description: 栈  TC:O(n)  SC:O(n)
 * @author: JunLiangWang
 * @param {*} s 给定字符串s
 * @return {*}
 */
function stack(s) {
    /**
     * 本方案使用栈的方式，首先遍历字符串s,利用变量word存放
     * 已遍历的字符，然后遇到空格字符则把word压入栈中，随后
     * 将word置为空字符串，如此反复直到遍历完成字符串s
     * 
     * 遍历完成字符串后，由于字符串s的最后一个字符可能不存在
     * 空格，因此需要检查word是否为空字符串，如果不为空则将其
     * 压入栈中
     * 
     * 最后遍历出栈，然后根据出栈的字符重新使用空格拼接即可
     */
    let word = '', stack = []

    //遍历字符串s,利用变量word存放已遍历的字符，然后遇
    //到空格字符则把word压入栈中，随后将word置为空字符
    //串，如此反复直到遍历完成字符串s
    for (let i = 0; i < s.length; i++) {
        if (s[i] == ' ') {
            if (word != '') stack.push(word)
            word = ''
            continue;
        }
        word += s[i]
    }
    // 字符串s的最后一个字符可能不存在空格，因此需要检查
    // word是否为空字符串，如果不为空则将其压入栈中
    if (word != '') stack.push(word)

    // 如果没有单词直接返回空字符
    if (stack.length == 0) return ''
    // 如果只有一个单词直接返回单词
    else if (stack.length == 1) return stack[0]
    // 如果有两个单词以上，则需要使用空格拼接单词
    word = stack.pop()
    while (stack.length) {
        word += ' ' + stack.pop()
    }
    // 返回拼接的字符串
    return word
}

```
