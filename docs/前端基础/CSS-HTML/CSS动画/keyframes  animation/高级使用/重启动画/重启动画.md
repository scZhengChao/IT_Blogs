# 重启动画

## 目录

- [void element.offsetWidth](#void-elementoffsetWidth)
- [重命名](#重命名)

# void element.offsetWidth

CSS3中的动画属性可以通过重新设置其值而重新启动动画。当我们需要重置动画时，可以通过将动画属性的值恢复到默认值来实现。例如，假设我们有一个元素的动画效果如下：

```javascript 
@keyframes slidein {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

.element {
  animation: slidein 1s;
}

```


要重新启动动画，我们可以使用JavaScript来动态地添加一个类，然后在CSS中将动画属性的值重置为默认值。例如：

```javascript 
function resetAnimation(element) {
   element.classList.remove("slidein");
  void element.offsetWidth;
  element.classList.add("slidein"); 
}

var element = document.querySelector(".element");
resetAnimation(element);
```


在上述代码中，我们首先移除元素的class类名，以触发动画的重新启动。然后使用void element.offsetWidth;这一行代码来强制浏览器重新计算元素的样式，以确保动画重新启动。最后，我们再次将class类名添加回元素中，使动画效果重新生效。

# 重命名

```html 
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        @keyframes mymove {
            0% {
                margin-left: 0px;
            }
            50% {
                margin-left: 400px;
            }
            100% {
                margin-left: 0px;
            }
        }
        @keyframes mymove1 {
            0% {
                margin-left: 0px;
            }
            50% {
                margin-left: 400px;
            }
            100% {
                margin-left: 0px;
            }
        }
        .box {
            margin: 50px 0;
            width: 100px;
            height: 100px;
            background-color: #5578a2;
        }
        .play {
            animation: mymove 5s infinite ease;
        }
        .restart {
            animation: mymove1 5s infinite ease;
        }
        .pause {
            animation-play-state: paused;
        }



    </style>
</head>
<body>

<div id="box" class="box"></div>
<p id="text"></p>
<div class="control">
    <button id="play" value="播放">播放</button>
    <button id="pause" value="暂停">暂停</button>
    <button id="restart" value="重新开始">重新开始</button>
</div>

</body>
<script>

    var play = document.getElementById('play'),
        pause = document.getElementById('pause'),
        restart = document.getElementById('restart'),
        text = document.getElementById('text'),
        box = document.getElementById('box');
    pause.addEventListener('click', function() {
        if (box.classList.contains('play')) {
            box.className = 'pause play box';
        } else {
            box.className = 'pause restart box';
        }
        text.innerHTML = this.value;
    });
    play.addEventListener('click', function() {
        if (box.classList.contains('play')) {
            box.className = 'play box';
        } else {
            box.className = 'restart box';
        }
        text.innerHTML = this.value;
    });
    restart.addEventListener('click', function() {
        if (box.classList.contains('play')) {
            box.className = 'restart box';
        } else {
            box.className = 'play box';
        }
        text.innerHTML = this.value;
    });


</script>
</html>
```
