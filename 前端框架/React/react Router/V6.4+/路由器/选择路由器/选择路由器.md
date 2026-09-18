# 选择路由器

## 目录

- [使用 v6.4 数据 API](#使用-v64-数据-API)
- [Web 项目](#Web-项目)
- [测试](#测试)
- [React Native](#React-Native)
- [数据 API](#数据-API)

虽然您的应用程序只使用一个路由器，但根据您的应用程序运行的环境，有多个路由器可用。本文件应帮助您确定要使用哪一个。

## 使用 v6.4 数据 API

**在 v6.4 中，引入了支持新的**[**数据 API**](https://reactrouter.com.cn/en/main/routers/picking-a-router#data-apis "数据 API")**的新路由器**

- [createBrowserRouter](https://reactrouter.com.cn/en/main/routers/create-browser-router "createBrowserRouter")
- [createMemoryRouter](https://reactrouter.com.cn/en/main/routers/create-memory-router "createMemoryRouter")
- [createHashRouter](https://reactrouter.com.cn/en/main/routers/create-hash-router "createHashRouter")
- [createStaticRouter](https://reactrouter.com.cn/en/main/routers/create-static-router "createStaticRouter")

以下路由器不支持数据 API

- [\<BrowserRouter>](https://reactrouter.com.cn/en/main/router-components/browser-router "<BrowserRouter>")
- [\<MemoryRouter>](https://reactrouter.com.cn/en/main/router-components/memory-router "<MemoryRouter>")
- [\<HashRouter>](https://reactrouter.com.cn/en/main/router-components/hash-router "<HashRouter>")
- [\<NativeRouter>](https://reactrouter.com.cn/en/main/router-components/native-router "<NativeRouter>")
- [\<StaticRouter>](https://reactrouter.com.cn/en/main/router-components/static-router "<StaticRouter>")

我们建议您更新您的应用程序以使用 6.4 中的新路由器之一。数据 API 目前在 React Native 中不受支持，但最终应该会支持。

最简单、最快的更新到 v6.4 的方法是使用[createRoutesFromElements](https://reactrouter.com.cn/en/main/utils/create-routes-from-elements "createRoutesFromElements")，这样您就不需要将`<Route>`元素转换为路由对象。

```typescript 
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="dashboard" element={<Dashboard />} />
      {/* ... etc. */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

```


## Web 项目

**我们建议所有 Web 项目使用**[**createBrowserRouter**](https://reactrouter.com.cn/en/main/routers/create-browser-router "createBrowserRouter")**.**

它使用完整的 URL，而不是在`history.pushState`标准化之前 Web 应用程序中常见的哈希 URL（`#this/stuff`）。**完整的 URL 对 SEO 更好，对服务器渲染更好，并且与 Web 平台的其余部分更兼容。**

如果您将应用程序托管在静态文件服务器上，则**需要将其配置为将所有请求发送到您的**`index.html`，以避免出现 404 错误。

如果由于某种原因您无法使用完整的 URL，[createHashRouter](https://reactrouter.com.cn/en/main/routers/create-hash-router "createHashRouter")是第二好的选择。

如果您对数据 API 不感兴趣，您可以继续使用[\<BrowserRouter>](https://reactrouter.com.cn/en/main/router-components/browser-router "<BrowserRouter>")，或者，如果您无法使用完整的 URL，则使用[\<HashRouter>](https://reactrouter.com.cn/en/main/router-components/hash-router "<HashRouter>").

## 测试

测试使用 React Router API 的组件最简单的方法是使用[createMemoryRouter](https://reactrouter.com.cn/en/main/routers/create-memory-router "createMemoryRouter")或[\<MemoryRouter>](https://reactrouter.com.cn/en/main/router-components/memory-router "<MemoryRouter>")，而不是您在应用程序中使用的需要 DOM 历史记录 API 的路由器。

一些 React Router API 在内部使用`fetch`，该 API 仅从 Node.js v18 开始支持。如果您的项目使用 v17 或更低版本，您应该手动添加`fetch`polyfill。一种方法是安装[whatwg-fetch](https://npmjs.net.cn/package/whatwg-fetch "whatwg-fetch")并将其添加到您的`jest.config.js`文件中，如下所示

```javascript 
module.exports = {
  setupFiles: ["whatwg-fetch"],
  // ...rest of the config
};

```


## React Native

您将在 React Native 项目中使用[\<NativeRouter>](https://reactrouter.com.cn/en/main/router-components/native-router "<NativeRouter>").

v6.4 中的数据 API 目前在 React Native 中不受支持，但最终应该会支持。

## 数据 API

以下 API 是在 React Router 6.4 中引入的，并且仅在使用数据路由器时才有效

- [route.action](https://reactrouter.com.cn/en/main/route/action "route.action")
- [route.errorElement](https://reactrouter.com.cn/en/main/route/error-element "route.errorElement")
- [route.lazy](https://reactrouter.com.cn/en/main/route/lazy "route.lazy")
- [route.loader](https://reactrouter.com.cn/en/main/route/loader "route.loader")
- [route.shouldRevalidate](https://reactrouter.com.cn/en/main/route/should-revalidate "route.shouldRevalidate")
- [route.handle](https://reactrouter.com.cn/en/main/route/route#handle "route.handle")
- [\<Await>](https://reactrouter.com.cn/en/main/components/await "<Await>")
- [\<Form>](https://reactrouter.com.cn/en/main/components/form "<Form>")
- [\<ScrollRestoration>](https://reactrouter.com.cn/en/main/components/scroll-restoration "<ScrollRestoration>")
- [useActionData](https://reactrouter.com.cn/en/main/hooks/use-action-data "useActionData")
- [useAsyncError](https://reactrouter.com.cn/en/main/hooks/use-async-error "useAsyncError")
- [useAsyncValue](https://reactrouter.com.cn/en/main/hooks/use-async-value "useAsyncValue")
- [useFetcher](https://reactrouter.com.cn/en/main/hooks/use-fetcher "useFetcher")
- [useFetchers](https://reactrouter.com.cn/en/main/hooks/use-fetchers "useFetchers")
- [useLoaderData](https://reactrouter.com.cn/en/main/hooks/use-loader-data "useLoaderData")
- [useMatches](https://reactrouter.com.cn/en/main/hooks/use-matches "useMatches")
- [useNavigation](https://reactrouter.com.cn/en/main/hooks/use-navigation "useNavigation")
- [useRevalidator](https://reactrouter.com.cn/en/main/hooks/use-revalidator "useRevalidator")
- [useRouteError](https://reactrouter.com.cn/en/main/hooks/use-route-error "useRouteError")
- [useRouteLoaderData](https://reactrouter.com.cn/en/main/hooks/use-route-loader-data "useRouteLoaderData")
- [useSubmit](https://reactrouter.com.cn/en/main/hooks/use-submit "useSubmit")
- `startViewTransition`支持[Link](https://reactrouter.com.cn/en/main/components/link#unstable_viewtransition "Link")和[useNavigate](https://reactrouter.com.cn/en/main/hooks/use-navigate#optionsunstable_viewtransition "useNavigate")
