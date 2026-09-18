# yarn install --frozen-lockfile

## 目录

- [1. 核心作用](#1-核心作用)
- [2. 适用场景](#2-适用场景)
- [3. 对比其他命令](#3-对比其他命令)
- [4. 常见问题](#4-常见问题)
  - [Q1: 报错时如何解决？](#Q1-报错时如何解决)
  - [Q2: 为什么 CI 中推荐使用？](#Q2-为什么-CI-中推荐使用)
  - [Q3: 与 npm ci 的区别？](#Q3-与npm-ci的区别)
- [5. 示例流程](#5-示例流程)
- [总结](#总结)

### **1. 核心作用**

- **禁止自动更新 ****`yarn.lock`**** 文件** &#x20;

  如果 `package.json` 中的依赖版本与 `yarn.lock` 记录的不一致，直接报错（而非自动更新 lockfile）。
- **确保依赖版本完全锁定** &#x20;

  强制所有依赖版本必须与 `yarn.lock` 完全一致，避免意外升级依赖。

### **2. 适用场景**

- **CI/CD 环境**（如 GitHub Actions、Jenkins） &#x20;

  确保生产环境与开发环境的依赖版本严格一致，避免构建失败。
- **团队协作** &#x20;

  防止成员因本地自动更新 `yarn.lock` 导致版本冲突。
- **发布前验证** &#x20;

  检查 `package.json` 和 `yarn.lock` 是否同步。

### **3. 对比其他命令**

| 命令                                 | 行为                                           | 适用场景    |
| ---------------------------------- | -------------------------------------------- | ------- |
| \`yarn install\`                   | 自动更新 \`yarn.lock\`（如果 \`package.json\` 允许更新） | 日常开发    |
| \`yarn install --frozen-lockfile\` | 禁止更新 \`yarn.lock\`，版本不匹配时报错                  | 生产环境/CI |
| \`yarn install --pure-lockfile\`   | 不更新 \`yarn.lock\`，但不会报错（兼容旧版 Yarn）           | 过渡方案    |

### **4. 常见问题**

#### **Q1: 报错时如何解决？**

- **错误示例**：

```bash 
error Your lockfile needs to be updated, but yarn was run with --frozen-lockfile
```


- **修复方法**：
  1. 本地运行 `yarn install`（无 `--frozen-lockfile`）自动更新 `yarn.lock`。
  2. 提交更新后的 `yarn.lock` 到代码库。

#### **Q2: 为什么 CI 中推荐使用？**

- **避免隐式依赖升级**：CI 环境需要完全可预测的构建，自动更新 lockfile 可能导致生产环境与测试环境不一致。

#### **Q3: 与 ****`npm ci`**** 的区别？**

- `npm ci`：删除 `node_modules` 后严格安装（类似 `yarn --frozen-lockfile`）。
- `yarn --frozen-lockfile`：不删除 `node_modules`，仅校验版本。

### **5. 示例流程**

```markdown 
# 1. 本地开发（允许更新 lockfile）
yarn install

# 2. CI 环境（禁止更新 lockfile）
yarn install --frozen-lockfile

# 3. 如果报错，本地修复后重新提交 lockfile
git add yarn.lock
git commit -m "chore: update yarn.lock"
```


### **总结**

- **`--frozen-lockfile`**\*\* = 依赖版本严格锁死\*\*，适合生产环境。
- **日常开发用 `yarn install`**，CI 用 `--frozen-lockfile`。
- 报错时需手动更新 `yarn.lock` 并提交。
