# cdn

## 目录

- [cdn](#cdn)
  - [unpkg](#unpkg)
  - [jsdelivr](#jsdelivr)

### cdn

#### unpkg

可以让 npm 上所有的文件都开启 CDN 服务。

比如 vue package.json 的 unpkg 定义为 dist/vue.global.js

```typescript 
"unpkg": "dist/vue.global.js",
```


当我们想通过 CDN 的方式使用链接引入 vue 时。

访问 [unpkg.com/vue](https://link.juejin.cn?target=https://unpkg.com/vue "unpkg.com/vue") 会重定向到 [unpkg.com/vue@3.2.37/…](https://link.juejin.cn?target=https://unpkg.com/vue@3.2.37/dist/vue.global.js%EF%BC%8C%E5%85%B6%E4%B8%AD "unpkg.com/vue@3.2.37/…") 3.2.27 是 Vue 的最新版本。

#### jsdelivr

与 unpkg 类似，vue 通过如下的配置

```typescript 
"jsdelivr": "dist/vue.global.js",
```


访问 [cdn.jsdelivr.net/npm/vue](https://link.juejin.cn?target=https://cdn.jsdelivr.net/npm/vue "cdn.jsdelivr.net/npm/vue") 实际上获取到的是 jsdelivr 字段里配置的文件地址。

![](http://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b15c912fd4e6402bbe9b29a899ff6dce~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)
