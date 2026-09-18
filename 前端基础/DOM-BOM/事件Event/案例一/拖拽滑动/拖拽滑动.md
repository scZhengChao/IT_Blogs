# 拖拽滑动

```html 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>滑块拖动 Demo</title>
    <style>
        .slider-box {
            background: #1e87f0;
        }
        #slider {
            width: 140px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: red;
            cursor: pointer;
            user-select:none;
            border-radius: 20px;
        }
    </style>
</head>
<body>
<h1> 滑块拖动 setPointerCapture 示例 Demo</h1>
<h1> 在小小的滑槽里，滑呀滑呀滑</h1>
<div class="slider-box">
    <div id="slider">滑呀滑</div>
</div>
<script>
    function beginSliding(e) {
        slider.onpointermove = slide;
        slider.setPointerCapture(e.pointerId);
    }

    function stopSliding(e) {
        slider.onpointermove = null;
        slider.releasePointerCapture(e.pointerId);
    }

    function slide(e) {
        slider.style.transform = `translate(${e.clientX - 70}px)`;
    }

    const slider = document.getElementById('slider');

    slider.onpointerdown = beginSliding;
    slider.onpointerup = stopSliding;

</script>
</body>
</html>


```
