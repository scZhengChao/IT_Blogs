# fs

## 目录

- [fs](#fs)
  - [exists](#exists)
  - [stat](#stat)
  - [access](#access)
  - [mkdir](#mkdir)
    - [fsPromises.mkdir(path\[, options\])#](#fsPromisesmkdirpath-options)
  - [writeFile](#writeFile)
  - [unlinkSync](#unlinkSync)
  - [readdir](#readdir)
  - [readFile](#readFile)
  - [createReadStream/createWriteStream](#createReadStreamcreateWriteStream)
  - [isDirectory](#isDirectory)
  - [writeSync](#writeSync)
- [fs-extra](#fs-extra)
  - [1.文件是否存在](#1文件是否存在)
  - [2、移动文件、目录](#2移动文件目录)
  - [3.emptyDir 清空目录](#3emptyDir-清空目录)
  - [4.copy 复制文件](#4copy-复制文件)
  - [5.ensureDir 创建目录](#5ensureDir-创建目录)
  - [6.ensureFile 创建文件](#6ensureFile-创建文件)
  - [场景：](#场景)

# fs

```typescript 
const fs = require('fs');
//所有文件系统操作都具有同步和异步的形式。
//异步的形式总是将完成回调作为其最后一个参数。 传给完成回调的参数取决于具体方法，但第一个参数始终预留用于异常。
//如果操作成功完成，则第一个参数将为 null 或 undefined。

```


## exists

```typescript 
fs.exists(path, callback)
fs.existsSync(templatePath)  同步
 稳定性: 0 - 废弃:  
改为使用 fs.stat() 或 fs.access()。
 通过检查文件系统来测试给定的路径是否存在 。 然后调用 callback 并带上参数 true 或 false：
```


## stat

```typescript 
fs.stat(path[, options], callback)
statSync
    不建议在调用 fs.open()、 fs.readFile() 或 fs.writeFile() 之前使用 fs.stat() 检查文件是否存在。 
    而是应该直接打开、读取或写入文件， 如果文件不可用则处理引发的错误。
    要检查文件是否存在但随后并不对其进行操作，则建议使用 fs.access()。 
  
stats = fs.statSync(filepath);可以检查改路仅文件是否存在;  返回 fs.Stats类：
输出：
Stats {
  dev: 2532714099,
  mode: 33206,
  nlink: 1,
  uid: 0,
  gid: 0,
  rdev: 0,
  blksize: 4096,
  ino: 1125899906880022,
  size: 221,
  blocks: 0,
  atimeMs: 1589352135461.142,
  mtimeMs: 1589352135461.142,
  ctimeMs: 1589352135461.142,
  birthtimeMs: 1589352128617.0125,
  atime: 2020-05-13T06:42:15.461Z,
  mtime: 2020-05-13T06:42:15.461Z,
  ctime: 2020-05-13T06:42:15.461Z,
  birthtime: 2020-05-13T06:42:08.617Z
}

```


## access

```typescript 
fs.access(path[, mode], callback)
 测试用户对 path 指定的文件或目录的权限 。 mode 参数是一个可选的整数，指定要执行的可访问性检查。 
mode 可选的值参阅文件可访问性的常量。
可以创建由两个或更多个值按位或组成的掩码（例如 fs.constants.W_OK | fs.constants.R_OK）。
最后一个参数 callback 是一个回调函数，调用时将传入可能的错误参数。 
如果可访问性检查失败，则错误参数将是 Error 对象。


以下示例检查 package.json 是否存在，以及它是否可读或可写。
const file = 'package.json';

// 检查当前目录中是否存在该文件。
fs.access(file, fs.constants.F_OK, (err) => {
  console.log(`${file} ${err ? '不存在' : '存在'}`);
});

// 检查文件是否可读。
fs.access(file, fs.constants.R_OK, (err) => {
  console.log(`${file} ${err ? '不可读' : '可读'}`);
});

// 检查文件是否可写。
fs.access(file, fs.constants.W_OK, (err) => {
  console.log(`${file} ${err ? '不可写' : '可写'}`);
});

// 检查当前目录中是否存在该文件，以及该文件是否可写。
fs.access(file, fs.constants.F_OK | fs.constants.W_OK, (err) => {
  if (err) {
    console.error(
      `${file} ${err.code === 'ENOENT' ? '不存在' : '只可读'}`);
  } else {
    console.log(`${file} 存在，且它是可写的`);
  }
});
```


## mkdir

```typescript 
fs.mkdir(path[, options], callback)
  异步地创建目录。 除了可能的异常，完成回调没有其他参数。
  可选的 options 参数可以是指定模式（权限和粘滞位）的整数，也可以是具有 mode 属性和 recursive 属性（指示是否应创建父文件夹）的对象。
```


#### `fsPromises.mkdir(path[, options])`[#](https://nodejs.cn/api/fs.html#fspromisesmkdirpath-options "#")

新增于: v10.0.0

- `path` [\<string>](https://web.nodejs.cn/en-US/docs/Web/JavaScript/Data_structures#String_type "<string>") | [\<Buffer>](https://nodejs.cn/api/buffer.html#class-buffer "<Buffer>") | [\<URL>](https://nodejs.cn/api/url.html#the-whatwg-url-api "<URL>")
- `options` [\<Object>](https://web.nodejs.cn/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object "<Object>") | [\<integer>](https://web.nodejs.cn/en-US/docs/Web/JavaScript/Data_structures#Number_type "<integer>")
  - `recursive` [\<boolean>](https://web.nodejs.cn/en-US/docs/Web/JavaScript/Data_structures#Boolean_type "<boolean>") 默认值：`false`
  - `mode` [\<string>](https://web.nodejs.cn/en-US/docs/Web/JavaScript/Data_structures#String_type "<string>") | [\<integer>](https://web.nodejs.cn/en-US/docs/Web/JavaScript/Data_structures#Number_type "<integer>") Windows 上不支持。默认值：`0o777`。

**异步地创建目录。**

可选的 `options` 参数可以是指定 `mode`（权限和粘性位）的整数，也可以是具有 `mode` 属性和 `recursive` 属性（指示是否应创建父目录）的对象。当 `path` 是已存在的目录时，调用 `fsPromises.mkdir()` 仅在 `recursive` 为 false 时才导致拒绝。

```javascript 
const { mkdir } = require('node:fs/promises');
const { join } = require('node:path');

async function makeDirectory() {
  const projectFolder = join(__dirname, 'test', 'project');
  const dirCreation = await mkdir(projectFolder, { recursive: true });

  console.log(dirCreation);
  return dirCreation;
}

makeDirectory().catch(console.error);
```


## writeFile

```typescript 
fs.writeFile(file, data[, options], callback)
fs.writeFileSync(filePath, result);同步
 当 file 是一个文件名时，异步地将数据写入到一个文件，如果文件已存在则覆盖该文件。 data 可以是字符串或 buffer。文件不存在则创建一个
```


## unlinkSync

```typescript 
fs.unlinkSync(path) 
同步的删除 文件,   try catch 捕捉错误.
```


## readdir

```typescript 
fs.readdir(path[, options], callback)
fs.readdirSync('./src/views') 同步内容
异步的 readdir(3)。 读取目录的内容。
回调有两个参数 (err, files)，其中  files 是目录中的文件名的数组（不包括 '.' 和 '..'）。 
[ 'async.js', 'data.json', 'data2.json', 'q.js', 'step.js' ]
可选的 options 参数可以是指定编码的字符串，也可以是具有 encoding 属性的对象，该属性指定用于传给回调的文件名的字符编码。 
  如果 encoding 设置为 'buffer'，则返回的文件名是 Buffer 对象。
  如果 options.withFileTypes 设置为 true，则 files 数组将包含 fs.Dirent 对象。
```


## readFile

```typescript 
fs ：读取文件
    fs.readFile(路径/文件,[配置],回调(err,data))
   fs.readFile('./htdos/index.html','utf-8',(err,data)=>{
        console.log('err',err);//null 没有错误
        console.log(data)//二进制Buffer流
    })
// 同步
 const data = fs.readFileSync('./download.js')
 console.log(data.toString())

//异步
const { promisify} = require('util')
fs.readFile('./download.js',(err,data)=>{
    if(err) throw Error()
    console.log(data.toString())
})
//promisify
var readfile = promisify(fs.readFile)
readfile('./download.js').then(data=>{
     console.log(data.toString())
})
```


## createReadStream/createWriteStream

```typescript 
// 二进制友好 图片复制图片
const fs = require('fs')
const rs = fs.createReadStream('./img.png')
const ws = fs.createWriteStream('./img2.png')
rs.pipe(ws)
```


## isDirectory

```typescript 
stats.isDirectory()  如果 fs.Stats 对象描述文件系统目录，则返回 true。
```


## writeSync

```typescript 
fs.writeSync(1, 'hello, world')  
console.log（） 是异步资源  而他是同步；目前不清楚其他用法
```


# **fs-extra**

fs-extra模块是系统fs模块的扩展，提供了更多便利的 API，并继承了fs模块的 API。

### 1.文件是否存在

```javascript 
 const fs = require('fs-extra');
const isFile = v =>fs.pathExistsSync(v)  // ture or false
```


### 2、移动文件、目录

```javascript 
 move(src, dest, [options], callback)
```


### 3.emptyDir 清空目录

确保一个目录是空的。如果目录非空删除目录内容。如果目录不存在,就创建一个。目录本身并不是删除。

```typescript 
异步:emptydir()
同步:emptyDirSync(), emptydirSync()
var fs = require('fs-extra')
//假设这个目录下有很多文件和文件夹
fs.emptyDir('/tmp/some/dir', function (err) {
  if (!err) console.log('success!')
})
```


### 4.copy 复制文件

```typescript 
copy(src, dest, [option],callback)
option: 
  clobber (boolean): 覆盖现有的文件或目录,默认true 
  dereference (boolean): dereference symlinks, default is false 
  preserveTimestamps (boolean): 最后修改和访问时间和原始的源文件一致，默认为false 
  filter: 函数或正则表达式过滤复制文件,返回true包含，否则排除   

同步:
copySync()
//拷贝文件
var fs = require('fs-extra');
fs.copy('/tmp/myfile', '/tmp/mynewfile', function (err) {
   if (err) return console.error(err); 
   console.log("success!")
}) 

//拷贝目录
fs.copy('/tmp/mydir', '/tmp/mynewdir', function (err) {
   if (err) return console.error(err) 
   console.log('success!')
}) 
```


### 5.ensureDir 创建目录

确保目录的存在。如果目录结构不存在,就创建一个。

```typescript 
同步:ensureDirSync()
示例：
var fs = require('fs-extra');
var dir = '/tmp/this/path/does/not/exist';
fs.ensureDir(dir, function (err) {
   console.log(err);
})
```


### 6.ensureFile 创建文件

确保文件存在。如果被请求的文件的目录不存在,创建这些目录。如果文件已经存在,它不修改。

```typescript 
异步: createFile()
同步: createFileSync(),ensureFileSync()
var fs = require('fs-extra');
var file = '/tmp/this/path/does/not/exist/file.txt';
fs.ensureFile(file, function (err) { 
   console.log(err) ;
})
```


## 场景：

递归删除文件夹 极其连所有&#x20;

```typescript 
const fs = require('fs')
const path = require('path')
function removedir(fileUrl){
    let files = fs.readdirSync(fileUrl);
    files.forEach(file=>{
        let stat = fs.statSync(fileUrl + '/' +file )
        if(stat.isFile()){
            fs.unlinkSync(fileUrl + '/' +file)
        }else{
            removedir(fileUrl + '/' +file)
        }
        if(fs.existsSync(fileUrl + '/' +file)){
            fs.rmdirSync(fileUrl + '/' +file)
        }
    })
    fs.rmdirSync(fileUrl)
}
removedir(path.resolve(__dirname,'../build'))
```


异步地创建目录。

可选的 options 参数可以是指定 mode（权限和粘性位）的整数，也可以是具有 mode 属性和 recursive 属性（指示是否应创建父目录）的对象。当 path 是已存在的目录时，调用 fsPromises.mkdir() 仅在 recursive 为 false 时才导致拒绝。
