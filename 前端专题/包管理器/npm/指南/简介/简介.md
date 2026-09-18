# 简介

## 目录

- [包管理](#包管理)
- [配置](#配置)
- [去广告](#去广告)
- [缓存](#缓存)

# 包管理

```typescript 
// 显示进度
npm install --verbose electron   

//强制安装
npm i 包名 --force

//安装到项目依赖
npm install 包名 --save  /  -S

//安装到开发依赖
npm install 包名 --save-dev /  -D

// 列出所有已装包
npm list/ls  -g
npm outdated  包名  // 版本对比(安装过得包)

npm dist-tag ls 包名  // 获取最新版本

//升级：
npm update -g react-native-cli
//升级npm 版本   
npm install -g npm  

//卸载到全局
npm install 包名 -g       g==golbal            yarn add 包名  bower install 包名
npm uninstall 包名 -g     g==golbal

```


# 配置

```typescript 
//查看npm 配置
npm config list  

//查看npm 安装路径  
npm config get prefix    

npm config set prefix "D:\nodejs\node global"   找到路劲 ,并且将路径写在path 下
npm config set cache "D:\nodejs\node cache"    找到路劲 ,并且将路径写在path 下


//因为npm install走的是https协议，需要通过数字证书来保证的
npm config set strict-ssl false

```


# 去广告

```typescript 
//当本地npm install/build 没有错但是生产部署有错; 请配置install 命令
//去掉插件包里广告之类的
npm install --ignore-scripts    
```


# 缓存

```javascript 
//清楚缓存  npm ERR Unexpected token in JSON at position 0 while parsing near解决方案
npm cache clean —force 
yarn cache clean

npm cache verify
npm uninstall *

```
