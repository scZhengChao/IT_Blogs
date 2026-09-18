# wait on 脚本顺序执行

## 目录

- [wait-on - wait for files, ports, sockets, http(s) resources](#wait-on---wait-for-files-ports-sockets-https-resources)
  - [Installation](#Installation)
  - [Usage](#Usage)
    - [CLI Usage](#CLI-Usage)
    - [Node.js API usage](#Nodejs-API-usage)

[ wait-on - npm wait-on is a cross platform command line utility and Node.js API which will wait for files, ports, sockets, and http(s) resources to become available. Latest version: 8.0.1, last published: 3 months a https://www.npmjs.com/package/wait-on](https://www.npmjs.com/package/wait-on " wait-on - npm wait-on is a cross platform command line utility and Node.js API which will wait for files, ports, sockets, and http(s) resources to become available. Latest version: 8.0.1, last published: 3 months a https://www.npmjs.com/package/wait-on")

# wait-on - wait for files, ports, sockets, http(s) resources

## Installation

```bash 
npm install wait-on # local version
OR
npm install -g wait-on # global version

```


## Usage

### CLI Usage

假设 `NEXT_CMD` 是在资源可用时运行的命令，那么 `wait-on `将等待，然后在所有资源可用后以成功退出代码 (0) 退出，从而运行 NEXT\_CMD。

wait-on 也可以用于反向模式，即等待资源不可用。这在等待服务关闭后再继续时很有用。（感谢 @skarbovskiy 添加）

如果在所有资源可用之前中断 wait-on，它将以非零退出代码退出，因此 NEXT\_CMD 将不会运行。

```bash 
wait-on file1 && NEXT_CMD # wait for file1, then exec NEXT_CMD
wait-on f1 f2 && NEXT_CMD # wait for both f1 and f2, the exec NEXT_CMD
wait-on http://localhost:8000/foo && NEXT_CMD # wait for http 2XX HEAD
wait-on https://myserver/foo && NEXT_CMD # wait for https 2XX HEAD
wait-on http-get://localhost:8000/foo && NEXT_CMD # wait for http 2XX GET
wait-on https-get://myserver/foo && NEXT_CMD # wait for https 2XX GET
wait-on tcp:4000 && NEXT_CMD # wait for service to listen on a TCP port
wait-on socket:/path/mysock # wait for service to listen on domain socket
wait-on http://unix:/var/SOCKPATH:http://server/a/foo # wait for http HEAD on domain socket
wait-on http-get://unix:/var/SOCKPATH:http://server/a/foo # wait for http GET on domain socket

```


wait-on 是一个命令行实用程序，它将等**待文件、端口、套接字和 http(s) 资源变得可用（或不可用使用反向标志）。当所有资源已准备好。如果中断或超时，则返回非零退出代码。**

也可以在配置文件（js 或 json）中指定选项。对于例如 --config configFile.js 将导致 configFile.js 被必需，生成的对象将与任何调用 wait-on 之前的命令行选项。请参阅 exampleConfig.js

**在 shell 中结合 && 有条件地运行另一个命令**

一旦资源可用。例如：wait-on f1 && NEXT\_CMD

**资源类型由其前缀定义**，如果没有前缀存在时，资源被假定为“文件”类型。资源也可以在配置文件中提供。

```markdown 
resource prefixes are:

       file:      - regular file (also default type). ex: file:/path/to/file
       http:      - HTTP HEAD returns 2XX response. ex: http://m.com:90/foo
       https:     - HTTPS HEAD returns 2XX response. ex: https://my/bar
       http-get:  - HTTP GET returns 2XX response. ex: http://m.com:90/foo
       https-get: - HTTPS GET returns 2XX response. ex: https://my/bar
       tcp:       - TCP port is listening. ex: 1.2.3.4:9000 or foo.com:700
       socket:    - Domain Socket is listening. ex: socket:/path/to/sock
                    For http over socket, use http://unix:SOCK_PATH:URL_PATH
                    like http://unix:/path/to/sock:http://server/foo/bar or
                         http-get://unix:/path/to/sock:http://server/foo/bar
```


### Node.js API usage

```javascript 
var waitOn = require('wait-on');
var opts = {
  resources: [
    'file1',
    'http://foo.com:8000/bar',
    'https://my.com/cat',
    'http-get://foo.com:8000/bar',
    'https-get://my.com/cat',
    'tcp:foo.com:8000',
    'socket:/my/sock',
    'http://unix:/my/sock:http://server/my/url',
    'http-get://unix:/my/sock:http://server/my/url'
  ],
  delay: 1000, // initial delay in ms, default 0
  interval: 100, // poll interval in ms, default 250ms
  simultaneous: 1, // limit to 1 connection per resource at a time
  timeout: 30000, // timeout in ms, default Infinity
  tcpTimeout: 1000, // tcp timeout in ms, default 300ms
  window: 1000, // stabilization time in ms, default 750ms

  // http options
  ca: [
    /* strings or binaries */
  ],
  cert: [
    /* strings or binaries */
  ],
  key: [
    /* strings or binaries */
  ],
  passphrase: 'yourpassphrase',
  proxy: false /* OR proxy config as defined in axios.
  If not set axios detects proxy from env vars http_proxy and https_proxy
  https://github.com/axios/axios#config-defaults
  {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  } */,
  auth: {
    user: 'theuser', // or username
    pass: 'thepassword' // or password
  },
  strictSSL: false,
  followRedirect: true,
  headers: {
    'x-custom': 'headers'
  },
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default if not provided
  }
};

// Usage with callback function
waitOn(opts, function (err) {
  if (err) {
    return handleError(err);
  }
  // once here, all resources are available
});

// Usage with promises
waitOn(opts)
  .then(function () {
    // once here, all resources are available
  })
  .catch(function (err) {
    handleError(err);
  });

// Usage with async await
try {
  await waitOn(opts);
  // once here, all resources are available
} catch (err) {
  handleError(err);
}

```


resource prefixes are:

file:      - regular file (also default type). ex: file:/path/to/file

http:      - HTTP HEAD returns 2XX response. ex: [http://m.com:90/foo](http://m.com:90/foo "http://m.com:90/foo")

https:     - HTTPS HEAD returns 2XX response. ex: [https://my/bar](https://my/bar "https://my/bar")

http-get:  - HTTP GET returns 2XX response. ex: [http://m.com:90/foo](http://m.com:90/foo "http://m.com:90/foo")

https-get: - HTTPS GET returns 2XX response. ex: [https://my/bar](https://my/bar "https://my/bar")

tcp:       - TCP port is listening. ex: 1.2.3.4:9000 or [foo.com:700](http://foo.com:700 "foo.com:700")

socket:    - Domain Socket is listening. ex: socket:/path/to/sock

For http over socket, use [http://unix](http://unix "http://unix"):SOCK\_PATH:URL\_PATH

like [http://unix](http://unix "http://unix"):/path/to/sock:[http://server/foo/bar](http://server/foo/bar "http://server/foo/bar") or

http-get://unix:/path/to/sock:[http://server/foo/bar](http://server/foo/bar "http://server/foo/bar")
