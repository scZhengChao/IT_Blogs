# 5. 处理来自远程内容的会话许可的请求

## 目录

- [为什么？](#为什么)
- [怎么做？](#怎么做)

当你使用Chrome时，也许见过这种许可请求：每当网站尝试使用某个特性时，就会弹出让用户手动确认(如网站通知)

此API基于[**Chromium permissions API**](https://developer.chrome.com/extensions/permissions "Chromium permissions API")**，** 并已实现对应的许可类型。

#### 为什么？

默认情况下，`Electron`**将自动批准所有的许可请求**，除非开发者**手动配置一个自定义处理函数**。 尽管默认如此，有安全意识的开发者可能希望默认反着来。

#### 怎么做？

```javascript 
const { session } = require('electron')
const { URL } = require('url')

session
  .fromPartition('some-partition')
  .setPermissionRequestHandler((webContents, permission, callback) => {
    const parsedUrl = new URL(webContents.getURL())

    if (permission === 'notifications') {
      // 批准权限请求
      callback(true)
    }

    // 验证 URL
    if (parsedUrl.protocol !== 'https:' || parsedUrl.host !== 'example.com') {
      // 驳回权限请求
      return callback(false)
    }
  })
```
