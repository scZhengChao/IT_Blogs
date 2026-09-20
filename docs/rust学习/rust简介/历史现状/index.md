# 历史现状

## 目录

- [1.4.1 Rust 历史](#141-Rust-历史)
- [1.4.2 Rust 2024](#142-Rust-2024)
- [1.4.3 Rust 三大优势](#143-Rust-三大优势)
- [1.4.4 Rust 的影响力](#144-Rust-的影响力)
- [一、Rust 的诞生与发展](#一Rust-的诞生与发展)
- [二、Rust 的独特魅力](#二Rust-的独特魅力)
- [三、Rust 的应用场景](#三Rust-的应用场景)
- [四、Rust 的未来展望](#四Rust-的未来展望)

### 1.4.1 Rust 历史

Rust 语言由 Graydon Hoare 私人研发，他是 Mozilla 做编程语言的工程师，专门给语言开发编译器和工具集。当时 Mozilla 要开发 Servo 引擎，想要保证安全的同时又能拥有高性能，于是就选择了 Rust 语言。2010 - 2015 年期间，Rust 是有 GC 的，后来社区一致表示支持 Rust 必须要有高性能，所以 GC 被取缔。2015 年，Rust 发布 1.0 版本，这也表示正式官宣 Rust 的稳定性。

Rust 是以三年为单位进行社区规划和迭代的。2015 - 2018 年，Rust 达成了生产力的承诺，也就是它的工具文档还有编译器变得更加智能，也对开发者更加友好了。2018 - 2021 年，Rust 做了更多异步生态的完善。之前的 Rust 是没有异步生态的，但是自 2018 年开始，它正式引入了异步功能。

![](./assets/image/image_BKyMb522If.png)

### 1.4.2 Rust 2024

2021 - 2024 年，Rust 有一个 2024 规划，主题叫做 Scaling Enpowerment（扩展授权）。之所以取这个名字，是因为 Rust 有一个目标——“empower everyone to build reliable and efficient software”。Rust 最关注也是大家经常诟病的一点，就是 Rust 的整个学习曲线非常陡峭，所以在这个规划中写道 “Flatten the learning curve”。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3640488e993a492e82e0871d0f1f85e1~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### 1.4.3 Rust 三大优势

在 2022 年，很多开源项目已经呈现爆炸式增长。我们了解到 Rust 这门语言后，发现它有**三大非常重要的优势**：**第一是高性能；第二是很强的安全性；第三是协作方便。** 因此我们想尝试在服务端使用 Rust 语言开发微服务，以此解决我们面临的一些性能上的问题。

- 性能

很多用户都对性能有很高的要求，也想知道 Rust 的性能如何。下图是各语言的 Benchmark 对比结果，可以看出 Rust 的性能是非常优秀的，远超过 Go 语言，甚至比 C++ 的性能更好。

当然我们要着重说明，这个 Benchmark 要求所有语言必须使用相同的算法，并且不得经过额外优化。毕竟如果都用汇编代码写，其实各语言性能相差无几。但是在真正的开发过程中，又有多少代码能够经过那么大量的人工精细优化呢？另外，**有人可能会对 Rust 的性能比 C 和 C++ 更优秀产生质疑**，其实这也是因为 Rust 对于程序员的输入要求得更加严格，所以编译器可以做更进一步的优化。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3d1186cdd07d4c90b27a3d90d4f7fd54~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

- 安全性

因为在 Rust 语言的安全性方面可查阅到大量资料，因此不再过多赘述。只阐述一个重要结论：Rust 1.0 之后，在非 Unsafe 代码中是不可能出现内存安全问题的。这个结论是通过数学证明过的，因此非常可靠。我们应该如何理解这个结论呢？可以从它的推论入手，即：一切内存 / 并发安全问题，都是 unsafe 代码导致的。也就是如果真的出现安全问题，我们可以限制在一个非常小的范围内进行排查。因为毕竟绝大多数的 Rust 语言代码都是 Safe Rust，而不是 Unsafe Rust。

- 协作

Rust 是一门**真正通过工程实践形成的语言**，它有非常**智能的编译器**、**完善的文档**、**集群的工具链**和**成熟的包管理**，因此 Rust 非常适合协作。我们在使用时可以专注于逻辑功能的实现，而不用担心内存安全和并发安全的问题等等。还有非常重要的一点就是可以限制别人的代码，因为如果别人的代码有内存安全问题或并发安全问题，将无法进行编译。所以在做 Code Review 时，我们只需关注逻辑上的功能正确性就可以，因为只要能够通过编译提交上来的代码，安全性是不必担心的。这虽然是 Rust 语言的优点，但也给使用者带来一些不便之处。我们常听说 Rust 开发者很难，也正是因为编译。

### 1.4.4 Rust 的影响力

如下图，**Rust 已经连续七年位居 Stack Overflow 最受开发者喜爱的编程语言榜榜首。** 此外，有一个非常重量级的项目叫做 “Rust for Linux”，除了 C 语言之外，**Rust 是 Linux 内核迄今为止接受的唯一语言。** 这些成绩足以看出 Rust 在开源业界的重量级和影响力。

![](./assets/image/image_WTzv9YmPmK.png)

![](./assets/image/image_LM-lcx12n8.png)

那么为什么 Rust 这么被推崇呢？

Rust 这门编程语言，可以说是近年来编程界的一颗新星。它不仅在技术圈内引起了广泛关注，还逐渐在实际项目中崭露头角。今天，我们就来聊聊 Rust 的发展历程和未来展望。

### 一、Rust 的诞生与发展

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/365c260a9cd545e6bc5c3d3b8c30ae13~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5qCI5rGf5rmW:q75.awebp?rk3s=f64ab15b\&x-expires=1749760741\&x-signature=Ks20kx0A3fmu6qBdj1t7WaV%2BUXE%3D)

Rust 的故事要从 2006 年说起，当时 Mozilla 的工程师 Graydon Hoare 开始着手开发这门语言。他的初衷很简单：创造一门既能保证内存安全，又能保持高性能的编程语言。经过几年的努力，Rust 在 2010 年首次公开亮相，并在 2015 年发布了 1.0 版本，标志着这门语言正式进入稳定阶段。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/c9de46381d004d458d8d27568c59b5dd~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5qCI5rGf5rmW:q75.awebp?rk3s=f64ab15b\&x-expires=1749760741\&x-signature=P96YMwxej8CvrRAWUBAfYqVirqc%3D)

Rust的崛起离不开 Mozilla，不仅提供了资金和资源，还让 Rust 在 Firefox 浏览器中得到了实际应用。这不仅验证了 Rust 的可行性，还为其赢得了更多的关注和认可。

### 二、Rust 的独特魅力

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/ec6c323b307b4bbfa68b4dc0aa24f92b~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5qCI5rGf5rmW:q75.awebp?rk3s=f64ab15b\&x-expires=1749760741\&x-signature=7kKQrvtsXnZYfGR749hDHehwObc%3D)

Rust 之所以能在众多编程语言中脱颖而出，主要得益于它的几个独特特性：

1. **内存安全**：Rust 通过所有权系统和借用检查器，彻底解决了内存安全问题。这意味着开发者不再需要担心空指针、野指针等问题，大大降低了程序出错的可能性。
2. **高性能**：Rust 的设计目标之一就是高性能。它没有垃圾回收机制，而是通过所有权系统来管理内存，确保程序运行效率。
3. **并发安全**：Rust 的并发模型非常强大，通过所有权系统和线程安全机制，开发者可以轻松编写并发安全的代码。
4. **跨平台支持**：Rust 支持多种平台，包括 Windows、Linux、macOS 等，甚至可以在嵌入式系统中运行。

### 三、Rust 的应用场景

Rust 的应用场景非常广泛，从系统编程到 Web 开发，再到嵌入式系统。

1. **系统编程**：Rust 的高性能和内存安全特性使其成为系统编程的理想选择。许多操作系统、驱动程序和底层库都开始采用 Rust 进行开发。
2. **Web 开发**：Rust 的异步编程模型和 WebAssembly 支持，使其在 Web 开发领域也有一席之地。Rocket、Actix 等 Web 框架的出现，进一步推动了 Rust 在 Web 开发中的应用。
3. **嵌入式系统**：Rust 的内存安全和高性能特性，使其在嵌入式系统开发中具有巨大潜力。许多嵌入式项目已经开始采用 Rust，尤其是在物联网和边缘计算领域。
4. **新兴领域**：Rust 还在新兴领域中崭露头角，如区块链、人工智能安全和量子计算模拟等。这些领域对安全性和性能有极高要求，Rust 正好能满足这些需求。
5. **安卓开发：** Rust 的跨平台特性和高性能，使其在安卓开发中也逐渐受到关注。Rust 可以用于开发安卓应用的底层库和系统组件，提供更高效和安全的解决方案。例如，Mozilla 的 Servo 浏览器引擎已经开始使用 Rust 进行开发，并计划将其部分功能移植到安卓平台。此外，Rust 还可以与 Java 和 Kotlin 等安卓开发语言进行互操作，为开发者提供更多选择和灵活性。

安卓 13 发布的新代码编程语言占比情况 Rust 占比已经不小了

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/f07a24706b4548089222f1d3cbf4acab~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5qCI5rGf5rmW:q75.awebp?rk3s=f64ab15b\&x-expires=1749760741\&x-signature=1pkPXPlJnOQbJ4KvXNzDDU32mkc%3D)

新的原生占比，安卓 11、安卓 12、安卓 13 也在逐代增加

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/45f94d4828ff4347b9dcbead6e72eaf5~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5qCI5rGf5rmW:q75.awebp?rk3s=f64ab15b\&x-expires=1749760741\&x-signature=RKpR0ApJEsqt22aXUjw0NedIKC8%3D)

### 四、Rust 的未来展望

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/1f1e645c039147c6aa861b29686fcde6~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5qCI5rGf5rmW:q75.awebp?rk3s=f64ab15b\&x-expires=1749760741\&x-signature=ynPIoemYU%2FsKF%2BgiqG6nYSdpKcQ%3D)

Google 在 2021 年加入了 Rust 基金会，并已经通过各种贡献以及将 Rust 语言整合到其 Android 平台和其他项目中展示了对 Rust 的支持。

2024 年 Google 向 Rust 基金会捐赠了 100 万美元，将用于改善 C++ 与 Rust 语言之间的互操作性，这是 Google 对软件安全和开源创新承诺的一部分，进一步强化了 Google 对提升软件生态系统的承诺，也表明 Google 对 Rust 在软件开发未来中作用的重要信心。

Rust 的未来充满了无限可能。随着越来越多的企业和开发者开始采用 Rust，这门语言的影响力将会越来越大。

1. **生态系统完善**：Rust 的生态系统正在不断完善，越来越多的库和工具涌现出来。未来，Rust 的生态系统将会更加丰富，为开发者提供更多选择。
2. **社区壮大**：Rust 社区非常活跃，开发者们积极参与到语言的开发和推广中。未来，Rust 社区将会更加壮大，吸引更多开发者加入。
3. **应用场景扩展**：随着 Rust 在各个领域的应用不断扩展，未来我们将会看到更多基于 Rust 的创新项目和产品。
