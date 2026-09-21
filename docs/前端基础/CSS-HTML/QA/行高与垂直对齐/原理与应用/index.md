# line-height与vertical-align的密切关系与应用

## 目录

- [图片底部留有一定间隙](#图片底部留有一定间隙)
- [空白和非空白](#空白和非空白)
- [空白节点不足](#空白节点不足)
- [应用](#应用)
  - [(1)实现垂直居中](#1实现垂直居中)
  - [(2)任意父级高度的垂直居中](#2任意父级高度的垂直居中)

![](<../../assets/line-height 和  vertical-align /line-height与vertical-align的密切关/image/image_XTpA_MjRUt.webp>)

![](<../../assets/line-height 和  vertical-align /line-height与vertical-align的密切关/image/image_01VLplKjrr.webp>)

咋一看，我们很难看到这两个属性之间的关系，但是实际上，这两个属性的关系非常密切，而且无处不在。引用张鑫旭的话讲就是“令人发指的断背基友关系”。我们在处**理内联元素的对齐，排列等，很多令人捉摸不透的奇怪现象**都和`vertical-align`和`line-height`之间有很大的关系，基本上都能从它们身上找到原因和解决办法。

1. **几个定义**

   在讲两个属性之间的关系和应用之前，先来了解几个定义。

**（1）inline-block基线：** 在CSS2可视化格式模型文档中，指出了`inline-block`的基线是正常流中最后一个line box的基线，但是，如果这个line box里面没有inline boxes或者其overflow属性值不是visible，那么其基线就是margin bottom的边缘。什么意思呢？我们用一张图片说明一下：

**纠正：图片上面描述文字中的“红色线为设置了middle”改为“黄色线为设置了middle”**

![](<../../assets/line-height 和  vertical-align /line-height与vertical-align的密切关/image/image_Dll_E4Da9h.webp>)

**（2）middle对齐：**指元素的垂直中心**线与父级基线往上二分之一X所在的位置的线对齐。有点绕，看下图：**

![](<../../assets/line-height 和  vertical-align /line-height与vertical-align的密切关/image/image_8eeRwy47gP.webp>)

**（3）文字下沉特性：**文字是具有下沉特性的，就是**文字的垂直中心点在文字所在区域的中线往下沉一点**，不同字体的文字下沉的幅度不同，同时，**文字大小越大，下沉越明显。** 如上图，X的中线点相对白色中线往下沉。

1. **几个现象**

   我们先通过例子来看看几个现象。

```html 
<div class="wrap">
  <img src="xxx.png" />
</div>
<div class="wrap">
  <span></span>
  <span>我有内容</span>
</div>
<div class="wrap" style="height:200px;">
  <img src="xxx.png" class="middle" />
</div>

```


```css 
.wrap {
  background: #249ff1;
}
span {
  display: inline-block;
  width: 100px;
  height: 100px;
  border: 1px solid #f00;
}
img {
  width: 100px;
}
.middle {
  vertical-align: middle;
}
```


以上代码最后结果如下:

![](<../../assets/line-height 和  vertical-align /line-height与vertical-align的密切关/image/image_zSD20PTMLN.webp>)

我们发现，放在div里面的图片，**在底部会多出一点空白间隙**，而第二个例子两个样式一样的span，一个有文字一个没有文字，我们的意愿是想让两个span并排显示，**但结果错位十分严重**。至于第三个例子 **，图片设置了居中对齐，但似乎没有生效**。那究竟空白间隙从何而来？为什么两个span会错位？图片确实是没有居中对齐吗？要解释清楚这个现象，必须弄清楚vertical-align和line-height之间的关系。我们从第一个例子开始，一步一步的分析。

首先，通过前面两个属性的表现特点分析我们知道，**元素默认情况下的对齐方式是基线对齐，即baseline。而在浏览器中，都有默认的字体的大小，这个空隙就是来源于这两个**。为了便于我们观察，我们把wrap的行高设置为一个相对大的值，在这里我们设置为50px。设置后表现如下：

![](<../../assets/line-height 和  vertical-align /line-height与vertical-align的密切关/image/image_14Ub6ks8eM.webp>)

可以看到，此时图片底部的空白间隙变得更大。实际上，在wrap里面虽然只有一个img标签，**但其实存在一个我们看不见的空白节点。这个特殊的空白节点与普通文节点一样，具有文字大小，行高。因此，我们可以利用普通文本来代替这个节点来观察现象。我们在图片的后面输入一串XXX**。如下

![](<../../assets/line-height 和  vertical-align /line-height与vertical-align的密切关/image/image_GXs-brLj8H.webp>)

接着，我们再用一个`inline-block`化的span标签将文字包裹并设置文字背景色。如下：

![](<../../assets/line-height 和  vertical-align /line-height与vertical-align的密切关/image/image_FFvtezZZka.webp>)

经过以上两步改变，我们发现，图片的位置没有发生任何的变化，底部的间隙大小也没有变化。此时，已经足以解释为什么只有一个img标签的情况下，图片底部会出现间隙：**由于空白节点的存在，图片后面相当于跟了一个文本节点。**而默认情况下，**图片的对齐方式是以父级元素的基线对齐**，为了保持与基线对齐，**图片底部必须留出间隙**，**大小为上面提到的半倍文本间距\[即(****`line-height`****-****`font-size`****) / 2]**。而且line-height的值越大，间隙将越大。到此为止，结合我们上面对属性值特点的一些分析，要找到问题的解决办法就变得相当简单了。要去除图片底部的间隙**，只需要将**\*\*`line-height`****和****`vetical-align`\*\***属性的其中一个给干掉就可以了。可以有以下几种方法：**

# 图片底部留有一定间隙

```html 
（1）将图片设置为display:block（ 利用vertical-align的生效前提 ）；

（2）将vertical-align设 置为top，bottom，或者middle等值（利用属性值的表现行为）； 

（3）将line-height设置为0 （利用line-height为0时，基线上移）； 

（ 4）将font-size设置为0 （如果line-height的值为相对值，如1.5）； 

（5）将img设置浮动或者绝对定位（如果布局允许的话）
```


现在，利用第二种方法，将`vertical-align`设置我`bottom`，设置后结果如下：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/2/9/16179f4e44a64e5a~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

# 空白和非空白

第二个例子，由前面的对于`inline-block`基线的定义可知，**对于有内容的inline-block，其基线为最后一行文本基线所在的位置**，**而对于空白的inline-block，其基线为margin bottom边缘所在位置，即底部边缘**。因为默认情况下为基线对齐，这两条基线对齐后就形成了上图那种错位的现象。知道了错位的原因，要解决也方便了。我们仅需将**对齐方式设置为bottom，middle，top等值就可以了。现在设置为middle。** 效果如下：

![](<../../assets/line-height 和  vertical-align /line-height与vertical-align的密切关/image/image_dO_z8dGwlQ.webp>)

# 空白节点不足

至于第三个例子，有点让人摸不着头脑，这也是vertical-align无效被提问的最多的一种现象。按照vertical-align生效个条件可知，给img设置middle对齐后理论上应该是居中对齐才对，但为什么没有起作用呢？是真的没有起作用吗？**答案是：起作用了。实际上，vertical-align:middle是起作用的了**，但至于最后图片为什么没有在父级里面垂直居中 **，是因为后面的空白节点高度不足，导致基线偏上。按照中线的定义，中线也是偏上**。我们可以用一个字母x代替后面的空白节点，来观察现象。

![](<../../assets/line-height 和  vertical-align /line-height与vertical-align的密切关/image/image_e5BikerHlA.webp>)

从图中可以看到，实际上图片与文字确实是垂直居中对齐了。**我们给父级的行高设置为父级的高度，从而使基线往下偏移**。效果如下：

![](<../../assets/line-height 和  vertical-align /line-height与vertical-align的密切关/image/image_J6iyEIt-7I.webp>)

此时，我们可以看到，图片“**近似”垂直居中在了父级元素**。这是因为设置行高后，根据之前分析的`line-height`等于`font-size`+`2倍的文字上下间距`可知，**父级基线往下。中线为基线往上二分之一x高度，此时图片的中线就与后面的x中线点对齐**，实现了近似垂直居中的效果。

# **应用**

利用空白节点这个特性，以及行高和`vertical-align`的关系，我们可以做一些实际的应用。

#### (1)**实现垂直居中**

由于空白节点存在，当我们给外层标签设置一个较高的行高值时，**由于行高的上下间距平分的性质，可以实现近似垂直居中的效**果。此时，也不需要给父级标签设置具体的高度值（因为line-height会撑开父级）。

```html 
<div class="wrap">
  <img src="./images/xx.png" class="middle"/>
</div>


.wrap {
  background: #249ff1;
  margin: 10px;
}
.wrap1 {
  line-height: 200px;
  text-align: center;
}
.middle {
  vertical-align:  middle;
}


```


![](<../../assets/line-height 和  vertical-align /line-height与vertical-align的密切关/image/image_tTa9OfijA0.webp>)

#### (2)**任意父级高度的垂直居中**

在上面的提到的三种现象中，第三个例子，我们给父级设置line-height的值等于height的值，实现了近似垂直居中的效果。那如果父级的高度是随着内容的变化而变化的怎么办？此时无法给父级设置一个特定的值，也不能使用百分**比，因为line-height是根据字体的大小来计算**的。换个角度想，空白节点我们看不见，但是如果可以给它设置一个高度，让它与父级高度一致，就解决了这个问题。怎么给高度呢？**答案是借助辅助元素，我们可以在父级最后面增加一个inline-block化的span标签,高度为100%，font-size为0，接着让居中的元素居中对齐即可。**

```html 
<div class="wrap" style="height:200px;text-align:center;">
  <img src="../../images/zhuyin.png" alt="" class="middle">
  <span style=" display:inline-block;height:100%;vertical-align:middle;font-size:0; "></span>
</div>


```


![](<../../assets/line-height 和  vertical-align /line-height与vertical-align的密切关/image/image_eHngnRbHP0.webp>)

**当然，这个span标签也可以通过伪元素的来实现**

(3)**实现多图列表的两端对齐**

在做类似商品列表的布局时，我们时常需要每一行列表的实现两端对齐。实现的方法有很多，这里我们用`display:inline-block`+`辅助元素`来实现。如下：

```html 
<ul>
  <li><img src="../../images/zhuyin.png"></li>
  <li><img src="../../images/zhuyin.png"></li>
  <li><img src="../../images/zhuyin.png"></li>
  <li><img src="../../images/zhuyin.png"></li>
  <li><img src="../../images/zhuyin.png"></li>
  <li><img src="../../images/zhuyin.png"></li>
  <li><img src="../../images/zhuyin.png"></li>
  <span class="fix"></span>
  <span class="fix"></span>
  <span class="fix"></span>
</ul>

```


```css 
请提供一段文本让我继续。
```


![](<../../assets/line-height 和  vertical-align /line-height与vertical-align的密切关/image/image_osxhmE5SLi.webp>)

每个图片的下方会有一个空白，前面已经解释过空白的来源，我们给ul设置line-height:0即可解决。效果如下：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/2/9/16179fa10e13ed90~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

去除了空白后，发现在最后一个图片的底部也有一个相对较大的空白，为什么呢？来源于哪里？为了方便观察，我们给每一个span.fix增加一个边框，并在最后一个span.fix增加几个字母。结果如下：

![](<../../assets/line-height 和  vertical-align /line-height与vertical-align的密切关/image/image_p0aMMqb8Ln.webp>)

从结果可以知道，最后一个span与文字节点的基线对齐。还记得前面说过的两个inline-block排列错位的例子吗？这就是和那个是一样的道理。**由于前面一个span是没有inline boxes的节点，那么它的基线就是元素底部，加上默认情况下是基线对齐，从而空白的span将往下掉**。那怎么办呢？一种方法改变基线的位置，另一种方法是改变对齐的方式。改变基线的方式就是在空白的span里面加入内容，如空格。我们把xxxx挪到span里面，结果如下：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/2/9/16179fae18e17364~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

发现此时，空白奇迹般的不见了。**原因正是我们改变了基线的位置。同时由于设置了line-height为0，所以就对齐了。另一种方法是改变对齐的方式，我们设置为top，并去除所有的辅助线和字符**，结果如下：

![](<../../assets/line-height 和  vertical-align /line-height与vertical-align的密切关/image/image_gnZpmqLSgq.webp>)

到此，完成了我们的应用。

1. **为什么是近似垂直居中**

前面我们多次提到“**近似垂直居中**”这个词。为什么是近似，而不是绝对呢？问题还得回到这张图。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/2/9/16179fb93a9ff285~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

当设置元素的对齐方式为middle时，指的是：**元素的垂直中心线与父级元素基线的位置往上二分之一x高度所在线对齐**。换句话说，**就是图中的黄色线与红色字母x的中心处对齐。但是文字具有下沉特**性，**原本x的中心点应该与图中的白色线对齐，但是文字的下沉特性使字母往下掉了一点**。从而导致黄色线无法绝对与白色线对齐。这个下沉的大小与文字的大小和字体有关。当文字大小足够小时，我们可以忽略，近似的，白色线就与黄色线对齐，实现居中效果。但是文字大小很大时，就不能很好的实现了。我们还是以上面的例子：
