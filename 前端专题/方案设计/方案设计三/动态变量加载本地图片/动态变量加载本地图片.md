# 动态变量加载本地图片

## 目录

- [1. React加载本地图片的方法](#1-React加载本地图片的方法)
  - [1.1 方法一](#11-方法一)
  - [1.2 方法二](#12-方法二)
- [2. 关于使用require无法加载图片的解决方案](#2-关于使用require无法加载图片的解决方案)
  - [2.1 案例一](#21-案例一)
  - [2.2 案例二](#22-案例二)
- [3.require.context](#3requirecontext)
- [4.umi](#4umi)

[ ES6 React 组件引用本地图片问题\_create-react-app 加了config-overrides.js文件后,本地图片无法加载-CSDN博客 文章浏览阅读3.1w次，点赞9次，收藏19次。最近在用create-react-app 脚手架自己写一个小项目，遇到了很多坑，其中有一个就是React 引用本地图片的问题，我的需求是，图片的路径写在json文件里，需要从后台读取json文件，然后读取到图片的路径，在前端渲染。那么问题来了，es6不支持在标签内直接写图片的路径，即：这种格式是不支持的。在网上看了很多博客，总结下以下几个加载的方法，当 https://blog.csdn.net/zhengjie0722/article/details/78862938](https://blog.csdn.net/zhengjie0722/article/details/78862938 " ES6 React 组件引用本地图片问题_create-react-app 加了config-overrides.js文件后,本地图片无法加载-CSDN博客 文章浏览阅读3.1w次，点赞9次，收藏19次。最近在用create-react-app 脚手架自己写一个小项目，遇到了很多坑，其中有一个就是React 引用本地图片的问题，我的需求是，图片的路径写在json文件里，需要从后台读取json文件，然后读取到图片的路径，在前端渲染。那么问题来了，es6不支持在标签内直接写图片的路径，即：这种格式是不支持的。在网上看了很多博客，总结下以下几个加载的方法，当 https://blog.csdn.net/zhengjie0722/article/details/78862938")

## 1. [React](https://so.csdn.net/so/search?q=React\&spm=1001.2101.3001.7020 "React")加载本地图片的方法

### 1.1 方法一

第一种方法相信大多数人用的比较多，而且出现无法加载图片的错误比较少。

```javascript 
import user from '../img/user.png'
<img src={user} alt="" />

```


### 1.2 方法二

第二种方法也是比较常用，当时使用require这个方法读取本地图片出现错误的概率很大，下面先给一个正常情况下能读取图片的方法，如下所示：

```javascript 
<img src={require('../img/icon1.png')} alt="" />

```


补充一句：***require中只能写字符串，不能写变量***。

## 2. 关于使用require无法加载图片的解决方案

### 2.1 案例一

我们使用方法二读取图片，运行时却无法加载出来图片，对于这种问题我网上找了二种方案，第一种如下所示：

```javascript 
但是如果使用"file-loader": "^4.2.0"或者"file-loader": "^2.0.0"却可以正常打包后来发现file-loader在新版本中esModule默认为true，因此手动设置为false

  {
  test: /.(png|jpg|gif|jpeg)$/,
  use: [{
  loader: 'url-loader',
  // loader: 'file-loader',
  options: {
   esModule: false, // 这里设置为false 
  name: '[name].[ext]',
  limit: 10240 
  } 
  }]
 }
```


方案二（推荐使用）

```javascript 
require('~/images/2.png').default 就好了

ps:但是如果使用react脚手架的配置是不需要用.default的，而是直接require(url)的

```


### 2.2 案例二

json

```javascript 
将json里面img字段修改下:
"img": "logo.jpg"

```


最后相当于字符串的拼接：@/assets/images/logo.jpg

```javascript 
require('@/assets/images/logo.jpg')

```


这样不就达到了我们的目的了？
如果这样写不能读取出来那就按照下面这样写：

```javascript 
<img src={require('@/assets/images/'+ item.img).default} />

```


# 3.require.context

1、全部加载图片路径

```javascript 
const requireContext = require.context("./../img/project",true, /^\.\/.*\.png$/);
const projectImgs = requireContext.keys().map(requireContext);
```


2、渲染

```javascript 
    createContent(){
        var _this = this;
        for (var i = 0;i<this.dataSource.length;i++){
            var columns = [];
            var imgURL;
            for (var j = 0; j < projectImgs.length;j++){
                if(projectImgs[j].indexOf(_this.dataSource[i].img) > 0){
                    imgURL = projectImgs[j];
                }
            }
            columns.push(<div className="projectImg"><img src={imgURL} alt=""/></div>);
            columns.push(<a href={_this.dataSource[i].url}>{_this.dataSource[i].name}</a>);
            result.push(<div className="projectContent">{columns}</div>);
 
        }
        return result;
    };
```


# 4.umi

在umi中；自动帮你处理了svg

```javascript 
import SmileUrl, { ReactComponent as SvgSmile } from './smile.svg';

```


或者

```javascript 
export { ReactComponent as SvgSmile } from './smile.svg';

```


动态使用

```javascript 
import * as Icons from './icons

const Component  = Icons[name] as React.FunctionComponent
Component?<Component/>:undefined

```
