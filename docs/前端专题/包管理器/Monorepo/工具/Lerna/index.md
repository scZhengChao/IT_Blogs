# Lerna

## 目录

- [About](#About)
- [总结](#总结)
- [工作的两种模式](#工作的两种模式)
  - [Fixed/Locked mode (default)](#FixedLocked-mode-default)
  - [Independent mode](#Independent-mode)
- [Start init](#Start-init)
  - [项目结构](#项目结构)
- [Set up](#Set-up)
  - [Set up git + npm](#Set-up-git--npm)
  - [Set up yarn的workspaces模式](#Set-up-yarn的workspaces模式)
- [Lerna Script](#Lerna-Script)
  - [lerna create \[loc\]](#lerna-create-loc)
    - [Examples](#Examples)
  - [lerna add \[@version\] \[--dev\] \[--exact\]](#lerna-add-version---dev---exact)
    - [Examples](#Examples)
  - [lerna bootstrap](#lerna-bootstrap)
  - [lerna list](#lerna-list)
  - [lerna import](#lerna-import)
  - [lerna run](#lerna-run)
  - [lerna exec](#lerna-exec)
  - [lerna link](#lerna-link)
  - [lerna clean](#lerna-clean)
  - [lerna changed](#lerna-changed)
  - [lerna publish](#lerna-publish)
    - [如果publish失败了，我如何重试呢？](#如果publish失败了我如何重试呢)
    - [发布到私有的 npm 注册表](#发布到私有的-npm-注册表)
    - [以@开头包的发布问题](#以开头包的发布问题)
  - [lerna updated](#lerna-updated)
- [lerna.json解析](#lernajson解析)

[ 简介 - lerna 中文文档 用于管理包含多个包的JavaScript项目的工具。 https://gitcode.gitcode.host/docs-cn/lerna-docs-cn/index.html](https://gitcode.gitcode.host/docs-cn/lerna-docs-cn/index.html " 简介 - lerna 中文文档 用于管理包含多个包的JavaScript项目的工具。 https://gitcode.gitcode.host/docs-cn/lerna-docs-cn/index.html")

[ 常见问题 | Lerna 用于管理带有多个包的 JavaScript 项目的工具。 http://febeacon.com/lerna-docs-zh-cn/routes/basic/FAQ.html](http://febeacon.com/lerna-docs-zh-cn/routes/basic/FAQ.html " 常见问题 | Lerna 用于管理带有多个包的 JavaScript 项目的工具。 http://febeacon.com/lerna-docs-zh-cn/routes/basic/FAQ.html")

[ Lerna · 是一个管理工具，用于管理包含多个软件包（package）的 JavaScript 项目 | Lerna 中文文档 Lerna 是一个管理工具，用于管理包含多个软件包（package）的 JavaScript 项目。 https://www.lernajs.cn/](https://www.lernajs.cn/ " Lerna · 是一个管理工具，用于管理包含多个软件包（package）的 JavaScript 项目 | Lerna 中文文档 Lerna 是一个管理工具，用于管理包含多个软件包（package）的 JavaScript 项目。 https://www.lernajs.cn/")

## About

官网：[https://lerna.js.org/](https://lerna.js.org/ "https://lerna.js.org/")

Lerna 是一个优化基于 git+npm 的多 package 项目的管理工具; 主要用于大幅减少开发[脚手架](https://so.csdn.net/so/search?q=脚手架\&spm=1001.2101.3001.7020 "脚手架")过程中的重复操作，并提升操作的标准化

[Lerna](https://link.juejin.im/?target=https://github.com/lerna/lerna "Lerna")是一个工具，它优化了使用git和npm管理多包存储库的工作流。

## 总结

lerna不负责构建，测试等任务，它提出了一种**集中管理package的目录模式**，**提供了一套自动化管理程序**，让开发者不必再深耕到具体的组件里维护内容，在项目根目录就可以全局掌控，基于npm scripts，可以很好地完成组件构建，代码格式化等操作，并在最后一公里，用lerna变更package版本，将其上传至远端。

## 工作的两种模式

```bash 
$ lerna init # 固定模式(Fixed mode)默认为固定模式，packages下的所有包共用一个版本号(version)
$ lerna init --independent # 独立模式(Independent mode)，每一个包有一个独立的版本号
```


### Fixed/Locked mode (default)

**lerna init 默认的为固定模式(Fixed mode)**

vue,babel都是用这种，在`publish`的时候,会在`lerna.json`文件里面`"version": "0.1.5",`,依据这个号，进行增加，只选择一次，其他有改动的包自动更新版本号。

### Independent mode

`lerna init --independent`初始化项目。 **这个时候就为独立模式(** Independent mode)`lerna.json`文件里面`"version": "independent",`

每次`publish`时，您都将得到一个提示符，提示每个已更改的包，以指定是补丁、次要更改、主要更改还是自定义更改。

固定模式中，packages下的所有包共用一个版本号(version)，会自动将所有的包绑定到一个版本号上(该版本号也就是lerna.json中的version字段)，所以任意一个包发生了更新，这个共用的版本号就会发生改变。

**而独立模式允许每一个包有一个独立的版本号，在使用lerna publish命令时，可以为每个包单独制定具体的操作，同时可以只更新某一个包的版本号**

## Start init

```typescript 
    $ npm install lerna -g
    $ mkdir lerna-gp && cd $_
    $ npm lerna init # 用的默认的固定模式，vue babel等都是这个
    
     # Add packages
    $ cd packages
    $ mkdir daybyday gpnode gpwebpack
    ...
    #分别进入三个目录初始化成包
    $ cd daybyday
    $ npm init -y 
    $ cd ../gpnode
    $ npm init -y
    $ cd ../gpwebpack
    $ npm init -y

```


### 项目结构

```typescript 
➜  lerna-gp git:(master) ✗ tree
.
├── lerna.json
├── package.json
└── packages
    ├── daybyday
    │   └── package.json
    ├── gpnode
    │   └── package.json
    └── gpwebpack
        └── package.json
 
4 directories, 5 files

```


## Set up

### Set up git + npm

```typescript 
✗ git remote add origin git@gitlab.yourSite.com:gaopo/lerna-gp.git
 
#查看是否登录
✗ npm whoami
gp0320
 
#没有则登录 
npm login 
# 输入username password 
Logged in as gp0320 on https://registry.npmjs.org/. # succeed

```


### Set up yarn的workspaces模式

> 默认是npm, 而且每个子package都有自己的`node_modules`，通过这样设置后，只有顶层有一个`node_modules`

- 修改顶层 `package.json and lerna.json`

```typescript 
# package.json 文件加入
 "private": true,
  "workspaces": [
    "packages/*"
  ],
 
# lerna.json 文件加入
"useWorkspaces": true,
"npmClient": "yarn",

```


## Lerna Script

### lerna create \[loc]

> 创建一个包，name包名，loc 位置可选

#### Examples

```bash 
# 根目录的package.json 
 "workspaces": [
    "packages/*",
    "packages/@gp0320/*"
  ],
  
# 创建一个包gpnote默认放在 workspaces[0]所指位置
lerna create gpnote 
 
# 创建一个包gpnote指定放在 packages/@gp0320文件夹下，注意必须在workspaces先写入packages/@gp0320，看上面
lerna create gpnote packages/@gp0320gkjhc

```


### lerna add \[@[version](https://so.csdn.net/so/search?q=version\&spm=1001.2101.3001.7020 "version")] \[--dev] \[--exact]

> 增加本地或者远程`package`做为当前项目`packages`里面的依赖

- `--dev` devDependencies 替代 `dependencies`
- `--exact` 安装准确版本，就是安装的包版本前面不带`^`, Eg: `"^2.20.0" ➜ "2.20.0"`

#### Examples

```bash 
# Adds the module-1 package to the packages in the 'prefix-' prefixed folders 将module-1软件包添加到'prefix-'前缀的文件夹中
lerna add module-1 packages/prefix-*
 
# Install module-1 to module-2 lerna命令会通过symlink的方式关联过去，可以理解为创建了一个快捷方式，这个对本地开发非常有用。
lerna add module-1 --scope=module-2
 
# Install module-1 to module-2 in devDependencies lerna命令会通过symlink的方式关联过去，可以理解为创建了一个快捷方式，这个对本地开发非常有用。
lerna add module-1 --scope=module-2 --dev
 
# Install module-1 in all modules except module-1
lerna add module-1
 
# Install babel-core in all modules
lerna add babel-core


```


### lerna bootstrap

为所有项目安装依赖，类似于npm/yarn i

默认是npm i,因为我们指定过yarn，so,run yarn install,会把所有包的依赖安装到根`node_modules`.

### lerna list

列出所有的包，如果与你文夹里面的不符，进入那个包运行`yarn init -y`解决

```bash 
➜  lerna-gp git:(master) ✗ lerna list
lerna notice cli v3.14.1
daybyday
gpnode
gpnote
gpwebpack
lerna success found 4 packages

```


### lerna import

```typescript 

导入存在的包
**案例1：**把路径为~/Users/Product的包导入到名为utilites的包里。

$ lerna import ~/Users/Product --dest=utilities
```


导入本地已经存在的包

![](./image/image_Titectwy4x.png)

### lerna run

```bash 
lerna run < script > -- [..args] # 运行所有包里面的有这个script的命令
$ lerna run --scope my-component test

# 例如
$ lerna run test # 运行所有包的 test 命令
$ lerna run build # 运行所有包的 build 命令
$ lerna run --parallel watch # 观看所有包并在更改时发报，流式处理前缀输出

$ lerna run --scope my-component test # 运行 my-component 模块下的 test


```


### lerna exec

运行任意命令在每个包

```bash 
$ lerna exec -- < command > [..args] # runs the command in all packages
$ lerna exec -- rm -rf ./node_modules
$ lerna exec -- protractor conf.js
lerna exec --scope my-component -- ls -la

```


### lerna link

项目包建立软链，类似npm link

将当前 lerna 库中相互依赖的所有 lerna `packages` 符号连接在一起。

步骤：

1. 正常安装所有依赖
2. 然后进入你引用本地包的项目；lerna link。如果发现node\_modules下面是软连接；就ok了

### lerna clean

删除所有包的node\_modules目录

删除所有包下面的`node_modules`目录，也可以删除指定包下面的`node_modules`。

**注意：** 不会删除`package.json`里面的依赖项定义，也不会删除root目录的`node_modules`。

```typescript 
// 只删除feu-ui包下面的node_modules目录
$ lerna clean --scope=feu-ui
```


### lerna changed

列出下次发版`lerna publish` 要更新的包。

原理： 需要先git add,git commit 提交。 然后内部会运行`git diff --name-only v版本号`，搜集改动的包，就是下次要发布的。并不是网上人说的所有包都是同一个版全发布。

```bash 
➜  lerna-repo git:(master) ✗ lerna changed                                     
info cli using local version of lerna
lerna notice cli v3.14.1
lerna info Looking for changed packages since v0.1.4
daybyday #只改过这一个 那下次publish将只上传这一个
lerna success found 1 package ready to publish

```


### lerna publish

**注意： 不会发布标记为私有（****`package.json`****中****`private=true`****）的包。**

#### 如果`publish`失败了，我如何重试呢？

有些时候`lerna publish`不起作用。可能是您的网络出现了波动，也可能是没有登录到 npm 等等。

如果`lerna.json`并没有更新，重试一下`lerna publish`。

如果已经更新，您可以强制重新发布。`lerna publish --force-publish $(ls packages/)`

#### 发布到私有的 npm 注册表

如果`lerna publish`失败，请确保您的`package.json`中有：

```typescript 
"publishConfig": {
    "registry": "https://[registry-url]"
}
```


您可能还需要在您的`.npmrc`文件中添加以下内容:

```typescript 
egistry = https://[registry-url]

```


#### 以@开头包的发布问题

如果你的包名是带scope的例如：`"name": "@gp0320/gpwebpack",`

发布package的名字如果是以@开头的，例如`@feu/tools`，npm默认以为是私人发布，需要使用`npm publish --access public`发布。但是`lerna publish`不支持该参数，解决方法参考: [issues](https://link.juejin.cn?target=https://github.com/lerna/lerna/issues/914 "issues")

```typescript 
// package.json
{
 "name": "@feu/tools",
 "publishConfig": {
   "access": "publish"   // 如果该模块需要发布，对于scope模块，需要设置为publish，否则需要权限验证
  }
}
```


```bash 
lerna publish 
lerna info current version 0.1.4
#这句意思是查找从v0.1.4到现在改动过的包
lerna info Looking for changed packages since v0.1.4 
 
? Select a new version (currently 0.1.4) Patch (0.1.5)
 
Changes:
 - daybyday: 0.1.3 => 0.1.5 #只改动过一个
 
...
 
Successfully published:
 - daybyday@0.1.5
lerna success published 1 package

```


提交对项目的更新 运行该命令会执行如下的步骤：

1. 运行lerna updated来决定哪一个包需要被publish
2. 如果有必要，将会更新lerna.json中的version
3. 将所有更新过的的包中的package.json的version字段更新
4. 将所有更新过的包中的依赖更新
5. 为新版本创建一个git commit或tag
6. 将包publish到npm上

```bash 
$ lerna publish # 用于发布更新
$ lerna publish --skip-git # 不会创建git commit或tag
$ lerna publish --skip-npm # 不会把包publish到npm上

```


### lerna updated

```bash 
$ lerna updated
# 或
$ lerna diff
#比对包是否发生过变更

```


## **lerna.json解析**

```bash 
{
  "packages": [
    "components/*"
  ],
  "version": "independent",
  "npmClient": "yarn",
  "useWorkspaces": true,
  "command": {
    "bootstrap": {
      "ignore": "",
      "npmClientArgs": ""
    },
    "publish": {
      "ignoreChanges": [
        "ignored-file",
        "*.md"
      ]
    }
  }
}
```


**version：** 当前库的版本

**useWorkspaces**: 是否使用workspace来管理依赖

**npmClient：** 允许指定命令使用的client， 默认是 npm， 可以设置成 yarn

**command.publish.ignoreChanges：** 可以指定那些目录或者文件的变更不会被publish

**command.bootstrap.ignore：** 指定不受 bootstrap 命令影响的包

**command.bootstrap.npmClientArgs：** 指定默认传给 lerna bootstrap 命令的参数

**command.bootstrap.scope：** 指定那些包会受 lerna bootstrap 命令影响

**packages：** 指定包所在的目录

[   https://gitee.com/changtuizhengchao/lerna-repo](https://gitee.com/changtuizhengchao/lerna-repo "   https://gitee.com/changtuizhengchao/lerna-repo")
