# 其他类型

## 目录

- [ReactElement](#ReactElement)
- [ReactNode ](#ReactNode-)
- [JSX.Element](#JSXElement)
- [返回类型的不同](#返回类型的不同)

React.ReactElement —— 使用React.createElement创建的，可以简单理解为React中的JSX的元素&#x20;

React.ReactNode —— \<div>xxx\</div> xxx的合法类型&#x20;

React.CSSProperties —— 组件内联的style对象的类型&#x20;

React.RefObject\<SearchInputBar>  —— React.createRef创建的类型，只读不可改

React.MutableRefObject —— useRef创建的类型，可以修改 --->  forwardRef&#x20;

public render(): React.ReactNode {

```typescript 
 export declare interface AppBetterProps {
  children: React.ReactNode // 一般情况下推荐使用，支持所有类型 Great
  functionChildren: (name: string) => React.ReactNode
  style?: React.CSSProperties // 传递style对象
  onChange?: React.FormEventHandler<HTMLInputElement>
}

export declare interface AppProps {
  children1: JSX.Element // 差, 不支持数组
  children2: JSX.Element | JSX.Element[] // 一般, 不支持字符串
  children3: React.ReactChildren // 忽略命名，不是一个合适的类型，工具类类型
  children4: React.ReactChild[] // 很好
  children: React.ReactNode // 最佳，支持所有类型 推荐使用
  functionChildren: (name: string) => React.ReactNode // recommended function as a child render prop type
  style?: React.CSSProperties // 传递style对象
  onChange?: React.FormEventHandler<HTMLInputElement> // 表单事件, 泛型参数是event.target的类型
}

```


# ReactElement

`ReactElement` 是含有 props 和 type 属性的对象：

```react tsx 
type Key = string | number

interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
  type: T;
  props: P;
  key: Key | null;
}
```


# `ReactNode`&#x20;

`ReactNode` 则是多种类型的集合：

```react tsx 
type ReactText = string | number;
type ReactChild = ReactElement | ReactText;

interface ReactNodeArray extends Array<ReactNode> {}
type ReactFragment = {} | ReactNodeArray;

type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
```


类组件的 `render `成员函数会返回 `ReactNode `类型的值，而且 `PropsWithChildren `类型中指定的 `children `类型也是 `ReactNode`。

```react tsx 

const Comp: FunctionComponent = props => <div>{props.children}</div> 
// children?: React.ReactNode

type PropsWithChildren<P> = P & {
  children?: ReactNode;
}

```


虽然 React 的类型定义看起来写得很复杂，但它实际上等价于：

```react tsx 
type ReactNode = {} | null | undefined;
```


由于 `{}` 是所有对象的原型，你可以把几乎任何类型赋值给 ReactNode，但绝大多数情况下应该对它进行更详细的类型声明。

# `JSX.Element`

`JSX.Element` 通过执行 React.createElement 或是转译 JSX 获得。

```react tsx 
const jsx = <div>hello</div>
const ele = React.createElement("div", null, "hello");
<p> // <- ReactElement = JSX.Element
  <Custom> // <- ReactElement = JSX.Element
    {true && "test"} // <- ReactNode
  </Custom>
</p>
```


`JSX `是一个**全局的命名空间**，不同的库对 JSX 都可以有自己不同的实现，而 React 的实现方式就是让 **JSX.Element 等价于 ReactElement**，同时将它的泛型 props 和 type 都设为 any：

```react tsx 
declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> { }
  }
}
```


# 返回类型的不同

有的同学可能会注意到：类组件渲染方法的返回值类型和函数组件的是不一样的，这是因为目前版本的 TypeScript 类型定义并不能准确地限定 React 实际值的范围：

- **类组件类型定义**：通过 render() 返回 `ReactNode`，比 `React `的实际值范围更宽松
- **函数组件类型定义**：返回 `JSX.Element`，也比 `React `的实际值范围更宽松

实际上 `React` 类组件中的 `render`() 和函数组件的返回类型是一样的，而 TypeScript 只是出于历史原因和向后兼容需要，为不同种类的组件声明了不同的返回值类型。

根据 [文档的规定](https://link.zhihu.com/?target=https://reactjs.org/docs/react-component.html#render "文档的规定") 我们可以为组件返回值给出准确的类型定义：

```react tsx 
type ComponentReturnType = ReactElement | Array<ComponentReturnType> | string | number | boolean | null
// 注意: 不能传入 undefined
```
