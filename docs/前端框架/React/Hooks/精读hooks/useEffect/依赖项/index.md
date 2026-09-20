# 依赖项

## 目录

- [在组件主体中声明的所有变量都是响应式的](#在组件主体中声明的所有变量都是响应式的)
- [全局变量或可变值可以作为依赖项吗？](#全局变量或可变值可以作为依赖项吗)
- [ref的返回值可以作为依赖项吗](#ref的返回值可以作为依赖项吗)
  - [注意](#注意)
- [当你不想进行重新同步时该怎么办](#当你不想进行重新同步时该怎么办)
  - [陷阱](#陷阱)
- [当要移除一个依赖时，请证明它不是一个依赖 ](#当要移除一个依赖时请证明它不是一个依赖-)

# **在组件主体中声明的所有变量都是响应式的**

Props 和 state 并不是唯一的响应式值。**从它们计算出的值也是响应式的**。

&#x20;         如果 props 或 state 发生变化，组件将重新渲染，**从中计算出的值**也会随之改变。这就是为什么\*\* Effect 使用的组件主体中的所有变量都应该在依赖列表中。\*\*

&#x20;           **组件内部的所有值（包括 props、state 和组件体内的变量）都是响应式的。任何响应式值都可以在重新渲染时发生变化，所以需要将响应式值包括在 Effect 的依赖项中**。

换句话说，Effect 对组件体内的所有值都会“react”。

# 全局变量或可变值可以作为依赖项吗？

**可变值（包括全局变量）不是响应式的**。

&#x20;    例如，像 [location.pathname](https://developer.mozilla.org/zh-CN/docs/Web/API/Location/pathname "location.pathname") 这样的**可变值不能作为依赖项**。它是可变的，因此可以在 React 渲染数据流之外的任何时间发生变化。**更改它不会触发组件的重新渲染**.

&#x20;        因此，即使在依赖项中指定了它，React 也无法知道在其更改时重新同步 Effect。这也违反了 React 的规则，因为在渲染过程中读取可变数据（即在计算依赖项时）会破坏 [纯粹的渲染](https://zh-hans.react.dev/learn/keeping-components-pure "纯粹的渲染")。相反，**应该使用 **[**useSyncExternalStore**](https://zh-hans.react.dev/learn/you-might-not-need-an-effect#subscribing-to-an-external-store "useSyncExternalStore")** 来读取和订阅外部可变值。**

# ref的返回值可以作为依赖项吗

&#x20;    **另外，****像 **[**ref.current**](https://zh-hans.react.dev/reference/react/useRef#reference "ref.current")** 或从中读取的值也不能作为依赖项。****`useRef`**\*\* 返回的 ref 对象本身可以作为依赖项\*\*，但其 `current` 属性是有意可变的。它允\*\*许 \*\*[**跟踪某些值而不触发重新渲染**](https://zh-hans.react.dev/learn/referencing-values-with-refs "跟踪某些值而不触发重新渲染")。但由于更改它不会触发重新渲染，它不是响应式值，React 不会知道在其更改时重新运行 Effect。

## 注意

在某些情况下，React **知道** 一个值永远不会改变，即使它在组件内部声明。例如，从 `useState` 返回的 `set` 函数和从 `useRef` 返回的 ref 对象是 **稳定的** ——**它们保证在重新渲染时不会改变。稳定值不是响应式的**，因此可以从列表中省略它们。包括它们是允许的：它们不会改变，所以无关紧要。

# 当你不想进行重新同步时该怎么办

在上一个示例中，通过将 `roomId` 和 `serverUrl` 列为依赖项来修复了 lint 错误。

然而，**可以通过向检查工具“证明”这些值不是响应式值，** 即它们**不会** 因为重新渲染而改变。例如，如果 `serverUrl` 和 `roomId` 不依赖于渲染并且始终具有相同的值，可以将它们移到组件外部。现在它们不需要成为依赖项：

```javascript 
const serverUrl = 'https://localhost:1234'; // serverUrl 不是响应式的
const roomId = 'general'; // roomId 不是响应式的

function ChatRoom() {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, []); // ✅ 声明的所有依赖
  // ...
}
```


或者

也可以将它们 **移动到 Effect 内部**。它们不是在渲染过程中计算的，因此它们不是响应式的：

```javascript 
function ChatRoom() {
  useEffect(() => {
    const serverUrl = 'https://localhost:1234'; // serverUrl 不是响应式的
    const roomId = 'general'; // roomId 不是响应式的
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, []); // ✅ 声明的所有依赖
  // ...
}
```


**Effect 是一段响应式的代码块**。它们在**读取的值发生变化时重新进行同步**。与事件处理程序不同，事件处理程序只在每次交互时运行一次，而 Effect 则在需要进行同步时运行。

**不能“选择”依赖项**。依赖\*\*项必须包括 Effect 中读取的每个 \*\*[**响应式值**](https://zh-hans.react.dev/learn/lifecycle-of-reactive-effects#all-variables-declared-in-the-component-body-are-reactive "响应式值")。代码检查工具会强制执行此规则。有时，这可能会导致出现无限循环的问题，或者 Effect 过于频繁地重新进行同步。**不要通过禁用代码检查来解决这些问题！** 下面是一些解决方案：

- **检查 Effect 是否表示了独立的同步过程**。如果 Effect 没有进行任何同步操作，[可能是不必要的](https://zh-hans.react.dev/learn/you-might-not-need-an-effect "可能是不必要的")。如果它同时进行了几个独立的同步操作，[**将其拆分为多个 Effect**](https://zh-hans.react.dev/learn/lifecycle-of-reactive-effects#each-effect-represents-a-separate-synchronization-process "将其拆分为多个 Effect")**。**
- **如果想读取 props 或 state 的最新值，但又不想对其做出反应并重新同步 Effect**，可以将\*\* Effect 拆分为具有反应性的部分（保留在 Effect 中）和非反应性的部分（提取为名为 “Effect Event” 的内容）\*\*。[阅读关于将事件与 Effect 分离的内容](https://zh-hans.react.dev/learn/separating-events-from-effects "阅读关于将事件与 Effect 分离的内容")。
- **避免将****对象和函数****作为依赖项**。如果在渲染过程中创建对象和函数，然后在 Effect 中读取它们，它们将在每次渲染时都不同。这将导致 Effect 每次都重新同步。[阅读有关从 Effect 中删除不必要依赖项的更多内容](https://zh-hans.react.dev/learn/removing-effect-dependencies "阅读有关从 Effect 中删除不必要依赖项的更多内容")。

### 陷阱

检查工具是你的朋友，但它们的能力是有限的。检查工具只知道依赖关系是否 **错误**。它并不知道每种情况下的 **最佳** 解决方法。如果静态代码分析工具建议添加某个依赖关系，但添加该依赖关系会导致循环，这并不意味着应该忽略静态代码分析工具。需要修改 Effect 内部（或外部）的代码，使得该值不是响应式的，也不 **需要** 成为依赖项。

如果有一个现有的代码库，可能会有一些像这样禁用了检查工具的 Effect：

```javascript 
useEffect(() => {
  // ...
   // 🔴 避免这样禁用静态代码分析工具：
  // eslint-ignore-next-line react-hooks/exhaustive-deps 
}, []);
```


# 当要移除一个依赖时，请证明它不是一个依赖&#x20;

注意，你不能“**选择**” Effect 的依赖。**每个被 Effect 所使用的响应式值，必须在依赖中声明**。依赖是由 Effect 的代码决定的：

**在组件主体中申明的所有变量都是响应式的；**

[响应式值](https://zh-hans.react.dev/learn/lifecycle-of-reactive-effects#all-variables-declared-in-the-component-body-are-reactive "响应式值") 包括 props 以及所有你直接在组件中**声明的变量和函数**

```javascript 
const serverUrl = 'https://localhost:1234';

function ChatRoom({  roomId  }) { // 这是一个响应式值
  useEffect(() => {
    const connection = createConnection(serverUrl,  roomId ); // Effect 在这里读取响应式值
    connection.connect();
    return () => connection.disconnect();
  }, [ roomId ]); // ✅ 所以你必须在依赖中声明 Effect 使用的响应式值
  // ...
}
```


最后一部分很重要。**如果你想改变依赖，首先要改变所涉及到的代码**。你可以把依赖看作是 [Effect的代码所依赖的所有响应式值的列表](https://zh-hans.react.dev/learn/lifecycle-of-reactive-effects#react-verifies-that-you-specified-every-reactive-value-as-a-dependency "Effect的代码所依赖的所有响应式值的列表")。你不要 **选择** 把什么放在这个列表上。该列表 **描述了** 代码。**要改变依赖，请改变代码**。
