# 自定义事件

一直以为jQuery的bind只能绑定jQuery中的事件，今天从一本书上看到jQuery的bind也能绑定自定义事件。

事实上我们可以通过bind绑定一个自定义事件，然后再通过trigger来触发这个事件。例如给element绑定一个hello事件，再通过trigger来触发这个事件：

```javascript 
//给element绑定hello事件
element.bind("hello",function(){
    alert("hello world!");
});
      
//触发hello事件
element.trigger("hello");
```
