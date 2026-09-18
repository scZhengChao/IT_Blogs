# jQuery.fn.extend()方法

## 目录

- [定义和用法](#定义和用法)
- [语法](#语法)

```html title="添加两个方法到jQuery原型($.fn)"
<label><input type="checkbox" name="foo"> Foo</label>
<label><input type="checkbox" name="bar"> Bar</label>
<script>
$(function () { 
    $.fn.extend({
        check: function() {
            return this.each(function() {
                this.checked = true;
            });
        },
        uncheck: function() {
            return this.each(function() {
                this.checked = false;
            });
        }
    });
    // 使用新创建的.check() 方法
    $( "input[type='checkbox']" ).check();
})
</script>
```


## 定义和用法

\$.fn.extend() 函数为jQuery扩展一个或多个实例属性和方法(主要用于扩展方法)。

**提示：** jQuery.fn是jQuery的原型对象，其extend()方法用于为jQuery的原型添加新的属性和方法。这些方法可以在jQuery实例对象上调用。

## 语法

```javascript 
$.fn.extend( object )

```


| 参数        | 描述                                |
| --------- | --------------------------------- |
| *object*​ | Object类型 指定的对象，用来合并到jQuery的原型对象上。 |
