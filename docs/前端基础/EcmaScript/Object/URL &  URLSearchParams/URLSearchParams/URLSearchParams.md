# URLSearchParams

## 目录

- [从 URL 创建](#从-URL-创建)
- [获取参数](#获取参数)
- [获取所有](#获取所有)
- [添加参数](#添加参数)
- [修改参数](#修改参数)
- [删除参数](#删除参数)
- [遍历参数
  ](#遍历参数)
- [排序参数](#排序参数)
- [转换为字符串](#转换为字符串)
- [是否有参数](#是否有参数)
- [枚举键名](#枚举键名)
- [枚举值](#枚举值)
- [自动处理特殊字符的编码](#自动处理特殊字符的编码)
- [处理多值参数](#处理多值参数)
  - [使用场景](#使用场景)
    - [场景一 获取浏览器地址参数](#场景一-获取浏览器地址参数)
    - [使用URLSearchParams处理axios发送的数据](#使用URLSearchParams处理axios发送的数据)

URLSearchParams 用于**处理 URL 中的查询参数（即问号后的部分）**

# 从 URL 创建

```javascript 
// 从 URL 创建
const url = new URL('https://example.com?name=John&age=30');
const params = url.searchParams;

// 直接创建
const params2 = new URLSearchParams('name=John&age=30');
const params3 = new URLSearchParams({ name: 'John', age: '30' });
```


# 获取参数

```javascript 
console.log(params.get('name'));  // 'John'
console.log(params.get('age'));   // '30'
console.log(params.has('city'));  // false

letparams = new URLSearchParams(document.location.search.substring(1)); 
let name = params.get("name"); // is the string "Jonathan"
let age = parseInt(params.get("age"), 10); // is the number 18// 查找一个不存在的键名则返回 null:
let address = params.get("address"); // null

```


# 获取所有

- getAll(name):获取指定**搜索参数的所有值，返回是一个数组**。 name是返回的参数的名称。

```javascript 
 let url = new URL('https://example.com?foo=1&bar=2');  
letparams = new URLSearchParams(url.search.slice(1));   
 //为foo参数添加第二个值  
params.append('foo', 4);  
console.log(params.getAll('foo'))' 
//输出 ["1","4"].
```


# 添加参数

```javascript 
params.append('city', 'New York');
params.append('city', 'Los Angeles'); // 可以添加多个同名参数
console.log(params.getAll('city'));   // ['New York', 'Los Angeles']
```


# 修改参数

- set(name, value):设置一个搜索参数的新值，\***假如原来有多个值将删除其他所有的值**\*。  其中name是需要插入修改参数的键名，value是需要插入搜索参数的新值。

```javascript 
params.set('age', '31');  // 替换所有同名参数
params.set('city', 'Chicago'); // 替换所有同名参数

let url = new URL('https://example.com?foo=1&bar=2'); 
let params = new URLSearchParams(url.search.slice(1));  
//Add a third parameter.
params.set('baz', 3);


```


# 删除参数

```javascript 
params.delete('age');
```


遍历参数

```javascript 
params.forEach((value, name) => {
  console.log(`${name}: ${value}`);
});

// 创建一个测试用 URLSearchParams 对象
let searchParams = new URLSearchParams("key1=value1&key2=value2");  
// 显示键/值对
for(var pair of searchParams.entries()) {    
  console.log(pair[0]+ ', '+ pair[1]);  
}  
// key1, value1// key2, value2

```


# 排序参数

```javascript 
// Create a test URLSearchParams object 
let searchParams = new URLSearchParams("c=4&a=2&b=3&a=1");   
// Sort the key/value pairs 
searchParams.sort();  
// Display the sorted query string 
console.log(searchParams.toString());  
// a=2&a=1&b=3&c=4

```


# 转换为字符串

- toString():返回搜索参数组成的字符串，可直接使用在URL上。

```javascript 
let url = new URL('https://example.com?foo=1&bar=2');
letparams = new URLSearchParams(url.search.slice(1));  
//Add a second foo parameter.
params.append('foo', 4); 
console.log(params.toString()); 
//Prints 'foo=1&bar=2&foo=4'.

```


# 是否有参数

- has(name):返回 Boolean 判断是否存在此搜索参数。 name 是我们要查询的参数的键名。

```javascript 
 let url = new URL('https://example.com?foo=1&bar=2'); 
letparams = new URLSearchParams(url.search.slice(1));  
params.has('bar') === true;  //true
```


# 枚举键名

- keys():返回iterator 此对象包含了键/值对的所有键名。

```javascript 
 // 建立一个测试用URLSearchParams对象 
let searchParams = new URLSearchParams("key1=value1&key2=value2");   
 // 输出键值对 
for(var key of searchParams.keys()) {    
  console.log(key);  
}  
 // key1 // key2
```


# 枚举值

- values():返回iterator 此对象包含了键/值对的所有值。

```javascript 
 // 创建一个测试用URLSearchParams对象 
let searchParams = new URLSearchParams("key1=value1&key2=value2");  
 // 输出值 
for(var value of searchParams.values()) {  
  console.log(value);
}
```


上面就是针对其所有的接口方法进行的一个梳理。然而，感觉好像和我们平时的关联没有很大呢？下面让我们来看几个具体的使用场景。

# 自动处理特殊字符的编码

```javascript 
// 创建包含特殊字符的参数
const params = new URLSearchParams();
params.append('name', 'John Doe');
params.append('message', 'Hello, world!');
params.append('date', '2023-01-01');
params.append('price', '$100');

// 输出编码后的字符串
console.log(params.toString());
// 输出: name=John+Doe&message=Hello%2C+world%21&date=2023-01-01&price=%24100

// 解码参数
const encoded = 'name=John+Doe&message=Hello%2C+world%21';
const decodedParams = new URLSearchParams(encoded);
console.log(decodedParams.get('name'));      // 'John Doe'
console.log(decodedParams.get('message'));   // 'Hello, world!'

```


# 处理多值参数

- 当需要传递多个相同名称的参数时，URLSearchParams 提供了简便的方法。

```javascript 
// 创建包含多个相同名称的参数
const params = new URLSearchParams();
params.append('category', 'books');
params.append('category', 'movies');
params.append('category', 'music');

// 获取所有同名参数
const categories = params.getAll('category');
console.log(categories);  // ['books', 'movies', 'music']

// 检查是否存在参数
console.log(params.has('category'));  // true
console.log(params.has('author'));    // false

// 删除所有同名参数
params.delete('category');
console.log(params.has('category'));  // false

```


## 使用场景

### 场景一 获取浏览器地址参数

我们之前在获取浏览器地址参数时很多时候是通过对地址进行分割，然后拼接字段对象的方式来做的，类似

```javascript 
function GetRequest() {
  let url = location.search; //获取url中"?"符后的字串
  let theRequest = new Object();
  if (url.indexOf("?") != -1) {
    let str = url.substr(1);
    strs = str.split("&");
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
    }
  }
  return theRequest;
}
```


但是我们如果使用URLSearchParams时就不用这么繁琐了

```javascript 
const params = new URLSearchParams(location.search) 

params.get(key)
```


### 使用URLSearchParams处理axios发送的数据

在我们使用axios和fetch来替换之前的ajax进行数据请求时，我们会遇到数据格式不一致的问题。

```typescript 
axios({
    method: 'post',
    url: '/test',
    data: {
        name: 'li lei',
        age: 18
    }
})
```


上面的调用方法和我们使用ajax时非常相似，我们可能也会自然而然的这样来写，但是我们会发现，其默认的数据格式是有差别的：

axios数据格式：&#x20;

![  ](41085ef9444c6ee61155bae5900a6724_6RunTh3Wgb.png "  ")

ajax数据格式：&#x20;

![  ](7817f45b296e1e401cf34f7def78e9c4_VuNUq42iY8.png "  ")

是的，多了一层包裹，这样和我们后端的对接就出现问题了。哪怕是手动去修改ContentType为application/x-www-form-urlencoded仍然没有解决。

![  ](c0da98121ff0537c791f104b726ae1d4_hc3ko5YCpU.png "  ")

那么URLSearchParams能如何解决呢

```javascript 
let params = new URLSearchParams();
params.append('name', 'li lei');
params.append('age', 18);
axios({
    method: 'post',
    url: '/test',
    data: params
})
```
