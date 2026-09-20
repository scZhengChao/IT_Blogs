# URL

## 目录

- [解析绝对 URL](#解析绝对-URL)
- [解析相对 URL](#解析相对-URL)
- [ 修改 URL 组件](#-修改-URL-组件)
- [处理 API 请求参数](#处理-API-请求参数)
- [处理表单数据](#处理表单数据)

是现代 JavaScript 中**处理网址和查询参数的强大工具**。它们提供了**直观且标准化**的方式来解析、构建、操作和编码 URL 及其组件。

# 解析绝对 URL

```javascript 

const url = new URL('[https://example.com/path?query=value#fragment](https://example.com/path?query=value#fragment)');
console.log(url.protocol);  // 'https:'
console.log(url.hostname);  // 'example.com'
console.log(url.port);      // '' (默认端口会省略)
console.log(url.pathname);  // '/path'
console.log(url.search);    // '?query=value'
console.log(url.hash);      // '#fragment'
console.log(url.origin);    // 'https://example.com'
```


# 解析相对 URL

```javascript 
const baseUrl = new URL('https://example.com/base/');
const relativeUrl = new URL('../path', baseUrl);
console.log(relativeUrl.href);  // 'https://example.com/path'
```


# &#x20;修改 URL 组件

```javascript 
url.hostname = 'new-domain.com';
url.pathname = '/new-path';
url.search = '?new=query';
url.hash = '#new-fragment';
console.log(url.href);  // 'https://new-domain.com/new-path?new=query#new-fragment'
```


# 处理 API 请求参数

在前端应用中，你经常需要构建带有查询参数的 API 请求 URL。

```javascript 
async function fetchProducts(filters) {
  const url = new URL('https://api.example.com/products');
  
  // 添加查询参数
  const params = url.searchParams;
  if (filters.category) params.append('category', filters.category);
  if (filters.priceRange) params.append('price', filters.priceRange);
  if (filters.sort) params.append('sort', filters.sort);
  
  // 分页参数
   params.append('page', filters.page || 1);
  params.append('limit', filters.limit || 20);
   
   // 发送请求
  const response = await fetch(url); 
  return response.json();
}

// 使用示例
const products = await fetchProducts({
  category: 'electronics',
  priceRange: '100-500',
  sort: 'price:asc',
  page: 2
});
```


在单页应用中，你可能需要从 URL 中提取路由参数。

```javascript 
function handleRoute() {
  const url = new URL(window.location.href);
  
  // 获取路径参数
  const path = url.pathname.split('/');
  const page = path[1];
  const id = path[2];
  
  // 获取查询参数
  const params = url.searchParams;
   const filter = params.get('filter');
  const sort = params.get('sort');
   
  // 根据参数渲染页面
  if (page === 'products') {
    renderProducts(id, { filter, sort });
  } else if (page === 'users') {
    renderUser(id);
  }
}

// 更新 URL 参数而不刷新页面
function updateQueryParams(params) {
  const url = new URL(window.location.href);
  const searchParams = url.searchParams;
  
  // 更新参数
  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      searchParams.delete(key);
    } else {
      searchParams.set(key, value);
    }
  });
  
  // 更新 URL
  window.history.pushState({}, '', url);
}
```


# 处理表单数据

当提交表单时，可以使用 URLSearchParams 来处理表单数据。

```javascript 
function handleFormSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  
  // 将表单数据转换为 URLSearchParams
  const params = new URLSearchParams(formData);
  
  // 构建 API 请求 URL
  const url = new URL('https://api.example.com/search');
  url.search = params;
  
  // 发送请求
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // 处理响应数据
      renderResults(data);
    });
}

// 表单 HTML
const formHTML = `
  <form id="searchForm">
    <input type="text" name="query" placeholder="搜索...">
    <select name="category">
      <option value="all">所有类别</option>
      <option value="books">书籍</option>
      <option value="movies">电影</option>
    </select>
    <button type="submit">搜索</button>
  </form>
`;

```
