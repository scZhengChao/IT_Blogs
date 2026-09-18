# 文本操作

## 目录

- [grep](#grep)
  - [基础语法](#基础语法)
  - [常用参数](#常用参数)
  - [高级用法](#高级用法)
- [sort](#sort)
  - [基础语法](#基础语法)
  - [实例用法](#实例用法)
  - [常用参数](#常用参数)
- [wc](#wc)
  - [基础语法](#基础语法)
  - [实例用法](#实例用法)
  - [常用参数](#常用参数)
- [uniq](#uniq)
  - [基础语法](#基础语法)
  - [常用参数](#常用参数)
- [cut](#cut)
  - [基础语法](#基础语法)
  - [常用参数](#常用参数)

### grep

全局搜索一个正则表达式，并且打印到屏幕。简单来说就是，在文件中查找关键字，并显示关键字所在行。

#### 基础语法

```bash 

grep text file # text代表要搜索的文本，file代表供搜索的文件
# 实例
[root@lion ~]# grep path /etc/profile
pathmunge () {
    pathmunge /usr/sbin    
    pathmunge /usr/local/sbin    
    pathmunge /usr/local/sbin after    
    pathmunge /usr/sbin after
unset -f pathmunge

```


#### 常用参数

- `-i` 忽略大小写， `grep -i path /etc/profile`
- `-n` 显示行号，`grep -n path /etc/profile`
- `-v` 只显示搜索文本不在的那些行，`grep -v path /etc/profile`
- `-r` 递归查找， `grep -r hello /etc` ，Linux 中还有一个 rgrep 命令，作用相当于 `grep -r`

#### 高级用法

`grep` 可以配合正则表达式使用。

```bash 
grep -E path /etc/profile --> 完全匹配path
grep -E ^path /etc/profile --> 匹配path开头的字符串
grep -E [Pp]ath /etc/profile --> 匹配path或Path

```


### sort

对文件的行进行排序。

#### 基础语法

```bash 
sort name.txt # 对name.txt文件进行排序

```


#### 实例用法

为了演示方便，我们首先创建一个文件 `name.txt` ，放入以下内容：

```bash 
Christopher
Shawn
Ted
Rock
Noah
Zachary
Bella

```


执行 sort name.txt 命令，会对文本内容进行排序。

#### 常用参数

- `-o` 将排序后的文件写入新文件， `sort -o name_sorted.txt name.txt` ；
- `-r` 倒序排序， `sort -r name.txt` ；
- `-R` 随机排序， `sort -R name.txt` ；
- `-n` 对数字进行排序，默认是把数字识别成字符串的，因此 138 会排在 25 前面，如果添加了 `-n` 数字排序的话，则 25 会在 138 前面。

### wc

`word count` 的缩写，用于文件的统计。它可以统计单词数目、行数、字符数，字节数等。

#### 基础语法

```bash 
wc name.txt # 统计name.txt

```


#### 实例用法

```bash 
[root@lion ~]# wc name.txt 13 13 91 name.txt

```


- 第一个13，表示行数；
- 第二个13，表示单词数；
- 第三个91，表示字节数。

#### 常用参数

- `-l` 只统计行数， `wc -l name.txt` ；
- `-w` 只统计单词数， `wc -w name.txt` ；
- `-c` 只统计字节数， `wc -c name.txt` ；
- `-m` 只统计字符数， `wc -m name.txt` 。

### uniq

删除文件中的重复内容。

#### 基础语法

```bash 
uniq name.txt # 去除name.txt重复的行数，并打印到屏幕上
uniq name.txt uniq_name.txt # 把去除重复后的文件保存为uniq_name.txt

```


> 【注意】它只能去除连续重复的行数。

#### 常用参数

- `-c` 统计重复行数， `uniq -c name.txt` ；
- `-d` 只显示重复的行数， `uniq -d name.txt` 。

### cut

剪切文件的一部分内容。

#### 基础语法

```bash 
cut -c 2-4 name.txt # 剪切每一行第二到第四个字符

```


#### 常用参数

- `-d` 用于指定用什么分隔符（比如逗号、分号、双引号等等） `cut -d , name.txt` ；
- `-f` 表示剪切下用分隔符分割的哪一块或哪几块区域， `cut -d , -f 1 name.txt` 。
