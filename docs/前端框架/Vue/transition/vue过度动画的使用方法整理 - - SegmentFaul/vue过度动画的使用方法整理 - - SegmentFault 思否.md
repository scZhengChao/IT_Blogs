# vue过度动画的使用方法整理 - - SegmentFault 思否

## 目录

- [transition](#transition)
  - [props](#props)
  - [事件](#事件)
  - [六个过度类名](#六个过度类名)
  - [单组件过度](#单组件过度)
    - [过度](#过度)
    - [动画](#动画)
    - [自定义过度类名](#自定义过度类名)
    - [JavaScript钩子](#JavaScript钩子)
  - [列表过度](#列表过度)
    - [v-move特性](#v-move特性)

[https://cn.vuejs.org/v2/guide/transitions.html](https://cn.vuejs.org/v2/guide/transitions.html "https://cn.vuejs.org/v2/guide/transitions.html")

## transition

### props

- name： - string，用于自动生成 CSS 过渡类名。例如：name: 'fade' 将自动拓展为.fade-enter，.fade-enter-active等。默认类名为 "v"
- appear： - boolean，是否在初始渲染时使用过渡。默认为 false。
- css： - boolean，是否使用 CSS 过渡类。默认为 true。如果设置为 false，将只通过组件事件触发注册的 JavaScript 钩子。
- type： - string，指定过渡事件类型，侦听过渡何时结束。有效值为 "transition" 和 "animation"。默认 Vue.js 将自动检测出持续时间长的为过渡事件类型。
- mode： - string，控制离开/进入的过渡时间序列。有效的模式有 "out-in" 和 "in-out"；默认同时生效。
- enter-class： - string
- leave-class： - string
- appear-class： - string
- enter-to-class： - string
- leave-to-class： - string
- appear-to-class： - string
- enter-active-class： - string
- leave-active-class： - string
- appear-active-class： - string

### 事件

- before-enter
- before-leave
- before-appear
- enter
- leave
- appear
- aftrt-enter
- after-leave
- after-appear
- enter-cancelled
- leave-cancelled(v-show有效)
- appear-cancelled

### 六个过度类名

![  ](<../assets/vue过度动画的使用方法整理 - - SegmentFaul/image/bV8UTF_oNt1VSrXw0.png> "  ")

       简单地说就是 active 会伴随 enter/leave 的整个过程，v-enter 与 v-leave 存在的时长只都有

**一帧**

，所以用肉眼看v-enter-to与v-enter-active几乎是同时出现，同时消失的。

       于是就会经常看到一些相同动画效果写法却不完全一样：（这也是我之前存在疑惑的地方）

1、

.fade-enter-active

,

.fade-leave-active

{

transition

: opacity .

5s

;

}

.fade-enter

,

.fade-leave-to

{

opacity

:

0

;

}

2、

.fade-enter-active

,

.fade-leave-active

{

transition

: opacity .

5s

;

}

.fade-enter

,

.fade-leave-active

{

opacity

:

0

;

}

### 单组件过度

#### 过度

<

transition

name

\=

"fade"

\>

<

p

v-if

\=

"show"

\>

hello

\</

p

\>

\</

transition

\>

.fade-enter-active

,

.fade-leave-active

{

transition

: opacity .

5s

;

}

.fade-enter

,

.fade-leave-to

{

opacity

:

0

;

}

#### 动画

类似的只需要在过度类中填写动画即可

.fade-enter-active

,

.fade-leave-active

{

animation

: fade-in .

5s

;

}

.fade-enter

,

.fade-leave-to

{

animation

:fade-in .

5s

reverse;

}

@

keyframes

bounce-in {

0% {

ooacity

:

0

;

}

50% {

ooacity

: .

5

;

}

100% {

ooacity

:

1

;

}

}

#### 自定义过度类名

vue还支持分别添加自定义过度类名，能够方便的配合第三方动画库

- enter-class
- enter-active-class
- enter-to-class (2.1.8+)
- leave-class
- leave-active-class
- leave-to-class (2.1.8+)

#### JavaScript钩子

<

transition

v-on:before-enter

\=

"beforeEnter"

v-on:enter

\=

"enter"

v-on:after-enter

\=

"afterEnter"

v-on:enter-cancelled

\=

"enterCancelled"

v-on:before-leave

\=

"beforeLeave"

v-on:leave

\=

"leave"

v-on:after-leave

\=

"afterLeave"

v-on:leave-cancelled

\=

"leaveCancelled"

\>

\<!-- ... -->

\</

transition

\>

methods: {

beforeEnter

:

function

(

el

)

{

el.style.opacity =

0

;

//el:进行当前动作的dom元素

},

//当只用 JavaScript 过渡的时候， 在 enter 和 leave 中，回调函数 done 是必须的 。否则，它们会被同步调用，过渡会立即完成。

enter:

function

(

el, done

)

{

// ...

done()

},

afterEnter

:

function

(

el

)

{

// ...

},

enterCancelled

:

function

(

el

)

{

// ...

},

beforeLeave

:

function

(

el

)

{

// ...

},

leave

:

function

(

el, done

)

{

// ...

done()

},

afterLeave

:

function

(

el

)

{

// ...

},

// leaveCancelled 只用于 v-show 中

leaveCancelled:

function

(

el

)

{

// ...

}

}

### 列表过度

列表过度使用\<transition-group>组件,并且需要绑定唯一的key

#### v-move特性

Vue 使用了一个叫 FLIP 简单的动画队列，使用 transforms 将元素从之前的位置平滑过渡新的位置。

\*v-move是在过度开始时判断元素的位置是否发生改变，并且key是识别每个元素的关键。 在v-for中用index来绑定key值就不会虽然可行，但是不会触发v-move效果，因为不管数据怎么变数组下标还是没变。

\*一定要在过度开始时就然元素的位置发生改变：v-enter或者v-leave或者active阶段，而v-leave-to 和v-enter-to不行

看下面一个demo，因为只是一组垂直排列的li所以position：absolute会腾出位置，之后的li会上移。

<

transition-group

name

\=

"slide"

tag

\=

"ul"

class

\=

"list-wrapper"

\>

<

li

class

\=

"list"

v-for

\=

"(item, index) in content"

:key

\=

"item.text"

\>

<

span

class

\=

"text"

\>

{{item.text}}

\</

span

\>

\</

li

\>

\</

transition-group

\>

.slide-move

{

/\*v-move\*/

trsnsition

: all .

5s

;

}

.slide-leave-active

{

/\*未触发v-move效果\*/

transform

:

translate3d

(-100%, 0, 0);

}

.slide-leave-active

{

/\*触发v-move效果，因为absolute所以在他之后的li都上移位置发生改变\*/

position

: absolute;

transform

:

translate3d

(-100%, 0, 0);

}

slide-leave-to

{

/\*未触发v-move效果，过度开始时改变位置才有效\*/

position

: absolute;

transform

:

translate3d

(-100%, 0, 0);

}
