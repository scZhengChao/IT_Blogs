# vertical-align

[ CSS基线对齐的理解以及处理-CSDN博客 文章浏览阅读2.6w次，点赞26次，收藏54次。相信大家都会遇到同行不同盒子中文本的内容不能对齐的情况，而不知道这是为何？其实这是因为基线对齐的原因。什么是基线对齐？先让我们来看一张图片：到这里我们的疑惑是不是少了一些？基线对齐其实就是指英文字母\`i、n、s\`这些字母的底部，它跟中文字符的底部的含义是不同的。那我们再看一下实测：\<div class="box1">    哈哈  \</div>  < https://blog.csdn.net/weixin\_43324314/article/details/106894148#:\~:text=%E8%BF%99%E8%AF%B4%E6%98%8E%E6%96%87%E5%AD%97%E7%9A%84%E5%9F%BA%E7%BA%BF%E5%AF%B9%E9%BD%90%E6%98%AF%E7%9B%B8%E5%AF%B9%E4%BA%8E%E6%9C%80%E5%90%8E%E4%B8%80%E8%A1%8C%E6%96%87%E5%AD%97%E6%9D%A5%E8%AF%B4%E7%9A%84%EF%BC%81%20%E9%82%A3%E5%AF%B9%E4%BA%8E%E8%BF%99%E7%A7%8D%E6%83%85%E5%86%B5%EF%BC%8C%E5%A6%82%E6%9E%9C%E6%88%91%E4%BB%AC%E6%83%B3%E8%87%AA%E5%AE%9A%E4%B9%89%E5%9E%82%E7%9B%B4%E6%96%B9%E5%90%91%E4%B8%8A%E7%9A%84%E5%AF%B9%E9%BD%90%E6%96%B9%E5%BC%8F%E6%94%B9%E6%80%8E%E6%A0%B7%E5%91%A2%EF%BC%9F,%E5%9C%A8CSS%E4%B8%AD%E6%9C%89%E4%B8%AA%E5%B1%9E%E6%80%A7%20vertical-align%20%E6%98%AF%E8%AE%BE%E7%BD%AE%E5%9E%82%E7%9B%B4%E6%96%B9%E5%90%91%E4%B8%8A%E7%9A%84%E5%AF%B9%E9%BD%90%E6%96%B9%E5%BC%8F%E7%9A%84%EF%BC%8C%E6%88%91%E4%BB%AC%E5%8F%AA%E9%9C%80%E8%A6%81%E5%9C%A8%E5%90%8C%E4%B8%80%E8%A1%8C%E7%9A%84%E4%BB%BB%E4%B8%80%E4%B8%AA%E9%80%89%E6%8B%A9%E5%99%A8%EF%BC%8C%E6%88%96%E8%80%85%E7%88%B6%E4%BA%B2%E8%8A%82%E7%82%B9%E7%9A%84%E6%A0%B7%E5%BC%8F%E4%B8%8A%E8%AE%BE%E7%BD%AE%E6%94%B9%E5%B1%9E%E6%80%A7%E5%B0%B1%E8%A1%8C%E3%80%82](https://blog.csdn.net/weixin_43324314/article/details/106894148#:~:text=%E8%BF%99%E8%AF%B4%E6%98%8E%E6%96%87%E5%AD%97%E7%9A%84%E5%9F%BA%E7%BA%BF%E5%AF%B9%E9%BD%90%E6%98%AF%E7%9B%B8%E5%AF%B9%E4%BA%8E%E6%9C%80%E5%90%8E%E4%B8%80%E8%A1%8C%E6%96%87%E5%AD%97%E6%9D%A5%E8%AF%B4%E7%9A%84%EF%BC%81%20%E9%82%A3%E5%AF%B9%E4%BA%8E%E8%BF%99%E7%A7%8D%E6%83%85%E5%86%B5%EF%BC%8C%E5%A6%82%E6%9E%9C%E6%88%91%E4%BB%AC%E6%83%B3%E8%87%AA%E5%AE%9A%E4%B9%89%E5%9E%82%E7%9B%B4%E6%96%B9%E5%90%91%E4%B8%8A%E7%9A%84%E5%AF%B9%E9%BD%90%E6%96%B9%E5%BC%8F%E6%94%B9%E6%80%8E%E6%A0%B7%E5%91%A2%EF%BC%9F,%E5%9C%A8CSS%E4%B8%AD%E6%9C%89%E4%B8%AA%E5%B1%9E%E6%80%A7%20vertical-align%20%E6%98%AF%E8%AE%BE%E7%BD%AE%E5%9E%82%E7%9B%B4%E6%96%B9%E5%90%91%E4%B8%8A%E7%9A%84%E5%AF%B9%E9%BD%90%E6%96%B9%E5%BC%8F%E7%9A%84%EF%BC%8C%E6%88%91%E4%BB%AC%E5%8F%AA%E9%9C%80%E8%A6%81%E5%9C%A8%E5%90%8C%E4%B8%80%E8%A1%8C%E7%9A%84%E4%BB%BB%E4%B8%80%E4%B8%AA%E9%80%89%E6%8B%A9%E5%99%A8%EF%BC%8C%E6%88%96%E8%80%85%E7%88%B6%E4%BA%B2%E8%8A%82%E7%82%B9%E7%9A%84%E6%A0%B7%E5%BC%8F%E4%B8%8A%E8%AE%BE%E7%BD%AE%E6%94%B9%E5%B1%9E%E6%80%A7%E5%B0%B1%E8%A1%8C%E3%80%82 " CSS基线对齐的理解以及处理-CSDN博客 文章浏览阅读2.6w次，点赞26次，收藏54次。相信大家都会遇到同行不同盒子中文本的内容不能对齐的情况，而不知道这是为何？其实这是因为基线对齐的原因。什么是基线对齐？先让我们来看一张图片：到这里我们的疑惑是不是少了一些？基线对齐其实就是指英文字母`i、n、s`这些字母的底部，它跟中文字符的底部的含义是不同的。那我们再看一下实测：<div class=\"box1\">    哈哈  </div>  < https://blog.csdn.net/weixin_43324314/article/details/106894148#:~:text=%E8%BF%99%E8%AF%B4%E6%98%8E%E6%96%87%E5%AD%97%E7%9A%84%E5%9F%BA%E7%BA%BF%E5%AF%B9%E9%BD%90%E6%98%AF%E7%9B%B8%E5%AF%B9%E4%BA%8E%E6%9C%80%E5%90%8E%E4%B8%80%E8%A1%8C%E6%96%87%E5%AD%97%E6%9D%A5%E8%AF%B4%E7%9A%84%EF%BC%81%20%E9%82%A3%E5%AF%B9%E4%BA%8E%E8%BF%99%E7%A7%8D%E6%83%85%E5%86%B5%EF%BC%8C%E5%A6%82%E6%9E%9C%E6%88%91%E4%BB%AC%E6%83%B3%E8%87%AA%E5%AE%9A%E4%B9%89%E5%9E%82%E7%9B%B4%E6%96%B9%E5%90%91%E4%B8%8A%E7%9A%84%E5%AF%B9%E9%BD%90%E6%96%B9%E5%BC%8F%E6%94%B9%E6%80%8E%E6%A0%B7%E5%91%A2%EF%BC%9F,%E5%9C%A8CSS%E4%B8%AD%E6%9C%89%E4%B8%AA%E5%B1%9E%E6%80%A7%20vertical-align%20%E6%98%AF%E8%AE%BE%E7%BD%AE%E5%9E%82%E7%9B%B4%E6%96%B9%E5%90%91%E4%B8%8A%E7%9A%84%E5%AF%B9%E9%BD%90%E6%96%B9%E5%BC%8F%E7%9A%84%EF%BC%8C%E6%88%91%E4%BB%AC%E5%8F%AA%E9%9C%80%E8%A6%81%E5%9C%A8%E5%90%8C%E4%B8%80%E8%A1%8C%E7%9A%84%E4%BB%BB%E4%B8%80%E4%B8%AA%E9%80%89%E6%8B%A9%E5%99%A8%EF%BC%8C%E6%88%96%E8%80%85%E7%88%B6%E4%BA%B2%E8%8A%82%E7%82%B9%E7%9A%84%E6%A0%B7%E5%BC%8F%E4%B8%8A%E8%AE%BE%E7%BD%AE%E6%94%B9%E5%B1%9E%E6%80%A7%E5%B0%B1%E8%A1%8C%E3%80%82")

**什么是基线对齐？**
先让我们来看一张图片：

![](https://img-blog.csdnimg.cn/20200621235822354.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzMyNDMxNA==,size_16,color_FFFFFF,t_70)

到这里我们的疑惑是不是少了一些？**基线对齐**其实就是\*\*指英文字母`a、i、n、s`\*\***这些字母的底部**，它跟中文字符的底部的含义是不同的。

那我们再看一下实测：

```javascript 
<div class="box1">
    哈哈
  </div>
  <div class="box2">
    呵呵
  </div>

<style>
    .box1 {
      display: inline-block;
      width: 100px;
      height: 100px;
      background-color: red;
      color: white;
      font-size: 48px;
    }
    
    .box2 {
      display: inline-block;
      width: 50px;
      height: 50px;
      background-color: blue;
      color: white;
      font-size: 16px;
    }
  </style>

```


![](./assets/image/image_w9DnnTnaVo.png)

这时候的对齐方式是没什么问题的（浏览器默认字符大小16px）
再我先来改变一下字符的大小看看，将`.bo``x1`的字符改为48px：

```javascript 
.box1 {
      display: inline-block;
      width: 100px;
      height: 100px;
      background-color: red;
      color: white;
      font-size: 48px;
    }

```


![](./assets/image/image_HTiKRpxWoz.png)

可以看到两个盒子文本距离底线有明显的不同，那么更换下盒子字符看看？ &#x20;

![](https://img-blog.csdnimg.cn/20200622085429490.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzMyNDMxNA==,size_16,color_FFFFFF,t_70)

这时候可以看到很明显的区别，这就是基线对齐。

那我再来看看不改变文字大小，改变文字的行数看看：

```javascript 
<div class="box1">
    哈哈哈哈哈哈哈哈哈哈哈哈
  </div>
  <div class="box2">
    呵呵
  </div>

```


![](./assets/image/image_RVELIfmmJv.png)

这说明文字的**基线对齐是相对于最后一行文字来说的！**
那对于这种情况，如果我们想**自定义垂直方向上的对齐方式改怎样呢**？
在CSS中有个属性`vertical-align`是设置垂直方向上的对齐方式的，我们只需要在**同一行的任一个选择器，或者父亲节点的样式上设置改属性就行。**

```javascript 
.box1 {
      display: inline-block;
      width: 100px;
      height: 100px;
      background-color: red;
      color: white;
       vertical-align: top;
     }
```


![](./assets/image/image_MJgVCj4uvV.png)

`vertical-align`可能的值的列表如下：

![](https://img-blog.csdnimg.cn/20200622002753339.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzMyNDMxNA==,size_16,color_FFFFFF,t_70)
