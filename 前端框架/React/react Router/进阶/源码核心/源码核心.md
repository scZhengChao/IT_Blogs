# 源码核心

react-router 秉承一切皆组件，因此实现的核心就是BrowserRouter,Route,Link;

BrowserRouter：历史记录管理对象history初始化及向下传递，location变更监听;

**核心思想： 但凡你想把一个值从上往下传递；你就想创建一个上下文；但是创建上下文太麻烦;所以穿件一个父组件包围起来**

```react tsx 
 //创建上下文  相对独立  Provider  Consumer 
 const Context = React.createContext() 
 
 
 //获取Provider 和 comsumer  一切皆组件的思想 
 const Provider = Context.Provider 
 const Consumer = Context.Consumer 
 
 <Provider value={{counter:this.state.counter,add:this.add }}> 
       <Consumer>{value=><Child {...value}></Child>}</Consumer> 
       <Consumer>{value=><Child {...value}></Child>}</Consumer> 
       <Consumer>{value=><Child {...value}></Child>}</Consumer> 
 </Provider> 
 这里和函数式组件的useContext ，useReducer 有异曲同工之妙
```


```react tsx 
 工具函数 match （path） 返回match 对象 
 import pathToRegexp from "path-to-regexp"; 
 
 const cache = {}; 
 const cacheLimit = 10000; 
 let cacheCount = 0; 
 
 
 // 转换path为正则和关键字数组 
 // pathToRegexp的作用   detail/:name  <==>/detail/:name  vue 同样有 
 function compilePath(path, options) {     
     const cacheKey = `${options.end}${options.strict}${options.sensitive}`;     
     const pathCache = cache[cacheKey] || (cache[cacheKey] = {}); 
 
     if (pathCache[path]) return pathCache[path]; 
 
     const keys = []; 
     const regexp = pathToRegexp(path, keys, options); 
     const result = { regexp, keys }; 
 
     if (cacheCount < cacheLimit) { 
         pathCache[path] = result; cacheCount++; 
     } 
 
     return result; 
 } 
 
 
 /** * 匹配pathname和path. */ 
 function matchPath(pathname, options = {}) { 
     if (typeof options === "string") options = { path: options }; 
       const { path, exact = false, strict = false, sensitive = false } = options; 
 
     const paths = [].concat(path);    // 转换path为match     
     return paths.reduce((matched, path) => {      
         if (!path) return null;      
         if (matched) return matched;      
         // 转换path为正则和占位符数组      
         const { regexp, keys } = compilePath(path, {        
             end: exact,        
             strict,        
             sensitive      
         });      
         // 获得正则匹配数组      
         const match = regexp.exec(pathname); 
 
         if (!match) return null; 
 
         // 结构出匹配url和值数组      
         const [url, ...values] = match;      
         const isExact = pathname === url; 
 
         if (exact && !isExact) return null; 
 
         //match 对象 
         return { 
             path, // 待匹配path        
             url: path === "/" && url === "" ? "/" : url, // url匹配部分        
             isExact, // 精确匹配        
             params: keys.reduce((memo, key, index) => { 
                 // 参数          
                 memo[key.name] = values[index];          
                 return memo;        
             }, {})      
         };       
     }, null); 
 } 
 
 export default matchPath;
```


```react tsx 
 很精妙 就考验基本功 
 import React, { Component } from 'react' 
 import {createBrowserHistory } from 'history' 
 import matchPath from './matchPath' 
 
 //创建一个上下文保存history，location 等 这个地方有点像store里的state似的 
 const RouterContext = React.createContext() 
 
 
 
 //Router: 管理历史记录变更，location变更等等，并传递给后代 
 class BrowserRouter extends Component { 
     constructor(props){ 
         super(props) 
          // 创建浏览器history对象 
         this.history = createBrowserHistory(this.props) 
 
          // 创建状态 管理location 
         this.state = { 
             location:this.history.location 
         } 
 
          //开启监听  下面的所有子组件 都会更新 
         this.unlisten = this.history.listen(location=>{ 
             this.setState({location}) 
         }) 
     } 
 
     componentWillUnmount(){ 
          //卸载的时候释放监听 
          if(this.unlisten){ 
             this.unlisten() 
         } 
     } 
     render(){ 
         return ( 
             <RouterContext.Provider 
                  value={{ 
                     history:this.history, 
                     location:this.state.location 
                 }} 
                 children={this.props.children} //看了下面就知道最高优先级渲染 
             > 
             </RouterContext.Provider> 
         ) 
     } 
 } 
 
 
 
 //根据传参配置（path,render,componet,children 之间有竞争关系的）  渲染出组件 
 class Route extends Component{ 
     render(){ 
         return ( 
             <RouterContext.Consumer> 
                  {/* 这里的context 就是 provider 的value */} 
                 {context=>{ 
                     const location = context.location 
 
                      //根据pathname和用户传递的props获得mach对象 
                     const match = matchPath(location.pathname,this.props) 
 
                      //传递一些参数 
                     const props = {...context,match}; 
 
                      //children > component > render 
                     //3者之间的竞争关系 
                     // 如果 path 匹配url 的情况： component 和 render 都会执行 
                     // 但是children 是匹不匹配 都会执行 
 
                     let {children , component , render } = this.props 
                     if(children && typeof children === 'function'){ 
                          children = children(props) 
                     } 
 
                     return ( 
                          // 提高上下文的优先级；从里往外找；把更新过得props三兄弟传给Context上下文；只是Provider 的value，之前的value改变不了 
                          <RouterContext.Provider value={props}> 
                              { 
                                 children  // children 优先级最高，无论匹配与否都执行 
                                 ?children 
                                         :props.match  // 后面的component和render必须匹配 
                                         ?component //若匹配首先查找component 
                                                 ?React.createElement(component) // 若它存在渲染之 
                                                     :render // 若render选项存在 
                                                     ?render(props) // 按render渲染结果 
                                                     :null 
                                         :null 
                             } 
                          </RouterContext.Provider> 
                     ) 
                 }} 
             </RouterContext.Consumer> 
         ) 
     } 
 } 
 
 class Link extends React.Component {   
     handleClick(event, history) {     
         event.preventDefault();     
          history.push(this.props.to);    
     } 
     render() {     
         const { to, ...rest } = this.props; 
         return ( 
             <RouterContext.Consumer>         
         {/* match location history */} 
                  {context => {           
                     return (             
                     <a   
                         {...rest}               
                         onClick={event => this.handleClick(event, context.history)}               
                         href={to}             
                     >               
                         {this.props.children}            
                     </a>           
                     );         
                 }}        
             </RouterContext.Consumer>     
         );   
     } 
 } 
 
 export class MyRouterTest extends Component { 
     render() { 
         return ( 
             <BrowserRouter> 
                 <Link to="/foo">foo</Link> 
                 <Link to="/bar">bar</Link> 
                  <Link to="/mua/abc">mua</Link> 
                 <Route path='/foo' component={(props)=><div>foo</div>}></Route> 
                 <Route path='/bar' component={(props)=><div>bar</div>}></Route> 
                  <Route path="/mua/:ns" render={({ match }) => match.params.ns} /> 
                  <Route children={ 
                     //函数 数组 jsx 
                     ({location})=> 'xxx' 
                 }></Route> 
             </BrowserRouter> 
         ) 
     } 
 } 
 
 export default MyRouterTest
```
