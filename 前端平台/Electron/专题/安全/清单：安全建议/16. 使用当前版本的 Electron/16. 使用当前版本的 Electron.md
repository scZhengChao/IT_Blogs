# 16. 使用当前版本的 Electron

## 目录

- [为什么？](#为什么)
- [怎么做？](#怎么做)

你应该努力始终去使用最新版本的 Electron。 每当发布新的主要版本时 **，你应该尝试尽快更新您的应用。**

#### 为什么？

一个使用 `Electron、Chromium` 和 `Node.js` 的旧版本构建的应用程序比使用这些组件的最新版本的应用程序更容易成为目标。 一般来说，较旧的 版本的 `Chromium` 和 `Node.js` 的安全问题和漏洞利用更多。

`Chromium` 和 `Node.js `都是数千名有才华的开发者建造的令人印象深刻的工程。 鉴于他们受欢迎的程度，他们的安全性都经过专业的安全研究人员仔细的测试和分析。  如果你的应用程序运行的是 Electron 的最新版本 (包括 Chromium 和 Node.js)，你的应用程序将更加安全，因为潜在的安全问题并不广为人知。

#### 怎么做？

一次迁移您的应用一个主要版本， 并且查阅 Electron 的 [Breaking Changes](https://www.electronjs.org/zh/docs/latest/breaking-changes "Breaking Changes") 文档查看是否需要更新代码。
