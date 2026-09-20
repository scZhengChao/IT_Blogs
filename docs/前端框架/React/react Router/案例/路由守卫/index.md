# 路由守卫

## 目录

- [前置守卫](#前置守卫)
  - [usage](#usage)
  - [实现](#实现)
- [后置路由](#后置路由)

# 前置守卫

### usage

```typescript 
<AuthRoute path="/user" component={User}/>
```


### 实现

条件：返回一个Route 组件；***Route的render函数内部判断加载目标||Redirect组件***

AuthRoute==授权路由==react组件==自定义路由

- 目标组件    Component == User
- 延展剩余属性 rest
- &#x20;路由信息 ...props User组件需要用到的路由信息

```typescript 
AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props =>
        Math.random()<0.5 ?
          <Component {...props} />
         : <Redirect to="/login" />
      }
    />
)
```


数据预载：
&#x20;           AuthRoute 组件构造器存状态和预载数据
&#x20;           DidMount钩子里异步请求，获取状态和数据
&#x20;               fetch(url).then(result=>this.setState({}))
&#x20;           render钩子返回 Route
&#x20;                \<Route {...rest} render={props => Xxx?\<Component data={预载数据}
&#x20;                if(!this.state.hasAuthed) return null;初始渲染时，未发送认证请求，因此不渲染

```typescript 
//路由守卫核心思想：通过高阶组件包装Route得到一个PrivateRoute
//路由守卫没有vue 那么多封装好的乱七八糟的钩子；
// 小写不能用于组件jsx的渲染
const PrivateRoute = connect(
    state=>({
        isLogin:state.user.isLogin
    })
)(function ({component:Component,isLogin,...rest}){
        return (
            <Route {...rest} render={
                // match,history,location
                props=>isLogin?(
                    <Component/>
                ):(
                    <Redirect to={{
                        pathname:'/login',
                        state:{redirect:props.location.pathname}
                    }}></Redirect>
                )
            }></Route>
        )
    }
)
```


```typescript 
const Login = connect(  state => ({
        isLogin: state.user.isLogin,    
        loading: state.user.loading,    
        error: state.user.error // 登录错误信息  
    }),{ login } )(
    ({ location, isLogin, login, loading, error }) => {
        // 登录错误信息  
        const redi r ect = location.state.redirect || "/";
        console.log(redirect)
         // 若已登陆重定向至redirect    
        if (isLogin) return <Redirect to={redirect} />;
        
         return (    
            <div>      
                <p>用户登录</p>      
                <hr />      
                {/* 显示错误信息 */}      
                {error && <p>{error}</p>}      
                {/* 登录传参 */}      
                <button onClick={() => login('Jerry')} disabled={loading}>{loading ? "登录中..." : "登录"}</button>    
            </div>  
        );
    }   
);
```


```typescript 
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
                  {/* <Route  path='/management' component={ProductMgt}></Route> */}
                  <PrivateRoute path='/management' component={ProductMgt} ></PrivateRoute>
                  <Route  path='/login' component={Login}></Route>
                  <Route  path='/detail/:name' component={Detail}></Route>
                  <Route component={() => <h3>页面不存在</h3>}></Route>
              </Switch>
              
          </BrowserRouter>
        )
    }
}



export default RouterTest
```


# 后置路由

```typescript 
import { Prompt } from 'react-router-dom'
<Prompt
  when={this.state.isBlocking}
  message={location=>{return `未保存，是否去向${location.pathname}`}}
/>
//message: 后面可以跟简单的提示语，也可以跟函数，函数是有默认参数的。
//when: when的属性值为true时防止跳转；
```
