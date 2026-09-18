# 示例 2：缓存 API 数据​

```typescript 
// 检查缓存是否存在
const cachedData = await localforage.getItem('apiData');

if (cachedData) {
  console.log('Using cached data:', cachedData);
} else {
  // 无缓存则请求 API
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  
  // 缓存数据（有效期 1 小时）
  await localforage.setItem('apiData', data);
  console.log('Fetched new data:', data);
}
```
