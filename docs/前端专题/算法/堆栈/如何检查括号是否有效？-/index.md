# 如何检查括号是否有效？&#x20;

## 目录

- [执行：](#执行)

前端开发经常需要解析模板语法，所以面试中经常会问到下面这个问题。

**描述：**

给定一个仅包含字符 '(', ')', '{', '}', '\[' 和 ']' 的字符串 s，确定输入字符串是否有效。

输入字符串在以下情况下有效：

- 括号必须用相同类型的括号闭合。
- 括号必须以正确的顺序闭合。

```javascript 
‍示例 1：
Input: s = "()"
Output: true
示例2：
Input: s = "()[]{}"
Output: true
示例3：
Input: s = "(]"
Output: false
示例4：
Input: s = "([)]"
Output: false
‍示例5：
Input: s = "{[]}"
Output: true


```


约束：

- 1 <= s.length <= 104
- s 仅包含括号 '()\[]{}'。

**分析：**

对于这类问题，我们一般更喜欢使用栈数据结构。为什么可以用堆栈来完成？

想想有效的括号是什么意思？是对称的意思。

根据***栈的后进先出原则，数据的入栈和出栈顺序是对称的。比如1、2、3、4、5、6依次入栈，对应的出栈顺序为6、5、4、3、2、1：***

```javascript 
123456 
654321

```


因此，你可以在这里记住一个规则：如果问题涉及**括号或其他对称结构**，则相关解决方案很可能与**堆栈有关。**

我们的想法是：遍历整个字符串：

- 如果找到左括号，则将其添加到堆栈中。
- 如果找到右括号，则弹出堆栈顶部的一个元素，并确定当前的右括号是否匹配它。

对于有效的括号，整个流程可能如下所示：

![](./image/image_12T0WvmPgl.png)

## **执行：**

```javascript 
const isValid = function(s) {
  if (!s) {
    return true;
  }

  // array can be used as a stack
  const stack = [];

  const len = s.length;

  for (let i = 0; i < len; i++) {
    // cache
    const ch = s[i];

    if (ch === "(" || ch === "{" || ch === "[") {
      stack.push(leftToRight[ch]);
    }
    else {
      // If the stack is not empty and the 
      // openning parenthesis at the top of the stack does not
      // match the current character, it is invalid.
      if (!stack.length || stack.pop() !== ch) {
        return false;
      }
    }
  }
  // If all parentheses can be matched successfully, 
  // then the final stack should be empty
  return !stack.length;
};

```


![](./image/image_6Fe-GMe95o.png)
