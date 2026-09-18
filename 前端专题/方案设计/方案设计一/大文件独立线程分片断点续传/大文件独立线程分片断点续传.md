# 大文件独立线程分片断点续传

## 目录

- [大文件分片 + 断点续传](#大文件分片--断点续传)
  - [上传文件:](#上传文件)
  - [切割大文件](#切割大文件)
  - [对单个文件切割](#对单个文件切割)
  - [上面就对文件的处理完毕下面开始上传](#上面就对文件的处理完毕下面开始上传)
  - [对每个视频内容就是唯一值处理：（这个地方是个耗时操作；可以放到worker里单独处理然后把结果传给主线程）](#对每个视频内容就是唯一值处理这个地方是个耗时操作可以放到worker里单独处理然后把结果传给主线程)
  - [将同一文件的chunk封装formdata对象](#将同一文件的chunk封装formdata对象)
  - [简单的axios 请求封装](#简单的axios-请求封装)
- [node+koa 后端](#nodekoa-后端)
  - [接受分片文件的请求，以hash 为文件夹 把每个 chunk  放到文件夹里](#接受分片文件的请求以hash-为文件夹-把每个-chunk-放到文件夹里)
- [后续优化来了：](#后续优化来了)
  - [进度条显示：](#进度条显示)
    - [给 XMLHttpRequest 注册监听事件](#给-XMLHttpRequest-注册监听事件)
    - [在原先的前端上传逻辑中新增监听函数部分](#在原先的前端上传逻辑中新增监听函数部分)
    - [文件进度条](#文件进度条)
  - [断点续传：](#断点续传)
    - [给每个文件一个唯一的id hash](#给每个文件一个唯一的id-hash)
    - [创建worker修改如下：](#创建worker修改如下)
  - [文件秒传](#文件秒传)
    - [检验hash是否已存在](#检验hash是否已存在)
    - [服务端的逻辑非常简单，新增一个验证接口，验证文件是否存在即可](#服务端的逻辑非常简单新增一个验证接口验证文件是否存在即可)
  - [暂停上传](#暂停上传)
- [恢复上传](#恢复上传)
- [后续优化细节：](#后续优化细节)

[vue前端实现视频上 话不多说，代码如下，这种方法比较麻烦但是有效一、下载gif.js相关文件，可以到这里下载，然后将这几个文件放在根目录的static/js里面。 二、下载依赖包： 三、代码块 https://www.jianshu.com/p/00566fa72b97](https://www.jianshu.com/p/00566fa72b97 "vue前端实现视频上 话不多说，代码如下，这种方法比较麻烦但是有效一、下载gif.js相关文件，可以到这里下载，然后将这几个文件放在根目录的static/js里面。 二、下载依赖包： 三、代码块 https://www.jianshu.com/p/00566fa72b97")

[Vue：录制视频并压缩视频文件 文件上传框 ，除了可以选择文件上传之外，还可以调用摄像头来拍摄照片或者视频并上传。capture属性可以判断前置or后置摄像头。在视频播放的过程中，用canvas定时截取一张... https://www.jianshu.com/p/49937db0b958](https://www.jianshu.com/p/49937db0b958 "Vue：录制视频并压缩视频文件 文件上传框 ，除了可以选择文件上传之外，还可以调用摄像头来拍摄照片或者视频并上传。capture属性可以判断前置or后置摄像头。在视频播放的过程中，用canvas定时截取一张... https://www.jianshu.com/p/49937db0b958")

问题点：

1. 移动端视频不能自动播放

移动端为了避免浪费用户的流量，默认video是不能够自动播放的，即使加了autoplay属性，PC端也不能自动播放，在移动端依旧不能自动播放。需要同时加上muted属性

亲测

  2.视频不能转base64

&#x20;var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        that.videoSrc1 = this.result;
        video.play();
      };

太大，太慢，反而会使数据变大

**所以上面方法不行；太古老；（把视频播放完，转成gif，那还不得要等视频播放完，而且太慢）**

[H5 js方式实现前端视频压缩\_吃葡萄要吐皮的博客-CSDN博客\_前端视频压缩 1.项目做人脸识别，要求录制人脸读数视频后进行上传处理。但是手机上录制的视频非常大，安卓上3s的视频就有5M左右大小。所以尝试做了前端的js压缩处理。一般来说视频压缩是在服务端通过ffmpeg做压缩。但是这个据说对服务器的要求也很高。前端是不好做压缩处理的，但是也不是不可以做，性能不好而已。在github上查了下试了几种前端的压缩组件。最后我试了一个用的比较好用顺手，是轻量级的，适合H5。链接如下 https://blog.csdn.net/qq\_40088443/article/details/104263750](https://blog.csdn.net/qq_40088443/article/details/104263750 "H5 js方式实现前端视频压缩_吃葡萄要吐皮的博客-CSDN博客_前端视频压缩 1.项目做人脸识别，要求录制人脸读数视频后进行上传处理。但是手机上录制的视频非常大，安卓上3s的视频就有5M左右大小。所以尝试做了前端的js压缩处理。一般来说视频压缩是在服务端通过ffmpeg做压缩。但是这个据说对服务器的要求也很高。前端是不好做压缩处理的，但是也不是不可以做，性能不好而已。在github上查了下试了几种前端的压缩组件。最后我试了一个用的比较好用顺手，是轻量级的，适合H5。链接如下 https://blog.csdn.net/qq_40088443/article/details/104263750")

[https://blog.csdn.net/hj7jay/article/details/54906612](https://blog.csdn.net/hj7jay/article/details/54906612 "https://blog.csdn.net/hj7jay/article/details/54906612")

完全通过js压缩；ffmpeg

fly.js

缺点：

【1】耗时很长，4s的视频在手机上需要快40s左右进行压缩，时间太久了。微信浏览器录制的视频非常大，都压不动。可见这种方法性能并不好。

最后决定采用：

# 大文件分片 + 断点续传

[实现多个大文件拖拽上传+大文件分片上传+断点续传+文件预览 - 掘金 之前看了掘友写了一个单文件分片上传和断点续传的文章，对此充满了兴趣，因此开始自研学习。经过一段时间的学习，自己动手写了一个小demo。这篇文章将记录自己coding遇见的问题和总结自己小demo的思路。 利用dragover事件（当某物被拖动的对象在另一对象容器范围内拖动时触发… https://juejin.im/post/6857894572262555655?from=timeline](https://juejin.im/post/6857894572262555655?from=timeline "实现多个大文件拖拽上传+大文件分片上传+断点续传+文件预览 - 掘金 之前看了掘友写了一个单文件分片上传和断点续传的文章，对此充满了兴趣，因此开始自研学习。经过一段时间的学习，自己动手写了一个小demo。这篇文章将记录自己coding遇见的问题和总结自己小demo的思路。 利用dragover事件（当某物被拖动的对象在另一对象容器范围内拖动时触发… https://juejin.im/post/6857894572262555655?from=timeline")

[字节跳动面试官：请你实现一个大文件上传和断点续传 - 掘金 这段时间面试官都挺忙的，频频出现在博客文章标题，虽然我不是特别想蹭热度，但是实在想不到好的标题了-。-，蹭蹭就蹭蹭 :) https://juejin.im/post/6844904046436843527#heading-15](https://juejin.im/post/6844904046436843527#heading-15 "字节跳动面试官：请你实现一个大文件上传和断点续传 - 掘金 这段时间面试官都挺忙的，频频出现在博客文章标题，虽然我不是特别想蹭热度，但是实在想不到好的标题了-。-，蹭蹭就蹭蹭 :) https://juejin.im/post/6844904046436843527#heading-15")

下面寄一个分片断点续传的demo &#x20;

下面记一下 遇到的难点和亮点

1. promise.all() 大量的使用场景
2. map  能返回axios的promise&#x20;
3. reduce 唯一遍历数组但是能返回任何类型数据（对象）的高阶原生函数
4. 正则 exe&#x20;
5. spark-md5   md5 对视频进行唯一key值生成
6. formdata 对post 请求真的支持好
7. while 循环在内些情况 真的是好用
8. 二进制 slice 方法 分片 二进制
9. koa-body的使用解析上传文件
10. createReadStream  和 createWriteStream  pipe 的深度使用，如何倒流合并二进制&#x20;
11. renameSync  能够 达到10 上面的效果；使用上注意：跨区重命名文件的 权限问题
12. unlinkSync 同步的删除&#x20;
13. existSync 判断改路仅下的文件是否存在
14. mkdirSync 创建文件夹
15. reader.readAsArrayBuffer二进制转换

下面按步骤说明一下：

### 上传文件:

  chooseVideo(e){

    this.filesAry=Array.from(e.target.files);

//拿到多个大文件，进行切片

    this.data=this.createChunk(this.filesAry);

}

### 切割大文件

createChunk(files=\[]){

    let filesObj=files.reduce((pre,cur,index,ary)=>{

        //返回一个以名字加索引为key，的对象， 每个key的值 是大文件，然后下面对大文件切割

        pre\[`${cur.name} _${index}`]=this.handleChunk(cur);

        return pre;

    },{});

    return filesObj;

},

### 对单个文件切割

handleChunk(file){

    let current=0;

    let fileList=\[];

// 利用blob的slice 方法，对file 进行切割，然后返回一个数组

    while(current<=file.size){

        fileList.push({

            file:file.slice(current,this.SIZE+current)

        });

        current+=this.SIZE;

    }

    return fileList;

},

### 上面就对文件的处理完毕下面开始上传

async handleUpload(e){

    function splitFilename(str){

        var reg = / \_/g

        var res = reg.exec(str)

        while(reg.lastIndex !== 0){

            var nextres = reg.exec(str)

            if(nextres){

                res = nextres

            }

        }

        return str.slice(0,res.index)

    }

    function splitFileHash(key){

        var reg = / \_/g

        var res = reg.exec(key)

        while(reg.lastIndex !== 0){

            var nextres = reg.exec(key)

            if(nextres){

                res = nextres

            }

        }

        var obj = {}

        obj.fileName = key.slice(0,res.index)

        obj.nameHash = key.slice(res.index+1)

        return obj

    }

    this.targetRequest={};

    // 这里的this.data 是一个对象 props 为file.name + index  值为 数组； 数组里的value 为分片后的 文件二进制bolb

    for(let prop in this.data){

        if(this.data.hasOwnProperty(prop)){

            var fileName = splitFilename(prop)

            var nameHash = await this.createMd5(this.data\[prop]);

            this.targetRequest\[`${fileName} _${nameHash}`]=this.createFormDataRequest(this.data\[prop],prop,nameHash,fileName);

        }

    }

    //发送请求，并且请求完成之后合并

    Object.keys(this.targetRequest).forEach( key=>{

        var {fileName,nameHash } =  splitFileHash(key);

        Promise.all(this.targetRequest\[key]).then(res=>{

            console.log("分片发送成功，开始合并")

            let params = new FormData()

            params.append('filename',fileName)

            params.append('nameHash',nameHash)

            params.append('SIZE',this.SIZE)

            this.createRequest({

                method:'post',

                url:'/api/handleMerge',

                data:params

            }).then(res=>{

                console.log('合并请求成功')

            })

        }).catch(err=>{

            console.log('分片发送失败')

        })

    })

}

### 对每个视频内容就是唯一值处理：（这个地方是个耗时操作；可以放到worker里单独处理然后把结果传给主线程）

createMd5(fileChunkList=\[]){

    let currentChunk=0,md5;

    let reader=new FileReader();

    let spark = new SparkMD5.ArrayBuffer();&#x20;

    function readFile(){

        if(fileChunkList\[currentChunk].file){

\*\* reader.readAsArrayBuffer(fileChunkList\[currentChunk].file)\*\* ​

        }

    }

    readFile();

    return new Promise(resolve=>{

\*\*  reader.onload=e=>{\*\* ​

            currentChunk++;

\*\* spark.append(e.target.result);\*\* ​

            if(currentChunk\<fileChunkList.length){

                readFile();

            }else{

\*\* md5=spark.end();\*\* ​

                resolve(md5);

            }

        };

    })

},

### 将同一文件的chunk封装formdata对象

//将每个切片组装成formdata对象

createFormDataRequest(files=\[],prop='',nameHash='',fileName='',fileChunk=\[]){

    // 还有这种 写法； 返回一个axios 的promise

    let target=files.map((file,index)=>{

        let formdata= new FormData();

        formdata.append('file',file.file);

        formdata.append('index',index);

        formdata.append('hash',prop);

        formdata.append('nameHash',nameHash);

        formdata.append('filename',fileName);

        return {formdata,index};

    }).map(({formdata,index})=>{

        return this.createRequest({

            method:'post',

            url:'/api/handleUpload',

            data:formdata,

        })

    })

    return target;

},

### 简单的axios 请求封装

// axios 请求

createRequest({method='post',url='',data={}}){

    return axios({

            method:method,

            url:url,

            data:data,

        }).then(res=>{

            console.log(res)

        }).catch(err=>{

            console.log(err)

        })

},

# node+koa 后端

### 接受分片文件的请求，以hash 为文件夹 把每个 chunk  放到文件夹里

const Router = require('koa-router')

const path = require('path')

const fs = require('fs')

let router = new Router();

router.all('/',async ctx=>{

    const splitExt=(filename='')=>{

        let name= filename.slice(0,filename.lastIndexOf('.'));

        let ext=filename.slice(filename.lastIndexOf('.')+1,filename.length);

        return {name,ext};

    }

    const {hash,nameHash,filename,index}=ctx.request.body;

    const { files:{file} } = ctx.request;

    //   创建 存放 chunk 的文件夹  以hash 命名

    const chunkPath=path.resolve(\_\_dirname,\`\${nameHash}\`);

    if(!fs.existsSync(chunkPath)){

       fs.mkdirSync(chunkPath);

    }

    const {name,ext}=splitExt(filename);

    // 重命名文件 这一步对后面的流的读写很重要 (报错)

    // 注意：这个地方提示跨区重命名文件出现的权限问题。

    //所以不能用： 但是这个地方 注意： 可以改路仅直接过来

    // fs.renameSync(ctx.request.files.file.path,`${chunkPath}/${filename} _${index}`);

    // 解决

    var readStream=fs.createReadStream(file.path);

    var writeStream=fs.createWriteStream(`${chunkPath}/${filename} _${index}`);

    readStream.pipe(writeStream);

    readStream.on('end',function(){

     fs.unlinkSync(file.path); // 同步的删除的文件

    });

    return ctx.body={

        message:'success',

        code:000000

    };

})

module.exports = router.routes()

第二部接受合并请求；开始合并

const Router = require('koa-router')

let router = new Router();

const path = require('path')

const fs = require('fs')

router.all('/',async ctx=>{

    console.log('进入merge了')

    // 取出FormData 里的 append的 借助 koa-body

    const {filename,nameHash,SIZE }=ctx.request.body;

    const targetFilePath = path.resolve(\_\_dirname,\`\${filename}\`);

    const splitExt=(filename='')=>{

        let name= filename.slice(0,filename.lastIndexOf('.'));

        let ext=filename.slice(filename.lastIndexOf('.')+1,filename.length);

        return {name,ext};

    }

    const pipStream = (path, writeStream) => {

        return new Promise(resolve => {

            const readStream = fs.createReadStream(path);

            readStream.on("end", function(err){

                if(err) throw err;

                // fs.unlinkSync(path);  删除原路径文件

                resolve();

            });

            readStream.pipe(writeStream,{end:false});

        })

    };

    //   读取 hash 命名的文件夹下的目录

    fs.readdir(path.resolve(\_\_dirname,nameHash),async (err,files)=>{

      if(err) return console.log('err:readdir');

      // 安装index  给 chunk 排序

      files.sort((a,b)=> a.slice(a.lastIndexOf(' *')+1)-b.slice(b.lastIndexOf('*')+1));

      // 替换chunk 文件夹下的 路径

      files=files.map(file=>path.resolve(\_\_dirname,nameHash,file));

      Promise.all(files.map(async(file,index)=>{

        return pipStream(file,fs.createWriteStream(targetFilePath,{

                start:index \* SIZE,

                end:(index+1)\*SIZE,

            }))

        }))

    })

    return  ctx.body = {

        message:000000,

        data:'success'

    }

})

module.exports = router.routes()

原文件代码 github 地址

[  https://github.com/scZhengChao/koaStaticServer](https://github.com/scZhengChao/koaStaticServer "  https://github.com/scZhengChao/koaStaticServer")

后续继续优化：

1. 断点续传
2. workes 开辟额外的线程 处理数据

# 后续优化来了：

## 进度条显示：

         XMLHttpRequest 原生支持上传进度的监听，只需要监听 upload.onprogress 即可，我们在原来的 request 基础上传入 onProgress 参数，

### 给 XMLHttpRequest 注册监听事件

```javascript 
 // xhr
    request({
      url,
      method = "post",
      data,
      headers = {},
+      onProgress = e => e,
      requestList
    }) {
      return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
+       xhr.upload.onprogress = onProgress;
        xhr.open(method, url);
        Object.keys(headers).forEach(key =>
          xhr.setRequestHeader(key, headers[key])
        );
        xhr.send(data);
        xhr.onload = e => {
          resolve({
            data: e.target.response
          });
        };
      });
    }
```


由于每个切片都需要触发独立的监听事件，所以还需要一个工厂函数，根据传入的切片返回不同的监听函数

### 在原先的前端上传逻辑中新增监听函数部分

```javascript 
 // 上传切片，同时过滤已上传的切片
    async uploadChunks(uploadedList = []) {
      const requestList = this.data
+       .map(({ chunk,hash,index }) => {
          const formData = new FormData();
          formData.append("chunk", chunk);
          formData.append("hash", hash);
          formData.append("filename", this.container.file.name);
+         return { formData,index };
        })
+       .map(async ({ formData,index }) =>
          this.request({
            url: "http://localhost:3000",
            data: formData，
+           onProgress: this.createProgressHandler(this.data[index]),
          })
        );
      await Promise.all(requestList);
       // 合并切片
      await this.mergeRequest();
    },
    async handleUpload() {
      if (!this.container.file) return;
      const fileChunkList = this.createFileChunk(this.container.file);
      this.data = fileChunkList.map(({ file }，index) => ({
        chunk: file,
+       index,
        hash: this.container.file.name + "-" + index
+       percentage:0
      }));
      await this.uploadChunks();
    }    
+   createProgressHandler(item) {
+      return e => {
+        item.percentage = parseInt(String((e.loaded / e.total) * 100));
+      };
+    }

```


### **文件进度条**

将每个切片已上传的部分累加，除以整个文件的大小，就能得出当前文件的上传进度，所以这里使用 Vue 计算属性

```javascript 
 computed: {
       uploadPercentage() {
          if (!this.container.file || !this.data.length) return 0;
          const loaded = this.data
            .map(item => item.size * item.percentage)
            .reduce((acc, cur) => acc + cur);
          return parseInt((loaded / this.container.file.size).toFixed(2));
        }
 }
```


## **断点续传：**

### **给每个文件一个唯一的id hash**

        断点续传的原理在于前端/服务端需要

**记住已上传的切片**

，这样下次上传就可以跳过之前已上传的部分，有两种方案实现记忆的功能

- 前端使用 localStorage 记录已上传的切片 hash
- 服务端保存已上传的切片 hash，前端每次上传前向服务端获取已上传的切片

       第一种是前端的解决方案，第二种是服务端，而前端方案有一个缺陷，如果换了个浏览器就失去了记忆的效果，所以这里选取后者

        无论是前端还是服务端，都必须要生成文件和切片的 hash，如果我们使用文件名 + 切片下标作为切片 hash，这样做文件名一旦修改就失去了效果，而事实上只要文件内容不变，hash 就不应该变化，所以

**正确的做法是根据文件内容生成 hash，**

所以我们修改一下 hash 的生成规则

          这里用到另一个库 spark-md5，它可以根据文件内容计算出文件的 hash 值，另外考虑到如果

**上传一个超大文件，读取文件内容计算 hash 是非常耗费时间的，并且会引起 UI 的阻塞**

，导致页面假死状态，所以我们

**使用 web-worker 在 worker 线程计算 hash，这样用户仍可以在主界面正常的交互**

       由于实例化 web-worker 时，参数是一个 js 文件路径且不能跨域，所以我们单独创建一个

\*\* hash.js 文件放在 public 目录下，另外在 worker 中也是不允许访问 dom 的，但它提供了importScripts 函数用于导入外部脚本，\*\* ​

通过它导入 spark-md5

&#x20;spark-md5 需要根据所有切片才能算出一个 hash 值，不能直接将整个文件放入计算，否则即使不同文件也会有相同的 hash，具体可以看官方文档

### **创建worker修改如下：**

```javascript 
  var nameHash = await this.createMd5(this.data[prop]); //在 master 线程计算hash 值                       
var nameHash = await this.calculateHash(this.data[prop]); //在 worker 线程 计算
```


```javascript 
  // 利用worker 开始计算大文件的hash 值
calculateHash(fileChunkList) {
    return new Promise(resolve => {
    // 添加 worker 属性
        this.worker = new Worker("./util/hash.js");
        this.worker.postMessage({ fileChunkList });
        this.worker.onmessage = e => {
        const { percentage, hash } = e.data;
            console.log('createHash进度',percentage)
            this.hashPercentage = percentage;
            if (hash) {
                resolve(hash);
            }
        };
    });
},
```


```javascript 
 // /public/hash.js
self.importScripts("../js/spark-md5.js"); // 导入脚本

// 生成文件 hash
self.onmessage = e => {
  const { fileChunkList } = e.data;
  const spark = new self.SparkMD5.ArrayBuffer();
  let percentage = 0;
  let count = 0;
  const loadNext = index => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(fileChunkList[index].file);
    reader.onload = e => {
      count++;
      spark.append(e.target.result);
      if (count === fileChunkList.length) {
        self.postMessage({
          percentage: 100,
          hash: spark.end()
        });
        self.close();
      } else {
        percentage += 100 / fileChunkList.length;
        self.postMessage({
          percentage
        });
        // 递归计算下一个切片
        loadNext(count);
      }
    };
  };
  loadNext(0);
};

```


## **文件秒传**

在实现断点续传前先简单介绍一下文件秒传

       所谓的文件秒传，即在服务端已经存在了上传的资源，所以当用户再次上传时会直接提示上传成功

      文件秒传需要依赖上一步生成的 hash，

**即在上传前，先计算出文件 hash，并把 hash 发送给服务端进行验证**

，由于 hash 的唯一性，所以一旦服务端能找到 hash 相同的文件，则直接返回上传成功的信息即可

### 检验hash是否已存在

```javascript 
     async verifyUpload(filename, fileHash) {
       const { data } = await this.request({
         url: "http://localhost:3000/verify",
        headers: {
           "content-type": "application/json"
         },
         data: JSON.stringify({
           filename,
           fileHash
         })
       });
       return JSON.parse(data);
    },
   async handleUpload() {
      if (!this.container.file) return;
      const fileChunkList = this.createFileChunk(this.container.file);
      this.container.hash = await this.calculateHash(fileChunkList);
     const { shouldUpload } = await this.verifyUpload(
       this.container.file.name,
       this.container.hash
     );
     if (!shouldUpload) {
       this.$message.success("秒传：上传成功");
       return;
    }
     this.data = fileChunkList.map(({ file }, index) => ({
        fileHash: this.container.hash,
        index,
        hash: this.container.hash + "-" + index,
        chunk: file,
        percentage: 0
      }));
      await this.uploadChunks();
    } 
```


秒传其实就是给用户看的障眼法，实质上根本没有上传

### 服务端的逻辑非常简单，新增一个验证接口，验证文件是否存在即可

```javascript 
  const extractExt = filename =>
  filename.slice(filename.lastIndexOf("."), filename.length); // 提取后缀名
const UPLOAD_DIR = path.resolve(__dirname, "..", "target"); // 大文件存储目录

const resolvePost = req =>
  new Promise(resolve => {
    let chunk = "";
    req.on("data", data => {
      chunk += data;
    });
    req.on("end", () => {
      resolve(JSON.parse(chunk));
    });
  });

server.on("request", async (req, res) => {
  if (req.url === "/verify") {
    const data = await resolvePost(req);
    const { fileHash, filename } = data;
    const ext = extractExt(filename);
    const filePath = path.resolve(UPLOAD_DIR, `${fileHash}${ext}`);
    if (fse.existsSync(filePath)) {
      res.end(
        JSON.stringify({
          shouldUpload: false
        })
      );
    } else {
      res.end(
        JSON.stringify({
          shouldUpload: true
        })
      );
    }
  }
});
server.listen(3000, () => console.log("正在监听 3000 端口"));

```


## 暂停上传

        讲完了生成 hash 和文件秒传，回到断点续传

        断点续传顾名思义即断点 + 续传，所以我们第一步先实现“断点”，也就是暂停上传

        原理是使用 XMLHttpRequest 的 abort 方法，可以取消一个 xhr 请求的发送，为此我们需要将上传每个切片的 xhr 对象保存起来，我们再改造一下 request 方法

```javascript 
    request({
      url,
      method = "post",
      data,
      headers = {},
      onProgress = e => e,
     requestList
    }) {
      return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.upload.onprogress = onProgress;
        xhr.open(method, url);
        Object.keys(headers).forEach(key =>
          xhr.setRequestHeader(key, headers[key])
        );
        xhr.send(data);
        xhr.onload = e => {
          // 将请求成功的 xhr 从列表中删除
          if (requestList) {
            const xhrIndex = requestList.findIndex(item => item === xhr);
            requestList.splice(xhrIndex, 1);
          }
          resolve({
            data: e.target.response
          });
        };
        // 暴露当前 xhr 给外部
        requestList?.push(xhr);
      });
    },

```


        实际上我用的axios 和这里有所不同；不过核心原理：这里说一下；没完成的请求abort掉；后端记得保存上传完成的切片；前端下次上传前校验一次；过滤掉上传过的切片

# 恢复上传

之前在介绍断点续传的时提到使用第二种服务端存储的方式实现续传

由于当文件切片上传后，服务端会建立一个文件夹存储所有上传的切片，所以每次前端上传前可以调用一个接口，服务端将已上传的切片的切片名返回，前端再跳过这些已经上传切片，这样就实现了“续传”的效果

而这个接口可以和之前秒传的验证接口合并，前端每次上传前发送一个验证的请求，返回两种结果

- 服务端已存在该文件，不需要再次上传
- 服务端不存在该文件或者已上传部分文件切片，通知前端进行上传，并把**已上传**的文件切片返回给前端

所以我们改造一下之前文件秒传的服务端验证接口

```vue 
  const extractExt = filename =>
  filename.slice(filename.lastIndexOf("."), filename.length); // 提取后缀名
const UPLOAD_DIR = path.resolve(__dirname, "..", "target"); // 大文件存储目录

const resolvePost = req =>
  new Promise(resolve => {
    let chunk = "";
    req.on("data", data => {
      chunk += data;
    });
    req.on("end", () => {
      resolve(JSON.parse(chunk));
    });
  });
  
  // 返回已经上传切片名列表
 const createUploadedList = async fileHash =>
  fse.existsSync(path.resolve(UPLOAD_DIR, fileHash))
    ? await fse.readdir(path.resolve(UPLOAD_DIR, fileHash))
    : [];

server.on("request", async (req, res) => {
  if (req.url === "/verify") {
    const data = await resolvePost(req);
    const { fileHash, filename } = data;
    const ext = extractExt(filename);
    const filePath = path.resolve(UPLOAD_DIR, `${fileHash}${ext}`);
    if (fse.existsSync(filePath)) {
      res.end(
        JSON.stringify({
          shouldUpload: false
        })
      );
    } else {
      res.end(
        JSON.stringify({
          shouldUpload: true，
         uploadedList: await createUploadedList(fileHash)
        })
      );
    }
  }
});
server.listen(3000, () => console.log("正在监听 3000 端口"));

```


接着回到前端，前端有两个地方需要调用验证的接口

- 点击上传时，检查是否需要上传和已上传的切片
- 点击暂停后的恢复上传，返回已上传的切片

新增恢复按钮并改造原来上传切片的逻辑

```vue 
 <template>
  <div id="app">
      <input
        type="file"
        @change="handleFileChange"
      />
       <el-button @click="handleUpload">上传</el-button>
       <el-button @click="handlePause" v-if="isPaused">暂停</el-button>
      <el-button @click="handleResume" v-else>恢复</el-button>
      //...
    </div>
</template>

   async handleResume() {
      const { uploadedList } = await this.verifyUpload(
       this.container.file.name,
        this.container.hash
      );
      await this.uploadChunks(uploadedList);
    },
    async handleUpload() {
      if (!this.container.file) return;
      const fileChunkList = this.createFileChunk(this.container.file);
      this.container.hash = await this.calculateHash(fileChunkList);

    const { shouldUpload, uploadedList } = await this.verifyUpload(
        this.container.file.name,
        this.container.hash
      );
      if (!shouldUpload) {
        this.$message.success("秒传：上传成功");
        return;
      }

      this.data = fileChunkList.map(({ file }, index) => ({
        fileHash: this.container.hash,
        index,
        hash: this.container.hash + "-" + index,
        chunk: file，
        percentage: 0
      }));

      await this.uploadChunks(uploadedList);
    },
   // 上传切片，同时过滤已上传的切片
   async uploadChunks(uploadedList = []) {
      const requestList = this.data
        .filter(({ hash }) => !uploadedList.includes(hash))
        .map(({ chunk, hash, index }) => {
          const formData = new FormData();
          formData.append("chunk", chunk);
          formData.append("hash", hash);
          formData.append("filename", this.container.file.name);
          formData.append("fileHash", this.container.hash);
          return { formData, index };
        })
        .map(async ({ formData, index }) =>
          this.request({
            url: "http://localhost:3000",
            data: formData,
            onProgress: this.createProgressHandler(this.data[index]),
            requestList: this.requestList
          })
        );
      await Promise.all(requestList);
      // 之前上传的切片数量 + 本次上传的切片数量 = 所有切片数量时
      // 合并切片
     if (uploadedList.length + requestList.length === this.data.length) {
         await this.mergeRequest();
      }
    }

```


详细见我代码：

核心思想：过滤掉已经上传的；然然把没上传的上传；最后合并；

# 后续优化细节：

&#x20;有时间在优化；

[又看到一个写 断点续传的：基本一样](https://mp.weixin.qq.com/s/dU7AU3SXJo1nYcA1DH-6Dg "又看到一个写 断点续传的：基本一样")
