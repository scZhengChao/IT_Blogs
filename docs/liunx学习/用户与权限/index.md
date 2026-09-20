# 用户与权限

## 目录

- [用户](#用户)
  - [sudo](#sudo)
  - [useradd + passwd](#useradd--passwd)
  - [userdel](#userdel)
  - [su](#su)
- [群组的管理](#群组的管理)
  - [groupadd](#groupadd)
  - [groupdel](#groupdel)
  - [groups](#groups)
  - [usermod](#usermod)
  - [chgrp](#chgrp)
  - [chown](#chown)
- [文件权限管理](#文件权限管理)
  - [chmod](#chmod)
    - [数字分配权限](#数字分配权限)
    - [用字母来分配权限](#用字母来分配权限)

### 用户

`Linux` 是一个多用户的操作系统。在 `Linux` 中，理论上来说，我们可以创建无数个用户，但是这些用户是被划分到不同的群组里面的，有一个用户，名叫 `root` ，是一个很特殊的用户，它是超级用户，拥有最高权限。

![](./assets/image/image_m8UeWOsdu-.png)

自己创建的用户是有限权限的用户，这样大大提高了 `Linux` 系统的安全性，有效防止误操作或是病毒攻击，但是我们执**行的某些命令需要更高权限时可以使用 ****`sudo`**** 命令。**

#### sudo

以 `root` 身份运行命令

```bash 
sudo date  --> 当然查看日期是不需要sudo的这里只是演示，sudo 完之后一般还需要输入用户密码的

```


#### useradd + passwd

- `useradd` 添加新用户
- `passwd` 修改用户密码

这两个命令需要 `root` 用户权限

```bash 
useradd lion --> 添加一个lion用户，添加完之后在 /home 路径下可以查看
passwd lion --> 修改lion用户的密码

```


#### userdel

删除用户，需要 `root` 用户权限

```bash 
userdel lion --> 只会删除用户名，不会从/home中删除对应文件夹
userdel lion -r --> 会同时删除/home下的对应文件夹

```


#### su

切换用户，需要 `root` 用户权限

```bash 
sudo su --> 切换为root用户（exit 命令或 CTRL + D 快捷键都可以使普通用户切换为 root 用户）
su lion --> 切换为普通用户
su - --> 切换为root用户

```


### 群组的管理

`Linux` 中每个用户都属于一个特定的群组，如果你不设置用户的群组，默认会创建一个和它的用户名一样的群组，并且把用户划归到这个群组。

#### groupadd

创建群组，用法和 `useradd` 类似。

```bash 
groupadd friends

```


#### groupdel

删除一个已存在的群组

```bash 
groupdel foo  --> 删除foo群组

```


#### groups

查看用户所在群组

```bash 
groups lion  --> 查看 lion 用户所在的群组

```


#### usermod

用于修改用户的账户。

【常用参数】

- `-l` 对用户重命名。需要注意的是 `/home` 中的用户家目录的名字不会改变，需要手动修改。
- `-g` 修改用户所在的群组，例如 `usermod -g friends lion`修改 `lion` 用户的群组为 `friends` 。
- `-G` 一次性让用户添加多个群组，例如 `usermod -G friends,foo,bar lion` 。
- `-a` `-G` 会让你离开原先的群组，如果你不想这样做的话，就得再添加 `-a` 参数，意味着`append` 追加的意思。

#### chgrp

用于修改文件的群组。

```bash 
chgrp bar file.txt --> file.txt文件的群组修改为bar

```


#### chown

改变文件的所有者，需要 `root` 身份才能运行。

```bash 
chown lion file.txt --> 把其它用户创建的file.txt转让给lion用户
chown lion:bar file.txt --> 把file.txt的用户改为lion，群组改为bar

```


【常用参数】

- `-R` 递归设置子目录和子文件， `chown -R lion:lion /home/frank` 把 `frank` 文件夹的用户和群组都改为 `lion` 。

### 文件权限管理

#### chmod

修改访问权限。

```bash 
chmod 740 file.txt

```


【常用参数】

- `-R` 可以递归地修改文件访问权限，例如 `chmod -R 777 /home/lion`

修改权限的确简单，但是理解其深层次的意义才是更加重要的。下面我们来系统的学习`Linux` 的文件权限。

```bash 
[root@lion ~]# ls -ld
rwxr-xr-x 5 root root 4096 Apr 13  2020 climb
lrwxrwxrwx 1 root root    7 Jan 14 06:41 hello2.c -> hello.c
-rw-r--r-- 1 root root  149 Jan 13 06:14 hello.c

```


其中 `drwxr-xr-x` 表示文件或目录的权限。让我们一起来解读它具体代表什么？

- `d` ：表示目录，就是说这是一个目录，普通文件是 `-` ，链接是 `l` 。
- `r` ：`read` 表示文件可读。
- `w` ：`write` 表示文件可写，一般有写的权限，就有删除的权限。
- `x` ：`execute` 表示文件可执行。
- `-` ：表示没有相应权限。

权限的整体是按用户来划分的，如下图所示：

![](./assets/image/image_ZPBc8UbpER.png)

现在再来理解这句权限 `drwxr-xr-x` 的意思：

- 它是一个文件夹；
- 它的所有者具有：读、写、执行权限；
- 它的群组用户具有：读、执行的权限，没有写的权限；
- 它的其它用户具有：读、执行的权限，没有写的权限。

现在理解了权限，我们使用 `chmod` 来尝试修改权限。`chmod` 它不需要是 `root` 用户才能运行的，只要你是此文件所有者，就可以用 `chmod` 来修改文件的访问权限。

##### 数字分配权限

| 权限 | 数字 |
| -- | -- |
| r  | 4  |
| w  | 2  |
| x  | 1  |

因此要改变权限，只要做一些简单的加法就行：

```bash 

chmod 640 hello.c
# 分析
6 = 4 + 2 + 0 表示所有者具有 rw 权限
4 = 4 + 0 + 0 表示群组用户具有 r 权限
0 = 0 + 0 + 0 表示其它用户没有权限
对应文字权限为：-rw-r-----

```


##### 用字母来分配权限

- `u` ：`user` 的缩写，用户的意思，表示所有者。
- `g` ：`group` 的缩写，群组的意思，表示群组用户。
- `o` ：`other` 的缩写，其它的意思，表示其它用户。
- `a` ：`all` 的缩写，所有的意思，表示所有用户。
- `+` ：加号，表示添加权限。
- `-` ：减号，表示去除权限。
- `=` ：等于号，表示分配权限。

```bash 
chmod u+rx file --> 文件file的所有者增加读和运行的权限
chmod g+r file --> 文件file的群组用户增加读的权限
chmod o-r file --> 文件file的其它用户移除读的权限
chmod g+r o-r file --> 文件file的群组用户增加读的权限，其它用户移除读的权限
chmod go-r file --> 文件file的群组和其他用户移除读的权限
chmod +x file --> 文件file的所有用户增加运行的权限
chmod u=rwx,g=r,o=- file --> 文件file的所有者分配读写和执行的权限，群组其它用户分配读的权限，其他用户没有任何权限

```


[sudo命令介绍及主要用法](./sudo命令介绍及主要用法/index.md "sudo命令介绍及主要用法")

[su 命令介绍及主要用法](<./su 命令介绍及主要用法/index.md> "su 命令介绍及主要用法")

[思考 & 对比](<./思考 & 对比/index.md> "思考 & 对比")

[权限描述](./权限描述/index.md "权限描述")
