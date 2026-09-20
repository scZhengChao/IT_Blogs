# 裁切图片

## 目录

- [文档](#文档)
- [介绍](#介绍)
- [示例](#示例)
- [安装](#安装)
- [使用](#使用)
- [在 antd v5 之前](#在-antd-v5-之前)
- [Props](#Props)

## 文档

[ antd-img-crop/README.zh-CN.md at c82d1cfbb0e3ffb753f886e0790a8353e2baea3d · nanxiaobei/antd-img-crop 🔪 An image cropper for Ant Design Upload. Contribute to nanxiaobei/antd-img-crop development by creating an account on GitHub. https://github.com/nanxiaobei/antd-img-crop/blob/HEAD/README.zh-CN.md](https://github.com/nanxiaobei/antd-img-crop/blob/HEAD/README.zh-CN.md " antd-img-crop/README.zh-CN.md at c82d1cfbb0e3ffb753f886e0790a8353e2baea3d · nanxiaobei/antd-img-crop 🔪 An image cropper for Ant Design Upload. Contribute to nanxiaobei/antd-img-crop development by creating an account on GitHub. https://github.com/nanxiaobei/antd-img-crop/blob/HEAD/README.zh-CN.md")

## 介绍

我们经常会遇到，需要上传固定尺寸图片的场景，比如更换头像图片等。这时就需要先对图片进行裁切，Ant Desgin 默认并没有提供这样的功能。

[antd-img-crop](https://github.com/nanxiaobei/antd-img-crop "antd-img-crop") 是一个用于包装 Ant Design [Upload](https://ant.design/components/upload-cn/ "Upload") 的组件，可实现在上传前，先对图片进行裁切，然后上传裁切后的图片。

## 示例

[https://codesandbox.io/s/4qoom5p9x4](https://codesandbox.io/s/4qoom5p9x4 "https://codesandbox.io/s/4qoom5p9x4")

```react 
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import ImgCrop from 'antd-img-crop';
import { Upload } from 'antd';

const getSrcFromFile = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.originFileObj);
    reader.onload = () => resolve(reader.result);
  });
};

const Demo = () => {
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    const src = file.url || (await getSrcFromFile(file));
    const imgWindow = window.open(src);

    if (imgWindow) {
      const image = new Image();
      image.src = src;
      imgWindow.document.write(image.outerHTML);
    } else {
      window.location.href = src;
    }
  };

  return (
    <ImgCrop grid rotate>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < 3 && '+ Upload'}
      </Upload>
    </ImgCrop>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Demo />);

```


## 安装

```typescript 
yarn add antd-img-crop

```


## 使用

## 在 antd v5 之前

若使用 `antd<=v4` & `babel-plugin-import`，且未使用 `Modal` 或 `Slider`，请手动引入这些样式：

```react 
import 'antd/es/modal/style';
import 'antd/es/slider/style';
```


```typescript 
import ImgCrop from 'antd-img-crop';
import { Upload } from 'antd';
 
const Demo = () => (
  <ImgCrop>
    <Upload>+ Add image</Upload>
  </ImgCrop>
);

```


## Props

| 属性                      | 类型                   | 默认        | 说明                                                                                                                                                                                                              |
| ----------------------- | -------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| aspect                  | `number`             | `1 / 1`   | 裁切区域宽高比，`width / height`                                                                                                                                                                                        |
| shape                   | `string`             | `'rect'`  | 裁切区域形状，`'rect'` 或 `'round'`                                                                                                                                                                                     |
| grid                    | `boolean`            | `false`   | 显示裁切区域网格（九宫格）                                                                                                                                                                                                   |
| quality                 | `number`             | `0.4`     | 图片质量，`0 ~ 1`                                                                                                                                                                                                    |
| fillColor               | `string`             | `'white'` | 裁切图像小于画布时的填充颜色                                                                                                                                                                                                  |
| zoom                    | `boolean`            | `true`    | 启用图片缩放                                                                                                                                                                                                          |
| rotate                  | `boolean`            | `false`   | 启用图片旋转                                                                                                                                                                                                          |
| minZoom                 | `number`             | `1`       | 最小缩放倍数                                                                                                                                                                                                          |
| maxZoom                 | `number`             | `3`       | 最大缩放倍数                                                                                                                                                                                                          |
| modalTitle              | `string`             | `'编辑图片'`  | 弹窗标题                                                                                                                                                                                                            |
| modalWidth              | `number` \| `string` | `520`     | 弹窗宽度，`px` 的数值或百分比                                                                                                                                                                                               |
| modalOk                 | `string`             | `'确定'`    | 弹窗确定按钮文字                                                                                                                                                                                                        |
| modalCancel             | `string`             | `'取消'`    | 弹窗取消按钮文字                                                                                                                                                                                                        |
| modalMaskTransitionName | `string`             | `'fade'`  | 弹窗遮罩过渡效果, 设为 `'none'` 可禁用默认过渡效果                                                                                                                                                                                 |
| modalClassName          | `string`             | `''`      | 为 Modal 容器提供您自己的类名                                                                                                                                                                                              |
| modalTransitionName     | `string`             | `'fade'`  | 弹窗过渡效果, 设为 `'none'` 可禁用默认过渡效果                                                                                                                                                                                   |
| onModalOK               | `function`           | -         | 点击弹窗确定回调                                                                                                                                                                                                        |
| onModalCancel           | `function`           | -         | 点击弹窗遮罩层、右上角叉、取消的回调                                                                                                                                                                                              |
| beforeCrop              | `function`           | -         | 弹窗打开前调用，若返回 `false`，弹框将不会打开                                                                                                                                                                                     |
| onUploadFail            | `function`           | -         | 上传失败时的回调                                                                                                                                                                                                        |
| cropperProps            | `object`             | -         | [react-easy-crop](https://github.com/ricardo-ch/react-easy-crop#props "react-easy-crop") 的 props（\* [已有 props](https://github.com/nanxiaobei/antd-img-crop/blob/main/src/EasyCrop.tsx#L74-L93 "已有 props") 无法重写） |
