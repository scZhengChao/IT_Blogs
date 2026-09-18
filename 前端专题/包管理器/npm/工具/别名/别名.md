# 别名

## 目录

- [npm 使用别名同时安装两个版本](#npm-使用别名同时安装两个版本)

# npm 使用别名同时安装两个版本

```javascript 
npm install echarts2@npm:echarts@^2.2.7
npm install echarts4@npm:echarts@^4.7.0
```


分别起名叫echarts2和echarts4，后面跟上版本号，安装后就会node\_modules就会多出两个文件夹，一个是echarts2一个是echarts4，都是自己起的名字

然后比如在react里面使用，直接

```javascript 
import {xxx} from 'echarts2'
import {xxx} from 'echarts4'
```


antd-mobile 迁移就是用了别名

[   https://mobile.ant.design/zh/guide/migration](https://mobile.ant.design/zh/guide/migration "   https://mobile.ant.design/zh/guide/migration")
