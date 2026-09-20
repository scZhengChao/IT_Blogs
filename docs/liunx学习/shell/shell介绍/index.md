# shell介绍

## 目录

- [1.什么是shell？](#1什么是shell)
- [2.有哪些shell？](#2有哪些shell)
- [查看当前正在使用的shell](#查看当前正在使用的shell)
  - [4.shell如何配置？](#4shell如何配置)

## 1.什么是shell？

`Shell` 这个单词的原意是“外壳”，跟 `kernel`（内核）相对应，比喻**内核外面的一层，即用户跟内核交互的对话界面。**

- `Shell` 是一个程序，提供一个与用户对话的环境。这个环境只有一个命令提示符，让用户从键盘输入命令，所以又称为命令行环境（ `command line interface` ，简写为 `CLI` ）。`Shell` 接收到用户输入的命令，将命令送入操作系统执行，并将结果返回给用户。
- `Shell` 是**一个命令解释器，解释用户输入的命令。它支持变量、条件判断、循环操作等语法**，所以用户可以用 `Shell` 命令写出各种小程序，又称为 `Shell` 脚本。这些脚本都通过`Shell` 的解释执行，而不通过编译。
- `Shell` 是一个工具箱，提供了各种小工具，供用户方便地使用操作系统的功能。

shell 单词的本意是“壳子”，在**计算机领域一样可以理解为机器外面的一层壳**，目的是进行用于人机交互，本质上是命令解释器。只要是人与电脑之间交互的接口，就可以称为 shell。

使用Mac系统的朋友应该比较熟悉**Zsh和Bash这两个shell**

需要说明的是，常见的概念包括shell脚本，其指的是采用shell语言编写的脚本，可以使用shell程序来进行执行，而本文所说的shell均指的是shell程序。二者之间的关系可见下图：

![](./image/image_pdLQHngsvq.png)

## 2.有哪些shell？

`Shell` 有很多种，**只要能给用户提供命令行环境的程序，** 都可以看作是 `Shell` 。

历史上，主要的 `Shell` 有下面这些：

- zsh（Z Shell）
  很多人的 mac 中会使用 zsh 而不是 bash，一大半是因为 oh-my-zsh 这个配置集，它兼容 bash，还有自动补全等好用的功能。
- sh（Bourne Shell）
  - &#x20;的全称是 Bourne shell，由 AT\&T 公司的 Steve Bourne开发，为了纪念他，就用他的名字命名了。**sh 是 UNIX 上的标准 shell****，** 很多 UNIX 版本都配有 sh。**sh 是第一个流行的 shell**。
- csh（C Shell）
  - sh 之后另一个广为流传的 shell 是由柏克莱大学的 Bill Joy 设计的，这个 shell 的语法有点类似C语言，所以才得名为 C shell ，简称为 csh
- tcsh（TENEX C Shell）
  tcsh 是 csh 的增强版，加入了命令补全功能，提供了更加强大的语法支持。
- ash一个简单的轻量级的 Shell，占用资源少，适合运行于低内存环境，但是与下面讲到的 bash shell 完全兼容。
- bash（Bourne Again shell）
  bash由 GNU 组织开发，保持了对 sh shell 的兼容性，是**各种 Linux 发行版默认配置的 shell**。bash 兼容 sh 意味着，**针对 sh 编写的 shell 代码可以不加修改地在 bash 中运行。** 尽管如此，bash 和 sh 还是有一些不同之处：一方面，bash 扩展了一些命令和参数；另一方面，bash 并不完全和 sh 兼容，它们有些行为并不一致，但在大多数企业运维的情况下区别不大，特殊场景可以使用 bash 代替 sh。
- Korn shell（ksh）
- Friendly Interactive Shell（fish）

其中 `Bash` 是目前最常用的 `Shell` 。`MacOS` 中的默认 `Shell` 就是 `Bash` 。

# 查看当前正在使用的shell

通过执行 **`echo $SHELL`** 命令可以**查看到当前正在使用**的 **`Shell`** 。还可以通过 **`cat /etc/shells`** **查看当前系统安装的所有** `Shell` 种类。

## 4.shell如何配置？

如上所说，shell 在**启动时都会去找配置文件，然后运行它**。你安装的一些脚本，如果想让它能够全局运行，就需要在配置文件中设置路径。有过设置路径后还是不管用的经历吗？多半是因为把配置写在了错误的配置文件里。 应该在配置shell（最常见的是配置默认命令）之前，使用 echo \$SHELL，确认自己现在用的是什么shell后，再去编辑对应的配置文件 。
