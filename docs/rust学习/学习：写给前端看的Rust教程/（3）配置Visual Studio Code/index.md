# （3）配置Visual Studio Code

## 目录

- [核心配置](#核心配置)
  - [可视化配置](#可视化配置)
  - [额外的lint工具](#额外的lint工具)
  - [关闭额外的提示](#关闭额外的提示)
  - [自动更新](#自动更新)
- [更多的拓展](#更多的拓展)
  - [vscode-lldb](#vscode-lldb)
  - [better-toml](#better-toml)
  - [crates](#crates)
  - [search-crates-io](#search-crates-io)
- [总结](#总结)

[Visual Studio Code](https://link.juejin.cn?target=https://code.visualstudio.com/ "Visual Studio Code")一出场便在`JavaScript`生态系统中占据着举足轻重的地位，`Rust`的插件虽然不如`JavaScript`那般丰富，但增长的势头也是显而易见的，其中一些重要的功能已经支持的较好：

- 代码补充/智能提示
- 警告提示
- 调试
- 自动化的代码重构
- 自动化的文档提示
- 跳转到定义处、代码执行、类型支持等

## 核心配置

`Visual Studio Code`下的`Rust`生态有两个比较重要的插件：[Rust](https://link.juejin.cn?target=https://marketplace.visualstudio.com/items?itemName=rust-lang.rust "Rust")和[rust-analyzer](https://link.juejin.cn?target=https://marketplace.visualstudio.com/items?itemName=matklad.rust-analyzer "rust-analyzer") 。二者的功能类似，不过后者的可靠性更好一些，更新也更加活跃。需要留意的是这两个插件不能同时使用，如果都安装了，你需要禁用其中一个。

[rust-analyzer](https://link.juejin.cn?target=https://marketplace.visualstudio.com/items?itemName=matklad.rust-analyzer "rust-analyzer")下载完毕之后就能使用了，不过注意他还需要从`github`下载额外的文件，此时留意你的`github token`是否过期，过期的话会导致安装失败，重新输入`token`即可。

### 可视化配置

可以通过`UI`界面或者`JSON`方式对插件进行配置，执行`Ctrl+Shift+P`命令后可以进行选择

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/897036eb4a8c43809bbaab07c6b637a7~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

### 额外的lint工具

默认情况下`rust-analyzer`会在文件保存时通过运行`cargo check`来收集错误信息，`cargo check`的本质是通过编译项目获取报错的。如果你想更近一步，你需要`clippy`，`clippy`类似`ESLint`，我们可以通过`rustup component add clippy`命令进行安装（默认情况下已安装）。

我们可以手动运行`cargo clippy`或是通过`rust-analyzer`运行`clippy`来获取额外的报错信息。当然代价是速度会更慢一些，不过还是值得的。在实践中发现`clippy`是学习`Rust`不可获取的工具之一，它经常会给出一些更自然高效的写法。

我们可以通过如下方式配置`clippy`：

```json 
{
  "rust-analyzer.checkOnSave.command": "clippy"
}

```


### 关闭额外的提示

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7c132b520674249aececd0733ffc229~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

有些人可能会觉得`rust-analyzer`的内嵌提示过细，内容太多，我们可以通过如下方式来关闭提示：

```json 
{
  "rust-analyzer.inlayHints.enable": false,
  "rust-analyzer.inlayHints.chainingHints": false,
  "rust-analyzer.inlayHints.parameterHints": false
}

```


### 自动更新

默认情况下`rust-analyzer`会自动更新到最新版，如果你不希望如此，可以通过下面的配置更改：

```json 
{
  "rust-analyzer.updates.askBeforeDownload": true
}

```


## 更多的拓展

### vscode-lldb

[vscode-lldb](https://link.juejin.cn/?target=https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb "vscode-lldb") 可以帮助你更好地帮助你调试`Rust`应用

![](./assets/image/image_iQbcOHYLgc.png)

### better-toml

[better-toml](https://link.juejin.cn?target=https://marketplace.visualstudio.com/items?itemName=bungcip.better-toml "better-toml")提供了`TOML`文件的语法高亮以及`lint`功能

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fc0a73fcfb70416da0d27127129541ef~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b73b8465f82d4c64a93e72543a6db046~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

### crates

[crates](https://link.juejin.cn?target=https://marketplace.visualstudio.com/items?itemName=serayuzgur.crates "crates") 会展示出最新版本的依赖并提供了更新的快捷方式

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5c62d5317954dce80cdf5fa33562599~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

### search-crates-io

[search-crates-io](https://link.juejin.cn?target=https://marketplace.visualstudio.com/items?itemName=belfz.search-crates-io "search-crates-io")会尝试帮助你补全`Cargo.toml`中依赖包的名称

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9bb331b600684e23be827ef31b281e24~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

## 总结

工欲善其事,必先利其器。`IDE`不是编程的全部，但一个好的`IDE`会让编程更加得心应手，如果大家有关于`IDE`方面更好的建议，欢迎分享
