# （2）从npm到cargo

## 目录

- [前言](#前言)
- [对应关系](#对应关系)
  - [项目配置文件](#项目配置文件)
  - [初始化新项目](#初始化新项目)
  - [安装依赖](#安装依赖)
  - [全局安装](#全局安装)
  - [运行测试](#运行测试)
  - [发布模块](#发布模块)
  - [运行任务](#运行任务)
  - [workspace与monorepo](#workspace与monorepo)
  - [额外的工具](#额外的工具)
    - [cargo-edit](#cargo-edit)
    - [cargo-workspaces](#cargo-workspaces)
    - [cargo-expand](#cargo-expand)
    - [tomlq](#tomlq)
- [总结](#总结)

## 前言

在`rust`世界中，`cargo`所扮演的角色是包管理器，类似`Node.js`中`npm`的作用。默认情况下`cargo`会从 [crates.io](https://link.juejin.cn/?target=https://crates.io/ "crates.io") 下载所需要的依赖包，你可以在这上面注册账号并推送包，类似你在 [npmjs.com](https://link.juejin.cn/?target=https://npmjs.com/ "npmjs.com") 所做的那样

## 对应关系

### 项目配置文件

在`Node.js`中我们使用`package.json`作为配置文件，而在`rust`中我们采用`Cargo.toml`。`Cargo.toml`采用的是[toml](https://link.juejin.cn?target=https://toml.io/en/ "toml")格式而非`JSON`。`Cargo.toml`文件的作用是告诉`cargo`当前项目依赖哪些模块、如何运行测试以及如何`build`你的项目，更多信息可见[The Manifest Format](https://link.juejin.cn?target=https://doc.rust-lang.org/cargo/reference/manifest.html#the-manifest-format "The Manifest Format")

### 初始化新项目

在`Node.js`中我们使用`npm init`命令进行初始化，在`rust`中我们使用`cargo init`和`cargo new`命令做同样的事情。`cargo init`会在当前文件夹中做初始化，`cargo new`则是会指定一个文件夹

### 安装依赖

在`Node.js`中我们使用`npm install [dep]`命令来安装依赖的模块，如果安装了 [cargo-edit](https://link.juejin.cn/?target=https://github.com/killercup/cargo-edit "cargo-edit") 那么在`rust`中我们可以使用`cargo add [dep]`来增添依赖，安装方法：

```rust 
cargo install cargo-edit

```


安装完毕后，会增加4个子命令：`add`、`rm`、`upgrade`、`set-version`

### 全局安装

类比`Node.js`中的`npm install --global`，在`rust`中我们使用`cargo install`

### 运行测试

类比`Node.js`中的`npm test`，在`rust`中我们使用`cargo test`

### 发布模块

类比`Node.js`中的`npm publish`，在`rust`中我们使用`cargo publish`

### 运行任务

在`Node.js`中我们使用`npm run xxx`来运行任务，然而在`rust`中除了几个常见的命令外，其余的都是取决于用户自己。例如我们可以通过`cargo run`来运行一个代码，或者用`cargo bench`分析一段代码的性能，或者是用`cargo build`来做打包，或者是用`cargo clean`来清空打包目录（默认是`target`），或者是用`cargo doc`生成文档。`cargo`还支持[Build Scripts](https://link.juejin.cn?target=https://doc.rust-lang.org/cargo/reference/build-scripts.html#build-scripts "Build Scripts") 机制确保可以打包之前运行指定的程序。

在`JavaScript`中已经不需要`Makefile`，但在`Rust`中就没那么幸运了，`Makefile`还是很常见。不过[just](https://link.juejin.cn?target=https://github.com/casey/just "just")正在被广泛接受，它弥补了`Makefile`的一些弱点，语法上也很相似，可以如下安装：

```bash 
$ cargo install just

```


cargo-make和cargo-cmd也是很好的替代方案

### workspace与monorepo

包管理器在处理大项目中的小模块时一般都会用到`workspace`概念，在`Rust`中你可以在根目录下创建一个`Cargo.toml`文件作为`workspace`的入口，描述清楚`workspace`中所包含的内容，大体上类似如下：

```yaml 
[workspace]
members = [
  "crates/*"
]

```


`workspace`中相互引用的各个模块可以指向本地的文件夹作为依赖项：

```rust 
[dependencies]
other-project = { path = "../other-project" }

```


### 额外的工具

#### cargo-edit

上文已经介绍、不再赘述

#### cargo-workspaces

`cargo workspaces`（或`cargo ws`）将`workspaces`的创建和管理进行了简化，受`Node.js`的`lerna`启发，最大的价值在于自动发布`workspaces`中的模块以及替换本地依赖。我们可以通过如下方式进行安装：

```bash 
$ cargo install cargo-workspaces

```


#### cargo-expand

在`Rust`中宏是如此的常见，以至于即便是你的第一个`hello word`程序也离不开宏的使用。宏可以帮助你减少冗余代码，但是却会增加调试的困难，`cargo-expand`有助于减少调试中遇到的困难。`cargo-expand`依赖于`nightly`工具链：

```rust 
rustup install nightly

```


然后安装`cargo-expand`：

```bash 
$ cargo install cargo-expand

```


安装完成后，可以通过`cargo expand [item]`打印出完整的源码

> 注意：`cargo expand`接受一个名称，不是一个文件路径。`cargo expand main`命令不是展开`src/main.rs`，而是展开项目的根目录中的`main()`函数。通常来说，展开`src/some_module/another`文件中的模块，可以运行`cargo expand some_module::another`。 不用担心，后面会继续深入介绍。

举例来说，执行`cargo new`命令会生成一个`src/main.rs`文件：

```rust 
fn main() {
  println!("Hello, world!");
}

```


其中`println!()`就是一个宏，我们运行`cargo expand`命令来看看生成的结果：

```rust 
fn main() {
    {
        ::std::io::_print(::core::fmt::Arguments::new_v1(
            &["Hello, world!\n"],
            &match () {
                () => [],
            },
        ));
    };
}

```


#### tomlq

这不是一个`cargo xx`类型的命令，在查询`.toml`文件中的数据时很有用处

## 总结

当你添加了`cargo-edit`之后从`npm`到`cargo`的对照显得非常清晰，后面会介绍如何在`Visual Studio Code`中配置`rust`开发环境
