# 示例 1：保存用户登录状态

```javascript 
// 登录成功后保存 token
await localforage.setItem('authToken', 'abc123');

// 检查是否已登录
const token = await localforage.getItem('authToken');
if (token) {
  console.log('User is logged in');
} else {
  console.log('Please login');
}
```
