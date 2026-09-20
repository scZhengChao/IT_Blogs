# jQuery.extend()方法

## 目录

- [定义和用法](#定义和用法)
- [语法](#语法)

```javascript title="遍历数组元素,并修改第一个对象"
<div id="log"></div>
<script>
$(function () { 
    var object1 = {
        apple: 0,
        banana: {weight: 52, price: 100},
        cherry: 97
    };
    var object2 = {
        banana: {price: 200},
        durian: 100
    };
    /* object2 合并到 object1 中 */
    $.extend(object1, object2);
    var printObj = typeof JSON != "undefined" ? JSON.stringify : function(obj) {
        var arr = [];
        $.each(obj, function(key, val) {
            var next = key + ": ";
            next += $.isPlainObject(val) ? printObj(val) : val;
            arr.push( next );
        });
        return "{ " +  arr.join(", ") + " }";
    };
    $("#log").append( printObj(object1) );
})
</script>
```


## 定义和用法

`jQuery.extend()` 函数用于将**一个或多个对象的内容合并到目标对象**。

> **注意：** 1. 如果只为`$.extend()`指定了一个参数，则意味着参数`target`被省略。此时，`target`就是`jQuery`**对象本身**。通过这种方式，我们可以为全局对象`jQuery`添加新的函数。&#x20;

&#x20;

1. 如果多个对象具有相同的属性，则后者会覆盖前者的属性值。

## 语法

```javascript 
$.extend( target [, object1 ] [, objectN ] )

```


指示是否深度合并

```javascript 
$.extend( [deep ], target, object1 [, objectN ] )
```


> **警告:** **不支持第一个参数传递** `false` 。

| 参数         | 描述                                                                               |
| ---------- | -------------------------------------------------------------------------------- |
| *deep*​    | 可选。 Boolean类型 指示是否深度合并对象，默认为false。如果该值为true，且多个对象的某个同名属性也都是对象，则该"属性对象"的属性也将进行合并。 |
| *target*​  | Object类型 目标对象，其他对象的成员属性将被附加到该对象上。                                                |
| *object1*​ | 可选。 Object类型 第一个被合并的对象。                                                          |
| *objectN*​ | 可选。 Object类型 第N个被合并的对象。                                                          |
