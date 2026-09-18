# npx

## 目录

- [npx是什么？](#npx是什么)
- [为什么会有npx？](#为什么会有npx)
- [实现原理](#实现原理)
- [命令参数](#命令参数)
  - [--no-install](#--no-install)
  - [--ignore-existing](#--ignore-existing)
  - [-p](#-p)
  - [-c](#-c)
- [总结](#总结)

# npx是什么？

从npm的5.2.0版本开始就增加了`npx`这个命令。当然如果你也可以`手动`安装：

```typescript 
sudo npm install npx -g
```


npx 会自动安装依赖包并执行某个命令。

# 为什么会有npx？

npx提升了CLI的操作易用性。

比如你的项目内安装了`MyPackage`的一个module，不使用npx时，你想调用你只能：

```typescript 
// 方法1: 在package里面的scripts字段里配置
"scripts":{
    "mp": "node_modules/.bin/MyPackage"
}
// 方法2: 在cmd命令行中敲击代码
# 项目的环境根目录下执行
$ node_modules/.bin/MyPackage

```


npx则可以解决这样的问题，让项目内部安装的模块用起来更方便：

```typescript 
npx MyPackage
```


还可以\*\*避免`全局安装`\*\***的问题。 比如我们想用一个全局模块的方法，但是我们又不想安装到全局**，就可以使用npx来运行它，而且不进行全局安装。

```typescript 
npx vuecli create <projectname>
```


# 实现原理

npx的实现原理其实很简单，就是在npx运行的时候，**会在当前目录/node\_modules/.bin里去查找是否有可执行的命令**，没有找到的话**再从全局里查找是否有安装对应的模块**，**全局也没有的话就会自动下载对应的模块**，如上面的 create-react-app，npx 会将 create-react-app **下载到一个临时目录，用完即删，不会占用本地资源。**

# 命令参数

## --no-install

\--no-install 告诉npx不要自动下载，也就意味着如果本地没有该模块则无法执行后续的命令。

```typescript 
npx --no-install create-react-app my-react-app

// not found: create-react-app
```


## --ignore-existing

\--ignore-existing 告诉npx忽略本地已经存在的模块，每次都去执行下载操作，也就是每次都会下载安装临时模块并在用完后删除。

```typescript 
npx --ignore-existing create-react-app my-react-app
```


## -p

```typescript 
//-p 用于指定npx所要安装的模块，它可以指定某一个版本进行安装：
npx -p node@12.0.0 node index.js
//-p 还可以用于同时安装多个模块：
npx -p lolcatjs -p cowsay [command]

```


## -c

-c 告诉npx所有命令都用npx解释。

```typescript 
npx -p lolcatjs -p cowsay 'cowsay hello | lolcatjs'
```


这样运行会报错，因为第一项命令cowsay hello默认有npx解释，但第二项命令localcatjs会有shell解释，此时lolcatjs并没有全局安装，所有就报错了。这时候可以用-c参数来解决。

```typescript 
npx -p lolcatjs -p cowsay -c 'cowsay hello | lolcatjs'
```


# 总结

1. 避免`全局安装`的问题。 比如我们想用一个全局模块的方法，但是我们又不想安装到全局
2. 会在当前目录/node\_modules/.bin里去查找是否有可执行的命令，没有找到的话再从全局里查找是否有安装对应的模块，全局也没有的话就会自动下载对应的模块下载到一个临时目录，用完即删，不会占用本地资源。
