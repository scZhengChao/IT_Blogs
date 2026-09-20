# 完整方案

## 目录

- [背景](#背景)
- [已知方案](#已知方案)
- [方案探索](#方案探索)
  - [方案一](#方案一)
    - [patchRoutes](#patchRoutes)
    - [render(oldRender: Function)](#renderoldRender-Function)
    - [实际流程](#实际流程)
  - [方案二](#方案二)
    - [第一次render](#第一次render)
    - [默认/常规登录鉴权](#默认常规登录鉴权)
    - [第二次render](#第二次render)
- [收益](#收益)
- [最终方案](#最终方案)

# **背景**

房产系统需要做一个权限路由的需求；颗粒度到路由菜单级别

# 已知方案

已知其他项目的方案：

1.ebee的模板基础上：在 umi 提供的路由拦截wrapper 下；识别code 做一个登录跳转

2.拿到jwtToken后；请求登录权限接口 （或者权限接口和登录的接口二合一）

3.拿到登录用户的权限；过滤菜单树；封装权限组件（颗粒度到模块级别）

优点：

1. 比较灵活；自由

缺点:

1. 并没有真正对前端路由做处理；仅屏蔽了页面的菜单入口；对通过地址栏输入的场景；需要另外的处理拦截；（或者业务同学可以接受只屏蔽菜单入口）

# 方案探索

## 方案一

核心：umi提供的运行时配置：**patchRoutes 和 patchRoutes**

### **patchRoutes**

修改路由

```javascript 
export function patchRoutes({ routes }) {
  routes.unshift({
    path: '/foo',
    exact: true,
    component: require('@/extraRoutes/foo').default,
  });
}
```


### **render(oldRender: Function)**

比如用于渲染之前做权限校验，

```javascript 
import { history } from 'umi';
export function render(oldRender) {
  fetch('/api/auth').then(auth => {
    if (auth.isLogin) { oldRender() }
    else { 
      history.push('/login'); 
      oldRender()
    }
  });
}
```


### **实际流程**

```javascript 
export function render(oldRender: Function) {
  // 登录校验
  loginAuth(() => {
    // 动态路由
    fetchAuthCode().then(() => {
      // 进入页面渲染流程
      oldRender();
    });
  }).catch((err) => {
    console.error(err.message);
  });
}
```


优点：

1. 操作了路由；没有权限的路由；即使通过地址栏输入也进不去
2. 一般系统路由菜单均由前端控制；后端几乎不涉及；该方案可以支持前后端生成路由；方便修改菜单排序等

2\. 逻辑条理比较清晰顺畅： 登录==>权限==>进入业务系统

缺点：

1. 在oldRender 执行前；系统流程是阻塞的；不能进行别的操作；只能等待鉴权完成后；进入业务系统；
2. 在阻塞期间；页面会出现短暂的白屏；登录和权限接口二合一大概800ms耗时；登录和权限接口串联的情况下；根据接口耗时而定 （二合一的情况下：开发环境下demo表现良好）

## 方案二

1. 在默认的方案基础上（已知方案）；完成登录和权限的请求；
2. 储存登录和权限信息到session
3. 主动刷新页面；reload（false）尽可能从浏览器缓存刷新；不强制浏览器从服务器请求资源
4. 重新进入**render**==> **patchRoutes > 进入业务系统**

### 第一次render

```javascript 
export function render(oldRender: Function) {
  // 直接进入页面渲染流程；不做鉴权
  oldRender();
}

// 修改路由
export function patchRoutes({ routes }: { routes: IRoute[] }) {
  const InitRoute = routes[3]?.routes;
  // 没有权限信息  不做处理
}
```


### 默认/常规登录鉴权

```javascript 
// wrappers
  useMount(async () => {
    // 登录；并获取权限信息；储存到session
    loginAuth(async () => {
      // 刷新 重新进入patchRoute 流程
      if (isReload) {
        if (code) {
          location.href = nav?.[0]?.routes?.[0]?.key || '/';
        } else {
          location.reload();
        }
    });
  })
```


### 第二次render

```javascript 
export function render(oldRender: Function) {
  // 直接进入页面渲染流程；不做鉴权
  oldRender();
}

// 修改路由
export function patchRoutes({ routes }: { routes: IRoute[] }) {
  const InitRoute = routes[3]?.routes;
  // 从session 中拿到 权限信息
  window.sessionStorage.getItem(AppConstant.AUTH_ROLE_CODE);
  // 修改路由

}
```


优点：

1. 自由灵活；没有阻塞；且有兜底loadding展示
2. 操作了路由；没有权限的路由；即使通过地址栏输入也进不去
3. 一般系统路由菜单均由前端控制；后端几乎不涉及；该方案可以支持前后端生成路由；方便修改菜单排序等

缺点：

1. 在登录操作结束后；需要一个reload 操作；

# 收益

真正的操作了路由；动态路由；自由灵活；方便修改

目前的方案；路由菜单可由前后端共同生成；根据业务需要；可以方便的对路由菜单进行鉴权、修改、排序等；

收益大于风险

# 最终方案

经探索： 最终采用方案一：\*\* 配合document.ejs 添加Loadding 的方案；目前来说比较完美的解决的现有问题；符合预期；\*\*

```html 
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>房产管理</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="google" content="notranslate" />
  <meta http-equiv="Expires" content="0">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Cache-control" content="no-cache">
  <meta http-equiv="Cache" content="no-cache">
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
  <link rel="icon" type="image/x-icon" href="<%= context.config.publicPath %>favicon.ico">

  <style>

    body {
      margin: 0;
    }
    .root-loading-wrapper{
      width:100%;
      height:100%;
      display:flex;
      align-items:center;
    }
    .progress-9 {
      --r1: 154%;
      --r2: 68.5%;
      margin:0 auto;
      width:60px;
      height:60px;
      border-radius: 50%;
      background:
              radial-gradient(var(--r1) var(--r2) at top ,#0000 79.5%,#269af2 80%) center left,
              radial-gradient(var(--r1) var(--r2) at bottom,#269af2 79.5%,#0000 80%) center center,
              radial-gradient(var(--r1) var(--r2) at top ,#0000 79.5%,#269af2 80%) center right,
              #ccc;
      background-size: 50.5% 220%;
      background-position: -100% 0%,0% 0%,100% 0%;
      background-repeat:no-repeat;
      animation:p9 2s infinite linear;
    }
    @keyframes p9 {
      33%  {background-position:    0% 33% ,100% 33% ,200% 33% }
      66%  {background-position: -100%  66%,0%   66% ,100% 66% }
      100% {background-position:    0% 100%,100% 100%,200% 100%}
    }

  </style>
</head>
<body>
  <div id="root">
    <div class="root-loading-wrapper">
      <div class="progress-9"></div>
    </div>
  </div>

</body>
</html>

```


patchRoute

```typescript 
import { history } from 'umi';
import type { IRoute } from 'umi';
import {
  getAuthCode,
  loginCacheHandle,
  loginOutCacheHandle,
} from '@estate/common/utils/sessionCache.util';
import { redirectToSSOLogin } from '@estate/common/utils/sso-login.util';
import { ssoLogin } from '@estate/common/services/login.service';
import { getUserToken } from '@estate/common/utils/sessionCache.util';
import isEmpty from 'lodash/isEmpty';
interface IDefaultRuntimeConfig {
  onRouteChange?: (props: { routes: any; clientRoutes: any; location: any; action: any }) => void;
  patchRoutes?: (props: { routes: any }) => void;
  patchClientRoutes?: (props: { routes: any }) => void;
  render?: (oldRender: () => void) => void;
  rootContainer?: (lastRootContainer: JSX.Element, args?: any) => void;
  [key: string]: any;
}
import { goNoPermission } from '@/utils/navigator.util';
export function composeRouteHandle(routes: IRoute[]) {
  let length = routes.length;
  const authCode = getAuthCode();
  if (!Array.isArray(authCode) || isEmpty(authCode)) {
    return routes;
  }
  while (length--) {
    const item = routes[length];
    if (item.authCode && !authCode.includes(item?.authCode?.[0])) {
      routes.splice(length, 1);
    } else {
      if (item.routes) {
        composeRouteHandle(item.routes);
      }
    }
  }
}
let authCode: string[];
export async function loginAuth(loginCallback: Function) {
  const { code } = history.location.query || {};
  const sessionToken = getUserToken();
  authCode = getAuthCode();
  if (code) {
    const res = await ssoLogin({ code });
    const userInfo = res?.body;
    loginCacheHandle(userInfo);
    loginCallback?.();
  } else {
    // 有登陆信息
    if (sessionToken) {
      // 防止意外手动清除刷新 权限信息 导致页面放开
      if (!Array.isArray(authCode) || isEmpty(authCode)) {
        loginOutCacheHandle();
        redirectToSSOLogin();
        return;
      }
      loginCallback?.();
    } else {
      redirectToSSOLogin();
    }
  }
}
export function patchRoutes({ routes }: { routes: IRoute[] }) {
  const InitRoute = routes?.find?.((item) => item.path === '/')?.routes;
  composeRouteHandle(InitRoute);
}
const routeWhiteList = ['/', '/error', '/404', '/example', '/NoPermission'];
export function onRouteChange({ matchedRoutes = [], location }: IDefaultRuntimeConfig) {
  let authNum: string = '';
  matchedRoutes.forEach((matchedRoute: { route: IRoute }) => {
    if (matchedRoute.route?.authCode) {
      authNum = matchedRoute.route?.authCode[0];
    }
  });
  if (!routeWhiteList.includes(location.pathname) && (!authNum || !authCode.includes(authNum))) {
    goNoPermission();
  }
}
export function render(oldRender: Function) {
  // 登录校验
  loginAuth(() => {
    oldRender();
  }).catch((err) => {
    console.error(err.message);
  });
}

```
