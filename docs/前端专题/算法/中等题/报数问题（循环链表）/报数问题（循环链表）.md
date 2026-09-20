# 报数问题（循环链表）

## 目录

- [题目描述](#题目描述)
- [输入描述](#输入描述)
- [输出描述](#输出描述)
- [用例](#用例)
- [题目解析](#题目解析)

#### 题目描述

有n个人围成一圈，顺序排号为1-n。

从第一个人开始报数(从1到3报数)，凡报到3的人退出圈子，问最后留下的是原来第几号的那位。

#### 输入描述

输入人数n（n < 1000）

#### 输出描述

输出最后留下的是原来第几号

#### 用例

|    |                                      |
| -- | ------------------------------------ |
| 输入 | 2                                    |
| 输出 | 2                                    |
| 说明 | 报数序号为1的人最终报3，因此序号1的人退出圈子，最后剩下序号为2的那位 |

#### 题目解析

本题是经典的约瑟夫环问题，最佳解题策略是利用循环链表。

因此，本题的关键是实现循环链表。

简易的循环链表实现：

- 循环链表节点定义

1. 节点双向性prev、next（方便节点删除）
2. 节点值val

***

- 循环链表的属性：

1. 链表长度size
2. 链表头节点head
3. 链表尾节点tail

***

- 循环链表的操作

1. 尾增节点（append操作）
2. 删除任意节点（remove操作）

***

循环链表尾增节点，需要注意：

- 如果size>0，则相当于只需要更新循环链表的尾节点tail
- 如果size == 0，则相当于更新循环链表的head和tail

循环链表删除任意节点，需要注意：

- 如果删除的不是head，tail节点，则只需要将被删除节点的prev和next节点关联
- 如果删除的是head或tail，则还需要更新head、tail指向

具体实现请对照下面CycleLinkedList代码来看。

```javascript 
/* JavaScript Node ACM模式 控制台输入获取 */
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  console.log(getResult(parseInt(line)));
});

function getResult(n) {
  const list = new CycleLinkedList();
  for (let i = 1; i <= n; i++) list.append(i);

  let num = 1;
  let cur = list.head;

  while (list.size > 1) {
    if (num == 3) {
      num = 1;
      cur = list.remove(cur);
    } else {
      num++;
      cur = cur.next;
    }
  }

  return cur.val;
}

class CycleLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  append(val) {
    const node = new Node(val);

    if (this.size > 0) {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    } else {
      this.head = node;
      this.tail = node;
    }

    this.head.prev = this.tail;
    this.tail.next = this.head;
    this.size++;
  }

  remove(cur) {
    const pre = cur.prev;
    const nxt = cur.next;

    pre.next = nxt;
    nxt.prev = pre;

    cur.next = cur.prev = null;

    if (this.head === cur) {
      this.head = nxt;
    }

    if (this.tail === cur) {
      this.tail = pre;
    }

    this.size--;

    return nxt;
  }
}

class Node {
  constructor(val) {
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

```
