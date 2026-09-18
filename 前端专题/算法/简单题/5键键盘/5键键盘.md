# 5键键盘

## 目录

- [题目描述](#题目描述)
- [输入描述](#输入描述)
- [输出描述](#输出描述)
- [用例](#用例)
- [题目解析](#题目解析)

#### 题目描述

有一个特殊的5键键盘，上面有a，ctrl-c，ctrl-x，ctrl-v，ctrl-a五个键。

a键在屏幕上输出一个字母a；

ctrl-c将当前选择的字母复制到剪贴板；

ctrl-x将当前选择的字母复制到剪贴板，并清空选择的字母；

ctrl-v将当前剪贴板里的字母输出到屏幕；

ctrl-a选择当前屏幕上的所有字母。

**注意：**

1. 剪贴板初始为空，新的内容被复制到剪贴板时会覆盖原来的内容
2. 当屏幕上没有字母时，ctrl-a无效
3. 当没有选择字母时，ctrl-c和ctrl-x无效
4. 当有字母被选择时，a和ctrl-v这两个有输出功能的键会先清空选择的字母，再进行输出

给定一系列键盘输入，输出最终屏幕上字母的数量。

#### 输入描述

- 输入为一行，为简化解析，用数字1 2 3 4 5代表a，ctrl-c，ctrl-x，ctrl-v，ctrl-a五个键的输入，数字用空格分隔。

#### 输出描述

- 输出一个数字，为最终屏幕上字母的数量。

#### 用例

|    |                      |
| -- | -------------------- |
| 输入 | 1 1 1                |
| 输出 | 3                    |
| 说明 | 连续键入3个a，故屏幕上字母的长度为3。 |

|    |                                                                                                                                     |
| -- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 输入 | 1 1 5 1 5 2 4 4                                                                                                                     |
| 输出 | 2                                                                                                                                   |
| 说明 | 输入两个a后ctrl-a选择这两个a，再输入a时选择的两个a先被清空，所以此时屏幕只有一个a，  后续的ctrl-a，ctrl-c选择并复制了这一个a，最后两个ctrl-v在屏幕上输出两个a，  故屏幕上字母的长度为2（第一个ctrl-v清空了屏幕上的那个a）。 |

#### 题目解析

逻辑题，主要考察多情况的处理。

题目中没有准确说明  选择状态 何时被解除，比如我ctrl-a全选所有字母时，然后ctrl-c将选择的字母复制到剪贴板，那么此时屏幕中字母的选中状态是保留还是清除呢？

我理解ctrl-x剪切走屏幕内容，没有字母了，自然就没有选中状态了。另外，a、ctrl-v输入时，如果有字母选中状态，则输入时会覆盖选中内容，那么选中状态就没了。

```javascript 
function getFinalLetterCount(directives) {
  const screen = [];
  const clip = [];
  let isSelect = false;

  directives.forEach((directive) => {
    switch (directive) {
      case "1": // a
        if (isSelect) screen.length = 0;
        screen.push("a");
        isSelect = false;
        break;
      case "2": // ctrl-c
        if (isSelect) {
          clip.length = 0;
          clip.push(...screen);
        }
        break;
      case "3": // ctrl-x
        if (isSelect) {
          clip.length = 0;
          clip.push(...screen);
          screen.length = 0;
          isSelect = false;
        }
        break;
      case "4": // ctrl-v
        if (isSelect) screen.length = 0;
        screen.push(...clip);
        isSelect = false;
        break;
      case "5": // ctrl-a
        if (screen.length !== 0) isSelect = true;
        break;
    }
  });

  return screen.length;
}
```
