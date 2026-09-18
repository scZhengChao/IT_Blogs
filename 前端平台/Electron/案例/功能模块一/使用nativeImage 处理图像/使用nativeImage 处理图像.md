# 使用nativeImage 处理图像

nativeImage 是 Electron 提供的模块之一，用于处理图像。它可以加载图像文件、从屏幕截取图像、创建空白图像等。nativeImage 支持跨平台，可以在主进程和渲染进程中使用。

1. `nativeImage.createEmpty()`**创建一个空白图像对象。**

```javascript 
const { nativeImage } = require('electron');

const emptyImage = nativeImage.createEmpty();

```


1. `nativeImage.createFromPath(path[, options])`**从文件路径创建图像对象。**
   1. path：字符串，图像文件的路径。
   2. options（可选）：一个包含 width 和 height 属性的对象，可以指定图像的宽度和高度。

```javascript 
const { nativeImage } = require('electron');

const imagePath = '/path/to/image.png';
const image = nativeImage.createFromPath(imagePath);

```


1. `nativeImage.createFromBuffer(buffer[, options])`**从缓冲区创建图像对象**
   1. buffer：一个包含图像数据的 Buffer 对象。
   2. options（可选）：一个包含 width 和 height 属性的对象，可以指定图像的宽度和高度。

```javascript 
const { nativeImage } = require('electron');

const fs = require('fs');
const buffer = fs.readFileSync('/path/to/image.png');
const image = nativeImage.createFromBuffer(buffer);

```


1. `nativeImage.createFromDataURL(dataURL)`从数据 URL 创建图像对象。

- dataURL：一个包含图像数据的数据 URL。

```javascript 
const { nativeImage } = require('electron');

const dataURL = 'data:image/png;base64,iVBORw0KGg...';
const image = nativeImage.createFromDataURL(dataURL);

```


1. `nativeImage.createFromNamedImage(imageName[, hslShift])`从系统的命名图像创建图像对象。
   1. imageName：一个包含系统命名图像的字符串，例如 'NSStopProgressTemplate'。
   2. hslShift（可选）：一个包含 h, s, l 属性的对象，用于对图像进行颜色调整。

```javascript 
const { nativeImage } = require('electron');

const image = nativeImage.createFromNamedImage('NSStopProgressTemplate', { h: 0, s: 0, l: 0 });

```


1. `nativeImage.createThumbnailFromPath(path, size[, callback])`从文件路径创建缩略图。
   1. path：字符串，图像文件的路径。
   2. size：一个包含 width 和 height 属性的对象，指定缩略图的宽度和高度。
   3. callback（可选）：一个回调函数，用于接收缩略图的 nativeImage 对象。

```javascript 
const { nativeImage } = require('electron');

const imagePath = '/path/to/image.png';
const size = { width: 100, height: 100 };

nativeImage.createThumbnailFromPath(imagePath, size, (thumbnail) => {
  console.log(thumbnail);
});

```


1. `nativeImage.isMacTemplateImage(image)`检查图像是否是 macOS 模板图像。
   1. image：要检查的 nativeImage 对象。

```javascript 
const { nativeImage } = require('electron');

const imagePath = '/path/to/image.png';
const image = nativeImage.createFromPath(imagePath);

console.log(nativeImage.isMacTemplateImage(image)); // true or false

```


1. `nativeImage.toDataURL([options])`将图像转换为数据 URL。
   1. options（可选）：一个包含 scaleFactor 属性的对象，用于指定缩放因子。

```javascript 
const { nativeImage } = require('electron');

const imagePath = '/path/to/image.png';
const image = nativeImage.createFromPath(imagePath);

const dataURL = image.toDataURL({ scaleFactor: 2.0 });


```
