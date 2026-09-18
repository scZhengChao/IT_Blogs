# 8. 不要设置 allowRunningInsecureContent 为 true

## 目录

- [为什么？](#为什么)
- [怎么做？](#怎么做)

> INFO
> 此建议是 Electron 的默认值。

默认情况下，`Electron`不允许网站在`HTTPS`中加载或**执行非安全源**(`HTTP`) **中的脚本代码、CSS或插件**。 将`allowRunningInsecureContent`属性设为`true`将禁用这种保护。

当网站的初始内容通过`HTTPS`加载并尝试在子请求中加载`HTTP`的资源时，这被称为"混合内容"。

#### 为什么？

通过`HTTPS`加载会将该资源进行加密传输，以保证其真实性和完整性。 参看[只显示安全内容](https://www.electronjs.org/zh/docs/latest/tutorial/security#1-only-load-secure-content "只显示安全内容")这节以获得更多信息

#### 怎么做？

```javascript 
// 不推荐
const mainWindow = new BrowserWindow({
  webPreferences: {
    allowRunningInsecureContent: true
  }
})
```


```javascript 
// 推荐
const mainWindow = new BrowserWindow({})
```
