# Monorepo的优缺点

## 目录

- [1. 背景](#1-背景)
- [2. 为什么基于 Monorepo 搭建业务组件库](#2-为什么基于-Monorepo-搭建业务组件库)
  - [1) 便于代码维护、管理](#1-便于代码维护管理)
  - [2) 组织形式灵活，支持多种目录结构](#2-组织形式灵活支持多种目录结构)
  - [3) 优化开发流程、提升开发效率](#3-优化开发流程提升开发效率)
  - [4) Monorepo 的缺点](#4-Monorepo-的缺点)

## 1. 背景

随着部门业务不断迭代，沉淀了大量的业务组件库。初期业务系统不复杂时，组件库通常都是 `Multirepo` 方式组织（**即一个组件库一个仓库**），随着业务复杂度不断提升，模块数量飞速增长，`Multirepo` 虽然从业务逻辑上解耦，但也增加了工程管理难度：

- **依赖关系不清晰。组**件库下游被哪些业务工程依赖难以确定，回归容易遗漏
- **配置无法共享。** 每个代码仓库都需要一些通用的工程化能力配置，例如`build/test/lint/ci` 等，多个仓库的配置无法同步，导致配置存在不一致问题，造成潜在隐患，对工程的优化非常不利（例如很多老工程还在用废弃的 `NPM` 镜像）
- **依赖管理复杂**。组件库往往有大量公共依赖，如果 `Multirepo` 方式，每个工程的 `node_modules` 下都会重复安装，占用大量存储空间，而且存在版本不一致问题，无法同步升级
- **本地开发调试困难**。基于 `Multirepo` 方式一个业务工程往往需要通过 `yarn link` 关联另一个组件库进行开发，由于不在一个根目录下，`Webpack` 等打包工具对 `peerDependencies` 寻址会存在问题，给本地开发增加难度
- **代码共享流程复杂。** 组件库代码修改后，需要手动到每个业务工程中升级版本，再打包构建，效率较低。而且部门内部共建项目越来越多，研发资源共享、跨团队组件库复用的问题变得越来越重要

## 2. 为什么基于 Monorepo 搭建业务组件库

现代前端工程为什么越来越离不开 `Monorepo`

有些同学可能会疑惑，原先代码都在一个仓库，**后来为了解耦、单一职责，把各模块拆分到不同仓库，现在 Monorepo 又开始把模块整合到一个仓库，这样意义在哪里**？

这里要特别说明的是，`Monorepo` 绝不是简单地将代码搬到一个仓库（即不等于 Monolith）。在 Monorepo 中，**每个子模块仍然是独立的**，有独立的版本，可以独立发包。但是与 `Mulitrepo` 不同，`Monorepo` 中的**子模块可以代码共享**，可以最大程度**复用依赖、复用工作流、复用基础配置，最重要的是 Monorepo 的 build、test 都是增量**的，可以让 CI 构建更快。这些都是 Multirepo 无法做到的。

![](./image/image_EDwiY65rTz.png)

首先 Monorepo 作为开源趋势之一，与 TypeScript、PNPM 一样火爆，知名开源项目都在逐步迁移到 Monorepo，例如 Vue3、Vite、Umi、Element Plus 等等。基于 Monorepo 还可以结合各种自动化工具提升开发效率。

其次 Monorepo 作为一种通用的管理方式，并不局限于前端，在其他语言也有涉及，例如 Go 1.18 引入 的 workspace 特性，**允许在一个仓库管理多个包，改善了本地第三方库调试的问题。**

此外 Monorepo 还具有以下优点。

### 1) 便于代码维护、管理

云课堂很多存量项目都是基于 Multirepo，业务工程和依赖库分开维护，一部分**依赖库通过部门内部 NPM 私有源实现代码共享**，还有少部分没有通过 `NPM`，而是直接在 `package.json` 中引用仓库地址（通过 git tag 区分版本）实现下载依赖，例如：

```javascript 
{
  "dependencies": {
    "log-sdk": "git+https://getRep:ozKCoV9qVWbiWMC-Vz5h@g.hz.netease.com/ykt-adult-front/log-sdk.git#0.0.5",
    "poseidon-web": "git+https://getRep:ozKCoV9qVWbiWMC-Vz5h@g.hz.netease.com/ykt-adult-front/poseidon-web.git#v1.0.9"
  }
}

```


与 `React、Antd` 等开源项目不同，业务组件库需要频繁更新，这种做法导致依赖关系不清晰，维护组件库的同学，很可能不清楚下游被哪些业务工程依赖，增加了组件库维护成本，而且回归容易遗漏。此外在这种模式下，组件库的发包流程也非常繁琐，每次业务工程上线之前，需要先到每个组件库打包构建，然后 `npm publish` 或者打 tag，然后到每个依赖该库的业务工程升级版本、打包构建，整体复杂度随工程数量增加呈现 `O(M*N)` 增长，极大增加了人力和时间成本。

在 `Monorepo` 模式下，组件库和业务工程都在一个仓库，**通过一种特殊的 ****`Workspace protocol`**** 互相引用**：

```javascript 
{
  "dependencies": {
    "shared-utils": "workspace:*"
  }
}

```


这种模式下，**依赖关系变得更清晰，而且组件库和业务工程的依赖不再通过 NPM，而是直接依赖仓库的版本**。当修改组件库代码之后，业务工程自然就依赖了最新版本的组件库。借助 Turborepo 等增量记忆化框架，Monorepo 可以做到更快的增量构建，在某个工程依赖更新之后，自动构建该工程，并且不做重复构建；此外能够以类似于瀑布方式同时异步执行多个任务，优化任务编排效率。

### 2) 组织形式灵活，支持多种目录结构

在 Turborepo 官网有一个案例，假设原先有 `web`、`docs`、`app` 三个业务工程的 Multirepo 目录结构如下：

```javascript 
web (repo 1)
├─ package.json
docs (repo 2)
├─ package.json
app (repo 3)
├─ package.json

```


若将其改造为 Monorepo 项目，目录结构如下：

```javascript 
my-monorepo
├─ apps
│  ├─ app
│  │  └─ package.json
│  ├─ docs
│  │  └─ package.json
│  └─ web
│     └─ package.json
└─ package.json


```


这些**子模块没有共享依赖，意味着存在很多重复代码，可以将公共依赖抽提，作为 internal package：**

```javascript 

my-monorepo
├─ apps
│  ├─ app
│  │  └─ package.json
│  ├─ docs
│  │  └─ package.json
│  └─ web
│     └─ package.json
├─ packages
│  └─ shared
│     └─ package.json
└─ package.json

```


如果使用 PNPM 作为包管理工具（其他包管理工具也类似），**上面这种目录结构对应的** `pnpm-workspace.yaml` 配置如下：

```javascript 
packages:
  - "apps/*"
  - "packages/*"

```


实际上，`PNPM Monorepo` 组织**形式比较灵活，支持多种目录结构**，满足各种工程化需求。**例如开源项目 UMI 的配置如下：**

```javascript 
packages:
  - "packages/*"
  - "examples/*"
  - "libs/*"
  - "codemod"
  - "did-you-know"
  - "scripts"

```


从上面的配置可以看出，Monorepo 中的“包”并不局**限于业务工程、公共组件库，甚至也可以包括文档网站、通用工程化脚本等等**。在传统 NPM 的模式下，创建“包”的成本比较昂贵，需要频繁发包操作、管理各工程引用的版本，但是在 `Monorepo` 模式下，创建“包”的成本非常低，**任何可复用的模块都可以提取为单独的“包”。**

在 `umijs/father` 项目中，甚至 workspace root 也可作为一个子模块：

```javascript 
packages:
  - "./"
  - "examples/*"
  - "boilerplate"
  - "tests/fixtures/build/classic-jsx"
  - "tests/fixtures/build/automatic-jsx"

```


### 3) 优化开发流程、提升开发效率

云课堂很多存量的业务组件库，**本地调试都非常不便，甚至有一些本地都无法启动**，需要接入业务工程看效果，每次修改代码，都需要重新打包、将构建产物提交到代码仓库，在业务工程重新 `yarn install`、`yarn build` 看效果，开发效率非常低。

有些同学可能会说，本地开发关联另一个组件库，可以用 `yarn link` 呀。`yarn link` 确实可以解决一部分问题，通过创建 `symlink`，打包工具在 `node_modules` 下查找该模块的时候，会自动链接到对应的文件目录，**实现本地调试。**

但是这种方式仅适用于不涉及 `peer / shared dependencies` 的情况，如果遇到 `peerDependencies`，会导致打包工具依赖寻址出错，最终无法正常打包。例如当前目录的 `node_modules` 下没有该依赖，应该去上一层目录的 `node_modules` 下查找，但是由于通过 symlink 链接到文件目录，所以上一层已经不是打包工程所在的目录了。这种情况在业务组件库中非常常见，因为业务组件库存在很多共享的依赖，例如 `react`、`antd`、`classnames` 等等，这些依赖在组件库发包的时候不能被打包，而是直接 `import` 宿主环境依赖（打包进去轻则造成模块冗余，重则破坏单例模式，例如 React 多实例会报错）。

本地开发关联子模块的问题，确实也有一些解决方案，例如通过 `Webpack` 的 `resolve.modules` 配置，修改打包器默认寻址逻辑，对于第三方库，一律都到指定的目录下搜索：

```javascript 
module.exports = {
  //...
  resolve: {
    // 对于第三方库，一律都在打包工程所在目录的 node_modules 中搜索
    modules: [path.resolve(__dirname, 'node_modules')],
  },
};

```


这样能解决调试问题，但是需要修改 `Webpack` 配置，而且 `resolve.modules` 配置并不是很常用，一定程度上增加了心智负担。另外，按上面这样配置，修改文件保存不一定能触发打包工具增量编译，还需要修改 watch 监听范围。有没有零配置的解决方案呢？有，Monorepo 天然支持组件库关联调试，对代码共享非常友好。

在 Monorepo 管理的工程中，子模块如何互相引用。以 `PNPM` 为例，我们可以**先执行下面的命令，将需要引用的模块安装到项目根目录：**

```javascript 
pnpm add @study/common-ykt-header -w

```


> `@study/common-ykt-header` 是 `package.json` 中的包名，`-w` **代表 Workspace Root，启用 Monorepo 之后需要指定依赖安装位置**

安装之后，直接 `import` 包名就行，而且打包也很正常。值得一提的是，这里的”安装“，其实也是一种软连接，前面提到的的 `yarn link` 是链接不同的仓库，这边链接的是同一仓库下的模块。有同学会问，为啥这里不会遇到 `peerDependencies` 寻址出错问题？这里有个前提：共享的依赖，也必须安装在 Workspace Root 统一管理（既可以解决依赖重复安装问题，又解决了版本不一致问题）。这样打包工具在解析子模块依赖的时候，都会到 Workspace Root 下的 `node_modules` 搜索。

### 4) Monorepo 的缺点

Monorepo 虽然解决了 Multirepo 很多问题，但是也存在一些缺点：

- 权限管理问题。**由于代码都在一个仓库，传统的权限管理机制不能用了，容易产生非 owner 改动的风险**
- 代码管理。代码全在一个仓库，**如果项目比较大（几个G），用 Git 管理会存在问题，git clone、安装依赖也会比较耗时，编辑器也会比较卡顿**

对于第一个问题，社区已经有相应的解决方案了，**例如 GitHub 有一个 CODEOWNERS，可以将权限粒度细分到目录级别，提交 PR 需要所有涉及到权限目录的 owner 审核**，例如：

```javascript 
apps/app-a/* @susan
apps/app-b/* @bob

```


但是该方案并没有解决代码可视隔离问题，非 owner 仍然可以看到代码，相信后续代码托管平台会不断完善。

对于第二个问题，社区暂时没有可用的解决方案（微软发布了 `GVFS`，用于管理大型仓库的可扩展 `Git` 版本，可以部分解决该问题）。但是考虑到现在开源项目都在不断往 `Monorepo` 迁移（包括很多大型项目），而且现在业务中也没有特别巨大的工程，整体规模可控，没有理由影响 `Monorepo` 的落地。
