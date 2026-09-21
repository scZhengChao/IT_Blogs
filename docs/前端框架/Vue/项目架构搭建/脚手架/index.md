# 脚手架

## 目录

- [cli4](#cli4)
- [cli3](#cli3)

# cli4

vue -v 查看vue 版本

**1.wx-js-sdk undefined**

```纯文本 
     使用vue+typescript的vue-cli3.0构建项目,想做微信的分享,引入weixin-js-sdk后 
         在页面中import wx from "weixin-js-sdk", 
         结果打印wx的时候显示underfined,而同样的方式在vue-cli2.0中使用,能打印正常的对象 
     换成weixin-jsapi
```


**2.**

**webpack-bundle-analyzer**

```纯文本 
 npm install --save-dev webpack-bundle-analyzer
```


**3.vue.config.js**

```纯文本 
 error: Invalid options in vue.config.js: "plugins" is not allowed 
 
 var webpack=require('webpack') 
 const path = require('path'); 
 function resolve (dir) { 
     return path.join(__dirname, dir) 
 } 
 module.exports = { 
     lintOnSave:process.env.NODE_ENV !== 'production', // 开启eslint 是否 true false error 
     productionSourceMap:process.env.NODE_ENV === 'production' ? false : true, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。 
     css: { 
         requireModuleExtension: true, 
         loaderOptions: { 
             sass: { 
                 // 向全局sass样式传入共享的全局变量 
                 additionalData: `@import "./src/assets/css/base.scss", 
                                 "./src/assets/css/variables.scss` 
             } 
         } 
     }, 
     chainWebpack: config => { 
         //svg 
         config.module.rules.delete("svg") 
         config.module.rule('svg-sprite-loader') 
         .test(/\.svg$/).include.add(resolve('src/assets/icons')) //处理svg目录 
         .end().use('svg-sprite-loader').loader('svg-sprite-loader') 
         .options({ 
             symbolId: 'icon-[name]' 
         }) 
         const fileRule = config.module.rule('file') 
         fileRule.uses.clear() 
         fileRule 
         .test(/\.svg$/) 
         .exclude.add(resolve('/src/assets/icons')) 
         .end() 
         .use('file-loader') 
         .loader('file-loader') 
         // 别名 alias 
         config.resolve.alias 
         .set('@', resolve('src')) 
         .set('assets', resolve('src/assets')) 
         .set('api', resolve('src/api')) 
         .set('views', resolve('src/views')) 
         .set('components', resolve('src/components')) 
         //优化配置 
         config.optimization.splitChunks({ 
             chunks: 'all', 
             cacheGroups: { 
               // cacheGroups 下可以可以配置多个组，每个组根据test设置条件，符合test条件的模块 
               commons: { 
                 name: 'chunk-commons', 
                 test: resolve('src/components'), 
                 minChunks: 2, //  被至少用三次以上打包分离 
                 priority: 5, // 优先级 
                 reuseExistingChunk: true // 表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。 
               }, 
               node_vendors: { 
                 name: 'chunk-libs', 
                 chunks: 'initial', // 只打包初始时依赖的第三方 
                 test: /[\\/]node_modules[\\/]/, 
                 priority: 10 
               }, 
               vantUI: { 
                 name: 'chunk-vantUI', // 单独将 vantUI 拆包 
                 priority: 20, // 数字大权重到，满足多个 cacheGroups 的条件时候分到权重高的 
                 test: /[\\/]node_modules[\\/]_?vant(.*)/ 
               } 
             } 
           }) 
 
     }, 
     // webpack-dev-server 相关配置   
     devServer: { 
         // 调试端口 
         port:'9000', 
         https: false, 
         open：true, 
         overlay: { 
             //  当出现编译器错误或警告时，在浏览器中显示全屏覆盖层 
             warnings: false, 
             errors: true 
          } 
     }, 
     //其他配置.... 
     configureWebpack: { 
         plugins: [ 
             new webpack.ProvidePlugin({ 
                 $: "jquery", 
                 jQuery: "jquery", 
                 "windows.jQuery": "jquery" 
             }) 
         ], 
         externals: { 
             'vue': 'Vue', 
             "vue-router": "VueRouter", 
             'vuex': "Vuex", 
             'axios': 'axios' 
         } 
     } 
 }
