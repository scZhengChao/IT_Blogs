# 跨平台调用

**一、**

**node-gyp**

**1.背景介绍：**

**node-gyp是干啥用的\~**

node-gyp，是由于node程序中需要**调用一些其他语言编写的 工具 甚至是dll，需要先编译一下，否则就会有跨平台的问题**，

例如在windows上运行的软件copy到mac上就不能用了，但是如果源码支持，编译一下，在mac上还是可以用的。

node-gyp在较新的Node版本中都是自带的（平台相关），用来编译原生C++模块。

**2.安装**

     以管理员**控制台输入：**

```javascript 
npm install  --global --production windows-build-tools
```


（此命令为一键安装）为啥要一键安装呢，安装的是啥呢？

解释：　

1、[python](https://www.python.org/downloads/ "python")(v2.7，3.x不支持);

2、[visual C++ Build Tools](http://landinghub.visualstudio.com/visual-cpp-build-tools "visual C++ Build Tools"),或者 （[vs2015](https://www.visualstudio.com/vs/community/ "vs2015")以上（包含15))

3、.net framework 4.5.1就是安装的这三个东西，安装时间有点长，别着急，慢慢等\~

参考文档：【[https://blog.csdn.net/liyangyang08/article/details/78835847](https://blog.csdn.net/liyangyang08/article/details/78835847 "https://blog.csdn.net/liyangyang08/article/details/78835847")】

**然后在控制台输入：**

```javascript 
npm install -g node-gyp
```


【只需两部就安装好了】

**3.注意点**

    在node-gyp安装前，**一定是有node.js的，而且一定是32位的**，如果你电脑是windows64位的，并且安装了64位的node.js,切换成32位的

**4、安装完成后查看**

**：** 控制台输入：node-gyp list

**5.添加环境变量或者设置npm 这里需要重启一下电脑；按照提示操作；**

    npm config set python "C:\Users\15082\\.windows-build-tools\python27\python.exe"
