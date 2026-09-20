# nodeJS（2）深了解： nodeJS 项目架构详解（app.js + Express + Http） - 云雀sunshine - 博客园

## 目录

- [nodeJS（2）深了解： nodeJS 项目架构详解（app.js + Express + Http）](#nodeJS2深了解-nodeJS-项目架构详解appjs--Express--Http)
  - [环境：](#环境)
  - [新建 nodeJS 项目：](#新建-nodeJS-项目)
  - [重要的 app.js ](#重要的-appjs)
  - [  Express  和 Http 模块：](#-Express-和-Http-模块)
    - [Express 模块](#Express-模块)
  - [请求和响应](#请求和响应)
  - [路由](#路由)
  - [静态文件](#静态文件)
  - [GET 方法](#GET-方法)
  - [POST 方法](#POST-方法)
  - [文件上传](#文件上传)
  - [Cookie 管理](#Cookie-管理)
  - [相关资料](#相关资料)
    - [Node.js Web 模块（Htttp）](#Nodejs-Web-模块Htttp)
      - [什么是 Web 服务器？](#什么是-Web-服务器)
      - [Web 应用架构](#Web-应用架构)
      - [使用 Node 创建 Web 服务器](#使用-Node-创建-Web-服务器)
    - [Gif 实例演示](#Gif-实例演示)
      - [使用 Node 创建 Web 客户端](#使用-Node-创建-Web-客户端)
    - [Gif 实例演示](#Gif-实例演示)

# [**nodeJS（2）深了解： nodeJS 项目架构详解（app.js + Express + Http）**](https://www.cnblogs.com/ostrich-sunshine/p/7474471.html "nodeJS（2）深了解： nodeJS 项目架构详解（app.js + Express + Http）")

简略了解：

[nodeJS 深了解（1）： Node.js + Express 构建网站预备知识](http://www.cnblogs.com/ostrich-sunshine/p/6756147.html "nodeJS 深了解（1）： Node.js + Express 构建网站预备知识")

## **环境：**

     环境： win7 + nodeJS

     版本（node）：

![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/824226-20170904144658585-1875149549__guRAq_o1f.png> "  ")

## **新建 nodeJS 项目：**

- 名称为: techNode
- express： 4.14.1
- 模板： EJS （2.5.5）
- 获得文件目录如下：

![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/824226-20170904145218585-1038173021_54tUsDIx7l.png> "  ")

其中重点文件/文件夹说明：

techNode：

\-

**bin/www:**

&#x20;启动运行（服务端口设置等，可与 app.js 合并）

\-

**public:**

&#x20;存放静态文件（在 app.js 中设置的，因此该文件夹名称可自拟）

\-

**routes**

: 存放路由文件（里面的文件，在 app.js 中或其他文件中，使用

“require(‘ \*’)”引用

该目录下的 js 文件，因此文件夹名称可以自拟）

\-

**views**

: 存放页面文件（app.js 中设置，因此该文件夹名称可自拟）

\-- \*\* \*.ejs: 具体的 页面文件（后缀名 .ejs 是因为此处使用的是 ejs 模板，该设置在 app.js 中，因此可以自己设置为自己喜欢/习惯的方式）

\-

**app.js**

: 服务的入口文件（

**重要!!!**

&#x20;整个项目的运行基础架构，基础的设置）

\-

**package.json**

: 服务说明（包含： 项目名称，作者等信息； 以及 整个项目所需要的包的信息）

```纯文本 
 !!! 因此： 必不可少的文件  app.js [bin/www], package.json  文件，其余都可自行设定并在 app.js 中进行更改声明
```


## \*\*重要的 app.js \*\*​

因为我的自生成的 package.json 文件在上面截图中已显示，此处不再重复，下面看下具体的 app.js， 以下是自生成的 app.js 文件，我添加了说明：

![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")

```纯文本 
 var  express = require( ' express ' );     /* 重要： 不可少 */  var  path = require( ' path ' );   /*  重要：目录设置时，可使用其方法引用根目录， 不可少  */ var  favicon = require( ' serve-favicon ' );
 var  logger = require( ' morgan ' );
 var  cookieParser = require( ' cookie-parser ' );
 var  bodyParser = require( ' body-parser ' );


 /*  声明要访问的路由(该路由指定路由文件--html/ejs/...)， 该路由可自定义  */ var  index = require( ' ./routes/index ' );
 //  var users = require('./routes/users'); var  app = express();   /* 重要： 不可少 */ //  view engine setup 
app. set ( ' views ' , path.join(__dirname,  ' views ' ));  // 定义模板（views ）搜索路径，在根目录的 views 文件夹下,可自定义 
app. set ( ' view engine ' ,  ' ejs ' );   // 设置模板引擎 为： EJS, 可自定义

 //  uncomment after placing your favicon in /public
 // app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); 
app.use(logger( ' dev ' ));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:  false  }));
app.use(cookieParser());
app.use(express. static (path.join(__dirname,  ' public ' )));   // 指定静态文件名称是 public, 文件夹名可自定义 /*  访问已定义的路由文件  */ 
app.use( ' / ' , index);
 //  app.use('/users', users);

 //  404 处理: catch 404 and forward to error handler app.use(function(req, res, next) {
   var  err =  new  Error( ' Not Found ' );
  err.status  =  404 ;
  next(err);
});

 //  错误处理：error handler app.use(function(err, req, res, next) {
   //  set locals, only providing error in development 
  res.locals.message =  err.message;
  res.locals.error  = req.app. get ( ' env ' ) ===  ' development '  ?  err : {};

   //  render the error page 
  res.status(err.status ||  500 );
  res.render( ' error ' );
});

module.exports  = app;  /* 抛出 app 变量方法， 为 bin/www 中端口设置进行“铺垫” */
```


![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")

接着 看看 自生成的 bin/www 文件：

![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")

```纯文本 
 #!/usr/bin/ env node
 /* *
 * Module dependencies.
  */ var  app = require( ' ../app ' );   /*  引用 ../app.js 文件,实质是指向 app = express() 变量方法的引用  */ var  debug = require( ' debug ' )( ' technode:server ' );
 var  http = require( ' http ' );   /* 提供 httpServer 服务模块，不可少 */ /* *
 * Get port from environment and store in Express.
  */ var  port = normalizePort(process.env.PORT ||  ' 3000 ' );   /*  声明端口， 不可少；  normalizePort： 自定义方法,端口设置  */ 
app. set ( ' port ' , port);   /*  设定（绑定）端口  */ /* *
 * Create HTTP server.
  */ var  server = http.createServer(app);   /* 使用 定义的 http 服务, 不可少 */ /* *
 * Listen on provided port, on all network interfaces.
  */ 

server.listen(port);   /* 使用（监听）端口, 不可少 */ 
server.on( ' error ' , onError);
server.on( ' listening ' , onListening);

 /* *
 * Normalize a port into a number, string, or false.
  */ 
function normalizePort(val) {
   var  port = parseInt(val,  10 );

   if  (isNaN(port)) {
     //  named pipe 
     return  val;
  }

   if  (port >=  0 ) {
     //  port number 
     return  port;
  }

   return   false ;
}

 /* *
 * Event listener for HTTP server "error" event.
  */ 
function onError(error) {
   if  (error.syscall !==  ' listen ' ) {
     throw  error;
  }

   var  bind =  typeof  port ===  ' string ' 
    ?  ' Pipe  '  +  port
    :  ' Port  '  +  port;

   //  handle specific listen errors with friendly messages 
   switch  (error.code) {
     case   ' EACCES ' :
      console.error(bind  +  '  requires elevated privileges ' );
      process.exit( 1 );
       break ;
     case   ' EADDRINUSE ' :
      console.error(bind  +  '  is already in use ' );
      process.exit( 1 );
       break ;
     default :
       throw  error;
  }
}

 /* *
 * Event listener for HTTP server "listening" event.
  */ 
function onListening() {
   var  addr =  server.address();
   var  bind =  typeof  addr ===  ' string ' 
    ?  ' pipe  '  +  addr
    :  ' port  '  +  addr.port;
  debug( ' Listening on  '  +  bind);
}
```


![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")

## \*\*  Express  和 Http 模块：\*\* ​

### **Express 模块**

***

**Express**

是一个简洁而灵活的 node.js Web应用框架, 提供了一系列强大特性帮助你创建各种 Web 应用，和丰富的 HTTP 工具。

- 使用 Express 可以快速地搭建一个完整功能的网站。
- Express 框架核心特性：
  - 可以设置中间件来响应 HTTP 请求。
  - 定义了路由表用于执行不同的 HTTP 请求动作。
  - 可以通过向模板传递参数来动态渲染 HTML 页面。
- 以下几个重要的模块是需要与 express 框架一起安装的：
  ```纯文本 
   body-parser -  node.js 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据。

  cookie -parser -  这就是一个解析Cookie的工具。通过req.cookies可以取到传过来的cookie，并把它们转成对象。

  multer  - node.js 中间件，用于处理 enctype= " multipart/form-data " （设置表单的MIME编码）的表单数据。(eg: 多图片/多文件路径时)
  ```

- Express 框架实例：

   
  Express 应用使用回调函数的参数： **request** 和 **response** 对象来处理请求和响应的数据。
  **request** 和 **response** 对象的具体介绍：
  **Request 对象** - request 对象表示 HTTP 请求，包含了请求查询字符串，参数，内容，HTTP 头部等属性。常见属性有：
  **Response 对象** - response 对象表示 HTTP 响应，即在接收到请求时向客户端发送的 HTTP 响应数据。常见属性有：
  我们已经了解了 HTTP 请求的基本应用，而路由决定了由谁(指定脚本)去响应客户端请求。
  在HTTP请求中，我们可以通过路由提取出请求的URL以及GET/POST参数。

   
  Express 提供了内置的中间件\*\* express.static **来设置静态文件如：图片， CSS, JavaScript 等。
  你可以使用** express.static \*\*中间件来设置静态文件路径。例如，如果你将图片， CSS, JavaScript 文件放在 public 目录下，你可以这么写：
  我们可以到 public/images 目录下放些图片,如下所示：
  让我们再修改下 "Hello World" 应用添加处理静态文件的功能。

   
  以下实例演示了在表单中通过 GET 方法提交两个参数，我们可以使用 server.js 文件内的 **process\_get** 路由器来处理输入：

  执行以上代码：

  现在你可以向表单输入数据，并提交，如下演示(注意此处的 process\_post 后 会显示 参数内容， 不安全)：

  以下实例演示了在表单中通过 POST 方法提交两个参数，我们可以使用 server.js 文件内的 **process\_post** 路由器来处理输入：

  执行以上代码：

  现在你可以向表单输入数据，并提交，如下演示(注意此处的 process\_post 后没有显示 参数内容)：

  以下我们创建一个用于上传文件的表单，使用 **POST** 方法，表单 enctype 属性设置为 multipart/form-data。

  执行以上代码：

  浏览器访问 <http://127.0.0.1:8081/index.htm，如图所示：>

  现在你可以向表单输入数据，并提交，如下演示：

  我们可以使用中间件向 Node.js 服务器发送 cookie 信息，以下代码输出了客户端发送的 cookie 信息：

  执行以上代码：

  现在你可以访问 <http://127.0.0.1:8081> 并查看终端信息的输出，如下演示：

  ![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")
  ```纯文本 
   引入了 express 模块，并在客户端发起请求后，响应  " Hello World "  字符串。
  创建 express_demo.js 文件，代码如下所示：
   var  express = require( ' express ' );
   var  app =  express();
   
  app. get ( ' / ' , function (req, res) {
     res.send( ' Hello World ' );
  })
   
   var  server = app.listen( 8081 , function () {
   
     var  host =  server.address().address
     var  port =  server.address().port
   
    console.log( " 应用实例，访问地址为 http://%s:%s " , host, port)
   
  })

  执行以上代码：
  $ node express_demo.js 
  应用实例，访问地址为 http: // 0.0.0.0:8081 ， 会看到 Hello world  字样
  ```

  ![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")
  ***
  ## **请求和响应**
  ```纯文本 
   app . get ( '/' ,   function   ( req ,  res )   { 
      // -- })
  ```

  1. req.app：当callback为外部文件时，用req.app访问express的实例
  2. req.baseUrl：获取路由当前安装的URL路径
  3. req.body / req.cookies：获得「请求主体」/ Cookies
  4. req.fresh / req.stale：判断请求是否还「新鲜」
  5. req.hostname / req.ip：获取主机名和IP地址
  6. req.originalUrl：获取原始请求URL
  7. req.params：获取路由的parameters
  8. req.path：获取请求路径
  9. req.protocol：获取协议类型
  10. req.query：获取URL的查询参数串
  11. req.route：获取当前匹配的路由
  12. req.subdomains：获取子域名
  13. req.accepts()：检查可接受的请求的文档类型
  14. req.acceptsCharsets / req.acceptsEncodings / req.acceptsLanguages：返回指定字符集的第一个可接受字符编码
  15. req.get()：获取指定的HTTP请求头
  16. req.is()：判断请求头Content-Type的MIME类型
  17. res.app：同req.app一样
  18. res.append()：追加指定HTTP头
  19. res.set()在res.append()后将重置之前设置的头
  20. res.cookie(name，value \[，option])：设置Cookie
  21. opition: domain / expires / httpOnly / maxAge / path / secure / signed
  22. res.clearCookie()：清除Cookie
  23. res.download()：传送指定路径的文件
  24. res.get()：返回指定的HTTP头
  25. res.json()：传送JSON响应
  26. res.jsonp()：传送JSONP响应
  27. res.location()：只设置响应的Location HTTP头，不设置状态码或者close response
  28. res.redirect()：设置响应的Location HTTP头，并且设置状态码302
  29. res.send()：传送HTTP响应
  30. res.sendFile(path \[，options] \[，fn])：传送指定路径的文件 -会自动根据文件extension设定Content-Type
  31. res.set()：设置HTTP头，传入object可以一次设置多个头
  32. res.status()：设置HTTP状态码
  33. res.type()：设置Content-Type的MIME类型
  ***
  ## **路由**
  ![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")
  ```纯文本 
   扩展 Hello World，添加一些功能来处理更多类型的 HTTP 请求。
  创建 express_demo2.js 文件，代码如下所示：
   var  express = require( ' express ' );
   var  app =  express();
   
   //   主页输出 "Hello World" 
  app. get ( ' / ' , function (req, res) {
     console.log( " 主页 GET 请求 " );
     res.send( ' Hello GET ' );
  })
   
   
   //   POST 请求 
  app.post( ' / ' , function (req, res) {
     console.log( " 主页 POST 请求 " );
     res.send( ' Hello POST ' );
  })
   
   //   /del_user 页面响应 
  app. get ( ' /del_user ' , function (req, res) {
     console.log( " /del_user 响应 DELETE 请求 " );
     res.send( ' 删除页面 ' );
  })
   
   //   /list_user 页面 GET 请求 
  app. get ( ' /list_user ' , function (req, res) {
     console.log( " /list_user GET 请求 " );
     res.send( ' 用户列表页面 ' );
  })
   
   //  对页面 abcd, abxcd, ab123cd, 等响应 GET 请求 
  app. get ( ' /ab*cd ' , function(req, res) {   
     console.log( " /ab*cd GET 请求 " );
     res.send( ' 正则匹配 ' );
  })
   
   
   var  server = app.listen( 8081 , function () {
   
     var  host =  server.address().address
     var  port =  server.address().port
   
    console.log( " 应用实例，访问地址为 http://%s:%s " , host, port)
   
  })

  执行以上代码：
  $ node express_demo2.js 
  应用实例，访问地址为 http: // 0.0.0.0:8081, 可以尝试访问  http://127.0.0.1 :8081 不同的地址，查看效果。
  ```

  ![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")
  ***
  ## **静态文件**
  ```纯文本 
   app . use ( express . static ( 'public' ));
  ```

  ```纯文本 
   node_modules
  server . js
   public / public / images
   public / images / logo . png
  ```

  ![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")
  ```纯文本 
   创建 express_demo3.js 文件，代码如下所示：
   var  express = require( ' express ' );
   var  app =  express();
   
  app.use(express. static ( ' public ' ));
   
  app. get ( ' / ' , function (req, res) {
     res.send( ' Hello World ' );
  })
   
   var  server = app.listen( 8081 , function () {
   
     var  host =  server.address().address
     var  port =  server.address().port
   
    console.log( " 应用实例，访问地址为 http://%s:%s " , host, port)
   
  })

  执行以上代码：
  $ node express_demo3.js 
  应用实例，访问地址为 http: // 0.0.0.0:8081/imgaes/logo.png (前提有该文件)，则可显示图片
  ```

  ![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")
  ***
  ## **GET 方法**
  ![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")
  ```纯文本 
   index.htm 文件代码：
  ```

  ![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")
  ```纯文本 
   <html>
  <body>
     <form action= " http://127.0.0.1:8081/process_get "   method= " GET " > 
        First Name:  <input type= " text "  name= " first_name " >  <br> 
   
        Last Name:  <input type= " text "  name= " last_name " >
        <input type= " submit "  value= " Submit " >
     </form>
  </body>
  </html>
  ```

  ![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")

  ![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")

  ![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")
  ```纯文本 
   server.js 文件代码：
  ```

  ![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")
  ```纯文本 
   var  express = require( ' express ' );
   var  app =  express();
   
  app.use(express. static ( ' public ' ));
   
  app. get ( ' /index.htm ' , function (req, res) {
     res.sendFile( __dirname  +  " / "  +  " index.htm "  );
  })
   
  app. get ( ' /process_get ' , function (req, res) {
      //  输出 JSON 格式 
      var  response =  {
          " first_name " :req.query.first_name,
          " last_name " :req.query.last_name
     };
     console.log(response);
     res.end(JSON.stringify(response));
  })
   
   var  server = app.listen( 8081 , function () {
   
     var  host =  server.address().address
     var  port =  server.address().port
   
    console.log( " 应用实例，访问地址为 http://%s:%s " , host, port)
   
  })
  ```

  ![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")
  ```纯文本 
   node server . js 
   应用实例，访问地址为  http : //0.0.0.0:8081
  ```

  ![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")

  ![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/nodejs-gif6_WQSiqh001d.gif> "  ")
  ***
  ## **POST 方法**
  ![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")
  ```纯文本 
   index.htm 文件代码：
  ```

  ![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")
  ```纯文本 
   <html>
  <body>
      <form action= " http://127.0.0.1:8081/process_post "   method= " POST " > 
          First Name:  <input type= " text "  name= " first_name " >  <br> 
   
          Last Name:  <input type= " text "  name= " last_name " >
          <input type= " submit "  value= " Submit " >
      </form>
  </body>
  </html>
  ```

  ![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")

  ![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")

  ![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")
  ```纯文本 
   server.js 文件代码:
  ```

  ![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")
  ```纯文本 
   var  express = require( ' express ' );
   var  app =  express();
   var  bodyParser = require( ' body-parser ' );
   
   //  创建 application/x-www-form-urlencoded 编码解析 var  urlencodedParser = bodyParser.urlencoded({ extended:  false  })
   
  app.use(express. static ( ' public ' ));
   
  app. get ( ' /index.htm ' , function (req, res) {
     res.sendFile( __dirname  +  " / "  +  " index.htm "  );
  })
   
  app. post ( ' /process_post ' ,  urlencodedParser , function (req, res) {
   
      //  输出 JSON 格式 
      var  response =  {
          " first_name " :req.body.first_name,
          " last_name " :req.body.last_name
     };
     console.log(response);
     res.end(JSON.stringify(response));
  })
   
   var  server = app.listen( 8081 , function () {
   
     var  host =  server.address().address
     var  port =  server.address().port
   
    console.log( " 应用实例，访问地址为 http://%s:%s " , host, port)
   
  })
  ```

  ![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")
  ```纯文本 
   $ node server . js
   应用实例，访问地址为  http : //0.0.0.0:8081
  ```

  ![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")

  ![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/nodejs-gif7_a6qrMQXlcj.gif> "  ")
  ***
  ## **文件上传**
  ![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")
  ```纯文本 
   index.htm 文件代码：
  ```

  ![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")
  ```纯文本 
   <html>
  <head>
      <title>文件上传表单</title>
  </head>
  <body>
      <h3>文件上传：</h3> 
      选择一个文件上传:  <br />
      <form action= " /file_upload "  method= " post "  enctype= " multipart/form-data " >
         <input type= " file "  name= " image "  size= " 50 "  />
         <br />
         <input type= " submit "  value= " 上传文件 "  />
      </form>
  </body>
  </html>
  ```

  ![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")

  ![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")

  ![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")
  ```纯文本 
   server.js 文件代码：
  ```

  ![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")
  ```纯文本 
   <pre>
   var  express = require( ' express ' );
   var  app =  express();
   var  fs = require( " fs " );
   
   var  bodyParser = require( ' body-parser ' );
   var  multer  = require( ' multer ' );
   
  app.use(express. static ( ' public ' ));
  app.use(bodyParser.urlencoded({ extended:  false  }));
  app.use(multer({ dest:  ' /tmp/ ' }).array( ' image ' ));
   
  app. get ( ' /index.htm ' , function (req, res) {
     res.sendFile( __dirname  +  " / "  +  " index.htm "  );
  })
   
  app.post( ' /file_upload ' , function (req, res) {
   
     console.log(req.files[ 0 ]);   //  上传的文件信息 
   
      var  des_file = __dirname +  " / "  + req.files[ 0 ].originalname;
     fs.readFile( req.files[ 0 ].path, function (err, data) {
          fs.writeFile(des_file, data, function (err) {
            if ( err ){
                console.log( err );
           } else {
                 response  =  {
                     message: ' File uploaded successfully ' , 
                     filename:req.files[ 0 ].originalname
                };
            }
            console.log( response );
            res.end( JSON.stringify( response ) );
         });
     });
  })
   
   var  server = app.listen( 8081 , function () {
   
     var  host =  server.address().address
     var  port =  server.address().port
   
    console.log( " 应用实例，访问地址为 http://%s:%s " , host, port)
   
  })
  ```

  ![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")
  ```纯文本 
   $ node server . js 
   应用实例，访问地址为  http : //0.0.0.0:8081
  ```

  ![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")

  ![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/express6_mY9cakusPD.jpg> "  ")

  ![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/nodejs-gif8_7oxsbUCatV.gif> "  ")
  ***
  ## **Cookie 管理**
  ![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")
  ```纯文本 
   express_cookie.js 文件代码：
  ```

  ![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")
  ```纯文本 
   var  express      = require( ' express ' )
   var  cookieParser = require( ' cookie-parser ' )
   
   var  app =  express()
  app.use(cookieParser())
   
  app. get ( ' / ' , function(req, res) {
    console.log( " Cookies:  " , req.cookies)
  })
   
  app.listen( 8081 )
  ```

  ![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")
  ```纯文本 
   $ node express_cookie . js 
  ```

  ![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")

  ![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/nodejs-gif9_9rtHj6Evyj.gif> "  ")
  ***
  ## **相关资料**
  - Express官网： [http://expressjs.com/](http://expressjs.com/ "http://expressjs.com/")
  - Express4.x API 中文版： [Express4.x API Chinese](https://www.runoob.com/w3cnote/express-4-x-api.html "Express4.x API Chinese")
  - Express4.x API：[http://expressjs.com/zh-cn/4x/api.html](http://expressjs.com/zh-cn/4x/api.html "http://expressjs.com/zh-cn/4x/api.html")

### **Node.js Web 模块（Htttp）**

***

#### **什么是 Web 服务器？**

Web服务器一般指网站服务器，是指驻留于因特网上某种类型计算机的程序，Web服务器的基本功能就是提供Web信息浏览服务。它只需支持HTTP协议、HTML文档格式及URL，与客户端的网络浏览器配合。

大多数 web 服务器都支持服务端的脚本语言（php、python、ruby）等，并通过脚本语言从数据库获取数据，将结果返回给客户端浏览器。

目前最主流的三个Web服务器是Apache、Nginx、IIS。

***

#### **Web 应用架构**

![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/web_architecture_T6jxV7DC1S.jpg> "  ")

- - **Client** - 客户端，一般指浏览器，浏览器可以通过 HTTP 协议向服务器请求数据。
  - **Server** - 服务端，一般指 Web 服务器，可以接收客户端请求，并向客户端发送响应数据。
  - **Business** - 业务层， 通过 Web 服务器处理应用程序，如与数据库交互，逻辑运算，调用外部程序等。
  - **Data** - 数据层，一般由数据库组成。

***

#### **使用 Node 创建 Web 服务器**

Node.js 提供了 http 模块，

http 模块主要用于搭建 HTTP 服务端 和 客户端

，使用 HTTP 服务器或客户端功能必须调用 http 模块，代码如下：

```纯文本 
 var  http  =   require ( 'http' );
```


以下是演示一个最基本的 HTTP 服务器架构(使用8081端口)，创建 server.js 文件，代码如下所示：

![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")

```纯文本 
 server.js 文件代码：
```


![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")

```纯文本 
 var  http = require( ' http ' );
 var  fs = require( ' fs ' );
 var  url = require( ' url ' );


 //  创建服务器 http.createServer( function (request, response) {  
    //  解析请求，包括文件名 
    var  pathname =  url.parse(request.url).pathname;
   
    //  输出请求的文件名 
   console.log( " Request for  "  + pathname +  "  received. " );
   
    //  从文件系统中读取请求的文件内容 
   fs.readFile(pathname.substr( 1 ), function (err, data) {
       if  (err) {
         console.log(err);
          //  HTTP 状态码: 404 : NOT FOUND
          //  Content Type: text/plain 
         response.writeHead( 404 , { ' Content-Type ' :  ' text/html ' });
      } else {             
          //  HTTP 状态码: 200 : OK
          //  Content Type: text/plain 
         response.writeHead( 200 , { ' Content-Type ' :  ' text/html ' });    
         
          //  响应文件内容          response.write(data.toString());        
      }
       //   发送响应数据       response.end();
   });   
}).listen( 8081 );

 //  控制台会输出以下信息 
console.log( ' Server running at http://127.0.0.1:8081/ ' );
```


![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")

![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")

　　接下来我们在该目录下创建一个 index.htm 文件，代码如下：

![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")

```纯文本 
 index.html 文件：
```


![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")

```纯文本 
 <html>
<head>
    <title>Sample Page</title>
</head>
<body> 
     Hello World !
</body>
</html>
```


![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")

![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")

执行 server.js 文件：

```纯文本 
 $ node server . js
 Server  running at http : //127.0.0.1:8081/
```


接着我们在浏览器中打开地址：<http://127.0.0.1:8081/index.htm，显示如下图所示>:

![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/nodejs_sample1_XOqejp4rVt.jpg> "  ")

执行 server.js 的控制台输出信息如下：

```纯文本 
 Server  running at http : //127.0.0.1:8081/ Request   for   / index . htm received .       #  客户端请求信息
```


### **Gif 实例演示**

![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/nodejs-gif4_5cEthV0ZWj.gif> "  ")

***

#### **使用 Node 创建 Web 客户端**

Node 创建 Web 客户端需要引入 http 模块，创建 client.js 文件，代码如下所示：

![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")

```纯文本 
  client.js 文件：
```


![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")

```纯文本 
 var  http = require( ' http ' );

 //  用于请求的选项 var  options =  {
   host:  ' localhost ' ,
   port:  ' 8081 ' ,
   path:  ' /index.htm '   
};

 //  处理响应的回调函数 var  callback =  function(response){
    //  不断更新数据 
    var  body =  '' ;
   response.on( ' data ' , function(data) {
      body  +=  data;
   });
   
   response.on( ' end ' , function() {
       //  数据接收完成       console.log(body);
   });
}
 //  向服务端发送请求 var  req =  http.request(options, callback);
req.end();
```


![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")

 新开一个终端，执行 client.js 文件，输出结果如下：

```纯文本 
 $ node client . js
 <html> <head> <title> Sample   Page </ title > </ head > <body> Hello   World ! </ body > </ html >
```


![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/copycode_x792Et6H_K.gif> "  ")

执行 server.js 的控制台输出信息如下：

```纯文本 
 Server  running at http : //127.0.0.1:8081/ Request   for   / index . htm received .     # 客户端请求信息
```


### **Gif 实例演示**

![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/nodejs-gif5_KpyESZ_KT8.gif> "  ")

```纯文本 
 此节完成！
```


&#x20;   分类:&#x20;
&#x20;          &#x20;

[nodeJS 相关](https://www.cnblogs.com/ostrich-sunshine/category/977656.html "nodeJS 相关")

[**好文要顶**](# "好文要顶")

[**关注我**](# "关注我")

[**收藏该文**](# "收藏该文")

![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/icon_weibo_24_Ur4NzmNdA-.png> "  ")

![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/wechat_RQenS5l3Fo.png> "  ")

![  ](<../assets/nodeJS（2）深了解： nodeJS 项目架构详解（ap/image/20160314220828_RXKu6AxVg8.png> "  ")

[云雀sunshine](https://home.cnblogs.com/u/ostrich-sunshine/ "云雀sunshine")

[关注 - 2](https://home.cnblogs.com/u/ostrich-sunshine/followees/ "关注 - 2")

[粉丝 - 22](https://home.cnblogs.com/u/ostrich-sunshine/followers/ "粉丝 - 22")

[+加关注](# "+加关注")

1

0

[« ](https://www.cnblogs.com/ostrich-sunshine/p/7457732.html "« ")

&#x20;上一篇：   &#x20;

[photoshop 安装](https://www.cnblogs.com/ostrich-sunshine/p/7457732.html "photoshop 安装")

[» ](https://www.cnblogs.com/ostrich-sunshine/p/8026957.html "» ")

&#x20;下一篇：   &#x20;

[jquery 实践操作：load()方法](https://www.cnblogs.com/ostrich-sunshine/p/8026957.html "jquery 实践操作：load()方法")

posted on&#x20;

2017-09-04 17:19

[云雀sunshine](https://www.cnblogs.com/ostrich-sunshine/ "云雀sunshine")

 
阅读(

9467

) 
评论(

0

) 

[
&#x20;   编辑
](https://i.cnblogs.com/EditPosts.aspx?postid=7474471 "
&#x20;   编辑
")

[收藏](# "收藏")
