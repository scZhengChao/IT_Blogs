# Await

## 目录

- [类型声明](#类型声明)
- [children](#children)
- [errorElement](#errorElement)
- [resolve](#resolve)

[ Await v6.23.1 | React Router - React Router 路由库  https://reactrouter.com.cn/en/main/components/await](https://reactrouter.com.cn/en/main/components/await " Await v6.23.1 | React Router - React Router 路由库  https://reactrouter.com.cn/en/main/components/await")

用于渲染[延迟](https://reactrouter.com.cn/en/main/utils/defer "延迟")值，并自动处理错误。请务必查看[延迟数据指南](https://reactrouter.com.cn/en/main/guides/deferred "延迟数据指南")，因为有一些 API 与此组件协同工作。

```javascript 
import { Await, useLoaderData } from "react-router-dom";

function Book() {
  const { book, reviews } = useLoaderData();
  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.description}</p>
      <React.Suspense fallback={<ReviewsSkeleton />}>
        <Await
          resolve={reviews}
          errorElement={
            <div>Could not load reviews 😬</div>
          }
          children={(resolvedReviews) => (
            <Reviews items={resolvedReviews} />
          )}
        />
      </React.Suspense>
    </div>
  );
}

```


**注意：**`<Await>`要求在`<React.Suspense>`或`<React.SuspenseList>`父级组件中渲染，以启用回退 UI。

## 类型声明

```typescript 
declare function Await(
  props: AwaitProps
): React.ReactElement;

interface AwaitProps {
  children: React.ReactNode | AwaitResolveRenderFunction;
  errorElement?: React.ReactNode;
  resolve: TrackedPromise | any;
}

interface AwaitResolveRenderFunction {
  (data: Awaited<any>): React.ReactElement;
}

```


## `children`

可以是 React 元素或函数。

**使用函数时，值作为唯一参数提供**。

```react jsx 
Await resolve={reviewsPromise}>
  {(resolvedReviews) => <Reviews items={resolvedReviews} />}
</Await>

```


**使用 React 元素时，**[**useAsyncValue**](https://reactrouter.com.cn/en/main/hooks/use-async-value "useAsyncValue")**将提供数据**

```javascript 
<Await resolve={reviewsPromise}>
  <Reviews />
</Await>;

function Reviews() {
  const resolvedReviews = useAsyncValue();
  return <div>{/* ... */}</div>;
}

```


## `errorElement`

当 promise 拒绝时，**错误元素会渲染，而不是 children。您可以使用**[**useAsyncError**](https://reactrouter.com.cn/en/main/hooks/use-async-error "useAsyncError")**访问错误。**

如果 promise 拒绝，您可以提供一个可选的`errorElement`，通过`useAsyncError`钩子在上下文 UI 中处理该错误。

```react jsx 
<Await
  resolve={reviewsPromise}
  errorElement={<ReviewsError />}
>
  <Reviews />
</Await>;

function ReviewsError() {
  const error = useAsyncError();
  return <div>{error.message}</div>;
}

```


如果您没有提供 errorElement，拒绝的值将**冒泡到最近的路由级**[**errorElement**](https://reactrouter.com.cn/en/main/route/error-element "errorElement")**，并可以通过**[**useRouteError**](https://reactrouter.com.cn/en/main/hooks/use-route-error "useRouteError")**钩子访问。**

## `resolve`

接受来自[延迟](https://reactrouter.com.cn/en/main/utils/defer "延迟")[加载器](https://reactrouter.com.cn/en/main/route/loader "加载器")值的 promise，以进行解析和渲染。

```typescript 
import {
  defer,
  Route,
  useLoaderData,
  Await,
} from "react-router-dom";

// given this route
<Route
  loader={async () => {
    let book = await getBook();
    let reviews = getReviews(); // not awaited
    return defer({
      book,
      reviews, // this is a promise
    });
  }}
  element={<Book />}
/>;

function Book() {
  const {
    book,
    reviews, // this is the same promise
  } = useLoaderData();
  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.description}</p>
      <React.Suspense fallback={<ReviewsSkeleton />}>
        <Await
          // and is the promise we pass to Await
          resolve={reviews}
        >
          <Reviews />
        </Await>
      </React.Suspense>
    </div>
  );
}

```
