# 自定义变量

## 目录

- [声明](#声明)
- [可见性](#可见性)

##### 声明

可以在sever,http,location等标签中使用set命令（非唯一）声明变量，语法如下

```bash 
set $变量名 变量值

```


注意nginx中的变量必须都以\$开头。

##### 可见性

nginx的配置文件中所有使用的**变量都必须是声明过的**，否则nginx会无法启动并打印相关异常日志

nginx变量的一个有趣的特性就是nginx中**没一个变量都是全局可见**的，而他们又不是全局变量。比如下面这个例子

```nginx 
location a/ {
  return 200 $a
}

location b/ {
 set $a hello nginx
 return 200 $a
}

```


由于变量是全局可见的所以nginx启动不会报错，而第一个location中并不知道\$a的具体值因此返回的响应结果为一个空字符串。

在不同层级的标签中声明的变量性的可见性规则如下:

1. **location标签中声明的变量中对这个location块可见**
2. **server标签中声明的变量对server块以及server块中的所有子块可见**
3. **http标签中声明的变量对http块以及http块中的所有子块可见**
