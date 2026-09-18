# **适当的扩大新生代老生代的堆内存；**

node在启动时可以传递--max-old-space-size 或者 --max-new-space-size来调整内存限制的大小；示例如下：

```javascript 
node --max-old-space-size=1700 test.js // 单位为MB    老生代堆内存
node --max-new-space-size=1024 test.js // 单位为KB   新生代堆内存


```


**上述参数在v8初始化时生效，一旦生效就不能动态改变**
