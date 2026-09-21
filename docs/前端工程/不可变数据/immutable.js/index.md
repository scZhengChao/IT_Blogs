# immutable.js

`immutable.js` 是 `Facebook` 工程师 `Lee Byron` 花费 3 年时间打造，与 `React` 同期出现。`immutable.js` 提供了很多持久化不可变数据结构，包括： `List`, `Stack`, `Map`, `OrderedMap`, `Set`, `OrderedSet` 以及 `Record` 等

其中常用的数据结构：

- `Map` 键值对集合，对应于 `Object`
- `List` 有序可重复的列表，对应于 `Array`
- `Set` 无序且不可重复的列表，对应于 `Set`
- `OrderedMap` 有序的键值对集合，对应于原生 `Map`

一个常见的 `immutable.js` 在 `redux` 中应用：

```typescript 
// 初始化状态
const initialStore = fromJS({
  todoList: [
    {
      title: '任务一',
      complete: false,
    },
    {
      title: '任务二',
      complete: false,
    },
  ],
});

// reducers
function todoListReducer(state, action) {
  switch (action.type) {
    case 'todos/ADD_TODO':
      return Immutable.update(state, 'todoList', (todoList) =>
        todoList.push(
          Immutable.Map({
            title: '',
            complete: false,
          }),
        ),
      );
    case 'todos/TOGGLE_TODO':
      return Immutable.updateIn(
        state,
        ['todoList', action.index, 'complete'],
        (complete) => !complete,
      );
    default:
      return state;
  }
}

// 创建 store
const store = createStore(todoListReducer, initialStore);

// dispatch action
store.dispatch({ type: 'todos/TOGGLE_TODO', index: 1 });

```


在 `Immutable.js` 中我们使用 `fromJS` 将原生对象转换为 `Immutable.js` 对象，转换之后的对象，直接修改是不不会起任何作用的。必须通过提供的 API 来修改数据，并返回新对象。

这种模式很好地配合 `React.PureComponent` 做浅比较提升应用的性能。

![](./assets/image/image_PVgKIgzUFX.webp)

常见的 API 有：

操作 `List`

- set()
- delete()
- insert()
- clear()
- push()
- pop()
- unshift()
- shift()
- update()

操作 `Map`

- set()
- delete()
- clear()
- update()
- merge()
- mergeWith()
- mergeDeep()
- mergeDeepWith()

深层级操作

- setIn()
- deleteIn()
- updateIn()
- mergeIn()

那 `immutable.js` 如何获取数据呢，一般场景来说使用 `get` 或 `getIn` 方法返回具体类型的值。很多情况都会与原生 JS 打交道，所以避免不了 `toJS()` 方法来转换成一个原生对象。

`immutable.js` 对象也提供了像原生对象一样的方法来查询/转换数据，很多功能类似于 `lodash`

比如：

- map()
- mapKeys()
- mapEntries()
- flatMap()
- filter()
- filterNot()
- reverse()
- sort()
- sortBy()
- groupBy()

`immutable.js` 提供了大而全的方法来操作其内部对象。

它的优点非常多，那它的缺点也很明显：

- 是它不能很好和第三方库配合，数据类型是割裂的状态。
- 导致很多功能都必须使用原生对象，造成编码风格不统一，增加所在项目的混乱程度。
- 而经常 `toJS()` 也成为了其性能衰减严重。
- 60KB+ 的尺寸会让很多人望而却步
- 上手成本高，需要大量学习其内部 API

自从第一个项目用了 `immutable.js` 后，我们后面的项目也只是偶尔会用一下，解决复杂场景的数据操作。自从 `typescript` 火起来后，它便逐渐淡出我的视野，因为它对 `ts` 类型支持得非常糟糕，一个普通数据操作之后变成了 `any`，这在大型应用中简直是噩梦。

2019 年，紧接着 `immer` 火了，作为 `mobx` 的基础操作库，新颖使用及实现方式获得一大批人的芳心。
