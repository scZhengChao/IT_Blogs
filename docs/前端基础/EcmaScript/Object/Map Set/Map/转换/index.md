# 转换

## 目录

- [Map 转为数组](#Map-转为数组)
- [数组 转为 Map](#数组-转为-Map)
- [Map 转为对象](#Map-转为对象)
- [对象转为 Map](#对象转为-Map)

### **Map 转为数组**

```javascript 
 //前面已经提过，Map 转为数组最方便的方法，就是使用扩展运算符（...）
const myMap = new Map()
  .set(true, 7)
  .set({foo: 3}, ['abc']);
[...myMap]
// [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]
```


### **数组 转为 Map**

```javascript 
 //将数组传入 Map 构造函数，就可以转为 Map。
new Map([
  [true, 7],
  [{foo: 3}, ['abc']]
])
// Map {
//   true => 7,
//   Object {foo: 3} => ['abc']
// }

```


### **Map 转为对象**

```javascript 
 //如果所有 Map 的键都是字符串，它可以无损地转为对象。
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

const myMap = new Map()
  .set('yes', true)
  .set('no', false);
strMapToObj(myMap)
// { yes: true, no: false }

//如果有非字符串的键名，那么这个键名会被转成字符串，再作为对象的键名。
```


### **对象转为 Map**

```javascript 
 //对象转为 Map 可以通过Object.entries()。
let obj = {"a":1, "b":2};
let map = new Map(Object.entries(obj));


//此外，也可以自己实现一个转换函数。
function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}

objToStrMap({yes: true, no: false})
// Map {"yes" => true, "no" => false}


```
