# typings.d.ts

## 目录

- [解析 \*.d.ts 声明](#解析-dts-声明)

**通常我们将有关于一些****全局变量****或者****引入的模块对应的类型声明语句****存在一个****单独的文件****，这样的文件就被成为声明文件。**

> 注意，声明文件一定要以 `[name].d.ts` 结尾。

比如我们在项目内定义一个 `jquery.d.ts` 时:

```typescript 
// src/jQuery.d.ts

// 定义全局变量 jQuery，它是一个方法
declare var jQuery: (selector: string) => any;

```


之后我们在项目内的 TS 文件中就可以在全局自由的使用声明的 `jQuery` 了：

正常来说，ts 会解析项目中所有的 `*.ts` 文件，当然也包含以 `.d.ts` 结尾的文件。所以当我们将 `jQuery.d.ts` 放到项目中时，其他所有 `*.ts` 文件就都可以获得 `jQuery` 的类型定义了。

### 解析 `*.d.ts` 声明

上边我们聊了聊 TS 中对于加载两种不同模块的方式，可是日常开发中，经常有这样一种场景。

比如，在 TS 项目中我们需要引入一些后缀为 png 的图片资源，那么此时 TS 是无法识别此模块的。

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9cf74c9c51154adaaade0a63629d66be~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

解决方法也非常简单，通常我们会在项目的根目录中也就是和 TsConfig.json 平级的任意目录中添加对应的声明文件 `image.d.ts`：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b686207fd8d4cceb8a3b4091f043d09~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

可以看到，通过定义声明文件的方式解决了我们的问题。

**可是，你有思考过按照上边的 typescript 对于模块的加载方式，它是怎么加载到我们声明的 ****`image.d.ts`**** 的吗？**

这是一个有意思的问题，按照上边我们提到的模块加载机制要么按照相对模块机制查找，要么按照对应的 node 模块解析机制进行查找。

怎么会查找到定义在项目目录中的 `image.d.ts` 呢？

***

本质上我们引入任何模块时，加载机制无非就是我们上边提到的两种加载方式。

**不过，这里有一个细小的点即是 ts 编译器会处理 tsconfig.json 的 ****`file、include、exclude`**** 对应目录下的所有 .d.ts 文件：**

简单来说，ts\*\* 编译器首先\*\*会根据 tsconfig.json 中的上述三个字段来加载项目内的 `d.ts` **全局模块声明文件**，自然由于 '.png' 文件会命中全局加载的 `image.d.ts` 中的 声明的 `module` 所以会找到对应的文件。

> include 在未指定 file 配置下默认为 `**`，表示 tsc 解析的目录为当前 tsconfig.json 所在的项目文件夹。

> 关于 file、include、exclude 三者的区别我就不详细展开了，本质上都是针对于 TSC 编译器处理的范围。后续如果大伙有兴趣，我可以单独开一个 tsconfig.json 的文章去详细解释配置。

[声明文件 declare](<./声明文件 declare/index.md> "声明文件 declare")

[demo](IT/前端基础/TS/typings.d.ts/demo/demo.md "demo")

[三斜线指令](./三斜线指令/index.md "三斜线指令")
