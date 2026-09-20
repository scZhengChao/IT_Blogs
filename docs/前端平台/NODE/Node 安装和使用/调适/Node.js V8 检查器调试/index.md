# Node.js V8 检查器调试

> 非常不方便

Node.js 是围绕 V9 JS 引擎构建的打包器。V8 引擎中包含自己的检查器和调试客户端，这里就从检查参数起步说起。

```javascript 
node inspect index.js

```


调试器会在第一行暂停，并显示以下 debug 提示：

```javascript 
$ node inspect index.js
< Debugger listening on ws://127.0.0.1:9229/b9b6639c-bbca-4f1d-99f9-d81928c8167c
< For help, see: https://nodejs.org/en/docs/inspector
<
connecting to 127.0.0.1:9229 ... ok
< Debugger attached.
<
Break on start in index.js:4
  2
  3 const
> 4   port = (process.argv[2] || process.env.PORT || 3000),
  5   http = require('http');
  6

```


输入help可查看命令列表。大家可以使用以下步骤逐步跑通应用程序：

- cont 或 c: 继续执行
- next 或 n: 运行下一条命令
- step 或 s: 单步执行被调用函数
- out 或 o: 跳出被调用函数并返回其调用者
- pause: 暂停运行代码 &#x20;

还可以进行如下操作：

- 使用 watch(‘x’) 查看变量值；
- 使用 setBreakpoint()/sb() 命令设置断点（也可以在代码中插入 debugger; 语句）；
- restart 重启脚本；
- .exit 退出调试器（请注意开头的. 句点）。
