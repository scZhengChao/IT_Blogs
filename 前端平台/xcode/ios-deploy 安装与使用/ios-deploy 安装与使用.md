# ios-deploy 安装与使用

## 目录

- [1. 安装ios-deploy](#1-安装ios-deploy)
- [2. ios-deploy常用命令](#2-ios-deploy常用命令)
- [3. ios-deploy的帮助项（Option）：](#3-ios-deploy的帮助项Option)

ios-deploy也是一个终端安装和调试iPhone应用的是第三方开源库，使用时需要开发者证书和Xcode7以上版本。

> 类比adb

#### 1. 安装ios-deploy

我们用`npm`来安装`ios-deploy`，如果Mac上没有，先安装`node`：

```bash 
brew install node

```


安装`node`干甚？因为现在版本比较新的`node`都自带`npm`哇。
接下来愉快地安装`ios-deploy`：

```bash 
npm install -g ios-deploy

```


#### 2. ios-deploy常用命令

2.1 查看连接的设备（包括通过usb和wifi连接的）

```bash 
ios-deploy -c

```


2.2 查看通过usb连接的设备

```bash 
ios-deploy -c --no-wifi

```


2.3 安装应用到指定设备（其中xxx.app是Xcode编译后的ipa的路径）

```bash 
ios-deploy --id [udid] --bundle [xxx.app]

```


2.4 卸载指定设备上的应用（根据包名，也就是bundleId）

```bash 
ios-deploy --id [udid] --uninstall_only --bundle_id [bundleId]

```


2.5 查看指定设备上安装的所有应用（包括系统应用和第三方）

```bash 
ios-deploy --id [udid] --list_bundle_id

```


2.6 检查指定设备上是否安装了某个应用

```bash 
ios-deploy --id [udid] --exists --bundle_id

```


#### 3. ios-deploy的帮助项（Option）：

```bash 
  -d, --debug                  launch the app in lldb after installation
  -i, --id <device_id>         the id of the device to connect to
  -c, --detect                 only detect if the device is connected
  -b, --bundle <bundle.app>    the path to the app bundle to be installed
  -a, --args <args>            command line arguments to pass to the app when launching it
  -t, --timeout <timeout>      number of seconds to wait for a device to be connected
  -u, --unbuffered             don't buffer stdout
  -n, --nostart                do not start the app when debugging
  -I, --noninteractive         start in non interactive mode (quit when app crashes or exits)
  -L, --justlaunch             just launch the app and exit lldb
  -v, --verbose                enable verbose output
  -m, --noinstall              directly start debugging without app install (-d not required)
  -p, --port <number>          port used for device, default: dynamic
  -r, --uninstall              uninstall the app before install (do not use with -m; app cache and data are cleared) 
  -9, --uninstall_only         uninstall the app ONLY. Use only with -1 <bundle_id> 
  -1, --bundle_id <bundle id>  specify bundle id for list and upload
  -l, --list                   list files
  -o, --upload <file>          upload file
  -w, --download               download app tree
  -2, --to <target pathname>   use together with up/download file/tree. specify target
  -D, --mkdir <dir>            make directory on device
  -R, --rm <path>              remove file or directory on device (directories must be empty)
  -V, --version                print the executable version 
  -e, --exists                 check if the app with given bundle_id is installed or not 
  -B, --list_bundle_id         list bundle_id 
  -W, --no-wifi                ignore wifi devices
  --detect_deadlocks <sec>     start printing backtraces for all threads periodically after specific amount of seconds
```
