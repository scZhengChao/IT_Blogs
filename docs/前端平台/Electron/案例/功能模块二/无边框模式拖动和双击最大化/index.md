# 无边框模式拖动和双击最大化

## 目录

- [无边框模式下](#无边框模式下)

参考：

[ electron无边框模式完美解决同时实现拖动和双击最大化\_欣颖�随心的博客-CSDN博客\_electron 无边框拖动 无边框模式下，需要在background.ts启动启用：frame:false，transparent:true；配置后, 自定义导航栏这时候窗口是不可以拖动的。但是您想拖动的话，这时候您要元素中声明一个：-webkit-app-region: drag;(元素可拖动模式),但是设置以后出现了新问题drag模式下元素无法监听到鼠标双击或者单击事件。解决此问题之前看了很多文章的方法1.父元素下嵌套等 https://blog.csdn.net/li19931130/article/details/125145650](https://blog.csdn.net/li19931130/article/details/125145650 " electron无边框模式完美解决同时实现拖动和双击最大化_欣颖�随心的博客-CSDN博客_electron 无边框拖动 无边框模式下，需要在background.ts启动启用：frame:false，transparent:true；配置后, 自定义导航栏这时候窗口是不可以拖动的。但是您想拖动的话，这时候您要元素中声明一个：-webkit-app-region: drag;(元素可拖动模式),但是设置以后出现了新问题drag模式下元素无法监听到鼠标双击或者单击事件。解决此问题之前看了很多文章的方法1.父元素下嵌套等 https://blog.csdn.net/li19931130/article/details/125145650")

# 无边框模式下

frame:false，transparent:true；

![](./assets/image/image_DDcAVaaGZZ.png)

配置后, **自定义导航栏这时候窗口是不可以拖动的**。但是您想拖动的话，这时候您要元素中声明一个：-[webkit](https://so.csdn.net/so/search?q=webkit\&spm=1001.2101.3001.7020 "webkit")-app-region: drag;(元素可拖动模式),但是设置以后出现了新问题drag模式下元素无法监听到鼠标双击或者单击事件。

```typescript 
body {
  width: 100%;
  height: 100%;
  font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Open Sans', sans-serif;
  overflow: hidden;
  background-color: transparent;
  // 允许拖拽移动窗口
  -webkit-app-region: drag;

  // 隐藏滚动条
  ::-webkit-scrollbar {
    display: none;
  }
}
```
