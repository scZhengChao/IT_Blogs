# 进入/离开 & 列表过渡 — Vue.js

## 目录

- [进入/离开 & 列表过渡](#进入离开--列表过渡)
  - [概述](#概述)
  - [单元素/组件的过渡](#单元素组件的过渡)
    - [#过渡的类名](#过渡的类名)
    - [#CSS 过渡](#CSS-过渡)
    - [#CSS 动画](#CSS-动画)
    - [#自定义过渡的类名](#自定义过渡的类名)
    - [#同时使用过渡和动画](#同时使用过渡和动画)
    - [#显性的过渡持续时间](#显性的过渡持续时间)
    - [#JavaScript 钩子](#JavaScript-钩子)
  - [初始渲染的过渡](#初始渲染的过渡)
  - [多个元素的过渡](#多个元素的过渡)
    - [#过渡模式](#过渡模式)
  - [多个组件的过渡](#多个组件的过渡)
  - [列表过渡](#列表过渡)
    - [#列表的进入/离开过渡](#列表的进入离开过渡)
    - [#列表的排序过渡](#列表的排序过渡)
    - [#列表的交错过渡](#列表的交错过渡)
  - [可复用的过渡](#可复用的过渡)
  - [动态过渡](#动态过渡)

# 进入/离开 & 列表过渡

[TPshop](http://www.tp-shop.cn/index.php?http_referer=vuejs "TPshop")

[中国免费商城系统 - 搜豹商城系统 - 免费50小时 Vue 视频教程](http://www.tp-shop.cn/index.php?http_referer=vuejs "中国免费商城系统 - 搜豹商城系统 - 免费50小时 Vue 视频教程")

[立即查看 >](http://www.tp-shop.cn/index.php?http_referer=vuejs "立即查看 >")

广告

## [概述](https://cn.vuejs.org/v2/guide/transitions.html#%E6%A6%82%E8%BF%B0 "概述")

Vue 在插入、更新或者移除 DOM 时，提供多种不同方式的应用过渡效果。包括以下工具：

- 在 CSS 过渡和动画中自动应用 class
- 可以配合使用第三方 CSS 动画库，如 Animate.css
- 在过渡钩子函数中使用 JavaScript 直接操作 DOM
- 可以配合使用第三方 JavaScript 动画库，如 Velocity.js

在这里，我们只会讲到进入、离开和列表的过渡，你也可以看下一节的

[管理过渡状态](https://cn.vuejs.org/v2/guide/transitioning-state.html "管理过渡状态")

。

## [单元素/组件的过渡](https://cn.vuejs.org/v2/guide/transitions.html#%E5%8D%95%E5%85%83%E7%B4%A0-%E7%BB%84%E4%BB%B6%E7%9A%84%E8%BF%87%E6%B8%A1 "单元素/组件的过渡")

Vue 提供了&#x20;

transition

&#x20;的封装组件，在下列情形中，可以给任何元素和组件添加进入/离开过渡

- 条件渲染 (使用 v-if)
- 条件展示 (使用 v-show)
- 动态组件
- 组件根节点

这里是一个典型的例子：

```纯文本 
 HTML < div   id = "demo" > 
   < button   v-on:click = "show = !show" > 
    Toggle
   </ button > 
   < transition   name = "fade" > 
     < p   v-if = "show" > hello </ p > 
   </ transition > </ div >
```


```纯文本 
 JS new  Vue({
   el :  '#demo' ,
   data : {
     show :  true 
  }
})
```


```纯文本 
 CSS .fade-enter-active ,  .fade-leave-active  {
   transition : opacity . 5s ;
}
 .fade-enter ,  .fade-leave-to   /* .fade-leave-active below version 2.1.8 */  {
   opacity :  0 ;
}
```


hello

当插入或删除包含在&#x20;

transition

&#x20;组件中的元素时，Vue 将会做以下处理：

1. 自动嗅探目标元素是否应用了 CSS 过渡或动画，如果是，在恰当的时机添加/删除 CSS 类名。
2. 如果过渡组件提供了 [JavaScript 钩子函数](https://cn.vuejs.org/v2/guide/transitions.html#JavaScript-%E9%92%A9%E5%AD%90 "JavaScript 钩子函数")，这些钩子函数将在恰当的时机被调用。
3. 如果没有找到 JavaScript 钩子并且也没有检测到 CSS 过渡/动画，DOM 操作 (插入/删除) 在下一帧中立即执行。(注意：此指浏览器逐帧动画机制，和 Vue 的 nextTick 概念不同)

### [**#**](https://cn.vuejs.org/v2/guide/transitions.html#%E8%BF%87%E6%B8%A1%E7%9A%84%E7%B1%BB%E5%90%8D "#")[过渡的类名](https://cn.vuejs.org/v2/guide/transitions.html#%E8%BF%87%E6%B8%A1%E7%9A%84%E7%B1%BB%E5%90%8D "过渡的类名")

在进入/离开的过渡中，会有 6 个 class 切换。

1. v-enter：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
2. v-enter-active：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
3. v-enter-to：**2.1.8 版及以上**定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 v-enter 被移除)，在过渡/动画完成之后移除。
4. v-leave：定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
5. v-leave-active：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
6. v-leave-to：**2.1.8 版及以上**定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 v-leave 被删除)，在过渡/动画完成之后移除。

![  ](./image/transition_kEVh-bJgKY.png "  ")

对于这些在过渡中切换的类名来说，如果你使用一个没有名字的&#x20;

\<transition>

，则&#x20;

v-

&#x20;是这些类名的默认前缀。如果你使用了&#x20;

\<transition name="my-transition">

，那么&#x20;

v-enter

&#x20;会替换为&#x20;

my-transition-enter

。

v-enter-active

&#x20;和&#x20;

v-leave-active

&#x20;可以控制进入/离开过渡的不同的缓和曲线，在下面章节会有个示例说明。

### [**#**](https://cn.vuejs.org/v2/guide/transitions.html#CSS-%E8%BF%87%E6%B8%A1 "#")[CSS 过渡](https://cn.vuejs.org/v2/guide/transitions.html#CSS-%E8%BF%87%E6%B8%A1 "CSS 过渡")

常用的过渡都是使用 CSS 过渡。

下面是一个简单例子：

```纯文本 
 HTML < div   id = "example-1" > 
   < button  @ click = "show = !show" > 
    Toggle render
   </ button > 
   < transition   name = "slide-fade" > 
     < p   v-if = "show" > hello </ p > 
   </ transition > </ div >
```


```纯文本 
 JS new  Vue({
   el :  '#example-1' ,
   data : {
     show :  true 
  }
})
```


```纯文本 
 CSS /* 可以设置不同的进入和离开动画 */ /* 设置持续时间和动画函数 */ .slide-fade-enter-active  {
   transition : all . 3s  ease;
}
 .slide-fade-leave-active  {
   transition : all . 8s   cubic-bezier ( 1.0 ,  0.5 ,  0.8 ,  1.0 );
}
 .slide-fade-enter ,  .slide-fade-leave-to /* .slide-fade-leave-active for below version 2.1.8 */  {
   transform :  translateX ( 10px );
   opacity :  0 ;
}
```


hello

### [**#**](https://cn.vuejs.org/v2/guide/transitions.html#CSS-%E5%8A%A8%E7%94%BB "#")[CSS 动画](https://cn.vuejs.org/v2/guide/transitions.html#CSS-%E5%8A%A8%E7%94%BB "CSS 动画")

CSS 动画用法同 CSS 过渡，区别是在动画中&#x20;

v-enter

&#x20;类名在节点插入 DOM 后不会立即删除，而是在&#x20;

animationend

&#x20;事件触发时删除。

示例：(省略了兼容性前缀)

```纯文本 
 HTML < div   id = "example-2" > 
   < button  @ click = "show = !show" > Toggle show </ button > 
   < transition   name = "bounce" > 
     < p   v-if = "show" > Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris facilisis enim libero, at lacinia diam fermentum id. Pellentesque habitant morbi tristique senectus et netus. </ p > 
   </ transition > </ div >
```


```纯文本 
 JS new  Vue({
   el :  '#example-2' ,
   data : {
     show :  true 
  }
})
```


```纯文本 
 CSS .bounce-enter-active  {
   animation : bounce-in . 5s ;
}
 .bounce-leave-active  {
   animation : bounce-in . 5s  reverse;
}
 @keyframes  bounce-in {
  0% {
     transform :  scale ( 0 );
  }
  50% {
     transform :  scale ( 1.5 );
  }
  100% {
     transform :  scale ( 1 );
  }
}
```


Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris facilisis enim libero, at lacinia diam fermentum id. Pellentesque habitant morbi tristique senectus et netus.

### [**#**](https://cn.vuejs.org/v2/guide/transitions.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E8%BF%87%E6%B8%A1%E7%9A%84%E7%B1%BB%E5%90%8D "#")[自定义过渡的类名](https://cn.vuejs.org/v2/guide/transitions.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E8%BF%87%E6%B8%A1%E7%9A%84%E7%B1%BB%E5%90%8D "自定义过渡的类名")

我们可以通过以下 attribute 来自定义过渡类名：

- enter-class
- enter-active-class
- enter-to-class (2.1.8+)
- leave-class
- leave-active-class
- leave-to-class (2.1.8+)

他们的优先级高于普通的类名，这对于 Vue 的过渡系统和其他第三方 CSS 动画库，如&#x20;

[Animate.css](https://daneden.github.io/animate.css/ "Animate.css")

&#x20;结合使用十分有用。

示例：

```纯文本 
 HTML < link   href = "https://cdn.jsdelivr.net/npm/animate.css@3.5.1"   rel = "stylesheet"   type = "text/css" > < div   id = "example-3" > 
   < button  @ click = "show = !show" > 
    Toggle render
   </ button > 
   < transition 
     name = "custom-classes-transition" 
     enter-active-class = "animated tada" 
     leave-active-class = "animated bounceOutRight" 
  > 
     < p   v-if = "show" > hello </ p > 
   </ transition > </ div >
```


```纯文本 
 JS new  Vue({
   el :  '#example-3' ,
   data : {
     show :  true 
  }
})
```


### [**#**](https://cn.vuejs.org/v2/guide/transitions.html#%E5%90%8C%E6%97%B6%E4%BD%BF%E7%94%A8%E8%BF%87%E6%B8%A1%E5%92%8C%E5%8A%A8%E7%94%BB "#")[同时使用过渡和动画](https://cn.vuejs.org/v2/guide/transitions.html#%E5%90%8C%E6%97%B6%E4%BD%BF%E7%94%A8%E8%BF%87%E6%B8%A1%E5%92%8C%E5%8A%A8%E7%94%BB "同时使用过渡和动画")

Vue 为了知道过渡的完成，必须设置相应的事件监听器。它可以是&#x20;

transitionend

&#x20;或&#x20;

animationend

，这取决于给元素应用的 CSS 规则。如果你使用其中任何一种，Vue 能自动识别类型并设置监听。

但是，在一些场景中，你需要给同一个元素同时设置两种过渡动效，比如&#x20;

animation

&#x20;很快的被触发并完成了，而&#x20;

transition

&#x20;效果还没结束。在这种情况中，你就需要使用&#x20;

type

&#x20;attribute 并设置&#x20;

animation

&#x20;或&#x20;

transition

&#x20;来明确声明你需要 Vue 监听的类型。

### [**#**](https://cn.vuejs.org/v2/guide/transitions.html#%E6%98%BE%E6%80%A7%E7%9A%84%E8%BF%87%E6%B8%A1%E6%8C%81%E7%BB%AD%E6%97%B6%E9%97%B4 "#")[显性的过渡持续时间](https://cn.vuejs.org/v2/guide/transitions.html#%E6%98%BE%E6%80%A7%E7%9A%84%E8%BF%87%E6%B8%A1%E6%8C%81%E7%BB%AD%E6%97%B6%E9%97%B4 "显性的过渡持续时间")

> 2.2.0 新增

在很多情况下，Vue 可以自动得出过渡效果的完成时机。默认情况下，Vue 会等待其在过渡效果的根元素的第一个&#x20;

transitionend

&#x20;或&#x20;

animationend

&#x20;事件。然而也可以不这样设定——比如，我们可以拥有一个精心编排的一系列过渡效果，其中一些嵌套的内部元素相比于过渡效果的根元素有延迟的或更长的过渡效果。

在这种情况下你可以用&#x20;

\<transition>

&#x20;组件上的&#x20;

duration

&#x20;prop 定制一个显性的过渡持续时间 (以毫秒计)：

```纯文本 
 HTML < transition   :duration = "1000" > ... </ transition >
```


你也可以定制进入和移出的持续时间：

```纯文本 
 HTML < transition   :duration = "{ enter: 500, leave: 800 }" > ... </ transition >
```


### [**#**](https://cn.vuejs.org/v2/guide/transitions.html#JavaScript-%E9%92%A9%E5%AD%90 "#")[JavaScript 钩子](https://cn.vuejs.org/v2/guide/transitions.html#JavaScript-%E9%92%A9%E5%AD%90 "JavaScript 钩子")

可以在 attribute 中声明 JavaScript 钩子

```纯文本 
 HTML < transition 
   v-on:before-enter = "beforeEnter" 
   v-on:enter = "enter" 
   v-on:after-enter = "afterEnter" 
   v-on:enter-cancelled = "enterCancelled" 

   v-on:before-leave = "beforeLeave" 
   v-on:leave = "leave" 
   v-on:after-leave = "afterLeave" 
   v-on:leave-cancelled = "leaveCancelled" 
> 
   <!-- ... --> </ transition >
```


```纯文本 
 JS // ... methods : {
   // -------- 
   // 进入中 
   // -------- 

   beforeEnter :  function  ( el )  {
     // ... 
  },
   // 当与 CSS 结合使用时 
   // 回调函数 done 是可选的 
   enter :  function  ( el, done )  {
     // ... 
    done()
  },
   afterEnter :  function  ( el )  {
     // ... 
  },
   enterCancelled :  function  ( el )  {
     // ... 
  },

   // -------- 
   // 离开时 
   // -------- 

   beforeLeave :  function  ( el )  {
     // ... 
  },
   // 当与 CSS 结合使用时 
   // 回调函数 done 是可选的 
   leave :  function  ( el, done )  {
     // ... 
    done()
  },
   afterLeave :  function  ( el )  {
     // ... 
  },
   // leaveCancelled 只用于 v-show 中 
   leaveCancelled :  function  ( el )  {
     // ... 
  }
}
```


这些钩子函数可以结合 CSS&#x20;

transitions/animations

&#x20;使用，也可以单独使用。

**!**

当只用 JavaScript 过渡的时候，

\*\*在 \*\*

**enter**

\*\* 和 \*\*

**leave**

\*\* 中必须使用 \*\*

**done**

\*\* 进行回调\*\*​

。否则，它们将被同步调用，过渡会立即完成。

**!**

推荐对于仅使用 JavaScript 过渡的元素添加&#x20;

v-bind:css="false"

，Vue 会跳过 CSS 的检测。这也可以避免过渡过程中 CSS 的影响。

一个使用 Velocity.js 的简单例子：

```纯文本 
 HTML <!--
Velocity 和 jQuery.animate 的工作方式类似，也是用来实现 JavaScript 动画的一个很棒的选择
--> < script   src = "https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js" > </ script > < div   id = "example-4" > 
   < button  @ click = "show = !show" > 
    Toggle
   </ button > 
   < transition 
     v-on:before-enter = "beforeEnter" 
     v-on:enter = "enter" 
     v-on:leave = "leave" 
     v-bind:css = "false" 
  > 
     < p   v-if = "show" > 
      Demo
     </ p > 
   </ transition > </ div >
```


```纯文本 
 JS new  Vue({
   el :  '#example-4' ,
   data : {
     show :  false 
  },
   methods : {
     beforeEnter :  function  ( el )  {
      el.style.opacity =  0 
      el.style.transformOrigin =  'left' 
    },
     enter :  function  ( el, done )  {
      Velocity(el, {  opacity :  1 ,  fontSize :  '1.4em'  }, {  duration :  300  })
      Velocity(el, {  fontSize :  '1em'  }, {  complete : done })
    },
     leave :  function  ( el, done )  {
      Velocity(el, {  translateX :  '15px' ,  rotateZ :  '50deg'  }, {  duration :  600  })
      Velocity(el, {  rotateZ :  '100deg'  }, {  loop :  2  })
      Velocity(el, {
         rotateZ :  '45deg' ,
         translateY :  '30px' ,
         translateX :  '30px' ,
         opacity :  0 
      }, {  complete : done })
    }
  }
})
```


&#x20;     Demo
&#x20;  &#x20;

## [初始渲染的过渡](https://cn.vuejs.org/v2/guide/transitions.html#%E5%88%9D%E5%A7%8B%E6%B8%B2%E6%9F%93%E7%9A%84%E8%BF%87%E6%B8%A1 "初始渲染的过渡")

可以通过&#x20;

appear

&#x20;attribute 设置节点在初始渲染的过渡

```纯文本 
 HTML < transition   appear > 
   <!-- ... --> </ transition >
```


这里默认和进入/离开过渡一样，同样也可以自定义 CSS 类名。

```纯文本 
 HTML < transition 
   appear 
   appear-class = "custom-appear-class" 
   appear-to-class = "custom-appear-to-class"  ( 2.1.8 +)
   appear-active-class = "custom-appear-active-class" 
> 
   <!-- ... --> </ transition >
```


自定义 JavaScript 钩子：

```纯文本 
 HTML < transition 
   appear 
   v-on:before-appear = "customBeforeAppearHook" 
   v-on:appear = "customAppearHook" 
   v-on:after-appear = "customAfterAppearHook" 
   v-on:appear-cancelled = "customAppearCancelledHook" 
> 
   <!-- ... --> </ transition >
```


在上面的例子中，无论是&#x20;

appear

&#x20;attribute 还是&#x20;

v-on:appear

&#x20;钩子都会生成初始渲染过渡。

## [多个元素的过渡](https://cn.vuejs.org/v2/guide/transitions.html#%E5%A4%9A%E4%B8%AA%E5%85%83%E7%B4%A0%E7%9A%84%E8%BF%87%E6%B8%A1 "多个元素的过渡")

我们之后讨论

[多个组件的过渡](https://cn.vuejs.org/v2/guide/transitions.html#%E5%A4%9A%E4%B8%AA%E7%BB%84%E4%BB%B6%E7%9A%84%E8%BF%87%E6%B8%A1 "多个组件的过渡")

，对于原生标签可以使用&#x20;

v-if

/

v-else

。最常见的多标签过渡是一个列表和描述这个列表为空消息的元素：

```纯文本 
 HTML < transition > 
   < table   v-if = "items.length > 0" > 
     <!-- ... --> 
   </ table > 
   < p   v-else > Sorry, no items found. </ p > </ transition >
```


可以这样使用，但是有一点需要注意：

**!**

当有

**相同标签名**

的元素切换时，需要通过&#x20;

key

&#x20;attribute 设置唯一的值来标记以让 Vue 区分它们，否则 Vue 为了效率只会替换相同标签内部的内容。即使在技术上没有必要，

\*\*给在 \*\*

**\<transition>**

\*\* 组件中的多个元素设置 key 是一个更好的实践。\*\* ​

示例：

```纯文本 
 HTML < transition > 
   < button   v-if = "isEditing"   key = "save" > 
    Save
   </ button > 
   < button   v-else   key = "edit" > 
    Edit
   </ button > </ transition >
```


在一些场景中，也可以通过给同一个元素的&#x20;

key

&#x20;attribute 设置不同的状态来代替&#x20;

v-if

&#x20;和&#x20;

v-else

，上面的例子可以重写为：

```纯文本 
 HTML < transition > 
   < button   v-bind:key = "isEditing" > 
    {{ isEditing ? 'Save' : 'Edit' }}
   </ button > </ transition >
```


使用多个&#x20;

v-if

&#x20;的多个元素的过渡可以重写为绑定了动态 property 的单个元素过渡。例如：

```纯文本 
 HTML < transition > 
   < button   v-if = "docState === 'saved'"   key = "saved" > 
    Edit
   </ button > 
   < button   v-if = "docState === 'edited'"   key = "edited" > 
    Save
   </ button > 
   < button   v-if = "docState === 'editing'"   key = "editing" > 
    Cancel
   </ button > </ transition >
```


可以重写为：

```纯文本 
 HTML < transition > 
   < button   v-bind:key = "docState" > 
    {{ buttonMessage }}
   </ button > </ transition >
```


```纯文本 
 JS // ... computed : {
   buttonMessage :  function  ( )  {
     switch  ( this .docState) {
       case   'saved' :  return   'Edit' 
       case   'edited' :  return   'Save' 
       case   'editing' :  return   'Cancel' 
    }
  }
}
```


### [**#**](https://cn.vuejs.org/v2/guide/transitions.html#%E8%BF%87%E6%B8%A1%E6%A8%A1%E5%BC%8F "#")[过渡模式](https://cn.vuejs.org/v2/guide/transitions.html#%E8%BF%87%E6%B8%A1%E6%A8%A1%E5%BC%8F "过渡模式")

这里还有一个问题，试着点击下面的按钮：

在“on”按钮和“off”按钮的过渡中，两个按钮都被重绘了，一个离开过渡的时候另一个开始进入过渡。这是&#x20;

\<transition>

&#x20;的默认行为 - 进入和离开同时发生。

在元素绝对定位在彼此之上的时候运行正常：

然后，我们加上 translate 让它们运动像滑动过渡：

同时生效的进入和离开的过渡不能满足所有要求，所以 Vue 提供了

**过渡模式**

- in-out：新元素先进行过渡，完成之后当前元素过渡离开。
- out-in：当前元素先进行过渡，完成之后新元素过渡进入。

用&#x20;

out-in

&#x20;重写之前的开关按钮过渡：

```纯文本 
 HTML < transition   name = "fade"   mode = "out-in" > 
   <!-- ... the buttons ... --> </ transition >
```


只用添加一个简单的 attribute，就解决了之前的过渡问题而无需任何额外的代码。

in-out

&#x20;模式不是经常用到，但对于一些稍微不同的过渡效果还是有用的。将之前滑动淡出的例子结合：

很酷吧？

## [多个组件的过渡](https://cn.vuejs.org/v2/guide/transitions.html#%E5%A4%9A%E4%B8%AA%E7%BB%84%E4%BB%B6%E7%9A%84%E8%BF%87%E6%B8%A1 "多个组件的过渡")

多个组件的过渡简单很多 - 我们不需要使用&#x20;

key

&#x20;attribute。相反，我们只需要使用

[动态组件](https://cn.vuejs.org/v2/guide/components.html#%E5%8A%A8%E6%80%81%E7%BB%84%E4%BB%B6 "动态组件")

：

```纯文本 
 HTML < transition   name = "component-fade"   mode = "out-in" > 
   < component   v-bind:is = "view" > </ component > </ transition >
```


```纯文本 
 JS new  Vue({
   el :  '#transition-components-demo' ,
   data : {
     view :  'v-a' 
  },
   components : {
     'v-a' : {
       template :  '<div>Component A</div>' 
    },
     'v-b' : {
       template :  '<div>Component B</div>' 
    }
  }
})
```


```纯文本 
 CSS .component-fade-enter-active ,  .component-fade-leave-active  {
   transition : opacity . 3s  ease;
}
 .component-fade-enter ,  .component-fade-leave-to /* .component-fade-leave-active for below version 2.1.8 */  {
   opacity :  0 ;
}
```


A

B

Component A

## [列表过渡](https://cn.vuejs.org/v2/guide/transitions.html#%E5%88%97%E8%A1%A8%E8%BF%87%E6%B8%A1 "列表过渡")

目前为止，关于过渡我们已经讲到：

- 单个节点
- 同一时间渲染多个节点中的一个

那么怎么同时渲染整个列表，比如使用&#x20;

v-for

？在这种场景中，使用&#x20;

\<transition-group>

&#x20;组件。在我们深入例子之前，先了解关于这个组件的几个特点：

- 不同于 \<transition>，它会以一个真实元素呈现：默认为一个 \<span>。你也可以通过 tag attribute 更换为其他元素。
- [过渡模式](https://cn.vuejs.org/v2/guide/transitions.html#%E8%BF%87%E6%B8%A1%E6%A8%A1%E5%BC%8F "过渡模式")不可用，因为我们不再相互切换特有的元素。
- 内部元素**总是需要**提供唯一的 key attribute 值。
- CSS 过渡的类将会应用在内部的元素中，而不是这个组/容器本身。

### [**#**](https://cn.vuejs.org/v2/guide/transitions.html#%E5%88%97%E8%A1%A8%E7%9A%84%E8%BF%9B%E5%85%A5-%E7%A6%BB%E5%BC%80%E8%BF%87%E6%B8%A1 "#")[列表的进入/离开过渡](https://cn.vuejs.org/v2/guide/transitions.html#%E5%88%97%E8%A1%A8%E7%9A%84%E8%BF%9B%E5%85%A5-%E7%A6%BB%E5%BC%80%E8%BF%87%E6%B8%A1 "列表的进入/离开过渡")

现在让我们由一个简单的例子深入，进入和离开的过渡使用之前一样的 CSS 类名。

```纯文本 
 HTML < div   id = "list-demo"   class = "demo" > 
   < button   v-on:click = "add" > Add </ button > 
   < button   v-on:click = "remove" > Remove </ button > 
   < transition-group   name = "list"   tag = "p" > 
     < span   v-for = "item in items"   v-bind:key = "item"   class = "list-item" > 
      {{ item }}
     </ span > 
   </ transition-group > </ div >
```


```纯文本 
 JS new  Vue({
   el :  '#list-demo' ,
   data : {
     items : [ 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 ],
     nextNum :  10 
  },
   methods : {
     randomIndex :  function  ( )  {
       return   Math .floor( Math .random() *  this .items.length)
    },
     add :  function  ( )  {
       this .items.splice( this .randomIndex(),  0 ,  this .nextNum++)
    },
     remove :  function  ( )  {
       this .items.splice( this .randomIndex(),  1 )
    },
  }
})
```


```纯文本 
 CSS .list-item  {
   display : inline-block;
   margin-right :  10px ;
}
 .list-enter-active ,  .list-leave-active  {
   transition : all  1s ;
}
 .list-enter ,  .list-leave-to /* .list-leave-active for below version 2.1.8 */  {
   opacity :  0 ;
   transform :  translateY ( 30px );
}
```


&#x20;     1
&#x20;  &#x20;

&#x20;     2
&#x20;  &#x20;

&#x20;     3
&#x20;  &#x20;

&#x20;     4
&#x20;  &#x20;

&#x20;     5
&#x20;  &#x20;

&#x20;     6
&#x20;  &#x20;

&#x20;     7
&#x20;  &#x20;

&#x20;     8
&#x20;  &#x20;

&#x20;     9
&#x20;  &#x20;

这个例子有个问题，当添加和移除元素的时候，周围的元素会瞬间移动到他们的新布局的位置，而不是平滑的过渡，我们下面会解决这个问题。

### [**#**](https://cn.vuejs.org/v2/guide/transitions.html#%E5%88%97%E8%A1%A8%E7%9A%84%E6%8E%92%E5%BA%8F%E8%BF%87%E6%B8%A1 "#")[列表的排序过渡](https://cn.vuejs.org/v2/guide/transitions.html#%E5%88%97%E8%A1%A8%E7%9A%84%E6%8E%92%E5%BA%8F%E8%BF%87%E6%B8%A1 "列表的排序过渡")

\<transition-group>

&#x20;组件还有一个特殊之处。不仅可以进入和离开动画，还可以改变定位。要使用这个新功能只需了解新增的&#x20;

**v-move**

\*\* class\*\*​

，它会在元素的改变定位的过程中应用。像之前的类名一样，可以通过&#x20;

name

&#x20;attribute 来自定义前缀，也可以通过&#x20;

move-class

&#x20;attribute 手动设置。

v-move

&#x20;对于设置过渡的切换时机和过渡曲线非常有用，你会看到如下的例子：

```纯文本 
 HTML < script   src = "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.14.1/lodash.min.js" > </ script > < div   id = "flip-list-demo"   class = "demo" > 
   < button   v-on:click = "shuffle" > Shuffle </ button > 
   < transition-group   name = "flip-list"   tag = "ul" > 
     < li   v-for = "item in items"   v-bind:key = "item" > 
      {{ item }}
     </ li > 
   </ transition-group > </ div >
```


```纯文本 
 JS new  Vue({
   el :  '#flip-list-demo' ,
   data : {
     items : [ 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 ]
  },
   methods : {
     shuffle :  function  ( )  {
       this .items = _.shuffle( this .items)
    }
  }
})
```


```纯文本 
 CSS .flip-list-move  {
   transition : transform  1s ;
}
```


- &#x20;     1
  &#x20;  &#x20;
- &#x20;     2
  &#x20;  &#x20;
- &#x20;     3
  &#x20;  &#x20;
- &#x20;     4
  &#x20;  &#x20;
- &#x20;     5
  &#x20;  &#x20;
- &#x20;     6
  &#x20;  &#x20;
- &#x20;     7
  &#x20;  &#x20;
- &#x20;     8
  &#x20;  &#x20;
- &#x20;     9
  &#x20;  &#x20;

这个看起来很神奇，内部的实现，Vue 使用了一个叫&#x20;

[FLIP](https://aerotwist.com/blog/flip-your-animations/ "FLIP")

&#x20;简单的动画队列

使用 transforms 将元素从之前的位置平滑过渡新的位置。

我们将之前实现的例子和这个技术结合，使我们列表的一切变动都会有动画过渡。

```纯文本 
 HTML < script   src = "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.14.1/lodash.min.js" > </ script > < div   id = "list-complete-demo"   class = "demo" > 
   < button   v-on:click = "shuffle" > Shuffle </ button > 
   < button   v-on:click = "add" > Add </ button > 
   < button   v-on:click = "remove" > Remove </ button > 
   < transition-group   name = "list-complete"   tag = "p" > 
     < span 
       v-for = "item in items" 
       v-bind:key = "item" 
       class = "list-complete-item" 
    > 
      {{ item }}
     </ span > 
   </ transition-group > </ div >
```


```纯文本 
 JS new  Vue({
   el :  '#list-complete-demo' ,
   data : {
     items : [ 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 ],
     nextNum :  10 
  },
   methods : {
     randomIndex :  function  ( )  {
       return   Math .floor( Math .random() *  this .items.length)
    },
     add :  function  ( )  {
       this .items.splice( this .randomIndex(),  0 ,  this .nextNum++)
    },
     remove :  function  ( )  {
       this .items.splice( this .randomIndex(),  1 )
    },
     shuffle :  function  ( )  {
       this .items = _.shuffle( this .items)
    }
  }
})
```


```纯文本 
 CSS .list-complete-item  {
   transition : all  1s ;
   display : inline-block;
   margin-right :  10px ;
}
 .list-complete-enter ,  .list-complete-leave-to /* .list-complete-leave-active for below version 2.1.8 */  {
   opacity :  0 ;
   transform :  translateY ( 30px );
}
 .list-complete-leave-active  {
   position : absolute;
}
```


&#x20;     1
&#x20;  &#x20;

&#x20;     2
&#x20;  &#x20;

&#x20;     3
&#x20;  &#x20;

&#x20;     4
&#x20;  &#x20;

&#x20;     5
&#x20;  &#x20;

&#x20;     6
&#x20;  &#x20;

&#x20;     7
&#x20;  &#x20;

&#x20;     8
&#x20;  &#x20;

&#x20;     9
&#x20;  &#x20;

**!**

需要注意的是使用 FLIP 过渡的元素不能设置为&#x20;

display: inline

&#x20;。作为替代方案，可以设置为&#x20;

display: inline-block

&#x20;或者放置于 flex 中

FLIP 动画不仅可以实现单列过渡，多维网格也

[同样可以过渡](https://codesandbox.io/s/github/vuejs/vuejs.org/tree/master/src/v2/examples/vue-20-list-move-transitions "同样可以过渡")

：

**Lazy Sudoku**

Keep hitting the shuffle button until you win.

&#x20;     1
&#x20;  &#x20;

&#x20;     2
&#x20;  &#x20;

&#x20;     3
&#x20;  &#x20;

&#x20;     4
&#x20;  &#x20;

&#x20;     5
&#x20;  &#x20;

&#x20;     6
&#x20;  &#x20;

&#x20;     7
&#x20;  &#x20;

&#x20;     8
&#x20;  &#x20;

&#x20;     9
&#x20;  &#x20;

&#x20;     1
&#x20;  &#x20;

&#x20;     2
&#x20;  &#x20;

&#x20;     3
&#x20;  &#x20;

&#x20;     4
&#x20;  &#x20;

&#x20;     5
&#x20;  &#x20;

&#x20;     6
&#x20;  &#x20;

&#x20;     7
&#x20;  &#x20;

&#x20;     8
&#x20;  &#x20;

&#x20;     9
&#x20;  &#x20;

&#x20;     1
&#x20;  &#x20;

&#x20;     2
&#x20;  &#x20;

&#x20;     3
&#x20;  &#x20;

&#x20;     4
&#x20;  &#x20;

&#x20;     5
&#x20;  &#x20;

&#x20;     6
&#x20;  &#x20;

&#x20;     7
&#x20;  &#x20;

&#x20;     8
&#x20;  &#x20;

&#x20;     9
&#x20;  &#x20;

&#x20;     1
&#x20;  &#x20;

&#x20;     2
&#x20;  &#x20;

&#x20;     3
&#x20;  &#x20;

&#x20;     4
&#x20;  &#x20;

&#x20;     5
&#x20;  &#x20;

&#x20;     6
&#x20;  &#x20;

&#x20;     7
&#x20;  &#x20;

&#x20;     8
&#x20;  &#x20;

&#x20;     9
&#x20;  &#x20;

&#x20;     1
&#x20;  &#x20;

&#x20;     2
&#x20;  &#x20;

&#x20;     3
&#x20;  &#x20;

&#x20;     4
&#x20;  &#x20;

&#x20;     5
&#x20;  &#x20;

&#x20;     6
&#x20;  &#x20;

&#x20;     7
&#x20;  &#x20;

&#x20;     8
&#x20;  &#x20;

&#x20;     9
&#x20;  &#x20;

&#x20;     1
&#x20;  &#x20;

&#x20;     2
&#x20;  &#x20;

&#x20;     3
&#x20;  &#x20;

&#x20;     4
&#x20;  &#x20;

&#x20;     5
&#x20;  &#x20;

&#x20;     6
&#x20;  &#x20;

&#x20;     7
&#x20;  &#x20;

&#x20;     8
&#x20;  &#x20;

&#x20;     9
&#x20;  &#x20;

&#x20;     1
&#x20;  &#x20;

&#x20;     2
&#x20;  &#x20;

&#x20;     3
&#x20;  &#x20;

&#x20;     4
&#x20;  &#x20;

&#x20;     5
&#x20;  &#x20;

&#x20;     6
&#x20;  &#x20;

&#x20;     7
&#x20;  &#x20;

&#x20;     8
&#x20;  &#x20;

&#x20;     9
&#x20;  &#x20;

&#x20;     1
&#x20;  &#x20;

&#x20;     2
&#x20;  &#x20;

&#x20;     3
&#x20;  &#x20;

&#x20;     4
&#x20;  &#x20;

&#x20;     5
&#x20;  &#x20;

&#x20;     6
&#x20;  &#x20;

&#x20;     7
&#x20;  &#x20;

&#x20;     8
&#x20;  &#x20;

&#x20;     9
&#x20;  &#x20;

&#x20;     1
&#x20;  &#x20;

&#x20;     2
&#x20;  &#x20;

&#x20;     3
&#x20;  &#x20;

&#x20;     4
&#x20;  &#x20;

&#x20;     5
&#x20;  &#x20;

&#x20;     6
&#x20;  &#x20;

&#x20;     7
&#x20;  &#x20;

&#x20;     8
&#x20;  &#x20;

&#x20;     9
&#x20;  &#x20;

### [**#**](https://cn.vuejs.org/v2/guide/transitions.html#%E5%88%97%E8%A1%A8%E7%9A%84%E4%BA%A4%E9%94%99%E8%BF%87%E6%B8%A1 "#")[列表的交错过渡](https://cn.vuejs.org/v2/guide/transitions.html#%E5%88%97%E8%A1%A8%E7%9A%84%E4%BA%A4%E9%94%99%E8%BF%87%E6%B8%A1 "列表的交错过渡")

通过 data attribute 与 JavaScript 通信，就可以实现列表的交错过渡：

```纯文本 
 HTML < script   src = "https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js" > </ script > < div   id = "staggered-list-demo" > 
   < input   v-model = "query" > 
   < transition-group 
     name = "staggered-fade" 
     tag = "ul" 
     v-bind:css = "false" 
     v-on:before-enter = "beforeEnter" 
     v-on:enter = "enter" 
     v-on:leave = "leave" 
  > 
     < li 
       v-for = "(item, index) in computedList" 
       v-bind:key = "item.msg" 
       v-bind:data-index = "index" 
    > {{ item.msg }} </ li > 
   </ transition-group > </ div >
```


```纯文本 
 JS new  Vue({
   el :  '#staggered-list-demo' ,
   data : {
     query :  '' ,
     list : [
      {  msg :  'Bruce Lee'  },
      {  msg :  'Jackie Chan'  },
      {  msg :  'Chuck Norris'  },
      {  msg :  'Jet Li'  },
      {  msg :  'Kung Fury'  }
    ]
  },
   computed : {
     computedList :  function  ( )  {
       var  vm =  this 
       return   this .list.filter( function  ( item )  {
         return  item.msg.toLowerCase().indexOf(vm.query.toLowerCase()) !==  -1 
      })
    }
  },
   methods : {
     beforeEnter :  function  ( el )  {
      el.style.opacity =  0 
      el.style.height =  0 
    },
     enter :  function  ( el, done )  {
       var  delay = el.dataset.index *  150 
      setTimeout( function  ( )  {
        Velocity(
          el,
          {  opacity :  1 ,  height :  '1.6em'  },
          {  complete : done }
        )
      }, delay)
    },
     leave :  function  ( el, done )  {
       var  delay = el.dataset.index *  150 
      setTimeout( function  ( )  {
        Velocity(
          el,
          {  opacity :  0 ,  height :  0  },
          {  complete : done }
        )
      }, delay)
    }
  }
})
```


- Bruce Lee
- Jackie Chan
- Chuck Norris
- Jet Li
- Kung Fury

## [可复用的过渡](https://cn.vuejs.org/v2/guide/transitions.html#%E5%8F%AF%E5%A4%8D%E7%94%A8%E7%9A%84%E8%BF%87%E6%B8%A1 "可复用的过渡")

过渡可以通过 Vue 的组件系统实现复用。要创建一个可复用过渡组件，你需要做的就是将&#x20;

\<transition>

&#x20;或者&#x20;

\<transition-group>

&#x20;作为根组件，然后将任何子组件放置在其中就可以了。

使用 template 的简单例子：

```纯文本 
 JS Vue.component( 'my-special-transition' , {
   template :  '\
    <transition\
      name="very-special-transition"\
      mode="out-in"\
      v-on:before-enter="beforeEnter"\
      v-on:after-enter="afterEnter"\
    >\
      <slot></slot>\
    </transition>\
  ' ,
   methods : {
     beforeEnter :  function  ( el )  {
       // ... 
    },
     afterEnter :  function  ( el )  {
       // ... 
    }
  }
})
```


[函数式组件](https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6 "函数式组件")

更适合完成这个任务：

```纯文本 
 JS Vue.component( 'my-special-transition' , {
   functional :  true ,
   render :  function  ( createElement, context )  {
     var  data = {
       props : {
         name :  'very-special-transition' ,
         mode :  'out-in' 
      },
       on : {
         beforeEnter :  function  ( el )  {
           // ... 
        },
         afterEnter :  function  ( el )  {
           // ... 
        }
      }
    }
     return  createElement( 'transition' , data, context.children)
  }
})
```


## [动态过渡](https://cn.vuejs.org/v2/guide/transitions.html#%E5%8A%A8%E6%80%81%E8%BF%87%E6%B8%A1 "动态过渡")

在 Vue 中即使是过渡也是数据驱动的！动态过渡最基本的例子是通过&#x20;

name

&#x20;attribute 来绑定动态值。

```纯文本 
 HTML < transition   v-bind:name = "transitionName" > 
   <!-- ... --> </ transition >
```


当你想用 Vue 的过渡系统来定义的 CSS 过渡/动画在不同过渡间切换会非常有用。

所有过渡 attribute 都可以动态绑定，但我们不仅仅只有 attribute 可以利用，还可以通过事件钩子获取上下文中的所有数据，因为事件钩子都是方法。这意味着，根据组件的状态不同，你的 JavaScript 过渡会有不同的表现。

```纯文本 
 HTML < script   src = "https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js" > </ script > < div   id = "dynamic-fade-demo"   class = "demo" > 
  Fade In:  < input   type = "range"   v-model = "fadeInDuration"   min = "0"   v-bind:max = "maxFadeDuration" > 
  Fade Out:  < input   type = "range"   v-model = "fadeOutDuration"   min = "0"   v-bind:max = "maxFadeDuration" > 
   < transition 
     v-bind:css = "false" 
     v-on:before-enter = "beforeEnter" 
     v-on:enter = "enter" 
     v-on:leave = "leave" 
  > 
     < p   v-if = "show" > hello </ p > 
   </ transition > 
   < button 
     v-if = "stop" 
     v-on:click = "stop = false; show = false" 
  > Start animating </ button > 
   < button 
     v-else 
     v-on:click = "stop = true" 
  > Stop it! </ button > </ div >
```


```纯文本 
 JS new  Vue({
   el :  '#dynamic-fade-demo' ,
   data : {
     show :  true ,
     fadeInDuration :  1000 ,
     fadeOutDuration :  1000 ,
     maxFadeDuration :  1500 ,
     stop :  true 
  },
   mounted :  function  ( )  {
     this .show =  false 
  },
   methods : {
     beforeEnter :  function  ( el )  {
      el.style.opacity =  0 
    },
     enter :  function  ( el, done )  {
       var  vm =  this 
      Velocity(el,
        {  opacity :  1  },
        {
           duration :  this .fadeInDuration,
           complete :  function  ( )  {
            done()
             if  (!vm.stop) vm.show =  false 
          }
        }
      )
    },
     leave :  function  ( el, done )  {
       var  vm =  this 
      Velocity(el,
        {  opacity :  0  },
        {
           duration :  this .fadeOutDuration,
           complete :  function  ( )  {
            done()
            vm.show =  true 
          }
        }
      )
    }
  }
})
```


&#x20; Fade In:&#x20;
&#x20; Fade Out: &#x20;

hello

最后，创建动态过渡的最终方案是组件通过接受 props 来动态修改之前的过渡。一句老话，唯一的限制是你的想象力。

←&#x20;

[处理边界情况](https://cn.vuejs.org/v2/guide/components-edge-cases.html "处理边界情况")

[状态过渡](https://cn.vuejs.org/v2/guide/transitioning-state.html "状态过渡")

&#x20;→

&#x20;   发现错误？想参与编辑？
&#x20;  &#x20;

[
&#x20;     在 GitHub 上编辑此页！
&#x20;   ](https://github.com/vuejs/cn.vuejs.org/blob/master/src/v2/guide/transitions.md "
&#x20;     在 GitHub 上编辑此页！
&#x20;   ")
