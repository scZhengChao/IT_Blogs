# PWA

## 目录

- [什么是 PWA？
  ](#什么是-PWA)
- [PWA 的优点
  ](#PWA-的优点)
- [如何实现离线访问？
  ](#如何实现离线访问)
- [安装 offline-plugin 插件
  ](#安装-offline-plugin-插件)
- [配置 offline-plugin 插件
  ](#配置-offline-plugin-插件)
- [编写 Service Worker 文件](#编写-Service-Worker-文件)
- [总结](#总结)

什么是 PWA？

PWA（Progressive Web Apps）是一种新型的 Web 应用程序开发模式，它结合了 Web 应用程序和原生应用程序的优点，能够在不依赖于平台、安装应用程序的情况下，提供类似于原生应用程序的用户体验。

PWA 的优点

- 可靠性：PWA 可以在离线状态下访问，因此用户可以在网络不稳定或者没有网络的情况下使用应用程序。
- 响应速度快：PWA 应用程序加载速度快，响应速度快，用户体验好。
- 可以安装：PWA 应用程序可以像原生应用程序一样安装，可以在桌面上创建快捷方式，可以在手机上接收推送通知等。
- 安全性高：PWA 应用程序可以使用 HTTPS 协议，保证数据传输的安全性。

如何实现离线访问？

使用 offline-plugin 插件可以实现离线访问。offline-plugin 插件可以将应用程序的资源缓存到本地，当用户离线访问应用程序时，可以从本地缓存中加载资源，提供离线访问的体验。

安装 offline-plugin 插件

可以使用 npm 安装 offline-plugin 插件。

```javascript 
npm install offline-plugin --save-dev

```


配置 offline-plugin 插件

在 webpack 配置文件中添加 offline-plugin 插件的配置。

```javascript 
const OfflinePlugin = require('offline-plugin');

module.exports = {
  // ...
  plugins: [
    // ...
    new OfflinePlugin({
      caches: {
        main: ['index.html', 'bundle.js', 'style.css'],
      },
      ServiceWorker: {
        entry: './src/sw.js',
      },
    }),
  ],
}

```


在上面的配置中：

- caches：指定需要缓存的资源，可以是 HTML、JavaScript、CSS 等资源。
- ServiceWorker：指定 Service Worker 文件的路径。

# 编写 Service Worker 文件

Service Worker 是一个 JavaScript 文件，它可以拦截网络请求，并且可以缓存网络请求的响应结果。在 offline-plugin 插件的配置中，需要指定 Service Worker 文件的路径。

```javascript 
// sw.js

const CACHE_NAME = 'my-pwa-cache-v1';
const cacheUrls = [
  '/',
  '/index.html',
  '/bundle.js',
  '/style.css',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(cacheUrls))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

```


在上面的 Service Worker 文件中：

- CACHE\_NAME：缓存名称。
- cacheUrls：需要缓存的资源。
- install 事件：在安装 Service Worker 时，将需要缓存的资源添加到缓存中。
- activate 事件：在激活 Service Worker 时，删除旧的缓存。
- fetch 事件：在网络请求时，先从缓存中查找响应结果，如果找到了，就返回缓存中的响应结果，否则从网络中获取响应结果。

# 总结

使用 offline-plugin 插件可以实现 PWA 应用程序的离线访问。离线访问可以提高用户体验，降低应用程序依赖网络的风险。在实际开发中，可以根据实际需求，选择合适的缓存策略，提高缓存效率，提高应用程序的性能。

[使用offline-plugin搭配webpack轻松实现PWA](./offline-plugin实践/index.md "使用offline-plugin搭配webpack轻松实现PWA")
