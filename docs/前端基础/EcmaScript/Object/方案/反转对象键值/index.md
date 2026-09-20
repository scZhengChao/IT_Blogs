# 反转对象键值

当你需要将对象的键值对交换

```javascript 
const invert = (obj) => Object.keys(obj).reduce((res, k) => Object.assign(res, { [obj[k]]: k }), {})
invert({name: 'jack'}) // {jack: 'name'}

```
