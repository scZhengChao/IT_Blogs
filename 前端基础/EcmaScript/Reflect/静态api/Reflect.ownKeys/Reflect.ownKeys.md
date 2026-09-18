# Reflect.ownKeys

另外可以使用Reflect.ownKeys方法可以**返回所有类型的键名**，包括**常规键名和 Symbol 键名**。

```javascript 
let user = {
    [Symbol('leo')]: 1,
    age : 2,
    address : 3,
}
Reflect.ownKeys(user); // ['age', 'address',Symbol('leo')]
```
