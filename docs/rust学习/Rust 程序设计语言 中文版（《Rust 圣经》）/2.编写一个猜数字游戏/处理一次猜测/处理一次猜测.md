# [处理一次猜测](https://kaisery.github.io/trpl-zh-cn/ch02-00-guessing-game-tutorial.html#处理一次猜测 "处理一次猜测")

## 目录

- [使用变量储存值](#使用变量储存值)
- [接收用户输入](#接收用户输入)
- [使用 Result 类型来处理潜在的错误](#使用Result类型来处理潜在的错误)
- [使用 println! 占位符打印值](#使用println占位符打印值)
- [测试第一部分代码](#测试第一部分代码)

猜数字程序的第一部分请求和处理用户输入，并检查输入是否符合预期的格式。首先，我们会允许玩家输入一个猜测。在 *src/main.rs* 中输入示例 2-1 中的代码。

文件名：src/main.rs

```rust 
use std::io;

fn main() {
    println!("Guess the number!");

    println!("Please input your guess.");

    let mut guess = String::new();

    io::stdin()
        .read_line(&mut guess)
        .expect("Failed to read line");

    println!("You guessed: {guess}");
}
```


示例 2-1：获取用户猜测并打印的代码

这些代码包含很多信息，我们一行一行地讲解。为了获取用户输入并打印结果作为输出，我们需要将 `io` 输入/输出库引入当前作用域。`io` 库来自于标准库，也被称为 `std`：

```rust 
use std::io;

```


默认情况下，Rust 设定了**若干个会自动导入到每个程序作用域中的标准库内容**，这组内容被称为 *预导入（prelude）* 内容。你可以在[标准库文档](https://doc.rust-lang.org/std/prelude/index.html "标准库文档")中查看预导入的所有内容。

如果**你需要的类型不在预导入内容中，就必须使用 ****`use`**** 语句显式地将其引入作用域。**`std::io` 库提供很多有用的功能，包括接收用户输入的功能。

如第一章所提及，`main` 函数是程序的入口点：

```rust 
fn main() {

```


`fn` 语法声明了一个新函数，小括号 `()` 表明没有参数，大括号 `{` 作为函数体的开始。

第一章也提及了 `println!` 是一个在屏幕上打印字符串的宏：

```rust 
    println!("Guess the number!");

    println!("Please input your guess.");

```


这些代码仅仅打印提示，介绍游戏的内容然后请求用户输入。

### [使用变量储存值](https://kaisery.github.io/trpl-zh-cn/ch02-00-guessing-game-tutorial.html?search=#使用变量储存值 "使用变量储存值")

接下来，创建一个 **变量**（*variable*）来储存用户输入，像这样：

```rust 
    let mut guess = String::new();

```


现在程序开始变得有意思了！这一小行代码发生了很多事。我们使用 let 语句来创建变量。这里是另外一个例子：

```javascript 
let apples = 5;
```


这行代码新建了一个叫做 `apples` 的变量并把它绑定到值 `5` 上。在 Rust 中，变量默认是不可变的，这意味着一旦我们给变量赋值，这个值就不可以再修改了。我们将会在第三章的 [“变量与可变性”](https://kaisery.github.io/trpl-zh-cn/ch03-01-variables-and-mutability.html#变量和可变性 "“变量与可变性”") 部分详细讨论这个概念。下面的例子展示了如何在变量名前使用 `mut` 来使一个变量可变：

```typescript 
let apples = 5; // 不可变
let mut bananas = 5; // 可变
```


> 注意：`//` 语法开始一个注释，持续到行尾。Rust 忽略注释中的所有内容，[第三章](https://kaisery.github.io/trpl-zh-cn/ch03-04-comments.html "第三章")将会详细介绍注释。

回到猜数字程序中。现在我们知道了 `let mut guess` 会引入一个叫做 `guess` 的可变变量。等号（`=`）告诉 Rust 我们现在想将某个值绑定在变量上。等号的右边是 `guess` 所绑定的值，它是 `String::new` 的结果，这个函数会返回一个 `String` 的新实例。[**String**](https://doc.rust-lang.org/std/string/struct.String.html "String")\*\* 是一个标准库提供的字符串类型，它是 UTF-8 编码的可增长文本块。\*\* ​

**`::new`**\*\* 那一行的 ****`::`**** 语法表明 ****`new`**** 是 ****`String`**** 类型的一个 关联函数（\*\****associated function***）。关联函数是针对某个类型实现的函数，在这个例子中是 `String`。这个 `new` 函数创建了一个新的空字符串。你会发现许多类型上都有一个 `new` 函数，因为这是为某种类型创建新值的常用函数名。

总的来说，`let mut guess = String::new();` 这一行创建了一个可变变量，当前它绑定到一个新的 `String` 空实例上。呼！

### [接收用户输入](https://kaisery.github.io/trpl-zh-cn/ch02-00-guessing-game-tutorial.html?search=#接收用户输入 "接收用户输入")

回忆一下，我们在程序的第一行使用 `use std::io;` 从标准库中引入了输入/输出功能。现在调用 `io` 库中的函数 `stdin`，这允许我们处理用户输入：

```rust 
    io::stdin()
        .read_line(&mut guess)

```


如果程序的开头没有使用 `use std::io;` 引入 `io` 库，我们仍可以通过把函数调用写成 `std::io::stdin` 来使用该函数。`stdin` 函数返回一个 [std::io::Stdin](https://doc.rust-lang.org/std/io/struct.Stdin.html "std::io::Stdin") 的实例，这是一种代表终端标准输入句柄的类型。

接下来，代码中的 `.read_line(&mut guess)` 调用了标准输入句柄上的 [read\_line](https://doc.rust-lang.org/std/io/struct.Stdin.html#method.read_line "read_line") 方法，以获取用户输入。我们还将 `&mut guess` 作为参数传递给 `read_line` 函数，让其将用户输入储存到这个字符串中。`read_line` 的工作是，无论用户在标准输入中键入什么内容，都将其追加（不会覆盖其原有内容）到一个字符串中，因此它需要字符串作为参数。这个字符串参数应该是可变的，以便 `read_line` 将用户输入附加上去。

**`&`**\*\* 表示这个参数是一个 引用（*****reference*****），它允许多处代码访问同一处数据，而无需在内存中多次拷贝 \*\*。引用是一个复杂的特性，Rust 的一个主要优势就是安全而简单的操纵引用。完成当前程序并不需要了解如此多细节。现在，**我们只需知道它像变量一样，默认是不可变的。因此，需要写成 ****`&mut guess`**** 来使其可变，而不是 ****`&guess`****。**（第四章会更全面地讲解引用。）

### [使用 ](https://kaisery.github.io/trpl-zh-cn/ch02-00-guessing-game-tutorial.html?search=#使用-result-类型来处理潜在的错误 "使用 ")[Result](https://kaisery.github.io/trpl-zh-cn/ch02-00-guessing-game-tutorial.html?search=#使用-result-类型来处理潜在的错误 "Result")[ 类型来处理潜在的错误](https://kaisery.github.io/trpl-zh-cn/ch02-00-guessing-game-tutorial.html?search=#使用-result-类型来处理潜在的错误 " 类型来处理潜在的错误")

我们还没有完全分析完这行代码。虽然我们已经讲到了第三行代码，但要注意：它仍是逻辑行（虽然换行了但仍是语句）的一部分。后一部分是这个方法（method）：

```javascript 
        .expect("Failed to read line");

```


我们也可以将代码这样写：

```rust 
io::stdin().read_line(&mut guess).expect("Failed to read line");
```


不过，过长的代码行难以阅读，所以最好拆开来写。通常来说，当使用 `.method_name()` 语法调用方法时引入换行符和空格将长的代码行拆开是明智的。现在来看看这行代码干了什么。

之前提到了 `read_line` 会将用户输入附加到传递给它的字符串中，不过它也会返回一个类型为 `Result` 的值。[Result](https://doc.rust-lang.org/std/result/enum.Result.html "Result") 是一种[*枚举类型*](https://kaisery.github.io/trpl-zh-cn/ch06-00-enums.html "枚举类型")，通常也写作 *enum*，它可以是多种可能状态中的一个。我们把每种可能的状态称为一种 **枚举成员**（*variant*）。

[第六章](https://kaisery.github.io/trpl-zh-cn/ch06-00-enums.html "第六章")将介绍枚举的更多细节。这里的 `Result` 类型将用来编码错误处理的信息。

`Result` 的成员是 `Ok` 和 `Err`，`Ok` 成员表示操作成功，内部包含成功时产生的值。`Err` 成员则意味着操作失败，并且 `Err` 中包含有关操作失败的原因或方式的信息。

`Result` 类型的值，像其他类型一样，拥有定义于其实例上的方法。`Result` 的实例拥有 [expect](https://doc.rust-lang.org/std/result/enum.Result.html#method.expect "expect")[ 方法](https://doc.rust-lang.org/std/result/enum.Result.html#method.expect " 方法")。如果 `io::Result` 实例的值是 `Err`，`expect` 会导致程序崩溃，并输出当做参数传递给 `expect` 的信息。所以当 `read_line` 方法返回 `Err`，则可能是来源于底层操作系统错误的结果。如果 `Result` 实例的值是 `Ok`，`expect` 会获取 `Ok` 中的值并原样返回。在本例中，这个值是用户输入到标准输入中的字节数。

如果不调用 expect，程序也能编译，不过会出现一个警告：

```rust 
$ cargo build
   Compiling guessing_game v0.1.0 (file:///projects/guessing_game)
warning: unused `Result` that must be used
  --> src/main.rs:10:5
   |
10 |     io::stdin().read_line(&mut guess);
   |     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   |
   = note: this `Result` may be an `Err` variant, which should be handled
   = note: `#[warn(unused_must_use)]` on by default
help: use `let _ = ...` to ignore the resulting value
   |
10 |     let _ = io::stdin().read_line(&mut guess);
   |     +++++++

warning: `guessing_game` (bin "guessing_game") generated 1 warning
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.59s

```


Rust 警告我们没有使用 `read_line` 的返回值 `Result`，说明有一个可能的错误没有处理。

消除警告的正确做法是实际去编写错误处理代码，不过由于我们就是希望程序在出现问题时立即崩溃，所以直接使用 `expect`。[第九章](https://kaisery.github.io/trpl-zh-cn/ch09-02-recoverable-errors-with-result.html "第九章") 会学习如何从错误中恢复。

### [使用 ](https://kaisery.github.io/trpl-zh-cn/ch02-00-guessing-game-tutorial.html?search=#使用-println-占位符打印值 "使用 ")[println!](https://kaisery.github.io/trpl-zh-cn/ch02-00-guessing-game-tutorial.html?search=#使用-println-占位符打印值 "println!")[ 占位符打印值](https://kaisery.github.io/trpl-zh-cn/ch02-00-guessing-game-tutorial.html?search=#使用-println-占位符打印值 " 占位符打印值")

除了位于结尾的右花括号，目前为止就只有这一行代码值得讨论一下了：

```rust 
    println!("You guessed: {guess}");

```


这行代码现在打印了存储用户输入的字符串。`{}` 这对大括号是一个占位符：把 `{}` 想象成小蟹钳，可以夹住合适的值。**当打印变量的值时，变量名可以写进大括号中。**当**打印表达式的执行结果时，格式化字符串（format string）中大括号中留空，格式化字符串后跟逗号分隔的需要打印的表达式列表，其顺序与每一个空大括号占位符的顺序一致**。在一个 `println!` 调用中打印变量和表达式的值看起来像这样：

```rust 
let x = 5;
let y = 10;

println!("x = {x} and y + 2 = {}", y + 2);

```


这行代码会打印出 `x = 5 and y + 2 = 12`。

### [测试第一部分代码](https://kaisery.github.io/trpl-zh-cn/ch02-00-guessing-game-tutorial.html?search=#测试第一部分代码 "测试第一部分代码")

让我们来测试下猜数字游戏的第一部分。使用 `cargo run` 运行：

```markdown 
$ cargo run
   Compiling guessing_game v0.1.0 (file:///projects/guessing_game)
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 6.44s
     Running `target/debug/guessing_game`
Guess the number!
Please input your guess.
6
You guessed: 6

```


至此为止，游戏的第一部分已经完成：我们从键盘获取输入并打印了出来。
