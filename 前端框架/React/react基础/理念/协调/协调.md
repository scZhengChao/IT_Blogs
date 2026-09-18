# 协调

## 目录

- [协调](#协调)
  - [设计动力](#设计动力)
  - [Diffing 算法](#Diffing-算法)
    - [比对不同类型的元素](#比对不同类型的元素)
    - [比对同一类型的元素](#比对同一类型的元素)
    - [比对同类型的组件元素](#比对同类型的组件元素)
      - [对子节点进行递归](#对子节点进行递归)
      - [Keys](#Keys)

# 协调

## 设计动力

在某一时间节点调用 React 的 render() 方法，会创建一棵由 React 元素组成的树。在下一次 state 或 props 更新时，相同的 render() 方法会返回一棵不同的树。React 需要基于这**两棵树之间的差别来判断如何有效率的更新 UI 以保证当前 UI 与最新的树保持同步。**

**这个算法问题有一些通用的解决方案，即生成将一棵树转换成另一棵树的最小操作数。 然而，****即使在**[**最前沿的算法中**](http://grfia.dlsi.ua.es/ml/algorithms/references/editsurvey_bille.pdf "最前沿的算法中")**，该算法的复杂程度为 O(n3 )，其中 n 是树中元素的数量。**

如果在 React 中使用了该算法，那么展示 1000 个元素所需要执行的计算量将在十亿的量级范围。这个开销实在是太过高昂。于**是 React 在以下两个假设的基础之上提出了一套 O(n)**

&#x20;的启发式算法：

1. 两个**不同类型的元素会产生出不同的树**；
2. 开发者可以通过 **key prop 来暗示哪些子元素在不同的渲染下能保持稳定**；

在实践中，我们发现以上假设在几乎所有实用的场景下都成立。

## Diffing 算法

当对比两颗树时，\*\*React 首先比较两棵树的根节点。\*\***不同类型的根节点元素会有不同的形态**。

### 比对不同类型的元素

当**根节点为不同类型的元素时**，React 会**拆卸原有的树并且建立起新的树**。举个例子，当一个元素从 \<a> 变成 \<img>，从 \<Article> 变成 \<Comment>，或从 \<Button> 变成 \<div> 都会**触发一个完整的重建流程**。

当**拆卸一棵树时，对应的 DOM 节点也会被销毁。组件实例将执行 componentWillUnmount() 方法**。

**当建立一棵新的树时，对应的 DOM 节点会被创建以及插入到 DOM 中。组件实例将执行 componentWillMount() 方法，** 紧接着 componentDidMount() 方法。**所有跟之前的树所关联的 state 也会被销毁。**

在根节点以下的组件也会被卸载，它们的状态会被销毁。比如，当比对以下更变时：

```javascript 
<div> 
  <Counter /> 
</div> 
<span>
   <Counter /> 
</span>
```


**React 会销毁 Counter 组件并且重新装载一个新的组件**。

### 比对同一类型的元素

当比对两个相同类型的 React 元素时，\*\*React 会保留 DOM 节点，\*\***仅比对及更新有改变的属性**。比如：

```javascript 
<div className="before" title="stuff" /> 
<div className="after" title="stuff" />
```


通过比对这两个元素，React 知道只需要修改 DOM 元素上的 className 属性。

当更新 style 属性时，React 仅更新有所更变的属性。比如：

```react jsx 
<div style={{color: 'red', fontWeight: 'bold'}} />
<div style={{color: 'green', fontWeight: 'bold'}} />
```


通过比对这两个元素，React 知道只需要修改 DOM 元素上的 color 样式，无需修改 fontWeight。

在处理完当前节点之后，**React 继续对子节点进行递归。**

### 比对同类型的组件元素

当一个组件更新时，组件实例保持不变，这样 state 在跨越不同的渲染时保持一致。React 将更新该组件实例的 props 以跟最新的元素保持一致，并且调用该实例的

\*\* ****componentWillReceiveProps****() 和 ****componentWillUpdate****() 方法。下一步，调用 ****render****() 方法，diff 算法将在之前的结果以及新的结果中进行递归。\*\*

#### 对子节点进行递归

在**默认**条件下，当递归 DOM 节点的子元素时，React 会**同时遍历两个子元素的列表**；当产生差异时，生成一个 mutation。在**子元素列表末尾新增元素时，更变开销比较小**。比如：

```react jsx 
<ul> 
  <li>first</li>
  <li>second</li> 
</ul> 
<ul> 
  <li>first</li> 
  <li>second</li> 
  <li>third</li> 
</ul>
```


React 会先匹配两个 \<li>first\</li> 对应的树，然后匹配第二个元素 \<li>second\</li> 对应的树，最后插入第三个元素的 \<li>third\</li> 树。

如果简单实现的话，**那么在列表头部插入会很影响性能，那么更变开销会比较大。**

比如：

```react jsx 
<ul> 
 <li>Duke</li> 
 <li>Villanova</li>
</ul> 
<ul> 
  <li>Connecticut</li> 
  <li>Duke</li> 
  <li>Villanova</li> 
</ul>
```


React 会针对每个子元素 mutate 而不是保持相同的 \<li>Duke\</li> 和 \<li>Villanova\</li> 子树完成。这种情况下的**低效可能会带来性能问题。**

#### Keys

&#x20;      **为了解决以上问题，React 支持 key 属性**。当子元素拥有 key 时，**React 使用 key 来匹配原有树上的子元素以及最新树上的子元素。以下例子在新增 key 之后使得之前的低效转换变得高效：**

```react jsx 
<ul> 
  <li key="2015">Duke</li> 
  <li key="2016">Villanova</li> 
</ul> 
<ul> 
  <li key="2014">Connecticut</li> 
  <li key="2015">Duke</li> 
  <li key="2016">Villanova</li> 
</ul>
```


**现在 React 知道只有带着 '2014' key 的元素是新元素，带着 '2015' 以及 '2016' key 的元素仅仅移动了**。

现实场景中，产生一个 key 并不困难。你要展现的元素可能已经有了一个唯一 ID，于是 key 可以直接从你的数据中提取：

```react jsx 
<li key={item.id}>{item.name}</li>
```


当以上情况不成立时，你可以**新增一个 ID 字段到你的模型**中，或者利用一\*\*部分内容作为哈希值来生成一个 key。\*\***这个 key 不需要全局唯一，但在列表中需要保持唯一。**

最后，你也可以使用元素在**数组中的下标作为 key。****这个策略在元素不进行重新排序时比较合适，但一旦有顺序修改，diff 就会变得慢****。**

当基于下标的**组件进行重新排序时，组件 state 可能会遇到一些问题**。由于组件实例是基于它们的 **key 来决定是否更新以及复用**，如果 key 是一个下标，那么修改顺序时会修改当前的 key，导致**非受控组件的** state（比如输入框）可能相互篡改导致无法预期的变动。

在 Codepen 有两个例子，分别为 [展示使用下标作为 key 时导致的问题](https://react.docschina.org/redirect-to-codepen/reconciliation/index-used-as-key "展示使用下标作为 key 时导致的问题")，以及[不使用下标作为 key 的例子的版本，修复了重新排列，排序，以及在列表头插入的问题](https://react.docschina.org/redirect-to-codepen/reconciliation/no-index-used-as-key "不使用下标作为 key 的例子的版本，修复了重新排列，排序，以及在列表头插入的问题")。
