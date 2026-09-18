# 快速上手

## 目录

- [通过 npm 安装](#通过-npm-安装)
- [常用命令](#常用命令)
  - [设置源](#设置源)
  - [使用](#使用)
  - [移除包/移除缓存](#移除包移除缓存)
  - [更新](#更新)
  - [设置存储路径](#设置存储路径)
- [CLI](#CLI)
  - [配置项](#配置项)

# 通过 npm 安装

```html 
npm install -g pnpm
```


# 常用命令

cnpm的使用和yarn差不多，把yarn替换成cnpm

```typescript 
pnpm add xxx // 安装xxx到 dependencies 
pnpm add -D xxx // 安装xxx到 devDependencies 
pnpm install // 用于安装项目所有依赖
pnpm remove xxx // 删除dependencies中xxx
pnpm remove -D xxx // 删除devDependencies中xxx

```


> 中文官网地址：[https://pnpm.io/zh/](https://pnpm.io/zh/ "https://pnpm.io/zh/")

[ pnpm link | pnpm中文文档 | pnpm中文网 别名： ln https://www.pnpm.cn/cli/link](https://www.pnpm.cn/cli/link " pnpm link | pnpm中文文档 | pnpm中文网 别名： ln https://www.pnpm.cn/cli/link")

## 设置源

```typescript 
//查看源
pnpm config get registry 
//切换淘宝源
pnpm config set registry http://registry.npm.taobao.org 

```


## 使用

```typescript 
pnpm install 包  // 
pnpm i 包
pnpm add 包    // -S  默认写入dependencies
pnpm add -D    // -D devDependencies
pnpm add -g    // 全局安装
```


## 移除包/移除缓存

```typescript 
pnpm remove 包                            //移除包
pnpm remove 包 --global                   //移除全局包
pnpm store prune   它提供了一种用于删除一些不被全局项目所引用到的包
```


## 更新

```typescript 
pnpm up                //更新所有依赖项
pnpm upgrade 包        //更新包
pnpm upgrade 包 --global   //更新全局包

```


## 设置存储路径

```typescript 
pnpm config set store-dir /path/to/.pnpm-store
pnpm config set store-dir /Users/zhengchao/home/.pnpm-store


```


# CLI

## 配置项

```bash 
-C <path>, --dir <path>
```


**在 ****`<path>`**** 中启动 pnpm ，而不是当前的工作目录。**

```bash 
"web:build:uat": "pnpm -C ./packages/web build:uat",
"web:build:prod": "pnpm -C ./packages/web build:prod",
"manage:start": "pnpm -C ./packages/manage start",
"manage:build:local": "pnpm -C ./packages/manage build:local",
"manage:build:dev": "pnpm -C ./packages/manage build:dev",
"manage:build:st": "pnpm -C ./packages/manage build:st",
"manage:build:uat": "pnpm -C ./packages/manage build:uat",
"manage:build:prod": "pnpm -C ./packages/manage build:prod",

```
