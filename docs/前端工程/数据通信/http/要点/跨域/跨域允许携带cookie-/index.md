# 跨域允许携带cookie:

## 目录

- [跨域允许携带cookie:](#跨域允许携带cookie)

# 跨域允许携带cookie:

> **默认是不允许的**

携带凭证

```typescript 
//默认跨域是不携带cookie的：必须设置（ 预检options中和正式请求接口中均需添加）
 res.setHeader('Access-Control-Allow-Credentials', 'true');
axios.defaults.withCredentials = true

//设置cookie
res.setHeader('Set-Cookie', 'cookie1=va222;')
//检查cookie
console.log('cookie',req.headers.cookie)  
//  cors 解决跨域cookie能被请求携带；但是在浏览器里是看不到的；只能在请求哪里看 




// 前端
fetch(url, { credentials: 'include' });

// 后端
res.header('Access-Control-Allow-Credentials', 'true');
res.header('Access-Control-Allow-Origin', 'https://exact.domain.com'); // 不能是*

```
