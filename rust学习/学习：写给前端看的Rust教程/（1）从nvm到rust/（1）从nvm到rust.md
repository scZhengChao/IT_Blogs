# （1）从nvm到rust

## 目录

- [前言](#前言)
- [正文](#正文)

## 前言

`Rust`的学习曲线非常陡峭，即便是系统程序员学习起来也会遇到困难。鉴于目前`Rust`对`WebAssembly`的支持是最好的，对于`web`程序员来说，你可以将`CPU`密集型的`JavaScript`逻辑用`Rust`重写，然后再用`WebAssembly`来运行，`JavaScript`和`Rust`的结合将会让你获得驾驭一切的力量

本教程不追求大而全，读者最好有`Node.js`的使用经验，文中会不断拿`JavaScript`、`TypeScript`与`Rust`中的对应部分相类比来帮助读者更好的理解

此外，本文不能代替[The Rust Book](https://link.juejin.cn/?target=https://doc.rust-lang.org/stable/book/ "The Rust Book")，这个文档始终是你学习`rust`最应该阅读的，而且是反复阅读。一些[The Rust Book](https://link.juejin.cn/?target=https://doc.rust-lang.org/stable/book/ "The Rust Book") 中有的内容我们不会再详细介绍了，如过遇到，我们会给出相应的链接

## 正文

在`Node.js`世界，我们用[nvm](https://link.juejin.cn?target=https://github.com/nvm-sh/nvm "nvm")或[nvm-windows](https://link.juejin.cn?target=https://github.com/coreybutler/nvm-windows "nvm-windows")来做不同版本`Node.js`的无缝安装和切换。在`Rust`世界中对应的是[rustup](https://link.juejin.cn?target=https://rustup.rs/ "rustup")

`rustup`负责管理`Rust`的安装以及额外的编译目标（如`WebAssembly`），除此之外还包含一些核心的工具，如`cargo`（`Rust`版的`npm`）、`clippy`（`Rust`版的`eslint`）、`rustfmt`（`Rust`版的`prettier`）。在使用`Rust`之前我们首先安装好`Rustup`\[[**安装连接**](https://link.juejin.cn?target=https://www.rust-lang.org/tools/install "安装连接")]，安装完毕之后，执行`rustup`命令会看到如下的结果：

```bash 
$ rustup
rustup 1.24.3 (ce5817a94 2021-05-31)
The Rust toolchain installer

USAGE:
    rustup [FLAGS] [+toolchain] <SUBCOMMAND>

FLAGS:
    -v, --verbose    Enable verbose output
    -q, --quiet      Disable progress output
    -h, --help       Prints help information
    -V, --version    Prints version information

ARGS:
    <+toolchain>    release channel (e.g. +stable) or custom toolchain to set override

SUBCOMMANDS:
    show           Show the active and installed toolchains or profiles
    update         Update Rust toolchains and rustup
    check          Check for updates to Rust toolchains and rustup
    default        Set the default toolchain
    toolchain      Modify or query the installed toolchains
    target         Modify a toolchain's supported targets
    component      Modify a toolchain's installed components
    override       Modify directory toolchain overrides
    run            Run a command with an environment configured for a given toolchain
    which          Display which binary will be run for a given command
    doc            Open the documentation for the current toolchain
    man            View the man page for a given command
    self           Modify the rustup installation
    set            Alter rustup settings
    completions    Generate tab-completion scripts for your shell
    help           Prints this message or the help of the given subcommand(s)

DISCUSSION:
    Rustup installs The Rust Programming Language from the official
    release channels, enabling you to easily switch between stable,
    beta, and nightly compilers and keep them updated. It makes
    cross-compiling simpler with binary builds of the standard library
    for common platforms.

    If you are new to Rust consider running `rustup doc --book` to
    learn Rust.

```


默认情况下，`rustup`会安装最新版本的`rust`和`cargo`：

```bash 
$ rustc --version
rustc 1.57.0 (59eed8a2a 2021-11-01)

$ cargo --version
cargo 1.56.0 (4ed5d137b 2021-10-04)

```
