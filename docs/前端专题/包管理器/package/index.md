# package

## 目录

- [package.json](#packagejson)
  - [package-lock.json 生成逻辑](#package-lockjson-生成逻辑)
  - [package-lock.json 可能被意外更改的原因](#package-lockjson-可能被意外更改的原因)
  - [开发的建议](#开发的建议)

## package.json

大家都知道，**`package.json 用来描述项目及项目所依赖的模块信息。`**，就是帮我们管理项目中的依赖包的，让我们远离了依赖地狱。

通过 npm 管理，使用一些简单的命令，自动生成`package.json`, 安装包依赖关系都由`package.json`来管理，我们几乎不必考虑它们。

```text 
  管理模块(项目):
        package.json的name的名字需要和项目目录名一致，不要和依赖的包重名
        npm init                 
        初始化npm管理文件(package.json)
            {
              "name": "npm",    项目名称
              "version": "0.0.1",    版本
              "description": "test and play",    描述
              "type": "module",
              "main": "index.js", 入口文件
              "dependencies": {  项目依赖  上线也要用
                "jquery": "^3.2.1"
              },
              "devDependencies": { 开发依赖 上线就不用
                "animate.css": "^3.5.2"
              },
              "scripts": {    命令行
                "test": "命令行"
              },
              "repository": {    仓库信息
                "type": "git",
                "url": "git+https://github.com/alexwa9.github.io/2017-8-28.git"
              },
              "keywords": [  //关键词
                "test",'xx','oo'
              ],
              "author": "wan9",
              "license": "ISC",    认证
              "bugs": {
                "url": "https://github.com/alexwa9.github.io/2017-8-28/issues"
              },
              "homepage": "https://github.com/alexwa9.github.io/2017-8-28#readme"
            }

```


### package-lock.json 生成逻辑

### package-lock.json 可能被意外更改的原因

1. package.json 文件修改了
2. 挪动了包的位置

将部分包的位置从 dependencies 移动到 devDependencies 这种操作，虽然包未变，但是也会影响 `package-lock.json`，会将部分包的 dev 字段设置为 true

1. registry 的影响

经过实际使用发现，如果我们 node\_modules 文件夹下的包中下载时，就算版本一样，安装源 `registry` 不同，执行 npm i 时也会修改 package-lock.json

可能还存在其他的原因，但是 `package-lock.json` 是不会无缘无故被更改的，一定是因为 **package.json 或者 node\_modules 被更改了**，因为 正如上面提到的 package-lock.json 为了能够精准的反映出我们 node\_modules 的结构

### 开发的建议

一般情况下 `npm install` 是可以的，他能保证根据 `package-lock.json` 还原出开发时的 `node_modules`。

但是为了防止出现刚刚提到的意外情况，除非涉及到对包的调整，其他情况下建议使用 `npm ci` 来安装依赖，会避免异常的修改 `package-lock.json`，

持续集成工具中更推荐是用 `npm ci`，保证`构建环境的准确性`，**npm i 和 npm ci 的区别** 可以参考官方文档 npm-ci

[常用属性](./常用属性/index.md "常用属性")

[workspaces](./workspaces/index.md "workspaces")

[导入导出相关属性](./导入导出相关属性/index.md "导入导出相关属性")

[依赖相关属性](./依赖相关属性/index.md "依赖相关属性")

[发布相关](./发布相关/index.md "发布相关")
