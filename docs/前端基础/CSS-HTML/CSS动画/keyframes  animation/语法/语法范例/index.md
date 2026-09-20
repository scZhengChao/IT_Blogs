# 语法范例

## 目录

- [语法范例](#语法范例)

### 语法范例

- 简写形式书声明动画样式

```css 
  p {
    animation: 3s infinite alternate slidein;
  }
  
  @keyframes slidein {
    0% {
      margin-left: 100%;
      width: 300%;
    }
    100% {
      margin-left: 0%;
      width: 100%;
    }
  }
  

```


- 非简写形式书声明动画样式

```css 
  p {
    animation-duration: 3s;
    animation-name: slidein;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
  
  @keyframes slidein {
    0% {
      margin-left: 100%;
      width: 300%;
    }
    100% {
      margin-left: 0%;
      width: 100%;
    }
  }
  

```


```css 
  /* animation 声明样式顺序 */ 
  /* animation-duration */
  /* animation-easing-function */
  /* animation-delay */ 
  /* animation-iteration-count */
  /* animation-direction */
  /* animation-fill-mode */
  /* animation-play-state */
  /* animation-name */
  animation: 3s ease-in 1s 2 reverse both paused slidein; 

  
  /* animation - duration | easing-function | delay | name */
  animation: 3s linear 1s slidein;
  
  
  /* more animations - duration | easing-function | delay | name */
  animation: 3s linear slidein, 3s ease-out 5s slideout;

 
  /* animation-name */
  animation-name: none;
  animation-name: animate1;
  animation-name: animate1, animate2;
  
  
  /* animation-timing-function */
  animation-timing-function: ease;
  animation-timing-function: step-start;
  animation-timing-function: cubic-bezier(0.1, 0.7, 1, 0.1);
  animation-timing-function: ease, step-start, cubic-bezier(0.1, 0.7, 1, 0.1);
  
  
  /* ...... */
  

```


```css 

animation-play-state: paused|running;  动画的开始结束


/*1.animation-name:指定动画名称*/
animation-name: moveTest;  

/*2.设置动画的总耗时*/
animation-duration: 2s;

/*3.设置动画的播放次数，默认为1次  可以指定具体的数值，也可以指定infinite(无限次)*/
animation-iteration-count: 2/infinife;

/*4.设置交替动画 normal 默认值;reverse 表示动画反向播放; alternate:来回交替 alternate-reverse 表示反向和正向交叉进行 */
animation-direction: alternate/reverse/alternate-reverse;

/*5.设置动画的延迟*/
/*延迟可以为负数。负延迟表示动画仿佛开始前就已经运行过了那么长时间*/
animation-delay: 2s;

/*5.设置动画结束时的状态：默认情况下，动画执行完毕之后，会回到原始状态
forwards:会保留动画结束时的状态，在有延迟的情况下，并不会立刻进行到动画的初始状态
backwards:不会保留动画结束时的状态，在添加了动画延迟的前提下，如果动画有初始状态，那么会立刻进行到初始状态
both:会保留动画的结束时状态，在有延迟的情况下也会立刻进入到动画的初始状态*/
/*animation-fill-mode: both;*/
/*animation-fill-mode: forwards;*/
animation-fill-mode: backwards/forwards/both/none;

/*6.动画的时间函数*/
animation-timing-function: linear/ease/ease-in/ease-out/ease-in-out;  step-end

/*设置动画的播放状态  paused:暂停   running:播放*/
animation-play-state: running;
```
