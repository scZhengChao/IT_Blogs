# 拖动边界线改变布局

```html 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>左右拖动div，改变左右元素的宽度</title>
    <style>
        #box {
            width: 100vw;
            height: 100vh;
            overflow: hidden;
        }

        #left {
            width: calc(20% - 5px);
            height: 100%;
            background: #87eb8c;
            float: left;
        }

        #resize {
            width: 5px;
            height: 100%;
            cursor: col-resize;
            float: left;
        }

        #right {
            float: right;
            width: 80%;
            height: 100%;
            background: #ffc547;
        }
    </style>
</head>

<body>
<div id="box">
    <div id="left">left</div>
    <div id="resize"></div>
    <div id="right">right</div>
</div>
<script>
    window.onload = function () {
        let left = document.getElementById("left");
        let resize = document.getElementById("resize");
        let right = document.getElementById("right");
        let box = document.getElementById("box");
        resize.onpointerdown = function (e) {
            const startX = e.clientX;
            resize.left = resize.offsetLeft;
            resize.onpointermove = function (em) {
                const endX = em.clientX;
                let moveL = resize.left + (endX - startX);
                let maxT = box.clientWidth - resize.offsetWidth;
                const step = 100
                if (moveL < step) moveL = step;
                if (moveL > maxT - step) moveL = maxT - step;

                resize.style.left = moveL;
                left.style.width = moveL + "px";
                right.style.width = (box.clientWidth - moveL - 5) + "px";
            }
            resize.onpointerup = function (et) {
                resize.onpointermove = null;
                resize.onpointerup = null;
                resize.releasePointerCapture(et.pointerId);
            }
            resize.setPointerCapture(e.pointerId);
            return false;
        }
    }
</script>
</body>

</html>


```
