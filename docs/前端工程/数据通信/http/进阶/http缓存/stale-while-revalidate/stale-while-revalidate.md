# stale-while-revalidate

## 目录

- [📘 一、stale-while-revalidate的定义](#-一stale-while-revalidate的定义)
- [二、语法](#二语法)
- [🔄 三、工作流程](#-三工作流程)
- [📊 四、与其他缓存策略的对比](#-四与其他缓存策略的对比)
- [🌐 五、实际应用场景](#-五实际应用场景)
- [🛠️ 六、如何使用stale-while-revalidate](#️-六如何使用stale-while-revalidate)
  - [1️⃣ 在服务器响应头中设置](#1️⃣-在服务器响应头中设置)
  - [2️⃣ 在 Service Worker 中模拟stale-while-revalidate](#2️⃣-在-Service-Worker-中模拟stale-while-revalidate)

`stale-while-revalidate`是 HTTP 缓存控制策略中的一种指令，属于`Cache-Control`响应头的一部分。它的主要目的是在**提升性能的同时保证数据的相对新鲜性**，是一种兼顾“速度”和“准确性”的缓存策略。

***

## 📘 一、`stale-while-revalidate`的定义

`stale-while-revalidate`是`Cache-Control`中的一个扩展指令，用于指定浏览器或其他缓存系统在缓存过期（stale）的情况下，仍然可以使用过期的缓存内容返回给用户，**同时**在后台异步地重新验证（revalidate）缓存内容是否仍然是最新的。

> ✅ **核心思想**：先**快速返回可能过期的缓存数据，提高用户体验；再在后台更新缓存，确保下次请求时数据是新鲜的。**

## 二、语法

```javascript 
Cache-Control: max-age=60, stale-while-revalidate=30
```


- `max-age=60`：表示资源在缓存中的最大有效时间为 60 秒。在这 60 秒内，浏览器可以直接使用缓存，无需向服务器发起请求。
- `stale-while-revalidate=30`：表示当缓存过期后（超过`max-age`的时间），浏览器可以继续使用过期的缓存数据返回给用户，但同时需要在后台异步地重新向服务器发起请求，验证缓存是否仍然是最新的。这个后台验证的时间窗口为 30 秒。

> ⚠️ 注意：`stale-while-revalidate`的值是一个时间长度（单位是秒），它定义了“允许使用过期缓存的时间窗口”。

***

## 🔄 三、工作流程

以下是`stale-while-revalidate`的典型工作流程：

1. **首次请求**
   - 浏览器向服务器发起请求；
   - 服务器返回资源，并在响应头中设置`Cache-Control: max-age=60, stale-while-revalidate=30`；
   - 浏览器将资源缓存到本地，并记录缓存的过期时间（`max-age`）。
2. **缓存有效期内（0–60 秒）**
   - 浏览器直接从本地缓存中读取资源，**无需向服务器发起任何请求**，速度最快。
3. **缓存过期后（60 秒之后）**
   - 如果用户在接下来的`stale-while-revalidate`时间窗口内（即 30 秒内）再次请求该资源：
     - 浏览器会**立即返回过期的缓存数据**给用户，保证响应速度；
     - 同时，浏览器会在**后台异步地**向服务器发起请求，验证缓存是否仍然是最新的。
   - 如果服务器返回的资源没有变化（`304 Not Modified`），浏览器会更新本地缓存；
   - 如果服务器返回了新的资源（`200 OK`），浏览器会用新资源替换旧缓存。
4. **超过**\*\*`stale-while-revalidate`\*\***时间窗口（30 秒之后）**
   - 如果用户再次请求该资源，而此时缓存已经过期且后台验证仍未完成：
     - 浏览器会**直接向服务器发起新的请求**，获取最新的资源；
     - 用户需要等待新的请求完成，响应速度可能会变慢。

## 📊 四、与其他缓存策略的对比

| 缓存策略                       | 行为                         | 优点           | 缺点               |
| -------------------------- | -------------------------- | ------------ | ---------------- |
| \`max-age\`                | 在缓存有效期内直接使用缓存，过期后必须重新请求    | 简单易用         | 缓存过期后会有明显的延迟     |
| \`no-cache\`               | 每次请求都向服务器验证缓存是否有效（即使缓存未过期） | 数据始终最新       | 增加了服务器的负担，响应速度较慢 |
| \`no-store\`               | 完全不使用缓存，每次请求都从服务器获取最新数据    | 数据绝对新鲜       | 响应速度最慢，网络开销最大    |
| \`stale-while-revalidate\` | 缓存过期后，仍可使用过期缓存，同时后台异步更新    | 平衡了速度和数据的新鲜性 | 实现稍复杂，需要浏览器支持    |

> ✅`stale-while-revalidate`是一种折中方案，适合对实时性要求不是特别高，但希望尽量减少用户等待时间的场景。

***

## 🌐 五、实际应用场景

`stale-while-revalidate`非常适合以下场景：

1. **静态资源（如 CSS、JS、图片）**
   - 这些**资源的变化频率较低，但用户访问非常频繁；**
   - 使用`stale-while-revalidate`可以让用户快速加载页面，同时在后台更新缓存，确保下次访问时资源是最新的。
2. **新闻、博客文章等内容页**
   - **内容可能会更新，但不需要每次都强制用户获取最新版本；**
   - 用户在短时间内多次访问同一篇文章时，可以先返回旧版本，同时在后台更新缓存。
3. **API 响应（结合 Service Worker）**
   - **在 PWA（渐进式 Web 应用）中，可以通过 Service W**orker 实现类似`stale-while-revalidate`的策略；
   - **先返回缓存的 API 数据，再在后台更新缓存，提高应用的响应速度。**

***

## 🛠️ 六、如何使用`stale-while-revalidate`

### 1️⃣ 在服务器响应头中设置

你可以在服务器的 HTTP 响应头中添加`Cache-Control`，指定`stale-while-revalidate`的值。例如：

```javascript 
Cache-Control: max-age=60, stale-while-revalidate=30
```


这表示：

- 资源在缓存中的有效期为 60 秒；
- 缓存过期后，浏览器可以在接下来的 30 秒内继续使用过期缓存，同时后台异步更新缓存。

> 注意：`stale-while-revalidate`是 **HTTP/1.1 的扩展指令，并不是所有服务器或代理都默认支持。** 确保你的服务器和 CDN 支持该指令。

### 2️⃣ 在 Service Worker 中模拟`stale-while-revalidate`

在浏览器环境中，如果你无法直接控制服务器的响应头（比如使用第三方 API），**可以通过 Service Worker 拦截请求并手动实现**`stale-while-revalidate`的逻辑。

```javascript 
self.addEventListener('fetch', event => {
  event.respondWith(
    // 1. 先尝试从缓存中获取资源
    caches.match(event.request).then(cachedResponse => {
      // 2. 如果缓存中有资源，直接返回缓存的响应
      // 同时在后台发起网络请求更新缓存
      const fetchPromise = fetch(event.request).then(networkResponse => {
        // 3. 将网络请求的响应存入缓存
        caches.open('my-cache').then(cache => {
          cache.put(event.request, networkResponse.clone());
        });
        return networkResponse;
      });

      // 4. 如果缓存中有资源，直接返回缓存的响应
      // 如果缓存中没有资源，等待网络请求完成
      return cachedResponse || fetchPromise;
    })
  );
});
```


> 这是一个简化版的`stale-while-revalidate`实现。更**完整的实现需要处理缓存过期时间、后台更新时间窗口等逻辑**。
