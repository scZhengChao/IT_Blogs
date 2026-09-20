# 二维码

## 目录

- [USAGE](#USAGE)

[ react生成二维码 1. 安装qrcode.react插件 2. 使用qrcode.react插件生成二维码 2.1 引用 2.2 使用 https://www.jianshu.com/p/82602a66edca](https://www.jianshu.com/p/82602a66edca " react生成二维码 1. 安装qrcode.react插件 2. 使用qrcode.react插件生成二维码 2.1 引用 2.2 使用 https://www.jianshu.com/p/82602a66edca")

```react tsx 
yarn add qrcode.react
// or 
npm install qrcode.react --save

import QRCode from 'qrcode.react';

<QRCode
    id="qrCode"
    value="https://zengwu.com.cn"
    size={200} // 二维码的大小
    fgColor="#000000" // 二维码的颜色
    style={{ margin: 'auto' }}
    imageSettings={{ // 二维码中间的logo图片
        src: "https://zengwu.com.cn/images/avatar.png",
        height: 100,
        width: 100,
        excavate: true, // 中间图片所在的位置是否镂空
     }}
 />    
```


# USAGE

```react tsx 
<div className={cx('static-img','qrcode')}>
  <div className={cx('qrcode-box')}>
    <QRCode
      id="qrCode"
      value="http://www.baidu.com"
      size={100}
      fgColor="#000000"
      includeMargin={false}
      style={{width:100,height:100}}
      bgColor='white'
    />
  </div>
  <div className={cx('qrcode-desc')}>招乎预约扫码</div>
</div>
```


```sass (sass)  

.static-img {
    width: 250px;
    height: 250px;
  }

  .qrcode {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    // todo
    border: 1px solid red;
    box-sizing: border-box;
    .qrcode-box {
      background: var(--color-white);
      padding: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .qrcode-desc {
      margin-top: 10px;
      color: var(--color-white1);
      font-size: 14px;
      font-weight: 400;
    }
  }

```
