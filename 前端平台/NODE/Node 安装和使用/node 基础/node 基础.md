# node 基础

```纯文本 
 nodejs 就是js,是后台的语言 类似php java等 
   
 一段javascript运行时 
 服务端：相同的代码执行多次| cpu和内存资源是瓶颈|加载时从磁盘读取资源 
 客户端：代码需要从服务端分发到多个客户端读取资源|宽带是瓶颈|通过网络加载 
 
 学node的目标, 数据管理 , 文件管理 ,web服务 
 主版本  api都改变了 
 字版本 使用方式没有变.内部优化了 
 修正版,处理一下bug 
  V6.8.2   稳定 
 V6.9.1 非稳定版 
  Vx.x.x-beta 测试 
  vx.x.x-rc  测试稳定 
 
 nodejs 就是js 是写后台管理程序的 
 nodejs的三大目标: web服务,数据管理 文件管理 
 
 
 //运行  命令行实现 
 //一,编辑器的终端实现 
 //二,cmd 实现 
 // git(unixs) 
 
 
 //什么叫web服务, 
 // 管理程序,实现前段和后端的通讯,搭建一个环境    web服务器: apache , ngnix , tomcat   localhost|www.abc.com 
         //这些软件就是一个web服务环境,服务器,mysql,php 环境,已经被这些软件搭建好了. 
 
 //大后端 
 // 用户-->地址栏 https --> web服务器收到 --> 后台/nodejis处理(静态)  动态-->mysql数据库 请求数据库的数据--> 返回给后端接收--> 后端渲染页面 --> 浏览器扫描(完成最终渲染) 
 //大前端 
 //前段-->地址栏(http) -->web服务收到 --> 后台nodejs处理 (分为静态和动态) -->有动态就需要后端操作数据库处理 -->拿到数据返回给后端 --> 后端交给前段 --> 前段渲染 --> 交给浏览器渲染 
 
 ------------------------------------------------------------------------------------------- 
 nodeJs: 
     干嘛的： 写后台管理程序 
     目标：数据服务，文件服务，web服务 
     类似：    php  .net   java(jsp) .... 
 优势： 
     性能高，方便、入门难度低、大公司都在用（BAT） 
 劣势： 
     服务器提供的相对较少 
     能用的上的学习资料少，对程序员的要求高了 
 环境：nodejs + web服务器 + 数据库 
     php -> wamp|xamp    w:window a:aphche m:mysql P:php 
         -> php(后台管理程序) mysql(库) aphche(web服务器) 
     java -> jdk 
     nodejs: 
         安装：双击->一路下一步 
             官网：https://nodejs.org/en/ | http://nodejs.cn/ 
             镜像：http://npm.taobao.org/ 
             nodejs 环境     npm 环境 
             测试环境： 命令行(运行->cmd)->node -v 
 版本： 
     Vx(主).x(子).x（修正） 包(目录)->模块(文件) 
     主版本： 变化了，1/3的API发生巨变 , 使用方式变化了 
     子：    API没有删减，使用方式没变化,内部实现发生了变化 
     修正版：什么都没变，处理一下bug 
 
 
     V6.8.2   稳定 
     V6.9.1 非稳定版 
     Vx.x.x-beta 测试 
     vx.x.x-rc  测试稳定 
 
 
 编写： 
     IDE(有RUN环境,真实服务器)|编辑器|node命令行 
 
 
 运行：命令行 
     1  dos:        win+r->cmd回车->cd 目录-> node 文件名.js | node 文件名 
                 IDE|编辑器环境下，运行dos命令行 
                 webstrom->terminal(ALT+f12)        |   run 
                 vscode->终端 
     2  linux(git):  终端->cd 目录-> node 文件名.js | node 文件名 
                     当前目录->右键->git bash-> node 文件名 
     3  node命令行:  多用在调试 
         dos-> node 回车-> 编写+运行 
 
 
 DOM/BOM 不可用 
 ECMA 可用 
 
 
 web服务 
     web服务器: apache , ngnix , tomcat   localhost|www.abc.com 
     数据库: mysql | sqlserver | mongoDB | orangcl 
         数据库: 数字|字符 
         磁盘（硬盘) 文件本身(图，视频,PDF)   文件服务器 
     后台管理程序: 
         nodejs,java........ 
 
 
 大后端: 
     用户 - > 地址栏(http[s]请求) -> web服务器（收到) - > nodejs处理请求(返回静态、动态)->请求数据库服务(返回结果)->nodejs(接收)->渲染页面->浏览器（接收页面，完成最终渲染) 
 
 
 大前端: 
     前端 - > http[s]请求 -> web服务器（收到) - > nodejs处理请求(返回静态、动态)->请求数据库服务(返回结果)->nodejs(接收)->返回给前端(渲染)->浏览器（接收页面，完成最终渲染) 
 
 
 nodejs手工搭建web服务器:  使用HTTP模块 
 
     1） 引入http模块    require('http') 
     2)    server/app = http.createServer(函数(req,res));//创建服务   返回http对象 
             req 请求  浏览器->服务器 
                 req.url  地址   提取get数据 
                 req.on('data|end') 提取post数据 所有的http[s]都会触发end事件 
               res 响应  服务器->浏览器 
                   响应头设置:    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'}); 
                   res.write(字符/数据<string><buffer>) 
                   res.end()响应结束 
 
 
     3)     监听： 
         server.listen(端口，[地址]，[回调])    回调：监听成功，回调一次 
             端口: 1-65535    1024以下系统占用   80 
             地址: 虚拟localhost  真实域名xx.duapp.com 
 
 
 文件系统模块(file system)  fs模块 
     业务: 静态页面的托管 
 
     静态数据请求: 
     href/src/url()/locaction.href 
 
 业务： 接收前段动态请求 /submit/ajax........ 
 
 querystring: 查询字符串   ?key=value&key=value 
     querystring.parse(str) -> obj 
     querystring.stringify(obj) -> str 
 
 
 url模块    处理 url 
     url.parse(str,true)  str -> obj  返回 对象  true 处理query->obj 
 
     obj参数        http://localhost:8002/aaa?username=sdfsdf&content=234234#title4 
       protocol: 'http:',    协议 
       slashes: true,    双斜杠 
       auth: null,   作者 
       host: 'localhost:8002',  主机 www.baidu.com 
       port: '8002',    端口 
       hostname: 'localhost',  baidu 
       hash: '#title',    哈希（锚) 
       search: '?username=sdfsdf&content=234234',    数据 
       query: 'username=sdfsdf&content=234234',    数据 
       pathname: '/aaa',    文件路径 
       path: '/aaa?username=sdfsdf&content=234234',    文件路径 
       href: 'http://localhost:8002/aaa?username=sdfsdf&content=234234#title' 
 
 
     url.format(obj)  obj -> str   返回str
```
