# 特点

## 目录

- [节省磁盘空间](#节省磁盘空间)
- [提高安装速度](#提高安装速度)
- [创建一个非扁平的 node\_modules 目录](#创建一个非扁平的-node_modules-目录)

## 节省磁盘空间

![](./assets/image/ueTMgWb8GEhZrP3qETkGBC_6m2UFavocQ.png)

使用 npm 时，依赖每次被不同的项目使用，都会重复安装一次。  而在使用 pnpm 时，依赖会被存储在内容可寻址的存储中，所以：

1. 如果你用到了某依赖项的不同版本，只会将**不同版本间有差异的文件添加**到仓库。 例如，如果某个包有100个文件，而它的新版本只改变了其中1个文件。那么 `pnpm update` 时只会向存储中心额外添加1个新文件，而不会因为仅仅一个文件的改变复制整新版本包的内容。
2. 所有文件都会存储在硬盘上的某一位置。 当软件包被被安装时，包里的文件**会硬链接到这一位置，而不会占用额外的磁盘空间**。 这允许你跨项目地共享同一版本的依赖。

因此，您在磁盘上节省了大量空间，这与项目和依赖项的数量成正比，并且安装速度要快得多！

## 提高安装速度

pnpm 分三个阶段执行安装：

1. 依赖解析。 仓库中没有的依赖都被识别并获取到仓库。
2. 目录结构计算。 `node_modules` 目录结构是根据依赖计算出来的。
3. 链接依赖项。 所有以前安装过的依赖项都会直接从仓库中获取并链接到 `node_modules`。

![](./assets/image/image_jQNxyLMRFQ.png)

这种方法比传统的三阶段安装过程（解析、获取和将所有依赖项写入`node_modules`）快得多。

![](./assets/image/image_uNr2pB-WAF.png)

## 创建一个非扁平的 node\_modules 目录

使用 npm 或 Yarn Classic 安装依赖项时，**所有的包都被提升到模块目录的根目录**。 这样就导致了一个问题，源码可以直接访问和修改依赖，而不是作为只读的项目依赖。

默认情况下，pnpm 使用符号链接将项目的直接依赖项添加到模块目录的根目录中。

![](./assets/image/image_dM4605aEK3.png)

如果您想了解有关 pnpm 创建的独特的 `node_modules` 结构以及为什么它可以与 Node.js 生态系统良好地配合使用的更多细节，请阅读以下内容：

- [扁平的 node\_modules 不是唯一的方法](https://www.pnpm.cn/blog/2020/05/27/flat-node-modules-is-not-the-only-way "扁平的 node_modules 不是唯一的方法")
- [基于符号链接的 node\_modules 结构](https://www.pnpm.cn/symlinked-node-modules-structure "基于符号链接的 node_modules 结构")
