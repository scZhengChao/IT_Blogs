# 阅读手册

## 目录

- [man](#man)
  - [安装更新 man](#安装更新-man)
  - [man 手册种类](#man-手册种类)
  - [man + 数字 + 命令](#man--数字--命令)
- [help](#help)

`Linux` 命令种类繁杂，我们凭借记忆不可能全部记住，因此学会查用手册是非常重要的。

### man

#### 安装更新 man

```bash 
sudo yum install -y man-pages --> 安装
sudo mandb --> 更新

```


#### man 手册种类

1. 可执行程序或 `Shell` 命令；
2. 系统调用（ `Linux` 内核提供的函数）；
3. 库调用（程序库中的函数）；
4. 文件（例如 `/etc/passwd` ）；
5. 特殊文件（通常在 `/dev` 下）；
6. 游戏；
7. 杂项（ `man(7)` ，`groff(7)` ）；
8. 系统管理命令（通常只能被 `root` 用户使用）；
9. 内核子程序。

#### man + 数字 + 命令

输入 man + 数字 + 命令/函数，可以查到相关的命令和函数，若不加数字， `man` 默认从数字较小的手册中寻找相关命令和函数

```bash 
man 3 rand  --> 表示在手册的第三部分查找 rand 函数
man ls    --> 查找 ls 用法手册
```


man 手册核心区域解析：(以 `man pwd` 为例)

```bash 
NAME # 命令名称和简单描述
     pwd -- return working directory name
SYNOPSIS # 使用此命令的所有方法
     pwd [-L | -P]
DESCRIPTION # 包括所有参数以及用法
     The pwd utility writes the absolute pathname of the current working directory to the standard output.     
     Some shells may provide a builtin pwd command which is similar or identical to this utility.  Consult the builtin(1) manual page.     
     The options are as follows:     
     -L      Display the logical current working directory.     
     -P      Display the physical current working directory (all symbolic links resolved).     
     If no options are specified, the -L option is assumed.
SEE ALSO # 扩展阅读相关命令
     builtin(1), cd(1), csh(1), sh(1), getcwd(3)

```


### help

`man` 命令像新华词典一样可以查询到命令或函数的详细信息，但其实我们还有更加快捷的方式去查询， `command --help` 或 `command -h` ，它没有 `man` 命令显示的那么详细，但是它更加易于阅读。