```


[vue-vant-sass-iphone.7z](https://github.com/scZhengChao/IT_Blogs/releases/download/assets-v1/vue-vant-sass-iphone_w_4a1O-CCk.7z "vue-vant-sass-iphone.7z")

# cli3

官网： 其中的环境和模式 好好看看

[https://cli.vuejs.org/zh/guide/creating-a-project.html#%E4%BD%BF%E7%94%A8%E5%9B%BE%E5%BD%A2%E5%8C%96%E7%95%8C%E9%9D%A2](https://cli.vuejs.org/zh/guide/creating-a-project.html#%E4%BD%BF%E7%94%A8%E5%9B%BE%E5%BD%A2%E5%8C%96%E7%95%8C%E9%9D%A2 "https://cli.vuejs.org/zh/guide/creating-a-project.html#%E4%BD%BF%E7%94%A8%E5%9B%BE%E5%BD%A2%E5%8C%96%E7%95%8C%E9%9D%A2")

```纯文本 
 快速开发原型： 
 你可以使用 vue serve 和 vue build 命令对单个 *.vue 文件进行快速原型开发，不过这需要先额外安装一个全局的扩展： 
 npm install -g @vue/cli-service-global 
 vue serve 的缺点就是它需要安装全局依赖，这使得它在不同机器上的一致性不能得到保证。因此这只适用于快速原型开发 
 
 vue serve 
 Usage: serve [options] [entry] 
 
 在开发环境模式下零配置为 .js 或 .vue 文件启动一个服务器 
 Options: 
   -o, --open  打开浏览器 
   -c, --copy  将本地 URL 复制到剪切板 
   -h, --help  输出用法信息 
 vue serve 使用了和 vue create 创建的项目相同的默认设置 (webpack、Babel、PostCSS 和 ESLint)。它会在当前目录自动推导入口文件——入口可以是  main.js、index.js、App.vue 或 app.vue 中的一个。你也可以显式地指定入口文件： vue serve MyComponent.vue 
 
 vue build 
 Usage: build [options] [entry] 
 在生产环境模式下零配置构建一个 .js 或 .vue 文件 
 Options: 
   -t, --target <target>  构建目标 (app | lib | wc | wc-async, 默认值：app) 
   -n, --name <name>      库的名字或 Web Components 组件的名字 (默认值：入口文件名) 
   -d, --dest <dir>       输出目录 (默认值：dist) 
   -h, --help             输出用法信息 
 vue build MyComponent.vue
