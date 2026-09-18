# 延迟数据指南

## 目录

- [解决方案](#解决方案)
  - [使用defer](#使用defer)
- [评估解决方案](#评估解决方案)
  - [常见问题解答](#常见问题解答)
    - [为什么不默认延迟所有内容？](#为什么不默认延迟所有内容)
    - [\<Suspense/>回退何时渲染？](#Suspense回退何时渲染)
    - [为什么加载器返回的 Response 对象不再起作用？](#为什么加载器返回的-Response-对象不再起作用)

想象一下，你的某个路由的加载器需要检索一些数据，这些数据由于某种原因非常慢。例如，假设你正在向用户展示一个正在送往他们家中的包裹的位置。

```javascript 
import { json, useLoaderData } from "react-router-dom";
import { getPackageLocation } from "./api/packages";

async function loader({ params }) {
  const packageLocation = await getPackageLocation(
    params.packageId
  );

  return json({ packageLocation });
}

function PackageRoute() {
  const data = useLoaderData();
  const { packageLocation } = data;

  return (
    <main>
      <h1>Let's locate your package</h1>
      <p>
        Your package is at {packageLocation.latitude} lat
        and {packageLocation.longitude} long.
      </p>
    </main>
  );
}

```


我们假设`getPackageLocation`很慢。这会导致**初始页面加载时间和路由转换时间与最慢的数据部分一样长**。你可以做一些事情来优化这一点并改善用户体验。

- 加快慢速操作（😅）。
- 使用`Promise.all`并行加载数据（在我们的示例中，我们没有要并行处理的内容，但在其他情况下可能会有所帮助）。
- 添加全局过渡加载动画（有助于改善用户体验）。
- 添加本地化骨架 UI（有助于改善用户体验）。

如果这些方法效果不佳，你可能被迫将慢速数据从`loader`中移出，并将其放入组件获取中（并在加载时显示骨架回退 UI）。在这种情况下，你将在挂载时渲染回退 UI 并启动数据获取。从 DX 的角度来看，这实际上并不糟糕，这要归功于[useFetcher](https://reactrouter.com.cn/en/main/hooks/use-fetcher "useFetcher")。从 UX 的角度来看，这改善了客户端转换和初始页面加载的加载体验。因此，它似乎解决了问题。

但在大多数情况下，它仍然不是最佳选择（特别是如果你正在代码拆分路由组件），原因有两个。

1. **客户端获取将你的数据请求放在一个瀑布中：文档 -> JavaScript -> 延迟加载路由 -> 数据获取。**
2. 你的代码无法轻松地在组件获取和路由获取之间切换（稍后将详细介绍）。

## 解决方案

React Router 利用 React 18 的 Suspense 来进行数据获取，**使用**[**defer**](https://reactrouter.com.cn/en/main/utils/defer "defer")[**Response**](https://reactrouter.com.cn/en/main/utils/defer "Response")**实用程序和**[**\<Await />**](https://reactrouter.com.cn/en/main/components/await "<Await />")**组件 /**[**useAsyncValue**](https://reactrouter.com.cn/en/main/hooks/use-async-value "useAsyncValue")**钩子。** 通过使用这些 API，你可以解决这两个问题。

1. 你的数据不再处于瀑布中：文档 -> JavaScript -> 延迟加载路由和数据（并行）。
2. 你的代码可以轻松地在渲染回退和等待数据之间切换。

让我们深入了解如何实现这一点。

### 使用`defer`

首先，为你的慢速数据请求添加`<Await />`，你希望在那里渲染回退 UI。让我们在上面的示例中进行操作。

```javascript 
import {
  Await,
  defer,
  useLoaderData,
} from "react-router-dom";
import { getPackageLocation } from "./api/packages";

async function loader({ params }) {
  const packageLocationPromise = getPackageLocation(
    params.packageId
  );

  return defer({
    packageLocation: packageLocationPromise,
  });
}

export default function PackageRoute() {
   const data = useLoaderData();
 
  return (
    <main>
      <h1>Let's locate your package</h1>
      <React.Suspense
        fallback={<p>Loading package location...</p>}
      >
        <Await
          resolve={data.packageLocation}
          errorElement={
            <p>Error loading package location!</p>
          }
        >
          {(packageLocation) => (
            <p>
              Your package is at {packageLocation.latitude}{" "}
              lat and {packageLocation.longitude} long.
            </p>
          )}
        </Await>
      </React.Suspense>
    </main>
  );
}
```


或者，你可以使用`useAsyncValue`钩子。

如果你不喜欢使用渲染道具，可以使用钩子，但你必须将它们拆分成另一个组件。

```typescript 
export default function PackageRoute() {
  const data = useLoaderData();

  return (
    <main>
      <h1>Let's locate your package</h1>
      <React.Suspense
        fallback={<p>Loading package location...</p>}
      >
        <Await
          resolve={data.packageLocation}
          errorElement={
            <p>Error loading package location!</p>
          }
        >
          <PackageLocation />
        </Await>
      </React.Suspense>
    </main>
  );
}

function PackageLocation() {
  const packageLocation = useAsyncValue();
  return (
    <p>
      Your package is at {packageLocation.latitude} lat and{" "}
      {packageLocation.longitude} long.
    </p>
  );
}

```


# 评估解决方案

因此，与其等待**组件加载完毕才能触发获取请求，**我们会在**用户开始转换到新路由时立即启动慢速数据的请求**。这可以**显著加快慢速网络的用户体验。**

此外，React Router 为此公开的 API 非常符合人体工程学。你实际上可以\*\*根据是否包含`await`\*\***关键字来切换某些内容是否将被延迟**。

```javascript 
return defer({
  // not deferred:
  packageLocation: await packageLocationPromise,
  // deferred:
  packageLocation: packageLocationPromise,
});

```


因此，你可以对延迟进行 A/B 测试，甚至可以根据用户或请求的数据来确定是否延迟。

```javascript 
async function loader({ request, params }) {
  const packageLocationPromise = getPackageLocation(
    params.packageId
  );
  const shouldDefer = shouldDeferPackageLocation(
    request,
    params.packageId
  );

  return defer({
    packageLocation: shouldDefer
      ? packageLocationPromise
      : await packageLocationPromise,
  });
}

```


`shouldDeferPackageLocation`可以实现为检查发出请求的用户、包裹位置数据是否在缓存中、A/B 测试的状态，或者你想要的任何其他内容。这真是太棒了 🍭。

## 常见问题解答

### 为什么不默认延迟所有内容？

React Router 延迟 API 是 React Router 提供的另一个杠杆，它为你提供了一种选择权衡的方法。你希望页面更快地渲染吗？延迟一些内容。你希望 CLS（内容布局偏移）更低吗？不要延迟任何内容。你希望更快地渲染，但也希望 CLS 更低？只延迟慢速且不重要的内容。

这都是权衡，API 设计的巧妙之处在于它非常适合你进行简单的实验，以查看哪些权衡会导致你的实际世界关键指标产生更好的结果。

### `<Suspense/>`回退何时渲染？

`<Await />`组件仅在`<Await />`**组件首次渲染时，且带有未解决的 Promise 时，才会将 Promise 抛出到**`<Suspense>`边界。如果道具发生变化，它不会重新渲染回退。实际上，这意味着当用户提交表单并重新验证加载器数据时，*不会*渲染回退。当用户使用不同的参数导航到同一路由时，*会*渲染回退（在我们上面的示例中，如果用户从左侧的包裹列表中选择一个包裹，以在右侧找到其位置）。

这可能一开始感觉违反直觉，但请相信我们，我们已经认真考虑过这个问题，并且它必须这样工作非常重要。让我们想象一个没有延迟 API 的世界。对于那些场景，你可能想要为表单提交/重新验证实现乐观 UI。

当你决定尝试`defer`的权衡时，我们不希望你不得不更改或删除这些优化，因为我们希望你能够轻松地在延迟某些数据和不延迟数据之间切换。因此，我们确保你现有的乐观状态以相同的方式工作。如果我们不这样做，那么你可能会遇到我们所说的“爆米花 UI”，即数据提交会触发回退加载状态，而不是你辛苦构建的乐观 UI。

所以请记住：**延迟完全只与路由及其参数的初始加载有关。**

### 为什么加载器返回的 Response 对象不再起作用？

当你使用`defer`时，**你告诉 React Router 立即加载页面，而无需延迟数据。页面在**\*\*`Response`\*\***对象返回之前就已经加载完毕**，因此响应不会像你执行`return fetch(url)`时那样自动处理。

因\*\*此，你需要处理自己的`Response`****处理，并使用数据而不是****`Response`\*\***实例来解决你的延迟 Promise。**

```javascript 
async function loader({ request, params }) {
  return defer({
    // Broken! Resolves with a Response
    // broken: fetch(url),

    // Fixed! Resolves with the response data
    data: fetch(url).then((res) => res.json()),
  });
}

```


或者\*\*考虑我们的延迟数据可能返回重定向`Response`\*\***的情况**。你可以检测重定向并将状态代码和位置作为数据发送回来，然后你可以在组件中通过`useEffect`和`useNavigate`执行客户端重定向。

```javascript 
async function loader({ request, params }) {
  let data = fetch(url).then((res) => {
    if (res.status == 301) {
      return {
        isRedirect: true,
        status: res.status,
        location: res.headers.get("Location"),
      };
    }
    return res.json();
  });

  return defer({ data });
}

```
