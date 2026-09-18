# 自定义最大化、最小化、关闭按钮

[ Electron+Vue 自定义最大化、最小化、关闭按钮\_路上的小蜗牛的博客-CSDN博客\_vue窗口最小化 最大化、最小化、关闭是由 主进程（Main） 所控制如果你要自定义肯定是写在了.vue文件中，也就是说，你自定义的是写在了 渲染进程（Renderer） 中。首先关闭原有的最大化、最小化、关闭按钮；在 background.js 文件中，初始化BrowserWindow 时，添加属性 frame:false在需要实现最大最小化的vue文件中，添加如下代码：const ipcRenderer = r https://blog.csdn.net/qq\_42540900/article/details/119537964](https://blog.csdn.net/qq_42540900/article/details/119537964 " Electron+Vue 自定义最大化、最小化、关闭按钮_路上的小蜗牛的博客-CSDN博客_vue窗口最小化 最大化、最小化、关闭是由 主进程（Main） 所控制如果你要自定义肯定是写在了.vue文件中，也就是说，你自定义的是写在了 渲染进程（Renderer） 中。首先关闭原有的最大化、最小化、关闭按钮；在 background.js 文件中，初始化BrowserWindow 时，添加属性 frame:false在需要实现最大最小化的vue文件中，添加如下代码：const ipcRenderer = r https://blog.csdn.net/qq_42540900/article/details/119537964")

**最大化、最小化、关闭是由 主进程（Main） 所控制如果你要自定义肯定是写在了.vue文件中，也就是说，你自定义的是写在了 渲染进程（Renderer） 中。**

1.首先关闭原有的最大化、最小化、关闭按钮；

```text 
在 main.js 文件中，初始化BrowserWindow 时，添加属性 frame:false

```


1. 在需要实现最大最小化的vue文件中，添加如下代码：

```typescript 
import { ipcRenderer } from "electron"; // script标签内，引入ipcRenderer
//  methods 中 写下边三个方法，并且绑定到你自己的document 上。
minimizeWin(){
    ipcRenderer.send('window-min') // 通知主进程我要进行窗口最小化操作
},
maximizeWin(){
    ipcRenderer.send('window-max') // 通知主进程我要进行最大化 或 还原
},
closeWin(){
    ipcRenderer.send('window-close') // 通知主进程我要关闭
}


```


1. 在主进程中，添加以下代码，即可实现自定义的最大化、最笑话、关闭：

```javascript 
// import { ipcMain } from 'electron'
// 写在createWindow() 函数中。
// win 是 new BrowserWindow() 对象
// 1. 窗口 最小化
  ipcMain.on('window-min',function(){ // 收到渲染进程的窗口最小化操作的通知，并调用窗口最小化函数，执行该操作
    win.minimize();
  })
  // 2. 窗口 最大化、恢复
  ipcMain.on('window-max',function () {
    if(win.isMaximized()){ // 为true表示窗口已最大化
      win.restore();// 将窗口恢复为之前的状态.
    }else{
      win.maximize();
    }
  })

  // 3. 关闭窗口
  ipcMain.on('window-close',function (){
    win.close();
  })

```


1. 用户其他动作触发最大化（如双击导航栏或拖拽至顶部释放），如何监听并修改图标

```javascript 
// 监听主窗口最大化， 给你的BrowserWindow() 对象添加监听事件
  win.on('maximize', () => {
    win.webContents.send('mainWin-max', true)
  })
  win.on('unmaximize', () => {
    win.webContents.send('mainWin-max', false)
  })


```


```react jsx 
// 在你写最大化的图片的组件或者vue文件中，给渲染进程ipcRenderer添加监听事件 最好写在mounted()中
 ipcRenderer.on('mainWin-max', (_, status) => {
   this.isMax = status
 })
// isMax true代表最大化，更新页面上的图标
<div @click="maximizeWin" v-show="!isMax">
  <img src="../../../static/images/header/win_max.png" alt="">
</div>
<div class="max" @click="maximizeWin" v-show="isMax">
  <img src="../../../static/images/header/win_max_active.png" alt="">
</div>

```


1. Mac 端 也需要自己去 写 css 和 html 样式哈，可以在任意位置通过 process.platform == ‘darwin’ ?Mac : window|linux 来判断

> 注：ipcMain 从 electron 中引入，win 是新的 BrowserWindow 对象。

> 再注：设置frame:false 后，无法拖拽移动窗口，你可以在需要拖拽移动的 组件 或者 document 上 添加样式 -webkit-app-region: drag;

> **其次：-webkit-app-region: drag; 之后无法获取 hover或其他鼠标事件，你可以在自己需要的地方改为，no-drag；**
