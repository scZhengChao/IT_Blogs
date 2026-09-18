# ABI稳定性

## 目录

- [介绍](#介绍)
- [Node.js中的ABI稳定性](#Nodejs中的ABI稳定性)
- [N-API](#N-API)

### 介绍

应用程序二进制接口（ABI）是程序调用函数和使用其他编译程序的数据结构的一种方法，它是应用程序编程接口（API）的编译版本，换句话说，头文件描述了类、函数、数据结构、枚举和常量，使应用程序能够通过编译到一组地址来执行所需的任务，和预期参数值和内存结构大小以及编译ABI提供程序的布局。

必须编译使用ABI的应用程序，以使可用地址、预期参数值、内存结构大小和布局与编译ABI提供程序的那些一致，这通常通过编译ABI提供程序提供的头文件来完成。

由于ABI的提供者和ABI的用户可以在不同的时间使用不同版本的编译器进行编译，因此确保ABI兼容性的一部分责任在于编译器。不同版本的编译器，也许由不同的供应商提供，必须从具有特定内容的头文件生成相同的ABI，并且必须根据头文件中描述所产生的ABI约定，使用访问给定头中描述的API的ABI为应用程序生成代码。现今编译器具有相当好的跟踪记录，即不破坏它们编译的应用程序的ABI兼容性。

确保ABI兼容性的剩余责任在于团队维护头文件，这些头文件提供了在编译时在ABI中保持稳定的API。可以对头文件进行更改，但必须密切跟踪更改的性质，以确保在编译时，ABI的更改方式不会使ABI的现有用户与新版本不兼容。

### Node.js中的ABI稳定性

Node.js提供由几个独立团队维护的头文件，例如，node.js团队维护诸如`node.`h和`node_buffer.h`之类的头文件。`v8.h`由V8团队维护，尽管与Node.js团队密切合作，但该团队是独立的，并且有自己的时间表和优先级。因此，Node.js团队只能部分控制项目提供的头中引入的更改，因此，Node.js项目采用了[语义版本控制](https://link.segmentfault.com/?enc=+Ystxa4wdy2V/gGIMkAqjw==.saOawn/T2UuoKz86I5gi6+23Ybx4pf0kRjSqY83wpaI= "语义版本控制")。这可确保项目提供的API将为一个主要版本中发布的Node.js的所有次要版本和修补程序版本提供稳定的ABI，在实践中，这意味着Node.js项目已承诺确保针对给定主要版本的Node.js编译的Node.js原生插件将在由编译它的主要版本中的任何Node.js次要或补丁版本加载时成功加载。

### N-API

对Node.js配备API的需求已经出现，这导致ABI在多个Node.js主要版本中保持稳定，创建这样一个API的动机如下：

- JavaScript语言从很早就开始与自身兼容，而执行JavaScript代码的引擎的ABI随Node.js的每个主要版本而变化。这意味着完全用JavaScript编写的Node.js包组成的应用程序无需重新编译、重新安装或重新部署，因为Node.js的新主要版本被放入生产环境中，此类应用程序运行在该环境中。相反，如果应用程序依赖于包含原生插件的包，则只要将新的主要版本的Node.js引入生产环境，就必须重新编译、重新安装和重新部署应用程序。包含原生插件的Node.js包与完全用JavaScript编写的包之间的这种差异增加了依赖原生插件的生产系统的维护负担。
- 其他项目已经开始生成JavaScript接口，这些接口本质上是Node.js的替代实现，由于这些项目通常构建在与V8不同的JavaScript引擎上，因此它们的原生插件必然采用不同的结构并使用不同的API。然而，在Node.js JavaScript API的不同实现中使用单个API作为原生插件将允许这些项目利用围绕Node.js积累的JavaScript包的生态系统。
- Node.js将来可能包含不同的JavaScript引擎，这意味着，在外部，所有Node.js接口将保持不变，但V8头文件将不存在。如果与JavaScript引擎无关的API不是由Node.js首先提供并由原生插件采用，那么这样的步骤通常会导致Node.js生态系统的中断，特别是原生插件的中断。

为此，Node.js在版本8.6.0中引入了N-API，并将其标记为Node.js 8.12.0中项目的稳定组件。API在头文件[node\_api.h](https://link.segmentfault.com/?enc=1Rs02lEV5c+SdbOX9BCCcw==.0GrtemhOWHV3i/DyJlb386rDF1PVyxSn+0nyELytcXWtwxnrOdEes5D5EymCslngOptFi7IBu5ynCnTi04Z7Gw== "node_api.h")和[node\_api\_types.h](https://link.segmentfault.com/?enc=f5EFB+ZwiTD+bnprKgAUgQ==.5WsC8aFJmXh1nFTf/SbIPdF2GRPwTkoAZCgKv+ZfFKB2yAxBSFvMFesDVX/OPPPgz9wyWUzGrrAq7UY0PQ8KBw== "node_api_types.h")中定义，并提供跨越Node.js主要版本边界的前向兼容性保证，保证可以说明如下：

**N-API的给定版本n将在发布它的Node.js的主要版本中提供，以及Node.js的所有后续版本，包括后续主要版本。**

原生插件作者可以通过确保插件仅使用`node_api.h`中定义的API以及`node_api_types.h`中定义的数据结构和常量来利用N-API前向兼容性保证。通过这样做，作者通过向生产用户表明，对于他们的应用程序来说，添加原生插件不会增加维护负担，就像添加纯JavaScript编写的包一样。

N-API已版本化，因为有时会添加新API，与语义版本控制不同，N-API版本控制是累积的。也就是说，每个版本的N-API都传达了与semver系统中的次要版本相同的含义，意味着对N-API所做的所有更改都将向后兼容。此外，在实验标志下添加了新的N-API，以便社区有机会在生产环境中审核它们。

实验状态意味着，虽然已经注意确保将来不必以ABI不兼容的方式修改新API，在生产中尚未充分证明其正确和有用的设计，因此，在最终纳入即将推出的N-API版本之前，可能会进行ABI不兼容的更改。也就是说，前向兼容性保证尚未涵盖实验性N-API。
