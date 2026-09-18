# 依赖树

## 目录

- [一般项目中](#一般项目中)
- [workspaces项目中](#workspaces项目中)
  - [方法 1：使用 yarn list 查看子项目的依赖树](#方法-1使用yarn-list查看子项目的依赖树)
  - [使用 yarn why 查看包为什么被安装（及版本）](#使用yarn-why查看包为什么被安装及版本)
- [workspace框架下具体依赖那个包](#workspace框架下具体依赖那个包)
  - [1. 如何判断依赖来自哪里？](#1-如何判断依赖来自哪里)
    - [方法 1：通过 yarn why 输出](#方法-1通过yarn-why输出)

# 一般项目中

```markdown 
yarn list webpack       # 检查所有 webpack 版本 
yarn why webpack

```


# workspaces项目中

```markdown 
yarn workspace info    # 查看工作区结构
```


在 **Yarn Workspaces** 项目中，如果你想查看某个子项目（workspace）**实际安装**的某个包的版本（而不是 `package.json` 中声明的版本），可以使用以下方法：

***

### **方法 1：使用 ****`yarn list`**** 查看子项目的依赖树**

```bash 
yarn workspace <workspace-name> list --pattern <package-name>
```


**示例**：查看子项目 `frontend` 中安装的 `react` 版本

```bash 
yarn workspace frontend list --pattern react
```


**输出​**​：

```markdown 
└─ react@18.2.0
```


- 这会显示 **实际安装** 的版本（可能与 `package.json` 中的 `^18.2.0` 不同）。

***

### **使用 ****`yarn why`**** 查看包为什么被安装（及版本）**

```markdown 
yarn workspace <workspace-name> why <package-name>
yarn workspace frontend why lodash



```


# workspace框架下具体依赖那个包

在 Yarn Workspaces 项目中，**子项目依赖的包可能来自两个位置**：

1. 1.**根目录的 `node_modules`**（通过 hoisting 提升的依赖）
2. 2.**子项目自身的 `node_modules`**（未提升的依赖）

以下是判断依赖来源的具体方法和解释：

### **1. 如何判断依赖来自哪里？**

#### **方法 1：通过 ****`yarn why`**** 输出**

运行以下命令：

```bash 
yarn workspace <子项目名称> why <包名>
```


**如果输出中包含 `Hoisted from`​**​：

```markdown 
info Has been hoisted to "react@18.2.0"
info Reasons this module exists:
   - Hoisted from "frontend#next#react"  # 从子项目提升到根目录
```


- \-   **结论**：该包来自 **根目录的 `node_modules`**（被 Yarn 提升）。
  - **如果输出中只有直接依赖声明**：

```markdown 
info This module exists because "frontend#webpack" depends on it.
```


**结论​**​：该包来自 ​**​子项目自身的 `node_modules`​**​（未提升）。
