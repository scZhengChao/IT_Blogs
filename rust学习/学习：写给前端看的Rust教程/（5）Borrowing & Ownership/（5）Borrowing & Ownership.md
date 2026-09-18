# （5）Borrowing & Ownership

## 目录

- [前言](#前言)
- [相关阅读](#相关阅读)
- [基础知识](#基础知识)
  - [变量声明 & 可变性](#变量声明--可变性)
- [Rust的借用审查](#Rust的借用审查)
  - [规则1：所有权（Ownership）](#规则1所有权Ownership)
  - [规则2：借用（Borrowing）](#规则2借用Borrowing)
- [引用](#引用)
- [总结](#总结)

## 前言

在介绍`strings`之前，我们需要先介绍一下所有权（`ownership`），当我们介绍到所有权（`ownership`）的时候，就开始步入`rust`中复杂的部分了，这并不是说这很难理解，而是说`rust`中的规则会在所有地方强迫你重新审视逻辑化和结构化

`rust`的流行和受欢迎是因为它可以在不使用垃圾收集的同时保证内存安全，而其它诸如`JavaScript`、`Go`等语言则是使用垃圾收集来做内存管理，这些语言追踪对象的引用，直到引用数量降到0时释放内存。垃圾收集器以资源和性能为代价为开发人员提供了方便，这套机制大多数情况下是好用的，可一旦遇到问题，就会很棘手，故障排除和优化垃圾收集本身就是一种黑魔法。在`rust`世界里，当你严格遵循规则的时候，就可以抛开垃圾收集实现内存安全

内存安全不仅仅涉及到程序稳定性，还涉及到安全性。例如`SQL`注入，该漏洞源于数据库客户端通过未经处理的用户输入来创建SQL语句，黑客通过传递精心设计的输入来改变数据库内容以及运行新的指令。幸运的是，这类攻击完全可以被100%的预防，不过即便如此，它依然是最普遍的网络攻击。而内存不安全的代码就有点类似`SQL`注入变量，它可以在任何地方，很难查找。内存安全漏洞是大多数严重漏洞的根本原因，完全消除它们而不影响性能是一个有吸引力的概念

## 相关阅读

本指南在可能的情况下会利用已有的资源进行概念的澄清，下面这些内容可以帮助你理解本文相关的知识：

1. [Rust book Ch.3: Common Programming Concepts](https://link.juejin.cn?target=https://doc.rust-lang.org/book/ch03-00-common-programming-concepts.html "Rust book Ch.3: Common Programming Concepts")
2. [Rust book Ch.4: Understanding Ownership](https://link.juejin.cn?target=https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html "Rust book Ch.4: Understanding Ownership")
3. [Rust by Example: Variable Bindings](https://link.juejin.cn?target=https://doc.rust-lang.org/rust-by-example/variable_bindings.html "Rust by Example: Variable Bindings")
4. [Rust by Example: Primitives](https://link.juejin.cn?target=https://doc.rust-lang.org/rust-by-example/primitives.html "Rust by Example: Primitives")
5. [Rust by Example: Flow control](https://link.juejin.cn?target=https://doc.rust-lang.org/rust-by-example/flow_control.html "Rust by Example: Flow control")
6. [Rust by Example: Functions](https://link.juejin.cn?target=https://doc.rust-lang.org/rust-by-example/fn.html "Rust by Example: Functions")

## 基础知识

### 变量声明 & 可变性

`JavaScript`中的变量分为可变和不可变，分别用`let`和`const`来修饰，`rust`中也有`let`和`const`，不过这里需要先忽略`const`。**在**\*\*`JavaScript`****中使用****`const`****的场景，在****`rust`****中需要的是****`let`****而非****`const`****；在在****`JavaScript`****中使用****`let`****的场景，在****`rust`****中需要的是****`let mut`\*\*。默认情况下在`rust`的世界里变量都是不可变的，这是个好事情，当你用习惯了之后，甚至会觉得如果`JavaScript`也是这样就好了

在`JavaScript`中你可以这么写代码：

```javascript 
let one = 1;
console.log({ one });
one = 3;
console.log({ one });

```


对应的`rust`版本是这样的：

```rust 
fn main() {
    let mut mutable = 1;
    println!("{}", mutable);
    mutable = 3;
    println!("{}", mutable);
}

```


在`rust`中如果变量是可变的，**则更改数值的时候需要注意不要更改变量类型，例如下面的代码是无法正常工作**的：

```rust 
fn main() {
    let mut mutable = 1;
    println!("{}", mutable);
    mutable = "3"; // Notice this isn't a number.
    println!("{}", mutable);
}

```


不\*\*过你可以用`let`\*\***声明一个类型不同，名称相同的变量**

```rust 
fn main() {
    let myvar = 1;
    println!("{}", myvar);
    let myvar = "3";
    println!("{}", myvar);
}

```


## Rust的借用审查

为了保证内存安全，`rust`采用了一套严格的规则来加以规范数据的传递、借用以及所有权

### 规则1：所有权（Ownership）

当你把数据赋值给另外一个变量时，原有的变量将因失去数据的所有权而不能再访问变量，例如下面的代码当你试着运行时将会报错：

```rust 
use std::{collections::HashMap, fs::read_to_string};

fn main() {
    let source = read_to_string("./README.md").unwrap();
    let mut files = HashMap::new();
    files.insert("README", source);
    files.insert("README2", source);
}

```


> 注意：在我们的示例代码中你会大量见到`.unwrap()`，不过在正式版代码中最好不要用，后面到`Result & Option`的部分时会详细谈。现在需要了解的关键点是，在示例中这么用没问题，但在你自己的程序中，除非确定你的代码不会出现错误，否则不要用`.unwrap()
> `

当你试图运行上面的代码时，会发现出现错误，请注意这段报错信息`use of moved value: source`，这个提示将会在你的`rust`编程生涯中大量见到

```rust 
error[E0382]: use of moved value: `source`
  |
4 |     let source = read_to_string("./README.md").unwrap();
  |         ------ move occurs because `source` has type `String`, which does not implement the `Copy` trait
5 |     let mut files = HashMap::new();
6 |     files.insert("README", source);
  |                            ------ value moved here
7 |     files.insert("README2", source);
  |                             ^^^^^^ value used here after move

For more information about this error, try `rustc --explain E0382`.

```


当我们将`source`插入`HashMap`的时候，我们放弃了`source`的所有权，如果你想让上面的这段代码编译成功，需要在第一次使用`source`将其克隆：

```rust 
use std::{collections::HashMap, fs::read_to_string};

fn main() {
    let source = read_to_string("./README.md").unwrap();
    let mut files = HashMap::new();
    files.insert("README", source.clone());
    files.insert("README2", source);
}

```


如果不明白为什么会出现所有权丢失，那么重新阅读下 [Ownership and Functions](https://link.juejin.cn/?target=https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html#ownership-and-functions "Ownership and Functions")

> 注意：在上面最初的报错信息里，你可能会留意到有`does not implement the Copy trait`的提示，**关于**\*\*`Copy`****和****`Clone` 的差异，这里想强调一点，​`Clone`\*\***代价更加昂贵且需要程序员手动调用**

### 规则2：借用（Borrowing）

引用不会获得值的所有权，只是借用值的所有权。引用数据的时候，如果数据是不可变的，那么可以无数次的借用；如果是可变的，则只能引用一次（主要出于对并发状态下发生数据访问碰撞的考虑）。**我们在变量前面增加**\*\*`&`来表示这是一个引用，\*\*最常见的使用场景是不用克隆的情况下传递大量的数据

```rust title="use std::{collections::HashMap, fs::read_to_string};fn main() {    let source = read_to_string(%22./README.md%22).unwrap();    let mut files = HashMap::new();    files.insert(%22README%22, source.clone());    files.insert(%22README2%22, source);    let files_ref = &files;    let files_ref2 = &files;    print_borrowed_map(files_ref);    print_borrowed_map(files_ref2);}fn print_borrowed_map(map: &HashMap<&str, String>) {    println!(%22{:?}%22, map)}"
use std::{collections::HashMap, fs::read_to_string};

fn main() {
    let source = read_to_string("./README.md").unwrap();
    let mut files = HashMap::new();
    files.insert("README", source.clone());
    files.insert("README2", source);

    let files_ref = &files;
    let files_ref2 = &files;

    print_borrowed_map(files_ref);
    print_borrowed_map(files_ref2);
}

fn print_borrowed_map(map: &HashMap<&str, String>) {
    println!("{:?}", map)
}

```


> 注意：`println!`中的`{:?}`语法是一种`debug`格式化器，在输出数据信息方面比较有用处

如果你想创建一个可变的引用，需要将`&`改成`&mut`：

```rust 
use std::{collections::HashMap, fs::read_to_string};

fn main() {
    let source = read_to_string("./README.md").unwrap();
    let mut files = HashMap::new();
    files.insert("README", source.clone());
    files.insert("README2", source);

    let files_ref = &mut files;
    let files_ref2 = &mut files;

    needs_mutable_ref(files_ref);
    needs_mutable_ref(files_ref2);
}

fn needs_mutable_ref(map: &mut HashMap<&str, String>) {}

```


但是这样一来当你编译的时候就会报错：

```rust 
error[E0499]: cannot borrow `files` as mutable more than once at a time
   |
9  |     let files_ref = &mut files;
   |                     ---------- first mutable borrow occurs here
10 |     let files_ref2 = &mut files;
   |                      ^^^^^^^^^^ second mutable borrow occurs here
11 |
12 |     needs_mutable_ref(files_ref);
   |                       --------- first borrow later used here

For more information about this error, try `rustc --explain E0499`.

```


> 这段 Rust 代码**会直接编译报错**，核心原因是触发了 Rust 最核心的**可变引用规则**：**同一作用域内，一个值只能拥有**`**一个可变引用**`**（别名不可变，可变不别名）**，这是 Rust 保证内存安全、杜绝数据竞争的关键机制，你的代码里在同一作用域对同一个`HashMap`创建了两个可变引用，直接违反该规则。

> 这是为了**从根本上避免数据竞争**（多线程 / 同一线程中，多个指针同时修改同一内存区域，导致数据错乱、程序崩溃），这也是 Rust 无需 GC 但能保证内存安全的核心设计之一。
> 简单理解：如果允许同时存在两个`&mut HashMap`，那么两个引用可能同时修改同一个`key`（比如同时给`README`赋值），导致 HashMap 的内部结构被破坏，而 Rust 的编译期检查直接杜绝了这种可能性。

`rust`的编译器很智能，而且随着不断的迭代更新也是越来越完善，做出如下调整后，代码会顺利通过编译：

```rust 
use std::{collections::HashMap, fs::read_to_string};

fn main() {
    let source = read_to_string("./README.md").unwrap();
    let mut files = HashMap::new();
    files.insert("README", source.clone());
    files.insert("README2", source);

    let files_ref = &mut files;

    needs_mutable_ref(files_ref);

    let files_ref2 = &mut files;

    needs_mutable_ref(files_ref2);
}

fn needs_mutable_ref(map: &mut HashMap<&str, String>) {}

```


当你开始使用`rust`后会发现，大多数的错误都可以通过调整顺序来解决，在想不通时可以试试

- [ ] **依旧会报错**

## 引用

如果你之前用的一直是`JavaScript`，没有用过诸如`C`之类的语言，你或许会对引用感到困惑，甚至觉的自己根本用不到引用，而实际上在`JavaScript`中你一直在使用引用，`JavaScript`中的每个`Object`都是。如果不使用引用，你就需要每次给函数传递对象时都做一次深拷贝

## 总结

所有权是个核心问题，在`rust`中会反复出现。在面对`Strings`之前，我们需要在下一篇文章中先一个更深入的学习
