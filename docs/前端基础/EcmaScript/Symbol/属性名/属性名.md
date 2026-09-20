# 属性名

## 目录

- [Symbol 作为属性名](#Symbol-作为属性名)
  - [注意](#注意)
- [属性名遍历](#属性名遍历)
  - [Object.getOwnPropertySymbols](#ObjectgetOwnPropertySymbols)
  - [Reflect.ownKeys](#ReflectownKeys)

# Symbol 作为属性名

     在对象字面量中使用 Symbol 作为属性名时，需要使用 「**方括号**」 （ **\[]**），如 \[leo]: "leo" 。好处：**防止同名属性，还有防止键被改写或覆盖**。

```javascript 
    let leo = Symbol();
    // 写法1
    let user = {};
     user[leo] = 'leo'; 

    // 写法2
    let user = {
         [leo] : 'leo'
     }

    // 写法3
    let user = {};
     Object.defineProperty(user, leo, {value : 'leo' }); 

    // 3种写法 结果相同
     user[leo]; // 'leo'
```


## 注意

-     Symbol作为**对象属性名**时，\*\*不能用点运算符，并且必须放在方括号内 \*\*   
-     **常常还用于创建一组常量，保证所有值不相等**

```javascript 
     let user = {};
    user.list = {
        AAA: Symbol('Leo'),
        BBB: Symbol('Robin'),
        CCC: Symbol('Pingan')
    }
```


# 属性名遍历

> Symbol作为属性名遍历，不出现在**for...in、for...of循环，也不被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify(** **)** 返回。

```javascript 
let leo = Symbol('leo'), robin = Symbol('robin');
let user = {
    [leo]:'18', 
    [robin]:'28'
}
 for(let k of Object.values(user)){console.log(k)} 
// 无输出


let user = {a:1};
let leo = Symbol('leo');
Object.defineProperty(user, leo, {value: 'hi'});
for(let k in user){
    console.log(k); // a
}
 console.log( Object.getOwnPropertyNames(user))  // ["a"]
console.log(Object.getOwnPropertySymbols(user)) // [Symbol(leo)] 

```


## **Object.getOwnPropertySymbols**

Object.getOwnPropertySymbols方法返回一个**数组**，包含当前**对象所有用做属性名的Symbol值**。

```javascript 

let user = {};
let leo = Symbol('leo');
let pingan = Symbol('pingan');

user[leo] = 'hi leo';
user[pingan] = 'hi pingan';

let obj = Object.getOwnPropertySymbols(user);

obj; //  [Symbol(leo), Symbol(pingan)]
```


## Reflect.ownKeys

另外可以使用Reflect.ownKeys方法可以**返回所有类型的键名**，包括**常规键名和 Symbol 键名**。

```javascript 
let user = {
    [Symbol('leo')]: 1,
    age : 2,
    address : 3,
}
Reflect.ownKeys(user); // ['age', 'address',Symbol('leo')]
```
