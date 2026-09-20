# 不定行截断

## 目录

- [字多行超出出现省略号](#字多行超出出现省略号)

[ CSS 奇技淫巧 | 巧妙实现文本"不定行数"截断\_YvetteLau的博客-CSDN博客 Hello，大家好，今天又是一篇 CSS 的奇技淫巧。由阅文前端XboxYan 投稿，授权原创转发。原文地址：https://juejin.cn/post/702287609460898... https://blog.csdn.net/liuyan19891230/article/details/121092190](https://blog.csdn.net/liuyan19891230/article/details/121092190 " CSS 奇技淫巧 | 巧妙实现文本\"不定行数\"截断_YvetteLau的博客-CSDN博客 Hello，大家好，今天又是一篇 CSS 的奇技淫巧。由阅文前端XboxYan 投稿，授权原创转发。原文地址：https://juejin.cn/post/702287609460898... https://blog.csdn.net/liuyan19891230/article/details/121092190")

[CSS 奇技淫巧 | 巧妙实现文本"不定行数"截断 又是一篇 CSS 的奇技淫巧\~ https://mp.weixin.qq.com/s/AyOYohraV48IDSZXWc1how](https://mp.weixin.qq.com/s/AyOYohraV48IDSZXWc1how "CSS 奇技淫巧 | 巧妙实现文本\"不定行数\"截断 又是一篇 CSS 的奇技淫巧~ https://mp.weixin.qq.com/s/AyOYohraV48IDSZXWc1how")

**效果还是相当不错的**

[index.html](./file/index_nw3RIzmJyM.html " index.html")

# **字多行超出出现省略号**

**(目前支持谷歌)**

[https://www.cnblogs.com/like-xcm/p/5849630.html](https://www.cnblogs.com/like-xcm/p/5849630.html "https://www.cnblogs.com/like-xcm/p/5849630.html")

```css 
 .box{
      width: 100px;
      overflow : hidden;
      border: 1px solid black;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    }

<p class="box">
   static：对象遵循常规流。top，right，bottom，left等属性不会被应用。 relative： 对象遵循常规流，并且参照自身在常规流中的位置通过top，right，bottom，left属性进行偏移时不影响常规流中的任何元素。 absolute：对象脱离常规流，使用top，right，bottom，left等属性进行绝对定位，盒子的偏移位置不影响常规流中的任何元素，其margin不与其他任何margin折叠。fixed：对象脱离常规流，使用top，right，bottom，left等属性以窗口为参考点进行定位，当出现滚动条时，对象不会随着滚动。center：对象脱离常规流，使用top，right，bottom，left等属性指定盒子的位置或尺寸大小。盒子在其包含容器垂直水平居中。盒子的偏移位置不影响常规流中的任何元素，其margin不与其他任何margin折叠。（CSS3）page：盒子的位置计算参照absolute。盒子在分页媒体或者区域块内，盒子的包含块始终是初始包含块，否则取决于每个absolute模式。（CSS3） sticky： 对象在常态时遵循常规流。它就像是 relative 和 fixed 的合体，当在屏幕中时按常规流排版，当卷动到屏幕外时则表现如fixed。该属性的表现是现实中你见到的吸附效果。（CSS3）* CSS3新增属性可能存在描述错误及变更，仅供参考，持续更新
  </p>


line-camp( @clamp:2 ) {
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: @clamp;
    /*! autoprefixer: off */   防止webpack处理必须加hack
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
}
```
