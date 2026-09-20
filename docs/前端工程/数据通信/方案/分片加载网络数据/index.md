# 分片加载网络数据

## 目录

- [思考](#思考)
- [分片加载](#分片加载)

网络请求是前端开发中非常重要的一环，但是当我们处理较大的网络请求时，我们往往会面临着长时间的等待和页面白屏的问题。

这不仅影响了用户体验，也降低了网站的性能。

那么，你是如何解决这一问题呢？有没有什么好的方法可以让我们在网络请求时既快又好呢？

我是渡一前端子辰老师，今天我来为大家介绍一种实用的技巧——**分片接收网络数据**。

这种技巧可以让我们在网络请求时不必等待整个响应体传输完成，而是分片地接收和显示数据。

这样就可以大大缩短等待时间，避免页面白屏的出现，提高用户体验。

接下来，子辰将通过一个实例来深入讲解这个实用的技巧。

我们将利用 **fetch API 和 TextDecoder 解码器来实现分片接收网络数据，并将数据分片显示在页面上。**

![](./image/image_69BCKsEIB_.png)

# 思考

首先我们来看一段非常简单的网络请求代码：

```javascript 
async function loadNovel() {
  const url = "https://duyi-static.oss-cn-beijing.aliyuncs.com/files/novel.txt";
  const resp = await fetch(url);
  const text = await resp.text();
  console.log(text);
}
loadNovel();

```


这段代码是请求服务器上的一段 txt 文件，文件大小接近10MB。

那么这么大的文件，一旦在网络不好的情况下，就会加载很久：

![](./image/image_jqwOTMQ9QN.png)

我们将网络限制后会发现，等待了 30 多秒才拿到服务器响应的结果。

如果说这个结果需要在页面上显示，就会导致页面上很长一段时间的白屏，而造成白屏的原因就在代码之中，我们可以看到，代码中有两个 await。

那么你有没有一个疑问：我们为什么要等待两次呢？我们来看一个图：

![](./image/image_1aq2HLcDn7.png)

如图所示，响应头传输完成时 `await fetch(url)` 的 Promise 完成，响应体的传输完成时 `await resp.text()` 的 Promise 完成。

所以**第一次等待的是响应头的传输，第二次等待的是响应体的传输**。

那么造成白屏的原因其实就是因为**响应体传输的时间太久**，如果我们能够在响应体**传输过程中就开始接收和显示数据呢？那岂不是更好？**

# 分片加载

其实，在响应体传输过程中接收和显示数据是完全可行的，因为**响应体是一点一点传输过来的，并不是一次性发送完毕。**

如果我们可以**分片地接收它**传过来的数据，并及时地显示在页面上，那就可以让用户感觉到网站很快速地响应了他们的请求。

这里我们就可以利用 **fetch API 中的 **[**getReader**](https://link.juejin.cn?target=https://developer.mozilla.org/zh-CN/docs/Web/API/Response/body "getReader")** 来分片读取**。

首先我们知道 resp 对象中有一个 body，它代表的是响应体，只不过这个响应体还未完成。

![](./image/image_eftF0HilXo.png)

通过上图我们可以看到 body 的类型是\*\* ReadableStream\*\*，其实是一个可读流，那么我们可以利用 body 里的一个属性 `body.getReader` 拿到这个**流的读取器。**

读取器中有一个 read 属性，可以读取到数据。

知道了怎么做，我们用代码实现一下：

```javascript 
async function loadNovel() {
  const url = "https://duyi-static.oss-cn-beijing.aliyuncs.com/files/novel.txt";
  const resp = await fetch(url);
  // resp.body 从 resp 中拿到响应体
  // 响应体中有一个方法，叫 getReader
  // 返回的是一个 reader 对象
  // 返回的 reader 对象是用来分片读取响应体的
  const reader = resp.body.getReader();
  // read 是一个 Promise 函数，表示读取响应体目前传输的一部分，返回值是一个对象
  // 这个对象里有两个属性 value 和 done
  // 学过 ES6 的同学应该不陌生，这就是迭代器的东西
  // value 表示读取的一个小切片数据
  // done 表示是不是已经读取完成，读取完为 true，未读取完为 false
  const { value, done } = await reader.read();
  // 我们打印看一下 value 是什么
  console.log("value >>> ", value);
}
loadNovel();

```


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cc1278b92c954ff59294cb66d2d0de1d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

打印出来可以看到，虽然我们读取的是文本，但是结果并不是一个字符串。

这是因为 `reader.read()` 函数是一个**通用型函数**，它也不知道服务器**响应给你的是什么数据**，因此它把**数据统一成了由一个个字节组成的字节数组**。

而我们现在读取的是文本，所以我们要把字节数组转化为文本，这里就要使用到一个非常有用的属性了，叫做\*\*文本解码器 \*\*[**TextDecoder**](https://link.juejin.cn?target=https://developer.mozilla.org/zh-CN/docs/Web/API/TextDecoder "TextDecoder")，通过文本解码器我们就可以得到文本数据了：

```javascript 
async function loadNovel() {
  const url = "https://duyi-static.oss-cn-beijing.aliyuncs.com/files/novel.txt";
  const resp = await fetch(url);
  const reader = resp.body.getReader();
  const { value, done } = await reader.read();
  // 新建一个文本解码器
  const decoder = new TextDecoder();
  // 使用 decoder.decode 将读取的切片数据传入进去，就会得到文本数据
  const text = decoder.decode(value);
  // 打印一下 text，看看是否转化文本数据
  console.log("text >>> ", text);
}
loadNovel();

```


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dcb1dc88024c46c9a1a48dfc3c364efa~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

可以看到，我们已经将**字节数组解码为文本**了。

那么一个切片数据我们是这样读取的，多个切片数据我们就可以用一个循环来读取：

```javascript 
async function loadNovel() {
  const url = "https://duyi-static.oss-cn-beijing.aliyuncs.com/files/novel.txt";
  const resp = await fetch(url);
  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  // 为方便测试，我们声明一个变量，代表第几次读取 text 的值
  let num = 0;
   // for 无限定条件永远循环
  for (;;) { 
    // 每一次循环都读取一次数据
    const { value, done } = await reader.read();
    // 如果完成了直接退出
     if (done) {
      break;
    } 
    // 为完成读取文本
    const text = decoder.decode(value);
    // 输出 text
    console.log(`${num++} text >>> `, text);
  }
}
loadNovel();
```


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/030be1ed95584639b78330fdd0dbb839~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

可以看到，在网速调慢后，当我们使用循环分片读取文本数据时，我们共读取了 2817 个切片数据。

虽然读取数据总时长没变，但是用户却能够尽快地看到数据显示在页面上，这样就大大提高了用户体验和网站性能。

当然，在分片加载时还有**一个小问题需要注意：**

![](./image/image_MbaPfVLLgt.png)

上图所示，由于文字编码方式不同（英文字符通常为一个字节，而中文字符通常为多个字节），可**能会出现某个文字被切割成两半而导致乱码问题。**
比如说有一个文字由两个字节组成。而它刚好被切割在两个切片之间：第一个字节在切片 1 的末尾，第二个字节在切片 2 的开头。
这样在分别解码两个切片时就会出现乱码问题：

![](./image/image_1MGJ5SZA7-.png)

可以看到，在两个切片之间有两个乱码字符，这就是因为**文字被切割成两半造成的。**

那么这种情况该如何处理呢？其实也很简单。

只要保证每次解码时都能够完整地包含每个文字即可。

具体做法如下：

```javascript 
async function loadNovel() {
  const url = 'https://duyi-static.oss-cn-beijing.aliyuncs.com/files/novel.txt';
  const resp = await fetch(url);
  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let remainChunk = new Uint8Array(0);
  for (;;) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }
    const lastIndex = value.lastIndexOf(10);
    const chunk = value.slice(0, lastIndex + 1);
    const readChunk = new Uint8Array(remainChunk.length + chunk.length);
    readChunk.set(remainChunk);
    readChunk.set(chunk, remainChunk.length);
    remainChunk = value.slice(lastIndex + 1);
    const text = decoder.decode(readChunk);
    console.log(text);
  }
  const text = decoder.decode(remainChunk);
  console.log(text);
}

loadNovel();


```
