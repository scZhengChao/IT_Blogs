# 打包

上面我们启动`electron`的应用都是使用的`node_modules`中的`electron`包，我们想要得到一个真正可以安装的安装包，还需要使用第三方打包工具进行打包，上面有提到过，我们将使用`electron-builder`打包成可安装的安装包。上面我们已经安装了`electron-builder`，下面我们需要在`package.json中配置build属性来自定义安装配置`。（`限于自身设备问题，这里只介绍在Windows系统的打包配置，electron可以打包成各种安装包，使其可以在mac，Linux系统上运行，其他系统的配置可自行查阅资料。`）下面我们介绍一下配置内容和各个配置含义。
`package.json完整配置`

```javascript 
{
  "name": "desktop",
  "productName": "Harbour",
  "version": "1.0.0",
  "description": "",
  "main": "main/index.js",
  "scripts": {
    "dev-electron": "cross-env NODE_ENV=development electron main/index.js",
    "prod-electron": "cross-env NODE_ENV=production electron main/index.js",
    "build-electron-win64": "electron-builder -w --x64"
  },
  "build": {
    "productName": "Harbour",
    "appId": "harbour.electron.app",
    "files": [
      "build/**/*",
      "main/**/*"
    ],
    "directories": {
      "output": "dist"
    },
    "nsis": {
      "oneClick": false,
      "allowElevation": true,
      "allowToChangeInstallationDirectory": true,
      "installerIcon": "./main/assets/logo.ico",
      "uninstallerIcon": "./main/assets/logo.ico",
      "installerHeaderIcon": "./main/assets/logo.png",
      "createDesktopShortcut": true,
      "createStartMenuShortcut": true,
      "shortcutName": "Harbour"
    },
    "win": {
      "icon": "./main/assets/logo.ico",
      "artifactName": "${productName}-${version}-${os}-${arch}.${ext}",
      "target": "nsis"
    },
    "electronDist": "./electron"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "cross-env": "^7.0.3",
    "electron": "^26.1.0",
    "electron-builder": "^24.6.3"
  }
}

```


`配置解释`

1. `productName`：指定了您的应用程序的产品名称，通常用于构建过程中生成的安装程序文件名等地方。
2. `appId`：指定了您的应用程序的唯一标识符，这个值在打包和部署时会用到。
3. `files`：指定打包时所需打包的文件
4. `directories.output`：指定了输出目录的路径，即构建后的文件将会保存在 dist 目录中。
5. `nsis`：指定了 NSIS（Nullsoft Scriptable Install System）打包的相关配置。
   1. `oneClick`：指定是否启用一键安装模式。
   2. `allowElevation`：是否允许提升权限进行安装。
   3. `allowToChangeInstallationDirectory`：是否允许用户更改安装目录。
   4. `installerIcon`：安装程序的图标文件路径。
   5. `uninstallerIcon`：卸载程序的图标文件路径。
   6. `installerHeaderIcon`：安装程序的头部图标文件路径。
   7. `createDesktopShortcut`：是否在桌面上创建快捷方式。
   8. `createStartMenuShortcut`：是否在开始菜单中创建快捷方式。
   9. `shortcutName`：创建的快捷方式的名称。
6. `win`：指定了 Windows 平台的配置。
   1. `icon`：指定应用程序的图标文件路径。
   2. `artifactName`：定义生成的构建文件的命名规则模板。
   3. `target`：指定构建的目标平台，这里是 NSIS。
7. `electronDist`：指定了预先下载的 Electron 包的路径

`特别注意
`这里有几个需要特别注意的点：

1. 首先我们用的`logo.ico`文件尺寸大小至少是`256*256`的
2. 由于打包时需要使用`electron的相关包文件，为了提高打包速度，我们一般会提前下载与我们node_modules相同版本的.zip包，然后打包时使用electronDist指定打包用的文件目录，可以缩减打包时间`
3. 自定义`artifactName`，该名称就是打包后我们可安装的`.exe`可执行文件的名称
4. `electron-builder打包原理`实际上是将`package.json`同目录的所有文件进行整体打包输出，如下图所示，在`package.json`同级目录下有一些文件夹我们是不需要进行打包的，其中`dist下是我们上次打包输出的内容，electron是我们预下载的打包所需的.zip包，node_modules下面是我们开发时所用的依赖包，这些都不需要打包进去。`因此我们需要指定我们打包时所需要打包的文件夹，此时就需要用到`package.json里面build配置中的files属性，如上配置，我们只需要将build目录下的文件和main下面的文件打包即可。`
5. `这里的build目录下是渲染层的代码，main下面都是我们主进程的代码`
