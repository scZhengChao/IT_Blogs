# preconnect 和 dns-prefetch

## 目录

- [核心区别与关键特性对比](#核心区别与关键特性对比)
- [工作原理与触发时机](#工作原理与触发时机)
- [最佳实践与注意事项](#最佳实践与注意事项)
- [常见误区与避坑点](#常见误区与避坑点)
- [总结](#总结)

* `dns-prefetch`仅提前做 DNS 解析并缓存结果，开销低、兼容性好；
* `preconnect` 会完成 DNS 解析 + TCP 握手 + TLS 协商（HTTPS 场景），优化幅度更大但开销更高，需控制使用数量。

两者都是前端性能优化的资源提示，用于减少跨域资源加载时的连接延迟。

### 核心区别与关键特性对比

表格

| 特性   | dns-prefetch                                                     | preconnect                                                                |
| ---- | ---------------------------------------------------------------- | ------------------------------------------------------------------------- |
| 核心操作 | 仅 DNS 解析（域名→IP）                                                  | DNS 解析 + TCP 握手 + TLS 协商（HTTPS）                                           |
| 网络开销 | 极低（仅 DNS 查询）                                                     | 中等（占用连接与内存，默认保持约 10s）                                                     |
| 优化收益 | 节省 20-120ms DNS 耗时                                               | 节省 DNS + TCP + TLS 总耗时（100-500ms）                                         |
| 兼容性  | IE9+ 及所有现代浏览器                                                    | Chrome 46+、Firefox 39+、Edge 12+、Safari 11.1+                              |
| 适用场景 | 非关键跨域域名、批量域名预解析                                                  | 关键跨域域名（如 CDN、支付、核心 API），建议≤6 个                                            |
| 使用示例 | \`\<link rel="dns-prefetch" href="[https://example.com">\`](">`) | \`\<link rel="preconnect" href="<https://cdn.example.com>" crossorigin>\` |

***

### 工作原理与触发时机

- **dns-prefetch**：页面解析到标签时立即触发 DNS 解析，不阻塞 HTML 解析，结果缓存至本地，后续请求直接复用 IP，避免重复解析。
- **preconnect**：提前完成完整连接流程（DNS→TCP→TLS），后**续请求可直接发送数据，跳过连接建立阶段，显著降低首字节时间（TTFB）。**

***

### 最佳实践与注意事项

1. **优先级区分**：**对核心域名（如静态资源 CDN、首屏 API）用 preconnect；对次要域名（如统计、广告）用 dns-prefetch，避免资源浪费。**
2. **组合使用**：**同时声明两者可兼容低版本浏览器（不支持 preconnect 的浏览器会降级到 dns-prefetch）**。示例：

```html 
<link rel="dns-prefetch" href="https://cdn.example.com">
<link rel="preconnect" href="https://cdn.example.com" crossorigin>
```


- \*\* crossorigin 配置 \*\*：跨域资源（如字体、第三方脚本）需添加 crossorigin 属性，否则可能导致连接失效或重复建立。
- **数量控制**：preconnect 数量过多会占用本地端口与带宽，反而影响性能，**建议不超过 6 个关键域名。**
- **HTTP 头配置**：可通过 Link 响应头实现，与 HTML 标签等效，适合服务器端统一配置。示例：

```html 
Link: <https://cdn.example.com>; rel=dns-prefetch, <https://cdn.example.com>; rel=preconnect; crossorigin
```


### 常见误区与避坑点

- **同域资源无需使用**：同域连接通常已复用，预解析 / 预连接无收益，反而增加冗余操作。
- 避免滥用 preconnect：非关键域名使用会浪费资源，甚至阻塞更重要的请求。
- 注意 TLS 与 crossorigin：HTTPS 场景下，preconnect 必须完成 TLS 协商；**跨域资源需显式声明 crossorigin，否则连接可能被浏览器忽略。**

### 总结

- 追求兼容性与低开销时用**dns-prefetch**，覆盖更多浏览器并控制资源占用。
- 追求极致性能时用**preconnect**，针对核心域名最大化减少连接延迟。
- 两者结合可兼顾兼容性与优化效果，是跨域资源加载的常用优化组合。
