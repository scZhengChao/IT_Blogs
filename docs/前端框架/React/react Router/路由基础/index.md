# 路由基础

## 目录

- [api](#api)
- [基础路由](#基础路由)
- [插槽](#插槽)
- [404](#404)
- [嵌套](#嵌套)

# api

```纯文本 
react路由 4.x
    资料：
        API: https://reacttraining.com/react-router/web/guides/quick-start 
        CN： http://blog.csdn.net/sinat_17775997/article/details/77411324  
        redux：https://github.com/reacttraining/react-router/tree/master/packages/react-router-redux
    区别：
        V4
             嵌套式路由（路由配置在组件内部），动态路由，包容性（多路由渲染） 
             舍去了路由钩子 
        V3
            分离式（ 统一位置配置），静态路由，排他性（只有一个路由被渲染 ）  类似vue3的路由 
    理念：
        遵循Just Component的 API 设计理念 万物皆组件，路由规则位于布局和 UI 本身之间
         react-router中奉行一切皆组件的思想，路由器-Router、链接-Link、路由-Route、独占-Switch、重定向Redirect都以组件形式存 在

    安装引入 react-router-dom

    React Router
      被拆分成三个包：react-router,react-router-dom和react-router-native。
      react-router提供核心的路由组件与函数。其余两个则提供运行环境（即浏览器与react-native）所需的特定组件

    history/hash
        BrowserRouter 使用 HTML5 提供的 history             API 来保持 UI 和 URL 的同步
        HashRouter 使用 URL 的 hash (例如：window.location.hash) 来保持 UI 和URL 的同步
  
    结构：
         BrowserRouter | HashRouter  路由对象
            router
                根组件(App)|其他组件
                    NavLink|Link  导航
                    Route    匹配+展示
                    Redirect 跳转
                    404 <Redirect to="/error"/>
                    默认路由 <Route exact path={match.path} render={fuc}
    Route 属性
         path （string）: 路由匹配路径。（没有path属性的Route 总是会 匹配）；
         exact （bool）：
            为true时，要求全路径|严格匹配(/home)。V4 的路由默认为“包含|模糊”的(/和/home都匹配)，这意味着多个 <Route> 可以同时进行匹配和渲染

         component ：在地址匹配的时候React的组件才会被渲染，route props也会随着一起被渲染
         render ：这种方式对于内联渲染和包装组件却不引起意料之外的重新挂载特别方便
     Link ：
        to：string/object：要跳转的路径或地址；
     NavLink ：是<Link> 的一个特定版本
        activeClassName（string）：设置选中样式，默认值为 active；
        activeStyle（object）：当元素被选中时, 为此元素添加样式；
     Switch ：该组件用来渲染匹配地址的第一个<Route>或者<Redirect>，仅渲染一个路由，排他性路由,默认全匹配(场景：侧边栏和面包屑，引导选项卡等
     Redirect :
        <Redirect from='/' to='/home'/> 总是会被重定向
    404:    <Route component={Error}/> 总是会匹配

    参数数据：{history,location,match}==props
        传递：
             to={match.url+'/001'} 
             to={`${match.url}/002?a=1&b=2`} 
             to={{pathname:match.url+'/003',search:'?a=11&b=12',hash:'#a1'}} 
            <Route path={match.path+'/:aid'} component={Detail}
                注意：
                    url - (浏览器 URL 中的实际路径) URL 匹配的部分。 用于构建嵌套的 <Link>
                    path - (路由编写的路径) 用于匹配路径模式。用于构建嵌套的 <Route>
        接收：
             接参数:{match.params.aid} 
             接数据:{location.search} 
             接地址:{location.pathname} 
        注意：
            无法从v4 中获取 URL 的查询字符串了。因为没有关于如何处理复杂查询字符串的标准。
            所以，作者让开发者去选择如何处理查询字符串。推荐query-string库
    跳转：
        history.push('/user?a=1&b=2')
        history.push({pathname:'/user',search:'?a=11&b=22'})
        history.replace({pathname:'/user',search:'?a=111&b=222'})
        history.go(-1)
        
  querystring
        querystring.parse()/querystring.stringify() 
```


# 基础路由

```纯文本 
 路由 
 <nav> 
     <NavLink activeClassName="app-router-active" to="/home">首页</NavLink> 
     <NavLink activeClassName="app-router-active" to="/product">product</NavLink> 
     <NavLink activeClassName="app-router-active" to="/user">user</NavLink> 
     <NavLink activeClassName="app-router-active" to="/login">login</NavLink> 
     <NavLink activeStyle={{background:'#399'}} to="/reg">reg</NavLink> 
 </nav> 
 <Switch> 
     <Route path="/home" component={Home} /> 
     <Route path="/product" component={Product} /> 
     <Route path="/user" component={User} /> 
     <Route path="/login" component={Login} /> 
     <Route path="/reg" component={Reg} /> 
     <Redirect exact from="/" to="/home" /> 
     {/*<Route path="**" component={Error} />*/} 
     <Route component={Error} /> 
 </Switch>
```


```纯文本 
 子路由 
 <div className="Product"> 
     <h3>Product</h3> 
     <Link to="/product/detail/1?a=1&b=2">001</Link> 
     <Link to={match.url+'/detail/2?a=11&b=22'}>002</Link> 
     <Link to={{pathname:match.url+'/detail/3',search:'?a=111&b=222'}}>003</Link> 
     <Link to={{pathname:match.url+'/detail/4',search:querystring.stringify({a:1111,b:2222})}}>004</Link> 
     {/*<Route path="/product/detail/:id" component={Detail} />*/} 
     <Route path={match.path+'/detail/:id'} component={Detail} /> 
 </div> ------------------------------------------------------------------------------------------- 
     this.props.history.push({pathname:'/product/detail/5',search:'?a=11111&b=22222',hash:'#title'})
```


```纯文本 
 基本使用和动态路由 
 function ProductList(){ 
     return ( 
         <div> 
             <h3>ProductList</h3> 
             <Link to='/detail/web'>react router </Link> 
         </div> 
     ) 
 } 
 function ProductMgt(props){ 
     return ( 
         <h3>ProductMgt</h3> 
     ) 
 } 
 
 function Detail({match,history,location}){ 
      //match  相关的匹配规则和传参 
     //类似vue   编程式导航 
     //location  传多个参数时可以向state赋更复杂的值；对当前url的一个抽象 
     console.log(match,history,location) 
     return ( 
         <div> 
             <h3>Detail</h3> 
             {match.params.name} 
             <button onClick={history.goBack}>后退</button> 
         </div> 
     ) 
 } 
 <BrowserRouter> 
     <nav> 
         <Link to='/'>商品列表</Link> 
         <Link to='/management'>商品管理</Link> 
     </nav> 
 
 
     {/* 排他性；唯一匹配 */} 
     <Switch> 
         {/* 路由配置 */} 
         {/* react-router匹配不是独占的； */} 
         <Route exact path='/' component={ProductList}></Route> 
         <Route exact path='/management' component={ProductMgt}></Route> 
         <Route exact path='/detail/:name' component={Detail}></Route> 
     </Switch> 
      
 </BrowserRouter>
```


# 插槽

```纯文本 
子路由使用父路由的展示区(插槽) 
     <Route path="/a" render={()=> 
         <div> 
             <Switch> 
                 <Route path="/a/b" component={b} 
                 <Route path="/a/c" component={c} 
                 <Route path="/a" component={a} 
             </Switch> 
         </div> 
     >
```


# 404

```纯文本 
 404 
 
 <Route component={() => <h3>页面不存在</h3>}></Route> ； 记住加上switch ；因为没有path 他会匹配所有的路劲；放在最后
```


# 嵌套

```纯文本 
嵌套：（当发生嵌套时：不能精确匹配） 
 
function ProductList(){
    return (
        <div>
            <h3>ProductList</h3>
            <Link to='/detail/web'>react router </Link>
        </div>
    )
}
function ProductMgt(props){
    return (
        <div>
            <h3>ProductMgt</h3>
            {/* 最重要的体现出来了；router 即 router-view；更加简单的嵌套；一切皆组件;非常直观的嵌套 即写即用*/}
            <Link to='add'>新增</Link>
            <Link to='/management/searce'>搜索</Link>
            {/* path='add'  不行*/}
             <Route  path='/management/add' component={()=><div>add</div>}></Route> 
             <Route  path='/management/searce' component={()=><div>search</div>}></Route> 
             {/* 利用redirect 做一个默认展示 */} 
             <Redirect to='/management/add'></Redirect> 
        </div>
    )
}

function Detail({match,history,location}){
    console.log(match,history,location)
    return (
        <div>
            <h3>Detail</h3>
            {match.params.name}
            <button onClick={history.goBack}>后退</button>
        </div>
    )
}


class RouterTest extends PureComponent {
    render() {
        return (
      <BrowserRouter>
        <nav>
            <Link to='/'>商品列表</Link>
            <Link to='/management'>商品管理</Link>
        </nav>
    
    
        {/* 排他性；唯一匹配 */}
        <Switch>
            {/* 路由配置 */}
            {/* react-router匹配不是独占的； */}
             <Route exact path='/' component={ProductList}></Route> 
             <Route  path='/management' component={ProductMgt}></Route> 
             <Route  path='/detail/:name' component={Detail}></Route> 
        </Switch>
        
    </BrowserRouter>
        )
    }
}
```


上面是模糊匹配；都匹配到了；改为精确匹配

```纯文本 
function ProductMgt(props){
    return (
        <div>
            <h3>ProductMgt</h3>
            {/* 最重要的体现出来了；router 即 router-view；更加简单的嵌套；一切皆组件;非常直观的嵌套 即写即用*/}
            <Link to='add'>新增</Link>
            <Link to='/management/searce'>搜索</Link>
            {/* path='add'  不行*/}
            <Route  exact path='/management/add' component={()=><div>add</div>}></Route>
            <Route exact path='/management/searce' component={()=><div>search</div>}></Route>
            {/* 利用redirect 做一个默认展示 */}
            <Redirect to='/management/add'></Redirect>
        </div>
    )
}


```


[路由传参](./路由传参/index.md "路由传参")
