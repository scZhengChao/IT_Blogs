# 解析二维码

## 目录

- [new BarcodeDetector](#new-BarcodeDetector)

### `new BarcodeDetector`

```javascript 
// 创建检测器
const barcodeDetector = new BarcodeDetector({
    formats: ['qr_code']
})
barcodeDetector.detect(eleImg)
  .then(barcodes => {
    console.log('barcodes', barcodes)
    barcodes.forEach(barcode => {
      result.innerHTML = `<span class="success">解析成功，结果是：</span>${barcode.rawValue}`
    })
  })
  .catch(err => {
    result.innerHTML = `<span class="error">解析出错：${err}</span>`
  })

```


浏览器提供了原生的API来解析二维码和条形码，即 `Barcode Detection API`。

`formats`表示要解析那种码，如下图所示：

![](./assets/image/image_KayF3ftJ59.png)
