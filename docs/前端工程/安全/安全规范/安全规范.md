# 安全规范

- 不要直接把 html 文本直接渲染在页面上，使用 xss 等过滤之后再输出到标签上；

```typescript 
import { filterXSS } from 'xss';
render() {
  <div
    dangerouslySetInnerHTML={{__html:  filterXSS(htmlContent)}}
  >
  </div>
}
```


- a 标签安全问题 使用 a 标签打开一个新窗口过程中的安全问题。新页面中可以只用 window\.opener 来控制原始页面。如果新页面同域，那么在新页面中可以任意操作原始页面。如果不同域，新页面中依然可以通过 window\.opener.location 访问到原始页面的 location 对象。

&#x20;如何解决： 在带有 target=“\_blank”的 a 标签中，加上 rel=“noopener”属性；

```typescript 
<a href="// ..." target="_blank" rel="noopener" />
```


如果使用 window\.open 的方式打开页面，使用 opener 对象置为 null

```typescript 
const newWindow = window.open(// ...);
newWindow.opener = null;
window.open(url, target, 'noreferrer,noopener');


```


- 大型第三方库函数使用 用 try-catch 包裹，防止第三方库的出现错误，导致整个程序崩溃。比如 echart
