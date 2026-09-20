# tween.js

## 目录

- [介绍](#介绍)
- [usage](#usage)
- [example](#example)

[ npm: @tweenjs/tween.js Super simple, fast and easy to use tweening engine which incorporates optimised Robert Penner's equations.. Latest version: 18.6.4, last published: 2 years ago. Start using @tweenjs/tween.js in your p https://www.npmjs.com/package/@tweenjs/tween.js](https://www.npmjs.com/package/@tweenjs/tween.js " npm: @tweenjs/tween.js Super simple, fast and easy to use tweening engine which incorporates optimised Robert Penner's equations.. Latest version: 18.6.4, last published: 2 years ago. Start using @tweenjs/tween.js in your p https://www.npmjs.com/package/@tweenjs/tween.js")

参考：

[ tween.js简介\_淡定九号的博客-CSDN博客\_tween.js tweenjs 动画 https://blog.csdn.net/yr1102358773/article/details/128083444](https://blog.csdn.net/yr1102358773/article/details/128083444 " tween.js简介_淡定九号的博客-CSDN博客_tween.js tweenjs 动画 https://blog.csdn.net/yr1102358773/article/details/128083444")

# 介绍

&#x20;      **tween.js是一款可生成平滑动画效果的js动画库。压缩后代码 只有 4kb 恐怖的性能**

&#x20;      tweenjs对于js动画简直是一个神器(比如threejs的粒子动画借助它来实现，平时的canvas动画，js2D动画都比较实用)，本文不会涉及比较深入的tweenjs用法，但你可以花5分钟就掌握它的最常用的基础用法，最后有兴趣的同学可以看一下tweenjs的基本原理。

```typescript 
var position = { x: 100, y: 0 }
如果你想改变 x 的值从100到200，你只需要这样做：
var tween = new TWEEN.Tween(position);
tween.to({ x: 200 }, 1000);
到这里 只是创建了tween对象， 你需要激活它，让它开始动画：tween.start();
```


```typescript 
update 
Tween.js本身不会运行，你需要通过update方法明确的告诉它什么时候开始运行。推荐在动画主循环中使用该方法。你可以通过调用requestAnimationFrame方法来获得良好的图像性能。
animate();
function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();
}
```


```typescript 
这个动作将会更新所有被激活的tweens，在1秒钟（例如1000ms）position.x 将变为200。
你也可以 使用onUpdate回调函数将结果打印 到控制台上。
tween.onUpdate(function() {
    console.log(this.x);
    div.style.left = position.x +'px'
}); 
这个函数在每次tweens被更新时都被调 用。它的出现频次依赖于很多因素-例如：依赖于你的电脑或设备的运行速度。
```


```typescript 
start和stop
 Tween.start和Tween.stop分别用于控制tween动画的开始和结束。
对于已经结束和没有开始的动画，Tween.stop方法不起作用。Tween.start方法同样接收一个时间参数。如果你使用了该参数，tween动画将在延时该时间数
后才开始动画。否则它将立刻开始动画。
```


```typescript 
chain 
如果你想制作多个多行，例如：一个动画在另一个动画结束后开始。可以通过chain方法来使实现。如下的代码，tweenB 在 tweenA 之后开始动画:
tweenA.chain(tweenB);
可以像下面这样制作一个无限循环的动画
tweenA.chain(tweenB);
tweenB.chain(tweenA);
```


```typescript 
repeat
 如果你想制作循环动画可以使用chain来实现，但是更好的方法是使用repeat方法。它接收一个用于描述你想循环多少次的参数：
tween.repeat(10); // repeats 10 times and stops
tween.repeat(Infinity); // repeats forever
```


```typescript 
yoyo
 这个函数只在你使用repeat方法是起作用。当它被激活时，tween 的效果类似yoyo效果。该效果是动画会在开始或结束处向反方向反弹。
```


```typescript 
delay
 delay方法用于控制动画之间的延时。
tween.delay(1000);
tween.start();
```


```typescript 
全局方法
以下的方法定义在 TWEEN 的全局对象中，其中大多数方法你都用不上，除了update方法：
TWEEN.update(time)
该方法用于 所有被激活的tweens ，如果time没有被指定，将使用当前时间。
TWEEN.getAll 和 TWEEN.removeAll
这两个方法用于 胡获取被激活的tweens数组的一个引用，或从数组中删除所有tweens 。
TWEEN.add(tween) 和 TWEEN.remove(tween)
用于向被 激活的tweens中添加一个tween，或移除一个tween。 
以上方法通常只是在内部使用，一般情况下你了解即可。
可用的easing函数： TWEEN.Easing 
tween.js提供了一些可用的easing函数。可用函数有：Linear, Quadratic, Cubic, Quartic, Quintic, Sinusoidal, Exponential, Circular, Elastic, Back 和 Bounce。easing 类型分为: In, Out 和 InOut.

使用自定义的Easing函数
你不但可以使用tween.js提供的easing函数，还可以自定义easing函数。但必须遵守下面的规则：
* 它必须接收一个参数。
* 它必须基于输入参数返回一个值。
easing函数仅在每个tween每次被更新时调用，而不管有多少属性被改变。结果随后会被用于初始值：
下面是一个使用Math.floor来做easing效果的例子：
function tenStepEasing(k) {
    return Math.floor(k * 10) / 10;
}
tween.easing(tenStepEasing);

回调函数
另外一个有用的特性是你可以在每次tween循环周期的指定时间点调用自定义的函数。
例如：假设你想使一些不能直接修改参数的对象执行动画，要访问该对象的参数只能通过setter方法，你可以通过update方法的回调函数来设置新的setter值。
var trickyObjTween = new TWEEN.Tween({
    propertyA: trickyObj.getPropertyA(),
    propertyB: trickyObj.getPropertyB()
})
    .to({ propertyA: 100, propertyB: 200 })
    .onUpdate(function() {
        this.setA( this.propertyA );
        this.setB( this.propertyB );
    });

var tween = new TWEEN.Tween(obj)
    .to({ x: 100 })
    .onStart(function() {
        this.x = 0;
    });
 onStart 
 tween开始动画前的回调函数。 
 onStop 
 tween结束动画后的回调函数。 
 onUpdate 
 在tween每次被更新后执行。 
 onComplete 
 在tween动画全部结束后执行。
```


```typescript 
var Tween = {
    Linear: function(t,b,c,d){ return c*t/d + b; },
    Quad: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t + b;
        },
        easeOut: function(t,b,c,d){
            return -c *(t/=d)*(t-2) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t + b;
            return -c/2 * ((--t)*(t-2) - 1) + b;
        }
    },
    Cubic: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t*t + b;
        },
        easeOut: function(t,b,c,d){
            return c*((t=t/d-1)*t*t + 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t*t + b;
            return c/2*((t-=2)*t*t + 2) + b;
        }
    },
    Quart: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t*t*t + b;
        },
        easeOut: function(t,b,c,d){
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        }
    },
    Quint: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t*t*t*t + b;
        },
        easeOut: function(t,b,c,d){
            return c*((t=t/d-1)*t*t*t*t + 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
            return c/2*((t-=2)*t*t*t*t + 2) + b;
        }
    },
    Sine: {
        easeIn: function(t,b,c,d){
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        },
        easeOut: function(t,b,c,d){
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        },
        easeInOut: function(t,b,c,d){
            return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
        }
    },
    Expo: {
        easeIn: function(t,b,c,d){
            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
        },
        easeOut: function(t,b,c,d){
            return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if (t==0) return b;
            if (t==d) return b+c;
            if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
            return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    },
    Circ: {
        easeIn: function(t,b,c,d){
            return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
        },
        easeOut: function(t,b,c,d){
            return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
            return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
        }
    },
    Elastic: {
        easeIn: function(t,b,c,d,a,p){
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        },
        easeOut: function(t,b,c,d,a,p){
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
        },
        easeInOut: function(t,b,c,d,a,p){
            if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
            if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
        }
    },
    Back: {
        easeIn: function(t,b,c,d,s){
            if (s == undefined) s = 1.70158;
            return c*(t/=d)*t*((s+1)*t - s) + b;
        },
        easeOut: function(t,b,c,d,s){
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },
        easeInOut: function(t,b,c,d,s){
            if (s == undefined) s = 1.70158;
            if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        }
    },
    Bounce: {
        easeIn: function(t,b,c,d){
            return c - Tween.Bounce.easeOut(d-t, 0, c, d) + b;
        },
        easeOut: function(t,b,c,d){
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
            } else {
                return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
            }
        },
        easeInOut: function(t,b,c,d){
            if (t < d/2) return Tween.Bounce.easeIn(t*2, 0, c, d) * .5 + b;
            else return Tween.Bounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
        }
    }
}

x
```


# usage

- **t:当前时间  递增的**
- **b:初始值**
- **c:增量值     目标**
- \*\*d：持续时间 \*\*  &#x20;

**下面就介绍如何使用这个Tween了，** ​**首先b、c、d三个参数（即初始值，变化量，持续时间）在缓动开始前，是需要先确定好的。**

举一个简单的例子，一个div要向右缓动，left初始值是50，那么b就是50，要向右移动100，那c就是100，如果知道的是目标值，例如要向右移动到150，那就把目标值150减初始值b就是变化量c了。

# example

[scroll.html](./assets/file/scroll_iBVt71Ts0f.html "scroll.html")

[Tween.html](./assets/file/Tween_4JNkfEZIbF.html "Tween.html")

[test.html](./assets/file/test_87UeW_nWPU.html "test.html")

[testLib.rar](./assets/file/testLib_14Qxxd-zhs.rar "testLib.rar")

[marquee.html](./assets/file/marquee_V5TAMtS4ql.html "marquee.html")

[index4.html](./assets/file/index4_Ln1p8PvEML.html "index4.html")

[index2.html](./assets/file/index2_MGJ0X4JNmT.html "index2.html")

[vue + tweenjs.html](<./assets/file/vue + tweenjs_beer51e6Us.html> "vue + tweenjs.html")
