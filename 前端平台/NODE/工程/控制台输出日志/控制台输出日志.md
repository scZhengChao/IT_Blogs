# 控制台输出日志

## 目录

- [三言两语说透process.stdout.write和console.log的区别](#三言两语说透processstdoutwrite和consolelog的区别)
  - [process.stdout.write介绍](#processstdoutwrite介绍)
  - [console.log介绍](#consolelog介绍)
  - [区别比较](#区别比较)
    - [1. 使用场景不同](#1-使用场景不同)
    - [2. 实现机制不同](#2-实现机制不同)
    - [3. 输出内容不同](#3-输出内容不同)
    - [4. 缓冲机制不同](#4-缓冲机制不同)
    - [5. 编码处理不同](#5-编码处理不同)
    - [6. 补充换行不同](#6-补充换行不同)
    - [7. 异步机制不同](#7-异步机制不同)
  - [何时使用process.stdout.write](#何时使用processstdoutwrite)
  - [总结](#总结)
- [/r](#r)

```javascript 
process.stdout.write('string')
```


# 三言两语说透process.stdout.write和console.log的区别

Node.js中的process.stdout.write和console.log都是用于向标准输出流(stdout)打印输出的方法，但二者在使用场景和实现方式上有些区别。本文将详细介绍process.stdout.write和console.log的区别。

## `process.stdout.write`介绍

`process.stdout.write`是Node.js中的一个核心API,用于向标准输出流(stdout)写入数据。

它的主要特点包括:

- 用于向终端打印输出。node中的`console.log`方法内部就是使用`process.stdout.write`实现的。
- 可以写入`Buffer`对象或字符串。
- 写入是异步的，需要通过注册'drain'事件来知道流是否为空并等待写入完成。
- 如果stdout传给了管道(pipe)，写入会阻塞直到输出消费者读取数据。
- 默认情况下stdout是块缓冲的，调用`process.stdout.write()`并不会总是立即打印到终端，需要设置`{ stdio: 'ignore' }`来禁用缓冲。

它的函数签名是:

```javascript 
process.stdout.write(chunk[, encoding][, callback])

```


参数说明:

- chunk：要写入的数据，可以是Buffer对象或字符串
- encoding：如果写入的是字符串，该参数指定字符编码，默认为'utf8'
- callback：回调函数，在数据写入完成后被调用

使用示例：

```javascript 
process.stdout.write('Hello '); 
process.stdout.write('World!' + '\n');

// 注册'drain'事件以知道流是否为空
process.stdout.on('drain', () => {
  console.log('write completed, stdout drained');
});

```


`process.stdout.write`直接写入的都是原始数据流，支持写入Buffer对象和字符串。它通过系统级的文件描述符来实现对标准输出流的操作。

## console.log介绍

`console.log`也是用于向标准输出打印数据，是Node.js CONSOLE模块提供的方法。

它的函数签名是:

```javascript 
console.log([data][, ...args])

```


参数说明:

- data：要输出的内容，可以是多个，会依次打印
- args：其它要替换输出的内容

`console.log`接受的参数非常灵活，可以输出多个内容，并且支持字符串替换和格式化。

## 区别比较

### 1. 使用场景不同

`process.stdout.write`是底层的API，允许对stdout流进行更底层的控制。适用于需要自己控制写入`timing`的场景，比如绘制终端进度条、动画等。

`console.log`是更高级的打印方法,默认情况下会添加换行，输出内容比较人性化，适用于日常的debug打印。

### 2. 实现机制不同

`process.stdout.write`是直接系统调用，通过文件描述符对标准流进行写操作。

`console.log`需要输出的内容会先被Console类处理格式化后，再通过系统的`process.stdout.write`进行底层写操作。

### 3. 输出内容不同

`process.stdout.write`直接写入的是Buffer对象或字符串的数据。

`console.log`支持多参数输入，可以输出复杂的嵌套数据，并且会自动申请内存空间，不需要自己创建Buffer。

### 4. 缓冲机制不同

`process.stdout.write`的写入是同步的，调用一次就会立即执行写入。

`console.log`默认是行缓冲的,即输出内容不会立即打印到终端，会进行缓冲，在遇到换行或主动flush的时候才输出。

### 5. 编码处理不同

`process.stdout.write`支持手动指定编码，如'utf8'等。

`console.log`会自动判断编码，在处理多字节字符集时更友好。

### 6. 补充换行不同

`process.stdout.write`不会添加任何换行或空格。

`console.log`默认打印内容后会补充一个换行符'\n'。

### 7. 异步机制不同

`process.stdout.write`支持回调函数通知写入完成。

`console.log`没有回调，写入同步进行。

## 何时使用process.stdout.write

由于`process.stdout.write`更底层，所以什么时候会需要用到它呢?

主要的使用场景包括:

- 需要按特定频率输出内容，比如打印下载进度
- 需要对终端进行更细粒度控制，例如清除行、光标位置等
- 生成输出图表或动画效果
- 实现日志记录系统，需要精确写入时间而不是缓冲输出
- 需要与管道或其他类型的流集成时，用更底层的写操作会更方便

## 总结

`process.stdout.write`和`console.log`作为Node.js中打印输出的两种主要方式，各有优势:

`process.stdout.write`提供底层的写操作控制，支持流动态写入，但需要自己管理缓冲和编码处理。

`console.log`提供了更方便的格式化输出，自动管理缓冲，支持复杂数据打印，非常适合日常debug使用。

# /r

使用 `console.log('hello')` 打印，会自动在结尾加上 `\r`, 所以 每次打印都是在新的一样，

在 `Node` 中，可以使用 `process.stdout.write('hello')` 实现不换行打印，一直在当前行追加,

如果我们想 每次打印都从 当前行的行首开始打印, 可以 在 `process.stdout.write` 中添加 转义字符 \r, 像这样 `process.stdout.write('hello \r')`。

> 文义来说\r代表回车，\n代表换行 &#x20;
> 在老式的机械打字机，如果你想在下一行最左端开始继续打印，需要做两个动作，先把机头重新推回最左侧，这就是回车，但是他还没有换行，然后再按一下换行键，这样才到下一行。 &#x20;
> 计算机刚产生的时候，主要还是文字界面，受打字机影响，也就有了这两个特殊字符
