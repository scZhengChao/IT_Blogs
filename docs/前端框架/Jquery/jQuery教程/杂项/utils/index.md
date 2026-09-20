# utils

## 目录

- [jQuery判断对象为空，不存在，null，undefined，通用方法](#jQuery判断对象为空不存在nullundefined通用方法)

# jQuery判断对象为空，不存在，null，undefined，通用方法

JavaScript判断`object/json` 是否为空，可以使用jQuery的`isEmptyObject()`方法。

方法实现如下

```javascript 
function isEmptyObject(e) {  
    var t;  
    for (t in e)  
        return !1;  
    return !0  
}  
```
