# 环境变量

## 目录

- [cross-env](#cross-env)

**环境变量 mode  cross-env  DefinePlugin**

[https://www.cnblogs.com/fe-linjin/p/11963765.html](https://www.cnblogs.com/fe-linjin/p/11963765.html "https://www.cnblogs.com/fe-linjin/p/11963765.html")  一篇优秀好文

# cross-env

> 这里又个坑；  cross-env NODE\_ENV=uat   && npm run build. ;不能这么写；不能有&&&#x20;

```typescript 
npm i cross-env   （优点跨平台；兼容）

# 在不同平台上设置环境变量的方式不同，用cross-env统一设置环境变量  
"dev": "cross-env NODE_ENV=development node ./webpack/server.js ",
"build": "cross-env NODE_ENV=production node ./webpack/build.js ",
"build:uat": "cross-env NODE_ENV=uat node ./webpack/build.js ",
"build:sit": "cross-env NODE_ENV=sit node ./webpack/build.js ",


"dev": " set NODE_ENV=development&&nodemon app.js",             window
"dev-linux": " export NODE_ENV=development&&nodemon app.js",               linux

```


- **DefinePlugin和mode**选项定义的NODE\_ENV 作用于webpack入口文件下的业务代码 **，通常为src文件夹下的代码**
- \*\*而 npm脚本里的设置****多用于配置相关****，例如在webpack.config.js里区分环境配置不同插件。\*\***只能在当前脚本中生效，是个runtime**

```typescript 
const webpack = require('webpack');
module.exports  = {
    entry: {
         app: './src/app'
    },
    output: {
        path: 'dist',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) // 这里需要注意的是，值对应的格式必须是" "XXXX" "这种格式，所以会用 JSON.stringify 进行转换。
        })
    ]
};

webpack4版本之后可以通过mode选项实现
module.exports = {
    // 定义环境变量
    mode: 'development',
    // JavaScript 执行入口文件
    entry: './main.js',
    output: {
        // 把所有依赖的模块合并输出到一个 bundle.js 文件
        filename: 'bundle.js',
        // 输出文件都放到 dist 目录下
        path: path.resolve(__dirname, './dist'),
    },
};



```


> 举个栗子：
> 例如webpack.config.js的mode我们设置为production，而脚本中执行NODE\_ENV=development，那么在模块当中NODE\_ENV的值为production，而配置文件webpack.config.js中的NODE\_ENV的值为development

> 再举个栗子：
> 如果没有在npm script脚本中
> 设置NODE\_ENV，但在webpack.config.js中设置了mode，那么我们在webpack.config.js中console出process.env.NODE\_ENV的值就是undefined，因此如下代码可能就达不到我们想要的效果
