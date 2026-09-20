# 19.检查可以更换哪些保险丝

## 目录

- [为什么？](#为什么)
- [怎么做？](#怎么做)

`Electron`提供了许多有用的选项，但大部分应用程序可能不需要。为了避免必须构建自己版本的`Electron`，可以使用保险丝关闭或打开这些[**功能**](https://www.electronjs.org/zh/docs/latest/tutorial/fuses "功能")

#### 为什么？

一些熔断器，如`runAsNode`和`nodeCliInspect`，允许**应用程序在使用特定环境变量**或`CLI`参数从命令行运行时表现不同。这些可以用于通过应用程序在设备上执行命令。
这可以让外部脚本运行它们可能不被允许运行的命令，但您的应用程序可能有权运行这些命令。

#### 怎么做？

我们制作了一个模块，[**电子/保险丝**](https://www.npmjs.com/package/@electron/fuses "电子/保险丝")，使翻转这些保险丝变得容易。有关使用和潜在错误案例的更多详细信息，请查看该模块的自述文件，并[**参阅如何翻转保险丝**](https://www.electronjs.org/zh/docs/latest/tutorial/fuses#how-do-i-flip-the-fuses "参阅如何翻转保险丝")？在我们的文档中。
