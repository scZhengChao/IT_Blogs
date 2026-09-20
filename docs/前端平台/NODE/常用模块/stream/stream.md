# stream

## 目录

- [读写图片](#读写图片)

# 读写图片

```typescript 

const fs = require('fs')
const rs = fs.createReadStream('./img.png')
const ws = fs.createWriteStream('./img2.png')
//pipe  参考gulp  管道连接  尽量小的减少内存占用； 防止一次将图片读入内存中
rs.pipe(ws)

//stream 继承自 EventEmitter；具备基本的自定义事件功能， node中大多数模块都有stream的应用；
//例如：
//fs  createReadStream  和 createWriteStream 创建文件的可读流和可写流
const fs = require('fs')
const path = require('path')
function resolve(file){
    return path.resolve(__dirname,file)
}
// var reader = fs.createReadStream(resolve('data.json'));
// var writer = fs.createWriteStream(resolve('out.json'));
// reader.on('data', function (chunk) {
//     writer.write(chunk);
// });
// reader.on('end', function () {
//     writer.end();
// });

//由于读写模式固定，上述方法有更简洁的方法
var reader = fs.createReadStream(resolve('data.json'))
var writer = fs.createWriteStream(resolve('out.text'))
reader.pipe(writer);

/ /可读流提供了管道方法pipe(),封装了data事件和写入操作。通过流的方式，上述代码不会受到v8内存的限制，有效地提高了程序的健壮性；
```
