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


[domain](domain.md "domain")

[Secure](Secure.md "Secure")

[SameSite](SameSite.md "SameSite")

[path](IT/前端基础/DOM-BOM/本地数据持久化/cookie/path/path.md "path")

[expires/Max-Age](expires-Max-Age.md "expires/Max-Age")

[Partitioned](Partitioned.md "Partitioned")