```


[笔记\_vue06\_项目架构实践【瑞客论坛 www.ruike1.com】.pdf](<https://github.com/scZhengChao/IT_Blogs/releases/download/assets-v1/_vue06_.www.ruike1.com._xaxTjPSLFs.pdf> "笔记_vue06_项目架构实践【瑞客论坛 www.ruike1.com】.pdf")

第二版

[笔记\_vue07\_项目架构实践2【瑞客论坛 www.ruike1.com】.pdf](<https://github.com/scZhengChao/IT_Blogs/releases/download/assets-v1/_vue07_.2.www.ruike1.com._EEonJsI3No.pdf> "笔记_vue07_项目架构实践2【瑞客论坛 www.ruike1.com】.pdf")

```纯文本 
 基于cli3 的 模式和环境变量                               我觉得很有用 
 你可以替换你的项目根目录中的下列文件来指定环境变量：   被git忽略  就是不会上传到代码库  只适用于本地 
 .env                #  在所有的环境中被载入 
 .env.local          #  在所有的环境中被载入，但会被 git 忽略 
 .env.[mode]         # 只在指定的模式中被载入 
 .env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略 
 
 一个环境文件只包含环境变量的“键=值”对： 
 FOO=bar 
 VUE_APP_SECRET=secret 
 被载入的变量将会对 vue-cli-service 的所有命令、插件和依赖可用。 
 
 环境加载属性 
 为一个 特定模式准备的环境文件 (例如 .env.production) 将会比一般的环境文件 (例如 .env) 拥有 更高的优先级 。 
 此外， Vue CLI 启动时 已经存在的环境变量拥有最高优先级 ，并不会被 .env 文件覆写。 
 NODE_ENV 
 如果在 环境中有默认的 NODE_ENV，你应该移除它或在运行 vue-cli-service 命令的时候明确地设置 NODE_ENV。 
 
 模式： 
 模式是 Vue CLI 项目中一个重要的概念 。默认情况下 ，一个 Vue CLI 项目有三个模式： 
 * development 模式用于 vue-cli-service serve 
 * production 模式用于 vue-cli-service build 和 vue-cli-service test:e2e 
 * test 模式用于 vue-cli-service test:unit 
 
 注意 模式不同于 NODE_ENV， 一个 模式可以包含多个环境变量。也就是说， 每个模式都会将 NODE_ENV 的值设置为模式的名称— —比如在 development 模式下 NODE_ENV 的值会被设置为 "development"。 
 你可以通过为 .env 文件增加后缀来设置某个模式下特有的环境变量。比如，如果你在项目根目录创建一个名为 .env.development 的文件，那么在这个文件里声明过的变量就只会在 development 模式下被载入。 
 
 你可以通过传递  --mode 选项参数为命令行覆写默认的模式。例如，如果你想要在构建命令中使用开发环境变量，请在你的 package.json 脚本中加入： 
 "dev-build": "vue-cli-service build --mode development", 
 
 
 实例： 
 假设我们有一个应用包含以下  .env 文件 ：     
 VUE_APP_TITLE=My App 
 和  .env.staging 文件： 
 NODE_ENV=production 
 VUE_APP_TITLE=My App (staging) 
 vue-cli-service build 会加载可能存在的 .env、.env.production 和 .env.production.local 文件然后构建出生产环境应用； 
 vue-cli-service build --mode staging 会在 staging 模式下加载可能存在的 .env、.env.staging 和 .env.staging.local 文件然后构建出生产环境应用。 
 这两种情况下，根据 NODE_ENV，构建出的应用都是生产环境应用，但是在 staging 版本中，process.env.VUE_APP_TITLE 被覆写成了另一个值。 
 
 
 在客户端侧代码中使用环境变量 
 只有以 VUE_APP_ 开头的变量会被 webpack.DefinePlugin 静态嵌入到客户端侧的包中。你可以在应用的代码中这样访问它们： process.env.VUE_APP_* 
 console.log(process.env.VUE_APP_SECRET) 
 在构建过程中，process.env.VUE_APP_SECRET 将会被相应的值所取代。在 VUE_APP_SECRET=secret 的情况下，它会被替换为 "secret"。 
 除了 VUE_APP_* 变量之外，在你的应用代码 中始终可用的还有两个特殊的变量： 
      * NODE_ENV - 会是 "development"、"production" 或 "test" 中的一个。具体的值取决于应用运行的模式。 
     * BASE_URL - 会和 vue.config.js 中的 publicPath 选项相符，即你的应用会部署到的基础路径。 
 
 所有解析出来的环境变量都可以在 public/index.html 中以 HTML 插值中介绍的方式使用。 
 
 提示 
 你可以在 vue.config.js 文件中计算环境变量。它们仍然需要以 VUE_APP_ 前缀开头。这可以用于版本信息: 
 process.env.VUE_APP_VERSION = require('./package.json').version 
 module.exports = { 
   // config} 
 
 
 
 只在本地有效的变量 
 有的时候你可能有一些不应该提交到代码仓库中的变量，尤其是当你的项目托管在公共仓库时。这种情况下你应该使用一个 .env.local 文件取而代之。本地环境文件默认会被忽略，且出现在 .gitignore 中。 
 .local 也可以加在指定模式的环境文件上，比如 .env.development.local 将会在 development 模式下被载入，且被 git 忽略。
```


.e
