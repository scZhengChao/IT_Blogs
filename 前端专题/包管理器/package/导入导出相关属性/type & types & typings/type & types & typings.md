# type & types & typings

## 目录

- [type](#type)
- [types](#types)
  - [核心作用](#核心作用)
  - [示例配置](#示例配置)
  - [关键细节](#关键细节)

# type

js的模块化规范包含了commonjs、CMD、UMD、AMD和ES module等，最早先在node中支持的仅仅是commonjs字段，但是从node13.2.0开始后，node正式支持了ES module规范，在package.json中可以通过type字段来声明npm包遵循的模块化规范。

- `type`字段的产生用于定义`package.json`文件和**该文件所在目录根目录中.js文件和无拓展名文件的处理方式**。
  - 值为’moduel’则当作es模块处理；
  - 值为’commonjs’则被当作commonJs模块处理
- 目前node默认的是如果pacakage.json**没有定义type字段，则按照commonJs规范处理**
- node官方建议包的开发者明确指定package.json中type字段的值
- **无论package.json中的type字段为何值，.mjs的文件都按照es模块来处理，.cjs的文件都按照commonJs模块来处理**

# types

在 `package.json` 文件中，`types` 字段是 TypeScript 项目中的一个重要配置项，用于指定该 npm 包的​**​类型声明文件（.d.ts）的入口路径​**​。它的作用类似于 `main` 字段（指定 JavaScript 入口），但专门用于类型定义。

指定 TypeScript 的类型定义的入口文件

```typescript 
"types": "./index.d.ts",
```


### **核心作用**

1. **为 TypeScript 提供类型支持** &#x20;

   当其他**开发者安装你的包并在 TypeScript 项目中使用时，编译器会根据 ****`types`**** 字段指向的声明文件来获取类型提示和类型检查。**
2. **替代 ****`typings`**** 字段** &#x20;

   **`types`**\*\* 和 ****`typings`**** 功能相同（后者是早期名称），现代项目推荐使用 ****`types`****。\*\*

### **示例配置**

```json 
{
  "name": "my-package",
  "version": "1.0.0",
  "main": "dist/index.js",       // JavaScript 入口文件
  "types": "dist/index.d.ts",    // 类型声明文件入口
  "typings": "dist/index.d.ts"   // 作用相同（可选）
}
```


### **关键细节**

1. **文件要求**
   - 指定的路径必须指向一个 `.d.ts` 声明文件（通常由 TypeScript 编译生成）。
   - 如果包本身用 JavaScript 编写但无类型，可以省略 `types`，但用户需手动安装 `@types/your-package`（如果社区有提供）。
2. **优先级规则**
   - **如果 ****`types`**** 和 ****`typings`**** 同时存在，****`types`**** 优先级更高。**
   - 如果未指定 `types`，TypeScript 会尝试查找：
     - `./index.d.ts`
     - `@types/your-package` 中的类型定义。
3. **与 ****`exports`**** 的配合** &#x20;

   在较新的 Node.js 版本中，可以通过 `exports` 字**段更精细地控制类型路径：**

```json 
{
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"  // 独立指定类型路径
    }
  }
}
```
