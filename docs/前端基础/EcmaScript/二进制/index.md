# 二进制

## 目录

- [谁说前端不需要懂二进制](#谁说前端不需要懂二进制)
- [二进制相关数据类型](#二进制相关数据类型)

## 谁说前端不需要懂二进制

&#x20;        作为一名前端，在工作中也会遇到很多有关二进制处理的需求，**如 EXCEL 表格的导出，PDF 的生成，多个文件的打包，音频的处理**。

&#x20;        从前后端整体上来说前端代表 UI 层，它的外在表现是 human readable 的，而服务端代表数据层，所表现出来的是 machine readable。如果 EXCEL 以及 PDF 的处理交由服务端处理，服务端免不了要做一层格式化的逻辑处理，以便与前端保持一致。一来增加了复杂度，二来容易造成前端与服务器端的数据不一致。此时为了减少复杂度，**工作量有可能都尽可能在浏览器端完成**。

&#x20;      本篇文章总结了浏览器端的**二进制以及有关数据之间的转化**，如 `ArrayBuffer`，`TypedArray`，`Blob`，`DataURL`，`ObjectURL`，`Text`之间的互相转换。为了更好的理解与方便以后的查询，特意做了一张图做总结。

![  ](./image/50e165c24138569bacbfbf7d1a6b5e1f_5eFc2TCIHJ.png "  ")

## **二进制相关数据类型**

在介绍常见的二进制数据处理之前，先简单介绍下几种二进制相关的数据类型

[ArrayBuffer && TypedArray](<./ArrayBuffer && TypedArray/index.md> "ArrayBuffer && TypedArray")

[Blob](./Blob/index.md "Blob")

[数据输入输出](./方案/数据输入输出/index.md "数据输入输出")

[数据转换](./数据转换/index.md "数据转换")

[实践](https://www.wolai.com/nZyjuWD1W5CNKaTYv4Ek21 "实践")

[Blob](./Blob/index.md "Blob")

[数据转换](./数据转换/index.md "数据转换")

[总结](IT/前端基础/EcmaScript/二进制/总结/总结.md "总结")

[方案](IT/前端基础/EcmaScript/二进制/方案/方案.md "方案")

[FileReader](./FileReader/index.md "FileReader")

[ArrayBuffer && TypedArray](<./ArrayBuffer && TypedArray/index.md> "ArrayBuffer && TypedArray")

[网络传输](./网络传输/index.md "网络传输")

[File对象](IT/前端基础/EcmaScript/二进制/File对象/File对象.md "File对象")
