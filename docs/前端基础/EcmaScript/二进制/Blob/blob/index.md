# blob

## 目录

- [Blob 的使用场景](#Blob-的使用场景)

在 `JavaScript` 中，`Blob`（Binary Large Object）对象用于表示**不可变的、原始的二进制数据**。它可以用来**存储文件、图片、音频、视频、甚至是纯文本等**各种类型的数据。`Blob` 提供了一种**高效的方式来**操作数据文件，**而不需要将数据全部加载到内存**中，这**在处理大型文件或二进制数据时非常有用。**

我们可以使用 `new Blob()` 构造函数来创建一个 Blob 对象，语法如下：

```javascript 
const blob = new Blob(blobParts, options);

```


1. **blobParts: 一个数组，包含将被放入 Blob 对象中的数据，可以是字符串、数组缓冲区（ArrayBuffer）、TypedArray、Blob 对象等。**
2. **options: 一个可选的对象，可以设置 type（MIME 类型）和 endings（用于表示换行符）。**

```javascript 
const blob = new Blob(["Hello, world!"], { type: "text/plain" });

```


![](./assets/image/image_q91_iDMCME.png)

Blob 对象主要有以下几个属性：

1. size: 返回 Blob 对象的大小（以字节为单位）。

```javascript 
console.log(blob.size); // 输出 Blob 的大小

```


1. type: 返回 Blob 对象的 MIME 类型。

```javascript 
console.log(blob.type); // 输出 Blob 的 MIME 类型

```


Blob 对象提供了一些常用的方法来操作二进制数据。

1. `slice([start], [end], [contentType])`

该方法用于从 Blob 中提取一部分数据，并返回一个新的 Blob 对象。参数 start 和 end 表示提取的字节范围，contentType 设置提取部分的 MIME 类型。

```typescript 
const blob = new Blob(["Hello, world!"], { type: "text/plain" });

const partialBlob = blob.slice(0, 5);

```


1. `text()`

该方法将 Blob 的内容读取为文本字符串。它返回一个 Promise，解析为文本数据。

```javascript 
blob.text().then((text) => {
  console.log(text); // 输出 "Hello, world!"
});

```


![](./assets/image/image_unddiZQGaK.png)

1. `arrayBuffer()`

该方法将 Blob 的内容读取为 ArrayBuffer 对象，适合处理二进制数据。它返回一个 Promise，解析为 ArrayBuffer 数据

```javascript 
const blob = new Blob(["Hello, world!"], { type: "text/plain" });

blob.arrayBuffer().then((buffer) => {
  console.log(buffer);
});

```


![](./assets/image/image_mwXpftdOj8.png)

1. `stream()`

该方法将 Blob 的数据作为一个 ReadableStream 返回，允许你以流的方式处理数据，适合处理大文件。

### Blob 的使用场景

Blob 对象在很多场景中非常有用，尤其是在 Web 应用中处理文件、图片或视频等二进制数据时。以下是一些常见的使用场景：

1. 生成文件下载

你可以通过 Blob 创建文件并生成下载链接供用户下载文件。

```javascript 
const blob = new Blob(["This is a test file."], { type: "text/plain" });
const url = URL.createObjectURL(blob); // 创建一个 Blob URL
const a = document.createElement("a");
a.href = url;
a.download = "test.txt";
a.click();
URL.revokeObjectURL(url); // 释放 URL 对象

```


当我们刷新浏览器的时候发现是可以自动给我们下载图片了：

![](./assets/image/image_NgwbQzwGKu.png)

1. 上传文件

你可以通过 FormData 对象将 Blob 作为文件上传到服务器：

```javascript 
const formData = new FormData();
formData.append("file", blob, "example.txt");

fetch("/upload", {
  method: "POST",
  body: formData,
}).then((response) => {
  console.log("File uploaded successfully");
});

```


1. 读取图片或其他文件

通过 `FileReader` API 可以将 `Blob` 对象读取为不同的数据格式。举例来说，你可以将 Blob 读取为图片并显示在页面上：

```html 
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <input type="file" id="fileInput" accept="image/*" />

    <div id="imageContainer"></div>
    <script>
      const fileInput = document.getElementById("fileInput");

      const imageContainer = document.getElementById("imageContainer");

      fileInput.addEventListener("change", function (event) {
        const file = event.target.files[0];

        if (file && file.type.startsWith("image/")) {
          const reader = new FileReader();

          reader.onload = function (e) {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.style.maxWidth = "500px";
            img.style.margin = "10px";
            imageContainer.innerHTML = "";
            imageContainer.appendChild(img);
          };

          reader.readAsDataURL(file);
        } else {
          alert("请选择一个有效的图片文件。");
        }
      });
    </script>
  </body>
</html>

```


![](./assets/image/image_0JPUMcWZKm.png)

1. Blob 和 Base64

有时你可能需要将 Blob 转换为 Base64 编码的数据（例如用于图像的内联显示或传输）。可以通过 FileReader 来实现：

```typescript 
const reader = new FileReader();
reader.onloadend = function () {
  const base64data = reader.result;
  console.log(base64data); // 输出 base64 编码的数据
};

reader.readAsDataURL(blob); // 将 Blob 读取为 base64

```


![](./assets/image/image_Qif_8av618.png)
