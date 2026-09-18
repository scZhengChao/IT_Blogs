const async = require('async')
let path = require('path')
const fs = require('fs')
let filename1 = './data.json'
let filename2 = './data2.json'
let encoding = 'utf-8'
let resolve = function (file) {
    return path.resolve(__dirname, file)
}

// 串行    以数组的 顺序 异步函数的执行顺序
// async.series({
//     func1:function (callback) {
//         fs.readFile(resolve(filename1), encoding, callback);
//     },
//     func2:function (callback) {
//         fs.readFile(resolve(filename1), encoding, callback);
//     }
// }, function (err, results) {
//     // results => [file1.txt, file2.txt]
//     console.log(err,results)
// });



// -----------------------------------------------
// async.auto({
//     //func1、func2是并行执行
//     func1: function (callback) {
//         //  console.log('in func1');
//         setTimeout(()=>{
//             callback(null, 'data', 'converted to array');
//         },2000)
//     },
//     func2: function (callback) {
//          console.log('in func2');
//         callback(null, { "puncha": "during" });
//     },
//     func3: ["func2", function (results, callback) {  
//         //func2执行完后才执行func3
//        console.log('in func3', results);
//         callback(null, '3');
//     }],
//     func4: ["func1", "func3", function (results, callback) {
//           //func1，func3执行完后才执行func4
//          console.log('in func4',results);
//       callback(null, {'file':results.func3, 'email':'user@example.com'});
//     }],
//     func5: function (callback) {
//         console.log('in func5');
//         callback(null, 'data', 'converted to array');
//     },
// }, function (err, results) {
//     //最后返回func1、2、3、4结果
//     console.log('err = ', err);
//     console.log('results = ', results);
// });

// -------------------------------------------------------------
// 串行
// async.waterfall([
//     function (callback) {
//         callback(null, 'one', 'two');
//     },
//     function (arg1, arg2, callback) {
//         // 上面的 arg1就是'one'  arg2 就是  'two'
//         console.log(arg1,arg2)
//         callback(null, 'three');
//     },
//     function (arg1, callback) {
//         // arg1就是'three'
//         console.log(arg1)
//         callback(null, 'done');
//     }
// ], function (err, result) {
//     ///最后得到所有
//     console.log('err', err)
//     console.log('result',result)
// });




//----------------------------------------
// 并行
// async.parallel([
//     //并行同时执行
//     function(callback) {
//         setTimeout(function() {
//             callback(null, 'one');
//         }, 200);
//     },
//     function(callback) {
//         setTimeout(function() {
//             callback(null, 'two');
//         }, 100);
//     }
// ],
// function(err, results) {
//     //等上面两个执行完返回结果
//     console.log('err', err)
//     console.log('result',results)
// });


// async.parallel({
//     one: function(callback) {
//         setTimeout(function() {
//             callback(null, 1);
//         }, 200);
//     },
//     two: function(callback) {
//         setTimeout(function() {
//             callback(null, 2);
//         }, 100);
//     }
// }, function(err, results) {
//     console.log('err',err)
//     console.log('result',results)
// });




//--------------------------------------------------------
// 异步调用的限制  并行   类似于队列  并不是暂存而是 废弃
// async.parallelLimit([
//     function (callback) {
//         fs.readFile(resolve(filename1), 'utf-8', callback);
//     },
//     function (callback) {
//         fs.readFile(resolve(filename2), 'utf-8', callback);
//     }
// ], 1, function (err, results) {
//     // TODO
//     console.log(results.toString(), 'res')
// });
// 输出：{
//     "a":1,
//     "b":1,
//     "c":2
// },{
//     "name":"这里是data2"
// } res


var q = async.queue(function (file, callback) {
    fs.readFile(file, 'utf-8', callback);
}, 3);

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