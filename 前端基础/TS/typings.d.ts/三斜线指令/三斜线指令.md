# 三斜线指令

## 目录

- [解释一](#解释一)
  - [/// \<reference types="..." />](#-reference-types-)
  - [/// \<reference path="JQueryStatic.d.ts" />](#-reference-pathJQueryStaticdts-)
- [解释二](#解释二)
  - [/// \<reference path="..." />](#-reference-path-)
    - [预处理输入文件](#预处理输入文件)
    - [错误](#错误)
    - [使用--noResolve](#使用--noResolve)
  - [/// \<reference types="..." />](#-reference-types-)
  - [/// \<reference no-default-lib="true"/>](#-reference-no-default-libtrue)
  - [/// \<amd-module />](#-amd-module-)
    - [amdModule.ts](#amdModulets)
    - [amdModule.js](#amdModulejs)
- [AI](#AI)
  - [主要三斜线指令类型](#主要三斜线指令类型)
    - [1./// \<reference path="..." />](#1-reference-path-)
    - [2./// \<reference types="..." />](#2-reference-types-)
    - [3./// \<reference lib="..." />](#3-reference-lib-)
  - [使用场景与最佳实践](#使用场景与最佳实践)
    - [1. 全局声明文件](#1-全局声明文件)
    - [2. 模块声明](#2-模块声明)
    - [3. 现代替代方案](#3-现代替代方案)
  - [注意事项](#注意事项)
  - [现代替代方案](#现代替代方案)

# 解释一

其实三斜线指令在是 TS 在早期版本中为了描述**多个模块之间的相互依赖关系产生的语法**。

目前，随着 ESM 模块语法的推广，官方也不再建议使用三斜线指令来声明模块依赖了。

但是目前来说**三斜线指令的存在仍然有它独特的作用**，接下来我们一起来看看。

### `/// <reference types="..." />`

所谓 `/// <reference types="..." />` 是三斜线指令的一种声明方式，这个**指令是用来声明依赖的**。

表示该声明文件依赖了 `types='...'` 中对于 `...` 的依赖，**在进行了上述的声明后**我们就可以在\*\*自己的声明文件中使用`types='...'`\*\***中声明的变量了。**

比如：

```typescript 
/// <reference types="jquery" />

```


上述代码中，我们在声明文件的开头使用了三斜线指令。那么此时我们就可以在接下来的文件中使用 `jquery`\*\* 声明文件中声明的变量了。\*\* ​

比如 `jquery` 中声明了对应的 `declare namespace JQuery` ，那么我们同样可以在自己的声明文件中使用这个依赖:

```typescript 
/// <reference types="jquery" />

declare function foo(options: JQuery.AjaxSettings): string;

```


通常，我们可以利用三斜线指令的 `types` 来**声明对于全局变量的依赖**，**从而避免使用**\*\*`import`\*\***语句将声明文件变为局部模块。**

主要特别注意的是，如果使用了三斜线指令引入一个模块时，比如：

```typescript 
/// <reference types="axios" />
```


因为 Axios 是一个模块，所以我们**无法直接****在声明文件中使用****任何模块内部声明的变量**。

之所以上边的用例能通过三斜线指令正常的使用 `JQuery` 全局变量，是**因为在 ****`jquery`**** 的声明文件中声明了全局的 ****`namespcae JQuery`****。**

### `/// <reference path="JQueryStatic.d.ts" />`

**当我们的****全局变量的声明文件太大时****，同样我们可以通过三斜线指令将该****声明文件拆分为多个文件****。**

然后在一个入口文件中将它们一一引入，来提高代码的可维护性。

比如 `jQuery` 的声明文件就是这样：

```typescript 
// node_modules/@types/jquery/index.d.ts

/// <reference types="sizzle" />
/// <reference path="JQueryStatic.d.ts" />
/// <reference path="JQuery.d.ts" />
/// <reference path="misc.d.ts" />
/// <reference path="legacy.d.ts" />

export = jQuery;

```


其中用到了 `types` 和 `path` 两种不同的指令。**它们的区别是**\*\*：****`types`**** ****用于声明对另一个库的依赖****，而 ****`path`**** 用于****声明对另一个文件的依赖****。\*\*

> **同时需要额外留意的是，在使用 path 进行文件拆分时每个单独的文件都是一个独立的文件模块系统**。

比如上述的 JQuery 声明文件中，我们可以明显的看到 `export = jQuery` 在最终将 `JQuery` 以 CJS 的形式进行了导出，表示它是一个模块。

但是由于 `/// <reference path="misc.d.ts" />` 模块文件中**声明了全局的 namespace** `JQuery`。

所以我们在代码中才可以正常的使用 `JQuery` 这个全局变量。

简单来说 `jquery` 根声明文件是一个模块，而它内部使用的三斜线指令引入的 `/// <reference path="misc.d.ts" />` 并非是**一个模块而是声明了一个全局命名空间**。

所以三斜线指令并不会**引入入口是模块文件**(用到了export变成模块了)，而将依赖的模块也变为模块声明。

# 解释二

三斜线指令是包含单个XML标签的单行注释。 注释的内容会做为编译器指令使用。

三斜线**指令*****仅*****可放在包含它的文件的最顶端**。 一个三斜线指令的前面**只能出现单行或多行注释**，这**包括其它的三斜线指令**。 如果它们出现在一个语句或声明之后，那么它们会被当做普通的单行注释，并且不具有特殊的涵义。

## `/// <reference path="..." />`

`/// <reference path="..." />`指令是三斜线指令中最常见的一种。 它用于**声明文件间**的*依赖*。

三斜线引用告诉编译器在编译过程中要引入的额外的文件。

当使用`--out`或`--outFile`时，它也可以做为调整输出内容顺序的一种方法。 文件在输出文件内容中的位置与经过预处理后的输入顺序一致。

### 预处理输入文件

编译器会对输入文件进行预处理来解析所有三斜线引用指令。 在这个过程中，额外的文件会加到编译过程中。

这个过程会以一些*根文件*开始； 它们是在命令行中指定的文件或是在`tsconfig.json`中的`"files"`列表里的文件。 这些根文件按指定的顺序进行预处理。 在一个文件被加入列表前，它包含的所有三斜线引用都要被处理，还有它们包含的目标。 三斜线引用以它们在文件里出现的顺序，**使用深度优先的方式解析。**

一个三斜线引用路径是相对于包含它的文件的，如果不是根文件。

### 错误

引用不存在的文件会报错。 一个文件用三斜线指令引用自己会报错。

### 使用`--noResolve`

如果指定了`--noResolve`编译选项，三斜线引用会被忽略；它们不会增加新文件，也不会改变给定文件的顺序。

## `/// <reference types="..." />`

与`/// <reference path="..." />`指令相似，这个指令**是用来声明*****依赖*****的**； 一个`/// <reference types="..." />`指令则声明了对某个包的依赖。

对这些包的名字的解析与在`import`语句里对模块名的解析类似。 可以简单地把三斜线类型引用指令当做`import`声明的包。

例如，把`/// <reference types="node" />`引入到声明文件，**表明这个文件使用了**\*\*`@types/node/index.d.ts`\*\***里面声明的名字；** 并且，这个包需要在编译阶段与声明文件一起被包含进来。

仅当在你需要写一个`d.ts`文件时才使用这个指令。

对于那些在编译阶段生成的声明文件，编译器会自动地添加`/// <reference types="..." />`；***当且仅当*****结果文件中使用了引用的包里的声明时**才会在生成的声明文件里添加`/// <reference types="..." />`语句。

若要在`.ts`文件里声明一个对`@types`包的依赖，使用`--types`命令行选项或在`tsconfig.json`里指定。 查看[在](https://www.tslang.cn/docs/handbook/tsconfig-json.html#types-typeroots-and-types "在")[tsconfig.json](https://www.tslang.cn/docs/handbook/tsconfig-json.html#types-typeroots-and-types "tsconfig.json")[里使用](https://www.tslang.cn/docs/handbook/tsconfig-json.html#types-typeroots-and-types "里使用")[@types](https://www.tslang.cn/docs/handbook/tsconfig-json.html#types-typeroots-and-types "@types")[，](https://www.tslang.cn/docs/handbook/tsconfig-json.html#types-typeroots-and-types "，")[typeRoots](https://www.tslang.cn/docs/handbook/tsconfig-json.html#types-typeroots-and-types "typeRoots")[和](https://www.tslang.cn/docs/handbook/tsconfig-json.html#types-typeroots-and-types "和")[types](https://www.tslang.cn/docs/handbook/tsconfig-json.html#types-typeroots-and-types "types")了解详情。

## `/// <reference no-default-lib="true"/>`

这个指令把一个文件标记成*默认库*。 你会在`lib.d.ts`文件和它不同的变体的顶端看到这个注释。

这个指令告诉编译器在编译过程中*不要*包含这个默认库（比如，`lib.d.ts`）。 这与在命令行上使用`--noLib`相似。

还要注意，当传递了`--skipDefaultLibCheck`时，编译器只会忽略检查带有`/// <reference no-default-lib="true"/>`的文件。

## `/// <amd-module />`

默认情况下生成的AMD模块都是匿名的。 但是，当一些工具需要处理生成的模块时会产生问题，比如`r.js`。

`amd-module`指令允许给编译器传入一个可选的模块名：

##### amdModule.ts

```typescript 
///<amd-module name='NamedModule'/>
export class C {
}
```


这会将`NamedModule`传入到AMD`define`函数里：

##### amdModule.js

```javascript 
define("NamedModule", ["require", "exports"], function (require, exports) {
    var C = (function () {
        function C() {
        }
        return C;
    })();
    exports.C = C;
});
```


# AI

三斜线指令是 TypeScript 中一种特殊的注释指令，用于声明文件间的依赖关系。它们以`///`开头，后面跟着特定的 XML 标签。

## 主要三斜线指令类型

### 1.`/// <reference path="..." />`

**作用**：声明文件间的依赖关系

```typescript 
/// <reference path="./otherFile.ts" />
```


**特点**：

- 用于告诉编译器在编译过程中包含指定的文件
- 路径是相对于当前文件的
- 在全局声明文件中常见（如`*.d.ts`文件）

### 2.`/// <reference types="..." />`

**作用**：声明对某个类型定义包的依赖

```typescript 
/// <reference types="node" />
```


**特点**：

- 用于引入 DefinitelyTyped 类型定义
- **类似于**\*\*`import`\*\***语句，但用于类型声明文件**
- 常用于`.d.ts`文件中引用其他类型定义

### 3.`/// <reference lib="..." />`

**作用**：显式包含内置库文件

```typescript 
/// <reference lib="es2015" />
```


**特点**：

- 用于包含特定的内置库（如 ES5、ES2015、DOM 等）
- 替代了`--lib`编译器选项在文件级别的控制

## 使用场景与最佳实践

### 1. 全局声明文件

在`.d.ts`文件中声明全局类型时常用：

```typescript 
/// <reference types="node" />

declare global {
  interface Window {
    myGlobal: string;
  }
}
```


### 2. 模块声明

在声明模块时使用：

```typescript 
/// <reference types="react" />

declare module "*.css" {
  const classes: { [key: string]: string };
  export default classes;
}
```


### 3. 现代替代方案

在现代 TypeScript 项目中，许多三斜线指令的功能已被`import`和`export`取代。但在以下情况仍需要：

- **全局声明文件（****`.d.ts`****）**
- **当需要明确控制编译顺序时**
- **当需要包含特定内置库时**

## 注意事项

1. 三斜线指令必须放在文件的最顶部，前面只能有注释
2. 在模块化项目中，优先使用`import`/`export`而不是三斜线指令
3. **三斜线引用不会创建模块之间的依赖关系，只是告诉编译器需要包含哪些文件**
4. **在**\*\*`tsconfig.json`****中配置****`types`****或****`lib`\*\***通常比使用三斜线指令更好**

## 现代替代方案

随着 TypeScript 的发展，许多三斜线指令的功能可以通过以下方式替代：

1. \*\*`import`\*\***语句**：用于模块依赖
2. **`tsconfig.json`****中的****`types`****和****`typeRoots`：用于类型声明**
3. **`tsconfig.json`****中的****`lib`：用于内置库**

但在全局声明文件和某些特殊场景中，三斜线指令仍然是必要的工具。
