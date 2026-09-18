# &#x20;.promise() 方法

## 目录

- [定义和用法](#定义和用法)
- [语法](#语法)

```javascript title="在一个没有激活动画的集合上调用 .promise()"
$(function () { 
    var div = $( "<div />" );
    div.promise().done(function( arg1 ) {
         //弹出 "true"
         alert( this === div && arg1 === div );
    });
})
```


## 定义和用法

`.promise() `函数返回一个 `Promise` 对象，观察某种类型被绑定到集合的所有行动，是否已被加入到队列中。

**注意：**

1. `.promise()` 方法返回一个`动态生成的 Promise`，当绑定`到集合中的所有特定动作（action）已经被加入或未被加入到队列中时，生成的 Promise 将被受理（resolve）。  `
2. `type` 的默认值是"`fx`" ，这意味着被受理（`resolve`）的 `Promise` 对象是在所有被选中元素的动画都完成时返回的。 &#x20;
3. 如果提供 `target` 参数，`.promise()` 在该参数上添加方法，然后返回这个对象，而不是创建一个新的。它适用于在一个已经存在的对象上添加 `Promise` 行为的情况。

***

## 语法

`.promise( [type ] [, target ] )`

| 参数        | 描述                                |
| --------- | --------------------------------- |
| *type*​   | String类型 需要待观察队列类型。               |
| *target*​ | PlainObject类型 将要绑定 promise 方法的对象。 |
