# buffer

## 目录

- [背景:](#背景)

`Buffer`是 Node.js 中用于**处理二进制数据流的核心类，常用于处理文件 I/O、网络通信等场景。**

# 背景:

在Node、ES2015出现之前，前端工程师只需要进行一些简单的字符串或DOM操作就可以满足业务需要，所以对二进制数据是比较陌生。

文件和网络i/o对于前端开发者而言的都是不曾有的应用场景

node出现以后，前端面对的技术场景发生了变化，可以**深入到网络传输、文件操作、图片处理等领域，而这些操作都与二进制数据紧密相关**。

但在node中，需要处理网络协议，操作数据库，处理图片，接受上传文件等，在网络流和文件操作中，还要处理大量二进制数据，再这样的情况下Buffer 应运而生

- \*\*Buffer 结构， \*\***是一个典型的js 和 c++ 结合的模块，其性能部分用c++ 实现，非性能部分用js 实现**
- **Node里面的buffer，是一个****二进制数据容器，数据结构类似与数组****，数组里面的方法在buffer都存在(slice操作的结果不一样)。**
- **buffer 流 大大的减小了体积。相比于现在的json 和 string 格式**
- \*\*Buffer 实例一般用于****表示编码字符的序列****，比如 UTF-8 、 UCS2 、 Base64 、或十六进制编码的数据。 \*\***通过使用显式的字符编码，就可以在 Buffer 实例与普通的 JavaScript 字符串之间进行相互转换。**
- **Buffer对象不同于其他对象；****他不经V8内存的分配，也不会有堆内存大小的限制；这****意味着堆外内存可以突破内存限制的问题****；（详细见最佳实践--v8**​

buffer是一个像Array的对象

buffer对象类似数组，他的元素是为16 进制的两位数，即0\~\~255之间；

![  ](774a4598253ebe5439118b59e3b2bf3b_-bhWXhbF9y.png "  ")

```typescript 


// console.log(buf)
// 输出 72756e6f6f62
2. console.log(buf.toString('hex')); //读取 Node 缓冲区数据的语法如下所示：buf.toString([encoding[, start[, end]]])


// 输出 cnVub29i
// console.log(buf.toString('base64'));


3. const json = JSON.stringify(buf); //当字符串化一个 Buffer 实例时，JSON.stringify() 会隐式地调用该 toJSON()。
// console.log(JSON.parse(json))

//缓存区合并
4. Buffer.concat(list[ totalLength]) //list - 用于合并的 Buffer 对象数组列表。
var buffer1 = Buffer.from(('菜鸟教程'));
var buffer2 = Buffer.from(('www.runoob.com'));
var buffer3 = Buffer.concat([buffer1,buffer2]);
console.log("buffer3 内容: " + buffer3.toString()); //buffer3 内容: 菜鸟教程www.runoob.com


//写入缓冲区
5. buf.write(string[, offset[, length]][, encoding])
//根据 encoding 的字符编码写入 string 到 buf 中的 offset 位置。 length 参数是写入的字节数。 如果 buf 没有足够的空间保存整个字符串，则只会写入 string 的一部分。 只部分解码的字符不会被写入。
buf = Buffer.alloc(256);
len = buf.write("www.runoob.com");

console.log("写入字节数 : "+ len);//14

var buffer1 = Buffer.from('ABC');
var buffer2 = Buffer.from('ABCD');
var result = buffer1.compare(buffer2);

if(result < 0) {
    console.log(buffer1 + " 在 " + buffer2 + "之前");
}else if(result == 0){
    console.log(buffer1 + " 与 " + buffer2 + "相同");
}else {
    console.log(buffer1 + " 在 " + buffer2 + "之后");
}

6.创建 长度为10个字节以0填充的二进制
const buf1 = Buffer.alloc(10)
console.log(buf1)   <Buffer 00 00 00 00 00 00 00 00 00 00>

```


```typescript 
 7.var bool = Buffer.isEncoding('ascii') 
 console.log(bool) // 输出true 
 
 
 //有很多不支持的编码的支持更多编码转换 
 //iconv֖和iconv-lite两个模块 
 var iconv = require('iconv-lite'); 
 //Buffer转字符串 
 var str = iconv.decode(buf, 'win1251'); 
 //字符串转buffer 
 var buf = iconv.encode("Sample input string", 'win1251');    
 
 var iconv = new Iconv('UTF-8', 'ASCII'); 
 iconv.convert('ça va'); // throws EILSEQ 
 var iconv = new Iconv('UTF-8', 'ASCII//IGNORE'); 
 iconv.convert('ça va'); // returns "a va" 
 var iconv = new Iconv('UTF-8', 'ASCII//TRANSLIT'); 
 iconv.convert('ça va'); // "ca va" 
 var iconv = new Iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE'); 
 iconv.convert('ça va Ȧ '); // "ca va " 
 
 
 
 8.buffer的拼接： 
 var fs = require('fs'); 
 var rs = fs.createReadStream('test.md'); 
 var data = ''; 
 rs.on("data", function (chunk){ 
     data += chunk; 
 }); 
 rs.on("end", function () { 
     console.log(data); 
 });  
```


![  ](7b3669819eb49c9f9fec345a0d0c15cb_IeXvFVpoK_.png "  ")

![  ](22c78bb65a73ed619a18d68e435033e7_U7Ekj0mYOi.png "  ")

![  ](1dc184cd22ec17a007a78a6a68644d01_t7u8uUeJ87.png "  ")

**9.乱码的产生**

![  ](5497574f4492deec2969180f5902ba53_g49_2HVZM3.png "  ")

**10.解决乱码问题**

![  ](9ed5c5379c0b7b217892dd5fc3b8ace2_nFTQQvzjTv.png "  ")

![  ](8d09002d4c14f6ec579e8cef027a0004_eYn6VyE5NN.png "  ")

    根本上解决乱码问题：正确的拼接buffer

![  ](944e92f5b2d5895a493be056f5996414_T17RT6vunC.png "  ")

```typescript 
 var chunks = []; 
 var size = 0; 
 res.on('data', function (chunk) { 
      chunks.push(chunk); 
      size += chunk.length; 
 }); 
 res.on('end', function () { 
      var buf = Buffer.concat(chunks, size); 
     var str = iconv.decode(buf, 'utf8'); 
     console.log(str); 
 });
```


![  ](94be0bb0415faffc06e4501e485f7276_Cqd0emQVf0.png "  ")

```typescript 
 Buffer.concat = function(list, length) { 
     if (!Array.isArray(list)) { 
         throw new Error('Usage: Buffer.concat(list, [length])'); 
     } 
     if (list.length === 0) { 
         return new Buffer(0); 
     } else if (list.length === 1) { 
         return list[0]; 
     } 
     if (typeof length !== 'number') { 
         length = 0; 
         for (var i = 0; i < list.length; i++) { 
             var buf = list[i]; 
             length += buf.length; 
         } 
     } 
     var buffer = new Buffer(length); 
     var pos = 0; 
     for (var i = 0; i < list.length; i++) { 
         var buf = list[i]; 
         buf.copy(buffer, pos); 
         pos += buf.length; 
     } 
     return buffer; 
 };
```


[Buffer.from](Buffer.from.md "Buffer.from")

[buffer.toString](buffer.toString.md "buffer.toString")
