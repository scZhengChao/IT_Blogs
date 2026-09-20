# WebAssembly

## 目录

- [高效](#高效)
- [安全](#安全)
- [开放](#开放)
- [标准](#标准)

[ WebAssembly 中文网|Wasm 中文文档  https://www.wasm.com.cn/](https://www.wasm.com.cn/ " WebAssembly 中文网|Wasm 中文文档  https://www.wasm.com.cn/")

[ WebAssembly | MDNMDN Web DocsMDN logoMozilla logo WebAssembly 是一种新的编码方式，可以在现代的 Web 浏览器中运行——它是一种低级的类汇编语言，具有紧凑的二进制格式，可以接近原生的性能运行，并为诸如 C/C++、C# 和 Rust 等语言提供编译目标，以便它们可以在 Web 上运行。它也被设计为可以与 JavaScript 共存，允许两者一起工作。 https://developer.mozilla.org/zh-CN/docs/WebAssembly](https://developer.mozilla.org/zh-CN/docs/WebAssembly " WebAssembly | MDNMDN Web DocsMDN logoMozilla logo WebAssembly 是一种新的编码方式，可以在现代的 Web 浏览器中运行——它是一种低级的类汇编语言，具有紧凑的二进制格式，可以接近原生的性能运行，并为诸如 C/C++、C# 和 Rust 等语言提供编译目标，以便它们可以在 Web 上运行。它也被设计为可以与 JavaScript 共存，允许两者一起工作。 https://developer.mozilla.org/zh-CN/docs/WebAssembly")

### 高效

WebAssembly 有一套完整的[语义](https://www.wasm.com.cn/docs/semantics/ "语义")，**实际上 wasm 是体积小且加载快的**[**二进制格式**](https://www.wasm.com.cn/docs/binary-encoding/ "二进制格式")， 其目标就是**充分发挥**[**硬件**](https://www.wasm.com.cn/docs/portability/#assumptions-for-efficient-execution "硬件")**能力以达到原生执行效率**

### 安全

WebAssembly 运行在一个**沙箱化的**[**执行环境**](https://www.wasm.com.cn/docs/semantics/#linear-memory "执行环境")**中**，甚至可以在现有的 JavaScript 虚拟机中实现。**在**[**web环境中**](https://www.wasm.com.cn/docs/web/ "web环境中")**，WebAssembly将会严格遵守同源策略以及浏览器安全策略。**

### 开放

WebAssembly 设计了一**个非常规整的**[**文本格式**](https://www.wasm.com.cn/docs/text-format/ "文本格式")**用来**、调试、测试、实验、优化、学习、教学或者编写程序。可以以这种文本格式在web页面上[查看wasm模块的源码](https://www.wasm.com.cn/docs/faq/#will-webassembly-support-view-source-on-the-web "查看wasm模块的源码")。

### 标准

WebAssembly\*\* 在 **[**web**](https://www.wasm.com.cn/docs/web/ "web")** 中被设**计成**无版本、特性可测试、向后兼容的 \*\*。`WebAssembly` **可以被 JavaScript 调用**，**进入 JavaScript 上下文**，也可以**像 Web API 一样调用浏览器的功能。** 当然，`WebAssembly` 不仅可以运行在浏览器上，也可以运行在[非web](https://www.wasm.com.cn/docs/non-web/ "非web")环境下。

[文件上传](./文件上传/index.md "文件上传")

[背景](./背景/index.md "背景")
