# 按身高和体重排队（多条件排序）

## 目录

- [题目描述](#题目描述)
- [输入描述](#输入描述)
- [输出描述](#输出描述)
- [用例](#用例)
- [题目解析](#题目解析)

#### 题目描述

某学校举行运动会，学生们按编号(1、2、3…n)进行标识，现需要按照身高由低到高排列，对身高相同的人，按体重由轻到重排列；对于身高体重都相同的人，维持原有的编号顺序关系。请输出排列后的学生编号。

#### 输入描述

两个序列，每个序列由n个正整数组成（0 < n <= 100）。第一个序列中的数值代表身高，第二个序列中的数值代表体重。

#### 输出描述

排列结果，每个数值都是原始序列中的学生编号，编号从1开始

#### 用例

|    |                                                                        |
| -- | ---------------------------------------------------------------------- |
| 输入 | 4 \&#x20; 100 100 120 130 \&#x20; 40 30 60 50                          |
| 输出 | 2 1 3 4                                                                |
| 说明 | 输出的第一个数字2表示此人原始编号为2，即身高为100，体重为30的这个人。  由于他和编号为1的人身高一样，但体重更轻，因此要排在1前面。 |

|    |                                         |
| -- | --------------------------------------- |
| 输入 | 3 \&#x20; 90 110 90 \&#x20; 45 60 45    |
| 输出 | 1 3 2                                   |
| 说明 | 1和3的身高体重都相同，需要按照原有位置关系让1排在3前面，而不是3 1 2。 |

#### 题目解析

考察多条件排序。

```javascript 
/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];
rl.on("line", (line) => {
  lines.push(line);

  if (lines.length === 3) {
    let n = parseInt(lines[0]);
    let heights = lines[1].split(" ").map(Number);
    let weights = lines[2].split(" ").map(Number);

    console.log(getResult(n, heights, weights));

    lines.length = 0;
  }
});

function getResult(n, heights, weights) {
  let persons = [];
  for (let i = 0; i < n; i++) {
    let p = {};
    p.index = i + 1;
    p.height = heights[i];
    p.weight = weights[i];
    persons.push(p);
  }

  return persons
    .sort((a, b) =>
      a.height != b.height
        ? a.height - b.height
        : a.weight != b.weight
        ? a.weight - b.weight
        : a.index - b.index
    )
    .map((p) => p.index)
    .join(" ");
}

```
