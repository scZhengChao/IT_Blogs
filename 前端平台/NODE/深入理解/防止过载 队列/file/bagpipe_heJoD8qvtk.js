//十分尴尬的事； 作者的npm 和 github 竟然不同步； 所以我把他源码给搞下来了
var Bagpipe = require('./bagpipe-source');
var fs = require('fs')
var path = require('path')
function resolve(filepath) {
    return path.resolve(__dirname, filepath)
}

// 深度使用
// refuse 拒绝模式 如果等待的调用队列也满了之后，新来的调用就直接它一个队列太忙的拒绝异常(阈值在于调用队列也满了之后)
//超时控制  为了防止调用的耗时太久，调用产生的速度远远高于执行的速度；需要设置一个时间阈值(阈值在异步操作时间)
//要理解这上面的两种区别
var bagpipe = new Bagpipe(10, {
    refuse: false,
    timeout:3000
});


function async (data,encode,cb){
    setTimeout(()=>{
        cb(null,'123')
    },2600)
}
bagpipe.on('full', function(length) {
    console.log('底层系统处理不能及时完成，队列拥堵，目前队列长度为：' + length);
});

for (var i = 0; i < 1300; i++) {
  // fs.readFile(files[i], 'utf-8', function (err, data) {
//   bagpipe.push(fs.readFile,resolve('./data.json') , 'utf-8', function (err, data) {
    bagpipe.push(async,resolve('./data.json') , 'utf-8', function (err, data) {
        // won’t occur error because of too many file descriptors
        // well done
        console.log(err,data)
    });
}



