# 如何让你的 Express 飞起来？

## 目录

- [
  &#x20;                  &#x20;
  &#x20;                  &#x20;
  &#x20;                  &#x20;
  如何让你的 Express 飞起来？
  &#x20;               ](#------------------------------------------------------------如何让你的-Express-飞起来----------------)
  - [一、OvernightJS 简介](#一OvernightJS-简介)
    - [1.1 OvernightJS 特性](#11-OvernightJS-特性)
    - [1.2 OvernightJS 入门](#12-OvernightJS-入门)
    - [1.2.1 初始化项目](#121-初始化项目)
    - [1.2.2 为 Node.js 和 Express 安装声明文件](#122-为-Nodejs-和-Express-安装声明文件)
    - [1.2.3 初始化 TypeScript 配置文件](#123-初始化-TypeScript-配置文件)
    - [1.2.4 创建简单的 Web 服务器](#124-创建简单的-Web-服务器)
    - [1.2.5 安装 nodemon](#125-安装-nodemon)
  - [二、OvernightJS 原理分析](#二OvernightJS-原理分析)
    - [2.1 TypeScript 装饰器简介](#21-TypeScript-装饰器简介)
    - [2.2 @Controller 装饰器](#22-Controller-装饰器)
    - [2.3 @Get 装饰器](#23-Get-装饰器)
    - [2.4 元数据的使用](#24-元数据的使用)
  - [三、参考资源](#三参考资源)

&#x20;                  &#x20;
&#x20;                  &#x20;
&#x20;                  &#x20;
如何让你的 Express 飞起来？
&#x20;              &#x20;
--------------------------

[
&#x20;                       前端大全                      ](# "
&#x20;                       前端大全                      ")

今天

以下文章来源于全栈修仙之路

，作者阿宝哥

![  ](0_vyL-CXnrwF.jpeg "  ")

[**全栈修仙之路**](https://mp.weixin.qq.com/s/2KpMQxfv6WNoroqvu009rg# "全栈修仙之路")

[聚焦全栈，专注分享 TypeScript、Web API、Node.js、Deno 等技术干货。](https://mp.weixin.qq.com/s/2KpMQxfv6WNoroqvu009rg# "聚焦全栈，专注分享 TypeScript、Web API、Node.js、Deno 等技术干货。")

（给

前端大全

加星标，提升前端技能

）

> 作者：全栈修仙之路 公号 / 阿宝哥

近期有小伙伴问阿宝哥装饰器的应用场景，这让阿宝哥突然萌生了通过优秀的 TS 开源项目，来学习 TS 的想法。

本文阿宝哥将以 Github 上的 

**OvernightJS**

 开源项目为例，来介绍一下如何使用 TypeScript 装饰器来装饰 Express，从而让你的 Express 好用得飞起来。

接下来本文的重心将围绕 

**装饰器**

 的应用展开，不过在分析装饰器在 OvernightJS 的应用之前，阿宝哥先来简单介绍一下 OvernightJS。

### **一、OvernightJS 简介**

> TypeScript decorators for the ExpressJS Server.

OvernightJS 是一个简单的库，用于为要调用 Express 路由的方法添加 TypeScript 装饰器。此外，该项目还包含了用于管理 json-web-token 和打印日志的包。

![  ](640_7cWrphVoSy.png "  ")

#### **1.1 OvernightJS 特性**

OvernightJS 并不是为了替代 Express，如果你之前已经掌握了 Express，那你就可以快速地学会它。OvernightJS 为开发者提供了以下特性：

- 使用 @Controller 装饰器定义基础路由；
- 提供了把类方法转化为 Express 路由的装饰器（**比如 @Get，@Put，@Post，@Delete**）；
- 提供了用于处理中间件的 @Middleware 和 @ClassMiddleware 装饰器；
- 提供了用于处理异常的 @ErrorMiddleware 装饰器；
- 提供了 @Wrapper 和 @ClassWrapper 装饰器用于包装函数；
- 通过 @ChildControllers 装饰器支持子控制器。

出于篇幅考虑，阿宝哥只介绍了 OvernightJS 与装饰器相关的部分特性。了解完这些特性，我们来快速体验一下 OvernightJS。

#### **1.2 OvernightJS 入门**

#### **1.2.1 初始化项目**

首先新建一个 

overnight-quickstart

 项目，然后使用 

npm init -y

 命令初始化项目，然后在命令行中输入以下命令来安装项目依赖包：

```纯文本 
 $  npm i @overnightjs/core express -S
```


在 Express 项目中要集成 TypeScript 很简单，只需安装 

typescript

 这个包就可以了。但为了在开发阶段能够在命令行直接运行使用 TypeScript 开发的服务器，我们还需要安装 

ts-node

 这个包。要安装这两个包，我们只需在命令行中输入以下命令：

```纯文本 
 $  npm i typescript ts-node -D
```


#### **1.2.2 为 Node.js 和 Express 安装声明文件**

声明文件是预定义的模块，用于告诉 TypeScript 编译器的 JavaScript 值的形状。类型声明通常包含在扩展名为 

.d.ts

 的文件中。这些声明文件可用于所有最初用 JavaScript 而非 TypeScript 编写的库。

幸运的是，我们不需要重头开始为 Node.js 和 Express 定义声明文件，因为在 Github 上有一个名为 DefinitelyTyped 项目已经为我们提供了现成的声明文件。

要安装 Node.js 和 Express 对应的声明文件，我们只需要在命令行执行以下命令就可以了：

```纯文本 
 $  npm i @types/node @types/express -D
```


该命令成功执行之后，

package.json

 中的 

devDependencies

 属性就会新增 Node.js 和 Express 对应的依赖包版本信息：

```纯文本 
 {    "devDependencies" : {       "@types/express" :  "^4.17.8" ,       "@types/node" :  "^14.11.2" ,       "ts-node" :  "^9.0.0" ,       "typescript" :  "^4.0.3"   } }
```


#### **1.2.3 初始化 TypeScript 配置文件**

为了能够灵活地配置 TypeScript 项目，我们还需要为本项目生成 TypeScript 配置文件，在命令行输入 

tsc --init

 之后，项目中就会自动创建一个 

tsconfig.json

 的文件。对于本项目来说，我们将使用以下配置项：

```纯文本 
 {    "compilerOptions" : {      "target" :  "es6" ,      "module" :  "commonjs" ,      "rootDir" :  "./src" ,      "outDir" :  "./build" ,      "esModuleInterop" :  true ,      "experimentalDecorators" :  true ,      "strict" :  true   } }
```


#### **1.2.4 创建简单的 Web 服务器**

在创建简单的 Web 服务器之前，我们先来初始化项目的目录结构。首先在项目的根目录下创建一个 

src

 目录及 

controllers

 子目录：

```纯文本 
 ├── src │   ├── controllers │   │   └── UserController.ts │   └── index.ts
```


接着新建 

UserController.ts

 和 

index.ts

 这两个文件并分别输入以下内容：

**UserController.ts**

```纯文本 
 import  { Controller, Get }  from   "@overnightjs/core" ; import  { Request, Response }  from   "express" ; @Controller ( "api/users" ) export   class  UserController {    @Get ( "" )    private  getAll(req: Request, res: Response) {      return  res.status( 200 ).json({       message:  "成功获取所有用户" ,     });   } }
```


**index.ts**

```纯文本 
 import  { Server }  from   "@overnightjs/core" ; import  { UserController }  from   "./controllers/UserController" ; const  PORT =  3000 ; export   class  SampleServer  extends  Server {    constructor ( ) {      super (process.env.NODE_ENV ===  "development" );      this .setupControllers();   }    private  setupControllers():  void  {      const  userController =  new  UserController();      super .addControllers([userController]);   }    public  start(port:  number ):  void  {      this .app.listen(port,  ()  =>  {        console .log( `⚡️[server]: Server is running at http://localhost: ${PORT} ` );     });   } } const  sampleServer =  new  SampleServer(); sampleServer.start(PORT);
```


完成上述步骤之后，我们在项目的 

package.json

 中添加一个 

start

 命令来启动项目：

```纯文本 
 {    "scripts" : {      "start" :  "ts-node ./src/index.ts"   }, }
```


添加完 

start

 命令，我们就可以在命令行中通过 

npm start

 来启动 Web 服务器了。当服务器成功启动之后，命令行会输出以下消息：

```纯文本 
 > ts-node ./src/index.ts ⚡️[server]: Server is running at http://localhost:3000
```


接着我们打开浏览器访问 http\://localhost:3000/api/users 这个地址，你就会看到 

{"message":"成功获取所有用户"}

 这个信息。

#### **1.2.5 安装 nodemon**

为了方便后续的开发，我们还需要安装一个第三方包 nodemon。对于写过 Node.js 应用的小伙伴来说，对 nodemon

这个包应该不会陌生。

nodemon这个包会自动检测目录中文件的更改，当发现文件异动时，会自动重启 Node.js 应用程序。

同样，我们在命令行执行以下命令来安装它：

```纯文本 
 $  npm i nodemon -D
```


安装完成后，我们需要更新一下前面已经创建的 

start

 命令：

```纯文本 
 {    "scripts" : {      "start" :  "nodemon ./src/index.ts"   } }
```


好的，现在我们已经知道如何使用 OvernightJS 来开发一个简单的 Web 服务器。接下来，阿宝哥将带大家一起来分析 OvernightJS 是如何使用 TypeScript 装饰器实现上述的功能。

### **二、OvernightJS 原理分析**

在分析前面示例中 

@Controller

 和 

@Get

 装饰器原理前，我们先来看一下直接使用 Express 如何实现同样的功能：

```纯文本 
 import  express, { Router, Request, Response }  from   "express" ; const  app = express(); const  PORT =  3000 ; class  UserController {    public  getAll(req: Request, res: Response) {      return  res.status( 200 ).json({       message:  "成功获取所有用户" ,     });   } } const  userRouter = Router(); const  userCtrl =  new  UserController(); userRouter.get( "/" , userCtrl.getAll); app.use( "/api/users" , userRouter); app.listen(PORT,  ()  =>  {    console .log( `⚡️[server]: Server is running at http://localhost: ${PORT} ` ); });
```


在以上代码中，我们先通过调用 

Router

 方法创建了一个 

userRouter

 对象，然后进行相关路由的配置，接着使用 

app.use

 方法应用 

userRouter

 路由。下面我们用一张图来直观感受一下 OvernightJS 与 Express 在使用上的差异：

![  ](640_BMHxoB0Bx1.jpeg "  ")

通过以上对比可知，利用 OvernightJS 提供的装饰器，可以让我们开发起来更加便捷。但大家要记住 OvernightJS 底层还是基于 Express，其内部最终还是通过 Express 提供的 API 来处理路由。

接下来为了能更好理解后续的内容，我们先来简单回顾一下 TypeScript 装饰器。

#### **2.1 TypeScript 装饰器简介**

装饰器是一个表达式，该表达式执行后，会返回一个函数。在 TypeScript 中装饰器可以分为以下 4 类：

![  ](640__CHCJbxPof.jpeg "  ")

需要注意的是，若要启用实验性的装饰器特性，你必须在命令行或 

tsconfig.json

 里启用 

experimentalDecorators

 编译器选项：

**命令行**

：

```纯文本 
 tsc --target ES5 --experimentalDecorators
```


**tsconfig.json**

：

```纯文本 
 {    "compilerOptions" : {       "experimentalDecorators" :  true    } }
```


了解完 TypeScript 装饰器的分类，我们来开始分析 OvernightJS 框架中提供的装饰器。

#### **2.2 @Controller 装饰器**

在前面创建的简单 Web 服务器中，我们通过以下方式来使用 

@Controller

 装饰器：

```纯文本 
 @Controller ( "api/users" ) export   class  UserController {}
```


很明显该装饰器应用在 

UserController

 类上，它属于类装饰器。OvernightJS 的项目结构很简单，我们可以很容易找到 

@Controller

 装饰器的定义：

```纯文本 
 // src/core/lib/decorators/class.ts export   function   Controller ( path:  string ):  ClassDecorator   {    return  <TFunction  extends   Function >(target: TFunction):  void  =>  {     addBasePathToClassMetadata(target.prototype,  "/"  + path);   }; }
```


通过观察以上代码可知，Controller 函数是一个装饰器工厂，即调用该工厂方法之后会返回一个 ClassDecorator 对象。在 ClassDecorator 内部，会继续调用 

addBasePathToClassMetadata

 方法，把基础路径添加到类的元数据中：

```纯文本 
 // src/core/lib/decorators/class.ts export   function   addBasePathToClassMetadata ( target:  Object , basePath:  string ):  void   {    let  metadata: IClassMetadata |  undefined  = Reflect.getOwnMetadata(classMetadataKey, target);    if  (!metadata) {       metadata = {};   }   metadata.basePath = basePath;   Reflect.defineMetadata(classMetadataKey, metadata, target); }
```


addBasePathToClassMetadata

 函数的实现很简单，主要是利用 Reflect API 实现元数据的存取操作。在以上代码中，会先获取 

target

 对象上已保存的 

metadata

 对象，如果不存在的话，会创建一个空的对象，然后把参数 

basePath

 的值添加该对象的 

basePath

 属性中，元数据设置完成后，在通过 

Reflect.defineMetadata

 方法进行元数据的保存。

下面我们用一张图来说明一下 

@Controller

 装饰器的处理流程：

![  ](640_Siu4OzAS7g.jpeg "  ")

在 OvernightJS 项目中，所使用的 Reflect API 是来自 reflect-metadata 这个第三方库。该库提供了很多 API 用于操作元数据，这里我们只简单介绍几个常用的 API：

```纯文本 
 // define metadata on an object or property Reflect.defineMetadata(metadataKey, metadataValue, target); Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey); // check for presence of a metadata key on the prototype chain of an object or property let  result = Reflect.hasMetadata(metadataKey, target); let  result = Reflect.hasMetadata(metadataKey, target, propertyKey); // get metadata value of an own metadata key of an object or property let  result = Reflect.getOwnMetadata(metadataKey, target); let  result = Reflect.getOwnMetadata(metadataKey, target, propertyKey); // get metadata value of a metadata key on the prototype chain of an object or property let  result = Reflect.getMetadata(metadataKey, target); let  result = Reflect.getMetadata(metadataKey, target, propertyKey); // delete metadata from an object or property let  result = Reflect.deleteMetadata(metadataKey, target); let  result = Reflect.deleteMetadata(metadataKey, target, propertyKey);
```


相信看到这里，可能有一些小伙伴会有疑问，通过 Reflect API 保存的元数据什么时候使用呢？这里我们先记住这个问题，后面我们再来分析它，接下来我们来开始分析 

@Get

 装饰器。

#### **2.3 @Get 装饰器**

在前面创建的简单 Web 服务器中，我们通过以下方式来使用 

@Get

 装饰器，该装饰器用于配置 Get 请求：

```纯文本 
 export   class  UserController {    @Get ( "" )    private  getAll(req: Request, res: Response) {      return  res.status( 200 ).json({       message:  "成功获取所有用户" ,     });   } }
```


@Get

 装饰器应用在 

UserController

 类的 

getAll

 方法上，它属于方法装饰器。它的定义如下所示：

```纯文本 
 // src/core/lib/decorators/method.ts export   function   Get ( path?:  string  |  RegExp ):  MethodDecorator  &  PropertyDecorator   {    return  helperForRoutes(HttpVerb.GET, path); }
```


与 

Controller

 函数一样，

Get

 函数也是一个装饰器工厂，调用该函数之后会返回 

MethodDecorator & PropertyDecorator

 的交叉类型。除了 Get 请求方法之外，常见的 HTTP 请求方法还有 Post、Delete、Put、Patch 和 Head 等。为了统一处理这些请求方法，OvernightJS 内部封装了一个 

helperForRoutes

 函数，该函数的具体实现如下：

```纯文本 
 // src/core/lib/decorators/method.ts function   helperForRoutes ( httpVerb: HttpDecorator, path?:  string  |  RegExp ):  MethodDecorator  &  PropertyDecorator   {    return  (target:  Object , propertyKey:  string  | symbol):  void  =>  {        let  newPath:  string  |  RegExp ;        if  (path ===  undefined ) {           newPath =  '' ;       }  else   if  (path  instanceof   RegExp ) {           newPath = addForwardSlashToFrontOfRegex(path);       }  else  {  // assert (path instanceof string)           newPath =  '/'  + path;       }       addHttpVerbToMethodMetadata(target, propertyKey, httpVerb, newPath);     }; }
```


观察以上代码可知，在 

helperForRoutes

 方法内部，会继续调用 

addHttpVerbToMethodMetadata

 方法把请求方法和请求路径这些元数据保存起来。

```纯文本 
 // src/core/lib/decorators/method.ts export   function   addHttpVerbToMethodMetadata ( target:  Object , metadataKey:  any ,    httpDecorator: HttpDecorator, path:  string  |  RegExp ):  void   {      let  metadata: IMethodMetadata |  undefined  = Reflect.getOwnMetadata(metadataKey, target);      if  (!metadata) {         metadata = {};     }      if  (!metadata.httpRoutes) {         metadata.httpRoutes = [];     }      const  newArr: IHttpRoute[] = [{       httpDecorator,       path,     }];     newArr.push(...metadata.httpRoutes);     metadata.httpRoutes = newArr;     Reflect.defineMetadata(metadataKey, metadata, target); }
```


在 

addHttpVerbToMethodMetadata

 方法中，会先获取已保存的元数据，如果 

metadata

 对象不存在则会创建一个空的对象。然后会继续判断该对象上是否含有 

httpRoutes

 属性，没有的话会使用 

\[]

 对象来作为该属性的属性值。而请求方法和请求路径这些元数据会以对象的形式保存到数组中，最终在通过 

Reflect.defineMetadata

 方法进行元数据的保存。

同样，我们用一张图来说明一下 

@Get

 装饰器的处理流程：

![  ](640_jDLylqhtip.jpeg "  ")

分析完 

@Controller

 和 

@Get

 装饰器，我们已经知道元数据是如何进行保存的。下面我们来回答 “通过 Reflect API 保存的元数据什么时候使用呢？” 这个问题。

#### **2.4 元数据的使用**

要搞清楚通过 Reflect API 保存的元数据什么时候使用，我们就需要来回顾一下前面开发的 

SampleServer

 服务器：

```纯文本 
 export   class  SampleServer  extends  Server {    constructor ( ) {      super (process.env.NODE_ENV ===  "development" );      this .setupControllers();   }    private  setupControllers():  void  {      const  userController =  new  UserController();      super .addControllers([userController]);   }    public  start(port:  number ):  void  {      this .app.listen(port,  ()  =>  {        console .log( `⚡️[server]: Server is running at http://localhost: ${PORT} ` );     });   } } const  sampleServer =  new  SampleServer(); sampleServer.start(PORT);
```


在以上代码中 

SampleServer

 类继承于 OvernightJS 内置的 

Server

 类，对应的 UML 类图如下所示：

![  ](640_ArSjmbOdgV.jpeg "  ")

此外，在 

SampleServer

 类中我们定义了 

setupControllers

 和 

start

 方法，分别用于初始化控制器和启动服务器。我们在自定义的控制器上使用了 

@Controller

 和 

@Get

 装饰器，因此接下来我们的重点就是分析 

setupControllers

 方法。该方法的内部实现很简单，就是手动创建控制器实例，然后调用父类的 

addControllers

 方法。

下面我们来分析 

addControllers

 方法，该方法位于 

src/core/lib/Server.ts

 文件中，具体实现如下：

```纯文本 
 // src/core/lib/Server.ts export   class  Server {    public  addControllers(     controllers: Controller | Controller[],     routerLib?: RouterLib,     globalMiddleware?: RequestHandler,   ):  void  {        controllers = (controllers  instanceof   Array ) ? controllers : [controllers];         // ① 支持动态设置路由库         const  routerLibrary: RouterLib = routerLib || Router;         controllers.forEach( ( controller: Controller ) =>  {           if  (controller) {               // ② 为每个控制器创建对应的路由对象               const  routerAndPath: IRouterAndPath |  null  =  this .getRouter(routerLibrary, controller);               // ③ 注册路由               if  (routerAndPath) {                    if  (globalMiddleware) {                        this .app.use(routerAndPath.basePath, globalMiddleware, routerAndPath.router);                   }  else  {                        this .app.use(routerAndPath.basePath, routerAndPath.router);                   }               }             }         });     } }
```


addControllers

 方法的整个执行过程还是比较清晰，最核心的部分就是 

getRouter

 方法。在该方法内部就会处理通过装饰器保存的元数据。其实 

getRouter

 方法内部还会处理其他装饰器保存的元数据，简单起见我们只考虑与 

@Controller

 和 

@Get

 装饰器相关的处理逻辑。

```纯文本 
 // src/core/lib/Server.ts export   class  Server {   private  getRouter(routerLibrary: RouterLib, controller: Controller): IRouterAndPath |  null  {          const  prototype:  any  =  Object .getPrototypeOf(controller);          const  classMetadata: IClassMetadata |  undefined  = Reflect.getOwnMetadata(classMetadataKey, prototype);          // 省略部分代码          const  { basePath, options, ...}: IClassMetadata = classMetadata;          // ① 基于配置项创建Router对象          const  router: IRouter = routerLibrary(options);          // ② 为路由对象添加路径和请求处理器          let  members:  any  =  Object .getOwnPropertyNames(controller);         members = members.concat( Object .getOwnPropertyNames(prototype));         members.forEach( ( member:  any ) =>  {              // ③ 获取方法中保存的元数据              const  methodMetadata: IMethodMetadata |  undefined  = Reflect.getOwnMetadata(member, prototype);              if  (methodMetadata) {                  const  { httpRoutes, ...}: IMethodMetadata = methodMetadata;                  let  callBack:  ( ...args:  any [] ) =>   any  = (...args:  any []):  any  =>  {                      return  controller[member](...args);                 };                  // 省略部分代码                  if  (httpRoutes) {  // httpRoutes数组中包含了请求的方法和路径                      // ④ 处理控制器类中通过@Get、@Post、@Put或@Delete装饰器保存的元数据                     httpRoutes.forEach( ( route: IHttpRoute ) =>  {                          const  { httpDecorator, path }: IHttpRoute = route;                          // ⑤ 为router对象设置对应的路由信息                          if  (middlewares) {                             router[httpDecorator](path, middlewares, callBack);                         }  else  {                             router[httpDecorator](path, callBack);                         }                     });                 }             }         });          return  { basePath, router, };     } }
```


现在我们已经知道 OvernightJS 内部如何利用装饰器来为控制器类配置路由信息，这里阿宝哥用一张图来总结 OvernightJS 的工作流程：

![  ](640_9WTp9d1BXm.jpeg "  ")

在 OvernightJS 内部除了 

@Controller

、

@Get

、

@Post

、

@Delete

 等装饰器之外，还提供了用于注册中间件的 

@Middleware

 装饰器及用于设置异常处理中间件的 

@ErrorMiddleware

 装饰器。感兴趣的小伙伴可以参考一下阿宝哥的学习思路，自行阅读 OvernightJS 项目的源码。

希望通过这篇文章，可以让小伙伴们对装饰器的应用场景有一些更深刻的理解。如果你还意犹未尽的话，可以阅读阿宝哥之前写的 

[**了不起的 IoC 与 DI**](https://mp.weixin.qq.com/s?__biz=MzI2MjcxNTQ0Nw==\&mid=2247485950\&idx=1\&sn=9bfed7fee2f2a02b5e9994480a66e1e9\&scene=21#wechat_redirect "了不起的 IoC 与 DI")

 这篇文章，该文章介绍了如何利用 TypeScript 装饰器和 reflect-metadata  这个库提供的 Reflect API 实现一个 IoC 容器。

### **三、参考资源**

- Github - overnight
- expressjs.com

推荐阅读

点击标题可跳转

1、

[Node.js 在大前端领域的应用分析](http://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==\&mid=2651561002\&idx=2\&sn=50fe2d8ac3ea7f63d4ba14a3529c501f\&chksm=80254bebb752c2fd179c04b1ad675edfa6d143259eb703a05cc7167ffc3d6777e776f9316a64\&scene=21#wechat_redirect "Node.js 在大前端领域的应用分析")

2、

[Node 中如何引入一个模块及其细节](http://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==\&mid=2651560900\&idx=1\&sn=aa0a1372182ee96589aaca9a76ead3c4\&chksm=80254c05b752c513d02be818d0cb0751612f1d7c93062608bbfc73ee039baa34303df7465d70\&scene=21#wechat_redirect "Node 中如何引入一个模块及其细节")

3、

[如何科学修改 node\_modules 里的文件](http://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==\&mid=2651560554\&idx=2\&sn=971fac70b21bfb52f650854e8474fbd6\&chksm=80254dabb752c4bd1039f00667a4c9eb32e8da02789599c946be9283f486b9b8e79d3c7e747d\&scene=21#wechat_redirect "如何科学修改 node_modules 里的文件")

觉得本文对你有帮助？请分享给更多人

关注「前端大全」加星标，提升前端技能

![  ](640_rh03sqwqMh.jpeg "  ")

好文章，我

在看

❤️
