# 父元素属性

## 目录

- [flex-direction属性：决定主轴的方向（即项目的排列方向）](#flex-direction属性决定主轴的方向即项目的排列方向)
- [flex-wrap属性：定义换行情况](#flex-wrap属性定义换行情况)
- [flex-flow属性：flex-direction和flex-wrap的简写，默认row nowrap](#flex-flow属性flex-direction和flex-wrap的简写默认row-nowrap)
- [justify-content属性：定义项目在主轴上的对齐方式。](#justify-content属性定义项目在主轴上的对齐方式)
- [align-items属性：定义在交叉轴上的对齐方式](#align-items属性定义在交叉轴上的对齐方式)
- [align-content属性：定义多根轴线的对齐方式](#align-content属性定义多根轴线的对齐方式)

设置在容器上的属性有6种。

- flex-direction
- flex-wrap
- flex-flow
- justify-content
- align-item
- align-content

#### **flex-direction属性：决定主轴的方向（即项目的排列方向）**

```javascript 
.box{
   flex-direction: row | row-reverse | column | column-reverse;
}
```


- row（默认）：主轴水平方向，起点在左端；
- row-reverse：主轴水平方向，起点在右端；
- column：主轴垂直方向，起点在上边沿；
- column-reserve：主轴垂直方向，起点在下边沿。

![  ](./image/1679823-a91b68309c12e105_z6JNk9edkj.png "  ")

主轴的4个方向

#### **flex-wrap属性：定义换行情况**

默认情况下，项目都排列在一条轴线上，但有可能一条轴线排不下。

![  ](./image/1679823-68d21ca039ba28db_-p0023J14R.png "  ")

一条轴线排不下

```javascript 
.box{
   flex-wrap: nowrap | wrap | wrap-reverse;
}
```


- nowrap（默认）：不换行；
   

![  ](./image/1679823-c51dd7b251cdddec_lwLgHSOlmj.png "  ")

- 不换行nowrap
- wrap：换行，第一行在上方；
   

![  ](./image/1679823-fd48f147e6dc7ac6_BgLCCtMt-E.png "  ")

- 换行，第一行在上
- wrap-reverse：换行，第一行在下方。
   

![  ](./image/1679823-77847157380e23e4_AOa4tNNZgG.png "  ")

- 换行，第一行在下

#### **flex-flow属性：flex-direction和flex-wrap的简写，默认row nowrap**

```javascript 
.box{
    flex-flow: <flex-direction> || <flex-wrap>;
}
```


#### **justify-content属性：定义项目在主轴上的对齐方式。**

对齐方式与轴的方向有关，本文中假设主轴从左到右。

```javascript 
.box {
    justify-content:start|end|flex-start| flex-end|center| left |right| space-between |space-around| space-evenly |stretch| safe |unsafe
| baseline |first baseline| last baseline;
}
```


- flex-start（默认值）：左对齐；

![  ](./image/1679823-c6c33e14817aaeb7_umRHmyr2r_.png "  ")

- 左对齐
   
- flex-end：右对齐；

![  ](./image/1679823-958fc54a2805ae83_mlgL5Pb4yP.png "  ")

- 右对齐
   
- center：居中；

![  ](./image/1679823-0e4934ebf5828c81_ygDxa7TRPg.png "  ")

居中对齐

- space-between：两端对齐，项目之间间隔相等；

![  ](./image/1679823-e3dda677d9efc9dd_OQjdGF_yAe.png "  ")

两端对齐

- space-around：每个项目两侧的间隔相等，即项目之间的间隔比项目与边框的间隔大一倍。

![  ](./image/1679823-4e4c94cfab42cebd_QrVry-Tl3S.png "  ")

两侧间隔相等

#### **align-items属性：定义在交叉轴上的对齐方式**

对齐方式与交叉轴的方向有关，假设交叉轴从下到上。

```javascript 
.box{
    align-items: flex-start | flex-end | center | baseline | stretch;
}
```


- flex-start：起点对齐；

![  ](./image/1679823-794781b09ba1222b_rt4KO9YXPQ.png "  ")

起点对齐

- flex-end：终点对齐；

![  ](./image/1679823-eadf0e3c23e5f6ff_E-6s-GP73_.png "  ")

终点对齐

- center：中点对齐；

![  ](./image/1679823-70da312a8c49de64_ruIFw5ddXe.png "  ")

中点对齐

- baseline：项目的第一行文字的基线对齐；

![  ](./image/1679823-7add48ac84c6d397_OKKdzkKU1N.png "  ")

基线对齐

- stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

![  ](./image/1679823-9711dc77e87507b5_5gezdECDgY.png "  ")

#### **align-content属性：定义多根轴线的对齐方式**

如果项目只有一根轴线，该属性不起作用。

所以，容器必须设置flex-wrap：···；

```javascript 
.box{

    align-content: flex-start | flex-end | center | space-between | space-around | stretch;

}
```


- flex-start：与交叉轴的起点对齐；

![  ](./image/1679823-3d8d3dd45d5a0dad_MEXAe2CmPR.png "  ")

起点对齐

- flex-end：与交叉轴的终点对齐；

![  ](./image/1679823-5f155d8e95a419fe_iOY7FvVfce.png "  ")

终点对齐

- center：与交叉轴的中点对齐；

![  ](./image/1679823-b1a3ed27fe64e88d_RrrBZMVRBb.png "  ")

中点对齐

- space-between：与交叉轴的两端对齐，轴线之间的间隔平均分布；

![  ](./image/1679823-b013b001bff86782_cxBnmsPgIr.png "  ")

轴线之间等间距

- space-around：每根轴线两侧的间隔相等，即轴线之间的间隔比轴线与边框的间隔大一倍；

![  ](./image/1679823-3dd9a6ed68b35b72_eOSVtJFBEC.png "  ")

轴线两侧等间距

- stretch（默认值）：轴线占满整个交叉轴。

![  ](./image/1679823-11a08044da41b365_DHb1VtTwzi.png "  ")

项目未设置高度时

有意思的是，当你**不给项目设置高度但是给容器设置align-content不为stretch时，同一轴线上的项目的高度将等于项目中高度最高的项目。**

![  ](./image/1679823-57180f41a0e740bf_WlW3CnLuTa.png "  ")
