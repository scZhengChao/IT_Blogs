# **window 安装node-sass**

## 目录

- [第一种：](#第一种)
- [第二种：](#第二种)
- [第三种： ](#第三种)

# 第一种：

    1.先检查项目的node\_modules文件夹是否存在node-sass文件夹，存在，删掉，不存在，执行第二步；

    2.打开cmd，在项目根目录下输入以下代码

   ` npm install node-sass --sass-binary-site=`[http://npm.taobao.org/mirrors/node-sass](http://npm.taobao.org/mirrors/node-sass "http://npm.taobao.org/mirrors/node-sass")

# 第二种：

    1.进入项目的node\_modules目录下；

    2.使用git克隆node-sass源码：Git路径为：git clone

[https://github.com/sass/node-sass.git](https://github.com/sass/node-sass.git "https://github.com/sass/node-sass.git")

    3.使用编辑器，进入node\_modules/node-sass/package.json文件中；

    4.使用编辑器，将package.json文件中nodeSassConfig>binarySite的值修改为淘宝镜像地址；

    5.在cmd进入node-sass文件夹中，执行以下命令：npm install

# 第三种： 

在实际开发过程中 有第三种情况：

`npm rebuild node-sass    `

重新适配 window下node 环境；

\*\* 注意看报错信息这个很重要；把node.binding 放在他的指定位置\*\*​

![  ](9272ed9a24f70a0e1990646247bf68f4_HPK7brdFta.png "  ")
