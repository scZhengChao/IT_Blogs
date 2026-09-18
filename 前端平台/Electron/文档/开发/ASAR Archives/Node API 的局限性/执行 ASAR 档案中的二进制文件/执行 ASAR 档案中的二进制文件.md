# 执行 ASAR 档案中的二进制文件

有一些`Node API`可以执行二进制文件，例如`child_process.exec`、`child_process.spawn`和`child_process.execFile`，但**只有**`execFile`支持在`ASAR`**档案内执行二进制文件**。

因为 `exec` 和 `spawn` 允许\*\* ****`command`**** 替代 ****`file`****作为输入 \*\*，而`command` 是需要在 `shell` 下执行的. **目前没有 可靠的方法来判断** `command` 中**是否在操作一个** `asar` 包中的文件，而且即便可以判断，**我们依旧无法保证可以在无任何 副作用**的情况下替换 command 中的文件路径。
