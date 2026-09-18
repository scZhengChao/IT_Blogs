# Dotenv

Dotenv 是一个零依赖模块，可将环境变量从一个.env 文件加载到 [process.env](https://nodejs.org/docs/latest/api/process.html#process_process_env "process.env")中。

将配置与代码分开存储在环境中是基于“[十二要素应用](https://www.infoq.cn/article/sDXEcX8qtJX7DXvHcDYu "十二要素应用")”方法的行为。

Dotenv：[https://github.com/motdotla/dotenv](https://github.com/motdotla/dotenv "https://github.com/motdotla/dotenv")

在你的应用程序尽早要求并配置 dotenv：&#x20;

```javascript 
 require ( 'dotenv' ) .config ()
```


在项目的根目录中创建一个.env 文件。在新代码行上以 NAME=VALUE 的形式添加特定于环境的变量。例如：&#x20;

```javascript 
 DB_HOST =localhost
 DB_USER =root 
 DB_PASS =s1mpl3
```


process.env 现在具有你在.env 文件中定义的键和值：&#x20;

```javascript 
 const  db =  require ( 'db' ) 
db.connect({   
  host: process.env.DB_HOST,   
  username: process.env.DB_USER,   
  password: process.env.DB_PASS 
})
```
