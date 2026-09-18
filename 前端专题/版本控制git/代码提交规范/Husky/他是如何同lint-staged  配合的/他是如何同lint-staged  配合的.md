# 他是如何同lint-staged  配合的

## 目录

- [1. 协作原理](#1-协作原理)
- [2. 具体配置步骤](#2-具体配置步骤)
  - [(1) 安装依赖](#1-安装依赖)
  - [(2) 初始化 Husky](#2-初始化-Husky)
  - [(3) 修改 Husky 的pre-commit钩子](#3-修改-Husky-的pre-commit钩子)
  - [(4) 配置lint-staged](#4-配置lint-staged)
- [3. 协作优势](#3-协作优势)
- [4. 实际执行示例](#4-实际执行示例)

Husky 和`lint-staged`的配合是现代前端工作流中的黄金组合，它们共同实现了​**​****只对暂存区文件进行自动化校验****​**​的高效流程。以下是它们的协作机制和具体配合方式：

### 1. **协作原理**

| 工具               | 职责                                                    | 触发时机              |
| ---------------- | ----------------------------------------------------- | ----------------- |
| **Husky**​       | **管理 Git 钩子，在特定 Git 操作（如提交）时触发自定义脚本**​                | \`git commit\`执行前 |
| **lint-staged**​ | 只\*\*针对 Git 暂存区（staged）的文件运行指定的 lint/formatter 命令\*\* | 被 Husky 钩子调用时     |

**工作流程**：
`git commit`→ Husky 触发`pre-commit`钩子 → 调用`lint-staged`→ 仅检查暂存区文件 → 通过后完成提交

### 2. **具体配置步骤**

#### (1) 安装依赖

```bash 
npm install --save-dev husky lint-staged
```


#### (2) 初始化 Husky

```bash 
npx husky-init && npm install
```


#### (3) 修改 Husky 的`pre-commit`钩子

编辑`.husky/pre-commit`文件，使其调用`lint-staged`：

```bash 
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged  # 关键调用
```


#### (4) 配置`lint-staged`

在`package.json`中定义针对不同文件类型的校验规则：

```json 
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",       // 自动修复 ESLint 错误
      "prettier --write"    // 自动格式化代码
    ],
    "*.{css,scss}": [
      "stylelint --fix",
      "prettier --write"
    ],
    "*.md": [
      "prettier --write"
    ]
  }
}
```


### 3. **协作优势**

| 特性         | 说明                                          |
| ---------- | ------------------------------------------- |
| **精准校验**​  | 只处理\`git add\`过的文件，避免全量检查耗时                 |
| **原子性修复**​ | 自动修复的问题会重新暂存到 Git，确保提交的是修复后的代码              |
| **并行执行**​  | 对不同文件类型可并行运行不同命令（如 ESLint 和 Stylelint 同时执行） |
| **失败阻断**​  | 如果校验失败，Husky 会阻止提交，避免有问题的代码进入仓库             |

***

### 4. **实际执行示例**

假设你修改了 2 个 JS 文件和 1 个 CSS 文件，但只暂存了其中 1 个 JS 文件：

```bash 
git add src/utils.js  # 只暂存这一个文件
git commit -m "feat: update utils"
```


此时：

1. Husky 触发`pre-commit`钩子
2. `lint-staged`**仅对**\*\*`src/utils.js`\*\* 运行配置的 ESLint 和 Prettier
3. 如果校验通过 → 完成提交 &#x20;

   如果校验失败 → 终止提交并报错
