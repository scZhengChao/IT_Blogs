# 4. 启用进程沙盒化

[**沙盒**](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/design/sandbox.md "沙盒")\*\* **是一项 `Chromium` 功能，它使用**操作系统来显著地限制**渲染器进程可以访问的内容。 您应该在**所有渲染器中启用沙盒 \*\*。 不建议在一个未启动沙盒的进程（包括主进程）**中加载、阅读或处理任何不信任的内**容。

> INFO
> 欲了解更多有关进程沙盒的信息，以及如何启用它，请查看我们专门的 [**进程沙盒**](https://www.electronjs.org/zh/docs/latest/tutorial/sandbox "进程沙盒") 文档。
