# cookie

## 目录

- [js-cookie](#js-cookie)

# js-cookie

```typescript 
npm install js-cookie --save
参考：   https://blog.csdn.net/qq_20802379/article/details/81436634
写入
    Cookies.set('name', 'value');
    Cookies.set('name', 'value', { expires: 7 })  过期时间 7天
   Cookies.set('name', 'value', { expires: new Date(Date.now()+1000*10) })  //过期时间 10s天
    Cookies.set('name', 'value', { expires: 7, path: '' });  储存路径
    Cookies.set('name', { foo: 'bar' });  自动json.stringify
    Cookies.set('name', 'value', { domain: 'subdomain.site.com' });
删除
    Cookies.remove('name');
    Cookies.set('name', 'value', { path: '' }); 删除带路径
    Cookies.remove('name'); // fail!
    Cookies.remove('name', { path: '' }); // removed!
    Cookies.remove('name', { path: '', domain: '.yourdomain.com' });
查看
    Cookies.get();  get all
    Cookies.get('name')
    Cookies.getJSON('name');  // 自动json.parse
```
