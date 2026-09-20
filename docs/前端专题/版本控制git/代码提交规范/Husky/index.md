# Husky

## 目录

- [核心概念](#核心概念)
- [安装与配置](#安装与配置)
  - [1. 基本安装](#1-基本安装)
  - [2. package.json 配置](#2-packagejson-配置)
- [常用钩子配置](#常用钩子配置)
  - [1. 添加 pre-commit 钩子（提交前运行）](#1-添加-pre-commit-钩子提交前运行)
  - [2. 添加 commit-msg 钩子（验证提交信息）](#2-添加-commit-msg-钩子验证提交信息)
  - [3. 添加 pre-push 钩子（推送前运行）](#3-添加-pre-push-钩子推送前运行)
- [与 lint-staged 集成](#与-lint-staged-集成)
  - [1. 安装 lint-staged](#1-安装-lint-staged)
  - [2. 配置 package.json](#2-配置-packagejson)
  - [3. 修改 pre-commit 钩子](#3-修改-pre-commit-钩子)
- [高级配置](#高级配置)
  - [1. 跳过钩子](#1-跳过钩子)
  - [2. 条件执行](#2-条件执行)
  - [3. 多命令执行](#3-多命令执行)
- [生态系统集成](#生态系统集成)
  - [1. 与 Commitizen 集成](#1-与-Commitizen-集成)
  - [2. 与 Commitlint 集成](#2-与-Commitlint-集成)
  - [3. 与 Jest 集成](#3-与-Jest-集成)
- [最佳实践](#最佳实践)
- [常见问题解决](#常见问题解决)
- [版本差异](#版本差异)
- [卸载 Husky](#卸载-Husky)

Husky 是一个现代化的 Git 钩子管理工具，可以帮助你在 **Git 操作的各个阶段（如提交前、推送前）自动运行脚本**，常用于**代码风格检查、测试运行、提交信息验证等。**

## 核心概念

1. **Husky** - 主工具包，用于管理 Git 钩子
2. **lint-staged** - 常与 Husky 配合使用，只检查暂存区的文件
3. **commitlint** - 提交信息验证（常与 Husky 配合）
4. **pre-commit** - 提交前钩子
5. **commit-msg** - 提交信息钩子
6. **pre-push** - 推送前钩子

## 安装与配置

### 1. 基本安装

```javascript 
npm install husky --save-dev
npx husky-init && npm install
```


这会：

1. **安装 Husky**
2. **创建**\*\*`.husky`\*\***目录**
3. **添加**\*\*`prepare`\*\***脚本到 package.json**
4. **创建一个示例的 pre-commit 钩子**

### 2. package.json 配置

确保 package.json 中有：

```json 
{
  "scripts": {
    "prepare": "husky install"
  }
}
```


## 常用钩子配置

### 1. 添加 pre-commit 钩子（提交前运行）

```bash 
npx husky add .husky/pre-commit "npm test"
# 或更常见的，使用 lint-staged
npx husky add .husky/pre-commit "npx lint-staged"
```


### 2. 添加 commit-msg 钩子（验证提交信息）

```bash 
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```


### 3. 添加 pre-push 钩子（推送前运行）

```bash 
npx husky add .husky/pre-push "npm run test:ci"
```


## 与 lint-staged 集成

### 1. 安装 lint-staged

```bash 
npm install --save-dev lint-staged
```


### 2. 配置 package.json

```json 
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{css,scss,less}": [
      "stylelint --fix",
      "prettier --write"
    ],
    "*.{json,md,html}": [
      "prettier --write"
    ]
  }
}
```


### 3. 修改 pre-commit 钩子

确保`.husky/pre-commit`包含：

```bash 
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```


## 高级配置

### 1. 跳过钩子

```bash 
git commit -m "message" --no-verify
git push --no-verify
```


### 2. 条件执行

在钩子脚本中添加条件判断：

```bash 
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

[ "$NODE_ENV" != "production" ] && npm run test
```


### 3. 多命令执行

```bash 
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint && npm run test
```


## 生态系统集成

### 1. 与 Commitizen 集成

```bash 
npx husky add .husky/prepare-commit-msg "exec < /dev/tty && git cz --hook || true"
```


### 2. 与 Commitlint 集成

```bash 
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```


### 3. 与 Jest 集成

```bash 
npx husky add .husky/pre-push "npm run test:ci"
```


## 最佳实践

1. **保持钩子轻量** - 只运行必要的检查
2. **明确错误信息** - 当钩子失败时，给出清晰的修复建议
3. **团队一致性** - 将.husky目录加入版本控制
4. **文档化** - 在README中说明钩子的用途和预期行为

## 常见问题解决

1. **钩子不执行**：
   - 检查文件是否可执行：`chmod +x .husky/*`
   - 确认 husky 已安装：`npm ls husky`
   - 检查 git 版本（需要 Git 2.9+）
2. **性能问题**：
   - 使用 lint-staged 只检查暂存文件
   - 对于大型项目，考虑增量检查
3. **跨平台问题**：
   - 使用跨平台 shell 语法
   - 避免平台特定的命令

## 版本差异

- **Husky 4及以下**：使用 package.json 配置
- **Husky 5+**：使用`.husky`目录中的独立脚本文件

## 卸载 Husky

```bash 
npm uninstall husky
rm -rf .husky
# 从 package.json 中删除 prepare 脚本
```


Husky 提供了一种干净、可维护的方式来管理 Git 钩子，是现代前端工作流中不可或缺的工具，特别适合与 ESLint、Prettier、Commitlint 等工具配合使用，确保代码质量和提交规范。

[](./- -$(dirname -$0-)-_-husky.sh-/index.md)

[他是如何同lint-staged  配合的](<./他是如何同lint-staged  配合的/index.md> "他是如何同lint-staged  配合的")
