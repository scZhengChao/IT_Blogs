# process

## 目录

- [env](#env)
- [cwd](#cwd)
- [argv](#argv)
- [execArgv](#execArgv)
- [version](#version)
- [installPrefix](#installPrefix)
- [platform](#platform)
- [uptime](#uptime)
- [getgid/setgid](#getgidsetgid)
- [getuid/setuid](#getuidsetuid)
- [pid](#pid)
- [title](#title)
- [execPath](#execPath)
- [heapTotal/heapUsed](#heapTotalheapUsed)
- [方法](#方法)
  - [nextTick](#nextTick)
- [事件](#事件)
  - [uncaughtException](#uncaughtException)

# env

process.env  ==> 指的是系统的环境变量

# cwd

process.cwd() 方法会返回 Node.js 进程的当前工作目录。  //绝对路径

# argv

process.argv&#x20;
属性会返回一个数组，其中包含当 Node.js 进程被启动时传入的命令行参数。&#x20;

第一个元素是 process.execPath。 如果需要访问 argv\[0] 的原始值，则参见 process.argv0。&#x20;

第二个元素是正被执行的 JavaScript 文件的路径。 其余的元素是任何额外的命令行参数。

# execArgv

process.execArgv 属性返回当 Node.js 进程被启动时，Node.js 特定的命令行选项。 这些选项在 process.argv 属性返回的数组中不会出现，并且这些选项中不会包括 Node.js 的可执行脚本名称或者任何在脚本名称后面出现的选项。 这些选项在创建子进程时是有用的，因为他们包含了与父进程一样的执行环境信息。

```javascript 
$ node --harmony script.js --version
process.execArgv 的结果:
['--harmony']
process.argv 的结果:
['/usr/local/bin/node', 'script.js', '--version']

```


# version

process.version：包含当前node实例的版本号；

# installPrefix

process.installPrefix：包含安装路径；

# platform

process.platform：列举node运行的操作系统的环境，只会显示内核相关的信息，如：linux2， darwin，而不是“Redhat ES3” ，“Windows 7”，“OSX 10.7”等；

# uptime

process.uptime()：包含当前进程运行的时长（秒）；

# getgid/setgid

process.getgid(), process.setgid()：获取或者设置group id；

# getuid/setuid

process.getuid(), process.setuid()：获取或者设置user id；

# pid

process.pid：获取进程id；

# title

process.title：设置进程名称；

# execPath

process.execPath：当前node进程的执行路径，如：/usr/local/bin/node；

# heapTotal/heapUsed

process.heapTotal,process.heapUsed：分别代表v8引擎内存分配和正在使用的大小。

# 方法

## nextTick

```javascript 
process.nextTick(function(){
console.log('tick')
})
;允许你访问事件循环和延时那你的工作。他有点类似于setTimeout()，他会在下次tick的时候执行，
```


# 事件

## uncaughtException

在你接触node之后，你就会发现那些影响了主事件循环的异常会把整个node进程宕掉的。这会是相当严重的问题，
所以process提供了另外一个有用的事件uncaughtException来解决这个问题，他会把异常抓取出来供你处理。

```javascript 
process.on('uncaughtException', function (err) {
　　console.log('Caught exception: ' + err);
});

```


[memoryUsage](./memoryUsage/index.md "memoryUsage")
