# vite + electron

## 目录

- [vite简介](#vite简介)
- [Vite创建前端工程
  ](#Vite创建前端工程)

# vite简介

`Vite`是一款现代化的前端构建工具，它基于`ES`模块的即时热更新（`Hot Module Replacement`, `HMR`）和按需编译的理念，提供了更快的开发环境启动速度和更新速度，极大地提升了前端开发的效率。
`Vite`的特点包括：

- 快速启动：`Vite`使用了**ES模块的原生HTTP2服务器**，能够在浏览器中直接加载源码，无需预先构建，大大减少了启动时间。
- 即时热更新：当代码发生变化时，Vite能够快速更新模块，只重新编译和刷新改变的部分，而不是整个应用，这使得开发过程中的反馈循环非常快。
- 预构建优化：虽然`Vite`在**开发时直接使用源码，但在生产环境中，它会自动进行优化**，如**代码分割、tree-shaking、压缩**等，以保证生产环境的性能。
- 插件系统：`Vite`**支持广泛的插件体系**，可以扩展其功能，如支持Vue、React等框架，以及处理CSS、图片等资源。
- 兼容性：`Vite`通过`esbuild`（**一个非常快的JavaScript和TypeScript编译器**）处理`ES`模块和转换，使其可以**运行在不支持ES模块的浏览器上。**
- 易于配置：**Vite的配置相对简单**，大多数情况下，你甚至不需要配置文件，它就能很好地工作。

Vite创建前端工程

运行创建命令，选择react+ts模板

```javascript 
npm create vite@latest
```


```javascript 
electron              
├─ public              
│  └─ vite.svg         
├─ src                 
│  ├─ assets           
│  │  └─ react.svg     
│  ├─ App.css          
│  ├─ App.tsx          
│  ├─ index.css        
│  ├─ main.tsx         
│  └─ vite-env.d.ts    
├─ index.html          
├─ package.json        
├─ README.md           
├─ tsconfig.json       
├─ tsconfig.node.json  
└─ vite.config.ts
```


如何将Vite和Electron结合起来呢

我们现在有两个项目，Vite项目和Electron项目
vite项目启动后会生成一个url

Electron启动以后会开启一个客户端，并且显示本地index.html代码内容

将主进程ts文件编译成js
我们借助vite插件能力，使用esbuild将主进程里面代码编译为js代码，我们首先将客户端目录进行改造

其中【main】目录存放主进程代码，【renderer】存放渲染进程代码
接下来，我们编写主进程代码

```javascript 
import { app, BrowserWindow } from 'electron'

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
    })
    win.loadURL("http://127.0.0.1:5173/")
}

app.whenReady().then(() => {
    createWindow()
})
```


`electron`命令无法直接识别ts文件，我们需要借助esbuild来讲ts代码转译为js代码，之所以使用esbuild是因为vite内置打包工具就是esbuild
在vite.config.ts文件中，编写如下代码

```javascript 
export default defineConfig({
  plugins: [{
    name: "electron-plugin",
    configureServer(server) {
      server.httpServer?.once('listening', () => {
        esbuild.buildSync({
          entryPoints: ['./src/main/*'],
          bundle: true,
          platform: 'node',
          outdir: 'dist',
          external: ['electron'],
        });
      });
    }
  }, react()],
})

```


运行`npm run dev`命令，会在工作区生成一个`dist`目录，里面包含了`/src/main`目录下面所有被打包的ts文件

这个时候我们就可以运行命令  `electron './dist/main.js'`来执行我们的electron程序了， 不过我们不是在命令行执行这个命令，而是通过`nodejs`，在我们刚刚编写的`configureServer`里面执行命令

在`nodejs`中，可以使用`spawn`或者`exec`来执行命令，我们使用`spawn`执行命令，完整代码如下

```javascript 
import { defineConfig } from 'vite'
import esbuild from 'esbuild'
import react from '@vitejs/plugin-react'
import electron from 'electron';
import { spawn } from 'child_process';

export default defineConfig({
  plugins: [{
    name: "electron-plugin",
    configureServer(server) {
      server.httpServer?.once('listening', () => {
        esbuild.buildSync({
          entryPoints: ['./src/main/*'],
          bundle: true,
          platform: 'node',
          outdir: 'dist',
          external: ['electron'],
        });
        spawn(electron.toString(), ['./dist/main.js', "http://127.0.0.1:5173"], {
          cwd: process.cwd(),
          stdio: 'inherit',
        })
      });
    }
  }, react()],
})
```


[ 郑超/vite-project Gitee.com（码云） 是 OSCHINA.NET 推出的代码托管平台，支持 Git 和 SVN，提供免费的私有仓库托管。目前已有超过 1200万的开发者选择 Gitee。 https://gitee.com/changtuizhengchao/vite-project](https://gitee.com/changtuizhengchao/vite-project " 郑超/vite-project Gitee.com（码云） 是 OSCHINA.NET 推出的代码托管平台，支持 Git 和 SVN，提供免费的私有仓库托管。目前已有超过 1200万的开发者选择 Gitee。 https://gitee.com/changtuizhengchao/vite-project")
