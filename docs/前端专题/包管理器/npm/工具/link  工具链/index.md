# link  工具链

## 目录

- [link](#link)
- [前言](#前言)
- [建立链接](#建立链接)
- [解除链接](#解除链接)
- [unlink失效](#unlink失效)
- [总结](#总结)

# link

- npm link**用来在本地项目和本地npm模块之间建立连接**，可以在本地进行模块测试
- 使用npm link能够避免重复且繁琐的打包发布操作，给开发调试带来便捷，而且使用方法简单。
- 把当前包的bin 加载到全局； 方便调试 类似npm i -g  安装到全局

# **前言**

在项目的前期开发工作中，通常都会将一些可复用的代码抽离成公共组件，方便管理和维护。或者是将一些非业务性的、而且公用率很高的发布成npm包，作为项目的依赖去安装使用。但是在开发调试中需要频繁的打包发布，然后项目中再安装依赖，这种重复的操作非常的繁琐和不便，为了解决这一系列重复的操作，可以使用npm-link指令将模块链接到项目中。

# **建立链接**

假设项目名称为project1，和一个公用组件模块common,现需要在项目中使用common，且common是作为npm打包成项目依赖。

1. 首先第一步，使用npm link将common模块创建成本地依赖包。在common目录下输入命令：npm link
2. 然后进入到project1项目目录里，和本地common模块建立链接。命令中‘common’是common模块中package.json的name属性值，而不是目录名称。

npm link common

现在在project1中的node\_models里就会添加一个common模块的软连接。就说明项目链接模块成功了。 &#x20;
之后修改common里的内容就会实时更新，而不用打包发布再安装依赖。

# **解除链接**

1. 解除项目的依赖直接在项目目录里输入命令：npm unlink common

这样项目里就解除了common模块的软连接，然后可以在输入npm install common安装你发布更新好的common模块包。

1. 要解除本地common包，在common目录中输入命令：npm unlink common

这样本地的common包模块就解除了，其他项目的软连接也失效了。

# unlink失效

进入你的全局包安装目录。

这个如果不知道在哪里，可以随便查一个你全局安装过的包，比如 yarn：

> where yarn

它会在一个 bin 目录下。

比如我的是这样：

![](./image/image_uwySyIDOZJ.png)

这时候，进入这个 bin 目录。

```bash 
cd /usr/local/bin
cd ../
cd lib
cd node_modules
ls

你就会看到你全局安装的所有的 npm 包。然后
rm -rf [package-name]

```


# 总结

具体用法：

1\. 项目和模块在同一个目录下，可以使用相对路径

    npm link ../module

2\. 项目和模块不在同一个目录下

&#x20;   cd到模块目录，npm link，进行全局link。（注意；这个时候的全局命令是package.json里面bin里面的key）

    cd到项目目录，npm link 模块名(package.json中的name)

3\. 解除link

    解除项目和模块link，项目目录下，npm unlink 模块名

&#x20;   解除模块全局 link，模块目录下，npm unlink 模块名
