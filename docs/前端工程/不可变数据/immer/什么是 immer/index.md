# 什么是 immer

## 目录

- [Immer 在极限情况下的性能问题](#Immer-在极限情况下的性能问题)

`Immer` **简化了对不可变数据结构的处理**。使用 `Immer`，将所有更改**应用于临时草稿**，它是 `currentState` 的代理。一旦完成了所有的变更，`Immer` 将**根据对草稿状态的变更生成** `nextState`。这意味着可以**通过简单地修改数据来与数据交互，同时保留不可变数据的所有好处。**

![](./assets/image/image_kYTq7MmTbA.webp)

在 `Immer` 中，基本上可以只用一个 API，那就是 `produce`。简单的例子：

```typescript 
const demo = {
  info: {
    user: {
      tom: 'good',
    },
  },
};

const result = produce(demo, (draft) => {
  draft.info.user.tom = 'ok';
});

```


通过 `draft`（草稿）将当前 `scope` 中**修改的东西最终返回生成新的对象**。这种方式既享受了 `immutable` 的特性，又让开发者有 `mutable` 修改数据的爽快。

`Immer` 巧妙通过 `Proxy.revocable` 正向代理的方式实现核心逻辑，配合 `Object.freeze` 将**修改后的数据冻结，避免再次修改**。`Immer` 后来一度成为了开发首选项目，直到在一个复杂的项目开始。

### Immer 在极限情况下的性能问题

`Immer` 官方说会比普通的 `reducer` 慢几倍，但极限情况就除外了。举个例子：

```typescript 
const demo = {
  info: Array.from(Array(10000).keys()),
};

produce(data3, (draft) => {
  draft.info[2000] = 0;
});

```


在**一万条平行结构的数据修改时。普通的浅拷贝只需要 ****`0.0061`**** 毫秒，而 ****`immer`**** 上升到了 ****`24`**** 毫秒。如果这个修改频繁触发，就会出现掉帧的情况。**

![](./assets/image/image_Lapo5wI_6z.webp)

后面我向 `Immer` 提了一个 `Issue` [github.com/immerjs/imm…](https://link.juejin.cn?target=https://github.com/immerjs/immer/issues/867 "github.com/immerjs/imm…") 。发现 `Object.freeze` 非常耗时，通过 API `setAutoFreeze(false);` 关闭 `freeze` 后，时间降到了 `10` 毫秒。但对比普通的浅拷贝依然是被降维打击。

接着去除了 `Immer` 在 `getter`/`setter`/`class` 场景下的实现，再经过一些列的优化，比如 `shallowCopy` 的实现。速度降到了 `4` 毫秒，对比之前还是有很大的提升，至少不掉帧了。

![](./assets/image/image_v_K-WIcYbD.webp)

我们实现了一份公司自己的 `immer` 拷贝。我想它还有很大的性能提升空间，那就要看 `immer` 的作者愿不愿意实现了。

[自己实现](./自己实现/index.md "自己实现")
