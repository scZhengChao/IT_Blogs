# 守护进程

## 目录

- [systemd](#systemd)

**一个运行起来的程序被称为进程**。在 `Linux` 中有些进程是特殊的，**它不与任何进程关联，不论用户的身份如何，都在后台运行**，这些进程的父进程是 `PID` 为1的进程， `PID` **为1的进程只在系统关闭时才会被销毁**。它们**会在后台一直运行等待分配工作**。我们将这**类进程称之为守护进程** `daemon` 。

\*\*守护进程的名字通常会在最后有一个 ****`d`****  \*\*，表示 `daemon` 守护的意思，例如 `systemd`、`httpd` 。

### systemd

`systemd` 是一个 `Linux` 系统**基础组件的集合**，提供**了一个系统和服务管理器，** 运行为 `PID 1` 并负责启动其它程序。

```bash 
[root@lion ~]# ps -aux
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.2  51648  3852 ?        Ss   Feb01   1:50 /usr/lib/systemd/systemd --switched-root --system --deserialize 22

```


通过命令也可以看到 `PID` 为1的进程就是 `systemd` 的系统进程。

`systemd` 常用命令（它是一组命令的集合）：

```bash 
systemctl start nginx # 启动服务
systemctl stop nginx # 停止服务
systemctl restart nginx # 重启服务
systemctl status nginx # 查看服务状态
systemctl reload nginx # 重载配置文件(不停止服务的情况)
systemctl enable nginx # 开机自动启动服务
systemctl disable nginx # 开机不自动启动服务
systemctl is-enabled nginx # 查看服务是否开机自动启动
systemctl list-unit-files --type=service # 查看各个级别下服务的启动和禁用情况

```
