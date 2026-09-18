# 8. 当你不需要默认菜单时调用 Menu.setApplicationMenu(null)

## 目录

- [为什么？](#为什么)
- [怎么做？](#怎么做)

Electron在启动时将设置一个默认菜单，其中包含一些标准条目。 但是你的应用程序或许**希望更改默认菜单**，这么做有助于提高启动性能。

#### 为什么？

如果你打算构建自己的菜单或使用无帧窗口而不使用原生菜单，你**应该尽早告诉** `Electron` 不要设置默认菜单。

#### 怎么做？

在 `app.on("ready")` \*\*之前调用 \*\*`Menu.setApplicationMenu(null)` 。 这将阻止`Electron`设置默认菜单。 了解相关讨论，请参阅 [https://github.com/electron/electron/issues/35512。](https://github.com/electron/electron/issues/35512。 "https://github.com/electron/electron/issues/35512。")
