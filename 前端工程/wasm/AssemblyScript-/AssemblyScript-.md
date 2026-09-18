# `AssemblyScript `

## 目录

- [AssemblyScript 使用说明及完整示例](#AssemblyScript-使用说明及完整示例)
- [1. 安装 AssemblyScript](#1-安装-AssemblyScript)
- [2. 初始化 AssemblyScript 项目](#2-初始化-AssemblyScript-项目)
- [3. 编写 AssemblyScript 代码](#3-编写-AssemblyScript-代码)
- [4. 编译为 Wasm](#4-编译为-Wasm)
- [5. 在 Node.js 中加载 Wasm](#5-在-Nodejs-中加载-Wasm)
- [6. 运行项目](#6-运行项目)
- [7. 高级用法](#7-高级用法)
  - [7.1 传递字符串到 Wasm](#71-传递字符串到-Wasm)
  - [7.2 导出内存](#72-导出内存)
- [8. 常见问题](#8-常见问题)
  - [Q1: 如何调试 AssemblyScript 代码？](#Q1-如何调试-AssemblyScript-代码)
  - [Q2: 如何优化 Wasm 大小？](#Q2-如何优化-Wasm-大小)
  - [Q3: 如何在浏览器中使用？](#Q3-如何在浏览器中使用)
- [9. 完整项目结构](#9-完整项目结构)
- [10. 总结](#10-总结)

### **AssemblyScript 使用说明及完整示例**

AssemblyScript 是一种类似 TypeScript 的语言，专门编译为 WebAssembly (Wasm)，适合在 Node.js 或浏览器中运行高性能计算逻辑。以下是详细的使用说明和完整示例。

***

## **1. 安装 AssemblyScript**

首先全局安装`assemblyscript`编译器：

```bash 
npm install -g assemblyscript
```


验证安装：

```bash 
asc --version
```


输出类似`0.20.19`即表示安装成功。

***

## **2. 初始化 AssemblyScript 项目**

创建一个新目录并初始化项目：

```markdown 
mkdir my-as-project && cd my-as-project
npm init -y
npm install --save-dev assemblyscript
```


或使用官方脚手架（推荐）：

```bash 
npx create-assemblyscript-app my-as-project
cd my-as-project
```


## **3. 编写 AssemblyScript 代码**

在`assembly/index.ts`中编写代码（默认入口文件）：

```typescript 
// assembly/index.ts
export function add(a: i32, b: i32): i32 {
  return a + b;
}

export function greet(name: string): string {
  return "Hello, " + name + "!";
}

```


## **4. 编译为 Wasm**

运行以下命令编译为`.wasm`文件：

```typescript 
npx asc assembly/index.ts -o build/optimized.wasm
```


参数说明：

- `-o build/optimized.wasm`：指定输出路径（默认生成`build/untouched.wasm`）。
- `--optimize`：启用优化（可省略，`asc`默认会优化）。

## **5. 在 Node.js 中加载 Wasm**

创建`index.js`文件：

```javascript 
const fs = require('fs');
const path = require('path');

// 读取 Wasm 文件
const wasmPath = path.resolve(__dirname, 'build', 'optimized.wasm');
const wasmBuffer = fs.readFileSync(wasmPath);

// 加载 Wasm
WebAssembly.instantiate(wasmBuffer, {
  env: {
    // 如果 Wasm 需要宿主函数，可以在这里注入
  }
})
.then(({ instance }) => {
  const { add, greet } = instance.exports;

  // 调用 Wasm 函数
  console.log("2 + 3 =", add(2, 3)); // 输出: 5
  console.log(greet("World"));      // 输出: "Hello, World!"
});
```


## **6. 运行项目**

```javascript 
node index.js
```


预期输出：

```markdown 
2 + 3 = 5
Hello, World!
```


## **7. 高级用法**

### **7.1 传递字符串到 Wasm**

AssemblyScript 中的字符串需要特殊处理（因为 Wasm 只支持`i32`/`i64`/`f32`/`f64`）：

```typescript 
// assembly/index.ts
export function concat(a: string, b: string): string {
  return a + b;
}
```


在 Node.js 中调用时，需手动处理字符串转换（AssemblyScript 会自动处理，但需确保内存正确分配）。

### **7.2 导出内存**

如果 Wasm 需要操作内存，可以导出内存对象：

```typescript 
// assembly/index.ts
export const memory: WebAssembly.Memory;

export function writeMemory(offset: i32, value: i32): void {
  const ptr = memory.buffer as ArrayBuffer;
  new Uint32Array(ptr)[offset / 4] = value; // 注意字节对齐
}
```


在 Node.js 中：

```javascript 
const { memory, writeMemory } = instance.exports;
writeMemory(0, 42); // 在内存偏移 0 处写入 42
```


## **8. 常见问题**

### **Q1: 如何调试 AssemblyScript 代码？**

- 使用`asc --debug`生成带调试信息的 Wasm。
- 在 Chrome DevTools 中调试（需启用 Wasm 调试支持）。

### **Q2: 如何优化 Wasm 大小？**

- 使用`--optimize`编译选项。
- 移除未使用的代码（Tree Shaking）。

### **Q3: 如何在浏览器中使用？**

将 Wasm 文件放入`public`目录，通过`fetch`加载：

```javascript 
fetch('optimized.wasm')
  .then(response => response.arrayBuffer())
  .then(bytes => WebAssembly.instantiate(bytes))
  .then(({ instance }) => {
    // 使用 instance.exports
  });
```


## **9. 完整项目结构**

```typescript 
my-as-project/
├── assembly/          # AssemblyScript 源码
│   └── index.ts       # 主逻辑
├── build/             # 编译输出
│   └── optimized.wasm # 生成的 Wasm 文件
├── index.js           # Node.js 加载逻辑
└── package.json
```


## **10. 总结**

- **AssemblyScript** 是 TypeScript 的子集，编译为 Wasm，适合高性能计算。
- **编译命令**：`asc input.ts -o output.wasm`。
- **Node.js 加载**：通过`WebAssembly.instantiate`加载`.wasm`文件。
- **适用场景**：游戏引擎、图像处理、加密算法等。

如果需要更复杂的示例（如内存操作、多线程），可以进一步扩展！
