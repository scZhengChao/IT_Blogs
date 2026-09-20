# 路由传参

## 目录

- [params](#params)
  - [路由配置](#路由配置)
  - [路由跳转与获取路由参数](#路由跳转与获取路由参数)
- [search传参](#search传参)
  - [路由配置](#路由配置)
  - [路由跳转与获取路由参数](#路由跳转与获取路由参数)
- [state传参🙌](#state传参)
  - [路由配置](#路由配置)
  - [路由跳转与获取路由参数](#路由跳转与获取路由参数)
- [query传参](#query传参)
- [总结](#总结)

## params

优点：**刷新页面，参数不丢失**

缺点：1.**只能传字符串，传值过多url会变得很长** 2. **参数必须在路由上配置**

#### 路由配置

```javascript 
{ path: '/detail/:id/:name', component: Detail },

```


#### 路由跳转与获取路由参数

```javascript 
import { useHistory,useParams } from 'react-router-dom';
const history = useHistory();
// 跳转路由   地址栏：/detail/2/zora
history.push('/detail/2/zora')
// 获取路由参数
const params = useParams()  
console.log(params) // {id: "2",name:"zora"}

```


## search传参

优点：**刷新页面，参数不丢失**

缺点：只能传字符串，传值过多url会变得很长，获取参数需要自定义hooks

#### 路由配置

```javascript 
{ path: '/detail', component: Detail },

```


#### 路由跳转与获取路由参数

```javascript 
import { useHistory } from 'react-router-dom';
const history = useHistory();
// 路由跳转  地址栏：/detail?id=2
history.push('/detail?id=2')  
// 或者
history.push({pathname:'/detail',search:'?id=2'})

/**
* 自定义hooks用于获取路由参数
* IE11及以下浏览器 不支持浏览器内置的URLSearchParams API
**/
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const query = useQuery()
const id = query.get('id') //2

/**
    自定义hooks
*/
import { useLocation } from 'react-router-dom';
import qs from 'query-string';

export function useQuery<T = any>(): T {
  const { search } = useLocation();
  return (qs.parse(search) as unknown) as T;
}
const query = useQuery<IRouteQuery>();
const {id} = query

```


## state传参🙌

> 特点：
> 1、BrowserRouter(history)模式下，刷新页面参数**不消失**，参数不会在地址栏显示，因为`state`保存在`history`对象中
> 2、HashRouter(hash)模式下，刷新页面参数**消失**！！！参数不会在地址栏显示

优点：**可以传对象,函数**

缺点： `<HashRouter>`**刷新页面，参数丢失**

#### 路由配置

```javascript 
{ path: '/detail', component: Detail },

```


#### 路由跳转与获取路由参数

```javascript 
import { useHistory,useLocation } from 'react-router-dom';
const history = useHistory();
const item = {id:1,name:"zora"}
// 路由跳转
history.push(`/user/role/detail`, { id: item });
// 参数获取
const {state} = useLocation()
console.log(state)  // {id:1,name:"zora"}


```


**重点**`<HashRouter>` 不支持 `location.key` 与 `location.state`，`<HashRouter>`通过`state`传递参数，刷新页面后参数丢失，官方建议使用`<BrowserRouter>`，`<BrowserRouter>`页面刷新参数也不会丢失。

# query传参

> 特点：**刷新页面参数消失**，参数不会在地址栏显示，可以传对象

**路由配置**

```javascript 
<Route exact path="/index/demo3" component={Demo3} />

```


**跳转方式**

```javascript 
// html:
<Link to={{ pathname: '/index/demo3', query: { id: 1 } }}>demo3</Link>
// js:
this.props.history.push({ pathname: '/index/demo3', query: { id: 1 } })

```


**获取值**

```javascript 
this.props.location.query.id
```


# 总结

你可能在不同的情况，使用不同的传递方式

- state传参：`BrowserRouter(history)`模式下，刷新页面不消失；而`HashRouter(hash)`模式下，刷新页面会消失，但都不会暴露在`url`中
- `query`传参：虽然不会暴露在url中，但刷新页面会消失
- `params`传参（动态路由）：可读性高，便于维护，当另一个页面一定需要某数据时，推荐使用
- `search`传参：会暴露在url中，刷新页面不会消失，但取数据时，需处理

[模拟路由传参](./模拟路由传参/index.md "模拟路由传参")
