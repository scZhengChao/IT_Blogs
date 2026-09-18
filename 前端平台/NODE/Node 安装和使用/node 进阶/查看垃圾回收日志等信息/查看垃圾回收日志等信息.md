# **查看垃圾回收日志等信息**

## 目录

- [小结：](#小结)

```javascript 
node --trace_gc -e "var a = [];for (var i = 0; i < 1000000; i++) a.push(new Array(100));" > gc.log

//执行上述代码  将在 gc.log 文件得到垃圾回收机制

```


```javascript 
node test/v8.js  -e > gc.log

// 执行上述代码 可以在gc.log文件得到console.log 信息

```


```bash 
node --trace_gc test/v8.js -e > gc.log
//执行上述代码 可以在gc.log文件 得到 所有命令行 打印出来的信息
```


```javascript 
node --prof test/v8.js
//执行上述代码 会生成一个 v8.log 文件，基本不可读；（包含了垃圾回收执行时占用的时间）
//如何让上述文件可读： v8提供了linux-tick-processor工具用于统计日志信息；该工具可以从node源码的dep/v8/tools;将改目录添加到环境变量path 即可调用
linux-tick-processor v8.log
```


# 小结：

- \--trace\_gc        是检查垃圾回收 机制
- -e > file.log    输出到这个地址文件 &#x20;
