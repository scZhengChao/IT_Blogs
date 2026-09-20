# 5. 不必要的polyfills

## 目录

- [为什么？](#为什么)
- [怎么做？](#怎么做)

`Electron`的一大好处是，你**准确地知道哪个引擎将解析你的** `JavaScript`, `HTML`和`CSS`。 如果你重新设计的代码是为整个网页编写的，请**确保不会polyfill包含在Electron 中的特性。**

#### 为什么？

现在互联网构建网页应用程序时，最老的环境决定了你能够和不能使用的功能。 尽管Electron支持性能良好的 CSS 选择器和动画，但是较早的浏览器可能不支持。 在你可以使用WebGL的场合，你的开发者可能选择了一个资源更加匮乏的解决方案来支持旧机器。

当它遇到JavaScript时， 你可能已经包含了工具包库，如DOM选择器 jQuery 或是 如`regenerator-runtime`支持`async/await` 的polyfills。

基于 `JavaScript` 的`polyfill`速度比`Electron` 中的**原生特征要快一些**。 不要通过发布你自己的网络平台标准来减慢你的 Electron 应用速度。

#### 怎么做？

假定当前版本的 `Electron`不需要使用`polyfills`。 如果你有所疑虑，检查 [caniuse.com](https://caniuse.com/ "caniuse.com") 以确认 是否[在你的Electron版本中使用的Chromium版本](https://www.electronjs.org/zh/docs/latest/api/process#processversionschrome-readonly "在你的Electron版本中使用的Chromium版本") 已经支持了你需要的特性.

此外，仔细检查您使用的三方库。 它们是否真的必要？ 例如，`jQuery`非常成功，它的许多功能现在都是 [标准JavaScript功能设置的 的一部分](https://youmightnotneedjquery.com/ "标准JavaScript功能设置的 的一部分")。

如果您正在使用 TypeScript 这样的编译器，检查它的配置**并确保你的目标是Electron 支持的最新 ECMAScript 版本。**
