# 背景

## 目录

- [背景：从 JavaScript 说起](#背景从-JavaScript-说起)
- [MS、Google、Mozilla 的探索](#MSGoogleMozilla-的探索)
- [Mozilla：asm.js](#Mozillaasmjs)
- [asm.js To WebAssembly](#asmjs-To-WebAssembly)
- [实战](#实战)
- [编译CPP的MD5函数至WASM](#编译CPP的MD5函数至WASM)
- [benchmark](#benchmark)
- [总结与展望](#总结与展望)

[   https://zhuanlan.zhihu.com/p/79792515?utm\_id=0](https://zhuanlan.zhihu.com/p/79792515?utm_id=0 "   https://zhuanlan.zhihu.com/p/79792515?utm_id=0")

**凡泰极客导读：**

相信不少人听说过 WebAssembly，它是由 Google、Microsoft、Mozilla、Apple 等几家大公司合作发起的一个关于面向 Web 的通用二进制和文本格式的项目。

那么WebAssembly（wasm）到底是什么?

翻译成中文的话，WebAssembly（wasm）就是一个可移植、体积小、加载快并且兼容 Web 的全新格式。

实际上，WebAssembly是一种新的字节码格式，旨在成为高级语言的编译目标，目前可以使用 C、C++、Rust、Go、Java、C# 等编译器来创建 wasm 模块。该模块以二进制的格式发送到浏览器，并在专有虚拟机上执行，与JavaScript虚拟机共享内存和线程等资源。

本文将阐述 WebAssembly 诞生的背景，并从实践案例中分析 WebAssembly 到底带来了多少性能提升。

***

[原文链接](https://link.zhihu.com/?target=https://ivweb.io/article.html?_id=100411 "原文链接")

## 背景：从 JavaScript 说起

> JavaScript 占据着统治地位，不管是公开还是私有的项目、任何组织、世界任何地区，JavaScript 都是第一。 &#x20;

![](./image/image_tA1I8CB-lt.png)

GitHub 2018 年度报告

随着 JavaScript 的快速发展，目前它已然成为最流行的编程语言之一，这背后正是 Web 的发展所推动的。但是随着 JavaScript 被广泛的应用，它也暴露了很多问题：

- **语法太灵活导致开发大型 Web 项目困难；**
- **性能不能满足一些场景的需要；**

这两大问题成为 JavaScript 头顶上的[达摩克利斯之剑](https://zhida.zhihu.com/search?q=达摩克利斯之剑\&zhida_source=entity\&is_preview=1 "达摩克利斯之剑")，危及着 JavaScript 更广泛的应用。

![](https://pic4.zhimg.com/80/v2-b7cc3b660ce48132b0590f17f828fd39_1440w.webp)

Brendan Eich 做梦也没想到，自己花了十天仓促设计出来的 JavaScript，一经推出就被广泛接受，获得了全世界范围内大量的用户使用。前人挖坑，后人来填。既然 JavaScript 已经成为了 Web 编程的事实标准，那么这两个亟待解决的问题势必将要被解决。

## MS、Google、Mozilla 的探索

- MS：TypeScript

第一个问题被著名[开源软件](https://zhida.zhihu.com/search?q=开源软件\&zhida_source=entity\&is_preview=1 "开源软件")大厂 MicroSoft 解决。

![](https://picx.zhimg.com/80/v2-39776067ef0db9b3dcce0500955c77b7_1440w.webp)

MicroSoft 集结了 C# 的[首席架构师](https://zhida.zhihu.com/search?q=首席架构师\&zhida_source=entity\&is_preview=1 "首席架构师")以及 Delphi 和 Turbo Pascal 的创始人 Anders Hejlsberg 等明星整容，打造了 TypeScript。

TypeScript 它是 JavaScript 的一个严格超集，并添加了可选的静态类型和使用看起来像基于类的面向对象编程语法操作 Prototype。所以 TypeScript 可以这样理解：

![](https://pic2.zhimg.com/80/v2-a3280861e250964d87e35c2d4b52fd79_1440w.webp)

MicroSoft 利用 TypeScript 这把锋利的武器打造了 VSCode 等史诗级项目 **，于是乎，第一把达摩克利斯之剑"\~\~ 语法太灵活导致开发大型 Web 项目困难\~\~"似乎已经被解决。**

**但是，由于 TypeScript 最终仍然是被编译成 JavaScript 在浏览器中执行，所以困扰着 JavaScript 开发者的性能问题，仍然没有被解决。**

- Google：V8

早在 2008 年，Google 就推出了自家的 JavaScript 引擎 V8，试图使用 JIT 技术提升 JavaScript 的执行速度，并且它真的做到了。

![](https://pic3.zhimg.com/80/v2-22ff17eaa0dfd883fb689dab6ca4e12e_1440w.webp)

**由于 JIT 技术的引入，V8 使得 Web 性能得到了数十倍的增长！**

![](https://pic1.zhimg.com/80/v2-bb68de555732aab6fd6632fe9c8be0c2_1440w.webp)

上图展示了 Chrome 的 v8 与 IE 的 Chakra benchmark 结果。

既然性能得到了如此大的提升 **，那么 JavaScript 广为诟病的性能问题得到了解决吗？为啥 Web 性能还是被挑战？**

**单线程 -> 阻塞**

Web 应用中，**性能瓶颈大部分的原因已经不在 JavaScript，而在于 DOM。浏览器中通常会把 DOM 和 JavaScript 独立实现**。下图展示了不同浏览器 DOM 和 JavaScript 的实现情况：

![](https://picx.zhimg.com/80/v2-723da1582826b313da99246e1065c33f_1440w.webp)

由于 Dom 渲染和 JavaScript 引擎是相对独立的，**这两个模块相互访问的时候，都是通过接口访问。由于 JavaScript 单线程的特性，这种访问只能是单工的。**

![](https://pic1.zhimg.com/80/v2-dfe45ccb28f9e1ce0a74c10ed30c86a6_1440w.webp)

**可以把 DOM 和 JavaScript 各自想象为一个岛屿，他们之间用桥梁连接，JavaScript 每次访问 DOM，都要经过这座桥，并交纳过桥费，访问的次数越多，费用就越高，因此，推荐的做法是尽可能减少过桥的次数，一直待在 JavaScript 岛上。为了**达到这个目的，**可以使用 Virtual Dom，Web Worker 来实现。这里就不再赘述。**

**JIT VS AOT，在重型计算面前仍然力不从心**

刚才谈到，V8 引擎首次将 JIT 技术引入 JavaScript 当中，大幅提升了执行速度。那么首先我们需要理解什么是 JIT，以及 AOT。

> AOT: Ahead-of-Time compilation &#x20;

必须是[强类型语言](https://zhida.zhihu.com/search?q=强类型语言\&zhida_source=entity\&is_preview=1 "强类型语言")，**编译在执行之前，编译直接生成 CPU 能够执行的二进制文件，执行时 CPU 不需要做任何编译操作，直接执行，性能最佳。**

> JIT: Just-in-Time compilation &#x20;

**没有编译环节**。执行时根据**上下文生成二进制汇编代码，灌入 CPU 执行。JIT 执行时，可以根据代码编译进行优化，代码运行时，** 不需要每次都翻译成二进制汇编代码，V8 就是这样优化 JavaScript 性能的。

![](https://pic3.zhimg.com/80/v2-3093158b7d5f7cbb3585fb563977b566_1440w.webp)

由于 JavaScript **的**[**动态语言**](https://zhida.zhihu.com/search?q=动态语言\&zhida_source=entity\&is_preview=1 "动态语言")**类型**已无法改变，**所以只能采用 JIT 的形式对性能进行优化。**

为了进一步 JIT 优化效率，继而提升 JavaScript 性能 **，浏览器鼻祖 Mozilla 推出了 asm.js。**

## Mozilla：asm.js

和 TypeScript 比较相似的是，asm.js 同样也是强类型的 JavaScript，但是**他的语法则是 JavaScript 的子集，是为了 JIT 性能优化而专门打造的。**

一段典型的 asm.js 代码如下：

![](https://picx.zhimg.com/80/v2-cc78ab87ba1c7fdf00d83f2d5f55b33d_1440w.webp)

可以看到，asm.js 使用了按位或 0 的操作，来声明 x 为整形。从而确保 JIT 在执行过程中尽快生成相应的二进制代码，不用再去根据上下文判断变量类型。

Mozilla 给出了 asm.js 的 benchmark：

![](./image/image_cKO9fkn66X.png)

## asm.js To WebAssembly

自从 Mozilla 提出了 asm.js，Google、MicroSoft、Apple 都觉得 asm.js 的思路不错，于是联合起来，一同共建 WebAssembly 生态。

![](https://pica.zhimg.com/80/v2-dfac727ca262219c0f65b1a2e717cf12_1440w.webp)

同 asm.js 不同的是，`WebAssembly` 是**一份字节码标准，以字节码的形式依赖虚拟机在浏览器中运行。**

![](https://picx.zhimg.com/80/v2-f17900236d1fa1619ae6ad1f5c1f4685_1440w.webp)

可以依赖 `Emscripten`\*\* 等编译器将\*\* C++/Golang/Rust/Kotlin 等**强类型语言编译**成为 WebAssembly 字节码（.wasm 文件）。所以 WebAssembly 并不是 Assembly（汇编），它只是看起来像汇编而已。一份典型的.wasm 文件如下所示：

```6502 assembly 
00000000: 0061 736d 0100 0000 0108 0260 017f 0060  .asm.......`...`
00000010: 0000 0215 0203 656e 7603 6d65 6d02 0001  ......env.mem...
00000020: 026a 7303 6c6f 6700 0003 0201 0107 0b01  .js.log.........
00000030: 0765 7861 6d70 6c65 0001 0a23 0121 0041  .example...#.!.A
00000040: 0042 c8ca b1e3 f68d c8ab ef00 3703 0041  .B..........7..A
00000050: 0841 f2d8 918b 0236 0200 4100 1000 0b    .A.....6..A....

```


## 实战

环境搭建: 编译 Emscripten

本次使用官方推荐的 CPP 语言编译成为 WebAssembly 文件，并在浏览器中执行。首先需要搭建 Emscripten 环境。**Emscripten 被用于将 CPP 文件转换成为 WASM 字节码文件。**

常规的搭建流程十分繁琐：

```markdown 
1、确保安装 CMake、Xcode、Python 2.7.x
2、git clone https://github.com/juj/emsdk.git
3、./emsdk install --build=Release sdk-incoming-64bit binaryen-master-64bit

等待约 1 个小时……，切换版本需要重新编译。

```


不过，早有好心人为我们准备了捷径：使用 Docker 镜像，快速开启你的 WebAssembly 之路吧。只需要以下几步

```bash 
1、安装 Docker
2、docker pull trzeci/emscripten:latest
3、alias emcc='docker run –rm -v $(pwd):/src -u emscripten trzeci/emscripten emcc’

切换版本只需要 pull 相应的 tag

```


## 编译CPP的MD5函数至WASM

首先需要找到一份计算 MD5 的 CPP 代码：

> [git@github.com](mailto:git@github.com "git@github.com"):codenoid/md5-cpp.git

![](./image/image_HqtL34Y0n-.png)

使用 emscripten.h 中的 EMSCRIPTEN\_KEEPALIVE 宏，确保 emcc 编译器在编译时，不会因为该函数没有被调用而优化掉这个函数。

这里 uint8\_t被隐式类型转换为 char

使用 emcc 编译 CPP 文件至 WASM 文件：

```bash 
emcc -O3 -s WASM=1 -s EXTRA_EXPORTED_RUNTIME_METHODS='["cwrap"]’ md5.c

```


- -O3: 优化级别，O3 是最高优化级别。
- -s WASM=1：生成 wasm 代码，而不是 asm.js 代码。
- -s EXTRA\_EXPORTED\_RUNTIME\_METHODS=‘\[“cwrap”]‘：在 JavaScript 中使用 cwrap 函数引用导出函数。

最后会生成 a.out.js 和 a.out.wasm 两个文件。分别是 WASM 和 JavaScript 交互的胶水文件以及 WebAssembly 字节码文件。

![](https://pic3.zhimg.com/80/v2-f2126eb65f95fa3f777946c0c11729d4_1440w.webp)

计算 md5 并输出结果：

![](https://picx.zhimg.com/80/v2-be19e369927d3d9e4693f264b95219ef_1440w.webp)

这里有两点需要注意：

- a.out.js 会自动 fetch wasm 文件，由于获取 wasm 文件也存在跨域的情况，可以使用 http-server 本地起一个 sever。
- CPP 的变量类型以及 JavaScript 的变量类型需要进行转换，转换由胶水代码自动执行，具体的转换规则如下：

![](https://pic1.zhimg.com/80/v2-bc905dd64ac6275fb8348a20404f75de_1440w.webp)

## benchmark

既然 WebAssembly 主打性能提升，那么 benchmark 就必不可少啦，针对"ivweb"短字符加密 100000 次，benchmark 的结果如下：

![](https://pic3.zhimg.com/80/v2-ed84e15fa306fa0dcf30504859700a94_1440w.webp)

可以看到 WebAssembly 相较于纯 JavaScript，计算性能大约提升了 39%，这与普遍的 100%+ 的性能提升有着较大差距。这是为什么呢？

我又对 2M 的长文本进行 benchmark 对比，结果如下：

![](https://pica.zhimg.com/80/v2-e58d0150d38640d7e052722c47bd53c4_1440w.webp)

这一次的提升就比较大了。是什么造成了如此大的差距呢？我猜测有两点原因：

1. **对"ivweb"短字符加密 100000 次时，JIT 优化介入后，不需要每次都去编译，JavasScript 性能得到了极大提升。**
2. **对"ivweb"短字符加密 100000 次时，胶水代码执行次数较多，拖慢了性能。**

针对与以上两点猜测，又做了一组 benchmark，加密“ivweb”5000000 次

![](https://picx.zhimg.com/80/v2-672cd264b3178d7a57c750a1af6c6ee1_1440w.webp)

可以看到 WebAssembly 与纯粹的 JavaScript 性能差距已经不大了，验证了我的猜想。

启示

鉴于 V8 的强大性能，90% 的应用场景下你不需要 WebAssembly.

**启示：如何提高 JS 代码性能？**

1. **声明变量时提供默认类型，加快 JIT 介入。**
2. **不要轻易改变变量的类型。**
3. Node.js 像 JAVA 一样也**存在 JIT 预热。**

## 总结与展望

现在的 WebAssembly 还并不完美。但是线程的支持，异常处理，垃圾收集，[尾调用](https://zhida.zhihu.com/search?q=尾调用\&zhida_source=entity\&is_preview=1 "尾调用")优化等，都已经加入 WebAssembly 的计划列表中了。

将来，WebAssembly 能够被用于：

- 扩展浏览器端视音频处理能力（H.265）
- 基于 WebAssembly 的高性能 Web 应用 (加密、游戏、挖矿？)

目前 Webpack4 已经支持 import wasm 文件的形式调用 wasm 文件。

![](https://pic4.zhimg.com/80/v2-163411e2072f9fb810fa752e7c9bcf07_1440w.webp)

未来，WebAssembly 将可能直接通过 HTML 标签进行引用，比如：

```javascript 
<script src="./wa.wasm"></script>；

```


或者可以通过 JavaScript ES6 模块的方式引用，比如：

```typescript 
import xxx from './wa.wasm';

```
