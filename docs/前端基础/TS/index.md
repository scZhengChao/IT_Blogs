# TS

## 目录

- [1.2 什么是 tsc ？](#12-什么是-tsc-)
- [什么是 TypeScript:](#什么是-TypeScript)
  - [特点：](#特点)
  - [缺点：](#缺点)
  - [安装：](#安装)
- [类型推论](#类型推论)
- [忽略语法检查](#忽略语法检查)
  - [ts-ignore](#ts-ignore)
  - [@ts-expect-error
    ](#ts-expect-error)
  - [eslint-disable-next-line](#eslint-disable-next-line)
- [import type vs import](#import-type-vs-import)
- [  🤸‍♀️ 路别走偏了](#️-路别走偏了)

[ TypeScript 的函数类型 | 阮一峰 TypeScript 教程 TypeScript函数类型需要声明参数和返回值类型。支持可选参数、默认值、rest参数等。never表示不会返回的函数,void表示没有返回值。重载用于处理多种参数情况。 https://typescript.p6p.net/typescript-tutorial/function.html](https://typescript.p6p.net/typescript-tutorial/function.html " TypeScript 的函数类型 | 阮一峰 TypeScript 教程 TypeScript函数类型需要声明参数和返回值类型。支持可选参数、默认值、rest参数等。never表示不会返回的函数,void表示没有返回值。重载用于处理多种参数情况。 https://typescript.p6p.net/typescript-tutorial/function.html")

**TypeScript** 是一种基于 **JavaScript** 的**强类型编程语言**，它使得在前端项目开发**过程中更加严谨且流畅**，一定程度上**保证了大型前端项目程序的健壮性。**

- TypeScript 是由微软开发的一款开源的编程语言；
- TypeScript 是 JavaScript 的超集，遵循最新的 ESM 规范，TypeScript 扩展了 JavaScript 的语法；
- TypeScript 更像后端 JAVA、C# 这样的面向对象语言，可以让 JS 开发大型企业级项目。

但是 **TypeScript 并不可以直接运行，而是需要转换成 JavaScript 代码才可以在 Node.js 或浏览器环境下**执行，因此我们需要通过“编译器”将 TS 代码转换为 JS 代码。

## 1.2 什么是 tsc ？

**tsc** 的全称是 `TypeScript Compiler`，也就是将 TypeScript 转码为 JavaScript 代码的编译器。

**tsc** 的全局安装方式：

```typescript 
npm install typescript -g
```


当我们编译一份 `index.ts` 文件时，会使用下面的命令：

```typescript 
tsc ./index.ts
```


这样就可以得到一份编译成为 JavaScript 代码的 `./index.js` 文件。

**tsc** 实际就是将 TS 转为 JS 的编译（器）脚手架工具，如果是一个 TS 的前端工程项目，那么就可以通过项目中的 `tsconfig.json` 文件来自定义配置 TS 编译相关规则。

项目中的 `tsconfig.json` 文件，我们一般会通过如下快捷命令生成：

```typescript 
tsc --init
```


执行完后，会在项目根目录生成一个简单的初始化 `tsconfig.json` 配置描述文件，如果没有特别的要求，该初始化配置就足以支持你愉快地使用 TS 开发啦！

更多相关 TS 编译配置和使用说明可以通过 `tsc -h` 查看。

[TypeScript类型声明书写详解\_javascript技巧\_脚本之家 这篇文章主要介绍了TypeScript类型声明书写详解，文中通过示例代码介绍的非常详细，对大家的学习或者工作具有一定的参考学习价值，需要的朋友们下面随着小编来一起学习学习吧 https://www.jb51.net/article/168653.htm](https://www.jb51.net/article/168653.htm "TypeScript类型声明书写详解_javascript技巧_脚本之家 这篇文章主要介绍了TypeScript类型声明书写详解，文中通过示例代码介绍的非常详细，对大家的学习或者工作具有一定的参考学习价值，需要的朋友们下面随着小编来一起学习学习吧 https://www.jb51.net/article/168653.htm")

# 什么是 TypeScript:

        TypeScript 是 JavaScript 的一个超集，主要提供了类型系统和对 ES6 的支持，它由 Microsoft 开发，代码开源于 GitHub 上。

        官网：

[TypeScript中文网 · TypeScript——JavaScript的超集 TypeScript带来了可选的静态类型检查以及最新的ECMAScript特性。 https://www.tslang.cn/](https://www.tslang.cn/ "TypeScript中文网 · TypeScript——JavaScript的超集 TypeScript带来了可选的静态类型检查以及最新的ECMAScript特性。 https://www.tslang.cn/")

        入门教程：

[  https://ts.xcatliu.com/basics/type-assertion.html%C2%A0](https://ts.xcatliu.com/basics/type-assertion.html%C2%A0 "  https://ts.xcatliu.com/basics/type-assertion.html%C2%A0")

## 特点：

- 可**以在编译阶段就发现大部分错误，这总比在运行时候出错好**
- 不显式的定义类型，也能够自动做出类型推论
- 即使 TypeScript 编译报错，也可以生成 JavaScript 文件
- Google 开发的 Angular 就是使用 TypeScript 编写的
- TypeScript 拥抱了 ES7 规范，也支持部分 ES8 草案的规范

## 缺点：

- 有一定的学习成本，需要理解接口（Interfaces）、泛型（Generics）、类（Classes）、枚举类型（Enums）等前端工程师可能不是很熟悉的东西
- 短期可能会增加一些开发成本，多写一些类型的定义，长期维护的项目，TypeScript 能够减少其维护成本

## 安装：

        npm install -g typescript

- 以上命令将会安装typescript编译器和可执行程序（tsc），并且添加到环境变量的全局路径中 tsc -v
  -  编译一个 TypeScript 文件：
  - tsc hello.ts   类型不匹配时，编辑报错，但可以生成js（编辑通过），如果不希望编译通过需要配饰tsconfig.json

        发现在hello.ts同一目录下出现一个hello.js文件，这个文件就是ts编译器输出的内容，其中的js代码与编写的ts代码等价。

- 可用以下命令来运行：

        node hello.js

-  若想要把编译与运行结合起来，可使用ts-node模块：

        npm install -g ts-node

        ts-node hello.ts

# 类型推论

没有明确的指定类型，依照值推断出一个类型。

```typescript 
-  let aa=12;  //number  推论出为number类型
-   aa='qq';  //无法修改
```


# 忽略语法检查

### ts-ignore

```javascript 
 增加 @ts-ignore 的注释，会忽略下一行的语法检查。
const num1: number = 100
num1.substr() // Error 语法检查错误

const num2: number = 200
// @ts-ignore
num2.substr() // Ok 语法检查通过
```


### @ts-expect-error&#xA;

```text 
如果有错误就类似 @ts-ignore 没错误反而这行注释会报错，帮助你删掉它 

```


## eslint-disable-next-line

```纯文本 
// eslint-disable-next-line react-hooks/exhaustive-deps

下一行禁用规则
```


# `import type` vs `import`

**import type 是用来协助进行类型检查和声明的，在运行时是完全不存在的。**

#   🤸‍♀️ 路别走偏了

整理看下来，类型体操是不是觉得比 js 还难学，就跟 js 的原型链实现的类一样，奇奇怪怪的。我觉得原因是 TS 一开始设计时没想承载这么多，譬如做加减乘除运算，是大家的在利用的它的规则和特性搞事情。TS 本身缺乏类型方法内变量存储的设计、没有计数和运算能力、逻辑语句又只有三元运算符没有循环之类的，所以在做计数运算、递归等都比较让人迷惑，有些浮夸的体操我自己也是觉得做做开开眼图一乐就好，还是专注于日常工具方法、类能用得到的类型推导部分吧。

最后，即使已经进阶到高级选手了，**不要滥用工具类型，对外暴露的 API，应该尽量多手动标注函数返回值类型**。**契约高于实现。**

这些ts类型体操的花活多是留给基础框架内部用的，通过写推导类型作为类型的通用方法，提高我们的类型编程的效率和准确性。

[集成](./集成/index.md "集成")

[API](./API/index.md "API")

[tsconfig](./tsconfig/index.md "tsconfig")

[typings.d.ts](./类型声明/index.md "typings.d.ts")

[高级](./高级/index.md "高级")

[技巧和提示](./技巧和提示/index.md "技巧和提示")

[进阶](./进阶/index.md "进阶")

[lib](./lib/index.md "lib")
