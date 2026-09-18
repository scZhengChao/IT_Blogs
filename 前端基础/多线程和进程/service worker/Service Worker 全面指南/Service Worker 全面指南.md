# Service Worker 全面指南

## 目录

- [一、Service Worker 核心 API 详解](#一Service-Worker-核心-API-详解)
  - [1. 注册与安装](#1-注册与安装)
    - [注册 Service Worker](#注册-Service-Worker)
    - [安装阶段 (Install)](#安装阶段-Install)
  - [2. 激活阶段 (Activate)](#2-激活阶段-Activate)
  - [3. 请求拦截 (Fetch)](#3-请求拦截-Fetch)
  - [4. 后台同步 (Background Sync)](#4-后台同步-Background-Sync)
  - [5. 推送通知 (Push)](#5-推送通知-Push)
- [三、第三方框架与工具](#三第三方框架与工具)
  - [1. Workbox (Google 官方库)](#1-Workbox-Google-官方库)
  - [2. Workbox + Webpack](#2-Workbox--Webpack)
  - [3. PWA 工具库](#3-PWA-工具库)
    - [next-pwa(Next.js)](#next-pwaNextjs)
    - [vite-plugin-pwa(Vite)](#vite-plugin-pwaVite)
- [四、高级场景与问题解决](#四高级场景与问题解决)
  - [1. 版本控制与更新](#1-版本控制与更新)
  - [2. 离线分析 (Workbox)](#2-离线分析-Workbox)
  - [3. 跨域资源缓存](#3-跨域资源缓存)
  - [4. 开发环境调试](#4-开发环境调试)
- [五、最佳实践总结](#五最佳实践总结)

下面我将从基础 API 到框架集成，全面介绍 Service Worker 的使用方法。

## 一、Service Worker 核心 API 详解

### 1. 注册与安装

#### 注册 Service Worker

```javascript 
// 在主线程（通常是前端入口文件）中注册
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/', // 控制范围，默认为 sw.js 所在目录
        updateViaCache: 'none' // 控制更新行为
      });
      
      console.log('ServiceWorker 注册成功:', registration);
      
      // 检查更新
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        console.log('发现新版本:', newWorker.state);
      });
    } catch (error) {
      console.error('ServiceWorker 注册失败:', error);
    }
  });
}
```


#### 安装阶段 (Install)

```javascript 
// sw.js
const CACHE_NAME = 'v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/styles/main.css',
  '/scripts/main.js',
  '/images/logo.png'
];

self.addEventListener('install', (event) => {
  // 确保安装完成前完成缓存
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('缓存资源:', ASSETS_TO_CACHE);
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => {
        // 跳过等待阶段，直接激活新 Service Worker
        return self.skipWaiting();
      })
  );
});
```


### 2. 激活阶段 (Activate)

```javascript 
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // 删除旧缓存
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('删除旧缓存:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => {
      // 立即接管所有客户端
      return self.clients.claim();
    })
  );
});
```


### 3. 请求拦截 (Fetch)

```javascript 
self.addEventListener('fetch', (event) => {
  // 开发环境不缓存
  if (event.request.url.includes('browser-sync')) {
    return fetch(event.request);
  }

  // 处理 API 请求
  if (event.request.url.includes('/api/')) {
    return networkFirstThenCache(event.request);
  }

  // 静态资源使用缓存优先策略
  return cacheFirstWithUpdate(event.request);
});

// 网络优先策略
async function networkFirstThenCache(request) {
  try {
    const networkResponse = await fetch(request);
    // 克隆响应以缓存
    const clonedResponse = networkResponse.clone();
    const cache = await caches.open('api-cache');
    cache.put(request, clonedResponse);
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || Response.json({ error: 'Offline' }, { status: 503 });
  }
}

// 缓存优先策略
async function cacheFirstWithUpdate(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    // 后台更新缓存
    fetch(request).then(async (networkResponse) => {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    });
    return cachedResponse;
  }
  return fetch(request);
}
```


### 4. 后台同步 (Background Sync)

```javascript 
// 主线程中注册同步
async function registerSync() {
  if ('SyncManager' in window) {
    const registration = await navigator.serviceWorker.ready;
    try {
      await registration.sync.register('sync-forms');
      console.log('后台同步已注册');
    } catch (error) {
      console.error('后台同步注册失败:', error);
    }
  }
}

// Service Worker 中处理同步
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-forms') {
    event.waitUntil(
      sendFormDataFromIndexedDB()
    );
  }
});

async function sendFormDataFromIndexedDB() {
  // 从 IndexedDB 获取数据并发送
  const forms = await getFormsFromIDB();
  await Promise.all(forms.map(form => {
    return fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' }
    }).then(() => deleteFormFromIDB(form.id));
  }));
}
```


### 5. 推送通知 (Push)

```javascript 
// 主线程中订阅推送
async function subscribePush() {
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: 'YOUR_VAPID_PUBLIC_KEY'
  });
  
  // 将 subscription 发送到服务器
  await saveSubscriptionOnServer(subscription);
}

// Service Worker 中处理推送
self.addEventListener('push', (event) => {
  const data = event.data?.json();
  const title = data?.title || '新通知';
  
  event.waitUntil(
    self.registration.showNotification(title, {
      body: data?.body || '您有新消息',
      icon: '/icons/notification.png',
      badge: '/icons/badge.png',
      data: { url: data?.url },
      vibrate: [200, 100, 200]
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});
```


## 三、第三方框架与工具

### 1. Workbox (Google 官方库)

```javascript 
// sw.js
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

// 预缓存
precacheAndRoute(self.__WB_MANIFEST);

// 图片缓存
registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif)$/,
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30天
      }),
    ],
  })
);

// API 请求
registerRoute(
  /\/api\/.+/,
  new NetworkFirst({
    cacheName: 'api-cache',
    networkTimeoutSeconds: 3,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 5 * 60, // 5分钟
      })
    ]
  })
);
```


### 2. Workbox + Webpack

```javascript 
// webpack.config.js
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
  plugins: [
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 30 * 24 * 60 * 60,
            },
          },
        }
      ]
    })
  ]
};
```


### 3. PWA 工具库

#### `next-pwa`(Next.js)

```javascript 
// next.config.js
const withPWA = require('next-pwa');

module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    skipWaiting: true,
  }
});
```


#### `vite-plugin-pwa`(Vite)

```javascript 
// vite.config.js
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico'],
      manifest: {
        name: 'My App',
        short_name: 'App',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          }
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.example\.com\/.+/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24, // 24小时
              },
            },
          }
        ],
      },
    })
  ]
});
```


## 四、高级场景与问题解决

### 1. 版本控制与更新

```javascript 
// 主线程中监听更新
navigator.serviceWorker.addEventListener('controllerchange', () => {
  window.location.reload();
});

// Service Worker 中处理更新
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
```


### 2. 离线分析 (Workbox)

```javascript 
import { setCacheNameDetails } from 'workbox-core';

setCacheNameDetails({
  prefix: 'my-app',
  suffix: 'v1',
  precache: 'precache',
  runtime: 'runtime',
  googleAnalytics: 'ga',
});

// 记录离线分析
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          // 记录离线访问
          sendAnalytics('offline-page-view');
          return caches.match('/offline.html');
        })
    );
  }
});
```


### 3. 跨域资源缓存

```javascript 
registerRoute(
  /^https:\/\/cdn\.example\.com\/.+/,
  new StaleWhileRevalidate({
    cacheName: 'external-cdn',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7天
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200], // 包括 opaque 响应
      })
    ]
  })
);
```


### 4. 开发环境调试

```javascript 
// 检查 Service Worker 状态
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(registration => {
      console.log('Scope:', registration.scope);
      console.log('State:', registration.installing?.state 
        || registration.waiting?.state 
        || registration.active?.state);
    });
  });
}

// 强制更新
navigator.serviceWorker.getRegistration().then(registration => {
  if (registration) {
    registration.update();
  }
});
```


## 五、最佳实践总结

1. **缓存策略选择**：
   - 静态资源：CacheFirst + 长期缓存
   - API 数据：NetworkFirst + 短期缓存
   - 大文件：StaleWhileRevalidate
2. **更新机制**：
   - 使用`skipWaiting`+`clients.claim()`快速激活
   - 提供 UI 提示让用户控制更新时机
3. **性能优化**：
   - 按需缓存，避免缓存过多内容
   - 使用版本控制管理缓存
4. **错误处理**：
   - 提供优雅的离线体验
   - 记录和分析离线行为
5. **测试验证**：
   - Chrome DevTools → Application → Service Workers
   - Lighthouse 审计 PWA 功能
