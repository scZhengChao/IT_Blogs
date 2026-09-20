# @changesets/cli&#x20;

## 目录

- [核心功能](#核心功能)
- [安装与初始化](#安装与初始化)
  - [1. 安装依赖](#1-安装依赖)
  - [2. 初始化配置](#2-初始化配置)
- [基础使用步骤](#基础使用步骤)
  - [1. 添加变更集](#1-添加变更集)
  - [2. 生成版本更新](#2-生成版本更新)
  - [3. 发布变更](#3-发布变更)
- [配置文件详解](#配置文件详解)
  - [关键配置项](#关键配置项)
- [高级功能](#高级功能)
  - [1. 固定版本包组](#1-固定版本包组)
  - [2. 联动版本包组](#2-联动版本包组)
  - [3. 自定义变更日志生成器](#3-自定义变更日志生成器)

`@changesets/cli`是一个用于管理 **Monorepo 项目版本和变更日志的工具，特别适合多包管理的场景**。以下是完整的使用步骤和生态集成方法。

## 核心功能

1. **版本管理**：自动化多包版本升级
2. **变更日志**：生成标准化的变更日志（CHANGELOG）
3. **依赖联动**：自动更新依赖包的版本号
4. **发布流程**：简化多包发布过程

## 安装与初始化

### 1. 安装依赖

```bash 
npm install --save-dev @changesets/cli
```


### 2. 初始化配置

```bash 
npx changeset init
```


这会生成：

- `.changeset`目录
- `config.json`配置文件

## 基础使用步骤

### 1. 添加变更集

```bash 
npx changeset
```


交互式流程会：

1. 选择要更新的包
2. 选择版本更新类型（major/minor/patch）
3. 输入变更描述

### 2. 生成版本更新

```markdown 
npx changeset version
```


这会：

- 根据变更集更新包版本
- 更新依赖关系
- 生成变更日志文件

### 3. 发布变更

```bash 
npx changeset publish
```


## 配置文件详解

默认生成的`.changeset/config.json`：

```json 
{
  "$schema": "https://unpkg.com/@changesets/config@2.3.0/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "restricted",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": []
}
```


### 关键配置项

| 配置项            | 说明        | 示例值                             |
| -------------- | --------- | ------------------------------- |
| \`changelog\`  | 变更日志生成方式  | \`"@changesets/cli/changelog"\` |
| \`access\`     | 发布权限      | \`public\`/\`restricted\`       |
| \`baseBranch\` | 主分支名称     | \`"main"\`                      |
| \`fixed\`      | 强制同步版本的包组 | \`\[\["pkg-a", "pkg-b"]]\`      |
| \`linked\`     | 联动版本的包组   | \`\[\["pkg-c", "pkg-d"]]\`      |

## 高级功能

### 1. 固定版本包组

```json 
{
  "fixed": [
    ["@scope/pkg-a", "@scope/pkg-b"]
  ]
}
```


这些包会始终保持相同版本号。

### 2. 联动版本包组

```json 

{
  "linked": [
    ["@scope/pkg-c", "@scope/pkg-d"]
  ]
}

```


这些包会同步更新版本号，但允许不同版本。

### 3. 自定义变更日志生成器

1. 安装自定义生成器：

```bash 
npm install --save-dev @changesets/changelog-git
```


1. 修改配置：

```json 
{
  "changelog": "@changesets/changelog-git"
}
```
