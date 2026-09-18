# re-render

## 目录

- [哪些情况导致组件重复渲染](#哪些情况导致组件重复渲染)
  - [🧐 状态变化导致重复渲染](#-状态变化导致重复渲染)
  - [🧐 父组件导致重复渲染](#-父组件导致重复渲染)
  - [🧐 Context变化导致重复渲染](#-Context变化导致重复渲染)
  - [🧐 hook变化导致重复渲染](#-hook变化导致重复渲染)
- [通过组合阻止重复渲染](#通过组合阻止重复渲染)
  - [⛔️不要在渲染函数中创建组件](#️不要在渲染函数中创建组件)
  - [✅ 防止重复渲染 move state down](#-防止重复渲染-move-state-down)
  - [✅ 防止重复渲染 children as props](#-防止重复渲染-children-as-props)
  - [✅ 防止重复渲染： components as props](#-防止重复渲染-components-as-props)
- [使用 React.memo 避免重复渲染](#使用-Reactmemo-避免重复渲染)
  - [✅ React.memo 中带 props 的组件](#-Reactmemo-中带-props-的组件)
  - [✅ React.memo中有 children 或 props作为组件时](#-Reactmemo中有-children-或-props作为组件时)
- [使用 useCallback useMemo](#使用-useCallback-useMemo)
  - [✅ 必要的 userMemo useCallback](#-必要的-userMemo-useCallback)
- [避免 Context 提供的数据引起重复渲染](#避免-Context-提供的数据引起重复渲染)
  - [✅ 缓存 Provider 提供的数据](#-缓存-Provider-提供的数据)
  - [✅ 将读取，写入数据分割成不同的 Provider](#-将读取写入数据分割成不同的-Provider)
  - [✅ 将数据分割成小的 Provider](#-将数据分割成小的-Provider)

当谈论 `React` 的性能问题时，不可避免的一个话题就是组件的 `re-render 重复渲染`。`React` 的组件需要关注两个阶段

1. 初始阶段渲染： 当组件第一次挂载时
2. 重复渲染： 组件已挂载，需要更新组件的状态

&#x20;        但也并不是所有的 `re-render` 都是有问题的，有些 `re-render` 是必要的，而有些 `re-render` 是不必要的。

&#x20;        **必要的渲染**： 当组件的状态发生变化时，需要更新。如用户和页面发生交互，或异步获取的网络新的数据等，都需要页面更新到最新的数据，这时就需要组件重复渲染。

&#x20;        **不必要的渲染**：由于工程中不合理的app架构，会导致一些组件渲染时，另外一些不需要渲染的组件，也会重复渲染，这些渲染有时是不必要的。&#x20;

那在 `React` 中，哪些情况会引起重复渲染呢？有哪些方法可以避免一些不必要的重复渲染呢？

## 哪些情况导致组件重复渲染

### 🧐 状态变化导致重复渲染

在 `React` 中当组件的状态发生变化，就会重复渲染，这是 `React` 中组件更新的的内部机制，也是引起组件重复渲染的根本原因。

![](image_FkUXIo7tN7.png)

### 🧐 父组件导致重复渲染

当父组件重复渲染时，它的子组件都会跟着重新渲染。

![](image_c9l-Tl3S26.png)

### 🧐 Context变化导致重复渲染

当在使用 `Context` 时，如果 `Context Provider` 提供的 `value` 发生变化时，在所有使用 `Context` 数据的组件就会导致重复渲染，即使组件中只使用了 `Context` 中的**部分数据也会导致重复渲染**。

![](image_NySSoUvqWv.png)

### 🧐 hook变化导致重复渲染

在组件中使用 `hook` 时，当 `hook` 中**状态发生变化，会导致组件的重复渲染**，如果在 `hook` 中使用了 `Context` 和 `Context value` 时，也会导致组件的重复渲染。

![](image__qZDCuhuhX.png)

## 通过组合阻止重复渲染

### ⛔️不要在渲染函数中创建组件

&#x20;        在一个组件中的**渲染函数中创建组件是最大的性能杀手**，组件每一次重复渲染都会**导致创建的组件销毁并重新创建**，这就会**比通常创建组件的性能差。**

![](image_dcfist7f0u.png)

### ✅ 防止重复渲染 `move state down`

当一个组件中一部分组件使用了 `state` ,而另一部分组件相对和 `state` 相对孤立，典型的例子就是打开 关闭 `dialog`的组件中，通常把使用 `state` 的组件单独提取成一个独立的组件，这样未使用 `state` 的组件就不会受到 `state` 的变化的影响

**Bad**

```typescript 
const Component = () => {
  const [isOpen, setOpen] = useState(false)
  return (
    <div>
        <button onClick={() => setOpen(!isOpen)}>open</button>
        { isOpen && <ModalDialog />}
        {/* 状态的变化会引起 SlowComponent 重复渲染 */}
        <SlowComponent />
    </div>
  )
}

```


**优化后**

**尽量的抽成组件；让更新影响的组件尽量的小；**

```typescript 
const Component = () => {
  return (
    <div>
        <ButtonWithDialog />
        <SlowComponent />
    </div>
  )
}

const ButtonWithDialog = () => {
  const [isOpen, setOpen] = useState(false)
  return (
    <>
        <button onClick={() => setOpen(!isOpen)}>open</button>
        { isOpen && <ModalDialog />}
    </>
  )
}

```


### ✅ 防止重复渲染 `children as props`

有时无法轻易的把一个组件单独的独立提取出来，此时可以把**带状态的组件提取**出来，然后**把耗时的组件**作为 `children` props 传递给那个组件，这样也可以避免重复渲染

**Bad**

```typescript 
const FullComponent = () => {
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

  return (
    <div onClick={onClick} className="click-block">
      <p>Click this component - "slow" component will re-render</p>
      <p>Re-render count: {state}</p>
      <VerySlowComponent />
    </div>
  );
};

```


父组件中点击会引起父组件状态变化，父组件需要渲染，对应的 `VerySlowComponent`

**优化后**

**尽量的抽成组件；让更新影响的组件尽量的小；**

把带**状态管理的组件提取**出来，接收一个 `children` 属性

```typescript 
const ComponentWithClick = ({ children }) => {
  const [state, setState] = useState(1);
  const onClick = () => {
    setState(state + 1);
  };
  return (
    <div onClick={onClick} className="click-block">
      <p>Re-render count: {state}</p>
      {children}
    </div>
  );
};
const SplitComponent = () => {
  return (
    <>
      <ComponentWithClick>
        <>
          <p>Click the block - "slow" component will NOT re-render</p>
          <VerySlowComponent />
        </>
      </ComponentWithClick>
    </>
  );
};

```


### ✅ 防止重复渲染： `components as props`

&#x20;      和上面的情况类似，把**带状态管理的组件**提取出来，把**相对耗时的组件**作为组件的 `props` 传递过去，`props` **不受状态变化的影响**，所以可以避免耗时组件的重复渲染，适用于**耗时组件不受状态变化的影响，又不能作为 ****`children`**** 属性传递**

**Bad**

```typescript 
const FullComponent = () => {
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

  return (
    <div onClick={onClick} className="click-block">
      <p>Click this component - "slow" component will re-render</p>
      <p>Re-render count: {state}</p>
      <VerySlowComponent />
      <p>Something</p>
      <AnotherSlowComponent />
    </div>
  );
};

```


**优化后**

```typescript 
const ComponentWithClick = ({ left, right }) => {
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

  return (
    <div onClick={onClick} className="click-block">
      <p>Re-render count: {state}</p>
      {left}
      <p>Something</p>
      {right}
    </div>
  );
};

// 把组件作为 props 传递给组件，这样耗时组件就不受点击事件的影响
const SplitComponent = () => {
  const left = (
    <>
      <h3>component with slow components passed as props</h3>
      <p>Click the block - "slow" components will NOT re-render</p>
      <VerySlowComponent />
    </>
  );
  const right = <AnotherSlowComponent />;
  return (
    <>
      <ComponentWithClick left={left} right={right} />
    </>
  );
};

```


关于 `children as props` 和 `components as props` 优化的代码示例

## 使用 `React.memo` 避免重复渲染

使用 `React.memo` 可以有效的避免组件的重复渲染，但并不是使用了 `React.memo` 都可以避免重复渲染

### ✅ `React.memo` 中带 `props` 的组件

所有不是原始值的 `props` 都必须缓存起来，使用`React.memo`才能起作用，下面的例子中都使用了 `React.memo` ,但是第一个组件的 `props` 没有缓存，还是会重复渲染， 第二个由于 `props` 使用了缓存就不会引起重复渲染

```typescript 
const Child = ({ value }) => {
  console.log("Child re-renders", value.value);
  return <>{value.value}</>;
};

const ChildMemo = React.memo(Child);

const App = () => {
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

   const memoValue = useMemo(() => ({ value: "second" }), []);
 
  return (
    <>
      <p>first 组件还是会重复渲染</p>
      <p>Second 不会重复渲染</p>

      <button onClick={onClick}>click here</button>
      <br />
      <ChildMemo value={{ value: "first" }} />
      <br />
      <ChildMemo value={memoValue} />
    </>
  );
};
```


### ✅ `React.memo`中有 `children` 或 `props`作为组件时

当用 `React.memo` 封装的组件作为 `props` 或 `children`时，不能把 `React.memo` 作用到父组件上，下面的例子说明， **注意下面写法的区别**

```typescript 
const Child = ({ value }) => {
  console.log("Child re-renders", value.value);
  return <>{value.value}</>;
};

const Parent = ({ left, children }) => {
  return (
    <div>
      {left}
      {children}
    </div>
  );
};

const ChildMemo = React.memo(Child);
const ParentMemo = React.memo(Parent);

const App = () => {
  const [state, setState] = useState(1);
  const onClick = () => {
    setState(state + 1);
  };
  
  const memoValue = useMemo(() => ({ value: "memoized" }), []);

  return (
    <>
      <button onClick={onClick}>click here</button>
      {/*虽然父组件使用 React.memo, 但是如果使用 props children 接收组件时，不起作用，点击时依然会重复渲染*/}
      <ParentMemo
        left={<Child value={{ value: "left child of ParentMemo" }} />}
      >
        <Child value={{ value: "child of ParentMemo" }} />
      </ParentMemo>

      {/* props children 传递组件，需用 React.memo 封装才能避免点击时重复渲染 */}
      <Parent left={<ChildMemo value={memoValue} />}>
        <ChildMemo value={memoValue} />
      </Parent>
    </>
  );
};

```


## 使用 `useCallback` `useMemo`

单纯的缓存 `props` 并不会避免子组件的重复渲染

```typescript 
const Child = ({ value }) => {
  console.log("Child re-renders", value.value);
  return <>{value.value}</>;
};


const App = () => {
  const [state, setState] = useState(1);
  const onClick = () => {
    setState(state + 1);
  };
  
  const memoValue = useMemo(() => ({ value: "child" }), []);
  return (
    <>
      <button onClick={onClick}>click here</button>
      <br />
      <br />
      {/* 单纯的缓存 props，Child 在点击时，依然会重复渲染 */}
      <Child value={memoValue} />
    </>
  );
};

```


### ✅ 必要的 `userMemo` `useCallback`

如果子组件使用了 `React.memo` 封装，那么子组件的所有的 非原始值的 `props` 必须缓存

![](image_H-Zl-OBk-c.png)

如果组件在 `useEffect` `useMemo` `useCallback` 中使用非原始值作为依赖项 `dependency` ，那也应该使用缓存

![](image_vmoCIiAIzE.png)

## 避免 `Context` 提供的数据引起重复渲染

### ✅ 缓存 `Provider` 提供的数据

![](image_g1kLy9FgCX.png)

### ✅ 将读取，写入数据分割成不同的 `Provider`

![](image__NmepE4QPY.png)

### ✅ 将数据分割成小的 `Provider`

![](image_TOjZ0Ib6vP.png)

[通过 Children 或 Props 传递元素](<通过 Children 或 Props 传递元素.md> "通过 Children 或 Props 传递元素")

[使用 Memoization](<使用 Memoization.md> "使用 Memoization")
