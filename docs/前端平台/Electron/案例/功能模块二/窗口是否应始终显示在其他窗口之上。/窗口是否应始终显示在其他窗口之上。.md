# 窗口是否应始终显示在其他窗口之上。

## 目录

- [win.setAlwaysOnTop(flag\[, level\]\[, relativeLevel\])](#winsetAlwaysOnTopflag-level-relativeLevel)

#### `win.setAlwaysOnTop(flag[, level][, relativeLevel])`

- `flag` 布尔值
- `level` 字符串（可选） macOS Windows - 值包括 `normal`、`floating`、`torn-off-menu`、`modal-panel`、`main-menu`、`status`、`pop-up-menu`、`screen-saver` 和 `dock`（已弃用）。当 `flag` 为 true 时，默认值为 `floating`。当标志为假时，`level` 重置为 `normal`。请注意，从 `floating` 到 `status`，窗口位于 macOS 上的 Dock 下方和 Windows 上的任务栏下方。从 `pop-up-menu` 到更高版本，它显示在 macOS 上的 Dock 上方和 Windows 上的任务栏上方。有关详细信息，请参阅 [macOS 文档](https://developer.apple.com/documentation/appkit/nswindow/level "macOS 文档")。
- `relativeLevel` 整数（可选）macOS - 相对于给定的 `level` 设置此窗口的更高层数。默认为 `0`。请注意，Apple 不鼓励在 `screen-saver` 之上设置高于 1 的级别。

设置窗口是否应始终显示在其他窗口之上。设置完毕后，该窗口仍然是一个普通窗口，而不是一个无法获得焦点的工具箱窗口。
