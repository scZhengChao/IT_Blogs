# 根目录

## 目录

- [publicDir](#publicDir)

# publicDir

[https://vitejs.cn/vite3-cn/guide/assets.html#importing-asset-as-url](https://vitejs.cn/vite3-cn/guide/assets.html#importing-asset-as-url "https://vitejs.cn/vite3-cn/guide/assets.html#importing-asset-as-url")

如果你有下列这些资源：

- **不会被源码引用**（例如 `robots.txt`）
- 必须**保持原有文件名**（没有经过 hash）
- ...或者你**压根不想引入该资源，只是想得到其 URL**。

那么你可以将该资源放在**指定的 ****`public`**** 目录中，**它应位于你的**项目根目录**。该目录中的**资源在开发时能直接通过 ****`/`**** 根路径访问**到，并且**打包时会被完整复制到目标目录的根目录下。**

目录默认是 `<root>/public`，但可以通过 [publicDir](https://vitejs.cn/vite3-cn/config/shared-options.html#publicdir "publicDir")[ 选项](https://vitejs.cn/vite3-cn/config/shared-options.html#publicdir " 选项") 来配置。

请注意：

- 引入 `public` 中的资源**永远应该使用根绝对路径** —— 举个例子，`public/icon.png` 应该在源码中被引用为 `/icon.png`。
- `public` 中的资源**不应该被 JavaScript 文件引用。**
