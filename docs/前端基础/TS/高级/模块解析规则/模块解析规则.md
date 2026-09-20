# 模块解析规则

## 目录

- [TypeScript 模块解析规则](#TypeScript-模块解析规则)
  - [相对模块导入](#相对模块导入)
  - [非相对导入](#非相对导入)

# TypeScript 模块解析规则

在开始之前，我们先来聊聊 TS 文件的加载策略。

> 掌握加载策略才会让我们实实在在的避免一些看起来毫无头绪的问题。

TS 中的加载策略分为两种方式，分别为**相对路径**和**绝对路径**两种方式。

## 相对模块导入

**TypeScript 将 TypeScript 源文件扩展名（****`.ts`****、****`.tsx`****和****`.d.ts`****）覆盖在 Node 的解析逻辑上。同时TypeScript 还将使用**\*\*`package.json`****named中的一个字段****`types`****来镜像目的****`"main"`- 编译器将使用它来查找“主”定义文件以进行查阅。\*\*​

比如这样一段代码:

```typescript 
// 假设当前执行路径为 /root/src/modulea

import { b } from './moduleb'


```


此时，TS 对于 `./moduleb` 的加载方式其实是和 node 的模块加载机制比较类似：

- 首先寻找 `/root/src/moduleb.ts` 是否存在，如果存在使用该文件。
- 其次寻找 `/root/src/moduleb.tsx` 是否存在，如果存在使用该文件。
- **其次寻找 ****`/root/src/moduleb.d.ts`**** 是否存在，如果存在使用该文件。**
- 其次寻找 `/root/src/moduleB/package.json`，如果 package.json 中指定了一个`types`属性的话那么会返回该文件。
- 如果上述仍然没有找到，之后会查找 `/root/src/moduleB/index.ts`。
- 如果上述仍然没有找到，之后会查找 `/root/src/moduleB/index.tsx`。
- **如果上述仍然没有找到，之后会查找 ****`/root/src/moduleB/index.d.ts`****。**

可以看到 TS 中针对于相对路径查找的规范是和 nodejs 比较相似的，需要注意我在上边已经额外加粗了。

Ts 在寻找文件路径时，在某些条件下是会按照目录去查找 `.d.ts` 的。

## 非相对导入

在了解了相对路径的加载方式之后，我们来看看关于所谓的非相对导入是 TS 是如何解析的。

我们可以稍微回想一下平常在 nodejs 中对于非相对导入的模块是如何被 nodejs 解析的。没错，它们的规则大同小异。

比如下面这段代码：

```typescript 
// 假设当前文件所在路径为 /root/src/modulea

import { b } from 'moduleb'

```


- `/root/src/node_modules/moduleB.ts`
- `/root/src/node_modules/moduleB.tsx`
- `/root/src/node_modules/moduleB.d.ts`
- `/root/src/node_modules/moduleB/package.json`（如果它指定了一个`types`属性）
- `/root/src/node_modules/@types/moduleB.d.ts`
- `/root/src/node_modules/moduleB/index.ts`
- `/root/src/node_modules/moduleB/index.tsx`
- `/root/src/node_modules/moduleB/index.d.ts`

typescript 针对于非相对导入的 moduleb 会按照以上路径去当前路径的 node\_modules 中去查找，如果上述仍然未找到。

此时，TS 仍然会按照 node 的模块解析规则，继续向上进行目录查找，比如又会进入上层目录 `/root/node_modules/moduleb.ts ...`进行查找，直到查找到顶层 node\_modules 也就是最后一个查找的路径为 `/node_modules/moduleB/index.d.ts` 如果未找到则会抛出异常 `can't find module 'moduleb'`。

> 上述查找规则是基于 tsconfig.json 中指定的 `moduleResolution:node`，当然还有 `classic` 不过 `classic` 规则是 TS 为了兼容老旧版本，现代代码中基本可以忽略这个模块查找规则。
