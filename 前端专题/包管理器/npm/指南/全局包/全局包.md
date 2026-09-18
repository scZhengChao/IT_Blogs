# 全局包

## 目录

- [查看](#查看)
- [业务](#业务)
- [node](#node)

# 查看

```javascript 
npm list -g --depth 0  查看npm全局包。 深度为0 
npm list -g 

```


# 业务

```javascript 
npm install -g typescript  //以上命令将会安装typescript编译器和可执行程序（tsc），并且添加到环境变量的全局路径中 
  tsc -v   
  tsc hello.ts 生成js在node js
  
npm install -g ts-node    //若想要把编译与运行结合起来，可使用ts-node模块
  ts-node hello.ts   
  
npm install -g yarn react-native-cli   react-native 脚手架
npm installl  -g  code-push-cli             code-push 热跟新
npm install -g weinre                        weinre 大法调试

```


# node

```javascript 
npm i supervisor -g  开打node服务，动态修改，热刷新（渐渐的不好用了）
npm i nodemon -D  node 的一个自动刷新 没有supervisor 好用  （渐渐的比supervisor好用了 推荐）
npm i pm2 -g     node的进程守护

```
