# 正则匹配

## 目录

- [replace](#replace)
  - [当正则里没有() 时:](#当正则里没有-时)
  - [当正则里有() 时:](#当正则里有-时)
  - [替换陷阱](#替换陷阱)
- [match](#match)
  - [没有g](#没有g)
  - [有g](#有g)
- [Exec](#Exec)

# replace

str.replace(reg,function(a,b,c){})   g则匹配所有,否则只找一个

## 当正则里没有() 时:

```javascript 
 var newstr = str.replace(/a+/ig,function(a,b,c,){
        console.log(a)  //=>匹配到的字符串
        console.log(b)  //=> 匹配到的字符串的索引
        console.log(c)  //str 本身
        return ''   //返回的字符串
    })
```


## 当正则里有() 时:

```javascript 
 var str = 'abcksgasadagadgsDaGdgfdshdfhsafgd'
    var newstr = str.replace(/d(a)/ig,function(a,b,c){ 
 //当匹配的正则以()为标志分配是时 ,详细见js操作的xss过滤使用
        console.log(a) //da
        console.log(b)    //a      
        console.log(c)   //索引
        console.log(RegExp.$1)  // ()里的匹配字符
        return ''
    })
```


## **替换陷阱**

```javascript 
"1 2 3".replace(/\d/g, parseInt);

// A. "1 2 3"
// B. "0 1 2"
// C. "NaN 2 3"
// D. "1 NaN 3"

```


答案是D。如果 replace 方法第二个参数是一个函数，则会在匹配的时候多次调用，第一个参数是匹配的字符串，第二个参数是匹配字符串的下标。所以变成了调用 parseInt(1, 0)、parseInt(2, 2)和parseInt(3, 4)，结果你就懂了。

# match

**str.match(reg)  类似indexOf() 和 lastIndexOf()  但是它返回的是数组**

## 没有g

- 如果 regexp 没有标志 g，那么 match() 方法就**只能在 stringObject 中执行一次匹配**。
- **如果没有找到任何匹配的文本， match() 将返回 null**。
- 否则 **，它将返回一个数组，其中存放了与它找到的匹配文本有关的信息**。
  - **该数组的第 0 个元素存放的是匹配文本，** ​**而其余的元素存放的是与正则表达式的子表达式匹配的文本。**
  - 除了这些常规的数组元素之外，返回的数组还含有两个对象属性。**index 属性声明的是匹配文本的起始字符在 stringObject 中的位置**，**input 属性声明的是对 stringObject 的引用。**

```javascript 
 1.当正则里没有g 则只进行一次匹配
    ["a", index: 0, input: "abcksgaaasadagadgsDaGdgfdshdfhsafgd", groups: undefined]
    0: "a"
    groups: undefined
    index: 0
    input: "abcksgaaasadagadgsDaGdgfdshdfhsafgd"
    length: 1
    __proto__: Array(0)
```


## **有g**

- 如果 regexp 具有标志 g，则 match() 方**法将执行全局检索**，找到 **stringObject 中的所有匹配子字符串。**
- **若没有找到任何匹配的子串，则返回 null。**
- 如果找到了一个或多个匹配子串 **，则返回一个数组**。
- 不过全局匹配返回的数组的内容与前者大不相同，
  - **它的数组元素中存放的是 stringObject 中所有的匹配子串**，**而且也没有 index 属性或 input 属性。**

```javascript 
  0: "a"
    1: "a"
    2: "a"
    3: "a"
    4: "a"
    5: "a"
    : "a"
    7: "a"
    8: "a"
    length: 9
    _proto__: Array(0)
```


注意：在全局检索模式下，match() 即不提供与子表达式匹配的文本的信息，也不声明每个匹配子串的位置。如果您需要这些全局检索的信息，可以使用 RegExp.exec()。

# Exec

3.如果要子表达式匹配的文本的信息，使用api:  reg.exec() 于match 非常类似
