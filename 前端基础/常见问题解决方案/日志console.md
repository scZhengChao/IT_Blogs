# 日志console

## 目录

- [封装console](#封装console)

# **封装console**

其中较为重要的有：

- 分组：console.group('首页'）  console.groupEnd()  当输出杂乱时
- 断言：console.assert(false,'message')   第一个为判断条件，第二个是当第一个判断为false时的输出信息
- 表格输出： console.table(obj),对于简单的数组和对象    
- 计次：console.count('num')    ==> num:100  用于打印次数
- 计时：console.time('复杂同步运算')   console.timeEnd('复杂同步运算')  用于同步的复杂运算
- 样式：通过在文字前加上 ‘%c’, 然后在后方写入css设置即可将console.log加上CSS样式
  - console.log('%c这是示例的文字-Tz','color:pink;font-size:50px;font-weight: 500')
  - console.log('哪有人就哪有江湖 相持相扶%c--Tz张无忌','background-color:#222;font-size:24px;font-weight: 500;color:#bada55')
- console.trace()  //显示当前执行的代码在堆栈中的调用路径。
- console.clear()   //清除控制台上的信息。

```javascript 
 var $a1 = function() {
  var warn = "object" == typeof console ? console.warn : function(){};
  try {
    var options = {
      warn : warn
    };
    options.warn.call(options);
  } catch (n) {
    return noop;
  }
  return warn;
};
```
