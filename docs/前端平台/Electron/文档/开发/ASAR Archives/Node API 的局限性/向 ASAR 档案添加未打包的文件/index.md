# 向 ASAR 档案添加未打包的文件

如上所述，某些 `Node API `被调用**时会解压文件到文件系统**。 除了性能问题外，可能会触犯各种防病毒扫描程序。

你可以把使用`--unpack` 选项作为将**各种文件保持为非压缩状态的一种解决方法**。 在下面的示例中，原生Node.js模块的共享库将不会被打包：

```javascript 
$ asar pack app app.asar --unpack *.node
```


运行命令后，您将会看到 `app.asar.unpacked` 文件夹与 `app.asar` 文件**一起被创建**了。\*\* 没有被打包的文件\*\*和 `app.asar` 会一起存档发布。
