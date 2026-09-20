# 流式下载

**流式获取，本地内存获取，然后转化为UrL进行下载（****`createObjectURL`****）**

在需要认证的POST接口中，对于一些小文件，我们通常会先将**文件流保存到内存中，等到文件流传输完成，再进行下载**。代码如下：

```javascript 
// 使用axios的话
  this.$axios.post('http://localhost:3000/download',{
  },{
      responseType: 'blob'
  }).then(function(response) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = 'helloworld.txt';
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
  });
​
// 使用fetch的话
fetch("http://localhost:3000/download",{
    method: 'POST',
    responseType: 'blob'
}).then(res => {
    return res.blob()
}).then(res => {
    const blob=new Blob([res])
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'helloworld.txt';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
})

```


> 开发过程中遇到两个小知识点

1. `revokeObjectURL`这个方式是用来告知浏览器，通过`createObjectURL`创建的对象**已经可以被清除了。** 虽然通过垃圾回收机制也可清除，但这个效率更高。
2. 使用`fetch`的时候，fetch有一个很迷惑的配置，mode: 'no-cors'，注意使用这个配置的话，他并不是用来解决跨域问题的，如果接口跨域，使用了这个配置，虽然能访问通，但是不会返回任何数据，换句话说，他只能检测接口连通性。

```typescript 
if (reqConf.responseType == 'blob') {
    // 返回文件名
    let contentDisposition = config.headers['content-disposition'];
    if (!contentDisposition) {
      contentDisposition = `;filename=${decodeURI(config.headers.filename)}`;
    }
    const fileName = window.decodeURI(contentDisposition.split(`filename=`)[1]);
    // 文件类型
    const suffix = fileName.split('.')[1];
    // 创建 blob 对象
    const blob = new Blob([config.data], {
      type: FileType[suffix],
    });
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = URL.createObjectURL(blob); // 创建 url 对象
    link.download = fileName; // 下载后文件名
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // 移除隐藏的 a 标签 
    URL.revokeObjectURL(link.href); // 销毁 url 对象
  }

```


```typescript 
const contentDisposition = xhr.getResponseHeader('content-disposition')
const fileName = window.decodeURI(contentDisposition.split('filename=')[1])
const type = xhr.getResponseHeader('content-type')
const windowURL = window.URL || window.webkitURL || window
const url = windowURL.createObjectURL(new Blob([xhr.response],{
    type:type
}))
const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download=fileName
  document.body.appendChild(a)
  a.click();
  windowURL.revokeObjectURL(url)
  document.body.removeChild(a)
```
