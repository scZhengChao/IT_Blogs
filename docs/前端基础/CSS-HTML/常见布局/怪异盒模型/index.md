# 怪异盒模型

## 目录

- [W3C的标准盒模型（标准盒模型](#W3C的标准盒模型标准盒模型)
- [IE盒模型 （怪异盒模型）](#IE盒模型-怪异盒模型)
- [box-sizing的使用](#box-sizing的使用)

CSS盒模型本质上是一个盒子，封装周围的HTML元素，它包括：外边距（`margin`）、边框（`border`）、内边距（`padding`）、实际内容（`content`）四个属性。

盒模型允许我们在**其它元素和周围元素边框之间的空间放置元素**。

#### W3C的标准盒模型（标准盒模型

![](./image/image_Cw6u8cGorL.png)

#### IE盒模型 （怪异盒模型）

![](./image/image_z_CBJU_5Mu.png)

#### box-sizing的使用

如果想要切换盒模型也很简单，这里需要借助[css3](https://so.csdn.net/so/search?q=css3\&spm=1001.2101.3001.7020 "css3")的`box-sizing`属性

```nginx 
  box-sizing: content-box /**是W3C盒子模型 */
  box-sizing: border-box /*是IE盒子模型*/

```


> **默认的是**\*\*`content-box`；标准盒模型\*\*​
