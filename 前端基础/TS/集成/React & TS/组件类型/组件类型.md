# 组件类型

## 目录

- [HTML](#HTML)
- [ref](#ref)
- [声明函数式组件](#声明函数式组件)
  - [第一种](#第一种)
  - [第二种：](#第二种)
  - [第三种：直接声明:](#第三种直接声明)

# HTML

```typescript 
React.HTMLArrtibutes<any>，也就是任意 html 标签的属性
React.FormHTMLAttributes<HTMLFormElement>：

```


# ref

React.ForwardRefRenderFunction\<HTMLInputElement>&#x20;

```typescript 
import './App.css';
import { useRef } from 'react';
import { useEffect } from 'react';
import React from 'react';

const Guang: React.ForwardRefRenderFunction<HTMLInputElement> = (props, ref) => {
  return <div>
    <input ref={ref}></input>
  </div>
}



interface RefProps {
  aaa: () => void;
}

const Guang: React.ForwardRefRenderFunction<RefProps> = (props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => {
    return {
      aaa() {
        inputRef.current?.focus();
      }
    }
  });

  return <div>
    <input ref={inputRef}></input>
  </div>
}

const WrapedGuang = React.forwardRef(Guang);

```


- 第一个类型参数是 ref 的 content 的类型。
- 第二个参数是 props 的 类型

# 声明函数式组件

[https://blog.csdn.net/sinat\_17775997/article/details/106465327](https://blog.csdn.net/sinat_17775997/article/details/106465327 "https://blog.csdn.net/sinat_17775997/article/details/106465327")

## 第一种

```typescript 
 // Great
type AppProps = {
  message: string
}
const App: React.FC<AppProps> = ({ message, children }) => (
  <div>
    {message}
    {children}
  </div>
)
```


比如以下用法 React.FC 会报类型错误:&#x20;

```javascript 
const App: React.FC = props => props.children
const App: React.FC = () => [1, 2, 3]
const App: React.FC = () => 'hello'

//解决方法:
const App: React.FC<{}> = props => props.children as any
const App: React.FC<{}> = () => [1, 2, 3] as any
const App: React.FC<{}> = () => 'hello' as any

// 或者
const App: React.FC<{}> = props => (props.children as unknown) as JSX.Element
const App: React.FC<{}> = () => ([1, 2, 3] as unknown) as JSX.Element
const App: React.FC<{}> = () => ('hello' as unknown) as JSX.Element
```


## 第二种：

使用 **PropsWithChildren**，这种方式可以为你**省去频繁定义 children 的类型**，自动设置 children 类型为 ReactNode:&#x20;

```typescript 
import React, { PropsWithChildren } from 'react';
interface WhenRenderProps {
  when: boolean;
  placeHolderView?: React.ReactNode;
}
const WhenRender = (props: PropsWithChildren<WhenRenderProps>) => {
  const { when = false, children, placeHolderView = null } = props;
  if (when) {
    return <>{children}</>;
  } else {
    return <>{placeHolderView}</>;
  }
};
export default WhenRender;

```


## 第三种：直接声明:

```javascript 
type AppProps = {
  message: string
  children?: React.ReactNode
}

const App = ({ message, children }: AppProps) => (
  <div>
    {message}
    {children}
  </div>
)


```
