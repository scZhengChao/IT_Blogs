# build

## 目录

- [python](#python)
  - [背景](#背景)
  - [解决方法](#解决方法)
    - [#Python 依赖处理](#Python-依赖处理)
    - [electron-builder依赖处理](#electron-builder依赖处理)
    - [npm-patch](#npm-patch)
      - [打补丁](#打补丁)
      - [补丁生效](#补丁生效)
      - [完成打包
        ](#完成打包)
  - [注：](#注)
    - [修改环境变量](#修改环境变量)

# python

高版本那边Mac系统没有python2环境，新安装的python2却不在/usr/bin/python下，而Mac的安全机制又不允许在这个路径下创建软连接。

所以，可以通过修改dmg-builder/out/dmg.js中的python路径解决。

### 背景

mac 升级了系统之后，之前的 electron 项目打包出现了异常，无法生成安装包：

```typescript 
⨯ Exit code: ENOENT. spawn /usr/bin/python ENOENT  failedTask=build stackTrace=Error: 
Exit code: ENOENT. spawn /usr/bin/python ENOENT

```


## 解决方法

### [#](http://tiaocaoer.com/blog/electron_build_error.html#python-依赖处理 "#")Python 依赖处理

首先打包是底层调用`python`来实现的所以先保证 python 是否正确安装。执行`python -V`之后找不到命令，所以要重新安装一下。下载地址：[https://www.python.org/ftp/python/2.7.18/python-2.7.18-macosx10.9.pkg](https://www.python.org/ftp/python/2.7.18/python-2.7.18-macosx10.9.pkg "https://www.python.org/ftp/python/2.7.18/python-2.7.18-macosx10.9.pkg")。（**用 brew install pyenv 管理python 版本**）

安装好之后使用`which python`查看安装位置:

```typescript 
ibrary/Frameworks/Python.framework/Versions/2.7/bin/python
```


但是装了之后仍然没有效果，原因是 Mac OS 在新系统中移除了 python2，旧系统中默认安装 python2，所以/usr/bin/python 默认可以调用 python2，而新系统中**没有这个链接转而内置了/usr/bin/python3**，打包过程中也是需要调用 `/usr/bin/python`，所以我们需要手动建立链接：

```typescript 
sudo ln -s /Library/Frameworks/Python.framework/Versions/2.7/bin/python /usr/bin/python
```


但是/usr/bin/这个**目录做了系统级的保护，需要关闭 SIP 系统保护**，太麻烦了(当然关闭系统保护之后添加链接也是可以的)。所以转而修改调用`/usr/bin/python`的地方。

### `electron-builder`依赖处理

打包使用的库是`electron-builder`，但是升级 builder 可能会引起一系列兼容问题，所以选择了不升级，修改本地 npm 依赖代码的方式修复。

这里使用的依赖版本是 22.14.13，找到报错的文件：

```typescript 
node_modules/electron-builder/node_modules/dmg-builder/out/dmg.js
```


大概 261 行的位置，将`/usr/bin/python`修改为`/Library/Frameworks/Python.framework/Versions/2.7/bin/python`：

```typescript 
   await builder_util_1.exec(process.env.PYTHON_PATH || "/Library/Frameworks/Python.framework/Versions/2.7/bin/python", [path.join(dmgUtil_1.getDmgVendorPath(), "dmgbuild/core.py")], {
        cwd: dmgUtil_1.getDmgVendorPath(),
        env,
    });
```


保存之后就可以正常打包了。

### npm-patch

既然升级依赖和修复python这两条路都走不通，那只能给Electron-Builder打补丁了。
首先要找到报错的位置，是在node\_modules/builder-util/src/util.ts:125:16,找到该文件，发现实际的报错并不在这里。直接到electron-builder中找找看，发现package.json中引用了一个包"dmg-builder": "21.2.0"

![](./image/image_G1XiNkKh3o.png)

猜想一下，我们打dmg的包，那这个dmg-builder一定会用到了。去到包里面发现，有两个文件会有用到python的可能

![](./image/image_Al3grQULEZ.png)

搜索发现

![](./image/image_li8t4wnJDo.png)

早期版本的`Electron-Builder`使用的不是系统暴露出来的`python`命令，而是在代码中写死使用`/usr/bin/python`这个命令。。。看到这里，我只能说，坑爹呀！！！，感觉心里有千万只猛兽踏过。。

#### 打补丁

- 安装python2
  由于早期版本的Electron-Builder中使用的是python2，python2和3部分语法和包位置不能通用，所以，这里必须给电脑中安装python2,安装过程这里就不写了。请自行查阅资料。

给项目中安装patch-package依赖

```typescript 
npm install patch-package -D
```


![](./image/image_gf9CsMS6GH.png)

- 修改代码

将下图中的`/usr/bin/python`

![](./image/image_OK4NnmdUTe.png)

修改你自己系统中的`python2`的路径，只要能调用到`python2`就可以，文中使用`python2`的绝对路径

![](./image/image_EXDxtkvzZo.png)

#### 补丁生效

直接这样修改还不行，不能生效，必须执行`patch-package`命令,使用`patch-package + 修改的文件所在的包名`，便可生成补丁。

![](./image/image_pyLEXD3c-M.png)

patch成功后，会在项目根目录下生成patches目录，用来存放补丁文件

![](./image/image_sm9FsYrVOp.png)

patch文件和git提交记录有点像，记录了文件地址和详细的修改明细

![](./image/image_KMAUDLbdHO.png)

#### 完成打包&#xA;

至此，打补丁修复的过程已经完毕，已经可以正常打包。patches下的文件需要提交至git库，别的同事在拉取代码，安装依赖后，通过执行patch-package即可应用patches下的补丁，不用再重复上面的步骤。为方便起见，也可以配置postinstall命令，在执行npm install后可自动运行postinstall。
在package.json中的scripts中加入"postinstall": "patch-package"

![](./image/image_dJlpzGJwcH.png)

## 注：

`npm-patch`方法虽然能够解决一些问题，但很显然不是个长久之法，像文中这种不影响业务代码的可以这样解决，但如果可能，请使用升级依赖的方式解决。如果在主要的业务代码中有需要修改的地方，请尽量提交`issue`, 待作者修复后，需要第一时间升级至新版本。

### 修改环境变量

![](./image/image_3KwnqqL1Fc.png)

![](./image/image_IQgkQcvd5G.png)
