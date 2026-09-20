# workspace

## 目录

- [介绍](#介绍)
- [使用](#使用)
  - [配置在 package.json 中的 workspaces 字段](#配置在-packagejson中的workspaces字段)
  - [使用 npm init 自动执行定义新工作区](#使用-npm-init-自动执行定义新工作区)
  - [添加依赖到工作区](#添加依赖到工作区)
  - [在工作区中运行命令](#在工作区中运行命令)
  - [单独部署](#单独部署)
- [示例](#示例)
- [和 monorepo 配合使用](#和-monorepo-配合使用)
  - [方式一：](#方式一)
  - [方式二：](#方式二)
  - [方式三：](#方式三)

## 介绍

本地化开发 `npm package` 不可能每次改了代码，都发布到 `npm` 官网，所以 `npm` 提供给我们 `npm link` 命令用来进行本地化开发。使用 `npm-link` 调试代码，我们要开两个编辑器，一个编辑器改开发 `package` 的代码，另一个编辑器用来调试。

如果我们开发组件库几十个组件，难道要开几十个窗口吗？`npm` 的新特性 `workspaces` 可以帮助我们来进行多包管理，它可以让多个 `npm` 包在同一个项目中进行开发和管理变得非常方便：

- 它会**将子包中所有的依赖包都提升到根目录中进行安装，提升包安装的速度；**
- 它初始化后**会自动将子包之间的依赖进行关联（软链接）；**
- 因为同一个项目的**关系，从而可以让各个子包共享一些流程，** 比如：`eslint`、`stylelint`、`git hooks`、`publish flow` 等；

`workspaces` 是一个用来在本地项目下面管理多个包的 `npm` 功能。（yarn 很早就支持了，**`npm`在****`7.x`**** 中开始支持**，也就是 **Node\@15.0.0 新增的功能）**。

## 使用

### 配置在 `package.json` 中的 `workspaces` 字段

`workspaces` 字段接收一个数组，数组里面可以填写**相对根目录的文件夹名称或者是通配符**，在 `npm install` 期间自动符号链接的这些包称为单个工作区。在以下示例中，位于文件夹 `./packages` 内的所有文件夹都将被视为工作区，只要它们包含有效的 `package.json` 文件即可：

```javascript 
{
  "name": "workspace-example",
  "workspaces": [
    "./packages/*"
  ]
}

```


运行 `npm install`，`./packages` 内的所有包都将创建符号链接到当前目录的 `node_modules` 文件夹里，对于包的使用和查找，和正常安装的 `npm` 包相同。

### 使用 npm init 自动执行定义新工作区

例如，在已经定义了 `package.json` 的项目中运行：

```javascript 
npm init -w ./packages/a -y
```


如果不存在文件夹 `./packages/a`，此命令将创建文件夹 `./packages/a` 和 `./packages/a/package.json` 文件。同时，在当前目录的 `package.json` 中添加 `workspaces` 字段，和值 `["packages\a"]`。

也可以一次添加多个工作区：

```javascript 
npm init -w packages/a -w packages/b -y

```


### 添加依赖到工作区

可以直接在工作区，进行安装、更新和删除依赖。例如，有下面的包结构：

```javascript 
.
+-- package.json
`-- packages
   +-- a
   |   `-- package.json
   `-- b
       `-- package.json

```


如果要从 `npm` 库中添加一个名为 `abbrev` 的依赖到工作区 `a`，可以使用以下命令告诉 `npm` 安装程序应该将包添加为工作区 `a` 的依赖项：

```javascript 
npm install abbrev -w a

```


如果要卸载 `abbrev` 的依赖，则要使用以下命令：

```javascript 
npm uninstall abbrev -w a

```


其他的 `npm` 命令也同样适用于工作区。

### 在工作区中运行命令

假如，当前项目中已经存在工作区 `a` 和 `b`，可以在指定的工作区 `a` 中运行以下 `npm` 命令：

```lua 
npm run test --workspace=a

```


这相当于以下步骤：

```lua 
cd packages/a && npm run test

```


也可以指定多个参数：

```lua 
npm run test --workspace=a --workspace=b

```


或者在所有配置的工作区中运行该命令，将按照它们在 `package.json` 中出现的顺序在每个工作区中运行：

```lua 
npm run test --workspaces

```


如果使 `npm` 忽略缺少目标脚本的工作区，可以加上 `--if-present` 标志。

```lua 
npm run test --workspaces --if-present

```


### 单独部署

只安装工作区 `a` 中的依赖包并运行：

```lua 
npm install --production --workspace=a
npm run prod --workspace=a

```


## 示例

假如，当前项目中已经存在工作区 `a`：

```lua 
.
+-- node_modules
|  `-- a -> ../packages/a
+-- package-lock.json
+-- package.json
`-- packages
   +-- a
   |   `-- package.json

```


在工作区 `a` 中新建 `index.js` 文件，并加入以下内容：

```lua 
module.exports = 'a'

```


在当前目录下，新建 lib 目录和 `index.js` 文件，并加入以下内容：

```lua 
const moduleA = require('a')
console.log(moduleA) // -> a

```


然后运行 `node lib/index.js`，可以看到工作区和正常安装的 `npm` 包使用并无差别。我们可以轻松地发布这些嵌套的工作空间以在其他地方使用。

## 和 monorepo 配合使用

如果维护一个单体仓库太过庞大了，维护多个仓库又太过繁琐，`monorepo` 的理念是维护一个仓库，但是一个仓库划分为多个 `package`。

### 方式一：

各个子项目都集合到一个项目中来，`package.json` 只有一份在根目录，所有项目中的 `npm` 包都安装到根目录，在根目录的 `package.json` 中定义开发和部署子项目的命令。

缺点：

- 命令混乱；
- 无法应对子项目之间存在 `npm` 包冲突的问题；（比如，`A` 项目想用 `webpack4`，`B` 项目想用 `webpack5`）

### 方式二：

各个子项目都集合到一个项目中来，根目录和各个子包都各自有一份 `package.json`，但基础的构建工具在根目录进行安装，比如上面提到的 `webpack`、`webpack-cli`、`webpack-dev-server`、`html-webpack-plugin`、`webpack-merge`，全都在根目录进行安装，和业务相关的 `npm` 包都安装到各自子项目中。

缺点： 如果子项目中有依赖相同的包，不得不在各个子项目中重复安装； 同样无法应对子项目之间存在 `npm` 包冲突的问题； 如果某天想把 `B` 项目移除，成本很高；

### 方式三：

各个子项目都集合到一个项目中来，各个子包都各自有一份 `package.json`，根目录无 `package.json`。

缺点：

- 同样如果子项目中有依赖相同的包，不得不在各个子项目中重复安装；

使用 `workspaces` 就可以很好的解决了上面的所有问题！、
