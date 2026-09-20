# Reflect.has()

Reflect是在ES2015新增的一个内置对象，提供了与Javascript对象交互的方法。

判断一个对象是否存在某个属性，**和 ****`in`**** 运算符] 的功能完全相同**。(**会判断继承过来的属性！**)

用法：Reflect.has(obj, propName)

```react tsx 
Reflect.has({name:"搞前端的半夏"}, "name"); // true
Reflect.has({name:"搞前端的半夏"}, "age"); // false

Reflect.has({name:"搞前端的半夏"}, "toString"); //true
```
