# **@commitlint/cli**&#x20;

## 目录

- [核心组件](#核心组件)
- [安装与配置](#安装与配置)
  - [1. 安装依赖](#1-安装依赖)
  - [2. 初始化 husky](#2-初始化-husky)
  - [3. 添加 commitlint 配置](#3-添加-commitlint-配置)
  - [4. 添加 husky 钩子](#4-添加-husky-钩子)
- [提交信息规范](#提交信息规范)
  - [常用 type 类型](#常用-type-类型)
  - [示例](#示例)
- [自定义配置](#自定义配置)
- [生态系统扩展](#生态系统扩展)
- [常见问题解决](#常见问题解决)

`@commitlint/cli`是一个用于**校验 Git 提交信息的工具，它可以帮助团队遵循一致的提交信息格式规范。**

## 核心组件

1. **@commitlint/cli** - 命令行工具，用于校验提交信息
2. **@commitlint/config-conventional** - 基于 Angular 提交规范的预设配置
3. **husky** - Git 钩子工具，用于在提交前自动运行校验

## 安装与配置

### 1. 安装依赖

```bash 
npm install --save-dev @commitlint/cli @commitlint/config-conventional husky
```


### 2. 初始化 husky

```bash 
npx husky-init && npm install
```


### 3. 添加 commitlint 配置

创建`commitlint.config.js`文件：

```javascript 
module.exports = {
  extends: ['@commitlint/config-conventional']
};

```


### 4. 添加 husky 钩子

```bash 
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit ${1}'
```


## 提交信息规范

默认使用 Angular 提交规范，格式为：

```markdown 
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```


### 常用 type 类型

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档变更
- `style`: 代码格式变更
- `refactor`: 重构代码
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变更

### 示例

```markdown 
feat(login): add remember me checkbox

Add a remember me checkbox to the login form to allow users to stay logged in longer.

Closes #123
```


## 自定义配置

可以修改`commitlint.config.js`来自定义规则：

```javascript 
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'revert'
    ]],
    'subject-case': [2, 'always', 'sentence-case'],
    'header-max-length': [2, 'always', 72]
  }
};
```


## 生态系统扩展

1. **自定义配置包** - 可以创建自己的配置包并发布
2. **@commitlint/prompt** - 交互式 CLI 工具，帮助生成合规的提交信息
3. **commitlint-plugin** - 可以编写自定义插件扩展功能

## 常见问题解决

1. **跳过验证**：使用`git commit --no-verify`跳过验证（不推荐）
2. **配置不生效**：检查 husky 钩子文件是否可执行（`chmod +x .husky/commit-msg`）
3. **错误信息不明确**：使用`--verbose`标志获取更多信息
