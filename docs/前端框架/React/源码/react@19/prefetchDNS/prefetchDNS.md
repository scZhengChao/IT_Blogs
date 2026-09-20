# prefetchDNS

## 目录

- [参考 ](#参考-)
  - [prefetchDNS(href) ](#prefetchDNShref-)
    - [参数 ](#参数-)
    - [返回值 ](#返回值-)
    - [注意 ](#注意-)
- [用法 ](#用法-)
  - [渲染时预获取 DNS ](#渲染时预获取-DNS-)
  - [在事件处理程序中预获取 DNS ](#在事件处理程序中预获取-DNS-)

`prefetchDNS` 允许提前查找期望从中加载资源的服务器的 IP。

```javascript 
prefetchDNS("https://example.com");
```


- [参考](https://zh-hans.react.dev/reference/react-dom/prefetchDNS#reference "参考")
  - [prefetchDNS(href)](https://zh-hans.react.dev/reference/react-dom/prefetchDNS#prefetchdns "prefetchDNS(href)")
- [用法](https://zh-hans.react.dev/reference/react-dom/prefetchDNS#usage "用法")
  - [渲染时预获取 DNS](https://zh-hans.react.dev/reference/react-dom/prefetchDNS#prefetching-dns-when-rendering "渲染时预获取 DNS")
  - [在事件处理程序中预获取 DNS](https://zh-hans.react.dev/reference/react-dom/prefetchDNS#prefetching-dns-in-an-event-handler "在事件处理程序中预获取 DNS")

***

## 参考&#x20;

### `prefetchDNS(href)`&#x20;

调用 `react-dom` 中的 `prefetchDNS` 函数以查找主机。

```typescript 
import { prefetchDNS } from 'react-dom';

function AppRoot() {
  prefetchDNS("https://example.com");
  // ……
}

```


[参见下方更多示例。](https://zh-hans.react.dev/reference/react-dom/prefetchDNS#usage "参见下方更多示例。")

`prefetchDNS` 函数向浏览器提供一个提示，**告诉它应该查找给定服务器的 IP 地址。如果浏览器选择这样做，则可以加快从该服务器加载资源的速度。**

#### 参数&#x20;

- `href`：字符串，表示希望连接到的服务器 URL。

#### 返回值&#x20;

`prefetchDNS` 不返回任何值。

#### 注意&#x20;

- 对同一服务器进行多次调用 `prefetchDNS` 具有与单次调用相同的效果。
- 在浏览器中，可以在任何情况下调用 `prefetchDNS`：例如渲染组件时、Effect 中以及事件处理程序中等等。
- 在服务器端渲染或渲染服务器组件时，只有在渲染组件或在从渲染组件中发起的异步上下文中调用 `prefetchDNS` 时才会生效。任何其他调用都将被忽略。
- 如果知道即将需要的具体资源，可以调用 [其他函数](https://zh-hans.react.dev/reference/react-dom#resource-preloading-apis "其他函数")，这些函数将立即开始加载资源。
- 对于托管网页本身的相同服务器，预获取其 IP 地址没有好处，因为在给出提示时它已经被查找过了。
- 与 [preconnect](https://zh-hans.react.dev/reference/react-dom/preconnect "preconnect") 相比，如果正在尝试与大量域名进行推测性连接，`prefetchDNS` 可能更有效，因为预连接的开销可能会超过其带来的好处。

***

## 用法&#x20;

### 渲染时预获取 DNS&#x20;

如果知道组件的子元素**将从该主机加载外部资源**，请在渲染组件时调用 `prefetchDNS`。

```typescript 
import { prefetchDNS } from 'react-dom';

function AppRoot() {
  prefetchDNS("https://example.com");
  return ...;
}

```


### 在事件处理程序中预获取 DNS&#x20;

在转换到需要外部资源的页面或状态之前，于事件处理程序中调用 `prefetchDNS`。这会比**在渲染新页面或状态时调用它更早地启动该过程。**

```typescript 
import { prefetchDNS } from 'react-dom';

function CallToAction() {
  const onClick = () => {
    prefetchDNS('http://example.com');
    startWizard();
  }
  return (
    <button onClick={onClick}>Start Wizard</button>
  );
}

```
