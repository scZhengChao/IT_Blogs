# 硬件配置

## 目录

- [cpu个数超线程：](#cpu个数超线程)
- [cpu文件内容解释 ](#cpu文件内容解释-)
- [磁盘：](#磁盘)
- [内存free](#内存free)
  - [1．命令格式：](#1命令格式)
  - [2．命令功能：](#2命令功能)
  - [3．命令参数：](#3命令参数)
  - [4．使用实例：](#4使用实例)
    - [实例1：显示内存使用情况](#实例1显示内存使用情况)
    - [实例2：以总和的形式显示内存的使用信息](#实例2以总和的形式显示内存的使用信息)
    - [实例3：周期性的查询内存使用信息](#实例3周期性的查询内存使用信息)
- [权限相关：](#权限相关)
  - [Linux设置初始root密码](#Linux设置初始root密码)
- [chmod：](#chmod)
  - [权限操作](#权限操作)
  - [修改文件权限](#修改文件权限)

# **cpu个数超线程****：** ​

- **查看所有逻辑cpu个数：  cat /proc/cpuinfo | grep "processor" | wc -l**
- **一个物理cpu内核个数：  cat /proc/cpuinfo | grep "cpu cores" | uniq**
- **当逻辑cpu 是 物理 cpu的两倍时；表示开启了超线程；**
  - \*\*查看每个物理cpu中逻辑cpu个数: \*\*​**cat /proc/cpuinfo | grep 'siblings' | uniq**
- **物理cpu个数(linux安装了几个cpu芯片)：cat /proc/cpuinfo | grep "physical id" | sort | uniq | wc -l**
- \*\*cpu是否启用超线程 ： cat /proc/cpuinfo | grep -e "cpu cores"  -e "siblings" | sort | uniq  \*\*​
  - **siblings 大于 cpu cores，说明启用了超线程**

# \*\*cpu文件内容解释 \*\*

**(看看我们的单物理CPU 4核 8逻辑CPU的信息)**

- **cat /proc/cpuinfo**

| processor        | 系统中逻辑处理核的编号。对于单核处理器，则课认为是其CPU编号，对于多核处理器则可以是物理核、或者使用超线程技术虚拟的逻辑核 |
| ---------------- | -------------------------------------------------------------- |
| vendor\_id       | CPU制造商                                                         |
| cpu family       | CPU产品系列代号                                                      |
| model            | CPU属于其系列中的哪一代的代号                                               |
| model name       | CPU属于的名字及其编号、标称主频                                              |
| stepping         | CPU属于制作更新版本                                                    |
| cpu MHz          | CPU的实际使用主频                                                     |
| cache size       | CPU二级缓存大小                                                      |
| physical id      | 单个CPU的标号                                                       |
| siblings         | 单个CPU逻辑物理核数                                                    |
| core id          | 当前物理核在其所处CPU中的编号，这个编号不一定连续                                     |
| cpu cores        | 该逻辑核所处CPU的物理核数                                                 |
| apicid           | 用来区分不同逻辑核的编号，系统中每个逻辑核的此编号必然不同，此编号不一定连续                         |
| fpu              | 是否具有浮点运算单元（Floating Point Unit）                                |
| fpu\_exception   | 是否支持浮点计算异常                                                     |
| cpuid level      | 执行cpuid指令前，eax寄存器中的值，根据不同的值cpuid指令会返回不同的内容                     |
| wp               | 表明当前CPU是否在内核态支持对用户空间的写保护（Write Protection）                     |
| flags            | 当前CPU支持的功能                                                     |
| bogomips         | 在系统内核启动时粗略测算的CPU速度（Million Instructions Per Second）            |
| clflush size     | 每次刷新缓存的大小单位                                                    |
| cache\_alignment |     缓存地址对齐单位                                                   |
| address sizes    | 可访问地址空间位数                                                      |

# 磁盘：

- df -h  显示目前在linux系统上的文件系统磁盘的使用情况
- lsblk  列出快设备信息(df -h 不能看到的卷)

# **内存free**

## 1．命令格式：

    free \[参数]

## 2．命令功能：

    free 命令显示系统使用和空闲的内存情况，包括物理内存、交互区内存(swap)和内核缓冲区内存。共享内存将被忽略

## 3．命令参数：

    -b 　以Byte为单位显示内存使用情况。

    -k 　以KB为单位显示内存使用情况。

    -m 　以MB为单位显示内存使用情况。

    -g   以GB为单位显示内存使用情况。

    -o 　不显示缓冲区调节列。

    -s<间隔秒数> 　持续观察内存使用状况。

    -t 　显示内存总和列。

    -V 　显示版本信息。

## 4．使用实例：

    free命令输出内容详细说明：

    total:总计物理内存的大小。

    used:已使用多大。

    free:可用有多少。

    Shared:多个进程共享的内存总额。

    Buffers/cached:磁盘缓存的大小。

### 实例1：显示内存使用情况

free -g

### 实例2：以总和的形式显示内存的使用信息

命令：free -t

### 实例3：周期性的查询内存使用信息

命令：free -s 10

# **权限相关：**

- su -  进入管理员模式(root)  进入root模式 su root  会输入密码  
- 返回普通模式 su 用户名
- reboot  重启
- systemctl restart network   重启网络

## **Linux设置初始root密码**

- 第一步：sudo passwd root
- 第二步：\[sudo] password for you: ---> 输入你的密码（你现在这个用户的密码）
- 第三步：Enter new UNIX password: ---> 设置root 密码
- 第四步：Retype new UNIX password: ---> 重复密码

# **chmod：**

**chmod**:用来更改某个目录或文件的访问权限

```javascript 
 ll 查看文件
-rw-------. 1 root root 1289 6月   1 2017 anaconda-ks.cfg
-rw-r--r--. 1 root root  786 6月   8 2017 app_account.sql
drwxr-xr-x. 8 root root 4096 2月  10 2018 homestead_server
-rw-r--r--. 1 root root 7995 6月   1 2017 install.log
-rw-r--r--. 1 root root 3384 6月   1 2017 install.log.syslog
-rw-r--r--. 1 root root    0 8月  20 12:37 mysqlaccess.log
-rw-r--r--. 1 root root   55 8月  24 17:25 test.txt
```


主要看最前面一列,我把"**drwxr-xr-x**"拿出来说，&#x20;

```javascript 
 d:目录
rwx:　可读、可写、可执行   2-4位
r-x:　可读、可执行        5-7位
r-x： 可读、可执行        8-10位            
```


可见一共有十位。-\[rw-]\[r--]\[r--].其中第一个\[-]代表的是类型，**其中第一位为d代表目录**，

\*\*每三位代表一个权限位 \*\*

- \*\*2-4  位代表所有者拥有的权限 \*\*
- \*\*5-7  位代表群组拥有的权限 \*\*
- \*\*8-10位代表其他人拥有的权限 \*\*

**以 drwxr-xr-x 为例 d rwx r-x r-x**

- 第三和第四列两个root ,分别代表用户名和用户组

```javascript 
 useradd yu_test        //添加用户yu_test
chown yu_test test.txt //改变文件用户名权限
-rw-r--r--. 1 yu_test root   55 8月  24 17:25 test.txt
```


## 权限操作

```javascript 
 + 表示添加权限
- 表示删除权限
= 重置权限
```


## **修改文件权限**

```javascript 
 u：代表文件所有者(user)
g: 代表所有者所在的群组(group)
o：代表其他人，但不是u和g(other)
a：a和一起指定ugo效果一样            


chmod o+w test.txt ：表示给其他人授予写test.txt这个文件的权限
chmod go-rw test.txt : 表示群组和其他人删除对test.txt文件的读写权限
chmod ugo+r test.txt：所有人皆可读取
chmod a+r text.txt:所有人皆可读取
chmod ug+w,o-w text.txt:设为该档案拥有者，与其所属同一个群体者可写入，但其他以外的人则不可写入
chmod u+x test.txt: 创建者拥有执行权限 
chmod -R a+r ./www/ ：将www下的所有档案与子目录皆设为任何人可读取
chmod a-x test.txt :收回所有用户的对test.txt的执行权限
chmod 777 test.txt: 所有人可读，写，执行
```


还有**chown 等等…一些 其他的操作修改目录权限**

```javascript 
 chmod 700　　 /opt/elasticsearch  #修改目录权限
chmod -R 744 /opt/elasticsearch 　#修改目目录以下所有的权限   
-R             # 以递归方式更改所有的文件及子目录
```


**常见权限**

```javascript 
 -rw------- (600) 只有所有者才有读和写的权限。
-rw-r--r-- (644) 只有所有者才有读和写的权限，群组和其他人只有读的权限。
-rw-rw-rw- (666) 每个人都有读写的权限
-rwx------ (700) 只有所有者才有读，写和执行的权限。
-rwx--x--x (711) 只有所有者才有读，写和执行的权限，群组和其他人只有执行的权限。
-rwxr-xr-x (755) 只有所有者才有读，写，执行的权限，群组和其他人只有读和执行的权限。
-rwxrwxrwx (777) 每个人都有读，写和执行的权限            
```


sudo是给与暂时的root权限，chown是change owner改变文件的归属者。 -r一般是递归 &#x20;
这个就是把\~/sites/testsite 文件夹和他的子文件都变成 \_www用户的

```javascript 
sudo chown -R 用户 ~/Sites/testsite
```


[cpu的单位m和内存单位Mi](./cpu的单位m和内存单位Mi/index.md "cpu的单位m和内存单位Mi")
