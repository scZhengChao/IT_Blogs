# flex

## 目录

- [flex:1](#flex1)
  - [使用场景](#使用场景)
- [flex:auto](#flexauto)
  - [使用场景](#使用场景)
- [flex:0](#flex0)
  - [使用场景](#使用场景)
- [flex:none](#flexnone)
- [总结](#总结)

* [flex-grow](https://so.csdn.net/so/search?q=flex-grow\&spm=1001.2101.3001.7020 "flex-grow") :定义项目的放大比例，默认为`0`
* flex-shrink :定义项目的缩小比例,默认为 `1`
* flex-basis :定义项目在分配多余的空间之前，项目占据的主轴空间 默认为`auto`（item本来大小） 在了解了flex的基本值之后，我们会用一些用例来实验一下(没有特殊声明的话，用例代码都是以下的结构)

```html 
<div class="wrapper ">
    <item class="inner">一一一一一一一一一一一一一一一一</item>
    <item class="inner">二二</item>
    <item class="inner">三三</item>
    <item class="inner">四四四四四四四四四四四四四四四四</item>
  </div>
```


### flex:1

`flex:1` = `flex: 1 1 0%;`

flex:1在父元素尺寸不足的时候，会**优先最小化内容尺寸**。

下面我们给用例设置样式看下这句话是什么意思

```javascript 
.wrapper{
    margin: 0 auto;
    width: 560px;
    height: 40px;
    border: black 1px solid;
    display: flex;
  }
  .wrapper > .inner{
    border: chartreuse 1px solid;
    flex:1;
  }
```


![](./image/image_CtCRhb9Cx1.png)

从例子我们可以看出 flex:1 ，在充分分配容器尺寸的前提下，会优先`牺牲自己`,填充父容器的尺寸

#### 使用场景

当我们希望元素可以**充分的利用剩余的空间，同时不会很多的占用其他同级元素的空间**的时候使用。

- 等分布局
- 等比例列表

### flex:auto

`flex:auto` = `flex: 1 1 auto;`

flex:auto在父元素尺寸不足的时候，会优先最大化内容尺寸。

```css 
.wrapper{
    margin: 0 auto;
    width: 560px;
    height: 40px;
    border: black 1px solid;
    display: flex;
  }
  .wrapper > .inner{
    border: chartreuse 1px solid;
    flex:auto;
  }
```


![](./image/image_Hg_FM4T6zZ.png)

从例子我们可以看出 flex:auto ，在充分分配容器尺寸的前提下，会优先`扩展自己`,填充父容器的尺寸

#### 使用场景

当我们希望元素**充分的使用剩余的空间，各自元素按照各自内容进行分配**的时候使用

- 内容动态适配布局
- 自适应布局
- 子元素个数不确定时

### flex:0

`flex:0` = `flex: 0 1 0%;`

flex:0 :通常表现为`内容最小化宽度`

```css 
.wrapper{
    margin: 0 auto;
    width: 560px;
    height: 40px;
    border: black 1px solid;
    display: flex;
    
  }
  .wrapper > .inner{
    border: chartreuse 1px solid;
    flex:0;
  }
```


![](./image/image_2prObpf-Oi.png)

从以上的例子可以看出:flex:0的时候元素的内容`宽度`最小化，并没有充分的分配容器的尺寸。

#### 使用场景

当希望元素item占用最小化的内容宽度的时候

### flex:none

`flex:none` = `flex:0 0 auto;`

flex:none;表示元素的大小由内容决定，但是flex-grow，flex-shrink都是0，元素没有弹性，通常表现为`内容最大化宽度`

```css 
.wrapper{
    margin: 0 auto;
    width: 560px;
    height: 40px;
    border: black 1px solid;
    display: flex;
    
  }
  .wrapper > .inner{
    border: chartreuse 1px solid;
    flex:none;
  }
```


![](./image/image_OI4n_GpCY6.png)

从以上的例子可以看出:flex:none的时候元素的内容直接溢出容器，没有换行，表现为`最大内容宽度`

### 总结

- flex:1 & flex:auto 的区别主要体现在 =>在充分分配父元素宽度的情况下，子元素是优先扩展（auto）自己的尺寸还是优先减小（1）自己的尺寸
- flex:0 & flex: none 的区别主要体现在 =>不考略父元素宽度的情况下，最大化内容宽度（none）还是最小化内容宽度（0）
- 对于不同的使用场景，我们应该使用不同的flex。比如flex：1多用于等分布局中，flex：auto多用于内容动态适配中，flex：none多用于元素内容最大化处理 参考：
