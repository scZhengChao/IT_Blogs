# rouert 6+

## 目录

- [router 6+](#router-6)
  - [Routes](#Routes)
  - [Navigate](#Navigate)
  - [NavLink](#NavLink)
  - [useRoutes](#useRoutes)
  - [嵌套路由](#嵌套路由)
    - [默认子路由](#默认子路由)
  - [路由传参](#路由传参)
  - [编程式导航](#编程式导航)
  - [获取当前页路径](#获取当前页路径)
  - [访问当前的 URL 参数](#访问当前的-URL-参数)

# router 6+

## Routes

- 代替Switch组件,不会向下匹配
- 用来包裹Route

```react 
        <Routes>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/about' element={<About />} caseSensitive={false} />
        </Routes>
 
        <Route path='/user'>
            <Route index element={<h1>user~</h1>} />
        </Route>
```


## Navigate

- 用来代替Redirect组件
- replace属性 跳转模式 "PUSH" | "REPLACE"
- 只要这个组件一渲染就会发生跳转

```react 
 <Routes>
      <Route path='/home' element={<Home />}></Route>
      <Route path='/about' element={<About />} caseSensitive={false} />
      <Route path='*' element={<Navigate to='/home' />} />
    </Routes>
```


## NavLink

- className，自定义激活时的样式名 可以为字符串或者函数
- end 匹配子路由时是否高亮
- caseSensitive 代表匹配路径时是否区分大小写

## useRoutes

用来管理路由表，相比v5，可能需要借助一些第三方库来实现路由config管理，现在v6版本自带

```react 
const routes = useRoutes([
    {
      path: '/home',
      element: <Home />
    },
    {
      path: '/about',
      element: <About />
    },
    {
      path: '*',
      element: <Navigate to='/home' />
    },
    {
      path: '/user',
      children: [
         {
          index: true,
          element: <h1>user~</h1>  // 这种不属于嵌套路由，这里面children会防到父亲的位置，所以不需要配合Outlet组件使用 
        } 
      ]
    }
  ])


```


## 嵌套路由

嵌套路由一般是配合 Outlet 组件使用，此组件类似于Vue的router-view组件，告知子路由应该渲染在什么位置

```react 
{
      path: '/home',
       element: <Home />, // 这种才属于嵌套路由
       children: [
        {
          path: 'message',
          element: <Message />
        },
        {
          path: 'article',
          element: <Article />
        }
      ]
}
```


在Home组件中使用\<Outlet/>才能渲染子路由

```react 
 <div style={{ marginTop: '48px' }}>
        <div className='nav'>
          <div className='nav-item'>
            <NavLink to='/home/message'>message</NavLink>
          </div>
          <div className='nav-item'>
            <NavLink to='/home/article'>article</NavLink>
          </div>
          <div style={{ marginTop: 36 }}>
            <Outlet />
          </div>
        </div>
      </div>


```


### 默认子路由

```javascript 
import React from "react";
import loadable from "@loadable/component";
import {Navigate,} from "react-router-dom";

import Loading from  '../components/Loading'
const  Home = loadable(()=>import("../views/home"),{ fallback: <Loading /> }) ;
const  VirtualList = loadable(()=>import("../views/flatlist"),{ fallback: <Loading /> }) ;
const  VariableSizeList = loadable(()=>import("../views/VariableSizeList"),{ fallback: <Loading /> }) ;
import {
    AndroidOutlined,
    DingdingOutlined,
    SkypeOutlined,
    AlipayOutlined,
} from '@ant-design/icons';
import {Outlet} from "react-router-dom";

export const silderMenus:any[]=[
    {
        path:'/home',
        element: <Home/>,
        icon:<AndroidOutlined/>,
        key:'/home',
        label:'home',
    },
    {
        path: '/list',
         element: <Outlet/>, 
        icon:<DingdingOutlined />,
        key:'/list',
        label:'列表',
        children: [
            {
                path: '/list/virtualList',
                element: <VirtualList />,
                icon:<SkypeOutlined />,
                key:'/list/virtualList',
                label:'定长列表'
            },
            {
                path: '/list/variableSizeList',
                element: <VariableSizeList />,
                icon:<AlipayOutlined />,
                key:'/list/variableSizeList',
                label:'不定长列表'
            },
             {
                path: "",
                element: <Navigate to="/list/virtualList" replace />
            }
         ]
     },
    {
        path: "",
        element: <Navigate to="home" replace />
    }
]
 








// 意思就是匹配/ 再往子路有匹配的时候；如果前面都没有匹配到；总是会匹配到path 为空；

   import React from 'react';
import {useRoutes,Navigate,} from "react-router-dom";
import loadable from "@loadable/component";
import Loading from  '../components/Loading'
import { silderMenus} from './menu'
const  NavLayout = loadable(()=>import("../views/NavLayout"),{ fallback: <Loading /> }) ;
const NotFound = loadable(()=>import('../views/Warnning/NotFound'),{fallback:<Loading/>})
const routerConfig:any=[
    {
        path: '/',
        element: <NavLayout />,
        children:[
            ...silderMenus,
        ]
    },
    {
        path:'/user',
        children: [
            {
                index:true,
                element: <h1>user~</h1> // 这种不属于嵌套路由，这里面children会防到父亲的位置，所以不需要配合Outlet组件使用
            }
        ]
    },
    {
        path: '*',
        element: <NotFound/>
    },

]



function IndexRouter() {
    const routes = useRoutes(routerConfig)
    return routes

}
export default IndexRouter;


```


## 路由传参

- params传参（useParams）
- search参数传参（useSearchParams）
- state传参 (useLocation，获取v5版本的location对象，如果直接输入可能state为null)

## 编程式导航

useNavigate

```react 
const navigate = useNavigate()
navigate('detail3', {
  state: {
    id: *item*.id,
    content: *item*.content,
    title: *item*.title
  }
})
<button *onClick*={() => navigate(-1)}>back</button> 返回上一页
<button *onClick*={() => navigate(1)}>go</button> 前进

```


## 获取当前页路径

首先我们导入 `useLocation` 这个 hook，然后仿照如下代码就可以获得当前位置

```javascript 
import { useLocation } from 'react-router-dom'

const About = () => {
  // 使用 hook
  const location = useLocation();
  const { from, pathname,search } = location

  return <div>这里是卡拉云的网站，你当前在 {pathname}，你是从 {from} 跳转过来的</div>
}

```


## 访问当前的 URL 参数

```javascript 
import { Routes, Route, useParams } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="blog/:id" element={<BlogPost />} />
    </Routes>
  );
}

function BlogPost() {
  // You can access the params here...
  const { id } = useParams();
  return (
    <>
      <PostHeader />
      {/* ... */}
    </>
  );
}

function PostHeader() {
  // or here. Just call the hook wherever you need it.
  let { id } = useParams();
}
```
