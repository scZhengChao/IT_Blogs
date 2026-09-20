# 持久化

## 目录

- [lowdb](#lowdb)
  - [一、lowdb的优势](#一lowdb的优势)
  - [二、准备工作](#二准备工作)
  - [三、生成数据库文件并初始化数据](#三生成数据库文件并初始化数据)
- [electron-store](#electron-store)

# lowdb

electron毕竟是一个桌面应用，那么存储用户数据一定是必备的功能。为了方便操作和理解，选用了[lowdb](https://links.jianshu.com/go?to=https://github.com/typicode/lowdb "lowdb")数据库。

## 一、lowdb的优势

1. 基于lodash开发的，有lodash的加持，用起来很顺手。
2. 采用JSON为基本存储结构，不管是调用还是备份都很方便。
3. 持续的维护，有不少好用的插件。
4. 很关键的是同步操作，采用链式调用的写法，写起来有种jQuery的感觉。
5. 用JSON存储的数据，更方便前端开发人员理解和使用。

## 二、准备工作

安装需要的插件库

```typescript 
# 安装数据库
yarn add lowdb # cnpm install --save lowdb
# 操作数据库文件，安装最新版本的运行时会报错，建议安装指定版本的
yarn add fs-extra@8.1.0 # cnpm install --save fs-extra@8.1.0
```


## 三、生成数据库文件并初始化数据

由于electron给main和renderder进程都置入了Node的fs模块，所以我们很方便的在两端都使用跟`fs`相关的操作。而lowdb本质上就是通过fs来读写JSON文件实现的，正好符合我们的要求。下面我们来初始化一下

1. 在`src/main`路径下新建`datastore.js`文件。具体代码如下

```typescript 
import Datastore from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'
import fs from 'fs-extra'
import { app, remote } from 'electron'

const APP = process.type === 'renderer' ? remote.app : app // 根据process.type来分辨在哪种模式使用哪种模块

const STORE_PATH = APP.getPath('userData') // 获取electron应用的用户目录
// 我的是C:\Users\wsl\AppData\Roaming\Electron
// 判断路径是否存在，若不存在，就创建
if (process.type !== 'renderer') {
  if (!fs.pathExistsSync(STORE_PATH)) {
    fs.mkdirpSync(STORE_PATH)
  }
}

// 初始化lowdb读写的json文件名以及存储路径
const adapter = new FileSync(path.join(STORE_PATH, '/data.json')) 

const db = Datastore(adapter) // lowdb接管该文件

export default db // 暴露出去
```


数据库的存储路径不能放在static下面，因为项目打包后static会被编码，无法获取，即使不编码能获取到，也不允许更改。所以，直接放在C盘的用户数据里面就可以了。坑我替你们踩过了。

1. 初始化数据库

```typescript 
// 初始化数据，若没有时，才会初始化
if (!db.has('array').value()) {
  db.set('array', []).write()
}

if (!db.has('object').value()) {
  db.set('object', {
    key: 'value'
  }).write()
}

if (!db.has('number').value()) {
  db.set('number', 123).write()
}
```


# electron-store
