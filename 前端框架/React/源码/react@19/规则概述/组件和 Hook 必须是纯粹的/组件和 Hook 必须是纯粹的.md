# 组件和 Hook 必须是纯粹的

## 目录

- [组件和 Hook 必须是幂等的 ](#组件和-Hook-必须是幂等的-)
- [副作用必须在渲染之外执行](#副作用必须在渲染之外执行)
  - [局部 mutation ](#局部-mutation-)
  - [延迟初始化 ](#延迟初始化-)
  - [改变 DOM ](#改变-DOM-)
- [Hook 的返回值和参数是不可变的 ](#Hook-的返回值和参数是不可变的-)
- [不要改变传递给 JSX 后的值 ](#不要改变传递给-JSX-后的值-)

## 组件和 Hook 必须是幂等的&#x20;

**组件必须始终根据其输入（props、state、和 context）返回相同的输出。这被称为“幂等性”。**[**幂等性**](https://en.wikipedia.org/wiki/Idempotence "幂等性")\*\*  是函数式编程中经常使用的一个术语，它指的是只要你使用相同的输入运行代码， **[**得到的结果总是一样的**](https://zh-hans.react.dev/learn/keeping-components-pure "得到的结果总是一样的")**。\*\*

这意味着，为了遵循这一规则，所有 [在渲染期间](https://zh-hans.react.dev/reference/rules/components-and-hooks-must-be-pure#how-does-react-run-your-code "在渲染期间") 执行的代码也必须是幂等的。例如，以下这行代码就不是幂等的（因此，包含这行代码的组件也不是幂等的）：

```typescript 
function Clock() {
  const time = new Date(); // 🔴 错误的：总是返回不同的结果！
  return <span>{time.toLocaleString()}</span>
}

```


## 副作用必须在渲染之外执行

[副作用](https://zh-hans.react.dev/learn/keeping-components-pure#side-effects-unintended-consequences "副作用") 不应该 [在渲染中](https://zh-hans.react.dev/reference/rules/components-and-hooks-must-be-pure#how-does-react-run-your-code "在渲染中") 执行，因为 React 可能会多次渲染组件以提供最佳的用户体验。

#### 局部 mutation&#x20;

一个常见的具有副作用的例子是突变（mutation），在 JavaScript 中指的是改变一个非 [原始值](https://developer.mozilla.org/en-US/docs/Glossary/Primitive "原始值") 的值。通常来说，在 React 中 mutation 操作并不符合最佳实践，但是进行局部 mutation 是完全可以接受的：

```react jsx 
function FriendList({ friends }) {
  const items = []; // ✅ 正确的：在局部创建
  for (let i = 0; i < friends.length; i++) {
    const friend = friends[i];
    items.push(
      <Friend key={friend.id} friend={friend} />
    ); // ✅ 正确的：局部修改是可以的。
  }
  return <section>{items}</section>;
}

```


你没有必要为了回避局部 mutation 而刻意编写复杂的代码。虽然为了简洁，这里可以使用 [Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map "Array.map")，但创建一个局部数组，然后 [在渲染时](https://zh-hans.react.dev/reference/rules/components-and-hooks-must-be-pure#how-does-react-run-your-code "在渲染时") 向其中添加数组项也是完全可以的。

尽管看起来我们正在修改 `items`，但关键的一点是这种 mutation 是局部的，当组件再次渲染时，**这种 mutation 不会被“记住”。** 换句话说，`items` 只在组件存在期间有效。因为每次渲染 `<FriendList />` 时，`items` 都会被重新创建，所以组件总能返回相同的结果。

#### 延迟初始化&#x20;

即使不是完全“纯粹”的，延迟初始化也是完全可以接受的：

```typescript 
function ExpenseForm() {
  SuperCalculator.initializeIfNotReady(); // ✅ 正确的：如果它对其他组件没有影响。
  // Continue rendering...
}

```


#### 改变 DOM&#x20;

在 React 组件的渲染逻辑中不允许有直接对用户可见的副作用。换句话说，仅仅调用一个组件函数本身不应当在屏幕上产生变化。

```typescript 
function ProductDetailPage({ product }) {
  document.title = product.title; // 🔴 错误的：改变 DOM
}

```


在渲染之外更新 `document.title` 的一个方法是 [将组件与 ](https://zh-hans.react.dev/learn/synchronizing-with-effects "将组件与 ")[document](https://zh-hans.react.dev/learn/synchronizing-with-effects "document")[ 进行同步](https://zh-hans.react.dev/learn/synchronizing-with-effects " 进行同步")。

**只要多次调用组件是安全的，并且不会影响其他组件的渲染，React 就不会在意组件是否在严格的函数式编程意义上是百分之百纯粹的**。更重要的是，[组件必须是幂等的](https://zh-hans.react.dev/reference/rules/components-and-hooks-must-be-pure "组件必须是幂等的")。

## Hook 的返回值和参数是不可变的&#x20;

一旦值被传递给 Hook，就不应该再对它们进行修改。就像在 JSX 中的 props 一样，当值被传递给 Hook 时，它们就应该是不可变的了。

```typescript 
function useIconStyle(icon) {
  const theme = useContext(ThemeContext);
  if (icon.enabled) {
     icon.className = computeStyle(icon, theme); // 🔴 错误的：永远不要直接修改 Hook 的参数。
   }
  return icon;
}
```


```javascript 
function useIconStyle(icon) {
  const theme = useContext(ThemeContext);
  const newIcon = { ...icon }; // ✅ 正确的：创建一个新的副本替代
  if (icon.enabled) {
    newIcon.className = computeStyle(icon, theme);
  }
  return newIcon;
}
```


在 React 中有一个重要的原则叫做局部推理，即通过单独查看组件或 Hook 的代码，就能理解它的作用。当调用 Hook 时，应该把它们当作“黑盒子”。例如，自定义 Hook 可能使用其参数作为依赖项，在内部缓存值：

```typescript 
function useIconStyle(icon) {
  const theme = useContext(ThemeContext);

  return useMemo(() => {
    const newIcon = { ...icon };
    if (icon.enabled) {
      newIcon.className = computeStyle(icon, theme);
    }
    return newIcon;
  }, [icon, theme]);
}

```


如果你改变了 Hook 的参数，那么自定义 Hook 的缓存（memoization）就会变得不正确，因此避免这样做非常重要。

```typescript 
style = useIconStyle(icon);         // `style` 是基于 `icon` 进行记忆化的
icon.enabled = false;               // 错误的： 🔴 永远不要直接修改 Hook 的参数
style = useIconStyle(icon);         // 返回之前记忆化的结果

```


```typescript 
style = useIconStyle(icon);         // `style` 是基于 `icon` 进行记忆化的
icon = { ...icon, enabled: false }; // 正确的: ✅ 创建一个新的副本替代
style = useIconStyle(icon);         // 计算 `style` 的新值

```


同样重要的是**不要修改 Hook 的返回值，因为这些值可能已经被缓存了。**

## 不要改变传递给 JSX 后的值&#x20;

不要在 JSX 使用过值之后改变它们。应该在创建 JSX 之前完成值的更改。

当你在表达式中使用 JSX 时，React 可能会在组件完成渲染之前就急于计算 JSX。这意味着，如果在将值传递给 JSX 之后对它们进行更改，可能会导致 UI 过时，因为 React 不会知道需要更新组件的输出。

```javascript 
function Page({ colour }) {
  const styles = { colour, size: "large" };
  const header = <Header styles={styles} />;
  styles.size = "small"; // 🔴 错误的：styles 已经在上面的 JSX 中使用了。
  const footer = <Footer styles={styles} />;
  return (
    <>
      {header}
      <Content />
      {footer}
    </>
  );
}

```
