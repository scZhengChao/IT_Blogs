# 异步数据获取问题

## 目录

- [问题描述](#问题描述)
- [解决方案](#解决方案)

### 问题描述

如何在服务器端获取数据并同步到客户端。

```javascript 
function ProductPage() {
  const [product, setProduct] = useState(null);
  
  useEffect(() => {
    fetch('/api/product').then(r => setProduct(r.json()));
  }, []);
  // 服务器端不会执行 useEffect
}
```


### 解决方案

- 使用专门的数据获取库（如 react-query, swr）
- 在路由级别获取数据
- 通过上下文传递数据

```javascript 
// 使用 react-query 的 SSR 示例
import { QueryClient, QueryClientProvider, dehydrate, hydrate } from 'react-query';

// 服务器端
const queryClient = new QueryClient();
await queryClient.prefetchQuery('product', fetchProduct);
const dehydratedState = dehydrate(queryClient);

// 将 dehydratedState 注入 HTML
<script>window.__REACT_QUERY_STATE__ = ${JSON.stringify(dehydratedState)}</script>

// 客户端
const dehydratedState = window.__REACT_QUERY_STATE__;
const queryClient = new QueryClient();
hydrate(queryClient, dehydratedState);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductPage />
    </QueryClientProvider>
  );
}
```
