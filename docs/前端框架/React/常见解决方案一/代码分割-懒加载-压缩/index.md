# 代码分割/懒加载/压缩

## 目录

- [问题解决](#问题解决)
- [1.import  代码分割的最佳方式](#1import-代码分割的最佳方式)
- [2.Lazy   Suspense](#2Lazy---Suspense)
- [@loadable/component](#loadablecomponent)
- [3.基于路由的代码分割](#3基于路由的代码分割)
  - [react-loadable](#react-loadable)
- [4.命名导出](#4命名导出)
- [压缩](#压缩)

# 问题解决

> **动态加载几乎都用到 （）=>import() 这个语法；这里有一大坑 ..webpackrc.js 文件下 有个禁用选项disableDynamicImport。需要设置为false**

> \*\*不要把 \*\***`import`****关键字和****`import()`****方法弄混了****，该方法是为了进行动态加载才被引入的。**

[代码分割 – React A JavaScript library for building user interfaces https://react.docschina.org/docs/code-splitting.html](https://react.docschina.org/docs/code-splitting.html "代码分割 – React A JavaScript library for building user interfaces https://react.docschina.org/docs/code-splitting.html")

# 1.import  代码分割的最佳方式

&#x20;      在你的应用中**引入代码分割的最佳方式是通过动态 import()语法**。 ------官网 （组件）

       当 Webpack 解析到该语法时，会自动进行代码分割。如果你使用 Create React App，该功能已开箱即用，你可以[立刻使用](https://facebook.github.io/create-react-app/docs/code-splitting "立刻使用")该特性。

&#x20; [Next.js](https://nextjs.org/docs/advanced-features/dynamic-import "Next.js")也已支持该特性而无需进行配置。如果你自己配置 Webpack，你可能要阅读下 Webpack 关于[代码分割](https://webpack.docschina.org/guides/code-splitting/ "代码分割")的指南。你的 Webpack 配置应该[类似于此](https://gist.github.com/gaearon/ca6e803f5c604d37468b0091d9959269 "类似于此")。

当使用 [Babel](https://babel.docschina.org/ "Babel")时，你要确保 Babel 能够解析动态 import 语法而不是将其进行转换。对于这一要求你需要 [babel-plugin-syntax-dynamic-import](https://yarnpkg.com/en/package/babel-plugin-syntax-dynamic-import "babel-plugin-syntax-dynamic-import")插件。

```bash 
export class App extends Component {
  constructor() {
    super();
    this.state = {

    };
    this.add = this.add.bind(this)
  }
  componentDidMount(){
    // console.log(this.props.add)
   let unsubscribe =  store.subscribe(()=>{
      console.log(store.getState())
    })
  }

 lazyLoad=()=>{
    import('./component').then(Loading=>{
        this.setState({
            Loading:Loading.default
        })
    })
 }
 componentWillUnmount(){
    unsubscribe()
  }

  render() {
    let { add2,change ,text} = this.props
    const {Loading } = this.state
    return (
      <>
      <div>次react项目 用于检测redux 和 store</div>
        <p>home</p>
        <p>store 庞大分块，异步高级action</p>
        <button onClick={add2}>add ...</button>
        <input type="text" name='text' onChange={change} placeholder='双向绑定'/>
        <div>{text}</div>
       <input type="button" onClick={this.lazyLoad} value={'import 最好的懒加载'}/>
        {
            Loading?<Loading/>:null
       }
      </>
    );
  }
  add(){
    console.log('add')
  }
}
```


![  ](./image/62c8a05b0ded300d4df98e792db0253a_rStpek5oPn.png "  ")

# 2.Lazy   Suspense

      React.lazy和 Suspense 技术还不支持服务端渲染。如果你想要在使用服务端渲染的应用中使用，我们推荐 [Loadable Components](https://github.com/gregberge/loadable-components "Loadable Components")这个库。它有一个很棒的[服务端渲染打包指南](https://loadable-components.com/docs/server-side-rendering/ "服务端渲染打包指南")。

\*\*      React.lazy接受一个函数，这个函数需要动态调用 import()。它必须返回一个 Promise，该 Promise 需要 resolve 一个 defalut export 的 React 组件\*\*。

&#x20;    然后应在 Suspense组件中渲染 lazy 组件，如此使得我们可以使用在**等待加载 lazy 组件时做优雅降级（如 loading 指示器等）。此代码将会在组件首次渲染时，自动导入包含 OtherComponent组件的包。**

```bash 
import React, { Suspense } from 'react';
const OtherComponent = React.lazy(() => {    
    return new Promise((resolve,reject)=>{        
        setTimeout(()=>{            
          resolve(import('./susLazy'))         
        },2000)    
    })    

});

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );}

fallback
```


属性接受任何在组件加载过程中你想展示的 React 元素。你可以将 Suspense组件置于懒加载组件之上的任何位置。你甚至可以用一个 Suspense组件包裹多个懒加载组件。

```bash 
import React, { Suspense } from 'react';
const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </div>
  );}
```


```javascript 
import React ,{ Suspense } from 'react'
import Loadable from "react-loadable";
import {Spin} from "antd";

const Loading = ()=><Spin size="large" className="global-spin" />

export function lazyLoad(impComponent) {
  const Compoent = React.lazy(impComponent);
  return  React.forwardRef((props={},ref)=>{
    return <Suspense fallback={<Loading/>}>
      <Compoent
        {...props}
        ref={ref}
      />
    </Suspense>
  })
}


// 使用
const TanPan = text.component
<TanPan
  {...props}
/>

```


# @loadable/component

```javascript 
import loadable from '@loadable/component'

const OtherComponent = loadable(() => import('./OtherComponent'))

function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  )
}

```


# 3.基于路由的代码分割

## **react-loadable**

路由层面的懒加载

```javascript 
 //loadable 异步路由,懒加载,import全是同步加载的,没有什么能阻挡他,即使你用不到,写上去了就马上加载.所以要懒加载,你用到了我才加载,有利有弊
import loadable from 'react-loadable';
import Loadding from '../common/loadding/loadding';


const Video = loadable({loader: () => import('./video/video'), loading: Loadding })
const Recommend = loadable({ loader: () => import('./recommend/recommend'), loading: Loadding, })
```


或者

```javascript 
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  </Router>
);

```


# 4.命名导出

     React.lazy 目前只支持默认导出（default exports）。如果你想被引入的模块使用命名导出（named exports），你可以创建一个中间模块，来重新导出为默认模块。这能保证 tree shaking 不会出错，并且不必引入不需要的组件。

```javascript 
 
// ManyComponents.js
export const MyComponent = /* ... */;
export const MyUnusedComponent = /* ... */;


// MyComponent.js
export { MyComponent as default } from "./ManyComponents.js";


// MyApp.js
import React, { lazy } from 'react';
const MyComponent = lazy(() => import("./MyComponent.js"));
```


```javascript 
import(/* webpackChunkName: "MyFile" */`../containers/MyFile`)

//其他代码...
output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[hash:8].js',//动态import文件名
},
//其他代码...

```


# 压缩

dva webpack.config.js

```javascript 
const CompressionPlugin = require("compression-webpack-plugin");

module.exports=(config,{webpack})=>{
  config.plugins.unshift(
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',//算法
      test: /\.js$|\.css$/,
      threshold: 10240, // 只处理比这个值大的资源。按字节计算
      minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
    })
  )
  return config
}

```


或者

```javascript 
yarn add compression-webpack-plugin
const CompressionPlugin=require('compression-webpack-plugin')


//webpack.config.js
  plugins: [
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',//算法
      test: /.js$|\.css$/,
      threshold: 10240, // 只处理比这个值大的资源。按字节计算
      minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
    }),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin(..)
]
```
