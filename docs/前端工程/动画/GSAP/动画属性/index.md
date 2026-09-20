# 动画属性

## 目录

- [特殊属性](#特殊属性)

`GSAP`可以**动画任何属性**，没有**确定的列表**，**包括CSS属性**、**自定义对象属性**甚至**CSS变量和复杂的字符串，**最常见的动画属性是`transforms`和透明度。`transforms`属性**是动画中性能消耗最小的**，可以用它来移动元素、旋转或者放大缩小，**因为他们不会影响页面的布局，更不会使页面重排，因此有着较好的性能表现。**

> 尽可能的使用transforms，而不是布局属性，例如top、left或者margin，有更平滑的动画体验。

我们可能比较熟悉以下的transforms属性：

```css 
transform: rotate(360deg) translateX(10px) translateY(50%);

```


　　GSAP提供了下面的缩写形式，上面的transforms属性可以直接缩写成下面的属性（yPercent表示百分比元素的高度）：

```json 
{ rotation: 360, x: 10, yPercent: 50 }

```


> GSAP支持CSS**属性转为小驼峰**形式，例如`background-color`变成`backgroundColor`

通过上面的例子我们也发现了，默认情况下GSAP会给transform属性使用px和degrees单位，比如`{x: 10, rotation: 360}`就表示x轴10px，旋转360度；但是我们有时候想要使用其他的单位，比如vw，radians或者相对单位。

```javascript 
x: 200, // 默认px
x: "+=200" // 相对值
x: '40vw', // 视窗单位
x: () => window.innerWidth / 2, // 函数计算
  
rotation: 360 // 默认角度
rotation: "1.25rad" // 使用弧度单位

```


&#x20;GSAP的神奇之处在于，不仅能够对dom元素动画，还能够**对非dom元素，比如svg、js对象**等进行动画操作；对于svg元素，我们添加`attr属性`额外的处理一些svg的属性，像width、height、fill、stroke、opacity等。

```javascript 
gsap.to(".svgBox", {
  duration: 2,
  x: 100,
  xPercent: -100,
  // svg属性
  attr: {
    fill: "#8d3dae",
    rx: 50,
  },
});

```


查看[demo8效果](https://link.juejin.cn/?target=https://gallery.xieyufei.com/case/gsap/demo#demo8 "demo8效果")

甚至，我们对**js对象进行动画**时，不需要任何dom元素，针对任意js对象的任意属性进行动画，onUpdate函数用于监听动画的更新过程：

```typescript 
let obj = { myNum: 10, myColor: "red" };
gsap.to(obj, {
  myNum: 200,
  myColor: "blue",
  onUpdate: () => console.log(obj.myNum, obj.myColor)
});

```


## 特殊属性

特殊属性用来调整动画的表现形式，我们在上面用到了repeat和duration，下面的文档中提供了一些常用的属性：

| 属性名        | 描述                                         |
| ---------- | ------------------------------------------ |
| duration   | 动画的持续时间（单位：秒）默认0.5秒                        |
| delay      | 动画延迟时间                                     |
| repeat     | 动画重复的次数                                    |
| yoyo       | 布尔值，如果为true，每次其他动画就会往相反方向运动（像yoyo球）默认false |
| stagger    | 每个目标动画开始之间的时间（秒）                           |
| ease       | 控制动画期间的变化率，默认"power1.out"                  |
| onComplete | 动画完成时的回调函数                                 |
