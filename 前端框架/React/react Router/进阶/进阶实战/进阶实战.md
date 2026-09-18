# 进阶实战

## 目录

- [一：导航](#一导航)
  - [1.1  Link  NavLink](#11-Link-NavLink)
  - [1.2 接收参数： ](#12-接收参数-)
- [封装route](#封装route)

[ React-router5.x 路由的使用及配置 - Mr.曹 - 博客园 在 React router 中通常使用的组件有三种： 路由组件（作为根组件）: BrowserRouter（history模式） 和 HashRouter（hash模式） 路径匹配组件: Route https://www.cnblogs.com/cckui/p/11490372.html](https://www.cnblogs.com/cckui/p/11490372.html " React-router5.x 路由的使用及配置 - Mr.曹 - 博客园 在 React router 中通常使用的组件有三种： 路由组件（作为根组件）: BrowserRouter（history模式） 和 HashRouter（hash模式） 路径匹配组件: Route https://www.cnblogs.com/cckui/p/11490372.html")

# 一：导航

## **1.1  Link  NavLink**

参考

[React  Router中Link和NavLink的学习总结\_冰雪为融的博客-CSDN博客\_react router-link Link现在，我们应用需要在各个页面间切换，如果使用锚点元素实现，在每次点击时，页面被重新加载，React Router提供了\&amp;lt;Link\&amp;gt;组件用来避免这种状况发生。当 你点击\&amp;lt;Link\&amp;gt;时，url会更新，组件会被重新渲染，但是页面不会重新加载嗯、先看个例子import {Link} from 'react-router-dom';const  https://blog.csdn.net/lhjuejiang/article/details/80366839](https://blog.csdn.net/lhjuejiang/article/details/80366839 "React  Router中Link和NavLink的学习总结_冰雪为融的博客-CSDN博客_react router-link Link现在，我们应用需要在各个页面间切换，如果使用锚点元素实现，在每次点击时，页面被重新加载，React Router提供了\&amp;lt;Link\&amp;gt;组件用来避免这种状况发生。当 你点击\&amp;lt;Link\&amp;gt;时，url会更新，组件会被重新渲染，但是页面不会重新加载嗯、先看个例子import {Link} from 'react-router-dom';const  https://blog.csdn.net/lhjuejiang/article/details/80366839")

```react tsx 

<Link  
    to={{
      pathname: '/lazyload',
      search: '?sort=name',
      hash: '#the-hash',
      state: { fromDashboard: true }
  }} 
    className='test'
>
 lazyload
</Link> 

<NavLink 
  activeStyle={{
      fontWeight: 'bold',
      color: 'red'
  }}
  to='/store'
  exact={true}
  activeClassName={styles.activeRouter}
  isActive={()=>window.open('https://www.baidu.com')}
  strict={true}
>store</NavLink>
```


- activeClassName(string)：设置选中样式，默认值为active
- activeStyle(object)：当元素被选中时，为此元素添加样式
- exact(bool)：为true时，只有当导致和完全匹配class和style才会应用
- strict(bool)：为true时，在确定为位置是否与当前URL匹配时，将考虑位置pathname后的斜线
- isActive(func)判断链接是否激活的额外逻辑的功能

## 1.2 接收参数：&#x20;

```react tsx 
const { match , history , location，staticContext }  = this.props 
```


只是在路由的组件上存在；其他组件没有这些参数

# 封装route

```react 
const dynamicWrapper = (app, models, component) => {
  // register models
  models.forEach(model => {
    if (modelNotExisted(app, model)) {
      // eslint-disable-next-line
      app.model(require(`../models/${model}`).default);
    }
  });

  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    return props => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  return Loadable({
    loader: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then(raw => {
        const Component = raw.default || raw;
        return props =>
          createElement(Component, {
            ...props,
            routerData: routerDataCache,
          });
      });
    },
    loading: () => {
      return <Spin size="large" className="global-spin" />;
    },
  });
};
```
