# android点击链接会出现半透明灰色遮罩

## 目录

- [部分android系统点击一个链接，会出现一个边框或者半透明灰色遮罩, 不同生产商定义出来额效果不一样。去除代码如下；](#部分android系统点击一个链接会出现一个边框或者半透明灰色遮罩-不同生产商定义出来额效果不一样去除代码如下)

### 部分android系统点击一个链接，会出现一个边框或者半透明灰色遮罩, 不同生产商定义出来额效果不一样。去除代码如下；

```css 
a,button,input,textarea{  
  -webkit-tap-highlight-color: rgba(0,0,0,0)  
  -webkit-user-modify:read-write-plaintext-only;   
}
```
