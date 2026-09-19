# [生成一个秘密数字](https://kaisery.github.io/trpl-zh-cn/ch02-00-guessing-game-tutorial.html?search=#生成一个秘密数字 "生成一个秘密数字")

## 目录

- [使用 crate 来增加更多功能](#使用-crate-来增加更多功能)
  - [Cargo.lock 文件确保可重现构建](#Cargolock文件确保可重现构建)
  - [更新 crate 到一个新版本](#更新-crate-到一个新版本)
- [生成一个随机数](#生成一个随机数)

接下来，需要生成一个秘密数字，好让用户来猜。秘密数字应该每次都不同，这样重复玩才不会乏味；范围应该在 1 到 100 之间，这样才不会太困难。Rust 标准库中尚未包含随机数功能。然而，Rust 团队还是提供了一个包含上述功能的 [rand](https://crates.io/crates/rand "rand")[ crate](https://crates.io/crates/rand " crate")。

### [使用 crate 来增加更多功能](https://kaisery.github.io/trpl-zh-cn/ch02-00-guessing-game-tutorial.html?search=#使用-crate-来增加更多功能 "使用 crate 来增加更多功能")

记住，**crate 是一组 Rust 源代码文件。我们正在构建的项目是一个 *****二进制 crate*****，它生成一个可执行文件**。 `rand` crate 是一个 *库 crate***，库 crate 可以包含任意能被其他程序使用的代码，但是无法独立执行****。** ​

Cargo 对外部 crate 的运用是其真正的亮点所在。在我们使用 `rand` 编写代码之前，需要修改 *Cargo.toml* 文件，引入一个 `rand` 依赖。现在打开这个文件并将下面这一行添加到 `[dependencies]` section 标题之下。在当前版本下，请确保按照我们这里的方式指定 `rand`，否则本教程中的示例代码可能无法工作。

文件名：Cargo.toml

```rust 
[dependencies]
rand = "0.8.5"

```


在 *Cargo.toml* 文件中，标题以及之后的内容属同一个 section，直到遇到下一个标题才开始新的 section。`[dependencies]` section 告诉 Cargo 本项目依赖了哪些外部 crate 及其版本。本例中，我们使用语义化版本 `0.8.5` 来指定 `rand` crate。Cargo 理解 [语义化版本（Semantic Versioning）](http://semver.org/ "语义化版本（Semantic Versioning）")（有时也称为 *SemVer*），这是一种定义版本号的标准。**`0.8.5` 事实上是 ****`^0.8.5`**** 的简写，它表示任何至少是 ****`0.8.5`**** 但小于 ****`0.9.0`**** 的版本。**

Cargo 认为这些版本与 `0.8.5` 版本的公有 API 相兼容，这样的版本指定确保了我们可以获取能使本章代码编译的最新的补丁（patch）版本。任何大于等于 `0.9.0` 的版本不能保证和接下来的示例采用了相同的 API。

现在，不修改任何代码，构建项目，如示例 2-2 所示。

```rust 
$ cargo build
  Updating crates.io index
   Locking 15 packages to latest Rust 1.85.0 compatible versions
    Adding rand v0.8.5 (available: v0.9.0)
 Compiling proc-macro2 v1.0.93
 Compiling unicode-ident v1.0.17
 Compiling libc v0.2.170
 Compiling cfg-if v1.0.0
 Compiling byteorder v1.5.0
 Compiling getrandom v0.2.15
 Compiling rand_core v0.6.4
 Compiling quote v1.0.38
 Compiling syn v2.0.98
 Compiling zerocopy-derive v0.7.35
 Compiling zerocopy v0.7.35
 Compiling ppv-lite86 v0.2.20
 Compiling rand_chacha v0.3.1
 Compiling rand v0.8.5
 Compiling guessing_game v0.1.0 (file:///projects/guessing_game)
  Finished `dev` profile [unoptimized + debuginfo] target(s) in 2.48s

```


示例 2-2：将 rand crate 添加为依赖之后运行 `cargo build` 的输出

可能会出现不同的版本号（多亏了语义化版本，它们与代码是兼容的！），并且显示的行数可能会有所不同（取决于操作系统），行的顺序也可能会不同。

现在我们有了一个外部依赖，**Cargo 从 *****registry***** 上获取所有包的最新版本信息，这是一份来自 **[**Crates.io**](https://crates.io/ "Crates.io")** 的数据副本。**[**Crates.io**](http://Crates.io "Crates.io")\*\* 是 Rust 生态系统中，人们发布其开源 Rust 项目的平台，供他人使用。\*\* ​

在更新完 *registry* 后，Cargo 检查 `[dependencies]` section 并下载列表中包含但还未下载的 crate。本例中，虽然只声明了 `rand` 一个依赖，然而 Cargo 还是额外获取了 `rand` 所需要的其他 crate，因为 `rand` 依赖它们来正常工作。下载完成后，Rust 编译依赖，然后使用这些依赖编译项目。

如果不做任何修改，立刻再次运行 `cargo build`，则不会看到任何除了 `Finished` 行之外的输出。Cargo 知道它已经下载并编译了依赖，同时 *Cargo.toml* 文件也没有变动。Cargo 还知道代码也没有任何修改，所以它不会重新编译代码。因为无事可做，它会简单地退出。

如果打开 *src/main.rs* 文件，做一些无关紧要的修改，保存并再次构建，你将只会看到两行输出：

```markdown 
$ cargo build
   Compiling guessing_game v0.1.0 (file:///projects/guessing_game)
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.13s

```


这一行表示 Cargo 只针对 *src/main.rs* 文件的微小修改而更新构建。依赖没有变化，所以 Cargo 知道它可以复用已经为此下载并编译的代码。

#### [*Cargo.lock*](https://kaisery.github.io/trpl-zh-cn/ch02-00-guessing-game-tutorial.html?search=#cargolock-文件确保可重现构建 "Cargo.lock")[ 文件确保可重现构建](https://kaisery.github.io/trpl-zh-cn/ch02-00-guessing-game-tutorial.html?search=#cargolock-文件确保可重现构建 " 文件确保可重现构建")

Cargo 有一个机制，确保无论是你还是其他人在任何时候重新构建代码，都会生成相同的构建产物：Cargo 只会使用你指定的依赖版本，除非你明确指定其他版本。例如，如果下周 `rand` crate 的 `0.8.6` 版本出来了，该版本包含了一个重要的 bug 修复，但同时也引入了一个会破坏你代码的回归问题。为了解决这个问题，Rust 在你第一次运行 `cargo build` 时创建了 *Cargo.lock* 文件，我们现在可以在 *guessing\_game* 目录找到它。

当第一次构建项目时，Cargo 计算出所有符合要求的依赖版本并写入 *Cargo.lock* 文件。当将来构建项目时，Cargo 会发现 *Cargo.lock* 已存在并使用其中指定的版本，而不是再次计算所有的版本。这使得你拥有了一个自动化的可重现构建（reproducible build）。换句话说，项目会持续使用 `0.8.5` 直到你显式升级，多亏有了 *Cargo.lock* 文件。**由于 *****Cargo.lock***** 文件对于可重现构建非常重要，因此它通常会和项目中的其余代码一样提交到版本控制系统中。**

#### [更新 crate 到一个新版本](https://kaisery.github.io/trpl-zh-cn/ch02-00-guessing-game-tutorial.html?search=#更新-crate-到一个新版本 "更新 crate 到一个新版本")

\*\*当你 确实 需要升级 crate 时，Cargo 提供了这样一个命令，****`update`****，它会忽略 *****Cargo.lock***** 文件，并计算出所有符合 *****Cargo.toml***** 声明的最新版本。\*\*Cargo 接下来会把这些版本写入 *Cargo.lock* 文件。不过，Cargo 默认只会寻找大于 `0.8.5` 而小于 `0.9.0` 的版本。如果 `rand` crate 发布了两个新版本，`0.8.6` 和 `0.9.0`，在运行 `cargo update` 时会出现如下内容：

```markdown 
$ cargo update
    Updating crates.io index
     Locking 1 package to latest Rust 1.85.0 compatible version
    Updating rand v0.8.5 -> v0.8.6 (available: v0.9.0)

```


Cargo 忽略了 `0.9.0` 版本。这时，你也会注意到的 *Cargo.lock* 文件中的变化无外乎现在使用的 `rand` crate 版本是 `0.8.6` 。如果想要使用 `0.9.0` 版本的 `rand` 或是任何 `0.9.x` 系列的版本，必须像这样更新 *Cargo.toml* 文件：

```rust 
[dependencies]
rand = "0.9.0"

```


下一次运行 `cargo build` 时，Cargo 会更新可用 crate 的 registry，并根据你指定的新版本重新评估 `rand` 的要求。

第十四章会讲到 [Cargo](http://doc.crates.io/ "Cargo") 及其[生态系统](http://doc.crates.io/crates-io.html "生态系统") 的更多内容，不过目前你只需要了解这么多。通过 Cargo 复用库文件非常容易，因此 Rustacean 能够编写出由很多包组装而成的更轻巧的项目。

### [生成一个随机数](https://kaisery.github.io/trpl-zh-cn/ch02-00-guessing-game-tutorial.html?search=#生成一个随机数 "生成一个随机数")

让我们开始使用 `rand` 来生成一个要猜测的数字。下一步是更新 *src/main.rs*，如示例 2-3 所示。

文件名：src/main.rs

```rust 
use std::io;

use rand::Rng;

fn main() {
    println!("Guess the number!");

    let secret_number = rand::thread_rng().gen_range(1..=100);

    println!("The secret number is: {secret_number}");

    println!("Please input your guess.");

    let mut guess = String::new();

    io::stdin()
        .read_line(&mut guess)
        .expect("Failed to read line");

    println!("You guessed: {guess}");
}
```


示例 2-3：添加生成随机数的代码

首先，我们新增了一行 `use rand::Rng;`。`Rng` 是一个 trait，它定义了随机数生成器应实现的方法，想使用这些方法的话，此 trait 必须在作用域中。第十章会详细介绍 trait。

接下来，我们在中间还新增加了两行。第一行调用了 `rand::thread_rng` 函数提供实际使用的随机数生成器：它位于当前执行线程的本地环境中，并从操作系统获取 seed。接着调用随机数生成器的 `gen_range` 方法。这个方法由 `use rand::Rng` 语句引入到作用域的 `Rng` trait 定义。`gen_range` 方法获取一个范围表达式（range expression）作为参数，并生成一个在此范围之间的随机数。这里使用的这类范围表达式使用了 `start..=end` 这样的形式，它对上下边界均为闭区间，所以需要指定 `1..=100` 来请求一个 1 和 100 之间的数。

> 注意：**你不可能凭空就知道应该 use 哪个 trait 以及该从 crate 中调用哪个方法，因此每个 crate 有使用说明文档。Cargo 的另一个很棒的功能是运行 ****`cargo doc --open`**** 命令来构建所有本地依赖提供的文档并在浏览器中打开**。例如，假设你对 `rand` crate 中的其他功能感兴趣，你可以运行 `cargo doc --open` 并点击左侧导航栏中的 `rand`。

新增加的第二行代码打印出了秘密数字。这在开发程序时很有用，因为可以测试它，不过在最终版本中会删掉它。如果游戏一开始就打印出结果就没什么可玩的了！

尝试运行程序几次：

```bash 
$ cargo run
   Compiling guessing_game v0.1.0 (file:///projects/guessing_game)
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.02s
     Running `target/debug/guessing_game`
Guess the number!
The secret number is: 7
Please input your guess.
4
You guessed: 4

$ cargo run
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.02s
     Running `target/debug/guessing_game`
Guess the number!
The secret number is: 83
Please input your guess.
5
You guessed: 5

```


你应该能得到不同的随机数，同时它们应该都是在 1 和 100 之间的。干得漂亮！
