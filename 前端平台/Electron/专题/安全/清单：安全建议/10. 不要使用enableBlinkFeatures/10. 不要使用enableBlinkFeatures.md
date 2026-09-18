# 10. 不要使用enableBlinkFeatures

## 目录

- [为什么？](#为什么)
- [怎么做？](#怎么做)

> INFO
> 此建议是 `Electron` 的默认值。

Blink是Chromium里的渲染引擎名称。 就像`experimentalFeatures`一样，`enableBlinkFeatures`属性将使开发者启用被默认禁用的特性。

#### 为什么？

通常来说，某个特性默认不被开启肯定有其合理的原因。 针对特定特性的合理使用场景是存在的。 作为开发者，你应该非常明白你为何要开启它，有什么后果，以及对你应用安全性的影响。 在任何情况下都不应该推测性的开启特性。

#### 怎么做？

```javascript 
// 不推荐
const mainWindow = new BrowserWindow({
  webPreferences: {
    enableBlinkFeatures: 'ExecCommandInJavaScript'
  }
})
```


```javascript 
// 推荐
const mainWindow = new BrowserWindow()
```
