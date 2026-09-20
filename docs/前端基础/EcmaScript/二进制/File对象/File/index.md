# File

File 是 JavaScript 中**代表文件的数据结构**，它**继承自 Blob 对象**，包含文件的元数据（如文件名、文件大小、类型等）。File 对象通常由用户通过 `<input type="file">` 选择文件时创建，也可以使用 `JavaScript` 构造函数手动创建。

```html 
<input type="file" id="fileInput" />
<script>
  document.getElementById("fileInput").addEventListener("change", (event) => {
    const file = event.target.files[0];
    console.log("文件名:", file.name);
    console.log("文件类型:", file.type);
    console.log("文件大小:", file.size);
  });
</script>

```


最终输出结果如下图所示：

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/b0a39e8996874b47baa36bcbbdb1e0f0~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgTW9tZW50:q75.awebp?rk3s=f64ab15b\&x-expires=1729826131\&x-signature=btAkDjb%2BhmeFzkyIZg5kLixEYxw%3D)

我们可以使用 `File` 的方式来访问用户上传的文件，我们也可以手动创建 File 对象：

```javascript 
const file = new File(["Hello, world!"], "hello-world.txt", {
  type: "text/plain",
});

console.log(file);

```


![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/68f7a6ffe27642a5b233f13fc4314233~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgTW9tZW50:q75.awebp?rk3s=f64ab15b\&x-expires=1729826131\&x-signature=wpYhDu9S6u0mKyUq0LldT16c89w%3D)

File 对象继承了 Blob 对象的方法，因此可以使用一些 Blob 对象的方法来处理文件数据。

1. slice(): 从文件中获取**一个子部分数据，返回一个新的 Blob 对象。**

```typescript 
const blob = file.slice(0, 1024); // 获取文件的前 1024 个字节

```


1. **text(): 读取文件内容，并将其作为文本返回（这是 Blob 的方法，但可以用于 File 对象）。**

```javascript 
file.text().then((text) => {
  console.log(text); // 输出文件的文本内容
})

```


1. arrayBuffer(): 将**文件内容读取为 ArrayBuffer（用于处理二进制数据）。**

```javascript 
file.arrayBuffer().then((buffer) => {
  console.log(buffer); // 输出文件的 ArrayBuffer
});

```


1. stream(): 返回一个 `ReadableStream` 对象，可以**通过流式读取文件内容**。

```typescript 
const stream = file.stream();

```


![](./assets/image/image_9IWzxWXi4V.png)
