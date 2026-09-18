# cluster

## 目录

- [异常](#异常)

**单个 Node.js 实例运行在单个线程中。 为了充分利用多核系统，有时需要启用一组 Node.js 进程去处理负载任务**

```typescript 
const cluster = require('cluster');  // 完全可由 PM2 代替
const http = require('http');
const numCPUs = require('os').cpus().length;
if (cluster.isMaster) {
  console.log(`主进程 ${process.pid} 正在运行`);
  // 衍生工作进程。  主进程下的工作进程
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`工作进程 ${worker.process.pid} 已退出`);
  });
} else {
  // 工作进程可以共享任何 TCP 连接。
  // 在本例子中，共享的是 HTTP 服务器。
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('你好世界\n');
  }).listen(8000);
  console.log(`工作进程 ${process.pid} 已启动`);
}

运行代码，则工作进程会共享 8000 端口：
$ node server.js
主进程 3596 正在运行
工作进程 4324 已启动
工作进程 4520 已启动
工作进程 6056 已启动
工作进程 5644 已启动

```


## 异常

防止突然挂掉；下面这样不会挂掉；但是线程已经有异常了；需要重启

```typescript 
// 注意这里监听了 没有捕获掉的异常, 但是serve 不会 cash掉,但是栈堆消息会丢失 所以得重启；
// 如果没有这个监听, serve 直接down 掉,即使有cluster 开启多个进程, 也会一个进程一个进程的down 掉
process.on('uncaughtException', function (err) {
    udpLog.send('process ' + process.pid + ' down', /* ...一些发送 udp 消息的参数 ...*/, function () {
        cluster.worker.disconnect();
    });
    server.close();
    // 保证 worker.disconnect 不会拖太久..
    setTimeout(function () {
        cluster.worker.disconnect();
    }, 100).unref();
});
```
