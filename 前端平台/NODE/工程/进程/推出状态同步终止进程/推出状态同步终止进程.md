# 推出状态同步终止进程

## 目录

- [推出状态同步终止进程](#推出状态同步终止进程)

# 推出状态同步终止进程

`process.exit()` 方法指示 Node.js 以 `code` 的退出状态同步终止进程。 如果省略 `code`，则退出将使用“成功”代码 `0` 或 `process.exitCode` 的值（如果已设置）。 直到所有 ['exit'](https://nodejs.cn/api/process.html#event-exit "'exit'") 事件监听器都被调用，Node.js 才会终止。

以“失败”代码退出：

```javascript 
import { exit } from 'node:process';

exit(1);
```


执行 Node.js 的 shell 应该看到退出码为 `1`。

调用 `process.exit()` 将强制进程尽快退出，即使仍有未完全完成的异步操作挂起，包括对 `process.stdout` 和 `process.stderr` 的 I/O 操作。
