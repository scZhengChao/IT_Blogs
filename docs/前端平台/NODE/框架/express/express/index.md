# express

```纯文本 
 express --version 
 脚手架： 
   干嘛的：自动搭建项目环境的，无需手动 
     命令行： 脚手架名称 目录 回车 
   安装：需要安装到全局 
     npm install express -g   验证 express -h 
     提示错误: npm install express-generator -g 
     npm install express -g 
     最后查找原因，原来,最新express版本中将命令工具分家出来了(项目地址:https://github.com/expressjs/generator),所以我们还需要安装一个命令工具,命令如下: 
     npm install -g express-generator 
   创建项目: 
     express -e 目录 | express -f  创建到当前命令行所在的目录 
     cd 目录 
     npm install     安装依赖包 
     npm start    -> node ./bin/www 
 
 
   问题：每次都需要重启服务，需要自动重启服务 
   安装： npm i supervisor -g 
   通过supervisor 启动服务： supervisor server.js|./bin/www 
 
 
 ---------------------------------------------------------------------------------- 
 大后端: 
   用户 - > 地址栏(http[s]请求) -> web服务器（收到) - > nodejs处理请求(返回静态、动态)->请求数据库服务(返回结果)->nodejs(接收)->渲染页面->浏览器（接收页面，完成最终渲染) 
 大前端: 
   前端 - > http[s]请求 -> web服务器（收到) - > nodejs处理请求(返回静态、动态)->请求数据库服务(返回结果)->nodejs(接收)->返回给前端(渲染)->浏览器（接收页面，完成最终渲染)
```


```纯文本 
 express  库 
     干嘛的：nodejs库，不用基础做起，工作简单化 
     类似：koa 
 express特点： 
     二次封装，非侵入式，增强形 
     send(any)  write(string|buffer) 
 express搭建服务 
     express=require('express') 
     server=express() 
     server.listen(端口,地址,回调) 
 静态页面托管 
     server.use()/get()/post() 响应 / 
     express.static('./wwww') 
     server.use(express.static('./wwww')); 
 响应: 
     server|app == 服务 
     server.use(url|地址,(req,res,next)=>{}) 
     server.get(url,(req,res,next)=>{}) 
     server.post(url,(req,res,next)=>{}) 
           use 响应get和post请求 默认响应的是 / 
           req / res 经过二次封装 
               res.send(any)    == res.write + end 
               req.query 获取get的数据 
               req.body 获取post的数据  依赖中间件 
                   中间件使用:body-parser  1. npm install xx  2. require   3. app.use(中间件()) 
               req.method 获取前端提交方式 
           next: 是个函数 调用下一个相同地址的响应,除了/ 
 
 
 中间件(middleware)： 
     body-parser 
     中间件:    npmjs.com   查看使用方式 
     body-parser            获取post数据，限定大小，约定返回数据类xx.urlencode({limit:xx}) 
 
 
 服务器给浏览器种只种cookie:  cookie-parser 
 服务器给浏览器种cookie的同时在服务器上生成seesion:   cookie-session 
 
 
 大后端: 
     用户 - > 地址栏(http[s]请求) -> web服务器（收到) - > nodejs处理请求(返回静态、动态)->请求数据库服务(返回结果)->nodejs(接收)->渲染页面->浏览器（接收页面，完成最终渲染) 
 大前端: 
     前端 - > http[s]请求 -> web服务器（收到) - > nodejs处理请求(返回静态、动态)->请求数据库服务(返回结果)->nodejs(接收)->返回给前端(渲染)->浏览器（接收页面，完成最终渲染) 
 
 
 
 
 渲染页面(模板引擎): 
     前端：dom操作            虚拟dom操作    二次渲染，后期多次渲染， 优点：局部渲染 
           jq/js/angualr        vue/react/.......   渲染页面(数据整合到静态页面) 
     后端： 
           抓取前端静态页面 + 渲染引擎 + 数据  返回data ->  send(data) 
           渲染引擎: jade / ejs / .... 
 
 
     arttemplate  underscore baiduTemplate mustach ....... 
 ------------------------------------------------------------- 
 jade: 库 
     侵入式，强依赖 
     jade.render('html'); 返回字符 
     data = jade.renderFile('jade模板文件'，{数据}，{pretty:true});    返回字符 
     jade模板语法 
         父子要缩进 
         属性：  标签(key=value,key2=value) 
         内容:    标签 内容 
 ------------------------------------------------------------- 
 ejs：    模板渲染是异步的 
     非侵入式，温和，弱依赖 
 
 
     ejs.render(str)  返回  str 
     ejs.renderFile('ejs模板',{数据},回调(err,data))    data == str 
 
 
     ejs模板语法： 
         ejs 结构就是html 
         输出:    <%= 数据名|属性名|变量名 + 表达式 %> 
         语句：    <% 语句 %>  需要被<%  %>  包裹 
         非转义输出:    <%- 数据名|变量名  + 表达式 %> 
 
 
         https://www.npmjs.com/package/ejs 
 ----------------------------------------------------- -------- 
 管理多个模板引擎    consolidate 
     server.set('view.engine','html');    模板最终    输出类型设置 
     server.set('views','./views');        引擎模板目录设置 
 
 
     server.engine('html',consolidate.ejs);    输出与引擎匹配 
     server.engine('css',consolidate.jade);    输出与引擎匹配 
 
 
     渲染API： 
     res.render('模板文件名',{数据}) 整合页面和数据，完成渲染，发往浏览器    
```


