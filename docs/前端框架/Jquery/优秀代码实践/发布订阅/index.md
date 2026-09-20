# 发布订阅

## 目录

- [定义和用法](#定义和用法)
- [语法](#语法)
- [更多实例](#更多实例)
- [支持的 Flags 参数](#支持的-Flags-参数)
  - [once](#once)
  - [memory](#memory)
  - [unique](#unique)
  - [stopOnFalse](#stopOnFalse)
  - [多个flags](#多个flags)
  - [分离,](#分离)
- [\$.Callbacks, \$.Deferred 和 Pub/Sub](#Callbacks-Deferred-和-PubSub)

```javascript title="向 $.Callbacks 的列表添加回调函数"
$(function () { 
    function fn1( value ) {
        alert( value );
    }
    function fn2( value ) {
        fn1("fn2 says: " + value);
        return false;
    }
    var callbacks = $.Callbacks();
    callbacks.add( fn1 ); 
    // 输出: foo!
    callbacks.fire( "foo!" );
    callbacks.add( fn2 );
    // 输出: bar!, fn2 says: bar!
    callbacks.fire( "bar!" );
})
```


## 定义和用法

`$.Callbacks()` 指一个**多用途的回调函数列表对象**，提供了一种强大的方法来管理回调函数队列。

> **提示：** $.Callbacks 是在 jQuery 内部使用，如为 .ajax，$.Deferred 等组件提供基础功能的函数。它也可以用在类似功能的一些组件中，如自己开发的插件

## 语法

*`$`*`.Callbacks( flags )`

| 参数       | 描述                                       |
| -------- | ---------------------------------------- |
| *flags*​ | 可选。 String类型 一个用空格标记分隔的可选列表,用来改变回调列表中的行为 |

## 更多实例

下面是使用 .remove() 从回调列表中删除一个特定的回调的例子

```javascript 
$(function () { 
    function fn1( value ) {
        alert( value );
    }
    function fn2( value ) {
        fn1("fn2 says: " + value);
        return false;
    }
    var callbacks = $.Callbacks();
    callbacks.add( fn1 );
    // 输出: foo!
    callbacks.fire( "foo!" );
    callbacks.add( fn2 ); 
    // 输出: bar!, fn2 says: bar!
    callbacks.fire( "bar!" );
    callbacks.remove( fn2 );
    // 只输出 foobar, fn2 已经被移除。
    callbacks.fire( "foobar" );
})
```


## 支持的 Flags 参数

这个 `flags` 参数是 `$.Callbacks()` 的一个可选参数， 结构为一个用空格标记分隔的标志可选列表，用来改变回调列表中的行为 (比如. `$.Callbacks( 'unique stopOnFalse' ))`。
**以下是可用的 flags:**

| 参数             | 描述                                                          |
| -------------- | ----------------------------------------------------------- |
| *once*​        | 确保这个回调列表只执行一次                                               |
| *memory*​      | 缓存上一次\`fire\`时的参数值，当\`add()\`添加回调函数时，直接用上一次的参数值立刻调用新加入的回调函数 |
| *unique*​      | 一个回调只会被添加一次，不会重复添加                                          |
| *stopOnFalse*​ | 某个回调函数返回\`false\`之后中断后面的回调函数                                |

### `once`

下面是 `$.Callbacks( "once" )` 的一个例子

```javascript 
$(function () { 
    function fn1( value ) {
        alert( value );
    }
    function fn2( value ) {
        fn1("fn2 says: " + value);
        return false;
    }
    var callbacks = $.Callbacks( "once" );
    callbacks.add( fn1 );
    callbacks.fire( "foo" ); 
    callbacks.add( fn2 );
    callbacks.fire( "bar" );
    callbacks.remove( fn2 );
    callbacks.fire( "foobar" );
     /*只输出:foo*/
})
```


### `memory`

下面是 `$.Callbacks( "memory" )` 的一个例子

```javascript 
$(function () { 
    function fn1( value ) {
        alert( value );
    }
    function fn2( value ) {
        fn1("fn2 says: " + value);
        return false;
    }
    var callbacks = $.Callbacks( "memory" );
    callbacks.add( fn1 );
    callbacks.fire( "foo" );
    callbacks.add( fn2 );
    callbacks.fire( "bar" );
    callbacks.remove( fn2 );
    callbacks.fire( "foobar" );
    /*输出 :
    foo
    fn2 says:foo
    bar
    fn2 says:bar
    foobar
    */
})
```


### `unique`

下面是 `$.Callbacks( "unique" ) `的一个例子

```javascript 
$(function () { 
    function fn1( value ) {
        alert( value );
    }
    function fn2( value ) {
        fn1("fn2 says: " + value);
        return false;
    }
    var callbacks = $.Callbacks( "unique" );
    callbacks.add( fn1 );
    callbacks.fire( "foo" );
    callbacks.add( fn1 ); // repeat addition
    callbacks.add( fn2 );
    callbacks.fire( "bar" );
    callbacks.remove( fn2 );
    callbacks.fire( "foobar" );
    /*输出:
    foo
    bar
    fn2 says:bar
    foobar
    */
})
```


### `stopOnFalse`

下面是 `$.Callbacks( "stopOnFalse" )` 的一个例子

```javascript 
$(function () { 
    function fn1( value ) {
        alert( value );
        return false;
    }
     
    function fn2( value ) {
        fn1( "fn2 says: " + value );
        return false;
    } 
    var callbacks = $.Callbacks( "stopOnFalse" );
    callbacks.add( fn1 );
    callbacks.fire( "foo" );
    callbacks.add( fn2 );
    callbacks.fire( "bar" );
    callbacks.remove( fn2 );
    callbacks.fire( "foobar" );
    /*输出:
    foo
    bar
    foobar
    */
})
```


### `多个flags`

`$.Callbacks()` 支持一个列表设置多个`flags`（标识）而不仅仅是一个，有一个累积效应，类似"`&&`"。 &#x20;
下面是 `$.Callbacks( 'unique memory' )` 的一个例子

```javascript 
$(function () { 
    function fn1( value ) {
        alert( value );
        return false;
    }
     
    function fn2( value ) {
        fn1( "fn2 says: " + value );
        return false;
    } 
    var callbacks = $.Callbacks( "unique memory" );
    callbacks.add( fn1 );
    callbacks.fire( "foo" );
    callbacks.add( fn1 ); // repeat addition
    callbacks.add( fn2 );
    callbacks.fire( "bar" );
    callbacks.add( fn2 );
    callbacks.fire( "baz" );
    callbacks.remove( fn2 );
    callbacks.fire( "foobar" ); 
    /*输出:
    foo
    fn2 says:foo
    bar
    fn2 says:bar
    baz
    fn2 says:baz
    foobar*/
})
```


### 分离,

\$.Callbacks 方法也可以被分离, 例如：

```javascript 
$(function () { 
    function fn1( value ) {
        alert( value );
    }
    var callbacks = $.Callbacks(),
    add = callbacks.add,
    remove = callbacks.remove,
    fire = callbacks.fire;
    add( fn1 );
    fire( "hello world" );
    remove( fn1 ); 
    /*输出:hello world*/
})
```


## \$.Callbacks, \$.Deferred 和 Pub/Sub

`pub / sub`（观察者模式）背后的一般思路是促进应用程序的松散耦合和高效通信。观察家也被称为订阅者，它指向观察对象。观察者（`Publisher`）事件发生时通知用户。

作为 `$.Callbacks()` 的创建组件的一个演示，只使用回调函数列表，就可以实现 `Pub/Sub` 系统。将 `$.Callbacks` 作为一个文章队列，可以向下面这样，实现文章的发布和订阅：

```javascript 
$(function () { 
    function fn1( value ) {
      alert( value );
      return false;
    }
     
    function fn2( value ) {
      fn1( "fn2 says: " + value );
      return false;
    }
    var topics = {};
    jQuery.Topic = function( id ) {
        var callbacks,
            method,
            topic = id && topics[ id ];
     
        if ( !topic ) {
            callbacks = jQuery.Callbacks();
            topic = {
                publish: callbacks.fire,
                subscribe: callbacks.add,
                unsubscribe: callbacks.remove
            };
            if ( id ) {
                topics[ id ] = topic;
            }
        }
        return topic;
    };
    // 订阅者
    $.Topic( "mailArrived" ).subscribe( fn1 );
    $.Topic( "mailArrived" ).subscribe( fn2 );
    $.Topic( "mailSent" ).subscribe( fn1 );     
    // 发布者
    $.Topic( "mailArrived" ).publish( "hello world!" );
    $.Topic( "mailSent" ).publish( "woo! mail!" );         
    /*输出:
    hello world!
    fn2 says: hello world!
    woo! mail!*/
})
```


进一步改进使用 \$.Deferreds，可以保证当特定的任务被完成（或被解决）时，发布者只能向订阅者发布通知。参见下面的示例代码：

```typescript 

$(function () { 
    function fn1( value ) {
      alert( value );
      return false;
    }
     
    function fn2( value ) {
      fn1( "fn2 says: " + value );
      return false;
    }
    var topics = {};
    jQuery.Topic = function( id ) {
        var callbacks,
            method,
            topic = id && topics[ id ];
     
        if ( !topic ) {
            callbacks = jQuery.Callbacks();
            topic = {
                publish: callbacks.fire,
                subscribe: callbacks.add,
                unsubscribe: callbacks.remove
            };
            if ( id ) {
                topics[ id ] = topic;
            }
        }
        return topic;
    };
    // 订阅 mailArrived 通知
    $.Topic( "mailArrived" ).subscribe( fn1 ); 
    // 创建一个新对象替代延迟$.Deferreds
    var dfd = $.Deferred();
    // 定义一个新的文章 (不直接发布)
    var topic = $.Topic( "mailArrived" );
    // 当延迟被受理, 发布一个通知给订阅者
    dfd.done( topic.publish );
    /*这里将被回传给订阅者的消息延迟被受理，
    它尽可能整合了复杂的程序（例如等待一个
    Ajax调用完成），所以事实上消息只发布了
    一次。*/
    // 完成。
    dfd.resolve( "已经被发布!" );
})

```


![](./assets/image/image_d6_0az2GzD.png)
