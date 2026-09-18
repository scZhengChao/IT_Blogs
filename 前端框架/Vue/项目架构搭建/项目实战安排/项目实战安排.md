# 项目实战安排

## 目录

- [Vuew2](#Vuew2)
- [Vue3](#Vue3)

# Vuew2

```纯文本 
 技术栈: 
 
 vue-cli2 + vue-router + axios + vue-aniamte + vuex .....   全家桶  + nodejs + express + mongodb 
 
 新闻客户端 
     1. 环境搭建(vue-cli +  vue-router + axios + vuex == 全家桶) 
     2. 项目分析(组件安排) 
         dist 
             |-static 
             |-... 
              
         public 
             |- index.html 
             |- favicon.ico 
             |-data: 
                 |-数据.json 
                 .... 
         src 
             |-assets 
                 |-js 
                 |-css 
                 |-image 
             |-component 
                 |-    navbar.vue / footbar.vue 
                 |-    home.vue / follow.vue / column.vue / user.vue 
                 |-  detail.vue / login.vue / reg.vue 
                 |-    silder.vue / error.vue / list.vue 
             |-filters 
                 date.js 
                 fillzero.js 
                 ... 
             |-common 
                 |-loading 
                     index.js 
                     |-component 
                         |-loading.vue 
             |-store 
                 |-index.js 
                 |-actions.js 
                 |-mutations.js 
                 |-getters.js 
                 |-state.js 
                 |-types.js 
             main.js 
             App.vue 
             router.config.js 
         package.json 
 
 
 
 
 3. 布局 
         a) 切图(需要设计稿) 
             css特点： 
                 style-loader 插入到style标签(先插入上层组件样式) 
                 样式会继承父组件 
                 组件直接样式冲突会相互影响(scoped) 
             css 规划问题: 
                 a) css命名空间   .app-home.xxx{}   .app-product-xxx{}  √  BEM 
                 b) css模块化 
                     cli2 
 
                         webpack 配置: 
                             utils->css-loader->options{modules:true} 
                          
                         组件引入样式1: import style from '../asset/css/xx.css' 
                             data(){return {style:style}} 
                             应用样式:  <div :class='style.类名|id名' 
 
 
                         组件引入样式2: 写在style内部 
                             应用样式:  <div :class='$style.类名|id名' 
 
 
                     cli3 
                         <style  module>  使用: <xx :class={$style.box} 
 
                 c) scoped 独立样式作用域 
 
             scss 规划问题: 
 
                 cli3: 
                     scss for vue-cli3脚手架 需要安装node-sass && sass-loader 
 
                     引入:    <style lang="scss"  使用: <xx class="box" 
                     引入:    <style lang="scss" module  使用: <xx class={$style.box} 
                     引入:    <style lang="scss" scope  使用: <xx class={box} 
 
                     引入sass全局变量? 
                         定义主题： $theme-color: '#300' -> base.scss -> assets 
                         配置webpack： 
                         1） vue.config.js 
                             module.exports = { 
                               css: { 
                                 loaderOptions: { 
                                   sass: { 
                                    prependData: ` 
                                       @import "@/assets/css/base.scss"; 
                                     ` 
                                   } 
                                 } 
                               } 
                             } 
                         2） node_modules/@vue/cli-service/lib/options.js 
                             css: { 
                                 // extract: true, 
                                 // modules: false, 
                                 // localIdentName: '[name]_[local]_[hash:base64:5]', 
                                 // sourceMap: false, 
                                 loaderOptions: { 
                                   sass: { 
                                    prependData: ` 
                                       @import "@/assets/css/base.scss"; 
                                     ` 
                                   } 
                                 } 
                               } 
 
                 cli2: 
                     需要安装node-sass / sass-loader 
                     配置: 在build文件夹下的webpack.base.conf.js的rules里面添加配置 
                       { 
                         test: /\.scss$/, 
                         loaders: ["style-loader", "css-loader", "sass-loader"] 
                       } 
 
                     使用:    <style lang="scss"  使用: <xx class="box" 
                     使用:    <style lang="scss" module  使用: <xx class={$style.box} 
                     使用:    <style lang="scss" scope  使用: <xx class={box} 
 
                 引入sass全局变量? 
                      
                     配置webpack： 在build/utils.js中修改配置 
                     scss: generateLoaders('sass').concat( 
                       { 
                         loader: 'sass-resources-loader', 
                         options: { 
                           resources: path.resolve(__dirname, '../src/assets/scss/全局变量.scss')  //注意自己的路径 
                         } 
                       } 
                     ), 
 
         b) UI库    (bootstrap/elementUI pc端 / mintUI移动端 / 妹子UI/ant.design/weex) 
 
         c) html+css模板 移植 到 组件 
             01 全局资源 在主入口文件(index.html)引入  没有优化 
             02 全局资源 主程序(main.js)  优化 
             03 自执行脚本|局部css，跟着当前组件走 
 
 4    路由搭建 
      
 5    数据交互 
     home    -> list (props:数据,数据标志)  -> detail (接受id/数据标志)  -> axios 数据 
     follow  -> list (props) 
 
 6    过滤器|指令 
 
     Object.keys 
     Object.values 
 
     指令:有构子 
     路由钩子: 
         beforeEach|beforeEnter|beforeRouterEnter 
 
     路由监听 : 路由钩子|数据观测（watch) 
 
     非状态管理（控制导航显示) 
         this.$root  返回的是根实例  new Vue (main.js) 
         this.$root.$data.根数据名; 
         this.$root.$data.根数据名=值 
 
 
     拦截器：插件读数据时(提交前|数据返回后)，进行拦截 
     import axios from 'axios'; 
     Vue.prototype.$http=axios; 
     //配置axios的拦截器 
 
     //请求拦截 
     axios.interceptors.request.use(function (config) { 
         // 发送请求成功时，拦截，做点事，config=请求时的配置 
         vm.$data.bLoading=true; 
         return config; 
     }, function (error) { 
         return Promise.reject(error); 
     }); 
 
     // 响应拦截 
     axios.interceptors.response.use(function (response) { 
         vm.$data.bLoading=false 
         return response; 
     }, function (error) { 
         // Do something with response error 
         return Promise.reject(error); 
     }); 
 
 7 动画 
     vue-animate    vue add animate 
         import varname form 'vue-animate' 
     animate.css  npm i xxxx 
         全局引入 
 
 状态管理|路由守卫
```


```纯文本 
 - 
    解决前后端服务器共存 
          
         前后端分离： 各子环境下开发,出现不同端口 
             跨域：需要后台允许的， 设置头 
                 a)  逐条设置  nodejs 
                     res.setHeader('Access-Control-Allow-Origin', req.headers.origin) 
                     问题：每一个路由都要设置 
                 b)  统一设置(中间件cors)  nodejs 
                     app.use(cors({ 
                       "origin": ['http://localhost:8080'], 
                     })); 
                 c) 前端模拟(webpack proxy(代理)) 
 
 跨源凭证 
         ajax跨源请求数据，默认不提供凭据(cookie,http认证，客户端SSL证明) 
          
         使用携带跨源凭据|反向跨域 
             前端: 主动携带 
                 a)    逐条允许 axios({}) 
                     withCredentials: true,//携带跨源凭证 
                 b) axios.defaults.withCredentials=true 
             后端：允许携带 
                 a) 逐条允许 
                     res.setHeader('Access-Control-Allow-Credentials', true); 
                 b) 中间件统一配置(cors) 
                     app.use(cors({ 
                       "origin": ['http://localhost:8080'], 
                       "credentials":true,//允许携带凭证 
                     })); 
 
 
     前端原生：请求头里面带凭证，带cookie 
 
     var xhr = new XMLHttpRequest() 
     xhr.open("post", "xxx/xxx", true); 
     xhr.withCredentials = true;        放在 open 方法后面比较靠谱 
     xhr.onload = function(){} 
     xhr.send("a=1&b=2"); 
 
     前端jqAjax:    请求头里面带凭证，带cookie 
         $.ajax({ 
             type:'get', 
             url:"http://localhost:3000/logouts", 
             dataType:"json", 
             xhrFields: { 
                 withCredentials: true 
             }, 
             success:function(data){ 
                 console.log(data); 
             } 
         }) 
         $.ajax.options.withCredentials=true; 
 
         前端:vue-resource 
             this.$http({credentials:true}) 逐条 
             Vue.http.interceptors.push(function(request, next) { 
               request.credentials = true  统一 
               next(); 
             }); 
 
 
 action复制 一份state        -》        mutations             
 ----------------------------------------------vue 官方脚手架的配置 ----------------------------------------- 
 脚手架: vue-cli  搭建vue项目环境 
 
 
     安装cli3 ： 
         npm install -g @vue/cli | yarn global add @vue/cli 
         npm install -g @vue/cli-init  和cli2 命令行 并用 (后续在cli3下指向一切cli2操作) 
 
 
     创建项目: simple 简洁型 ci2 
         vue init webpack-simple 目录    webpack-simple|webpack  模板 
         cd 目录 
         npm install 
         npm run dev  运行 
         开发.... 
         npm run build 打包 
 
 
     创建项目    webpack 专业级  cli2 
         webpack-dev-server --port 8001 --open 设置端口，开启浏览器 
         config/index.js 
             autoOpenBrowser: 开启浏览器 
             useEslint: eslint检查的开启关闭 
             port: 端口 
         build/webpack.base.conf.js 
             loader 配置 
             entry 入口
```


# Vue3

```纯文本 
脚手架: vue-cli  搭建vue项目环境


    安装cli3 ：
        npm install -g @vue/cli | yarn global add @vue/cli
        npm install -g @vue/cli-init  和cli2 命令行 并用 (后续在cli3下指向一切cli2操作)


    创建项目: simple 简洁型 ci2
        vue init webpack-simple 目录    webpack-simple|webpack  模板
        cd 目录
        npm install
        npm run dev  运行
        开发....
        npm run build 打包


    创建项目    webpack 专业级  cli2
        webpack-dev-server --port 8001 --open 设置端口，开启浏览器
        config/index.js
            autoOpenBrowser: 开启浏览器
            useEslint: eslint检查的开启关闭
            port: 端口
        build/webpack.base.conf.js
            loader 配置
            entry 入口


vue cli3

        官网:    https://cli.vuejs.org/zh/

        关于旧版本
            Vue CLI 的包名称由 vue-cli 改成了 @vue/cli。 如果你已经全局安装了旧版本的 vue-cli (1.x 或 2.x)，你需要先通过 npm uninstall vue-cli -g 或 yarn global remove vue-cli 卸载它。

        安装cli3 ：
            npm install -g @vue/cli | yarn global add @vue/cli
            npm install -g @vue/cli-init  和cli2 命令行 并用 (后续在cli3下指向一切cli2操作)

        创建项目:
            vue create xxx / .
            vue ui         图形UI形式


        打包:    构建目标
            npm run build
            npx vue-cli-service build
            vue-cli-service build   需要安装vue-cli-service 命令行?

            index.html 会带有注入的资源和 resource hint
            第三方库会被分到一个独立包以便更好的缓存
            小于 10kb 的静态资源会被内联在 JavaScript 中
            public 中的静态资源会被复制到输出目录中


        Index.html 文件
            插值:
                使用 lodash template 语法插入内容
                <link rel="icon" href="<%= BASE_URL %>favicon.ico">
                打包后    ->  <link rel=icon href=/favicon.ico>
            Preload:
                 是一种 resource hint，用来指定页面加载后很快会被用到的资源，所以在页面加载的过程中，我们希望在浏览器开始主体渲染之前尽早 preload。 vue 自动生成
                 <link href=/css/app.8c41b469.css rel=preload as=style>
            Prefetch:
                用来告诉浏览器在页面加载完成后，利用空闲时间提前获取用户未来可能会访问的内容。
                 Vue CLI 应用会为所有作为 async chunk 生成的 JavaScript 文件 (通过动态 import() 按需 code splitting 的产物) 自动生成 prefetch 提示。


        资源安排:

            ./ 指向assets开发目录
            / 指向public目录


            在 JavaScript 被导入或在 template/CSS 中通过相对路径被引用。这类引用会被 webpack 处理。
            放置在 public 目录下或通过绝对路径被引用。这类资源将会直接被拷贝，而不会经过 webpack 的处理。


            url-loader 将小于 10kb 的资源内联，以减少 HTTP 请求的数量


            推荐 资源放置到assets:
                脚本和样式表会被压缩且打包在一起，从而避免额外的网络请求。
                文件丢失会直接在编译时报错，而不是到了用户端才产生 404 错误。
                最终生成的文件名包含了内容哈希，因此你不必担心浏览器会缓存它们的老版本
            何时使用 public 文件夹
                你需要在构建输出中指定一个文件的名字。
                你有上千个图片，需要动态引用它们的路径。
                有些库可能和 webpack 不兼容，这时你除了将其用一个独立的 <script> 标签引入没有别的选择。


        安装CLI插件:
                vue add axios    /指向public
                vue add router / vue add vuex
                    可以安装包，并创建文件(插件配置的基本小样)


                npm i axios vue-router vuex -D
                    需要自行编写配置


                vue add animate 没有vue-plugin-animate-> npm i animate.css
                vue add swipe   没有 -> npm i vue-swipe


                注意:
                    vue add 的设计意图是为了安装和调用 Vue CLI 插件。这不意味着替换掉普通的 npm 包。对于这些普通的 npm 包，你仍然需要选用包管理器。


                    CLI 插件都会包含一个 (用来创建文件的) 生成器和一个 (用来调整 webpack 核心配置和注入命令的) 运行时插件


        配置


            修改启动端口:
                a) package.json->scripts->vue-cli-service serve --port 8001 --open
                b) @vue/cli-service/lib/options


            node_module配置:    cli-service 对 webpack 配置进行了抽象
                @vue/cli-service/lib/options
                    css: {
                        extract: false,
                        modules: false, //css模块化
                            使用：a) 组件import引入样式后    写入data 选项后模板中使用
                                  b) style标签 添加module属性 模板:$style | 组件:this.$style
                            场景: scoped/moudle 对css内部import css时无效时
                        localIdentName: '[name]_[local]_[hash:base64:5]',
                        sourceMap: false,
                        loaderOptions: {}
                      }
            vue.config.js
                    参考：https://github.com/vuejs/vue-cli/tree/dev/docs/zh/config
                          https://cli.vuejs.org/zh/config/


                    module.exports={
                      css: {
                        extract:false,//css分离 生产环境下是 true，开发环境下是 false
                        modules: true, //开启css模块化
                        loaderOptions:{//向 CSS 相关的 loader 传递选项
                          css: {
                            // 这里的选项会传递给 css-loader
                          },
                          postcss: {
                            // 这里的选项会传递给 postcss-loader
                          }
                        }
                      },
                      devServer:{
                        // proxy: 'http://localhost:3000',//告诉开发服务器将任何未知请求 (没有匹配到静态文件的请求) 代理到http://localhost:4000。
                        // host: '0.0.0.0',
                        port: 8003,
                        open: true,
                        // https: false,
                        // proxy: null, // string | Object
                      },
                      lintOnSave:false, //关闭esling警告
                      lintOnSave: process.env.NODE_ENV !== 'production', //生产构建时禁用
                      productionSourceMap:false, //打包不携带map文件
                    }
------------------------------------------------------------------------------------------------------


状态管理  vuex插件  -> new 一个  -> store实例 -》注册Vue上
        什么时候用： 打算开发中大型应用
        集中式数据管理, 一处修改，多处使用


        思维流程:
                                            store.js
                    this.$store.commit('increment')    -> mutations
                    this.$store.dispatch('jia')        -> actions
                     mapActions() ->actions                            mapGetters()->getters
            components - >  actions        ->  mutations -> state  <-  getters    <-    components
                发送请求      处理            修改状态
                              业务逻辑        修改state               读取state
                              异步
                                                          state<-$store.state <-  学生
    -----------------------------------------------------------------------------
    安装 vuex 状态管理插件
    引入 + use


    ------------------------------------------------------------------------------
    mapActions/mapGetters  执行后， 返回来的是对象
        对象:    {incremen:fn,decrement:fn,xx,xx}
    ------------------------------------------------------------------------------
    this.$store.commit('increment',参数/负载/payload) -> mutations
    this.$store.dispatch('increment',参数/负载/payload)  -> actions


    const actions = {
        increment:({store对象},参数)=>{}
    }


    <xx @click="请求类型(负载)"   actions: 请求类型:({},payload)=>{payload==负载}
    ......


    ------------------------------------------------------------------------------


@click="INCREMENT(2)
删除vue3默认配置


```


**vue的技术栈**

vue + vue-router + axios +vuex -->全家桶+nodejs + express + mongod;    

vue.config的配置:

```纯文本 
 module.exports = { 
   // css: { 
   // extract:false,//css分离 生产环境下是 true，开发环境下是 false 
   // modules: true, //开启css模块化 
   // loaderOptions:{//向 CSS 相关的 loader 传递选项 
   // css: { 
   // // 这里的选项会传递给 css-loader 
   // }, 
   // postcss: { 
   // // 这里的选项会传递给 postcss-loader 
   // } 
   // } 
   // }, 
 devServer: { 
   // open: process.platform === 'darwin', 
   // host: '0.0.0.0', 
   // port: 8001, 
   // https: false, 
   // hotOnly: false, 
   // proxy: null, // string | Object 
   // before: app => {} 
 open: true, 
 // proxy: ' http://localhost:3000 ' //告诉服务器,没有匹配到静态资源是]时,服务器代理到3000 
 }, 
   lintOnSave: true, //关闭esling警告, 
   //lintOnSave: process.env.NODE_ENV !== 'production', //生产构建时禁用 
   productionSourceMap: false, //打包不携带map文件 
 }
```


```纯文本 
 const path = require('path') 
 module.exports = { 
   devServer: { 
     open: true, 
   }, 
   chainWebpack: config => { 
     const svgRule = config.module.rule('svg') 
     // 清除已有的所有 loader。 
     // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。 
     svgRule.uses.clear() 
     svgRule 
       .test(/\.svg$/) 
       .include.add(path.resolve(__dirname, './src/icons/svg')) 
       .end() 
       .use('svg-sprite-loader') 
       .loader('svg-sprite-loader') 
       .options({ 
         symbolId: 'icon-[name]' 
       }) 
     const fileRule = config.module.rule('file') 
     fileRule.uses.clear() 
     fileRule 
       .test(/\.svg$/) 
       .exclude.add(path.resolve(__dirname, './src/icons/svg')) 
       .end() 
       .use('file-loader') 
       .loader('file-loader') 
   } 
 } 
 
 生命周期: 
     beforeCreate                加载自己写的实例属性,方法                                  created 
     beforeMount                      挂载自己的真实dom                           Mounted 
     beforeUpdate                            挂载dom                    Updated 
     beforeDestory                              卸载掉vue上的属性方法,计时器                  Destroyed 
 
 5    数据交互 
      
     home    -> list (props:数据,数据标志)  -> detail (接受id/数据标志)  -> axios 数据 
     follow  -> list (props) 
 
 6    过滤器|指令 
 
     Object.keys 
     Object.values 
 
     指令:有构子 
     路由钩子: 
         beforeEach|beforeEnter|beforeRouterEnter 
 
     路由监听 : 路由钩子|数据观测（watch) 
 
 
     非状态管理（控制导航显示) 
         this.$root  返回的是根实例  new Vue (main.js) 
         this.$root.$data.根数据名; 
         this.$root.$data.根数据名=值 
 
 
     拦截器：插件读数据时(提交前|数据返回后)，进行拦截 
     import axios from 'axios'; 
     Vue.prototype.$http=axios; 
     //配置axios的拦截器 
 
 
     //请求拦截 
     axios.interceptors.request.use(function (config) { 
         // 发送请求成功时，拦截，做点事，config=请求时的配置 
         vm.$data.bLoading=true; 
         return config; 
     }, function (error) { 
         return Promise.reject(error); 
     }); 
 
 
     // 响应拦截 
     axios.interceptors.response.use(function (response) { 
         vm.$data.bLoading=false 
         return response; 
     }, function (error) { 
         // Do something with response error 
         return Promise.reject(error); 
     }); 
 
 
 7 动画 
     vue-animate    vue add animate 
         import varname form 'vue-animate' 
     animate.css  npm i xxxx 
         全局引入 
 
 
 状态管理|路由守卫
```
