# react基础

## 目录

- [setState:（很重要的一个内容）](#setState很重要的一个内容)
  - [解决：3中方法](#解决3中方法)
    - [1](#1)
    - [2使用定时器  （宏任务）
      ](#2使用定时器--宏任务)
    - [3)  原生事件中修改状态(本质上还是宏任务)](#3--原生事件中修改状态本质上还是宏任务)
- [jsx:](#jsx)
- [事件处理(react 严格遵循单项数据流；不支持双向绑定)](#事件处理react严格遵循单项数据流不支持双向绑定)
  - [受控元素：](#受控元素)
- [defaultProps和PropTypes](#defaultProps和PropTypes)
- [Fragments](#Fragments)
  - [短语法](#短语法)
  - [带 key 的 Fragments](#带-key-的-Fragments)
- [forceUpdate()](#forceUpdate)

```纯文本 
 react: 
 
 干嘛的：前端框架，把用户界面抽象成一个个的组件，按需组合成页面 
 
 官网： https://reactjs.org/ 
        http://react.css88.com/ 
 
 不同点： 
             angularJs         vueJs         reactJs             angularTs 
 
 控制器        √                -            -                    - 
 过滤器        √                √            -                    √ 
 指令            √                √            -    （编写表达式）    √ 
 模板语法        mutache            mutache        -                    mutache 
 组件            √                √            √    （类/js/jsx）    √ 
 jsx          -                -             jsx                 -(ts) 
 
         控制器 
             指令 
                 元素 <Xxx 
                 样式型<div class="指令名" 
                 属性  <div ng-指令名 
                 注释形 <!-- directve 指令名--> 
 共同点： 
     虚拟DOM(angularJs除外  angular有)，数据驱动 
 
 
 
 JSX：js + html        类XML语法 
     oo.js/  oo.jsx  合法的 
 语法要求： 
     标签要闭合 
     元素必须要有一个顶层元素 
     变量首字母大写代表组件，小写对应是普通变量 
     JSX属性，多单词小驼峰命名 tabindex -> tabIndex 
 精髓：多组件组合，jsx+函数式编程（运算写成一系列的函数嵌套）
```


```纯文本 
 环境搭建： 
     a)    webpack + webpack-dev-server + react + react-dom 
         / 指向 index所在位置，图片,数据 都指向 / 
         js / css / jsx 相对定位 
          
     b) npm install create-react-app    -g   官方脚手架 
         1. 安装官方脚手架： npm install -g create-react-app  
         2. 创建项目： create-react-app react-study  
         3. 启动项目： npm start 
         参考:     https://facebook.github.io/create-react-app/docs/getting-started 
 
         目录解析: 
             manifest.json 生成一个网页的桌面快捷方式时，会以这个文件中的内容作为图标和文字的显示内容 
             registerServiceWorker.js 
                 支持离线访问，所以用起来和原生app的体验很接近,只有打包生成线上版本的react项目时，registerServiceWorker.js才会有效。服务器必须采用https协议 
             对Internet Explorer 9,10和11的支持需要polyfill。 
 
         create-react-app 目录名| . 
         yarn start 开发模式 
         yarn build 打包 
 
         更改默认的端口号: 
         1. node_modules\react-scripts\scripts 
             const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3001; 
 
         2.  npm run eject / yarn eject 
              修改script/start.js  config 文件件自定义配置；  
             注意：此操作不可逆；打散了 就不能再回来了 
           error: Remove untracked files, stash or commit any changes, and try again. 
             删除 .git  不要让他找到 没有 stash 或者 commit 的文件 或者 你就按提示操作 
 
             本地资源导入(import) 不可以导入src之外的包 
 
             问题:jsx前景图片, ./ 和 / 都指向了 public目录 
             解决：1.模块化导入 src目录里 要在jsx里src的图片 
                   2.相对或者绝对导入public目录下的图片 
 
         去除eslint 警告： 
             yarn  eject 
             找到项目下config/webpack.config.dev|prod 
             注释关于eslint的导入和rules规则 
 
         打包 + 预览： 
             npm run build / yarn build 
             serve -s build --port 端口 --open 
             serve 服务器命令行工具（npm i serve -g) 
 
             public目录里面的资源会直接copy到build目录，src里面的资源会打包模块化 
 
         help:  https://github.com/facebook/create-react-app 
 
         解决方案: 
             项目资源，尽量从src目录下引入，打包时会模块化 
             图片资源模块化引入，如何来自库只能放到public目录下 
 
     c) yeomen 目录        需要安装 
         npm install 
         npm run dev
```


```纯文本 
 项目架构 
 
 环境变量： 
 // node运行环境：development、production、test等  
 const NODE_ENV = process.env.NODE_ENV; 
 // 要扫描的文件名数组  
 var dotenvFiles = [  
      `${paths.dotenv}.${NODE_ENV}.local`, // .env.development.local   
     `${paths.dotenv}.${NODE_ENV}`,       // .env.development   
     NODE_ENV !== 'test' && `${paths.dotenv}.local`, // .env.local   
     paths.dotenv, // .env  
 ].filter(Boolean); 
 // 从.env*文件加载环境变量  
 dotenvFiles.forEach(dotenvFile => {   
     if (fs.existsSync(dotenvFile)) {     
         require('dotenv-expand')(       
             require('dotenv').config({         
                 path: dotenvFile,      
             })    
          );   
     }  
 }); 
 
 
 支持ts： 
 /webpack.config.js 
 // Check if TypeScript is setup   
 const useTypeScript = fs.existsSync(paths.appTsConfig); 
 
 /paths 
 module.exports = { 
   dotenv: resolveApp('.env'), 
   appPath: resolveApp('.'), 
   appBuild: resolveApp('build'), 
   appPublic: resolveApp('public'), 
   appHtml: resolveApp('public/index.html'), 
   appIndexJs: resolveModule(resolveApp, 'src/index'), 
   appPackageJson: resolveApp('package.json'), 
   appSrc: resolveApp('src'), 
   appTsConfig: resolveApp('tsconfig.json'), 
   appJsConfig: resolveApp('jsconfig.json'), 
   yarnLockFile: resolveApp('yarn.lock'), 
   testsSetup: resolveModule(resolveApp, 'src/setupTests'), 
   proxySetup: resolveApp('src/setupProxy.js'), 
   appNodeModules: resolveApp('node_modules'), 
   publicUrlOrPath, 
 }; 
 及相关的ts插件启用检测 
 
 
 支持css/sass/module.css： 
 // Check if TypeScript is setup  
 const useTypeScript = fs.existsSync(paths.appTsConfig); 
 // style files regexes  
 const cssRegex = /\.css$/;  
 const cssModuleRegex = /\.module\.css$/;  
 const sassRegex = /\.(scss|sass)$/;  
 const sassModuleRegex = /\.module\.(scss|sass)$/; 
 
 
 入口：webpack.config.js 
     entry: [ 
       // Include an alternative client for WebpackDevServer. A client's job is to 
       // connect to WebpackDevServer by a  socket  and get notified about changes. 
       // When you save a file, the client will either apply hot updates (in case 
       // of CSS changes), or refresh the page (in case of JS changes). When you 
       // make a syntax error, this client will display a syntax error overlay. 
       // Note: instead of the default WebpackDevServer client, we use a custom one 
       // to bring better experience for Create React App users. You can replace 
       // the line below with these two lines if you prefer the stock client: 
       // require.resolve('webpack-dev-server/client') + '?/', 
       // require.resolve('webpack/hot/dev-server'), 
        isEnvDevelopment &&   
         require.resolve('react-dev-utils/webpackHotDevClient'), 
       // Finally, this is your app's code: 
       paths.appIndexJs, 
       // We include the app code last so that if there is a runtime error during 
       // initialization, it doesn't blow up the WebpackDevServer client, and 
       // changing JS code would still trigger a refresh. 
     ].filter(Boolean), 
 本地服务和浏览器采用socket连接保持热更新； 入口文件 src/index 
 
 
 
 react 处理 样式: 
     1) 在index.html ： 引入  link/style  场景：应用的公共样式 
     2）在组件里面引入： import './css/xx.css'  是全局 注入口（程序) 公共样式 
         问题: 选择器冲突， 
         解决： 
             a) 命名空间 √ 
             b) 模块化: 
                 引入 import 变量  from './css/xx.css' 模块 
                 使用 <jsx className={变量.类名} 
                 配置 改名xx.css -> xx.module.css 需要模块化的才修改,不影响其他非模块化css写法 √ 
                     原理:    webpack配置 "style-loader!css-loader?modules" | modules:true 
     jsx: 
         className="类名 类名2" className={返回字符} 
         style={{key:value,key:value}} 
 
     3) css模块化，创建index.module.css，index.js 
         import style from "./index.module.css";  
         <img className={style.img} /> 
 
     优先级： 全局 css > module.CSS > SASS 
 
 module.css 中嵌套问题          http://www.ruanyifeng.com/blog/2016/06/css_modules.html 
 .img{ 
     border: 1px green solid; 
 } 
 .img2 { 
     composes:img; 
     width: 300px; 
 } 
 
 
 
 React和ReactDom ： 
      import React from 'react' 
     import ReactDOM from 'react-dom' 
 
     //Reactdom 类负责逻辑渲染， vdom--》dom 
     const jsx = <h1>react-dom</h1> 
     console.log(jsx)   //jsx 就是虚拟dom； 就是js 对象 同vue 
     //babel-loader 可以转换jsx --》vdom, 通过React.createElement() 
     ReactDOM.render(jsx,document.getElementById('root')) 
 
     react 核心包 必须引入；babel-loader 非常重要 
        { 
               test: /\.(js|mjs|jsx|ts|tsx)$/, 
               include: paths.appSrc, 
               loader: require.resolve('babel-loader'), 
               options: { 
                 customize: require.resolve( 
                   'babel-preset-react-app/webpack-overrides' 
                 ), 
                  
                 plugins: [ 
                   [ 
                     require.resolve('babel-plugin-named-asset-import'), 
                     { 
                       loaderMap: { 
                         svg: { 
                           ReactComponent: 
                             '@svgr/webpack?-svgo,+titleProp,+ref![path]', 
                         }, 
                       }, 
                     }, 
                   ], 
                 ], 
                 // This is a feature of `babel-loader` for webpack (not Babel itself). 
                 // It enables caching results in ./node_modules/.cache/babel-loader/ 
                 // directory for faster rebuilds. 
                 cacheDirectory: true, 
                 // See #6846 for context on why cacheCompression is disabled 
                 cacheCompression: false, 
                 compact: isEnvProduction, 
               }, 
             },
```


```javascript 
refs:
    获取jsx元素  获取的是真实dom
        给jsx元素 设置ref属性=名字
        组件内部： this.refs.名字
    何时用:
        处理focus、文本选择或者媒体播放
        触发强制动画
        集成第三方DOM库
```


# **setState:（很重要的一个内容）**

**是异步的**,会**将多个 setState() 调用合并为一次更新,进入队列里面；统一一次跟新；提高效率**
所以不能同步依赖上一个setState的值，作为下一个setState的参数

setState通常是异步的，因此如果要获取到新状态值有以下三种方式

1.而不能直接修改  this.state.counter += 1; //错误的
2.setState是批量执行的，因此对同一个状态执行多次只起一次作用，多个状态更新可以放在同一个 setState中进行：

```javascript 
componentDidMount() {   
    // 假如couter初始值为0，执行三次以后其结果是多少？   
    this.setState({counter: this.state.counter + 1});   
    this.setState({counter: this.state.counter + 1});   
    this.setState({counter: this.state.counter + 1}); 
}

```


## 解决：3中方法

### 1

```javascript 
this.setState(function(prevState,props){  
    prevState 抓取之前this.setState的所有状态
    props 所有属性
    更新会被合并,浅合并
    做一些处理
})
this.setState({counter: this.state.counter + 1},()=>{
    //回调  当前跟新完毕后执行，并不影响 他异步 队列的本质
});

this.setState({counter: this.state.counter + 1},()=>{
 console.log(this.state.counter)  //1
});   
this.setState({counter: this.state.counter + 1},()=>{
 console.log(this.state.counter)  //1
});   
this.setState({counter: this.state.counter + 1},()=>{
 console.log(this.state.counter)  //1
});


this.setState((state,props)=>({counter:state.counter + 1}),()=>{
   console.log(this.state.counter) //3
})
this.setState((state,props)=>({counter:state.counter + 1}),()=>{
    console.log(this.state.counter)   //3 
})
this.setState((state,props)=>({counter:state.counter + 1}),()=>{
    console.log(this.state.counter)   //3
})


this.setState((nextState,props)=>{
  console.log(this.state.counter) //0
  console.log(nextState.counter)  //0
  return {counter:nextState.counter + 1}
},()=>{
  console.log(this.state.counter) //3
})
this.setState((nextState,props)=>{
  console.log(this.state.counter) //0
  console.log(nextState.counter) //1
  return {counter:nextState.counter + 1}
},()=>{
  console.log(this.state.counter)  //3
})
this.setState((nextState,props)=>{
  console.log(this.state.counter) //0
  console.log(nextState.counter) //2
  return {counter:nextState.counter + 1}
},()=>{
  console.log(this.state.counter)  //3
})

```


注意上面两种写法是不一样的：
&#x20;       一个是同一批次 异步执行； 更新合并了；
&#x20;       另一个是：等待上一次跟新完毕再进行跟新；虽然还是异步；但是类似 发布订阅； 更新完了才执行
&#x20;       第三个 理解了吗：

总结： 所有setstate 操作都不影响它 异步的本质；
&#x20;      第一个函数的参数总是最新的state， 本质还是异步；按顺序异步；按顺序合并
&#x20;      异步的本质导致它是批量合并，所以直接合并最后一个

### 2**使用定时器  （宏任务）**

```javascript 
setTimeout(() => {    
  console.log(this.state.counter); 
}, 0);

```


### **3)  原生事件中修改状态**(本质上还是宏任务)

```javascript 
componentDidMount(){    
    document.body.addEventListener('click', this.changeValue, false) 
} 
changeValue = () => {    
    this.setState({counter: this.state.counter+1})    
    console.log(this.state.counter) 
}
```


# **jsx:**

JSX是一种JavaScript的语法扩展，**其格式比较像模版语言**，但事实上完全**是在JavaScript内部实现**的。
JSX可以很好地描述UI，能够有效提高开发效率,**预编译**

使用JSX

```javascript 
//表达式{}的使用，index.js
const name = "react study"; 
const jsx = <h2>{name}</h2>;

//函数也是合法表达式，index.js
const user = { firstName: "tom", lastName: "jerry" };
function formatName(user) {  
    return user.firstName + " " + user.lastName; 
} 
const jsx = <h2>{formatName(user)}</h2>;

//jsx是js对象，也是合法表达式，index.js
const greet = <p>hello, Jerry</p> 
const jsx = <h2>{greet}</h2>;

//条件语句可以基于上面结论实现，index.js
const showTitle = true; 
const title = name ? <h2>{name}</h2> : null; 
const jsx = (  <div>    {/* 条件语句 */}    {title}  </div> );


//数组会被作为一组子元素对待，数组中存放一组jsx可用于显示列表数据
const arr = [1,2,3].map(num => <li key={num}>{num}</li>) 
const jsx = (  <div>    {/* 数组 */}    <ul>{arr}</ul>     </div> );

//属性的使用
import logo from "./logo.svg";
const jsx = (  
    <div>    
{/* 属性：静态值用双引号，动态值用花括号；class、for等要特殊处理。style这里可不是双括号，而是希望是map对象  一切jsx都是js；而class 是关键字 所以class要变成className*/}   
     <img src={logo} style={{ width: 100 }} className="img" />  
    </div> 
);
```


# **事件处理(react 严格遵循单项数据流；不支持双向绑定)**

## **受控元素：**

**指定一个值；指定一个事件处理状态的变更；**

```javascript 
react 默认是单项绑定  defaultValue

    value={this.state.数据名}  model->view
    onChange={this.监听方法}   view->model(  setState )
    监听方法: this.setState(...)
```


**处理多个输入元素**
&#x20;       可以为每个元素添加一个 name 属性(通常和数据名一致)
&#x20;       处理函数根据 ev.target.name 的值来选择要做什么      &#x20;

```javascript 
name="inputUserName" name="inputContent"
this.setState({[ev.target.name]:ev.target.value})

```


```javascript 
//1. 处理函数变成箭头函数
handleChange=(e)=>{
  this.setState({
      name:e.target.value
  })
}
//2..在构造函数里 bind 指定this
constructor(props){
  super(props)
  this.state={
      name:''
  }
  this.handleChange = this.handleChange.bind(this)
}
//3.调用时变成箭头函数(传参的唯一方式)
<input type="text" value={this.state.name}  onChange={e=>this.handleChange(e)}/>

上面3中方法 选其一:
```


# defaultProps和PropTypes

```javascript 
List.propTypes={
  name:PropTypes.string.isRequired,
  content:PropTypes.string,
  index:PropTypes.number,
  //delete:PropTypes.func

}
//设置默认值：
List.defaultProps={
  name:'张三'
}

//或者用static 在组件里声明静态 
static propTypes={   
  name:PropTypes.string.isRequired,  
  content:PropTypes.string,  
  index:PropTypes.number,   
  delete:PropTypes.func 
}    

//设置默认值：  
static List.defaultProps={   
  name:'张三' 
}
```


# Fragments

  为一个组件返回多个元素。 可以让你将子元素列表添加到一个分组中，并且不会在DOM中增加额外节点

```javascript 
<React.Fragment key="bmw"></React.Fragment >
<></>
```


## 短语法

你可以使用一种新的，且更简短的语法来声明 Fragments。它看起来像空标签：

```vue 
 class Columns extends React.Component {
  render() {
    return (
      <>
        <td>Hello</td>
        <td>World</td>
      </>
    );
  }
}
```


**你可以像使用任何其他元素一样使用 <> \</>，除了它不支持 key 或属性。**

## 带 key 的 Fragments

使用显式 \<Reaact.Fragment>语法声明的片段可能具有 key。一个使用场景是将一个集合映射到一个 Fragments 数组 - 举个例子，创建一个描述列表：

```vue 
 function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // 没有`key`，React 会发出一个关键警告
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
```


**key 是唯一可以传递给 Fragment 的属性****。未来我们可能会添加对其他属性的支持，例如事件。** ​

# forceUpdate()

```vue 
 component.forceUpdate(callback)
```


&#x20;         默认情况下，当**组件的 state 或 props 发生变化时，组件将重新渲染**。如果**render() 方法依赖于其他数据**，则可以调用**forceUpdate() 强制让组件重新渲染。**

        调用 forceUpdate() 将致使组件调用 render() 方法，此操作会**跳过该组件的 shouldComponentUpdate()**。但**其子组件会触发正常的生命周期方法，包括 shouldComponentUpdate() 方法**。如果标记发生变化，React 仍将只更新 DOM。**通常你应该避免使用 forceUpdate()**，尽量在 render() 中使用 this.props 和 this.state。
