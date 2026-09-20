# Symbol

## 目录

- [Symbol](#Symbol)
  - [1.引入背景：](#1引入背景)
  - [属性：](#属性)
    - [description](#description)

# Symbol

## 1.引入背景：

    为了更加安全；更加的独一无二；唯一；ES6引入Symbol作为一种新的「**原始数据类型**」，表示「**独一无二**」的值，主要是为了「**防止属性名冲突**」。ES6之后，JavaScript一共有其中数据类型：Symbol、undefined、null、Boolean、String、Number、Object。

「简单使用」：

    规范规定，**JavaScript 中对象的属性**只能为 「**字符串类型**」 或者 「**Symbol类型**」 ，毕竟我们也只见过这两种类型。

```javascript 
let sym1 = Symbol("leo")
let sym2 = Symbol("leo")
 console.dir(sym1 == sym2)  //false  世界上没有两个一样symbol
```


## 属性：

### description

Symbol是新的原始类型，通常在创建Symbol时会附加一段描述。只有把这个Symbol转成String才能看到这段描述，而且外层还套了个 'Symbol()' 字样。ES2019为Symbol新增了description属性，专**门用于查看这段描述**。

```javascript 
const sym = Symbol('The description');
 String(sym) // 'Symbol(The description)'
sym.description // 'The description'
```


[特性](IT/前端基础/EcmaScript/Symbol/特性/特性.md "特性")

[属性名](属性名.md "属性名")

[重复](重复.md "重复")

[用例](IT/前端基础/EcmaScript/Symbol/用例/用例.md "用例")
