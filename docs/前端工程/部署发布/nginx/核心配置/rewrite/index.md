# rewrite

## 目录

- [URI跟URL介绍](#URI跟URL介绍)
- [rewrite指令的工作原理](#rewrite指令的工作原理)
- [rewrite](#rewrite)
  - [last](#last)
  - [break](#break)
  - [redirect](#redirect)
  - [permanent](#permanent)
  - [rewrite的例子](#rewrite的例子)
- [break](#break)
- [if](#if)
  - [正则匹配](#正则匹配)
  - [文件检验](#文件检验)
  - [if 指令举例](#if-指令举例)
- [return](#return)
- [set](#set)
- [rewrite\_log](#rewrite_log)

## URI跟URL介绍

- URI：统一标识符，[拿www.abc.com/aw/wd/举例，](http://xn--www-zl6f.abc.com/aw/wd/举例，那么rui就是/aw/wd/这部分数据 "拿www.abc.com/aw/wd/举例，")[那么rui就是/aw/wd/这部分数据](http://xn--www-zl6f.abc.com/aw/wd/举例，那么rui就是/aw/wd/这部分数据 "那么rui就是/aw/wd/这部分数据")(也有可能是图片，html网页,如果是伪静态的话,那就得看配置是什么了
- URL：统一定位符，[还是拿www.abc.com/aw/wd/举例,那么](http://xn--www-zl6ft4lj82f.abc.com/aw/wd/举例,那么整个www.abc.com/aw/wd/就是url "还是拿www.abc.com/aw/wd/举例,那么")[整个www.abc.com/aw/wd/就是url](http://xn--www-zl6ft4lj82f.abc.com/aw/wd/举例,那么整个www.abc.com/aw/wd/就是url "整个www.abc.com/aw/wd/就是url")

## rewrite指令的工作原理

rewrite：重写是由`ngx_http_rewrite_module`模块提供，主要是实现`URI`改写功能，并且此模块是`Nginx`默认安装的模块。通过`rewrite`，用户可以实现`url`重定向,根据`nginx`规则来匹配内容跳转到`replacement`，结尾以`flag`标记。

rewrite模块的指令有`break`, `if`, `return`, `rewrite`, `set`等。`rewrite`指令所执行的顺序如下：

- 首先在`server`上下文中**依照顺序执行**`rewrite`模块指令；
- 如果server中行了`rewrite`重写，那么以新`URI`发起内部跳转，直接匹配`location`，不会再执行`server`里的`rewrite`指令，然后
  - 新`URI`直接匹配`location`
  - 如果匹配上某个`location`，那么其中的`rewrite`模块指令同样依照顺序执行
  - 如果再次导致URI的`rewrite`，那么再一次进行内部跳转去匹配`location`，但跳转的总次数不能超过10次

## rewrite

> 基本语法： rewrite regex replacement \[flag]; &#x20;
> 上下文：server, location, if

`regex`是`PCRE` 风格的，如果`regex`匹配`URI`，那么`URI`就会被替换成`replacement`，**replacement 就是新的URI**。如果`rewrite`同一个上下文中有多个这样的正则，匹配会依照`rewrite`指令出现的顺序先后依次进行下去，**匹配到一个之后并不会终止，而是继续往下匹配**，直到返**回最后一个匹配上的为止**。如果想要中止继续往下匹配，可以使用第三个参数flag。

- 如果新`URI`字符中有关于协议的任何东西，比如`http://`或者`https://`等，进一步的处理就终止了，直接返回客户端`302`。
- 如果返回的是30x，那么*浏览器根据这个状态码和Location响应头再发起一次请求*，然后才能得到想要的响应结果。但是，*如果不是返回30x状态码，那么跳转就是内部的，浏览器不做跳转就能得到相应。*

> 注意：regex直接就是正则表达式，不要再前面添加\~符号

flag 参数可以有以下的一些值：

#### last

如果有last参数，那么停止处理任何rewrite相关的指令，立即用替换后的新URI开始下一轮的`location`匹配

#### break

停止处理任何rewrite的相关指令，就如同break 指令本身一样。

- `last`的`break`的相同点在于，立即停止执行所有当前上下文的`rewrite`模块指令；
- 不同点在于`last`参数接着用新的`URI`马上搜寻新的`location`，而`break`不会搜寻新的`location`，直接用这个新的URI来处理请求，这样能避免重复`rewite`。因此，**在server上下文中使用last，而在location上下文中使用break**。

#### redirect

`replacement` 如果不包含协议，仍然是一个新的的`URI`，那么**就用新的**`URI`匹配的`location`去处理请求，不会返回30x跳转。但是`redirect`参数可以让这种**情况也返回30x(默认302)状态码**，就像新的`URI`包含`http://`和`https://`等一样。这样的话，浏览器看到`302`，就会再发起一次请求，真正返回响应结果的就是这第二个请求。

#### permanent

和`redirect`参数一样，只不过\*\*直接返回`301`\*\***永久重定向**

虽说`URI`有了新的，**但是要拼接成完整**的`URL`还需要当前请求的`scheme`，以及由`server_name_in_redirect`和`port_in_redirect`指令决定的`HOST`和`PORT`.

还有一个比较有意思的应用，就是如果`replacement`中包含请求参数，那么默认情况下`旧URI`中的请求参数也会拼接在`replacement`后面作为新的`URI`，如果不想这么做，可以在`replacement`**的最后面加上?。**

举例说明：

```nginx 
rewrite ^/users/(.*)$ /show?user=$1? last;

```


这样的新URI还是 `/show?user=xxx`

但如果不加问号：

```nginx 
rewrite ^/users/(.*)$ /show?user=$1 last;

```


得到的新URI就是`/show?user=$1&xxx=xxx`其中`xxx=xxx`是旧URI所带的请求参数。

#### rewrite的例子

在server中使用的情况：

```nginx 
server {
    ...
    rewrite ^(/download/.*)/media/(.*)\..*$ $1/mp3/$2.mp3 last;
    rewrite ^(/download/.*)/audio/(.*)\..*$ $1/mp3/$2.ra  last;
    return  403; #没有匹配上，那就返回403咯
    ...
}

```


**注意，在server中使用rewrite ，我们使用的flag是last，但是在location中，我们却只能用break：**

```nginx 
location /download/ {
    rewrite ^(/download/.*)/media/(.*)\..*$ $1/mp3/$2.mp3 break;
    rewrite ^(/download/.*)/audio/(.*)\..*$ $1/mp3/$2.ra  break;
    return  403;
}


```


如果在`location`的`rewrite`也使用`last`，便会再次以新的`URI`重新发起内部重定向，再次进行`location`匹配，而新的`URI`中极有可能和旧的`URI`一样**再次匹配到相同`location`****中**，这样**死循环发生了**。当循环到第`10`次时，`Nginx`会终止这样无意义的循环，**并返回**`500`错误。这点需要特别的注意。

## break

> 基本语法：break; &#x20;
> 上下文：server, location, if

停止处理任何`rewrite`的相关指令。如果出现在`location`里面，那么所有后面的`rewrite`**模块指令都不会再执行，也不发起内部重定向，而是直接用新的URI进一步处理请求。**

## if

> 基本语法：if (condition) { ... } &#x20;
> 上下文：server, location

根据条件`condition`的真假决定是否加载`{...}`中的配置，`{...}`中的配置可以继承外面的配置，也可以对外面已有配置指令进行覆写。

**条件condition是针对变量而言的**，变量既可以是系统变量，也可以是自定义的，可以是下面几种情况：

1. 当condition为变量`$var`本身时，**当且仅当变量值为****空字符****或者****0****时**，条件为false，其余情况皆为 true
2. 变量`$var`通过"="或者"!="与字符串相比较，即`$var = xxx`或者`$var != xxx`
3. 匹配一个正则表达式
4. `-f` `-d` `-e` `-x`等检验文件或者目录属性或者存在与否的运算符

#### 正则匹配

其中，对于 3. 匹配一个正则表达式的情况，可以细分为：

- `$var ~ Reg` 表示大小写敏感匹配
- `$var ~* Reg` 表示大小写不敏感匹配
- `$var !~ Reg` 表示大小写敏感不匹配
- `$var !~* Reg` 表示大小写不敏感不匹配

`Reg` 中可以捕获变量，当**其中包含有 } 或者** ; 时需要用**双引号或者单引号括起来。**

#### 文件检验

另外，对于 4. 检验文件存在或者属性的情况，具体说来也分为以下几种：

- -f /path/to 检验**文件是否存在**；!-f /path/to 检验文件是否不存在
- -d /path/to/ 检验**目录是否存在**；!-d /path/to/ 检验目录是否不存在
- -e /path/to/ 检验**文件或者目录或者链接是否存在**；!-e /path/to/ 检验文件或者目录或者链接是否不存在
- -x /path/to **检验文件是否为可执行文件**；!-x /path/to 检验文件是否为不可执行文件

#### if 指令举例

```nginx 
if ($http_user_agent ~ MSIE) {
    rewrite ^(.*)$ /msie/$1 break;
}

location /xiao/ {
    if ($http_user_agent ~ Mozilla/5.0) { #如果是chrom浏览器
        rewrite ^(.*)$ http://www.example.com; #返回客户端302
    } 
    if ($http_user_agent ~ curl) { # 如果是curl 发起请求
        rewrite ^/xiao/(.*)$ /xiao/$1.txt break; #得到新的URI
    }  
} 

if ($http_cookie ~* "id=([^;]+)(?:;|$)") {
    set $id $1;  #提取了变量$1
}

if ($request_method = POST) {
    return 405; #可以限制Request Method
}

if ($slow) {
    limit_rate 10k; #这个配置会加在location里面
}

if ($invalid_referer) {
    return 403;
}

```


## return

> \*\*基本语法：return code \[text];或者return code URL;或者return URL; &#x20;
> \*\*上下文：**server, location, if**

**停止任何的进一步处理，并且将指定状态码返回给客户端**。如果*状态码为444(此状态码是非标准的)，那么直接关闭此TCP连接。*

return的参数有四种形式：

- `return code` 此时，响应内容就是nginx所默认的，比如503 Service Temporarily Unavailable； 如果是444那就直接关闭TCP连接，也可以是其他值(644等)，但是没啥意义
- `return code text` 因为要带响应内容，因此code不能是具有跳转功能的30x
- `return code URL` 此时URI可以为URI做内部跳转，也可以是具有“http\://”或者“https\://”等协议的绝对URL，直接返回客户端，而code是30x(301, 302, 303, 307,308)
- `return URL` 此时code默认为302，而URL必须是带“http\://”等协议的绝对URL

## set

> 基本语法：set \$variable value; &#x20;
> 上下文：server, location, if

这是一个有用的指令，用来**定义变量，变量的值可以包含字符串，另外的变量或者是二者结合**。

```nginx 
set $var = $http_x_forwarded_for;

```


> 注意：在Nginx中，除非特殊说明，大部分地方字符串的不需要引号括住，字符串和变量的拼接也不需要引号

## rewrite\_log

> 基本语法：rewrite\_log on | off; &#x20;
> 上下文：http, server, location, if

如果开启 on，那么当发生rewrite时，会\*\*产生一个`notice`级别的日志；否则不会产生任何日志。默认情况下是不产生的，\*\*但在调试的时候可以将其置为on。

[案例](./案例/index.md "案例")
