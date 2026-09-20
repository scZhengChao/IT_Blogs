# sudo命令介绍及主要用法

## 目录

- [1 主要用法](#1-主要用法)
- [2 sudo 工作原理](#2sudo工作原理)
- [退出sudo](#退出sudo)

首先还是解释下 `sudo` 命令是什么意思。

`sudo` 的英文全称是 `super user do`，即以超级用户（root 用户）的方式执行命令。这里的 `sudo` 和之前 `su` 表示的 `switch user` 是不同的，这点需要注意，很容易搞混。

我们先介绍 `sudo` 命令能做什么事情，然后说明为何能做到这些，以及如何做到这些。

我们开始。

# 1 主要用法

我们在 Linux 中经常会碰到 `Permission denied` 这种情况，比如以 ubuntu 用户的身份查看 `/etc/shadow` 的内容。因为这个文件的内容是**只有 root 用户**能查看的。

那如果我们想要查看怎么办呢？这时候就可以使用 `sudo` :

```bash 
ubuntu@VM-0-14-ubuntu:~$ tail -n 3 /etc/shadow
tail: cannot open '/etc/shadow' for reading: Permission denied      # 没有权限
ubuntu@VM-0-14-ubuntu:~$ sudo !!                                    # 跟两个惊叹号
sudo tail -n 3 /etc/shadow
ntp:*:17752:0:99999:7:::
mysql:!:18376:0:99999:7:::
test_user:$6$.ZY1lj4m$ii0x9CG8h.JHlh6zKbfBXRuolJmIDBHAd5eqhvW7lbUQXTRS//89jcuTzRilKqRkP8YbYW4VPxmTVHWRLYNGS/:18406:0:99999:7:::
ubuntu@VM-0-14-ubuntu:~$

```


实例中，我们使用了 `sudo !!` 这个小技巧，**表示重复上面输入的命令**，只不过在命令最前面加上 `sudo` 。

因为我已经设置了 `sudo` 命令**不需要输入密码**，所以这里 `sudo !!`就能直接输出内容。如果没有设置的话，需要**输入当前这个用户的密码，** 例如本例中，我就应该输入 ubuntu 用户的登录密码。

**两次相邻的** `sudo` 操作，如果间隔在 `5min` 之内，第二次输入 `sudo` **不需要**重新输入密码；如果超过 `5min`，那么再输入 `sudo` 时，又需要输入密码。所以一个比较省事的方法是设置 `sudo` 操作不需要密码。后面介绍如何设置。

`sudo` 除了以 root 用户的权限执行命令外，还有其它几个用法，这里做简单介绍。

切换到 root 用户：

```bash 
sudo su -

```


这种方式也能以 `login-shell` 的方式切换到 root 用户，但是它和 `su -` 方法是由区别的：

**前者输入** `sudo su -` 后，需要提供**当前用户的登录密码**，也就是 ubuntu 用户的密码；

**后者输入** `su -` 后，需要**提供 root 用户**的登录密码。

还有一个命令：

```bash 

sudo -i

```


这个命令和 `sudo su -` 效果一致，也是切换到 root 用户，也是需要提供当前用户（ubuntu 用户）的登录密码。

# 2 `sudo` 工作原理

一个用户能否使用 `sudo` 命令，取决于 `/etc/sudoers` 文件的设置。

从 1 节中我们已经看到，ubuntu 用户可以正常使用 `sudo` ，但是 test\_user 用户却无法使用，这是因为 `/etc/sudoers` 文件里**没有配置 test\_user。**

`/etc/sudoers` 也是**一个文本文件**，但是**因其有特定的语法**，我们不要直接用 `vim` 或者 `vi` 来编辑它，需要用 `visudo` 这个命令。输入这个命令之后就能直接编辑 `/etc/sudoers` 这个文件了。

需要说明的是，**只有 root 用户有权限**使用 `visudo` 命令。

我们先来看下输入 `visudo` 命令后显示的内容。

输入（root 用户）：

```bash 

root@VM-0-14-ubuntu:~# visudo

```


输出：

```bash 
# User privilege specification
root    ALL=(ALL:ALL) ALL

# Members of the admin group may gain root privileges
%admin ALL=(ALL) ALL

# Allow members of group sudo to execute any command
%sudo   ALL=(ALL:ALL) ALL

# See sudoers(5) for more information on "#include" directives:

#includedir /etc/sudoers.d
ubuntu  ALL=(ALL:ALL) NOPASSWD: ALL

```


解释下每一行的格式：

1、第一个表示**用户名**，如 `root` 、`ubuntu` 等；

2、接下来等号左边的 `ALL` 表示允许从**任何主机登录当前的用户账户**；

3、等号右边的 `ALL` 表示：这一行行首对一个的用户可以**切换到系统中任何一个其它用户**；

4、行尾的 `ALL` 表示：**当前行首的用户，能以 root 用户的身份下达什么命令**，`ALL` 表示可以下达任何命令。

我们还注意到 `ubuntu` 对应的那一行有个 `NOPASSWD` 关键字，这就是表明 ubuntu 这个用户在请求 `sudo` 时**不需要输入密码**，到这里就解释了前面的问题。

同时我们注意到，这个文件里并没有 `test_user` 对应的行，这也就解释了为什么 test\_user 无法使用 `sudo` 命令。

接下来，我们尝试将 test\_user 添加到 `/etc/sudoers` 文件中，使 test\_user 也能使用 `sudo` 命令。我们在最后一行添加：

```bash 

test_user  ALL=(ALL:ALL)  ALL       # test_user 使用 sudo 需要提供 test_user 的密码

```


# 退出sudo

sudo -s进入root权限：退出使用exit

sudo -i进入后退出使用logout
