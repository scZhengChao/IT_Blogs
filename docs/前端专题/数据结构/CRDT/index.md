# CRDT

## 目录

- [1. 基于计数器的 CRDT 实现](#1-基于计数器的-CRDT-实现)
- [2. 基于集合的 CRDT 实现](#2-基于集合的-CRDT-实现)
- [3. 基于列表的 CRDT 实现](#3-基于列表的-CRDT-实现)
- [总结](#总结)

CRDT（Conflict-Free Replicated Data Type）是一种用于**分布式系统中数据同步的算法**，它允许在**多个节点之间无冲突地复制和合并数据。** CRDT**算法通常用于实现分布式数据库、协同编辑**系统等场景。

在 JavaScript 中，CRDT 算法的实现可以基于不同的数据结构，如计数器、集合、列表等。下面是一个简单的基于计数器的 CRDT 实现示例。

### 1. 基于计数器的 CRDT 实现

计数器是一种简单的 CRDT 类型，它允许多个节点独立地增加或减少计数，最终所有节点的计数结果会收敛到相同的值。

```javascript 
class GCounter {
    constructor(id) {
        this.id = id; // 每个节点有唯一的 ID
        this.counts = {}; // 保存每个节点的计数值
        this.counts[this.id] = 0; // 初始化当前节点的计数值
    }

    // 增加当前节点的计数值
    increment() {
        this.counts[this.id] = (this.counts[this.id] || 0) + 1;
    }

    // 获取所有节点的计数值之和
    value() {
        return Object.values(this.counts).reduce((sum, count) => sum + count, 0);
    }

    // 合并两个计数器的状态
    merge(other) {
        for (const [id, count] of Object.entries(other.counts)) {
            this.counts[id] = Math.max(this.counts[id] || 0, count);
        }
    }
}

// 示例使用
const node1 = new GCounter('node1');
const node2 = new GCounter('node2');

node1.increment();
node1.increment();
node2.increment();

console.log('Node1 value:', node1.value()); // 输出: Node1 value: 2
console.log('Node2 value:', node2.value()); // 输出: Node2 value: 1

node1.merge(node2);
node2.merge(node1);

console.log('Node1 value after merge:', node1.value()); // 输出: Node1 value after merge: 3
console.log('Node2 value after merge:', node2.value()); // 输出: Node2 value after merge: 3
```


### 2. 基于集合的 CRDT 实现

**集合是另一种常见的 CRDT 类型**，它**允许多个节点独立地添加或删除元素，最终所有节点的集合会收敛到相同的状态。**

```typescript 

class GSet {
    constructor() {
        this.elements = new Set(); // 保存集合中的元素
    }

    // 添加元素
    add(element) {
        this.elements.add(element);
    }

    // 获取集合中的所有元素
    value() {
        return Array.from(this.elements);
    }

    // 合并两个集合的状态
    merge(other) {
        for (const element of other.elements) {
            this.elements.add(element);
        }
    }
}

// 示例使用
const set1 = new GSet();
const set2 = new GSet();

set1.add('a');
set1.add('b');
set2.add('b');
set2.add('c');

console.log('Set1 value:', set1.value()); // 输出: Set1 value: ['a', 'b']
console.log('Set2 value:', set2.value()); // 输出: Set2 value: ['b', 'c']

set1.merge(set2);
set2.merge(set1);

console.log('Set1 value after merge:', set1.value()); // 输出: Set1 value after merge: ['a', 'b', 'c']
console.log('Set2 value after merge:', set2.value()); // 输出: Set2 value after merge: ['a', 'b', 'c']

```


### 3. 基于列表的 CRDT 实现

**列表是一种更复杂的 CRDT 类型**，它允许多个节点独立地插入或删除元素，最终所有节点的**列表会收敛到相同的状态**。列表的 CRDT 实现通常使用 LSEQ 或 RGA 算法。

```javascript 
class RGA {
    constructor() {
        this.elements = []; // 保存列表中的元素
        this.timestamps = new Map(); // 保存每个元素的时间戳
    }

    // 插入元素
    insert(index, element, timestamp) {
        this.elements.splice(index, 0, element);
        this.timestamps.set(element, timestamp);
    }

    // 删除元素
    remove(element) {
        const index = this.elements.indexOf(element);
        if (index !== -1) {
            this.elements.splice(index, 1);
            this.timestamps.delete(element);
        }
    }

    // 获取列表中的所有元素
    value() {
        return this.elements;
    }

    // 合并两个列表的状态
    merge(other) {
        for (const element of other.elements) {
            const otherTimestamp = other.timestamps.get(element);
            const thisTimestamp = this.timestamps.get(element);

            if (!thisTimestamp || otherTimestamp > thisTimestamp) {
                this.insert(this.elements.length, element, otherTimestamp);
            }
        }
    }
}

// 示例使用
const list1 = new RGA();
const list2 = new RGA();

list1.insert(0, 'a', 1);
list1.insert(1, 'b', 2);
list2.insert(0, 'c', 3);
list2.insert(1, 'b', 4);

console.log('List1 value:', list1.value()); // 输出: List1 value: ['a', 'b']
console.log('List2 value:', list2.value()); // 输出: List2 value: ['c', 'b']

list1.merge(list2);
list2.merge(list1);

console.log('List1 value after merge:', list1.value()); // 输出: List1 value after merge: ['a', 'c', 'b']
console.log('List2 value after merge:', list2.value()); // 输出: List2 value after merge: ['a', 'c', 'b']
```


### 总结

CRDT 算法在分布式系统中非常有用，尤其是在**需要无冲突地同步数据的场景中**。JavaScript 中的 CRDT 实现可以基于不同的数据结构，如计数器、集合、列表等。通过合理地设计和实现 CRDT，可以确保分布式系统中的数据一致性和正确性。

[yjs](./yjs/index.md "yjs")
