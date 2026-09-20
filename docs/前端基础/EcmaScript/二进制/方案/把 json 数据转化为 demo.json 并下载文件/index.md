# 把 json 数据转化为 demo.json 并下载文件

json 视为字符串，由以上整理的转换图得出途径Text -> DataURL

除了使用 DataURL，还可以转化为 Object URL 进行下载。关于下载的函数 download，可以参考以上环节 数据输出-[数据输入输出](../数据输入输出/index.md "数据输入输出")下载

`Text `-> `Blob `->` Object URL`

可以把以下代码直接粘贴到控制台下载文件

```javascript 
 const json = { 
   a: 3, 
   b: 4, 
   c: 5 
 } 
 const str = JSON.stringify(json, null, 2) 
 
 
 // 方案一：Text -> DataURL 
 const dataUrl = `data:,${str}` 
 download(dataUrl, 'demo.json') 
 
 
 // 方案二：Text -> Blob -> ObjectURL 
 const url = URL.createObjectURL(new Blob(str.split(''))) 
 download(url, 'demo1.json')
```
