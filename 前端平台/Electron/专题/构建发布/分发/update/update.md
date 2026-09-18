# update

## 目录

- [准备：](#准备)
- [electron-updater API介绍](#electron-updater-API介绍)
  - [autoUpdater.setFeedURL](#autoUpdatersetFeedURL)
  - [autoUpdater.autoInstallOnAppQuit](#autoUpdaterautoInstallOnAppQuit)
  - [autoUpdater.autoDownload](#autoUpdaterautoDownload)
  - [autoUpdater.checkForUpdates](#autoUpdatercheckForUpdates)
  - [autoUpdater.downloadUpdate](#autoUpdaterdownloadUpdate)
  - [autoUpdater.updateCancelled](#autoUpdaterupdateCancelled)
  - [autoUpdater.quitAndInstall](#autoUpdaterquitAndInstall)
- [流程](#流程)
  - [第一步：](#第一步)
  - [第二步](#第二步)
  - [第三步](#第三步)
  - [第四步](#第四步)
- [坑](#坑)

**文档地址**[： https://www.electron.build/auto-update](https://www.electron.build/auto-update "： https://www.electron.build/auto-update")

# **准备**：

需要准备一个静态服务，放置新版本的软件包；（推荐使用http-server插件或者anywhere；）

# **electron-updater API介绍**

```typescript 
//主要用到electron-updater中的autoUpdater模块做更新程序
//引入方式：
import { autoUpdater } from 'electron-updater';

```


#### **autoUpdater.setFeedURL**

```typescript 
     设置软件包更新地址 
    autoUpdater.setFeedURL({
      provider: 'generic',
      url: http://192.xxx.xxx.xx
    });
```


#### **autoUpdater.autoInstallOnAppQuit**

```typescript 
    设置 退出时是否自动安装  默认为true
     autoUpdater.autoInstallOnAppQuit = false;
```


#### **autoUpdater.autoDownload**

```typescript 
    是否自动下载安装包
     autoUpdater.autoDownload = false;
```


#### **autoUpdater.checkForUpdates**

```typescript 
    检查是否有新的安装包
    autoUpdater.checkForUpdates();
```


#### **autoUpdater.downloadUpdate**

```typescript 
    手动触发下载安装包
     autoUpdater.downloadUpdate().then(() => {
        // do some
    }).catch(e => 
        // do some
    )
```


#### autoUpdater.updateCancelled

```typescript 
     取消下载 
    autoUpdater.updateCancelled()
```


#### **autoUpdater.quitAndInstall**

```typescript 
    手动触发 退出程序并安装
     autoUpdater.quitAndInstall()
```


# 流程

[ electron-updater实现更新electron应用程序  https://www.shuzhiduo.com/A/n2d9q1Y4dD/](https://www.shuzhiduo.com/A/n2d9q1Y4dD/ " electron-updater实现更新electron应用程序  https://www.shuzhiduo.com/A/n2d9q1Y4dD/")

### 第一步：

1. 安装`"electron-updater": "^4.3.5",`
2. 打开`package.json`文件在`build`对象下添加`publish`配置，

```typescript 
"build": {
  "productName": "xxx",
  "appId": "org.simulatedgreg.electron-vue",
  "directories": {
    "output": "build"
  },
  ---------------------------------------------
  "publish": [
    {
      "provider": "generic",
      "url": "https://xxx.com"
     //注：这个url就是放.yml文件和安装包的服务器地址,我这里用的是阿里云oss地址
    }
  ],
  --------------------------------------------------
  "files": [
    "dist/electron/**/*"
  ]

```


## 第二步

1. 在main文件夹下面创建更新文件`update.js`

```typescript 
import { autoUpdater } from 'electron-updater'
import { ipcMain } from 'electron'
let mainWindow = null;
export function updateHandle(window, feedUrl) {
  mainWindow = window;
  let message = {
      error: '检查更新出错',
      checking: '正在检查更新',
      updateAva: '检测到新版本，正在下载',
      updateNotAva: '您已经更新到最新版本了',
  };
  //设置更新包的地址
  autoUpdater.setFeedURL(feedUrl);
  //监听升级失败事件
  autoUpdater.on('error', function (error) {
      sendUpdateMessage({
          cmd: 'error',
          message: error
      })
  });
  //监听开始检测更新事件
  autoUpdater.on('checking-for-update', function (message) {
      sendUpdateMessage({
          cmd: 'checking-for-update',
          message: message
      })
  });
  //监听发现可用更新事件
  autoUpdater.on('update-available', function (message) {
      sendUpdateMessage({
          cmd: 'update-available',
          message: message
      })
  });
  //监听没有可用更新事件
  autoUpdater.on('update-not-available', function (message) {
      sendUpdateMessage({
          cmd: 'update-not-available',
          message: message
      })
  });
  // 更新下载进度事件
  autoUpdater.on('download-progress', function (progressObj) {
      sendUpdateMessage({
          cmd: 'download-progress',
          message: progressObj
      })
  });
  //监听下载完成事件
  autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl) {
      sendUpdateMessage({
          cmd: 'update-downloaded',
          message: {
              releaseNotes,
              releaseName,
              releaseDate,
              updateUrl
          }
      })
      //退出并安装更新包
      autoUpdater.quitAndInstall();
  });
  //接收渲染进程消息，开始检查更新
  ipcMain.on("checkForUpdate", (e, arg) => {
      //执行自动更新检查
      // sendUpdateMessage({cmd:'checkForUpdate',message:arg})
      autoUpdater.checkForUpdates();
  })
}
//给渲染进程发送消息
function sendUpdateMessage(text) {
  mainWindow.webContents.send('message', text)
}

```


1. 在main文件夹下面的`index.js`中引入`update.js`

```typescript 
import { updateHandle } from './update'
mainWindow.on('closed', () => {
    mainWindow = null
  })
----------------------------------------------------
  let feedUrl = "https://xxxxx.com";
  updateHandle(mainWindow,feedUrl);
-----------------------------------------------------
}

```


## 第三步

1. 在`APP.js`文件中检测更新

```typescript 
  <template>
  <div id="app">
    <router-view></router-view>
    <el-dialog
      title="正在更新新版本,请稍候..."
      :visible.sync="dialogVisible"
      width="60%"
      :close-on-click-modal="closeOnClickModal"
      :close-on-press-escape="closeOnPressEscape"
      :show-close="showClose"
      center
    >
      <div style="width:100%;height:15vh;line-height:15vh;text-align:center">
        <el-progress
          status="success"
          :text-inside="true"
          :stroke-width="20"
          :percentage="percentage"
          :width="strokeWidth"
          :show-text="true"
        ></el-progress>
      </div>
    </el-dialog>
  </div>
</template>
<script>
let ipcRenderer = require("electron").ipcRenderer;
let _this = this;
//接收主进程版本更新消息
ipcRenderer.on("message", (event, arg) => {
  // for (var i = 0; i < arg.length; i++) {
  console.log(arg);
  if ("update-available" == arg.cmd) {
    //显示升级对话框
    _this.dialogVisible = true;
  } else if ("download-progress" == arg.cmd) {
    //更新升级进度
    /**
     *
     * message{bytesPerSecond: 47673
      delta: 48960
      percent: 0.11438799862426002
      total: 42801693
      transferred: 48960
      }
     */
    console.log(arg.message.percent);
    let percent = Math.round(parseFloat(arg.message.percent));
    _this.percentage = percent;
  } else if ("error" == arg.cmd) {
    _this.dialogVisible = false;
    _this.$message("更新失败");
  }
  // }
});
 ipcRenderer.send("checkForUpdate");
//20秒后开始检测新版本
// let timeOut = window.setTimeout(() => {
//   ipcRenderer.send("checkForUpdate");
// }, 20000);
clearTimeout;
//间隔1小时检测一次
// let interval = window.setInterval(() => {
//   ipcRenderer.send("checkForUpdate");
// }, 3600000);
export default {
  name: 'App',
  data() {
    return {
      dialogVisible: false,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      showClose: false,
      percentage: 0,
      strokeWidth:200
    };
  },
  mounted() {
    _this = this;
  },
  destroyed() {
    window.clearInterval(interval);
    window.clearInterval(timeOut);
  }
}
</script>

```


## 第四步

将项目打包`yarn build`,将打包后生成的`build`目录下的`latest.yml`和安装包`.exe`文件传入服务器即可

# 坑

```typescript 
Error: Could not locate update bundle for com.github.Electron within file:///Users/zhengchao/Library/Caches/com.github.Electron.ShipIt/update.hYbKZqF/
```
