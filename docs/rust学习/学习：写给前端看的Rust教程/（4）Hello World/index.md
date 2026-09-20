# （4）Hello World

## 目录

- [前言](#前言)
- [Hello world](#Hello-world)
  - [创建项目](#创建项目)
  - [打包&运行](#打包运行)
  - [源码分析](#源码分析)
- [字符串问题1](#字符串问题1)
- [字符串问题2](#字符串问题2)
- [总结](#总结)

## 前言

如果你从没和编辑成二进制的语言打过交道，用`Rust`的时候也不会感到困难，`Rust`对不同环境下可执行文件的编译做了很好的支持，让程序的移植变得更加轻松，想要了解更多可见：[Cross-compilation](https://link.juejin.cn/?target=https://rust-lang.github.io/rustup/cross-compilation.html#cross-compilation "Cross-compilation")

## Hello world

### 创建项目

首先我们用`cargo new`创建一个`Rust`项目：

```rust 
cargo new rust-test

```


默认情况下，`cargo new`会创建一个二进制应用的模板，这也是我们现在所需要的，不过需要留意的是，你也可以通过`cargo new --lib`命令来创建一个库模板

执行完上面的命令，你会得到这样一个项目：

```rust 
rust-test/
├── .git
├── .gitignore
├── Cargo.toml
└── src
    └── main.rs

```


我们使用的`Rust`版本是`2021`，如果你的`Cargo.toml`文件中`edition`的值是`2018`那么就要留意了，本文都是以`2021`版为准（`2018`和`2021`之间的差异很大，`edition`类似`ECMAScript versions`）

### 打包&运行

现在我们可以尝试运行下这个项目，执行`cargo run`命令：

```rust 
$ cargo run
   Compiling rust-test v0.1.0 (\rust-test)
    Finished dev [unoptimized + debuginfo] target(s) in 1.28s
     Running `target\debug\rust-test.exe`
Hello, world!


```


`cargo run`会调用`cargo build`来打包你的应用，然后运行默认（也可以指定）的二进制文件，运行完这个命令后，会生成好二进制文件，具体的位置是`./target/debug/my-app`。如果你只是想打包而不不运行，可以执行`cargo build`命令。默认情况下会生成文件大小、性能等`debug`信息，当你想要得到`release`版代码时，可以运行`cargo build --release`，此时二进制文件的生成目录是`./target/release/rust-test`

### 源码分析

下面我们来看下模板中的`src/main.rs`文件

```rust 
fn main() {
  println!("Hello, world!");
}

```


`main()`函数在独立可执行文件中是不可或缺的，是程序的入口。`println!()`是一个宏，用于将参数输出到`STDOUT`，关于宏我们后面会再详细介绍。`"Hello, world!"`是一段字符串，这很`rust`，因为字符串将是学习`rust`的第一个拦路虎，下面就让我们具体了解下

## 字符串问题1

首先我们将`"Hello, world!"`赋值给一个`let`修饰的变量（`rust`中采用`let`和`const`作为关键词，这点类似`JavaScript`。不过如果你在`JavaScript`中使用`const`的情景，在`rust`绝大大多数下要使用`let`）

```rust 
fn main() {
  let greeting = "Hello, world!";
  println!(greeting);
}

```


此时，如果你的`VS Code`按照上一篇文章所介绍的那样做好了配置的话，此时你已经能在`VS Code`中看到错误提示了

![](./assets/image/image_vNFTjHoeDx.png)

忽略这个提示，试着执行下`cargo run`试试看：

```rust 
$ cargo run
  
  Compiling rust-test v0.1.0 (rust-test)
error: format argument must be a string literal
 --> src\main.rs:3:14
  |
3 |     println!(greeting);
  |              ^^^^^^^^
  |
help: you might be missing a string literal to format with
  |
3 |     println!("{}", greeting);
  |              +++++

error: could not compile `rust-test` due to previous error

```


如果你希望上面的代码能正常运行，那你就是个“正常的”程序员，因为在很多语言里这是行的通的，字符串就是字符串。但是在`rust`的世界这是不行的。在编写`rust`代码时要习惯查看报错信息，报错信息不仅会告诉你遇到了什么问题，还会告诉你如何修复。`println!()`的第一个参数需要是个字符串，并且支持将其用变量格式化，将代码进行如下的改动：

```rust 
fn main() {
  let greeting = "Hello, world!";
+  println!("{}", greeting);
}

```


再次执行`cargo run`，此时运行正确

## 字符串问题2

对于经验老到的程序员来说，希望可以抽象代码以便进行复用，很可能一开始会写出这样的代码：

```rust 
fn main() {
  greet("World");
}

fn greet(target: String) {
  println!("Hello, {}", target);
}

```


按照以往的编程经验来看，上面这段代码应该没啥问题，但一执行就会发现问题：

```rust 
$ cargo run
  
  Compiling rust-test v0.1.0 (rust-test)
error[E0308]: mismatched types
 --> src\main.rs:2:11
  |
2 |     greet("World");
  |           ^^^^^^^- help: try using a conversion method: `.to_string()`
  |           |
  |           expected struct `String`, found `&str`

For more information about this error, try `rustc --explain E0308`.
error: could not compile `rust-test` due to previous error

```


按照提示执行`rustc --explain E0308`可以得到更多的信息，我们可以通过如下方式进行修复：

```rust 
fn main() {
+    greet("World".to_string());
}

fn greet(target: String) {
    println!("Hello, {}", target);
}

```


具体原因详见 [String vs \&str in Rust](https://link.juejin.cn/?target=https://blog.thoughtram.io/string-vs-str-in-rust/ "String vs \&str in Rust")

## 总结

在`rust`中需要大脑时时刻刻对`strings`保持警惕，在下文中我们将要介绍所有权（`ownership`）的概念，这可以帮你解答本文中关于`strings`的一些疑惑
