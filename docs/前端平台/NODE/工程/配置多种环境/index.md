# 配置多种环境

## 目录

- [配置多种场景](#配置多种场景)

# **配置多种场景**



**场景的种类一般就以下几种**
&#x20;   1\. 开发场景
&#x20;   2\. 真实场景
&#x20;   3\. 测试场景
&#x20;   4\. debug场景
或者再有其他场景就做额外的添加，配制方法都是一样的;

**我们可以通过对环境的NODE\_ENV赋值来区分不同的环境**
&#x20;     我们在通过命令行在运行程序的时候对其进行赋值，不同的场景赋值不一样，在程序中读取这个值来判断是那种场景
首先我们修改package.json的script为：

```javascript 
 "scripts": { 
      "start":"set NODE_ENV=production && node bin/www", 
      "pm2": "pm2 start bin/www ", 
      "run":"set NODE_ENV=development && nodemon bin/www", 
      "test": "set NODE_ENV=test && echo \"Error: no test specified\" && exit 1" 
 }
```


**配置不同的配置文件**
    新建文件夹config
    新建三个文件

```javascript title="development.js/production.js/test.j
"
 
 var  config  = { 
     env: 'development', //环境名称 
     port: 3001,         //服务端口号 
     mysql_config: { 
         //mysql数据库配置 
     }, 
     mongodb_config: { 
         //mongodb数据库配置 
     }, 
     redis_config: { 
         //redis数据库配置 
     }, 
 }; 
 module.exports=config; 

```


```javascript title="index.js   输出config"
//index.js   输出config
const path = require('path')
const _ = require('lodash')
let url = "./"+ process.env.NODE_ENV + '.js'
let config = require(url) || {}
// 不同环境 公共的配置
let all = {

}
module.exports = _.merge(all, config)
```
