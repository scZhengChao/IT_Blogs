# concurrently 并发执行

## 目录

- [使用](#使用)
  - [安装](#安装)
  - [用法](#用法)
  - [示例](#示例)

[ concurrently - npmGitDownloads Run commands concurrently. Latest version: 8.2.2, last published: 9 months ago. Start using concurrently in your project by running \`npm i concurrently\`. There are 1729 other projects in the npm regis https://www.npmjs.com/package/concurrently](https://www.npmjs.com/package/concurrently " concurrently - npmGitDownloads Run commands concurrently. Latest version: 8.2.2, last published: 9 months ago. Start using concurrently in your project by running `npm i concurrently`. There are 1729 other projects in the npm regis https://www.npmjs.com/package/concurrently")

该工具是用Node.js编写的，但您可以使用它来运行任何命令。
记住用引号括住单独的命令：

```bash 
concurrently "command1 arg" "command2 arg"

```


否则，将同时尝试运行4个单独的命令：command1，arg，command2，arg。
在package.json中，转义引号：

```bash 
"start": "concurrently \"command1 arg\" \"command2 arg\""

```


NPM运行命令可以缩短：

```bash 
concurrently "npm:watch-js" "npm:watch-css" "npm:watch-node"

# Equivalent to:
concurrently -n watch-js,watch-css,watch-node "npm run watch-js" "npm run watch-css" "npm run watch-node"

```


NPM缩短命令也支持通配符。给定package.json中的以下脚本：

```json 
{
  //...
  "scripts": {
    // ...
    "watch-js": "...",
    "watch-css": "...",
    "watch-node": "..."
    // ...
  }
  // ...
}

```


```bash 
concurrently "npm:watch-*"
 
# Equivalent to:
concurrently -n js,css,node "npm run watch-js" "npm run watch-css" "npm run watch-node"

# Any name provided for the wildcard command will be used as a prefix to the wildcard
# part of the script name:
concurrently -n w: npm:watch-*

# Equivalent to:
concurrently -n w:js,w:css,w:node "npm run watch-js" "npm run watch-css" "npm run watch-node"
```


也支持排除。给定package.json中的以下脚本：

```json 
{
  // ...
  "scripts": {
    "lint:js": "...",
    "lint:ts": "...",
    "lint:fix:js": "...",
    "lint:fix:ts": "..."
    // ...
  }
  // ...
}

```


```bash 
# Running only lint:js and lint:ts
#   with lint:fix:js and lint:fix:ts excluded
concurrently "npm:lint:*(!fix)"

```


# 使用

同时运行多个命令。比如：

```bash 
npm run watch-js & npm run watch-less
```


但比这种方式要更好一些。

它也适用于Windows。你可以调整npm脚本达到跨平台运行的效果。

#### 安装

这个工具是使用nodejs写的，但是可以用来运行任何命令

你可以选择全局安装

```bash 
npm install -g concurrently
```


也可以局部安装

```bash 
npm install concurrently --save-dev
```


#### 用法

请记住用引号将每个单独的命令括起来，如下所示：

```bash 
concurrent "command1 arg" "command2 arg"
```


否则，concurrent将尝试运行4个单独的命令：

```bash 
command1, arg, command2, arg
```


在双引号内需要转义

```bash 
"concurrently \"npm run dev:preload\" \"npm run dev:electron\""
```


#### 示例

![](image_A9qjicYVaw.png)
