# 静态服务

## 目录

- [服务](#服务)
- [anywhere](#anywhere)
  - [仅有一个命令](#仅有一个命令)
  - [如果你需要指定端口：](#如果你需要指定端口)
  - [如果你不想调用让浏览器直接打开主页](#如果你不想调用让浏览器直接打开主页)
  - [如果你想指定服务器根目录](#如果你想指定服务器根目录)
  - [如果你想指定服务器首页](#如果你想指定服务器首页)
  - [如果你想指定主机名](#如果你想指定主机名)

# 服务

```javascript 
npm i anywhere -g   //任何文件夹下开启 http  /https  服务
npm i serve -g     //本地服务 类似anywhere  
  # -s 参数的意思是将其架设在 Single-Page Application 模式下# 这个模式会处理即将提到的路由问题
  serve -s dist


```


# anywhere

```typescript 
npm i anywhere -g
Usage:
  anywhere --help // print help information
  anywhere // 8000 as default port, current folder as root
  anywhere 8888 // 8888 as port
  anywhere -p 8989 // 8989 as port
  anywhere -s // don't open browser
  anywhere -h localhost // localhost as hostname
  anywhere -d /home // /home as root
  anywhere -l // print log
  anywhere -f // Enable history fallback
```


### 仅有一个命令

命令 `anywhere` 会将当前目录作为服务器根目录，调用默认浏览器在默认端口 8000 打开主页。

anywhere

### 如果你需要指定端口：

anywhere -p 1234

甚至你可以忽略 `-p`，命令后面直接紧跟端口号：

anywhere 1234

### 如果你不想调用让浏览器直接打开主页

当你在 linux 服务器上面使用时，这会很有用。

anywhere -s

### 如果你想指定服务器根目录

根目录默认是命令行当前目录，但你也可以自己指定

可以指定绝对路径

anywhere  /home

也可以指定相对路径

anywhere   ./www

### 如果你想指定服务器首页

`anywhere` 命令会默认打开根目录下的 index.html 当做首页，你可以手动指定另外一个 html 文件当做首页。

anywhere -f login.html

### 如果你想指定主机名

`anywhere` 启动的服务器默认主机名是本机的 ip 地址，你可以指定为 `localhost`

anywhere -h localhost
