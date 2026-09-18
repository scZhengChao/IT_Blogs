# 查看进程

## 目录

- [w](#w)
- [ps](#ps)
  - [基础语法](#基础语法)
  - [常用参数](#常用参数)
- [top](#top)
- [kill](#kill)

在 `Windows` 中通过 `Ctrl + Alt + Delete` 快捷键查看软件进程。

### w

帮助我们快速了解系统中目前有哪些用户登录着，以及他们在干什么。

```bash 
[root@lion ~]# w 
06:31:53 up 25 days,  9:53,  1 user,  load average: 0.00, 0.01, 0.05
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
root     pts/0    118.31.243.53    05:56    1.00s  0.02s  0.00s w


```


- 06:31:53：表示当前时间
- up 25 days, 9:53：表示系统已经正常运行了“25天9小时53分钟”
- 1 user：表示一个用户
- load average: 0.00, 0.01, 0.05：表示系统的负载，3个值分别表示“1分钟的平均负载”，“5分钟的平均负载”，“15分钟的平均负载
- USER：表示登录的用于&#x20;
- TTY：登录的终端名称为pts/0&#x20;
- FROM：连接到服务器的ip地址&#x20;
- LOGIN@：登录时间&#x20;
- IDLE：用户有多久没有活跃了&#x20;
- JCPU：该终端所有相关的进程使用的 CPU 时间，每当进程结束就停止计时，开始新的进程则会重新计时&#x20;
- PCPU：表示 CPU 执行当前程序所消耗的时间，当前进程就是在 WHAT 列里显示的程序&#x20;
- WHAT：表示当下用户正运行的程序是什么，这里我运行的是&#x20;

### ps

用于显示当前系统中的进程， `ps` 命令显示的进程列表不会随时间而更新，是静态的，是运行 `ps` 命令那个时刻的状态或者说是一个进程快照。

#### 基础语法

```bash 
[root@lion ~]# ps  
PID TTY          TIME CMD 
1793 pts/0    00:00:00 bash 
4756 pts/0    00:00:00 ps  

PID：进程号，每个进程都有唯一的进程号 
TTY：进程运行所在的终端 
TIME：进程运行时间 
CMD：产生这个进程的程序名，如果在进程列表中看到有好几行都是同样的程序名，那么就是同样的程序产生了不止一个进程

```


#### 常用参数

- `-ef` 列出所有进程;
- `-efH` 以乔木状列举出所有进程;
- `-u` 列出此用户运行的进程;
- `-aux` 通过 `CPU` 和内存使用来过滤进程 `ps -aux | less` ;
- `-aux --sort -pcpu` 按 `CPU` 使用降序排列， `-aux --sort -pmem` 表示按内存使用降序排列;
- `-axjf` 以树形结构显示进程， `ps -axjf` 它和 `pstree` 效果类似。

### top

获取进程的动态列表。

```bash 
top - 07:20:07 up 25 days, 10:41,  1 user,  load average: 0.30, 0.10, 0.07
Tasks:  67 total,   1 running,  66 sleeping,   0 stopped,   0 zombie
%Cpu(s):  0.7 us,  0.3 sy,  0.0 ni, 99.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
KiB Mem :  1882072 total,   552148 free,   101048 used,  1228876 buff/cache
KiB Swap:        0 total,        0 free,        0 used.  1594080 avail Mem
   PID USER      PR  NI    VIRT    RES    SHR S %CPU %MEM     TIME+ COMMAND                                                                                                         
   956 root      10 -10  133964  15848  10240 S  0.7  0.8 263:13.01 AliYunDun                                                                                                         
     1 root      20   0   51644   3664   2400 S  0.0  0.2   3:23.63 systemd                                                                                                           
     2 root      20   0       0      0      0 S  0.0  0.0   0:00.05 kthreadd                                                                                                          
     4 root       0 -20       0      0      0 S  0.0  0.0   0:00.00 kworker/0:0H

```


- `top - 07:20:07 up 25 days, 10:41, 1 user, load average: 0.30, 0.10, 0.07` 相当 `w`命令的第一行的信息。
- 展示的这些进程是按照使用处理器 `%CPU` 的使用率来排序的。

### kill

结束一个进程， `kill + PID` 。

```bash 
kill 956 # 结束进程号为956的进程
kill 956 957 # 结束多个进程
kill -9 7291 # 强制结束进程

```
