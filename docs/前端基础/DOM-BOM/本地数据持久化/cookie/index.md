# cookie

## 目录

- [转对象](#转对象)

# 转对象

```javascript 
const getCookie = () => document.cookie
    .split(';')
    .map((item) => item.split('='))
    .reduce((acc, [k, v]) => (acc[k.trim().replace('"', '')] = v) && acc, {})
getCookie()

```


[domain](./domain/index.md "domain")

[Secure](./Secure/index.md "Secure")

[SameSite](./SameSite/index.md "SameSite")

[path](IT/前端基础/DOM-BOM/本地数据持久化/cookie/path/path.md "path")

[expires/Max-Age](./expires-Max-Age/index.md "expires/Max-Age")

[Partitioned](./Partitioned/index.md "Partitioned")
