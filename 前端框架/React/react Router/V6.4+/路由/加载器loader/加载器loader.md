# 加载器loader

## 目录

- [params](#params)
- [request](#request)
- [loader.hydrate](#loaderhydrate)
- [返回响应](#返回响应)
- [在加载器中抛出异常](#在加载器中抛出异常)

[ 加载器 v6.23.1 | React 路由器 - React Router 路由库  https://reactrouter.com.cn/en/main/route/loader](https://reactrouter.com.cn/en/main/route/loader " 加载器 v6.23.1 | React 路由器 - React Router 路由库  https://reactrouter.com.cn/en/main/route/loader")

每个路由都可以定义一个 "loader" 函数，在路由元素渲染之前提供数据。

此功能仅在使用数据路由时有效，请参阅[**选择路由器**](https://reactrouter.com.cn/en/main/routers/picking-a-router "选择路由器")

```javascript 
createBrowserRouter([
  {
    element: <Teams />,
    path: "teams",
    loader: async () => {
      return fakeDb.from("teams").select("*");
    },
    children: [
      {
        element: <Team />,
        path: ":teamId",
        loader: async ({ params }) => {
          return fetch(`/api/teams/${params.teamId}.json`);
        },
      },
    ],
  },
]);

```


当用户在应用程序中导航时，**下一个匹配路由分支的加载器将并行调用**，它们的数据将通过[useLoaderData](https://reactrouter.com.cn/en/main/hooks/use-loader-data "useLoaderData")提供给组件。

## `params`

**路由参数从**[**动态段**](https://reactrouter.com.cn/en/main/route/route#dynamic-segments "动态段")**解析并传递给你的加载**器。这对于确定要加载哪个资源很有用。

```typescript 
createBrowserRouter([
  {
    path: "/teams/:teamId",
    loader: ({ params }) => {
      return fakeGetTeam(params.teamId);
    },
  },
]);

```


请注意，路径中的`:teamId`**会被解析并以**\*\*`params.teamId`\*\***的相同名称提供。**

## `request`

这是一个[Fetch 请求](https://mdn.org.cn/en-US/docs/Web/API/Request "Fetch 请求")实例，正在向你的应用程序发出请求。

```javascript 
function loader({ request }) {}

```


> 请求？！

**加载器接收 "请求" 乍一看可能很奇怪。考虑到**\*\*`<Link>`\*\***执行类似以下代码的操作**，并问问自己，“这里阻止了什么默认行为？”

```react jsx 
<a
  href={props.to}
  onClick={(event) => {
    event.preventDefault();
    navigate(props.to);
  }}
/>

```


如果没有 React Router，\*\*浏览器会向你的服务器发出一个 *****请求*****，但 React Router 阻止了它！\*\*浏览器没有将请求发送到你的服务器，而是 React Router 将请求发送到你的加载器。

最常见的用例是创建一个[URL](https://mdn.org.cn/en-US/docs/Web/API/URL "URL")并从它读取[URLSearchParams](https://mdn.org.cn/en-US/docs/Web/API/URLSearchParams "URLSearchParams")

```javascript 
function loader({ request }) {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("q");
  return searchProducts(searchTerm);
}

```


请注意，这里的 API 不是 React Router 特定的，而是标准的 Web 对象：[Request](https://mdn.org.cn/en-US/docs/Web/API/Request "Request")、[URL](https://mdn.org.cn/en-US/docs/Web/API/URL "URL")、[URLSearchParams](https://mdn.org.cn/en-US/docs/Web/API/URLSearchParams "URLSearchParams")。

## `loader.hydrate`

如果你正在进行[**服务器端渲染**](https://reactrouter.com.cn/en/main/guides/ssr "服务器端渲染")并利用`future.v7_partialHydration`标志进行[部分水合](https://reactrouter.com.cn/en/main/routers/create-browser-router#partial-hydration-data "部分水合")，那么你可能希望选择在初始水合时运行路由`loader`*即使它有水合数据*（例如，让用户用水合数据预先填充缓存）。为了强制`loader`在部分水合场景中在水合时运行，你可以在`loader`函数上设置一个`hydrate`属性。

## 返回响应

虽然你可以从加载器中返回任何你想要的东西，**并从**[**useLoaderData**](https://reactrouter.com.cn/en/main/hooks/use-loader-data "useLoaderData")**获取它，但你也可以返回一个 Web**[**Response**](https://mdn.org.cn/en-US/docs/Web/API/Response "Response")**。**

这可能看起来没有立即用处，但考虑一下`fetch`。由于`fetch`的返回值是 Response，而加载器理解响应，因此许多加载器可以返回一个简单的 fetch！

```javascript 
// an HTTP/REST API
function loader({ request }) {
  return fetch("/api/teams.json", {
    signal: request.signal,
  });
}

// or even a graphql endpoint
function loader({ request, params }) {
  return fetch("/_gql", {
    signal: request.signal,
    method: "post",
    body: JSON.stringify({
      query: gql`...`,
      params: params,
    }),
  });
}

```


**你也可以自己构建响应。**

```javascript 
function loader({ request, params }) {
  const data = { some: "thing" };
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json; utf-8",
    },
  });
}

```


React Router **会自动调用**\*\*`response.json()`，因此你的组件在渲染时不需要解析它。\*\*​

```javascript 
function SomeRoute() {
  const data = useLoaderData();
  // { some: "thing" }
}

```


**使用**[**json**](https://reactrouter.com.cn/en/main/fetch/json "json")**实用程序可以简化此操作，** 因此你无需自己构建它们。**下面的示例与前面的示例实际上相同。**

```typescript 
import { json } from "react-router-dom";

function loader({ request, params }) {
  const data = { some: "thing" };
  return json(data, { status: 200 });
}

```


## 在加载器中抛出异常

你可以在你的加载器中`throw`来退出当前的调用堆栈（停止运行当前代码），React Router 将从 "错误路径" 重新开始。

```javascript 
function loader({ request, params }) {
  const res = await fetch(`/api/properties/${params.id}`);
  if (res.status === 404) {
    throw new Response("Not Found", { status: 404 });
  }
  return res.json();
}

```
