# background-origin/clip

## 目录

- [background-origin](#background-origin)
- [background-clip](#background-clip)
- [background-clip的text值的使用（webkit的专属属性）](#background-clip的text值的使用webkit的专属属性)

### background-origin

**只针对图片的起点**:background-origin:border-box/padding-box/content-box

- border-box: 左上角在border 里面 border 把图片盖住了一部分；
- padding-box: 无视padding的大小
- content-box:  把pading的距离留出来

&#x20;**可以总结为: 起点-box**

先来看引用图片背景，其他背景属性都为默认值时的效果：

![](./image/image_zMSfjfWUE6.png)

从效果图上可以看到背景图片的**起始位置是pading区域**，但是border的top边框和left边框被反向填充了，这是由repead的重复填充形成的效果。因为repeat的默认值是repeat。`background-origin`的默认值是：`padding-box`;而background-clip的默认值是border-box;但是border-right和border-bottom的区域是由内区域延申填充。

```css 
/* background的默认属性 */
background-origin: padding-box;
background-clip: border-box;
background-repeat: repeat;

```


### background-clip

**只针对图片结束位置**:background-clip :border-box/padding-box/content-box

**可以总结为: 终点-box**

接着将background-clip(背景图片结束位置)设置为padding-box:

![](./image/image_F8c52cEM4v.png)

当`background-origin`和`background-clip`的值都为`padding-box`时，`border`上就**都没有了背景图片**。

继续来看结束位置的变化影响，**当起始位置为padding-box，而结束位置为content-box时的效果图：**

![](./image/image_QMjMVwe875.png)

由此可见`background-origin`的**起始位置实质上**是为`background-position`**设定参考位置**，而background-clip是设定**实质可见背景区域(向外的部分被修剪)。**

```css 
background-origin: padding-box;
background-clip: content-box;
background-repeat: repeat;

```


### background-clip的text值的使用（webkit的专属属性）

- background-clip的text表示使用文本裁剪图片，文字最终以裁剪的图片内容填充，

  ![](./image/image_D1sGDnaZGk.png)

```typescript 
div{
    position: absolute;
    top: calc(50% - 50px);
    left: calc(50% - 50px);
    width: 600px;
    font-size: 100px;
    font-weight: 600;
        /* 实现效果的关键样式代码 */
    background-image: url('image/pic7.jpeg');
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;
    background-position: 0 0; /* 背景初始位置在0*0 */

    /*定义一个动画效果*/
    transition: all 0.6s;
}
div:hover{
    background-position: center center;/*鼠标进入背景横向纵向居中*/
}

```


[字体颜色渐变](./字体颜色渐变/index.md "字体颜色渐变")

[苹果官网滚动文字特效实现](./苹果官网滚动文字特效实现/index.md "苹果官网滚动文字特效实现")
