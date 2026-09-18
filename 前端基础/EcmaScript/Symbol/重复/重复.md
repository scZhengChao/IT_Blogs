# 重复

## 目录

- [Symbol.for](#Symbolfor)
- [Symbol.keyFor](#SymbolkeyFor)

# Symbol.for

「**用于重复使用一个Symbol值**」，接收一个「**字符串**」作为参数，若**存在用此参数作为名称的Symbol值**，**返回这个Symbol，否则新建并返回以这个参数为名称的Symbol值。**

```javascript 
console.log(Symbol.for('leo') === Symbol.for('leo')) // true            
console.log(Symbol('leo') === Symbol('leo'))          // false    
 console.log(Symbol('leo') === Symbol.for('leo'))    //false
```


# Symbol.keyFor

**用于返回一个已使用的Symbol.for类型的key**」

```javascript 
let leo = Symbol.for('leo');
Symbol.keyFor(leo);   //  'leo'

let leo = Symbol('leo');
 Symbol.keyFor(leo);   //  undefined    
```
