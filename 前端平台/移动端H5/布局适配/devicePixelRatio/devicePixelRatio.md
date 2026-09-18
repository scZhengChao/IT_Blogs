# devicePixelRatio

媒体查询：

```sass (scss)  
  @media only screen and (-webkit-min-device-pixel-ratio:1.0){
      .box{
          background: red;
      }
  }
  @media only screen and (-webkit-min-device-pixel-ratio:2.0){
      .box{
          background: yellow;
      }
  }
  @media only screen and (-webkit-min-device-pixel-ratio:3.0){
      .box{
          background:blue
      }
  }
```


```css 
在javascript中，可以通过window.devicePixelRatio获取到当前设备的dpr。
在css中，可以通过-webkit-device-pixel-ratio，
-webkit-min-device-pixel-ratio和
-webkit-max-device-pixel-ratio进
```
