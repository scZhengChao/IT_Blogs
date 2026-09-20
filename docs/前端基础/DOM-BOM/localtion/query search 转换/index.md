# query search 转换

## 目录

- [search转对象](#search转对象)
  - [一](#一)
  - [二](#二)
- [对象转search](#对象转search)

# search转对象

## 一

```react tsx 
//getQuery 原生收取 query 封装
function getQuery(){
    try{
      var search = location.search
      var obj = {}
      var arr = search.slice(1).split('&')
      for(var i= 0 ; i < arr.length ; i++){
        var itmeArr = arr[i].split('=');
        obj[itmeArr[0]] = itmeArr[1];
      }
      return obj
    }catch(err){
      return {}
    }
}

```


## 二

```react tsx 
//或者  window.location.search 转 JS 对象
const searchObj = search => JSON.parse(`{"${
decodeURIComponent(search.substring(1))
.replace(/"/g, '\\"')
.replace(/&/g, '","')
.replace(/=/g, '":"')}"
}`);
```


# 对象转search

```react tsx 
JS 对象转 url 查询字符串
const objectToQueryString = (obj) => 
Object.keys(obj).map((key) => 
`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
.join('&');


objectToQueryString({name: 'Jhon', age: 18, address: 'beijing'})
// name=Jhon&age=18&address=beijing
```
