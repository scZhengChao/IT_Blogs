# 优化手段总结

## 目录

- [一、加载策略优化](#一加载策略优化)
  - [1.异步加载：async与defer](#1异步加载async与defer)
  - [2.模块化脚本（ES Modules）](#2模块化脚本ES-Modules)
  - [3.动态导入（Dynamic Import）](#3动态导入Dynamic-Import)
- [二、执行控制优化](#二执行控制优化)
  - [4.延迟非关键脚本](#4延迟非关键脚本)
  - [5.使用IntersectionObserver懒加载](#5使用IntersectionObserver懒加载)
- [三、资源分配优化](#三资源分配优化)
  - [6.HTTP/2 服务器推送（Server Push）](#6HTTP2-服务器推送Server-Push)
  - [7.资源优先级提示（Priority Hints）](#7资源优先级提示Priority-Hints)
  - [8.代码分割（Code Splitting）](#8代码分割Code-Splitting)
- [四、缓存与复用优化](#四缓存与复用优化)
  - [9.强缓存与协商缓存](#9强缓存与协商缓存)
  - [10.Service Worker 缓存](#10Service-Worker-缓存)
- [五、其他高级技巧](#五其他高级技巧)
  - [11.使用rel=modulepreload预加载 ES 模块](#11使用relmodulepreload预加载-ES-模块)
  - [12.内联关键脚本（Critical JS Inlining）](#12内联关键脚本Critical-JS-Inlining)
  - [13.避免同步脚本](#13避免同步脚本)
- [总结：优化决策树](#总结优化决策树)

### **一、加载策略优化**

#### 1.**异步加载：`async`****与****`defer`**

- **`async`**：脚本异步加载，**加载完成后立即执行**（不保证顺序）。

```html 
<script async src="analytics.js"></script>
```


- **`defer`**：脚本异步加载，**延迟到 HTML 解析完成后按顺序执行**。

```html 
<script defer src="app.js"></script>
```


#### 2.**模块化脚本（ES Modules）**

- 使用`type="module"`支持现代浏览器原生模块化，自动获得`defer`行为。

```html 
<script type="module" src="main.js"></script>
```


#### 3.**动态导入（Dynamic Import）**

- 按需加载脚本，减少初始负载：

```javascript 
button.addEventListener('click', async () => {
  const module = await import('./dialog.js');
  module.open();
});
```


### **二、执行控制优化**

#### 4.**延迟非关键脚本**

- 通过`setTimeout`或`requestIdleCallback`延迟执行非必要脚本：

```javascript 
setTimeout(() => {
  const script = document.createElement('script');
  script.src = 'non-critical.js';
  document.body.appendChild(script);
}, 3000);
```


#### 5.**使用**\*\*`IntersectionObserver`\*\***懒加载**

- 当元素进入视口时再加载脚本：

```javascript 
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    loadScript('lazy-component.js');
    observer.disconnect();
  }
});
observer.observe(document.querySelector('#lazy-component'));
```


### **三、资源分配优化**

#### 6.**HTTP/2 服务器推送（Server Push）**

- 服务器主动推送关键脚本，减少 RTT（需后端配合）：

```javascript 
Link: </js/app.js>; rel=preload; as=script
```


#### 7.**资源优先级提示（Priority Hints）**

- 使用`fetchpriority="high"`提升关键脚本加载优先级：

```html 
<script src="critical.js" fetchpriority="high"></script>
```


#### 8.**代码分割（Code Splitting）**

- 通过打包工具（如 Webpack/Rollup）拆分代码为多个 chunk：

```javascript 
// Webpack 动态导入
import(/* webpackChunkName: "chart" */ './chart.js');
```


### **四、缓存与复用优化**

#### 9.**强缓存与协商缓存**

- 设置`Cache-Control`和`ETag`头，减少重复加载：

```javascript 
Cache-Control: public, max-age=31536000
```


#### 10.**Service Worker 缓存**

- 通过 Service Worker 缓存脚本，支持离线访问：

```javascript 
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => cache.addAll(['/app.js']))
  );
});
```


### **五、其他高级技巧**

#### 11.**使用**\*\*`rel=modulepreload`\*\***预加载 ES 模块**

- 比`preload`更适合模块化脚本：

```html 
<link rel="modulepreload" href="main.mjs">
```


#### 12.**内联关键脚本（Critical JS Inlining）**

- 将首屏关键脚本内联到 HTML，减少请求：

```javascript 
<script>
  // 内联的初始化逻辑
</script>
```


#### 13.**避免同步脚本**

- **反例**：同步脚本阻塞渲染：

```html 
<script src="blocking.js"></script> <!-- 避免！ -->
```


### **总结：优化决策树**

1. **关键脚本**：
   - `preload`+`defer`/`module`+ 强缓存。
2. **非关键脚本**：
   - `async`或动态导入 + 懒加载。
3. **未来导航脚本**：
   - `prefetch`+ Service Worker 缓存。
4. **老旧浏览器**：
   - `nomodule`回退 + 代码分割。
