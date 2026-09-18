# 下载文件

同样也可以应用在下载文件上，下载文件其实就是有一个`url`赋予到`a`标签上，然后点击`a`标签就能下载了，我们也可以用`URL.createObjectURL`去生成一个临时url

```javascript 
// 创建文件 Blob
const blob = new Blob([/* 文件数据 */], { type: 'application/pdf' });

// 创建下载链接
const downloadUrl = URL.createObjectURL(blob);
const downloadLink = document.createElement('a');
downloadLink.href = downloadUrl;
downloadLink.download = 'document.pdf';
downloadLink.textContent = 'Download PDF';
document.body.appendChild(downloadLink);

```
