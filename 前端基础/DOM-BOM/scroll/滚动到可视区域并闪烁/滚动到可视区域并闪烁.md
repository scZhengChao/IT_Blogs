# 滚动到可视区域并闪烁

```javascript 
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        @keyframes blinking {
            0% {
                background-color: red;
            }
            50% {
                background-color: yellow;
            }
            100% {
                background-color: red;
            }
        }

        .box {
            width: 200px;
            height: 200px;
            border: 1px solid black;
        }
        .animation{
            animation-name: blinking;
            animation-duration: 1s;
            animation-timing-function: linear;
            animation-iteration-count: 3;
        }
        .stage{
            width: 100%;
            overflow-y: auto;
            height: 500px;
        }


    </style>
</head>
<body>
<button id="btn">重复</button>
<div class="stage">
    <p>占位---------</p>
    <p>占位---------</p>
    <p>占位---------</p>
    <p>占位---------</p>
    <p>占位---------</p>
    <p>占位---------</p>
    <p>占位---------</p>
    <p>占位---------</p>
    <p>占位---------</p>
    <p>占位---------</p>
    <p>占位---------</p>
    <p>占位---------</p>
    <p>占位---------</p>
    <p>占位---------</p>
    <p>占位---------</p>
    <p>占位---------</p>
    <p>占位---------</p>
    <p>占位---------</p>
    <p>占位---------</p>
    <p>占位---------</p>
    <p>占位---------</p>
    <p>占位---------</p>
    <p>占位---------</p>
    <p>占位---------</p>
    <p>占位---------</p>

    <div class="box"></div>
</div>
</body>
<script>

    function restartAnimation(element) {
        element.classList.remove("animation");
        void element.offsetWidth;
        element.classList.add("animation");
    }

    let flag = false
    const btn = document.querySelector('#btn')
    const box = document.querySelector('.box')
    btn.addEventListener('click',(e)=>{
        restartAnimation(box);
        box.scrollIntoView({
            behavior:"smooth",
            block:"start"
        })
    })

</script>
</html>
```


> &#x20; void element.offsetWidth; &#x20;

或者；这是必须的；

> if(element.offsetWidth)
