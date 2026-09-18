# 同步请求

```纯文本 
 var xhr = new XMLHttpRequest(); 
 xhr.open('GET', '/server', true); 
 
 xhr.timeout = 2000; // 超时时间，单位是毫秒 
 
 xhr.onload = function () { 
   // 请求完成。在此进行处理。 
 }; 
 
 xhr.ontimeout = function (e) { 
   // XMLHttpRequest 超时。在此做某事。 
 }; 
 
 xhr.send(null);
```


```纯文本 
 jquery 中的 同步 ajax  
     alert("setp 1");   
 $.ajax({   
       url: "admin.php",   
        async: true,   
       success: function(data){   
           alert("同步求情"); // 1 
       }   
 });   
 alert("setp 2"); //2 
 
 首先执行 selp 1 然后执行AJAX 请求....中->未返回值 , 则会一直等待....浏览器卡住了,,, 直到返回值才会执行 selp 2 .
```


```纯文本 
 async + await 了解一下  promise 的语法糖， 不能锁住浏览器， 
 async funA(){ 
      var res = await axios.post('') //这里的res就是axios请求回来的结果 
 }
```
