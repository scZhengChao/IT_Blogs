# 如何反转单链表？

## 目录

- [3、如何反转单链表？](#3如何反转单链表)

# **3、如何反转单链表？**

链表是表示一系列节点的数据结构，其中每个节点包含两条信息：节点的值和指向列表中下一个节点的指针/引用。链表的开头称为头，链表末尾的节点称为尾，指向空值；null。

![](./image/image_7ioz1n2RjK.png)

与数组相比，链表的主要好处是更容易在列表中插入或删除节点。另一方面，不允许随机访问数据，因为与数组不同，链表没有索引。

链表也广泛用于前端项目。例如，React 的 Fiber 使用链表。

我们可以这样创建一个链表：

```javascript 
function Node(value) {
  this.value = value
  this.next = null
}

let head = new Node(1)
head.next = new Node(3)
head.next.next = new Node(9)
head.next.next.next = new Node(6)
head.next.next.next.next = new Node(2)

```


如果我们被要求反转一个链表，我们需要让尾部成为头部：

![](./image/image_Lq8-IHACu2.png)

我们**可以迭代或递归地反转链**表，但我们将只关注通过以下步骤来解释今天的迭代方法：

1\)、初始化三个指针：prev、current 和 next：

- prev：此指针将跟踪当前节点之前的节点，我们将其设置为空，因为单链表节点没有对其前一个节点的引用。
- current：这个将从列表的头部开始，并跟踪我们当前所在的节点。
- next：此指针将在其引用更改之前存储下一个节点，并且最初设置为 null。

2）、遍历所有节点，遍历链表，只要有节点，每次迭代执行以下操作：

- 设置为 current.next 的 next （我们需要在更改之前存储 current 的下一个节点）。
- 将 current.next 设置为 prev（我们现在可以通过反转链接来更改当前的下一个）。
- 将 prev 设置为 current（此步骤将前一个节点向前移动）。
- 设置当前等于下一个（这一步将当前节点向前移动）。
- 对所有节点重复步骤 2。

3）、 返回 prev 指针作为反向列表的新头。

```javascript 
const reverseList = head => {
  let prev = null
  let next = null
  let current = head

  while(current !== null){
    next = current.next
    current.next = prev
    prev = current
    current = next
  }
  return prev
}

```


用图解释：

![](./image/image_1YRottAhjF.png)
