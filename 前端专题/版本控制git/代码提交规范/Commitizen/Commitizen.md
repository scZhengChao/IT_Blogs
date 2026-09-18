# Commitizen

## 目录

- [核心组件](#核心组件)
- [安装与配置](#安装与配置)
  - [1. 基本安装](#1-基本安装)
  - [2. 配置 package.json](#2-配置-packagejson)
  - [3. 添加脚本命令](#3-添加脚本命令)
- [基本使用](#基本使用)
  - [交互式提交](#交互式提交)
  - [直接全局安装使用（可选）](#直接全局安装使用可选)
- [自定义配置](#自定义配置)
  - [使用 cz-customizable](#使用-cz-customizable)
  - [使用 cz-emoji (支持表情符号)](#使用-cz-emoji-支持表情符号)
- [与 Husky 和 Commitlint 集成](#与-Husky-和-Commitlint-集成)
  - [1. 安装所有依赖](#1-安装所有依赖)
  - [2. 配置 package.json](#2-配置-packagejson)
  - [3. 创建 commitlint.config.js](#3-创建-commitlintconfigjs)

Commitizen **是一个交互式工具**，**用于生成符合规范的 Git 提交信息，特别适合与 commitlint 配合使用**。以下是详细的使用方法。

## 核心组件

1. **commitizen** - 主工具包，提供交互式提交界面
2. **cz-conventional-changelog** - 适配 Angular 提交规范的适配器
3. **cz-customizable** - 允许自定义提交规范的适配器
4. **cz-emoji** - 支持 emoji 的提交规范适配器

## 安装与配置

### 1. 基本安装

```markdown 
npm install --save-dev commitizen cz-conventional-changelog
```


### 2. 配置 package.json

```json 
{
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  }
}
```


或者创建`.czrc`文件：

```json 
{
  "path": "cz-conventional-changelog"
}
```


### 3. 添加脚本命令

```json 
{
  "scripts": {
    "commit": "git-cz"
  }
}
```


## 基本使用

### 交互式提交

```bash 
npm run commit
# 或
npx git-cz
```


### 直接全局安装使用（可选）

```javascript 
npm install -g commitizen
git cz
```


## 自定义配置

### 使用 cz-customizable

1. 安装：

```bash 
npm install --save-dev cz-customizable
```


1. 修改 package.json 配置：

```json 
{
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-customizable"
    }
  }
}
```


1. 创建配置文件`.cz-config.js`：

```javascript 
module.exports = {
  types: [
    { value: 'feat', name: 'feat:     新功能' },
    { value: 'fix', name: 'fix:      修复bug' },
    { value: 'docs', name: 'docs:     文档变更' },
    { value: 'style', name: 'style:    代码格式变更' },
    { value: 'refactor', name: 'refactor: 代码重构' },
    { value: 'perf', name: 'perf:     性能优化' },
    { value: 'test', name: 'test:     测试相关' },
    { value: 'chore', name: 'chore:    构建或辅助工具变更' },
    { value: 'revert', name: 'revert:   回退提交' }
  ],
  scopes: [
    { name: 'login' },
    { name: 'dashboard' },
    { name: 'api' }
  ],
  messages: {
    type: '选择提交类型:',
    scope: '选择影响范围 (可选):',
    subject: '简短描述 (最多72个字符):',
    body: '详细描述 (可选). 使用 "|" 换行:\n',
    confirmCommit: '确认提交?'
  },
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix']
};
```


### 使用 cz-emoji (支持表情符号)

1. 安装

```bash 
npm install --save-dev cz-emoji
```


1. 配置：

```json 
{
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-emoji"
    }
  }
}
```


## 与 Husky 和 Commitlint 集成

### 1. 安装所有依赖

```bash 
npm install --save-dev commitizen cz-conventional-changelog @commitlint/cli @commitlint/config-conventional husky
```


### 2. 配置 package.json

```json 
{
  "scripts": {
    "commit": "git-cz"
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  },
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```


### 3. 创建 commitlint.config.js

```javascript 
module.exports = {
  extends: ['@commitlint/config-conventional']
};
```
