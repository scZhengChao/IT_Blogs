# Ramda

## 目录

- [Why Ramda?](#Why-Ramda)
- [What's Different?](#Whats-Different)
- [理念](#理念)

[   https://ramdajs.com/docs/](https://ramdajs.com/docs/ "   https://ramdajs.com/docs/")

[ Ramda 函数库参考教程 - 阮一峰的网络日志  https://www.ruanyifeng.com/blog/2017/03/ramda.html](https://www.ruanyifeng.com/blog/2017/03/ramda.html " Ramda 函数库参考教程 - 阮一峰的网络日志  https://www.ruanyifeng.com/blog/2017/03/ramda.html")

## Why Ramda?

目前已经存在许多优秀的函数式的库。通常它们作为通用工具包，可以用于多种编程范式。Ramda 的目标更为专注：**专门为函数式编程风格而设计，更容易创建函数式 pipeline、且从不改变用户已有数据。**

## What's Different?

Ramda 主要特性如下：

- Ramda 强调更加纯粹的函数式风格。**数据不变性和函数无副作用是其核心设计理念**。这可以帮助你使用简洁、优雅的代码来完成工作。
- Ramda 函数**本身都是自动柯里化的。** 这可以让你在只提供部分参数的情况下，轻松地在已有函数的基础上创建新函数。
- Ramda 函数参数**的排列顺序更便于柯里化。要操作的数据通常在最后面。**

最后两点一起，使得将多个函数构建为简单的函数序列变得非常容易，每个函数对数据进行变换并将结果传递给下一个函数。Ramda 的设计能很好地支持这种风格的编程。

## 理念

使用 `Ramda` 时，应该感觉像使用原生 `JavaScript` 一样，**它是实用且函数式的** `JavaScript`。Ramda 没有在字符串中引入 lambda 表达式，也没有借用 consed 列表，更不是要移植所有的 Clojure 函数。

Ramda 基本的数据结构都是原生 JavaScript 对象，我们常用的集合是 JavaScript 的数组。Ramda 还保留了许多其他原生 JavaScript 特性，例如，函数是具有属性的对象。

函数式编程优势主要体现**在数据不变性和函数无副作用**两方面。虽然 Ramda 没有对此特别加强，但它在这两方面支持的非常好。

我们尽量让实现（编程和 API 实现）简洁、优雅。但 API 为王。为此我们牺牲了大量优雅、简洁的实现。

最后，`Ramda` 非常注重运行性能。可靠和快速的实现胜过过于强调函数式的纯度。（译者注：[Eweda](https://github.com/CrossEye/eweda "Eweda") 过于在意实现的函数式纯度，而失去了实用价值）

[比较运算](./比较运算/index.md "比较运算")

[数学运算](./数学运算/index.md "数学运算")

[逻辑运算](./逻辑运算/index.md "逻辑运算")

[字符串](IT/前端工程/工具轮子/Ramda/字符串/字符串.md "字符串")

[函数](IT/前端工程/工具轮子/Ramda/函数/函数.md "函数")

[数组](IT/前端工程/工具轮子/Ramda/数组/数组.md "数组")

[对象](IT/前端工程/工具轮子/Ramda/对象/对象.md "对象")

[取值](./取值/index.md "取值")

[路径](./路径/index.md "路径")

[管道流转](./管道流转/index.md "管道流转")

[转换](IT/前端工程/工具轮子/Ramda/转换/转换.md "转换")
