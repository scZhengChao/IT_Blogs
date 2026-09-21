# 图解 history api 和 React Router 实现原理

## 目录

- [总结
  ](#总结)

Router 是开发 React 应用的必备功能，那 React Router 是怎么实现的呢？

今天我们就来读一下 React Router 的源码吧！

首先，我们来学一下 History API，这是基础。

什么是 `history` 呢？

就是这个东西：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/42a07668b5a04a98846f7e07c74f93f4~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

我打开了一个新的**标签页、** 然后访问[baidu.com](http://baidu.com "baidu.com")、[sougou.com](http://sougou.com "sougou.com")、[taobao.com](http://taobao.com "taobao.com")。

长按后退按钮，就会列出历史记录，这就是 history。

现在在这里：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c386c26a93e24dceb11ae48559a8a998~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

history.length 是 5

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ead77bfba912402dadcc569525c7faaa~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

点击两次后退按钮，或者执行两次 history.back()

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/38851702298a42e49100a33290dc471d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

就会回到这里：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5809d049b4194a94b00f572b9668cb3f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

**这时候 ****`history.length`**** 依然是 5**

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a9de2c4ecce3446e9c4e300d0994d957~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

因为前后的 `history`\*\* 都还保留着：\*\* ​

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/48601f171ca24d50a6b8519a4b21c30a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0373372777ce406a94bd9dbd690c6d15~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

除了用 `history.back`、`history.forward` 在 `history` 之间切换外，还可以用 `history.go`

参数值是 delta：

history.go(0) 是刷新当前页面。

history.go(1) 是前进一个，相当于 history.forward()

history.go(-1) 是后退一个，相当于 history.back()

当然，你还可以 history.go(-2)、histroy.go(3) 这种。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c406baaddc14c4991c3feb1c8456506~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

你还可以通过 `history.replaceState` 来替换当前 history：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5531dddacb1b4662b48720a555d42f64~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```css 
history.replaceState({aaa:1}, '', 'https://www.baidu.com?wd=光')

```


第一个参数是 `state`、第二个参数是 `title`，第三个是替换的 `url`。

不过**第二个参数基本都不支持**，`state` 倒是能拿到。

比如我在 [www.baidu.com](https://link.juejin.cn/?target=https://www.baidu.com "www.baidu.com") 那页 replaceState 为一个新的 url：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d38115dfadd4da79fd9a0fef238c907~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

前后 `history` 都没变，**只有当前的变了：**

![](<../assets/图解 history api 和 React Router /image/image_6lVgjvRMnC.webp>)

也就是这样：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/93480a25c8114ffd890125d6976c015d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

当然，你还可以用 `history.pushState` 来添加一个新的 `history`：

```css 
history.pushState({bbb:1}, '', 'https://www.baidu.com?wd=东');

```


![](<../assets/图解 history api 和 React Router /image/image_Jh_Lm4e7cy.webp>)

**但有个现象，就是之后的 history 都没了：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/725dee6a3ec04a65b04c8b0b2692ed0d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/17f2fa076a7b4a6da4134ce4201225ee~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

也就是变成了这样：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/83d4fac1164642e5b9aee039c9cb9eaf~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

为什么呢？

因为你是 history.pushState 的时候，**和后面的 history 冲突了，也就是分叉了：**

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c66631ed532749ae94f755e933b4d8b3~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这时候自然只能保留一个分支，也就是最新的那个。

这时候 history.length 就是 3 了。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/976417f421cf4cfb90b75e8375f67c40~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

至此，`history` 的 `length`、`go`、`back`、`forward`、`pushState`、`replaceState`、`state` 这些 `api` 我们就用了一遍了。

还有个 history.`scrollRestoration` 是用来保留滚动位置的：

有两个值 auto、manual，**默认是 auto，也就是会自动定位到上次滚动位置**，设置为 manual 就不会了。

比如我访问百度到了这个位置：

![](<../assets/图解 history api 和 React Router /image/image_X5ViQA-dc6.webp>)

打开个新页面，再退回来：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/81c76946a45145ce9f6348bc44670e7f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

依然是在上次滚动到的位置。

**这是因为它的 history.scrollRestoration 是 auto**

![](<../assets/图解 history api 和 React Router /image/image_tzpZ5gUh_Y.webp>)

我们把它设置为 `manual` 试试看：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/84ce6448fa4845e9a23e00c444a17c32~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d97fab9b8fbd481ebe295d63cd00a3a5~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这时候**就算滚动到了底部，再切回来也会回到最上面。**

此外，与 `history` 相关的还有个事件：`popstate`

**当你在 history 中****导航时****，****popstate 就会触发****，比如**\*\* history.forwad、histroy.back、history.go。\*\* ​

**但是 history.pushState、history.replaceState 这种并不会触发 popstate。**

![](<../assets/图解 history api 和 React Router /image/image_6G6xwVsbea.webp>)

```css 
history.pushState({aaa:1}, '', 'https://www.baidu.com?#/aaa');

history.pushState({bbb:2}, '', 'https://www.baidu.com?#/bbb');

```


我在 [www.baidu.com](https://link.juejin.cn/?target=http://www.baidu.com "www.baidu.com") 这个页面 pushState 添加了两个 history。

加上导航页一共 4 个：

![](<../assets/图解 history api 和 React Router /image/image_ZrbtxE9gUq.webp>)

然后我监听 popstate 事件：

![](<../assets/图解 history api 和 React Router /image/image_h55hsq-1Vd.webp>)

```javascript 
window.addEventListener('popstate', event => {console.log(event)});

```


执行 `history.back` 和 `history.forward` 都会触发 `popstate` 事件：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a96a0345ac7e4794947af160605c4a94~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

事件包含 state，也可以从 target.location 拿到当前 url

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/14b32daa37ab417db6a4eca10331555f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

但是当你 `history.pushState、history.replaceState` 并不会触发它：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a0a77efaaecb4ccd92063736a2f960b1~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

也就是说**添加、修改 history 不会触发 popstate，只有在 state 之间导航才会触发。**

综上，history api 和 popstate 事件我们都过了一遍。

基于这些就可以实现 React Router。

有的同学说，不是还有个 `hashchange` 事件么？

确实，那个就是**监听 hash 变化**的。

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/72990f6c1e68433eb9d49d8ec10c42f7~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1ce77c29812f4ad2b55baa4a62049439~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

基于它也可以实现 router，但很明显，`hashchange` **只能监听 hash 的变化**，而 `popstate` **不只是 **`hash` **变化**，功能更多。
所以用 `popstate` **事件就足够**了。
其实在 react router 里，就**只用到了** `popstate` 事件，没用到 hashchange 事件：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b72fcf6830940e48b3b5a3b091ae479~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/869c225b643842d1a8fb773b6e992c59~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

接下来我们就具体来看下 React Router 是怎么实现的吧。

创建个 react 项目：

```bash 
npx create-react-app react-router-test

```


![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2975b19b12964ad78ec861256b329b2b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

安装 react-router 的包：

```bash 
npm install react-router-dom

```


然后在 index.js 写如下代码：

```javascript 
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";

function Aaa() {
  return <div>
    <p>aaa</p>
    <Link to={'/bbb/111'}>to bbb</Link>
    <br/>
    <Link to={'/ccc'}>to ccc</Link>
    <br/>
    <Outlet/>
  </div>;
}

function Bbb() {
  return 'bbb';
}

function Ccc() {
  return 'ccc';
}

function ErrorPage() {
  return 'error';
}

const routes = [
  {
    path: "/",
    element: <Aaa/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "bbb/:id",
        element: <Bbb />,
      },
      {
        path: "ccc",
        element: <Ccc />,
      }    
    ],
  }
];
const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);

```


通过 react-router-dom 包的 createBrowserRouter 创建 router，传入 routes 配置。

然后把 router 传入 RouterProvider。

有一个根路由 /、两个子路由 /bbb/:id 和 /ccc

把开发服务跑起来：

```javascript 
npm run start

```


测试下：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/40b9b376320747ae8da5eef83e5c6b43~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

子路由对应的组件在 \<Outlet/> 处渲染。

当没有**对应路由的时候，会返回错误页面：**

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/22938755e032405bb192b579294f3ea5~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

那它是怎么实现的呢？

我们断点调试下：

![](<../assets/图解 history api 和 React Router /image/image_OPLvDsHS76.webp>)

创建调试配置文件 `launch.json`，然后创建 `chrome` 类型的调试配置：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/63ff3adf3f054976b54babde161c8b05~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

在 `createBrowserRouter` 的地方打个断点：

![](<../assets/图解 history api 和 React Router /image/image_aYjPSRWvYB.webp>)

点击 debug：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2047dcfbb0194d1f85bbc6250f3265cb~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

代码会在这里断住：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4aa8c88cc84547e0940b6d54256bc8ed~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

点击 step into 进入函数内部：

它调用了 createRouter：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/834ae2622494470b9183f0233808c647~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这里传入了 `history`。

这个不是原生的 `history api`，而是包装了一层之后的：

关注 `listen`、`push`、`replace`、`go` 这 4 个方法就好了：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/769530049c7a4f8aa11392b2e4b38b05~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d4751dd7b55d4696bb04c89e71dc04e5~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

`listen` 就是监听 `popstate` 事件。

而 `push`、`replace`、`go` 都是对 `history` 的 `api` 的封装：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/79cc7fd4fceb4547ab975f226f165f3b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/89acfeabb9204c4a82e77a4f06808fcd~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

此外，`history` 还封装了 `location` 属性，不用自己从 `window` 取了。

然后 `createRouter` 里会对 `routes` 配置和当前的 `location` 做一次 `match`：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/57ac03407bd044a29a57d35b39a701a1~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3d398cb558bd4230a08d71c67e161446~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

`matchRoutes` 会把**嵌套路由拍平**，然后和 `location` 匹配：

![](<../assets/图解 history api 和 React Router /image/image_K5E1Y7VhTX.webp>)

然后就匹配**到了要渲染的组件以及它包含的子路由：**

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c54cbc07d74b40c088b608312082ae34~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这样当组件树渲染的时候，就知道渲染什么组件了：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ef6c603eeb6d47cebee75f31c0ee068e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

就是把 `match `的这个结果渲染出来。

这样就完成了路由对应的组件渲染：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c17014ac2ee04873b289e0ab767cf1b3~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

也就是这样的流程：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/63628d1c38924740af562ae3e3ac5125~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

当点击 link 切换路由的时候：

![](<../assets/图解 history api 和 React Router /image/image__uSW3me-Co.webp>)

会执行 navigate 方法：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f773621a1d894bed897cb1dd63758a8b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/643710d88a2e481dad8315782856f2e2~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

然后又到了 matchRoutes 的流程：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0003ef65fe9a4b45b3bb2e23bf27b6fc~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

match 完会 `pushState` 或者 `replaceState` 修改 `history`，然后更新 state：

![](<../assets/图解 history api 和 React Router /image/image_Mvhl1BHuyI.webp>)

然后触发了 `setState`，组件树会重新渲染：

![](<../assets/图解 history api 和 React Router /image/image_DkfGR11DMg.webp>)

![](<../assets/图解 history api 和 React Router /image/image_rI2SDrKB6W.webp>)

也就是这样的流程：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6b97c9824f7348dfaa9e6529666b9c48~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

`router.navigate` 会传入新的 `location`，然后和 `routes` 做 `match`，找到匹配的路由。

之后会 `pushState` 修改 `history`，并且触发 react 的 `setState` 来**重新渲染**，重新渲染的时候通过 `renderMatches` 把当前 `match` 的组件渲染出来。

而渲染到 `Outlet` 的时候，会从 `context` 中**取出当前需要渲染的组件来渲染：**

![](<../assets/图解 history api 和 React Router /image/image_COfuVgFv46.webp>)

![](<../assets/图解 history api 和 React Router /image/image_DXdy2TC5C4.webp>)

这就是 `router` 初次渲染和点击 `link` 时的渲染流程。

那点击前进后退按钮的时候呢？

这个就是监听 `popstate`，然后也做一次 `navigate` 就好了：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb9bb0311d0e4b17b6aee47cdf85fdf2~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/07291c65d32340e5a5e8b19d5c9bfef2~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f6ad52e831d04c5da6315009c9546fac~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

后续流程一样。

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/08d5adcfdea441a3a221002cfc278ecc~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

回过头来，其实 react router 的 routes 其实支持这两种配置方式：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b114c52c3d7340608a1cc59965797d19~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/99f12345a59a4cce975a9d7d8588aa2a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

效果一样。

看下源码就知道为什么了：

首先，这个 Route 组件就是个空组件，啥也没：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e6f843d1a6e44a57b6c597167973b3f2~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

而 `Routes` 组件里会从把**所有子组件的参数**取出来，变成一个个 route 配置：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5cf9802f9ee74169b035f47616d8bde8~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3939646a01034aa6af9d7eca94061c17~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

结果不就是和对象的配置方式一样么？

总结

我们学习了 history api 和 React Router 的实现原理。
history api 有这些：

- length：history 的条数
- forward：前进一个
- back：后退一个
- go：前进或者后退 n 个
- pushState：添加一个 history
- replaceState：替换当前 history
- scrollRestoration：保存 scroll 位置，取值为 auto 或者 manual，manual 的话就要自己设置 scroll 位置了

而且还有 **popstate** 事件可以**监听到** `history.go、history.back`、`history.forward` 的导航，拿到最新的 `location`。

**这里要注意 pushState、replaceState 并不能触发 popstate 事件。** 也就是 history 之间导航（go、back、forward）可以触发 popstate，而修改 history （push、replace）不能触发。

React Router 就是基于这些 history api 实现的。
首次渲染的时候，会根据\*\* location 和配置的 routes 做匹配，渲染匹配的组**件。
之后点击 link 链接也会进行 location 和 routes 的匹配，然后 **history.pushState 修改 history**，之后通过 react 的 `setState` **触发重新渲染。
**前进后退的时候，也就是执行 history.go、history.back、history.forward 的时候，会**触发 popstate**，这时候也是**同样的处理 \*\*，location 和 routes 的匹配，然后 history.pushState 修改 history，之后通过 react 的 setState 触发重新渲染。

渲染时会用到 `Outlet`组件\*\* 渲染子路由\*\*，用到 `useXxx` 来取一些**匹配信息**，这些都是**通过 context 来传递**的。
这就是 React Router 的实现原理，它和 history api 是密不可分的。&#x20;
