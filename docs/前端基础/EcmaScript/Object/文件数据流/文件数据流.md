# 文件数据流

## 目录

- [FromData](#FromData)
  - [formdata 主要用于两个用途：](#formdata主要用于两个用途)
  - [操作方法：](#操作方法)
    - [增：    ](#增-)
    - [删：](#删)
    - [改：](#改)
    - [查：](#查)
    - [是否存在某key：](#是否存在某key)
    - [循环遍历：  ](#循环遍历-)
    - [迭代器  ](#迭代器)
- [FileReader](#FileReader)
  - [读取文件：](#读取文件)
  - [图片预览：](#图片预览)
    - [上传：](#上传)
    - [readAsDataURL](#readAsDataURL)
    - [readAsText /readAsArrayBuffer-](#readAsText-readAsArrayBuffer-)
    - [拖拽上传-](#拖拽上传-)

# FromData

了解一个事物，首先要了解他的用途：

## formdata 主要用于两个用途：

1. 表单序列化将**form表单元素**的**name与value进行组合**，实现**表单数据的序列化**，从而**减少表单元素的拼接，提高工作效率**。

```javascript 
           <form method="POST" class="form">
              <input type="text" name='name' value="dasd">
              <input type="text" name='age' value="dsafaasd">
              <input type="text" name='age' value="18">
              <input type="password" name='ps' value="dasd">
              <input type="search" name='sh' value="asfa"/>
              <input type="submit" value="asf">
          </form>
        var form = document.querySelector('.form')
        var formdata = new FormData(form)
```


1. \*\*异步上传文件  \*\*​

**// 划重点了**

Content-Type: multipart/form-data; boundary=----WebKitFormBoundary5NqxviCXpyAjOEV6  如果有文件

 必须使用纯净的 axios post  来发送后端，不用设置header 让浏览器自己处理。 否则就会报错 找不到边界。

## 操作方法：

### 增：    

一个key 可以 对应 多个 value

formdata.append("age","laoliu");   如果key不存在 会新建

### 删：

formdata.delete("name");   不管有多少个 相同的全部删除，

### 改：

  formdata.set("name","laoli");    如果key不存在 会新建， 如果存在，不管多少个，只保留一个且 修改成你设置的值

### 查：

   formdata.get("age");    string

   formdata.getAll("age");  array

### 是否存在某key：

    formdata.has("age")     返回  true/ false

### 循环遍历： &#x20;

```javascript 
 //极度相似 map/set  
formdata.forEach((item,index,all)=>{   //all === formdata
        console.log(item,index,all)
    })
    for(var item of formdata.keys()){   //遍历 keys    
       console.log(item)
    }
    for(var item of formdata.values()){  //遍历 values
        console.log(item)
    }
    for(var item of formdata.entries()){  // [key,value] 形式出现  遍历
        console.log(item)
    }
```


### 迭代器  

```javascript 
 //map 也有相同api 
var i = formdata.entries() // Iterator 唯一的方法 next 迭代器
let handle = i.next()  // { done : false ,  value : ["k1", "v1"] }
while(!handle.done){
  if(typeof handle.value === 'function'){
      handle.value()
        handle = i.next()
    } 
}
```


可以看到返回迭代器的规则    

1. 每调用一次next()返回一条数据，数据的顺序由添加的顺序决定
2. 返回的是一个对象，当其done属性为true时，说明已经遍历完所有的数据，这个也可以作为判断的依据
3. 返回的对象的value属性以数组形式存储了一对key/value，数组下标0为key，下标1为value，如果一个key值对应多个value，会变成多对key/value返回

# FileReader

## 读取文件：

**了解一个东西, 要先了解使用场景.**

**文件下载 前端 dataType : blob**

但是 有可能下载失败, 或者请求成功, 但是返回的不是blob 类型, 而是json 类型, 但是你已经为blob 类型 接收了,

\*\*    一: 动态的 改变dataType  或者 和 后端商量 改变状态码 来提前判断区分\*\*​

\*\*    二: 目前我采用的\*\*​

\*\*        blob 类型: 我接收 是 data.type=='text/xml'\*\* ​

\*\*        json类型    我用blob 接收 是 data.type == 'application/json'\*\* ​

\*\*    后端不变, 前端 用 type 区分, 然后用 下面的方法 把 blob 在转换为json 然后来区分\*\*​

```javascript 
 blob 转 json  文件 转为json
var reader = new FileReader();
reader.addEventListener("loadend", function() {
    console.log(JSON.parse(reader.result));
});
reader.readAsText(blob,['utf-8']);
```


**项目源码：**

```javascript 
 if（res.data）{
let reader = new FileReader()
    reader.onload = e =>{
            try{
                    let data = JSON.parse(e.target.result)  // 如果格式错误 这里要报错
                    if（data.message){
                            // 报错信息
                    }else{
                        // 文件格式不对
                    }
            }catch（err）{
                    //说明是blob 流
                    new Promise((resolve,reject)=>{
                        let fileName = res.headers['content-disposition'].split(";")[1].aplit("filename")[1]
                        fileName = decodeURL(fileName)
                        this.download(res.data,fileName)
                    }).catch(err=>{
                            //文件下载失败
                    })
            }
    }
    reader.readAsText(res.data,['utf-8'])

}else{
// 下载失败

}
```


[FileReader - Web API 接口参考 | MDN FileReader 对象允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。 https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader "FileReader - Web API 接口参考 | MDN FileReader 对象允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。 https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader")

## **图片预览：**

### 上传：

```javascript 
 <style>
    input[type='file']{
        opacity:0;
    }
  </style>
  <input type="button" value="上传" class="btn">
  <input type="file" class="up" name="file1" multiple="multiple" accept=".jpg,.png">
  
$(".btn").on('click',()=>{
  $('.up').click()
})
$('.up').on('change',function(){
       // 根据这个 <input> 获取文件的 HTML5 js 对象
     var files = event.target.files, file;        
        if (files && files.length > 0) {
          // 获取目前上传的文件
          file = files[0];
          // 来在控制台看看到底这个对象是什么
          console.log(file);
          // 那么我们可以做一下诸如文件大小校验的动作
          if(file.size > 1024 * 1024 * 2) {
            alert('图片大小不能超过 2MB!');
            return false;
          }
          // !!!!!!
          // 下面是关键的关键，通过这个 file 对象生成一个可用的图像 URL
          // 获取 window 的 URL 工具     
          var URL = window.URL || window.webkitURL;     
          // 通过 file 生成目标 url
          var imgURL = URL.createObjectURL(file);// 根据图片file生成url
          // 用这个 URL 产生一个 <img> 将其显示出来
          $('.up').next().attr('src', imgURL);
          // 使用下面这句可以在内存中释放对此 url 的伺服，跑了之后那个 URL 就无效了
            $('.pic').on('load',function(){
                window.URL.revokeObjectURL(src); // 释放 url.
            })
              //  URL.revokeObjectURL(imgURL);
            }
})
```


    我们发现input选择的文件被记录到了这个对象中，这个是fileList对象，是一个只读对象，不能修改

**因为它不能修改，所以很难实现对已选中多个文件的删除某个文件等操作**

\*\*    里面记录了文件的name，size，type，和修改时间等，****可知这个对象只存放了一些文件的信息，相当于是本地文件的索引****，并不是把文件放到input中了，上传文件时它会再去找到实际的本地文件\*\*

### **readAsDataURL**

```javascript 
 <input type="button" value="上传" class="btn">
<input type="file" class="up" name="file1" multiple="multiple" accept=".jpg,.png">
<img src="" />

input[type='file']{
    opacity:0;
}

if(window.FileReader) {  
    var fr = new FileReader();  
    // add your code here  
}  
else {  
    alert("Not supported by your browser!");  
}
$(".btn").on('click',()=>{
  $('.up').click()
})
$('.up').on('change',showPreview)
function showPreview(eve) {  
  let source = eve.target
    var file = source.files[0];  
    if(window.FileReader) {  
        var fr = new FileReader();  
        fr.onloadend = function(e) {  
          console.log(e)
            // document.getElementById("portrait").src = e.target.result;  
            $('.up').next().attr('src',e.target.result)
        };  
        fr.readAsDataURL(file);  //也是利用将图片作为url读出
    }  
}  


```


### **readAsText /readAsArrayBuffer-**

```javascript 
 <input type="button" value="上传" class="btn">
<input type="file" class="up" name="file1" multiple="multiple" accept=".jpg,.png">
<img src="" />
<div></div>

input[type='file']{
    opacity:0;
}

if(window.FileReader) {  
    var fr = new FileReader();  
    // add your code here  
}  
else {  
    alert("Not supported by your browser!");  
}
$(".btn").on('click',()=>{
  $('.up').click()
})
$('.up').on('change',handleFiles)
function  handleFiles(eve){  
  let target = eve.target
  let files = target.files
    if(files.length){  
       var file = files[0];  
       var reader = new FileReader();  
       reader.onload = function(){  
        //  console.log(this.result)
        $('.up').nextAll().eq(1).text(this.result)
          // $('.up').nextAll().find('div').html(this.result)
          //  document.getElementById("filecontent").innerHTML = this.result;
       };  
       reader.readAsText(file);   //作为字符串读出
    }  
  }


```


### **拖拽上传-**

```javascript 
    .container{
      width:300px;height: 300px;
      border:2px dashed #ddd;
      text-align: center;
      padding:50px;
  }

<div class="container">
    拖拽进入
    </div>
<form id="form1" method="post" enctype="multipart/form-data">
    <input type="file" name="file1" id="file1" value="" />
</form>

$('.container').bind('dragenter dragover', ignoreDrag);
    $(".container").on({drop:function(e){
        var flag=false;
        e.preventDefault();
        //jquery的file要去e.originalEvent里面拿，拖拽获取files的方式与input的不同
        var files = e.originalEvent.dataTransfer.files;
        //var files = e.dataTransfer.files;  原生的话这样就可以获取
        for(var i= 0; i<files.length;i++){
            myFileReader(files[i],function(result,file){
                if(result){
                    //文件
                    console.log(file.name)
                }else{
                    //文件夹
                    console.log("不要上传文件夹")
                    flag=false;
                }
            });
        }
        if(flag){
            $("#file1")[0].files=files;   //关键：将取到的文件赋值给input，用于ajax提交文件！！！
//其实这个地方 form 表单  没必要 直接 append 上去就可以
            var formData = new FormData($("#form1")[0]);     
            $.ajax({
                url : "/it/orderManage/saveActivity",
                type : 'POST',
                data : formData,
                // 告诉jQuery不要去处理发送的数据
                processData : false,
                // 告诉jQuery不要去设置Content-Type请求头
                contentType : false,
                async : true,
                success : function(ret) {
                    //alert("上传成功")
                    if(ret){
                        $("#trainInfoModal").modal("hide");
                        layer.alert("保存成功")
                        $('#orderTable').bootstrapTable("refresh");
                        $("#trainInfoModal input").val("");
                        $("#trainInfoModal textarea").val("");
                    }
                }
            });
        }
        console.log(files);
    }})
    function ignoreDrag(e) {
        e.originalEvent.stopPropagation();
        e.originalEvent.preventDefault();
    }

    function myFileReader(file, callback){
        if(!window.FileReader){
            callback(true,file);
            return false;
        }
        var fr = new FileReader();
        fr.readAsDataURL(file);
        fr.onloadend=function(e){
            console.log(this.result)
            callback(true,file);
        }
        fr.οnerrοr=function(e){  //不好判断是否是文件夹，通过上传报错可以判断是文件夹
            callback(false,file);
        }
        return true;
    };
```
