# ArrayBuffer&#x20;

## 目录

- [ArrayBuffer 和 blob 的关系](#ArrayBuffer-和-blob-的关系)

> ArrayBuffer 对象用来表示通用的、固定长度的原始二进制数据缓冲区，是**最基础的原始数据容器**。

官方的定义不是很明了，通俗的讲，ArrayBuffer 是一串**有固定长度的、连续的内存地址**，存储了一段二进制数据。

**ArrayBuffer 本身是不能读写的**，只能通过视图（`Typed Array View | Data View`）来读写；所以要想在前端操作二进制数据，就需要依赖这两个视图提供的方法。最经典的例子就是将 dataUrl 转成 blob 对象再下载。

## ArrayBuffer 和 blob 的关系

这里提到了 blob 对象，顺便说一下 `ArrayBuffer` 和 `blob `的关系

> `Blob` 对象表示一个不可变、原始数据的**类文件对象**。

&#x20;     blob 对象可以从字符或者 **`ArrayBuffer`**` `创建而来，成为我们想要的格式的对象，比如`image/png`、`application/pdf`。我们也可以通过 `FileReader` 这个 api 将 blob 转回 ArrayBuffer！

&#x20;    我们可以通过视图来操作 `ArrayBuffer `但是**却不能操作 Blob 对象，他是一个不可变的的的类文件对象**，只有一个 `slice` 方法。从这个角度而言 ArrayBuffer 是一个更接近底层的二进制数据容器！

&#x20;      回到 ArrayBuffer 对象本身，我们说了 ArrayBuffer 本身是不可读写的，只能通过视图来操作。那么我们就来看看两种试图分别如何处理！

[Typed Array](<./Typed Array/index.md> "Typed Array")

[Data view](<./Data view/index.md> "Data view")
