# 环境变量

## 目录

- [环境变量：](#环境变量)
- [特殊的变量：](#特殊的变量)
- [优先级： ](#优先级)
- [模式概念：](#模式概念)
- [环境变量的使用 :](#环境变量的使用-)
- [理解指令 , 模式 , 环境变量之间的关系](#理解指令--模式--环境变量之间的关系)

[https://cli.vuejs.org/](https://cli.vuejs.org/ "https://cli.vuejs.org/")     cli 官网

# **环境变量：**

```纯文本 
 .env                # 在所有的环境中被载入 
 .env.local          # 在所有的环境中被载入，但会被 git 忽略 
 .env.[mode]         # 只在指定的模式中被载入 
 .env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略 
 
 .local  只会在本地生效 
 FOO=bar 
 VUE_APP_SECRET=secret // 只有VUE_APP_开头的环境变量可以在项目代码中直接使用 
 使用：  process.env.VUE_APP_SECRET
```


# **特殊的变量：**

请注意，只有 `NODE_ENV`，`BASE_URL` 和以 `VUE_APP_` 开头的变量将通过 `webpack.DefinePlugin` 静态地嵌入到\_客户端侧\_的代码中。这是为了避免意外公开机器上可能具有相同名称的私钥。

只有以 `VUE_APP_` 开头的变量会被 `webpack.DefinePlugin` 静态嵌入到客户端侧的包中。你可以在应用的代码中这样访问它们：

```javascript 
console.log(process.env.VUE_APP_SECRET)

```


除了 自定义的VUE\_APP\_\* 变量之外，在你的应用代码中始终可用的还有两个特殊的变量：

- **NODE\_ENV - 会是 "development"、"production" 或 "test"中的一个。具体的值取决于应用运行的模式。**
- **BASE\_URL - 会和 vue.config.js 中的 publicPath 选项相符，即你的应用会部署到的基础路径。**

# **优先级**： 

为一个特定模式准备的环境**文件的 (例如 .env.production) 将会比一般的环境文件 (例如 .env) 拥有更高的优先级。**

# **模式概念：**

模式是 Vue CLI 项目中一个重要的概念。一般情况下 Vue CLI 项目有三个默认模式：

```纯文本 
 development 模式用于 vue-cli-service serve 
 production 模式用于 vue-cli-service build 和 vue-cli-service test:e2e 
 test 模式用于 vue-cli-service test:unit
```


模式不等同于 NODE\_ENV，一个模式可以包含多个环境变量。也就是说，每个模式都将 NODE\_ENV的值设置为模式的名称(可重新赋值更改)——比如在 development 模式下 NODE\_ENV 的值会被设置为 "development"。

你可以通过为 .env 文件增加后缀来设置某个模式下特有的环境变量。比如，如果你在项目根目录创建一个名为 **.env.development 的文件，那么在这个文件里声明过的变量就只会在 development 模式下被载入。**

你可以通过**传递 --mode 选项参数为命令行覆写默认的模式。例**如，如果你想要在构建命令中使用开发环境变量，请在你的 package.json 脚本中加入：

```纯文本 
 "dev-build": "vue-cli-service build --mode development",
```


# **环境变量的使用 :**

只有以 VUE\_APP\_ 开头的变量会被 webpack.DefinePlugin 静态嵌入到客户端侧的包中(即在项目代码中使用)。你可以在应用的代码中这样访问它们：

```纯文本 
 console.log(process.env.VUE_APP_SECRET)
```


# **理解指令 , 模式 , 环境变量之间的关系**

我们在项目中的package.json经常能看见以下这样的指令

![  ](./image/f2bf5e24edd2dbe08cb4eb85fa77e2fc_unZ2nsKvHU.png "  ")

在一个 Vue CLI 项目中，@vue/cli-service 安装了一个名为 vue-cli-service 的命令。你可以在 npm scripts 中以 vue-cli-service、或者从终端中以 ./node\_modules/.bin/vue-cli-service 访问这个命令。

vue-cli-service serve

```纯文本 
 用法：vue-cli-service serve [options] [entry] 
 选项： 
   --open    在服务器启动时打开浏览器 
   --copy    在服务器启动时将 URL 复制到剪切版 
   --mode    指定环境模式 (默认值：development) 
   --host    指定 host (默认值：0.0.0.0) 
   --port    指定 port (默认值：8080) 
   --https   使用 https (默认值：false)
```


vue-cli-service build

```纯文本 
 用法：vue-cli-service build [options] [entry|pattern] 
 
 选项： 
   --mode        指定环境模式 (默认值：production) 
   --dest        指定输出目录 (默认值：dist) 
   --modern      面向现代浏览器带自动回退地构建应用 
   --target      app | lib | wc | wc-async (默认值：app) 
   --name        库或 Web Components 模式下的名字 (默认值：package.json 中的 "name" 字段或入口文件名) 
   --no-clean    在构建项目之前不清除目标目录 
   --report      生成 report.html 以帮助分析包内容 
   --report-json 生成 report.json 以帮助分析包内容 
   --watch       监听文件变化
```


**那么接下来 , 我们就开始创建一个用于打包测试环境的模式;修改package.json**添加一行命令

```纯文本 
 "test": "vue-cli-service build --mode test"
```


**添加.env.test文件**

在项目根路径创建.env.test文件，内容为

```纯文本 
 NODE_ENV='production'  //表明这是生产环境(需要打包) 
 VUE_APP_CURRENTMODE='test' // 表明生产环境模式信息 
 VUE_APP_BASEURL='http://***.****.com:8000' // 测试服务器地址
```


**修改项目中的api接口文件**

在我的项目中,一般会创建一个api.js 来管理所有的接口url

因为我们在本地开发环境中是通过代理来连接服务器的,所以将url写成这

```纯文本 
 `${baseUrl}/apis/v1/login`,
```


**在文件开头通过环境变量改变baseUrl**

```纯文本 
 let baseUrl = ''; 
 if (process.env.NODE_ENV == 'development') { 
   baseUrl = "" 
 } else if (process.env.NODE_ENV == 'production') { 
   baseUrl = process.env.VUE_APP_BASEURL 
 } else { 
   baseUrl = "" 
 }
```