```纯文本 
 path: 系统模块 
      
     服务器端JS:    相同的代码需要多次执行|CPU和内存资源是瓶颈|加载时从磁盘中加载 
     浏览器段js:    代码需要从一个服务器端分发到多个客户端执行|带宽是瓶颈|通过网络加载 
 
 
     path.parse('c:\\wamp\\xx.png');    磁盘路径(str -> obj) 
             { 
                root: 'c:\\', 盘符 
                dir: 'c:\\wamp', 目录 
                base: 'xx.png',  文件名 
                ext: '.png', 扩展名 
 l            } 
     path.format(obj) -> str 
 
 
     磁盘片段拼接 
     path.join('磁盘路径1','磁盘路径2') 
             __dirname 魔术变量  返回当前文件所在的磁盘路径 
     path.resolve 磁盘片段拼接,右到左找根，找到后停止拼接 
 
     path.normalize()   规范化给定的path  ： path.normalize(_dirname + '/..') 
 
 
 
 大后端: 
     用户 - > 地址栏(http[s]请求) -> web服务器（收到) - > nodejs处理请求(返回静态、动态)->请求数据库服务(返回结果)->nodejs(接收)->渲染页面->浏览器（接收页面，完成最终渲染) 
 大前端: 
     前端 - > http[s]请求 -> web服务器（收到) - > nodejs处理请求(返回静态、动态)->请求数据库服务(返回结果)->nodejs(接收)->返回给前端(渲染)->浏览器（接收页面，完成最终渲染) 
 
 
 -------------------------------------------------------------- 
 数据库:(mysql , mongodb) 
 
 
 mysql: 关系数据库(二维表(表头)) 
     数据库：需要安装服务 
         服务： 
             a) 安装集成环境 开启 mysql服务 
             b) 安装mysql 开启服务 
     库操作： 
         客户端：软件操作(UI工具) 
             集成环境的客户端是 
             navicat 收费 
             nodeJs(后台管理程序),依赖mysql库   npm i mysql -S   -> 查文档 
     链接库： 
         wamp\mysql 
         c:P..G..\mysql 
     库操作  编码方式 UUC 
         建|删 库(目录) 
         建:    CREATE DATABASE  `2017-12-6` DEFAULT CHARACTER SET armscii8 COLLATE armscii8_general_ci; 
         建|删|改 表(文件) 
             创建表头(字段头) 
             CREATE TABLE  `2017-12-6`.`user` ( 
             `name` VARCHAR( 32 ) NOT NULL , 
             `age` INT( 3 ) NOT NULL , 
             `address` VARCHAR( 128 ) NOT NULL 
             ) ENGINE = INNODB 
     表操作    增删改查 
         增： 
             INSERT INTO 表 (字段列表) VALUES(值列表) 
             INSERT INTO user (name,age,address) VALUES('苏菲',38,'') 
         删: 
             DELETE FROM 表 WHERE 字段名=值 
             DELETE FROM user WHERE name='alex' 
         改: 
             UPDATE 表 SET 字段名=值 WHERE 字段名=值 
             UPDATE user set name='sufei' WHERE name='苏菲' 
         查: 
             SELECT ? FROM 表 
             SELECT * FROM user  查所有 
 
 
 ------------------------------------------------------------ 
 
 后端渲染项目: 
 
     1. 定义数据字典(数据库设计) 
         banner：    ID title sub_title src 
         news:    ID title des author author_icon post_time content 
         user:    ID username password follow fans icon 
     2. 素材准备(静态页面模板) 
     3. 搭建服务器 
     4. 处理 http请求，拿到数据，渲染页面 
 
 
 ------------------------------------------------------------------ 
 
 
 路由(router):  告诉你去哪 
     前端：导向 路由就告诉你应该去哪 
     后端: 子服务    一个路由就是一个小的服务(server/app) 
 
 
     创建路由 
         router = express.Router();  返回路由对象 
         server.use('地址,接口',router); 响应的处理过程给了router(子服务) 
 
 
         处理过程： 
         router.get('/',fn) 
         router.get('/1',fn) 
         router.get('/2',fn) 
 -------------------------------- 读取或操作二进制数据流的机制 。 
  Buffer 类是作为 Node.js API 的一部分引入的，用于在 TCP 流、文件系统操作、以及其他 上下文中与八位字节流进行交互 。 类的实例类似于从 0 到 255 之间的整数数组（其他整数会通过 ＆ 255 操作强制转换到此范围），但对应于 V8 堆外部的固定大小的原始内存分配。 Buffer 的 大小在创建时确定，且无法更改 。Buffer 类在全局作用域中，因此无需使用 require('buffer').Buffer, 存在栈里的数组，所以调用相当快 
 node.js  base64 编码： 
          Buffer.from(data).toString('base64') 
         base64 解码： 
         Buffer.from(base64data,'base64').toString('utf-8') 
 -------------- 上面是推荐用法   等价于------------------ 
 new Buffer('str').toString('base64') ===> str to base64 
 new Buffer('base64','base64').toString('utf-8')
```
