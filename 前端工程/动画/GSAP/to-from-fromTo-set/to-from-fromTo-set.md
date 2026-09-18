# to/from/fromTo/set

## 目录

- [gsap.to(targets, vars)](#gsaptotargets-vars)
- [gsap.from(targets, vars)](#gsapfromtargets-vars)
- [gsap.fromTo(targets, vars, vars)](#gsapfromTotargets-vars-vars)
- [gsap.set](#gsapset)
- [targets](#targets)

#### [gsap.to](http://gsap.to "gsap.to")(targets, [vars](https://so.csdn.net/so/search?q=vars\&spm=1001.2101.3001.7020 "vars"))

产生从初始位置（或状态）到目标位置（或状态）的动画 &#x20;

- targets： 产生动画的对象 &#x20;
- vars： 目标状态参数 &#x20;

例子： &#x20;
该动画从当前的位置移动到100的位置

```javascript 
gsap.to("div", {
  duration: 5,
  x: 100
});
```


#### gsap.from(targets, vars)

产生从设置位置（或状态）到初始位置（或状态）的动画 &#x20;

- targets： 产生动画的对象 &#x20;
- vars： 设置状态参数 &#x20;

例子： &#x20;
该动画从100的位置移动到初始位置

```javascript 
gsap.from("div", {
  duration: 5,
  x: 100
});
```


#### gsap.fromTo(targets, vars, vars)

产生从开始位置（或状态）到结束位置（或状态）的动画 &#x20;

- targets： 产生动画的对象 &#x20;
- vars（第1个）： 开始状态参数 &#x20;
- vars(第2个)： 结束状态参数 &#x20;

例子： &#x20;
该动画从100的位置移动到300的位置

```javascript 
gsap.fromTo("div", {
  x: 100
},{
  duration: 5,
  x: 300
});
```


# gsap.set

gsap.set：立即设置属性，没有动画效果。

# targets

设置动画的对象，可以是“.class”、“id”等选择器文本（GSAP内使用`document.querySelectorAll()`, 具体可参考该用法），也可以是对**元素、**[**泛型**](https://so.csdn.net/so/search?q=泛型\&spm=1001.2101.3001.7020 "泛型")**对象甚至对象数组。**

vars &#x20;
包含要设置动画的所有属性/值的对象，以及任何特殊属性，如ease、duration、delay或onComplete（如下所列）。
