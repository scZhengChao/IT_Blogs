# 9. 不要开启实验性功能

## 目录

- [为什么？](#为什么)
- [怎么做？](#怎么做)

> INFO
> 此建议是 `Electron` 的默认值。

`Electron` 的**熟练用户**可以通过 `experimentalFeatures` 属性来启用 `Chromium` 实验性功能。

#### 为什么？

如名称所示，**实验性功能是实验性的**，尚未对所有 `Chromium` 用户启用。 此外，它们对整个 `Electron` 的影响很可能没有经过测试。

尽管存在合理的使用场景，但是除非你知道你自己在干什么，否则你不应该开启这个属性。

#### 怎么做？

```javascript 
// 不推荐
const mainWindow = new BrowserWindow({
  webPreferences: {
    experimentalFeatures: true
  }
})
```


```javascript 
// 推荐
const mainWindow = new BrowserWindow({})


```
