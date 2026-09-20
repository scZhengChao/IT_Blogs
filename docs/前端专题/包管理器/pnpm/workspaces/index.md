# workspaces

## 目录

- [优化方案构想模型](#优化方案构想模型)
- [工具调研](#工具调研)
  - [npm 包](#npm-包)
  - [微前端——EMP](#微前端EMP)
  - [lerna](#lerna)
  - [pnpm的workspaces](#pnpm的workspaces)
- [Demo 分析](#Demo-分析)

### 优化方案构想模型

![](./image/image_79HW9__OUQ.png)

![](./image/image_5jTtaUklrL.png)

上面第一张图是目前的现状，如果俯瞰整个项目的话，会先看到的是一个整体，然后在里面再分出各个端的内容，最后通过 webpack 打包多页面的方法，把各端自己的内容串起来，打包出各端的内容。粗略一点理解的话，可以理解成上面 9 各端，最后会打包出 9 个 html 入口文件（现实操作不是这样弄，但可以象征性这样理解）。

第二张图是构想模型，借助微前端、npm 库的思路，俯瞰项目的话，最先看到的不是一个整体，而是单独的各个端（可以理解成各个端就是一个项目），然后在项目中按需引入公共库里面的内容（神似我们平时加载各种第三方工具库，每个库都解决一定领域的问题），然后再各个端自己打包出自己的内容出来。

## 工具调研

### npm 包

基于上述的构想模型，最容易想到的就是把**公共部分打包成一个 npm 包，放在私有 npm 仓库中**，各端项目中 `npm install` 然后直接使用。

理论上来说这个方法可以实现上述构想模型，但实际使用的话会有以下问题：

1. 公共库的代码有可能经常需要修改，一旦改了，可能 9 各端都要同时更新（后续开发时，可能自己都会默默来上一句：“我真的会栓Q\~”）
2. 9 各端就要建 10 个项目（公共库 + 9 个端），想想都可怕

### 微前端——EMP

微前端方向感觉 YY 的 [EMP](https://link.juejin.cn?target=https://github.com/efoxTeam/emp "EMP")` `相对比较合适，对于阿里的 [qiankun](https://link.juejin.cn?target=https://qiankun.umijs.org/ "qiankun") 虽然感觉也有一点点符合原始需求场景和上述构想模型，但总感觉“味道”不对\~

关于 EMP 的设计以及应用，可以参考 YY 团队的这几篇文章：

- [*EMP微前端分享内容回顾（上）*](https://juejin.cn/post/6906683896361353230 "EMP微前端分享内容回顾（上）")
- [*EMP微前端实战之YY语音PC客户端模板重构*](https://juejin.cn/post/6905924479923421191 "EMP微前端实战之YY语音PC客户端模板重构")
- [*帮你对比多种微前端方案*](https://juejin.cn/post/6898268972178178061 "帮你对比多种微前端方案")

跟我们上述构想模型非常贴合，而且也能解决上述“npm 包”中提及到的问题

但也存在一个没法逾越的鸿沟——杀鸡用牛刀：

- 为了实现构想模型，引入一个更大的库，上手成本指数上升
- 可能只用到 EMP 10% 的内容，但为此引入了一整个生态（还没深入研究 EMP，纯属直观感受）

### lerna

[lerna](https://link.juejin.cn?target=https://lerna.js.org/ "lerna") 是一个管理包含多个软件包（package）的工具，用于更方便实现 Monorepo （ `monorepo` 和 `multirepo` 的含义可以参考这篇：[Monorepo简介与建设实践](https://juejin.cn/post/6941279824589619208 "Monorepo简介与建设实践")`）`

这么一看，`Monorepo `的思考跟上述构想模型也非常贴合

再深入研究一下，发现 lerna 中实现 Monorepo 的部分好像就是` `[Bootstrap](https://link.juejin.cn?target=https://lerna.js.org/docs/features/bootstrap "Bootstrap")，而据江湖传闻，早期 lerna 中实现 Monorepo 的部分不太好用（不知道目前 lerna 最新的 V5 版本是不是也这样，有了解的朋友可以补充补充，Thanks♪(･ω･)ﾉ），大多数大佬用的话基本都会把 Bootstrap 换成 [yarn 的 workspaces](https://link.juejin.cn?target=https://yarnpkg.com/features/workspaces "yarn 的 workspaces")，把整个 Monorepo 托管给 yarn 实现，而且他们还很搭

详细关于 lerna 以及搭配 yarn 的 workspaces可以见：

- [*Monorepo最佳实践之Yarn Workspaces*](https://juejin.cn/post/7011024137707585544 "Monorepo最佳实践之Yarn Workspaces")
- [*【译】配置 Monorepo 的几种工具 lerna、npm、yarn 及其性能对比*](https://juejin.cn/post/6927472790438150152 "【译】配置 Monorepo 的几种工具 lerna、npm、yarn 及其性能对比")
  - PS：比较推荐这篇译文，详细解释了 lerna、npm、yarn 以及 workspaces 的关系和前世今生

综合来看，如果想要实现上述构想模型，实现 Monorepo 基本上就能符合，lerna 除了实现 Monorepo 之外，还有很多很强大的功能，比如：发布多个 npm 包、版本管理之类的，但我们的需求场景并不需要这些内容，所有基本把范围锁定在 yarn 的 workspaces

### pnpm的workspaces

搜着搜着，发现 [pnpm](https://link.juejin.cn?target=https://pnpm.io/zh/ "pnpm") 也有 [workspaces](https://link.juejin.cn?target=https://pnpm.io/zh/workspaces "workspaces")，而且据说 pnpm 更牛，既然如此，果断上车\~

上车入坑指南可见以下两位大佬的文章：

- [*都2022年了，pnpm快到碗里来！*](https://juejin.cn/post/7053340250210795557#heading-13 "都2022年了，pnpm快到碗里来！")
- [*One For All：基于pnpm + lerna + typescript的最佳项目实践 - 理论篇*](https://juejin.cn/post/7043998041786810398#heading-13 "One For All：基于pnpm + lerna + typescript的最佳项目实践 - 理论篇")
- [*\[译\]用 PNPM Workspaces 替换 Lerna + Yarn*](https://juejin.cn/post/7071992448511279141 "\[译]用 PNPM Workspaces 替换 Lerna + Yarn")

好，锁定就开干！

## Demo 分析

详细源码可见：[*demo-pnpm-workspaces*](https://link.juejin.cn?target=https://github.com/yutucc/demo-pnpm-workspaces "demo-pnpm-workspaces")

从头搭建也很简单：

1. 按官方[步骤](https://link.juejin.cn?target=https://pnpm.io/zh/installation "步骤")安装好 pnpm
2. 新建好文件夹后，直接在根目录执行 `pnpm init` 初始化项目
3. 创建 [pnpm-workspace.yaml](https://link.juejin.cn?target=https://github.com/yutucc/demo-pnpm-workspaces/blob/main/pnpm-workspace.yaml "pnpm-workspace.yaml")、[.npmrc](https://link.juejin.cn?target=https://github.com/yutucc/demo-pnpm-workspaces/blob/main/.npmrc ".npmrc")
   - `pnpm-workspace.yaml `是开启 workspaces 的配置文件
   - `.npmrc` 用来配置信息，`engine-strict=true` 结合根目录的 [package.json](https://link.juejin.cn?target=https://github.com/yutucc/demo-pnpm-workspaces/blob/main/package.json "package.json") 中的 `engines` 字段，可以指定运行的 node 版和 pnpm 版本
4. 创建好 [packages](https://link.juejin.cn?target=https://github.com/yutucc/demo-pnpm-workspaces/tree/main/packages "packages") 文件夹中的内容，并进入各自的目录执行 `pnpm init` 进行初始化
   - `components` 目录模拟公共组件
   - `models` 目录模拟公共 models
   - `web` 目录模拟 web 端项目
5. 在跟目录下执行 `pnpm add @pn/components @pn/models -r --filter @pn/web` **把 components 和 models 引入到 web 中，这样在 web 里面就可以像 import 第三份库那样直接使用**

![](./image/image_3NBzeOFn-b.png)

- 可能有朋友会问，[packages](https://link.juejin.cn/?target=https://github.com/yutucc/demo-pnpm-workspaces/tree/main/packages "packages") 目录下为什么每个包的包名都要加一个 `@pn/` 前缀。实际上这个只是为了区分其它“真正的”第三方库，纯粹是为了打开 `node_modules` 目录时方便查找（反正也不用真发布到 npm 仓库上）

`pnpm add @pn/components @pn/models -r --filter @pn/web` 这个命令有几个细节：

- `add` 命令可以参考：[*pnpm add*](https://link.juejin.cn?target=https://pnpm.io/zh/cli/add "pnpm add")
- `-r` 参数可以参考：[*pnpm -r, --recursive*](https://link.juejin.cn?target=https://pnpm.io/zh/cli/recursive "pnpm -r, --recursive")
- `--filter` 参数可以参考：[*过滤*](https://link.juejin.cn?target=https://pnpm.io/zh/filtering "过滤")
- 另外，如果直接进入到 `packages/web` 目录下，**可以直接执行 ****`pnpm add @pn/components @pn/models`**** 不用带 ****`-r`**** 和 ****`--filter`**** 参数，效果也是一样的**

1. 补充好 start 的命令即可以了，详细可以看 [package.json](https://link.juejin.cn/?target=https://github.com/yutucc/demo-pnpm-workspaces/blob/main/package.json "package.json") 和 [web-package.json](https://link.juejin.cn/?target=https://github.com/yutucc/demo-pnpm-workspaces/blob/main/packages/web/package.json "web-package.json") 两份 package.json 文件的 `scripts` 字段的 `start` 命令

另外，如果想把项目放在 apps 目录下，把公共库放在 packages 目录下，可以直接在 `pnpm-workspace.yaml` 增加一行 `- 'apps/*'`

然后在根目录执行：

```typescript 
pnpm add @pn/components @pn/models -r --filter @pn/exam

pnpm run start:exam
```


[pnpm workspace实践](<./pnpm workspace实践/index.md> "pnpm workspace实践")

[workspace协议](./workspace协议/index.md "workspace协议")

[start](./start/index.md "start")

[worksapce:\*](./worksapce--/index.md "worksapce:*")
