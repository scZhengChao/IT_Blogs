# 异步转promise

## 目录

- [Q](#Q)
  - [Q('str') ](#Qstr-)
  - [fcall](#fcall)
  - [nfcall](#nfcall)
  - [denodeify](#denodeify)
  - [defer](#defer)
  - [makeNodeResolver](#makeNodeResolver)
  - [all](#all)
  - [coding](#coding)
- [Memeda](#Memeda)

# Q

**主要是对不是promise 的函数；异步函数；静态字符 封装；从5以后就是node约定俗成的模式的一个错误捕捉且封装promise**

## **Q('str')**&#x20;

- **将数据封装成promise ; 特点：封装一个数据，调用then直接得到该数据**

```typescript 
 Q('hello,world').then(function (data) { 
     console.log(data);  //-->hello,world 
 });
```


## **fcall**

- **将同步方法封装成promise;特点：传递一个function，返回一个promise，** ​**调用then得到方法的返回值**

```typescript 
 Q.fcall(function(){ 
     return 123; 
 }).then(function(data){ 
     console.log(data);  //--> 123 
 });
```


## **nfcall**

- **将异步方法封装成promise ; 特点：封闭时就得传递调用方法的参数，直接得到promise**

```typescript 
 var filename = '../public/test.xml'; 
 var encoding = 'utf-8'; 
 Q.nfcall(fs.readFile,filename,encoding).then(function (data) { 
     console.log(data);  //-->xml内容就不明说了，就这样的格式就对了 
 })
```


## **denodeify**

- **将异步方法封装成promise ; 特点：封装后返回一个方法，调用此方法得到promise**

```typescript 
 var File_denodeify = Q.denodeify(fs.readFile); 
 File_denodeify(filename,encoding).then(function(result){ 
         console.log(result.green) 
     },function(err){ 
         console.log(err.toString().red); 
     } 
 );
```


## **defer**

- **手动封装一个promise ; //特点：使用deferd对象的reject方法（失败回调）、resolve方法（成功回调）、promise属性来实现自定义promise。**

**（前面2个nfcal、denodeify底层应该也是用deferd实现的）**

```typescript 
var File_deferd = function(filename,encoding){
    var deferred = Q.defer();
    fs.readFile(filename,encoding,function(err,result){
        if(err){
           deferred.reject(err.toString().red);
        }
        deferred.resolve(result);
    });
    return deferred.promise;

};

//标准的then(onFulfilled,onRejected);    toString() 必须要；否则必须
 File_deferd(filename).then(function(result){
       console.log(JSON.parse(result.toString()).a );
   },function(err){
       console.log(err.toString());
   }
);

//用catch()捕获错误
File_deferd(filename).then(function(result){
        console.log(result.toString().blue);
}).catch(function (err) {
    console.error(err);
});
```


## **makeNodeResolver**

**(这个就是封装了下defer的resolve和reject）（当前模块最重要的）**

**特点：和第deferd原理差不多，只不过用了deferd自带的方法省掉了我们手动实现reject方法、resolve方法**

```typescript 
var File_makeNodeResolver = function(filename,encoding){
    var deferred = Q.defer();
    fs.readFile(filename,encoding,deferred.makeNodeResolver());
    return deferred.promise;
};

File_makeNodeResolver(filename,encoding).then(function(result){
    console.log(result);
},function(err){
    console.log(err.toString());
});
```


**本人基于作者的改造**

```typescript 
var File_makeNodeResolver = function(fn,filename,encoding){
    var deferred = Q.defer();
    let args = [...arguments]
    args.shift()
    fn(...args,deferred.makeNodeResolver())
    return deferred.promise;
};

File_makeNodeResolver(fs.readFile,filename,encoding).then(function(result){
    console.log(result);
},function(err){
    console.log(err.toString());
});
```


**或者用工厂函数（本人改造）**

```typescript 
function createmakeNodeResolver(fn){
    return function(filename,encoding){
        var deferred = Q.defer();
        fn(filename,encoding,deferred.makeNodeResolver());
        return deferred.promise;
    }
}

createmakeNodeResolver(fs.readFile)(filename,encoding).then(res=>{
    console.log(res)
}).catch(err=>{
    console.log(err)
})
```


## **all**

**Q.all 同promise.all**

```typescript 
Q.all([promise1,promise2,promise3]).then()
let p1 = Q.nfcall(fs.readFile,filename,encoding)
let p2 = Q.nfcall(fs.readFile,filename2,encoding)
Q.all([p1,p2]).then(function(res){
    console.log(res.toString())
})
```


## coding

[q.js](https://github.com/scZhengChao/IT_Blogs/releases/download/assets-v1/q_NY_YYKhjT7.js "q.js")

# **Memeda**

**这个主要是不再进行error的判断**; API设计中，尤其是中间层调用，常常要写这么大一段代码：

```typescript 
var api = function (param, callback) {
  param.name = 'some name';
  async(param, function (err, data) {
    if (err) {
      return callback(err);
    }
    // 对返回结果进行加工
    var ret = data.toString();
    callback(null, ret);
  });
};

```


在社区，异常通过回调函数的第一个参数传递，已经是一个共识。但是面对到处都是的：

```typescript 
if (err) {
  return callback(err);
}

```


有时候还是会心烦。那么更语义的API来了：

```typescript 
var failing = require('memeda').failing;
var api = function (param, callback) {
  param.name = 'some name';
  async(param, failing(callback).passing(function (data) {
    // 对返回结果进行加工
    var ret = data.toString();
    callback(null, ret);
  });
};

或者更简单:
async(param, memeda(callback, function (data) {
  // 对返回结果进行加工
  var ret = data.toString();
  callback(null, ret);
});
备注：failing与passing总是成对出现

```


**以上是作者的话****（当前包最重要的一块）** ​

```typescript 
const memeda = require('memeda')
var failing = require('memeda').failing;
var passing = require('memeda').passing;
function callback (err,data){
    console.log(err,data)
}
function callbackerror (err,data){
    console.log(err,data,'error')
}
fs.readFile(filename,encoding,memeda(callbackerror, function (data) {
    // 对返回结果进行加工
    var ret = data.toString();
    callback(null, ret);
}));
```


或者：

```typescript 
 var failing = require('memeda').failing; 
 var passing = require('memeda').passing; 
 fs.readFile(filename, encoding, failing(function (err) { 
     console.log(err) 
     // TODO 
 }).passing(function (data) { 
     // TODO 
     console.log(data) 
 })); 
 省略了多少 我真没看出来；
```
