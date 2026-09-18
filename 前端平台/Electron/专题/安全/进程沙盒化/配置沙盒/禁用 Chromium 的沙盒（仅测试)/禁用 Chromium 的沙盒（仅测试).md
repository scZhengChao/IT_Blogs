# 禁用 Chromium 的沙盒（仅测试)

你也可以指定 [--no-sandbox](https://www.electronjs.org/zh/docs/latest/api/command-line-switches#--no-sandbox "--no-sandbox") 命令行参数来完全禁用 Chromium 的沙盒功能，这会使沙盒对所有进程失效（包括工具进程）。 我们强烈建议你只针对测试用途开启此标志，并且 **永远** 不要用于生产环境。

注意，`sandbox: true`选项也会\*\*同时禁用渲染进程中的`Node.js `\*\***环境。**
