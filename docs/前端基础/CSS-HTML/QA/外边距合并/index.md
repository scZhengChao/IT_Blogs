# 外边距合并

这种现象发生在两个并列的元素之间。给一个元素设置下外边距（margin-bottom），并同时给一个元素设置上外边距（margin-top）。两个元素之间的距离不等于这两个外边距之和，而是等于其中最大的一个外边距。如下图：

![](https://pic3.zhimg.com/80/v2-39a61730c6f5c9a359c96f3a9d58499a_1440w.webp)

这种现象就是外边距的合并问题。

![](./image/image_A-6aIsN3K2.png)

![](./image/image_zNORuiZt-1.png)

**1、解决方案一：只设置其中一个元素的margin值即可（推荐）**

在实际的开发中，可以根据自己的需求，设置其中一个元素的margin值即可。比如本例中，可以设置第一个元素的margin-bottom的值而不设置第二个元素的margin-top值。反之亦然。

**2、解决方案二：给每一个元素添加父元素，然后触发BFC规则（不推荐）**

```javascript 
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>外边距塌陷</title>
    <style type="text/css">
      *{
        margin: 0px;
        padding: 0px;
      }
      .father-box{
                        /*解决外边距合并 */
        overflow: hidden;
      }
      .first{
        width: 400px;
        height: 200px;
        margin-bottom: 50px;
        background: purple;
      }
      .second{
        width: 400px;
        height: 200px;
        margin-top: 100px;
        background: green;
      }
    </style>
  </head>
  <body>
    <div class="father-box">
      <div class="first"></div>
    </div>
    <div class="father-box">
      <div class="second"></div>
    </div>
  </body>
</html>

```


![](./image/image__zH4umxJn7.png)
