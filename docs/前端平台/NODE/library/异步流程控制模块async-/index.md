# 异步流程控制模块async&#x20;

## 目录

- [async](#async)
  - [auto复杂流程控制](#auto复杂流程控制)
  - [waterfall 串行有关联](#waterfall-串行有关联)
  - [parallel 并行无关联](#parallel-并行无关联)
  - [series 串行无关](#series-串行无关)
  - [限制并发和队列  ](#限制并发和队列--)
    - [parallelLimit](#parallelLimit)
    - [queue](#queue)
- [step](#step)
  - [串行 有关  this](#串行有关-this)
  - [并行无关 this.parallel](#并行无关-thisparallel)
  - [并行 无关 this.group](#并行-无关-thisgroup)

# **async**

- 并行无关联：（多个异步同时请求，请求之间不依赖）
  - async.parallel(数组|对象,回调(err,result))  √
  - async.parallel(\[fn1(callback),fn2(callback)],处理函数(err,result))
    &#x20;     callback(err,数据)->callback(null,'one')
    &#x20;   async.parallel({xx:fn(callback),xx:fn(callback)},处理函数(err,result))
    &#x20;   花费时间是：用时最多的那个fn
- 串行有关联：（多个异步依次请求，请求之间依赖）
  - &#x20;async.waterfall(数组|对象,回调(err,result)) √
  - async.waterfall(\[fn1(callback){callback(null,data)},fn2(data,callback)],处理函数(err,result))
    &#x20;     result 接受最后一个函数传递过来的一个参数

**构建大型复杂逻辑 的后端应用； 管理复杂的同步异步逻辑；**

```bash 
npm i async -D
let async = require('async')
```


文档：[http://caolan.github.io/async/](http://caolan.github.io/async/ "http://caolan.github.io/async/")

其实总共 就 大约5种情况  串行无关/有关  并行无关/有关  组合复杂

## **auto复杂流程控制**

**复杂流程控制auto         适合复杂逻辑，需要Parallel又需要waterfull 恐怖； 要多厉害就有多厉害**

```typescript 
async.auto({
    //func1、func2是并行执行
    func1: function (callback) {
        //  console.log('in func1');
        setTimeout(()=>{
            callback(null, 'data', 'converted to array');
        },2000)
    },
    func2: function (callback) {
         console.log('in func2');
        callback(null, { "puncha": "during" });
    },
    func3: ["func2", function (results, callback) {  
         //func2执行完后才执行func3 
       console.log('in func3', results);
        callback(null, '3');
    }],
    func4: ["func1", "func3", function (results, callback) {
           //func1，func3执行完后才执行func4
          console.log('in func4',results);
      callback(null, {'file':results.func3, 'email':'user@example.com'});
    }],
    func5: function (callback) {
        console.log('in func5');
        callback(null, 'data', 'converted to array');
    },
}, function (err, results) {
    //最后返回func1、2、3、4结果
    console.log('err = ', err);
    console.log('results = ', results);
});
输出：
in func2
in func5
in func3 {
  func2: { puncha: 'during' },
  func5: [ 'data', 'converted to array' ]
}
in func4 {
  func2: { puncha: 'during' },
  func5: [ 'data', 'converted to array' ],
  func3: '3',
  func1: [ 'data', 'converted to array' ]
}
err =  null
results =  {
  func2: { puncha: 'during' },
  func5: [ 'data', 'converted to array' ],
  func3: '3',
  func1: [ 'data', 'converted to array' ],
  func4: { file: '3', email: 'user@example.com' }
}
```


## waterfall **串行有关联**

waterfall  区别于series

```typescript 
 async.waterfall([ 
     function (callback) { 
         callback(null, 'one', 'two'); 
     }, 
     function (arg1, arg2, callback) { 
         // 上面的 arg1就是'one'  arg2 就是  'two' 
         console.log(arg1,arg2) 
         callback(null, 'three'); 
     }, 
     function (arg1, callback) { 
         // arg1就是'three' 
         console.log(arg1) 
         callback(null, 'done'); 
     } 
 ], function (err, result) { 
     ///最后得到所有 
     console.log('err', err) 
     console.log('result',result) 
 }); 
 输出： 
 one two 
 three 
 err null 
 result done
```


## parallel **并行无关联**

```typescript 
 async.parallel([ 
     //并行同时执行 
     function(callback) { 
         setTimeout(function() { 
             callback(null, 'one'); 
         }, 200); 
     }, 
     function(callback) { 
         setTimeout(function() { 
             callback(null, 'two'); 
         }, 100); 
     } 
 ], 
 function(err, results) { 
     //等上面两个执行完返回结果 
     console.log('err', err) 
     console.log('result',results) 
 }); 
 输出： 
 err null 
 result [ 'one', 'two' ]
```


**或者（推荐这个）**

```typescript 
 async.parallel({ 
     one: function(callback) { 
         setTimeout(function() { 
             callback(null, 1); 
         }, 200); 
     }, 
     two: function(callback) { 
         setTimeout(function() { 
             callback(null, 2); 
         }, 100); 
     } 
 }, function(err, results) { 
     console.log('err',err) 
     console.log('result',results) 
 }); 
 输出： 
 err null 
 result { two: 2, one: 1 } 
 

```


## series **串行无关**

&#x20;  series   以数组的 顺序 异步函数的执行顺序

```typescript 
async.series([
    function (callback) {
        fs.readFile(filename1, encoding, callback);
    },
    function (callback) {
        fs.readFile(filename1, encoding, callback);
    }
], function (err, results) {
    // results => [file1.txt, file2.txt]
    console.log(err,results.toString())
});
 注意：callback并非由 使用者指定； 内部封装； 复合node的规范 
输出：
null {
    "a":1,
    "b":1,
    "c":2
},{
    "a":1,
    "b":1,
    "c":2
}
或者（ 推荐对象 ）
async.series({
    func1:function (callback) {
        fs.readFile(filename1, encoding, callback);
    },
    func2:function (callback) {
        fs.readFile(filename1, encoding, callback);
    }
}, function (err, results) {
    console.log(err,results)
});
输出：
null {
  func1: '{\r\n    "a":1,\r\n    "b":1,\r\n    "c":2\r\n}',
  func2: '{\r\n    "a":1,\r\n    "b":1,\r\n    "c":2\r\n}'
}
```


## \*\*限制并发和队列  \*\*

**parallelLimit()  和 queue()**

### parallelLimit

```typescript 
//parallelLimit 和 parallel()类似，但是多了一个 用于限制并发数量的参数，使得任务只能同时并发一定数量， 而不是无限制并发
async.parallelLimit([
    function (callback) {
        fs.readFile(resolve(filename1), 'utf-8', callback);
    },
    function (callback) {
        fs.readFile(resolve(filename2), 'utf-8', callback);
    }
], 1, function (err, results) {
    // TODO
    console.log(results.toString(), 'res')
});
// 输出：{
//     "a":1,
//     "b":1,
//     "c":2
// },{
//     "name":"这里是data2"
// } res
```


### **queue**

```typescript 
//queue  方法动态的添加并行任务 
var q = async.queue(function (file, callback) {
    fs.readFile(file, 'utf-8', callback);
}, 5);
let resolve = function (file) {
    return path.resolve(__dirname, file)
}
let arr = fs.readdirSync('./test/').filter(file=>/\.json$/.test(file))
arr.forEach(function (file) {
    q.push(resolve(file), function (err, data) {
        // TODO
        console.log(err,data)
    });
});
q.saturated = function() {
    console.log('all workers to be used');
}
q.empty = function() {
    console.log('no more tasks wating');
}
q.drain = function() {
    console.log('all tasks have been processed')
}
```


[async.js](./file/async_dM6iA6nGdr.js "async.js")

# **step**

**step  和async 同类型的流程控制模块**

**那他们有什么不一样：更轻量（服务端这个优势没多大） api暴露更加一致（对使用者来说比较好）**

**但是我个人更喜欢async；** ​**step接受任意数量的任务；所有任务都将串行一次执行**

## **串行 有关  this**

```typescript 
Step(
    function readFile1() {
        fs.readFile(resolve(filename1) ,encoding , this);
    },
    function readFile2(err, content) {
        console.log(content)
        fs.readFile(resolve(filename2), encoding, this);
    },
    function done(err, content,a) {   // 这里收不到a，  content只是最后一串的 data返回 ；封装到 this里；复合node 规范
        console.log(err)
        console.log(content);
    }
);
这里最为关键的是this 相当于next 函数  都是高阶函数的应用
输出：
{
    "a":1,
    "b":1,
    "c":2
}
null
{
    "name":"这里是data2"
}
```


## **并行无关 this.parallel**

```typescript 
 function asyncCall(callback) { 
     process.nextTick(function () {   // 同样是异步；第一个为null 第三个参数被抛弃了 
         callback(null, 'result1', 'result2'); 
     }); 
 } 
 Step( 
     function readFile1() { 
         fs.readFile(resolve(filename1), 'utf-8', this.parallel()); 
         fs.readFile(resolve(filename2), 'utf-8', this.parallel()); 
         asyncCall(this.parallel()) 
     }, 
     function done(err, content1, content2,content3) { 
         // content1 => file1 
         // content2 => file2 
         console.log(err); 
         console.log(content1); 
         console.log(content2); 
         console.log(content3); 
     } 
 ); 
 输出： 
 undefined 
 { 
     "a":1, 
     "b":1, 
     "c":2 
 } 
 { 
     "name":"这里是data2" 
 } 
 result1
```


## **并行 无关 this.group**

```typescript 
Step(
    function readDir(){
        fs.readdir(__dirname, this);
    },
    function readFiles(err, results) {
        if (err) throw err;
        // Create a new group
        var group = this.group();
        results.forEach(function (filename) {
            if (/\.json$/.test(filename)) {
                fs.readFile(__dirname + "/" + filename, 'utf8', group());
            }
        });
    },
    function showAll(err, files) {
        if (err) throw err;
        console.log(files.toString());
    }
)
输出：
{
    "a":1,
    "b":1,
    "c":2
},{
    "name":"这里是data2"
}

有两次 group的调用； 第一次是告诉step要并行执行；
第二次调用的结果将会生成一个回调函数，而回调函数的返回值将按组存储
和 parallel 的区别
    parallel 的传递结果
    function (err, result1, result2, ...);
    group()的传递结果：
    function (err, results);
        返回值为数组 中
```


[step.js](./file/step_QMCLHdplaK.js "step.js")
