# 复制 移动

## 目录

- [复制文件](#复制文件)
- [移动 rename](#移动-rename)
- [拷贝并移动 copyFileSync](#拷贝并移动-copyFileSync)
  - [fs.copyFile(src, dest\[, flags\], callback)](#fscopyFilesrc-dest-flags-callback)

# 复制文件

```typescript 


var fs = require('fs');
var path = require('path');

var fileName = "coverflow-3.0.1.zip";

var sourceFile = path.join(__dirname, fileName);
var destPath = path.join(__dirname, "dest", fileName);

var readStream = fs.createReadStream(sourceFile);
var writeStream = fs.createWriteStream(destPath);
readStream.pipe(writeStream);
console.log("复制完成")


```


# 移动 rename

移动文件可以用 fs.rename() 来实现
**如果目标文件夹下有同名文件，则会被覆盖。**

```typescript 
var fs = require('fs');
var path = require('path');

var fileName = "coverflow-3.0.1.zip";

var sourceFile = path.join(__dirname, fileName);
var destPath = path.join(__dirname, "dest", fileName);

fs.rename(sourceFile, destPath, function (err) {
  if (err) throw err;
  fs.stat(destPath, function (err, stats) {
    if (err) throw err;
    console.log('stats: ' + JSON.stringify(stats));
  });
});
```


# 拷贝并移动 copyFileSync

## fs.copyFile(src, dest\[, flags], callback)

新增于: v8.5.0

- `src` [\<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type "<string>") | [\<Buffer>](https://www.nodeapp.cn/buffer.html#buffer_class_buffer "<Buffer>") | [\<URL>](https://www.nodeapp.cn/url.html#url_the_whatwg_url_api "<URL>") 要被拷贝的源文件名称
- `dest` [\<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type "<string>") | [\<Buffer>](https://www.nodeapp.cn/buffer.html#buffer_class_buffer "<Buffer>") | [\<URL>](https://www.nodeapp.cn/url.html#url_the_whatwg_url_api "<URL>") 拷贝操作的目标文件名
- `flags` [\<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type "<number>") 拷贝操作修饰符 **默认:** `0`
- `callback` [\<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function "<Function>")

异步的将 `src` 拷贝到 `dest`。Asynchronously copies `src` to `dest`. 默认情况下，如果 `dest` 已经存在会被覆盖。回调函数没有给出除了异常以外的参数。Node.js 不能保证拷贝操作的原子性。如果目标文件打开后出现错误，Node.js 将尝试删除它。

`flags` 是一个可选的整数，用于指定行为的拷贝操作。唯一支持的 flag 是 `fs.constants.COPYFILE_EXCL` ，如果 `dest` 已经存在，则会导致拷贝操作失败。

```typescript 
const  path =require('path')
const fs = require('fs')
const {promisify}  = require('util')
const argv = process.env.npm_lifecycle_event
const target = argv.split(':')?.[1] || 'pro'
const isTest = target === 'test'
const distPath = path.join(__dirname,'nginx','conf.d','audit.tinyvoice.net.conf')
const sourcePath = path.join(__dirname,'ng.bak',isTest?'dev':'prod','audit.tinyvoice.net.conf')

function switchOption(){
  promisify(fs.copyFile)(sourcePath,distPath,(err)=>{
    if (err) throw err;
    console.log('is ok');
  })
}
switchOption()


```
