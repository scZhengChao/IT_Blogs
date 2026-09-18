# prepare

## 目录

- [🔹 1.prepare的触发时机](#-1prepare的触发时机)
- [🔹 2.prepare的核心用途](#-2prepare的核心用途)
  - [✅ 1. 编译源代码](#-1-编译源代码)
  - [✅ 2. 生成类型声明文件（.d.ts）](#-2-生成类型声明文件dts)
  - [✅ 3. 打包构建](#-3-打包构建)
  - [✅ 4. 运行代码检查或格式化](#-4-运行代码检查或格式化)
  - [✅ 5. 准备构建目录](#-5-准备构建目录)
- [3.prepare与其他生命周期脚本的对比](#3prepare与其他生命周期脚本的对比)
- [4.prepare的注意事项](#4prepare的注意事项)
  - [❗ 1. 避免耗时操作](#-1-避免耗时操作)
  - [❗ 2.npm ci不会触发prepare](#-2npm-ci不会触发prepare)
  - [3. 避免副作用](#3-避免副作用)
- [🔹 5. 实际案例](#-5-实际案例)
  - [案例 1：TypeScript 库的prepare配置](#案例-1TypeScript-库的prepare配置)
  - [案例 2：React 组件库的prepare配置](#案例-2React-组件库的prepare配置)
- [6. 最佳实践](#6-最佳实践)
- [📌 总结](#-总结)

## **🔹 1.** \*\*​`prepare`\*\***的触发时机**

`prepare`在以下情况下自动执行：

1. **本地安装包时**（`npm install`或`npm install <package-name>`）
2. **发布包时**（`npm publish`）
3. **他人安装你的包时**（作为依赖被安装）

> ⚠️ **注意**：`prepare`是在`install`之后、包被实际使用之前执行的，确保包处于“就绪”状态。

***

## **🔹 2.** \*\*​`prepare`\*\***的核心用途**

### **✅ 1. 编译源代码**

如果项目使用 TypeScript、Babel 等需要编译的工具，可以在`prepare`中运行编译命令，确保安装后直接是可运行的代码。

**示例（TypeScript 项目）**：

```json 
{
  "scripts": {
    "prepare": "tsc"  // 编译 TypeScript 到 JavaScript
  }
}
```


### **✅ 2. 生成类型声明文件（****`.d.ts`****）**

为 TypeScript 库生成类型声明，方便用户获得类型提示。

**示例**：

```json 
{
  "scripts": {
    "prepare": "tsc --declaration --emitDeclarationOnly"
  }
}
```


### **✅ 3. 打包构建**

使用 Webpack、Rollup 等工具打包项目，生成最终的生产环境代码。

**示例（Webpack 项目）**：

```json 
{
  "scripts": {
    "prepare": "webpack --mode production"
  }
}
```


### **✅ 4. 运行代码检查或格式化**

在安装时自动检查代码质量或格式化代码。

```json 
{
  "scripts": {
    "prepare": "eslint . && prettier --check ."
  }
}
```


### **✅ 5. 准备构建目录**

清理旧构建产物并创建新目录。

```json 
{
  "scripts": {
    "prepare": "rimraf dist && mkdirp dist"
  },
  "devDependencies": {
    "rimraf": "^3.0.0",
    "mkdirp": "^1.0.0"
  }
}
```


## **3.** \*\*​`prepare`\*\***与其他生命周期脚本的对比**

| 脚本名称                                    | 触发时机                             | 典型用途            |
| --------------------------------------- | -------------------------------- | --------------- |
| \*\*`prepare`\*\*​                      | \`npm install\`或\`npm publish\`前 | 编译、打包、生成类型声明    |
| \*\*`prepublishOnly`\*\*​               | 仅在\`npm publish\`前               | 发布前的最后检查（如运行测试） |
| \*\*`postinstall`\*\*​                  | \`npm install\`完成后               | 安装后初始化（如设置环境变量） |
| **`prepack`** **/** \*\*`postpack`\*\*​ | 打包（\`npm pack\`）前/后              | 自定义打包逻辑         |

**关键区别**：

- `prepare`适用于**安装和发布前**的通用准备工作。
- `prepublishOnly`仅用于**发布前的专项检查**（如测试、版本校验）。

## **4.** \*\*​`prepare`\*\***的注意事项**

### **❗ 1. 避免耗时操作**

`prepare`会在每次`npm install`时运行，如果脚本执行时间过长（如大型项目编译），会拖慢安装速度。

**优化方案**：

- 使用增量编译（如`tsc --incremental`）。
- 仅在必要时运行检查（如通过环境变量控制）。

### **❗ 2.`npm ci`****不会触发****`prepare`**

`npm ci`（用于 CI/CD）会跳过`prepare`，因为它假设依赖已经是最终状态。如果依赖`prepare`生成文件，需在 CI 中显式运行构建命令。

### **3. 避免副作用**

`prepare`不应修改用户环境（如写入全局配置），因为它可能在不知情的情况下执行。

## **🔹 5. 实际案例**

### **案例 1：TypeScript 库的**\*\*`prepare`\*\***配置**

```json 
{
  "name": "my-ts-library",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "prepare": "tsc --declaration",
    "build": "tsc --declaration",
    "dev": "tsc --watch"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```


**说明**：

- `prepare`确保安装时自动编译代码和生成类型声明。
- 用户无需手动运行`build`，直接`npm install`即可使用。

### **案例 2：React 组件库的**\*\*`prepare`\*\***配置**

```json 
{
  "scripts": {
    "prepare": "npm run build",
    "build": "vite build",
    "dev": "vite"
  }
}
```


## **6. 最佳实践**

1. **轻量化**\*\*`prepare`\*\*：仅包含必要的构建或检查逻辑。
2. **明确文档说明**：在`README`中告知用户`prepare`的作用。
3. **结合**\*\*`prepublishOnly`\*\*：发布前运行测试或版本检查。

```json 
{
  "scripts": {
    "prepare": "npm run build",
    "prepublishOnly": "npm test"
  }
}
```


​**​4. 跨平台兼容性​**​：使用`rimraf`（替代`rm -rf`）和`cross-env`（环境变量）等工具

## **📌 总结**

| 特性        | 说明                               |
| --------- | -------------------------------- |
| **触发时机**​ | \`npm install\`或\`npm publish\`前 |
| **核心用途**​ | 编译代码、生成类型声明、打包、检查代码              |
| **优势**​   | 自动化准备工作，提升用户体验                   |
| **注意事项**​ | 避免耗时操作，\`npm ci\`不触发，保持轻量        |

如果你的项目需要编译或预处理，`prepare`是一个强大的工具，能确保包在安装后“开箱即用”。根据项目需求合理使用，可以显著提升开发效率和用户体验！ 🚀
