# webpack 多页面应用自动打包配置

## 目录

- [手写一个约定大于配置的 Node.js 框架](#手写一个约定大于配置的-Nodejs-框架)

在一个 webpack 项目中，假如我们有多个入口，每个入口都有一个 `index.html` 模板和 `index.js` 文件，而且这个入口是动态变化的，不希望每增加一个入口就改 `webpack.config.js` 配置文件，应该怎么办呢？

此时可以约定在 src 下面创建的文件夹，只要里面有 `index.js`，我们就把它当做一个入口文件进行打包：

```javascript 
src
├── detail
│   ├── index.html
│   └── index.js
├── home
│   ├── index.html
│   └── index.js
├── login
│   ├── index.html
│   └── index.js
├── shop
│   ├── index.html
│   └── index.js

```


用 glob 很快就能写出下面的自动打包代码：

```javascript 
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const glob = require('glob')

// 动态生成 entry 和 html-webpack-plugin
function getMpa() {
  const entry = {}, htmlPlugins = []
  const files = glob.sync('src/*/index.js')
  files.forEach((file) => {
    const filename = file.split('/')[1]
    entry[filename] = path.join(__dirname, file)
    htmlPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(__dirname, `src/${filename}/index.html`),
        filename: `${filename}.html`,
        chunks: [filename],
      })
    )
  })
  return { entry, htmlPlugins }
}
const mpa = getMpa()

// 动态的配置文件
module.exports = {
  entry: mpa.entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-[hash:6].js',
  },
  plugins: [...mpa.htmlPlugins],
}

```


这样，无论增加多少个入口，`webpack.config.js` 都不用变。

### 手写一个约定大于配置的 Node.js 框架

[egg.js](https://link.juejin.cn?target=https://eggjs.org/ "egg.js") 是一款优秀的 Node.js 企业级开发框架，就应用了约定大于配置的思想，例如：

- 约定一个中间件是一个放置在 `app/middleware` 目录下的单独文件
- 约定了 `app/router.js` 文件用于统一所有路由规则
- 约定 Service 文件必须放在 `app/service` 目录，可以支持多级目录，访问的时候可以通过目录名级联访问

因为**一个大规模的团队需要遵循一定的约束和约定，开发效率才更高，有了这些约定之后**，我们就可以利用 glob 写出匹配规则，找到用户放到指定目录下的文件并进行动态加载了，一个最基础的 load 函数如下：

```javascript 
function load(folder, options) {
    const extname = options.extname || '.{js,ts}'
    return glob.sync(require('path').join(folder, `./**/*.js`)).forEach((item) => require(item))
}

```
